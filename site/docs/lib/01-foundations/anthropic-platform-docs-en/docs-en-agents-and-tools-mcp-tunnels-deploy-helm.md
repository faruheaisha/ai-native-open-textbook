---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/agents-and-tools/mcp-tunnels/deploy-helm.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/mcp-tunnels/deploy-helm.md"
sourceSha256: "a9ff5fc0cef0e15b24f68ed8c00d459cfc4352586c2ad9fb2e7408817aec2aaf"
pageSha256: "a9ff5fc0cef0e15b24f68ed8c00d459cfc4352586c2ad9fb2e7408817aec2aaf"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

MCP tunnels are in research preview. [Request access](https://claude.com/form/mcp-tunnels) to try them.

The Anthropic Helm chart installs the [tunnel stack](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) as a single Deployment and attaches it to your tunnel: one the chart's setup hook creates for you, or an existing tunnel you created in the [Console](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/console#create-a-tunnel).

## Before you begin

You need:

* **A tunnel.** With programmatic access, the chart's setup hook creates one for you when you don't supply a tunnel ID; to attach to an existing tunnel instead, [create it in the Console](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/console#create-a-tunnel) and record the tunnel ID (`tnl_...`). Manual provisioning always starts from a Console-created tunnel; you'll also need its tunnel token and tunnel domain.

* **A way for the chart to authenticate to the Tunnels API.**

  * **[Programmatic access](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#credential-provisioning) (recommended).** The [setup component](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) authenticates through Workload Identity Federation, fetches the tunnel token, generates a CA, registers it with Anthropic, and stores everything in a Secret. You'll need a federation rule scoped to `workspace:manage_tunnels`.
  * **[Manual](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#credential-provisioning).** Skip programmatic access. You'll [get the tunnel token from the Console](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/console#get-the-connection-details), generate a CA and server certificate yourself, [register the CA in the Console](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/console#add-a-ca-certificate), and supply the credentials to the cluster as Secrets.

* **A Kubernetes cluster** you can deploy to with `helm` and `kubectl`. The **Without programmatic access** tab also uses `openssl` (1.1.1 or later).

* **Outbound network connectivity** from the cluster to `api.anthropic.com` (443 TCP) and the [tunnel edge](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) (7844 TCP and UDP). See the full [network requirements](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/overview#network-requirements).

* **One or more MCP servers** running and reachable from the cluster on the addresses you'll configure under `gateway.config.routes`. If you don't have one yet, [use the sample server](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/deploy-helm#optional-use-a-sample-mcp-server).

## Optional: Use a sample MCP server

If you don't have an MCP server available for testing, use this minimal one:

```bash
kubectl create namespace mcp-tunnel --dry-run=client -o yaml | kubectl apply -f -
kubectl -n mcp-tunnel apply -f - <<'EOF'
apiVersion: v1
kind: ConfigMap
metadata:
  name: hello-mcp-src
data:
  hello_server.py: |
    from mcp.server.fastmcp import FastMCP

    mcp = FastMCP("hello-server", host="0.0.0.0", port=9000)

    @mcp.tool()
    def hello(name: str = "world") -> str:
        """Say hello to someone."""
        return f"Hello, {name}!"

    if __name__ == "__main__":
        mcp.run(transport="streamable-http")
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-mcp
spec:
  replicas: 1
  selector:
    matchLabels: { app: hello-mcp }
  template:
    metadata:
      labels: { app: hello-mcp }
    spec:
      containers:
        - name: hello-mcp
          image: python:3.13-slim
          command: ["sh", "-c", "pip install --quiet mcp && python /app/hello_server.py"]
          volumeMounts:
            - { name: src, mountPath: /app }
          ports:
            - { containerPort: 9000 }
      volumes:
        - name: src
          configMap: { name: hello-mcp-src }
---
apiVersion: v1
kind: Service
metadata:
  name: hello-mcp
spec:
  selector: { app: hello-mcp }
  ports:
    - { port: 9000, targetPort: 9000 }
EOF
```

The Install steps that follow note where to add the corresponding route.

## Install

    The setup component exchanges the cluster's projected ServiceAccount token through your federation rule, fetches the tunnel token, generates a CA and server certificate, and registers the CA with Anthropic. A daily CronJob renews the server certificate as needed, so you don't handle any secrets by hand.

        Follow [Use WIF with Kubernetes](https://platform.claude.com/docs/en/manage-claude/wif-providers/kubernetes) to register your cluster's OIDC issuer and create a federation rule. The setup component runs under its own ServiceAccount in the release namespace; the exact name follows Helm's `fullname` convention, so for any release name other than `mcp-tunnel`, run `helm template <release> ... | grep -A2 'kind: ServiceAccount'` to confirm it before creating the rule. The rest of this guide assumes release name `mcp-tunnel` in namespace `mcp-tunnel`, where the ServiceAccount is `mcp-tunnel-setup`.

        | Field    | Value                                                |
        | -------- | ---------------------------------------------------- |
        | Subject  | `system:serviceaccount:mcp-tunnel:mcp-tunnel-setup`  |
        | Audience | `api.anthropic.com` (the chart's default; no scheme) |
        | Scope    | `workspace:manage_tunnels`                           |

          The chart's default audience is `api.anthropic.com` with no scheme, but the Console's federation-rule form suggests `https://api.anthropic.com`. The two must match byte-for-byte or authentication fails. Either set the rule's audience to `api.anthropic.com`, or set `api.wif.audience` in `values.yaml` to `https://api.anthropic.com`.

        If the tunnel is in a workspace other than the organization's default, also add the rule's service account as a member of that workspace under **Settings > Workspaces** (the Tunnels API authorizes against the service account's workspace memberships).

        Note the rule's ID (`fdrl_...`); you'll set it as `api.wif.federationRuleId`.

          The daily certificate-renewal CronJob uses a separate ServiceAccount (also derived from the Helm `fullname`) but does not call the Tunnels API; it renews the certificate locally and only needs Kubernetes RBAC, which the chart grants. The federation rule does not need to cover it.

        ```bash
        helm show values \
          oci://us-docker.pkg.dev/anthropic-public-registry/charts/mcp-tunnel \
          --version 2.0.2 > values.yaml
        ```

        Edit `values.yaml` and set the `api.wif.*` keys with the federation rule ID and organization ID, plus a `routes` entry for each [upstream MCP server](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components):

        ```yaml values.yaml
        api:
          wif:
            federationRuleId: "fdrl_..."
            organizationId: "00000000-0000-0000-0000-000000000000"
            # Set when the tunnel is in a non-default workspace and the
            # rule's service account is a member of that workspace.
            # workspaceId: "wrkspc_..."

        tunnel:
          # Leave empty to have the setup hook create a tunnel during install.
          # Set to attach to an existing tunnel from the Console.
          id: ""
          # Increment to rotate the tunnel token on the next upgrade.
          # See the "Rotate the tunnel token" section.
          tokenVersion: "1"

        gateway:
          config:
            routes:
              docs: http://docs-mcp.internal:8080
              search: http://search-mcp.internal:8080
        ```
