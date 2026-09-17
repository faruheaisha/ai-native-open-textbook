---
title: "Claude apps gateway for Amazon Bedrock, Claude Platform on AWS, Google Cloud, and Microsoft Foundry"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/claude-apps-gateway.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/claude-apps-gateway.md"
sourceSha256: "cf543b3425f0475697dd3c14cfc372d4bf70b46d745f02a37947746b03c75a62"
pageSha256: "cf543b3425f0475697dd3c14cfc372d4bf70b46d745f02a37947746b03c75a62"
contentMode: "local-full"
zh: ""
---

# Claude apps gateway for Amazon Bedrock, Claude Platform on AWS, Google Cloud, and Microsoft Foundry

> Run Claude Code through Amazon Bedrock, Claude Platform on AWS, Google Cloud, or Microsoft Foundry behind a self-hosted gateway with SSO sign-in, per-group model access, and OTLP telemetry.

  The Claude apps gateway is designed for organizations that must, or prefer to, route inference through their own cloud provider, for example to meet [data residency](https://code.claude.com/docs/en/claude-apps-gateway-deploy#compliance-posture) requirements. If you don't have this requirement, and want access to other features such as SCIM provisioning or Claude Code on web and mobile, Claude Enterprise may be a better fit. See the [feature availability](https://code.claude.com/docs/en/feature-availability) page for a full comparison of all deployment methods.

Claude apps gateway is a self-hosted service that sits between your developers' Claude Code clients and your model provider. Developers sign in with your corporate identity provider (IdP) instead of holding API keys or cloud credentials. The gateway holds the upstream credential, enforces model access and [managed settings](https://code.claude.com/docs/en/managed-settings) by IdP group, and relays usage telemetry to your own observability stack.

It is included in the `claude` binary, so the same executable that runs Claude Code on a laptop runs the gateway server with `claude gateway --config gateway.yaml`.

This page covers:

* [Why Claude apps gateway](#why-claude-apps-gateway), what it adds over running your own, and when something else fits better
* A [quickstart](#quickstart) with [prerequisites](#prerequisites) that takes a gateway from zero to a signed-in developer
* [Connecting developers](#connect-developers), including setting the gateway URL through managed settings
* [Availability and limitations](#availability-and-limitations) covering which Claude Code features work through the gateway and what the server supports

Companion pages go deeper. The [configuration reference](https://code.claude.com/docs/en/claude-apps-gateway-config) covers every option in the YAML file the quickstart writes, and the [deployment guide](https://code.claude.com/docs/en/claude-apps-gateway-deploy) covers per-IdP setup, Kubernetes and Cloud Run deployment, and operations.

## Why Claude apps gateway

The [gateway overview](https://code.claude.com/docs/en/gateways) covers what a gateway does and why you'd run one. Claude apps gateway is Anthropic's own gateway, built into the `claude` binary and tested alongside each Claude Code release, so it forwards the headers and request fields Claude Code sends without operators maintaining a separate allowlist. Once deployed it gives you:

* **Credentials**: the upstream API key or cloud credential lives only in your infrastructure. Developers authenticate with corporate SSO and receive short-lived bearer tokens, so offboarding happens in your IdP. Deprovision a user and their gateway access expires within the session lifetime, one hour by default.
* **Access control**: your IdP groups map to model allowlists and [managed settings](https://code.claude.com/docs/en/managed-settings) policies. The gateway enforces model access server-side, rejecting requests for non-granted models, and selects each group's managed settings policy, which the CLI applies at the [managed settings tier](https://code.claude.com/docs/en/settings#settings-precedence). Different teams get different models, tools, and permissions, and a developer can't override what their policy locks.
* **Settings delivery**: the gateway delivers managed settings to signed-in clients itself, taking the place of [server-managed settings](https://code.claude.com/docs/en/server-managed-settings) from the claude.ai admin console.
* **Telemetry**: each configured destination receives [OpenTelemetry Protocol (OTLP) metrics](https://code.claude.com/docs/en/monitoring-usage) with token counts, model, user identity, and latency by default, with logs and traces as per-destination opt-ins.
* **Upstream routing**: clients speak the Anthropic Messages API to the gateway, and the gateway translates for each upstream, whether Amazon Bedrock, [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws), Google Cloud's Agent Platform, Microsoft Foundry, or the Anthropic API, with failover between them. You can change regions, providers, or failover order without developers noticing or reconfiguring.

  <img src="https://mintcdn.com/claude-code/VbyXug8hBU9UK6oT/images/claude-gateway-architecture.svg?fit=max&auto=format&n=VbyXug8hBU9UK6oT&q=85&s=9e4f1190fc56718144190a3db61c63af" alt="Diagram showing Claude Code clients and Claude Desktop's Chat, Cowork, and Code tabs connecting over HTTPS with bearer tokens to a self-hosted Claude apps gateway inside your infrastructure, which signs users in against your IdP, stores auth state in PostgreSQL, relays telemetry to your OTLP collector, and forwards inference to Amazon Bedrock, Claude Platform on AWS, Google Cloud, Microsoft Foundry, or the Anthropic API" width="760" height="320" data-path="images/claude-gateway-architecture.svg" />

  The gateway's own data plane sends nothing to Anthropic infrastructure unless the Anthropic API is a configured upstream. You control where telemetry, audit logs, managed settings, and your developers' IdP identity go, and the gateway sends none of them to Anthropic. For the remaining traffic the CLI process can send and how to close it, see [Compliance posture](https://code.claude.com/docs/en/claude-apps-gateway-deploy#compliance-posture).

For which Claude Code features work through the gateway and what the server itself supports, see [Availability and limitations](#availability-and-limitations) below. For decisions such as cost, bypass, running multiple gateways, and serverless platforms, see the [deployment guide](https://code.claude.com/docs/en/claude-apps-gateway-deploy#deployment).

### Other gateway implementations

If you already run an LLM gateway or API gateway that meets your needs, keep using it; [Other LLM gateways](https://code.claude.com/docs/en/llm-gateway) covers configuring Claude Code against it.

The [gateway compatibility guide](https://code.claude.com/docs/en/llm-gateway-protocol) documents what Claude Code expects from any gateway: the endpoints it calls, the headers and body fields to forward, and what stops working when they're stripped. A running Claude apps gateway also serves its own protocol reference at `GET /protocol`, which describes the endpoints it exposes to Claude Code clients: SSO sign-in, inference, managed settings delivery, model discovery, and telemetry. Fetch it with `curl https://claude-gateway.internal.example.com/protocol` from any deployed gateway, such as the one the [quickstart](#quickstart) below produces.

Breaking changes to the protocol are announced in advance, but indefinite backwards compatibility isn't guaranteed.

## Quickstart

This quickstart walks the minimal path: register an OAuth client in your IdP, write a `gateway.yaml`, run the gateway alongside Postgres with Docker Compose, and verify sign-in end to end. It uses an Amazon Bedrock upstream; Claude Platform on AWS, Google Cloud's Agent Platform, Microsoft Foundry, and the Anthropic API are equally supported by swapping the `upstreams` block as shown in the [configuration reference](https://code.claude.com/docs/en/claude-apps-gateway-config#upstreams). At the end you have a gateway a developer can `/login` to.

  **Deploy on your private network.** Claude Code only connects to a gateway whose address is private. This is a security guard, because a trusted gateway can push settings that run commands on developer machines. Put the gateway behind an internal load balancer or VPN and give it a hostname that resolves to private IPs only.

### Prerequisites

Have these in place before you start:

| You need                                | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Code v2.1.195 or later           | The `claude gateway` subcommand and the gateway sign-in flow ship in v2.1.195. Earlier public builds don't include them. Both the machine running the gateway server and each developer's machine must be on v2.1.195 or later; run `claude update` to get the latest release. The [Claude Platform on AWS upstream](https://code.claude.com/docs/en/claude-apps-gateway-config#claude-platform-on-aws) requires Claude Code v2.1.198 or later on the gateway server.                                                                                                                                                                                                                                                   |
| OpenID Connect (OIDC) identity provider | Okta, Microsoft Entra ID, Google Workspace, Keycloak, or Dex, or any other OIDC-compliant IdP such as PingFederate. The gateway runs standard OIDC discovery and the authorization-code flow against it. SAML and LDAP aren't supported.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| PostgreSQL 14 or later                  | Backs the device sign-in flow, where the browser callback writes and the polling CLI reads, plus rate-limit counters. Any managed Postgres works, including the smallest tier. Without spend limits configured, the gateway stores a few KB of short-lived auth state; with [spend limits](https://code.claude.com/docs/en/claude-apps-gateway-spend-limits), it also holds durable spend, audit, and identity tables that should be backed up. TLS via `?sslmode=require` is recommended.                                                                                                                                                                                                                              |
| Model upstream                          | Amazon Bedrock credentials, Claude Platform on AWS credentials, Google Cloud credentials, a Microsoft Foundry resource, or an Anthropic API key. Multiple upstreams are supported with failover.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| HTTPS                                   | The gateway must be reachable over `https://` from developer laptops and from any browser used for sign-in; the gateway serves the device-verification page on the same listener. Either provide a TLS cert via `listen.tls` or run behind a TLS-terminating ingress, and set `listen.public_url` to the external origin in both cases. A plain `http://` origin is accepted only when the gateway host is loopback: `localhost`, `127.0.0.1`, or `::1`.                                                                                                                                                                                                                                    |
| Private-network address                 | At `/login`, Claude Code requires the gateway's hostname or IP address to resolve only to private addresses: RFC 1918, link-local, CGNAT `100.64.0.0/10`, IPv6 ULA `fc00::/7`, or loopback. For a gateway you host, any public address is rejected; see the [threat model](https://code.claude.com/docs/en/claude-apps-gateway-deploy#threat-model-summary) in the deployment guide. The check runs on each resolved IP, so if any address the name resolves to is public, `/login` rejects the URL. If developer machines route HTTPS through a corporate proxy, sign-in also requires the proxy host to resolve to private addresses; if it doesn't, add the gateway host to `NO_PROXY` so the CLI connects directly. |
| Linux runtime                           | The gateway server runs only on the native Linux binary. macOS works for local development. Windows isn't supported as a server platform.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### Steps
