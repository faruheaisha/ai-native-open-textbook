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
sourceRel: "docs/en/agents-and-tools/mcp-tunnels/troubleshooting.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/mcp-tunnels/troubleshooting.md"
sourceSha256: "516d6a58997702e8f6aedbdd3beea5510c0a9c078321e5a95f8e4c3a550f5f2c"
pageSha256: "516d6a58997702e8f6aedbdd3beea5510c0a9c078321e5a95f8e4c3a550f5f2c"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

MCP tunnels are in research preview. [Request access](https://claude.com/form/mcp-tunnels) to try them.

A request through the tunnel can fail at one of three layers; diagnose them in order: the outbound connection to the [tunnel edge](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components), the [inner TLS](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) from Anthropic to your [proxy](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components), then routing and IP validation toward the [upstream MCP server](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components).

## Quick reference

| Symptom                                                                                                                                                        | Cause                                                                                               | Fix                                                                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tunnel doesn't appear in the agent **+ MCP Server** picker                                                                                                     | The picker only lists tunnels in the session's workspace that have at least one active certificate. | Register a CA certificate, or open the session in the workspace the tunnel was created in.                                                                            |
| Caller sees HTTP 500; [cloudflared](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/concepts#components) logs `No ingress rules were defined` | cloudflared has no local target.                                                                    | Add `--url http://localhost:8080` and `network_mode: "service:mcp-proxy"` to the cloudflared service.                                                                 |
| Proxy logs `no route for host`                                                                                                                                 | `tunnel_domain` doesn't match the assigned domain, or `config.yaml` was edited without restarting.  | Set `tunnel_domain` to the exact domain shown on the tunnel detail page, then restart the proxy (`docker compose restart mcp-proxy`).                                 |
| Proxy logs `IP validation failed: <ip> is not a private address`                                                                                               | Upstream MCP server resolves outside RFC1918.                                                       | See [Upstream IP validation](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/troubleshooting#upstream-ip-validation).                                |
| Proxy exits with `cannot unmarshal !!seq into map[string]string`                                                                                               | `routes` is a YAML list.                                                                            | Use `routes: \{ name: http://host:port \}`.                                                                                                                             |
| Proxy exits with `open /data/tls.key: permission denied`                                                                                                       | The key is `0600`; the proxy container runs non-root.                                               | `chmod 644 data/tls.key`.                                                                                                                                             |
| `curl https://<proxy>:8080` fails with `wrong version number`                                                                                                  | Expected; the listener is plaintext WebSocket. TLS happens inside the WS stream.                    | Verify through a [Managed Agent or the Messages API](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/overview#use-the-tunneled-mcp-servers) instead. |

The following sections cover failures that need more than a one-line fix.

## OAuth fails behind a source-IP allowlist

OAuth flows fail when your authorization server's source-IP allowlist blocks Anthropic's backend from reaching `/token`, `/register`, and the discovery endpoints. If you'd rather not allowlist Anthropic's egress ranges, you can route the backend-to-backend OAuth calls through the tunnel while keeping the browser-facing `/authorize` endpoint on your existing public hostname.

    ```yaml
    routes:
      mcp: http://your-mcp-server:8080
      auth: http://your-auth-server:8080
    ```

    Restart the proxy after editing `routes` (`docker compose restart mcp-proxy`, or `helm upgrade`).

    Your authorization server's `/.well-known/oauth-authorization-server` response should point `authorization_endpoint` at your existing allowlisted hostname and everything else at the tunnel:

    ```json
    \{
