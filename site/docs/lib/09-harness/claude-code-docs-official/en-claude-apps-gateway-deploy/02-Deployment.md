---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/claude-apps-gateway-deploy.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/claude-apps-gateway-deploy.md"
sourceSha256: "09270d8f4e207724e6aae6f48b9a970996cef9e8db5702abe212c1240143bdb0"
pageSha256: "650ea5ce2aadb86d863ac635da23825978c529b37527bafdfdcdf5c52d75adc4"
contentMode: "local-full"
zh: ""
---

## Deployment

The gateway is a single stateless Linux binary that coordinates through Postgres, so deploy it the way you deploy any other stateless service in your environment. Keep it inside your network, where your developers and IdP can reach it over HTTPS, and treat it like any service holding a production credential.

A few decisions shape the deployment beyond where it runs:

* **Cost**: no separate license or per-seat fee. The gateway is part of the `claude` binary, so you pay for inference through your existing commitment, plus the compute it runs on.
* **Bypass**: the gateway doesn't enforce that the only route to a model goes through it. A developer with their own credential can still call the provider directly, so closing that path is a network policy decision, for example blocking egress to `api.anthropic.com` except from the gateway. Blocking that egress also breaks the [WebFetch domain safety check](https://code.claude.com/docs/en/data-usage#webfetch-domain-safety-check), which calls `api.anthropic.com` from each developer's machine. Set `skipWebFetchPreflight: true` in the managed policy to disable it.
* **Multiple gateways**: each is a separate deployment with its own config, and the CLI stores trust and credentials per gateway hostname, so teams can use different gateways without conflict. To serve multiple OIDC issuers, run separate instances.
* **Serverless**: Cloud Run works if you set `min-instances: 1` to avoid cold OIDC discovery. Lambda and Cloud Functions don't work, because the gateway is a long-running HTTP server.

Every production topology here puts an L7 proxy, such as an Ingress, Cloud Run's front end, or an ALB, in front of plain-HTTP replicas. Set [`listen.trusted_proxies`](https://code.claude.com/docs/en/claude-apps-gateway-config#listen) to the proxy's source ranges so the gateway reads client IPs from `X-Forwarded-For`. The gateway honors the header only when the TCP peer is trusted. The [Google Cloud](https://code.claude.com/docs/en/claude-apps-gateway-on-gcp) and [AWS](https://code.claude.com/docs/en/claude-apps-gateway-on-aws) worked examples have concrete values per topology. Without trusted proxies, every request appears to come from the proxy's IP, which collapses per-IP rate limits into one shared bucket and records the proxy's IP in audit events.

Don't redirect requests to the gateway's device-authorization and token endpoints, for example with an HTTP-to-HTTPS or host-canonicalization rewrite at the ingress. Claude Code doesn't follow redirects on those requests, so an ingress rule that redirects them breaks sign-in and token refresh.

Give the proxy any idle timeout longer than the gateway's keepalive interval, which depends on the upstream:

* On every upstream except `provider: anthropic`, the gateway writes an SSE `ping` once a stream has been silent for about 15 seconds.
* On `provider: anthropic`, the gateway passes the response through unchanged, including the Anthropic API's own pings.

A default such as the ALB's 60 seconds is enough to keep a quiet stream open. The [AWS worked example](https://code.claude.com/docs/en/claude-apps-gateway-on-aws#troubleshooting) raises it to an hour anyway, and its troubleshooting row covers gateways older than v2.1.229, which sent nothing during quiet periods on the upstreams that now get pings.

### Container image

Build your own image around the native `claude` binary from the standard Claude Code release:

1. Download the Linux build for your image architecture from a pinned release; see [Install a specific version](https://code.claude.com/docs/en/setup#install-a-specific-version) for the download URL.
2. Verify it against the release's GPG-signed `manifest.json` as described in [Binary integrity and code signing](https://code.claude.com/docs/en/setup#binary-integrity-and-code-signing).
3. Copy it into the build context.

Mirror the release into your internal registry if your builds can't reach the release host, and pin the version your fleet runs.

Beyond the binary, the image needs:

* **A glibc-based image**: the glibc build's only dynamic dependencies are glibc libraries. Musl-based images need the `linux-x64-musl` or `linux-arm64-musl` build plus additional packages; see [Alpine Linux setup](https://code.claude.com/docs/en/setup#alpine-linux-and-musl-based-distributions).
* **A writable state directory**: the gateway runs as any user, but minimal images have no writable home. Set `CLAUDE_CONFIG_DIR` to a writable path such as `/tmp/.claude`.
* **The container command**: `claude gateway --config /etc/claude/gateway.yaml`, with the config file mounted read-only and secrets supplied as environment variables; the gateway listens on `listen.port`, default `8080`.

### Kubernetes

Run the gateway as a Deployment, like any stateless service:

* Mount the config from a ConfigMap and secrets from a Secret; reference secrets in the YAML via `${file:/path/to/secret}` or as environment variables
* Terminate TLS at the Ingress and set `listen.public_url` to the Ingress hostname
* Point the readiness probe at `GET /readyz` and the liveness probe at `GET /healthz`

For a complete worked example on AWS, covering ECS Fargate or EKS, Amazon RDS, and AWS Secrets Manager, see [Deploy on AWS](https://code.claude.com/docs/en/claude-apps-gateway-on-aws).

Prefer the platform's workload identity over static keys; the [`upstreams` reference](https://code.claude.com/docs/en/claude-apps-gateway-config#upstreams) has per-platform setup details. For a cross-cloud pairing, such as an Amazon Bedrock upstream on GKE, set explicit credentials in the upstream's `auth` block instead.

### Cloud Run

Configure the service as follows:

* Leave `listen.port` at its default of `8080`, which matches Cloud Run's default `PORT`, or set `port: ${PORT\}`
* Set `public_url` to the externally reachable origin. For production this is normally an internal load balancer's hostname, because `/login` [rejects public addresses](https://code.claude.com/docs/en/claude-apps-gateway#prerequisites) and the `*.run.app` URL resolves to one, so the Cloud Run URL alone works only for a `curl` or browser smoke test. The exception is a network where `*.run.app` resolves privately through Private Service Connect and a Cloud DNS private zone; in that topology the Cloud Run URL is a valid `public_url`. The [Google Cloud worked example](https://code.claude.com/docs/en/claude-apps-gateway-on-gcp#deploy-the-gateway) covers both.
* Mount the config as a secret volume
* Set `min-instances: 1` to avoid a cold OIDC discovery on first request

For a complete worked example on Google Cloud, covering Cloud Run or GKE, Cloud SQL, and Secret Manager, see [Deploy on Google Cloud](https://code.claude.com/docs/en/claude-apps-gateway-on-gcp).

### Push the gateway URL to developer machines

Once the gateway is serving, push `forceLoginMethod`, `forceLoginGatewayUrl`, and `parentSettingsBehavior: "merge"` to each developer's machine through managed settings, via MDM or by writing the per-OS `managed-settings.json` directly. Without this, `/login` shows the standard account picker with no gateway option.

Once you deploy the keys, Claude Code stops using a leftover API key or claude.ai login on the machine, so plan the push together with your sign-in instructions. [Administrator policy requires a Cloud gateway sign-in](https://code.claude.com/docs/en/errors#administrator-policy-requires-a-cloud-gateway-sign-in) describes the messages developers see.

See [where each mechanism stores the policy](https://code.claude.com/docs/en/managed-settings#where-each-mechanism-stores-the-policy) for the file paths, and [Client-side managed settings](https://code.claude.com/docs/en/claude-apps-gateway-config#client-side-managed-settings) for the Claude Desktop `bootstrapUrl` equivalent.
