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
sourceRel: "docs/en/agents-and-tools/mcp-tunnels/reference.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/mcp-tunnels/reference.md"
sourceSha256: "993f6f49c6d0b754e52a7a6335ec28c3d1ac819ac27fe0c214e27259a5ad9162"
pageSha256: "993f6f49c6d0b754e52a7a6335ec28c3d1ac819ac27fe0c214e27259a5ad9162"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

MCP tunnels are in research preview. [Request access](https://claude.com/form/mcp-tunnels) to try them.

## Proxy configuration

The [proxy](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) reads its configuration from `/etc/mcp-gateway/config.yaml` (Compose) or the rendered ConfigMap (Helm, populated from `gateway.config.*`).

| Field                             | Description                                                                                                                                                                                                     | Default                                         |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `listen_addr`                     | Address and port to listen on.                                                                                                                                                                                  | Required                                        |
| `log_level`                       | Logging verbosity: `debug`, `info`, `warn`, or `error`.                                                                                                                                                         | `info`                                          |
| `shutdown_timeout`                | How long to wait for in-flight requests during graceful shutdown.                                                                                                                                               | `30s`                                           |
| `tunnel_domain`                   | Base domain assigned to the tunnel. When set, route lookup strips this suffix from incoming hostnames so `routes` keys can be bare subdomains (`wiki`). When empty, `routes` keys must be exact full hostnames. | Required when `routes` keys are bare subdomains |
| `tls.cert_file`                   | Path to the server TLS certificate.                                                                                                                                                                             | Required                                        |
| `tls.key_file`                    | Path to the server TLS private key.                                                                                                                                                                             | Required                                        |
| `routes`                          | Map of subdomain or full hostname to upstream URL. See [Route matching](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/reference#route-matching).                                             | Required                                        |
| `upstream.allowed_ips`            | IPv4 CIDR ranges or single addresses the proxy is permitted to connect to. Mutually exclusive with `disable_ip_validation`.                                                                                     | RFC1918 private ranges                          |
| `upstream.disable_ip_validation`  | Disable upstream IP validation entirely. Mutually exclusive with `allowed_ips`.                                                                                                                                 | `false`                                         |
| `upstream.tls.ca_file`            | CA bundle for validating upstream TLS.                                                                                                                                                                          | None                                            |
| `upstream.tls.include_system_cas` | Also trust the system CA bundle for upstream TLS.                                                                                                                                                               | `false`                                         |

For `https://` upstream routes, set at least one of `upstream.tls.ca_file` or `upstream.tls.include_system_cas`; otherwise the proxy has no trust anchor for the upstream certificate.

### Route matching

`routes` is a flat string map (`map[string]string`), not a list. The proxy looks up the incoming hostname by exact match first, then by stripping the `tunnel_domain` suffix and matching the remaining subdomain. The match considers only the hostname; the request path and query string are forwarded to the [upstream MCP server](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) unchanged.

Each upstream value must be exactly `scheme://host:port`. The port is mandatory. Including a path is rejected at config load with `invalid upstream (must be scheme://host:port)`.

## Tunnels API

The Tunnels REST API lives at `/v1/tunnels` and supports creating, listing, and archiving tunnels, registering CA certificates, and revealing or rotating the tunnel token. See the [Tunnels API reference](https://platform.claude.com/docs/en/api/beta/tunnels/list) for all endpoints, request and response schemas, and examples.

  The previous Admin API surface at `/v1/organizations/tunnels` (beta header `mcp-tunnels-2026-05-19`, scope `org:manage_tunnels`) continues to work during a migration window and remains documented in the [Admin API reference](https://platform.claude.com/docs/en/api/admin/mcp_tunnels) with a deprecation notice. To migrate, update the path to `/v1/tunnels`, the beta header to `mcp-tunnels-2026-06-22`, and your WIF token scope to `workspace:manage_tunnels`.

  All MCP tunnels endpoints require a bearer token with the `workspace:manage_tunnels` scope obtained through [Workload Identity Federation](https://platform.claude.com/docs/en/manage-claude/workload-identity-federation). Admin API keys are not accepted.

Required headers on every request:

| Header              | Value                                      |
| ------------------- | ------------------------------------------ |
| `Authorization`     | `Bearer <token>` (the WIF-exchanged token) |
| `anthropic-version` | `2023-06-01`                               |
| `anthropic-beta`    | `mcp-tunnels-2026-06-22`                   |

## Certificate requirements

The [setup component](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) generates compliant certificates automatically. These requirements apply only if you issue certificates through your own PKI.

### CA certificate

Upload with `POST /v1/tunnels/\{tunnel_id\}/certificates`. A tunnel can hold up to two active CA certificates at a time, which allows zero-downtime rotation.

* PEM-encoded, single certificate, up to 8 kB.
* `BasicConstraints` extension present with `CA:TRUE`, marked critical.
* `SubjectKeyIdentifier` extension present.
* `KeyUsage` includes `keyCertSign`.
* Within its validity period.
* RSA 2048-bit or larger, or ECDSA P-256 or larger, with a SHA-256 or stronger signature.

### Server certificate

Presented by the proxy during [inner TLS](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components).

* Signed directly by a registered CA (no intermediates).
* `AuthorityKeyIdentifier` extension present and matching the CA's `SubjectKeyIdentifier`.
