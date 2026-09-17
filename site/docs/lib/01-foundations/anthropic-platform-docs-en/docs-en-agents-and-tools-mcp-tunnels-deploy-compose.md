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
sourceRel: "docs/en/agents-and-tools/mcp-tunnels/deploy-compose.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/mcp-tunnels/deploy-compose.md"
sourceSha256: "74e5fee300a579b866562df9d71aade63e859b69ef033aa43a433ddc9b8f8675"
pageSha256: "74e5fee300a579b866562df9d71aade63e859b69ef033aa43a433ddc9b8f8675"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

MCP tunnels are in research preview. [Request access](https://claude.com/form/mcp-tunnels) to try them.

This guide deploys the [tunnel stack](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) as hardened containers on a single host. The same configuration can be replicated across multiple hosts for availability.

## Before you begin

You need:

* **A tunnel.** With programmatic access, the [setup component](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) creates one for you when you don't supply a tunnel ID; to attach to an existing tunnel instead, [create it in the Console](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/console#create-a-tunnel) and record the tunnel ID (`tnl_...`). Manual provisioning always starts from a Console-created tunnel.

* **A way for the host to authenticate to the Tunnels API.**

  * **Programmatic access (recommended).** Turn on **Set up programmatic access** when creating the tunnel (or create the federation rule directly under **Settings > Workload identity** if you're letting the setup component create the tunnel) so the setup component can authenticate through Workload Identity Federation. Record the federation rule ID (`fdrl_...`) and your organization ID.
  * **Manual.** Skip programmatic access. You'll [get the tunnel token from the Console](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/console#get-the-connection-details), generate a CA and server certificate yourself, and [register the CA in the Console](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/console#add-a-ca-certificate).

* **A host with Docker and Docker Compose** installed. The manual flow also requires `openssl` (1.1.1 or later).

* **Outbound network connectivity** from the host to `api.anthropic.com` (443 TCP) and the [tunnel edge](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) (7844 TCP and UDP). See the full [network requirements](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/overview#network-requirements).

* **One or more MCP servers** running and reachable from the host on the addresses you'll configure under `routes`. If you don't have one yet, [use the sample server](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/deploy-compose#optional-use-a-sample-mcp-server).

## Optional: Use a sample MCP server

If you don't have an MCP server available for testing, use this minimal one:

```bash
mkdir -p mcp-tunnel
cat > mcp-tunnel/hello_server.py <<'EOF'
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("hello-server", host="0.0.0.0", port=9000)

@mcp.tool()
def hello(name: str = "world") -> str:
    """Say hello to someone."""
    return f"Hello, {name}!"

if __name__ == "__main__":
    mcp.run(transport="streamable-http")
EOF
```

The following Install steps `cd` into `mcp-tunnel/` and note where to add the corresponding service and route.

## Install

This guide provides one reference approach using Docker Compose. You are responsible for adapting it to meet your organization's security requirements.

    This path requires the host to have an OIDC identity provider (such as a cloud VM metadata server or SPIFFE). If it doesn't, use the **Without programmatic access** tab instead.

    The setup component uses Workload Identity Federation to fetch the tunnel token, generate a CA and server certificate, and register the CA with Anthropic.

        ```bash
        mkdir -p mcp-tunnel/\{config,data\}
        cd mcp-tunnel
        sudo chown 65532:65532 data
        ```

        The containers run as the non-root UID `65532` and need write access to `data/`.

        The compose file pins images by SHA-256 digest, runs every container as non-root with a read-only filesystem, drops all Linux capabilities, and disables privilege escalation.

        ```bash
        cat > docker-compose.yaml <<'EOF'
        services:
          setup:
            image: us-docker.pkg.dev/anthropic-public-registry/images/mcp-proxy@sha256:efb27b299d627e4134815663cb8896641eeaee025d734c0f695582b4df38f013
            entrypoint: ["/setup"]
            command:
              - init
              - --api-url=https://api.anthropic.com
              - --output=dir:/data
              - --token-version=1
            environment:
              - TUNNEL_ID
              - ANTHROPIC_FEDERATION_RULE_ID
              - ANTHROPIC_ORGANIZATION_ID
              - ANTHROPIC_WORKSPACE_ID
              - ANTHROPIC_IDENTITY_TOKEN
            volumes:
              - ./data:/data
            user: "65532:65532"
            read_only: true
            security_opt:
              - no-new-privileges:true
            cap_drop:
              - ALL
            profiles: ["setup"]

          cloudflared:
            image: cloudflare/cloudflared@sha256:6b599ca3e974349ead3286d178da61d291961182ec3fe9c505e1dd02c8ac31b0
            command: tunnel --no-autoupdate run --url http://localhost:8080
            environment:
              - TUNNEL_TOKEN
            # Share the proxy's netns so localhost:8080 reaches it.
            network_mode: "service:mcp-proxy"
            restart: unless-stopped
            user: "65532:65532"
            read_only: true
            security_opt:
              - no-new-privileges:true
            cap_drop:
              - ALL
            stop_grace_period: 30s
            logging:
              options:
                max-size: "10m"
                max-file: "3"

          mcp-proxy:
            image: us-docker.pkg.dev/anthropic-public-registry/images/mcp-proxy@sha256:efb27b299d627e4134815663cb8896641eeaee025d734c0f695582b4df38f013
            volumes:
              - ./config/mcp-proxy.yaml:/etc/mcp-gateway/config.yaml:ro
              - ./data:/data:ro
            restart: unless-stopped
            user: "65532:65532"
            read_only: true
            security_opt:
              - no-new-privileges:true
            cap_drop:
              - ALL
            stop_grace_period: 30s
            logging:
              options:
                max-size: "10m"
                max-file: "3"
        EOF
        ```

        If you're using the [sample MCP server](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/deploy-compose#optional-use-a-sample-mcp-server), append it as a service:

        ```bash
        cat >> docker-compose.yaml <<'EOF'

          hello-mcp:
            image: python:3.13-slim
            working_dir: /app
            volumes:
              - ./hello_server.py:/app/hello_server.py:ro
            command: sh -c "pip install --quiet mcp && python hello_server.py"
            restart: unless-stopped
        EOF
        ```

        Set the identifiers. Leave `TUNNEL_ID` unset to have the setup component create a tunnel; set it to attach to an existing tunnel from the [Console](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/console#create-a-tunnel):

        ```bash
        # export TUNNEL_ID=tnl_...   # set to attach to an existing tunnel
        export ANTHROPIC_FEDERATION_RULE_ID=fdrl_...
        export ANTHROPIC_ORGANIZATION_ID=00000000-0000-0000-0000-000000000000
        ```

        If your federation rule is scoped to a workspace other than your organization's default, also set `ANTHROPIC_WORKSPACE_ID=wrkspc_...`; the setup component uses the default workspace otherwise. An auto-created tunnel is created in that workspace.

        Set `ANTHROPIC_IDENTITY_TOKEN` to an OIDC JWT from this host's identity provider. Follow the [WIF guide for your provider](https://platform.claude.com/docs/en/manage-claude/workload-identity-federation#identity-providers) to register the issuer, set the rule's subject, and mint the token; the rule's audience must match the audience you request when minting.

        Run the setup component:

        ```bash
        docker compose run --rm setup
        ```

        `setup init` is idempotent over `data/`: re-running it reuses the tunnel ID and CA already stored there and never creates a second tunnel. A new CA is generated and registered only when `data/` is empty or `TUNNEL_ID` has changed; in that case the cap of two active certificates applies, so revoke one in the Console first if both slots are filled.

        See [Setup component authentication failures](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/troubleshooting#setup-component-authentication-failures) if it errors.

        Retrieve your tunnel domain and export it for later steps:

        ```bash
        export TUNNEL_DOMAIN=$(sudo cat data/tunnel-domain)
        echo "$TUNNEL_DOMAIN"
        ```

          Workload Identity Federation tokens are short-lived (1 hour by default) and expire automatically; there is nothing to revoke after setup completes.

        `tunnel_domain` is **required**: the [proxy](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) uses it to strip the domain suffix from incoming hostnames before looking up the subdomain in `routes`. `routes` is a flat map from subdomain to upstream URL, not a list.

        ```bash
        cat > config/mcp-proxy.yaml <<EOF
        listen_addr: ":8080"
        log_level: info
        shutdown_timeout: 30s
        tunnel_domain: ${TUNNEL_DOMAIN}
        tls:
          cert_file: /data/tls.crt
          key_file: /data/tls.key
        routes:
          echo: http://hello-mcp:9000
        EOF
        ```

        The `echo:` route targets the [sample MCP server](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/deploy-compose#optional-use-a-sample-mcp-server); replace it with (or add) your own routes. See the [proxy configuration](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/reference#proxy-configuration) reference for all available fields.

        ```bash
        export TUNNEL_TOKEN=$(sudo cat data/tunnel-token)
        docker compose up -d
        ```
```
```

    Use this flow if you didn't turn on **Set up programmatic access**, or for local development and testing. There is no `setup` service.

        On the tunnel detail page, copy the **Domain** (it has the form `abcd1234.tunnel.anthropic.com`), then click the eye icon next to **Token** to fetch the tunnel token and use the copy icon to copy it.

        Set both as shell variables for the rest of the guide:

        ```bash
        export TUNNEL_DOMAIN=YOUR_TUNNEL_DOMAIN_HERE
        export TUNNEL_TOKEN='eyJ...'
        ```

        ```bash
        mkdir -p mcp-tunnel/\{data,config\}
        cd mcp-tunnel
        ```
