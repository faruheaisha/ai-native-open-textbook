---
title: "openai-codex-docs-official"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/app-server.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/app-server.md"
sourceSha256: "a72a5c88ab05ab9737ec28b432708f2776f696be48eae09ee39c02dd2f9480e0"
pageSha256: "32c2fd4ec690e1730b60f432434759beaaa49bb96357e7f970f49cf77c9a1c09"
contentMode: "local-full"
zh: ""
---

## Protocol

Like [MCP](https://modelcontextprotocol.io/), `codex app-server` supports bidirectional communication using JSON-RPC 2.0 messages (with the `"jsonrpc":"2.0"` header omitted on the wire).

Supported transports:

- `stdio` (`--listen stdio://`, default): newline-delimited JSON (JSONL).
- `websocket` (`--listen ws://IP:PORT`, experimental and unsupported): one
  JSON-RPC message per WebSocket text frame.
- Unix socket (`--listen unix://` or `--listen unix://PATH`): WebSocket
  connections over Codex's default app-server control socket or a custom Unix
  socket path, using the standard HTTP Upgrade handshake.
- `off` (`--listen off`): don't expose a local transport.

When you run with `--listen ws://IP:PORT`, the same listener also serves basic
HTTP health probes:

- `GET /readyz` returns `200 OK` once the listener accepts new connections.
- `GET /healthz` returns `200 OK` when the request doesn't include an `Origin`
  header.
- Requests with an `Origin` header are rejected with `403 Forbidden`.

WebSocket transport is experimental and unsupported. Local listeners such as
`ws://127.0.0.1:PORT` are appropriate for localhost and SSH port-forwarding
workflows. Non-loopback WebSocket listeners currently allow unauthenticated
connections by default during rollout, so configure WebSocket auth before
exposing one remotely.

Supported WebSocket auth flags:

- `--ws-auth capability-token --ws-token-file /absolute/path`
- `--ws-auth capability-token --ws-token-sha256 HEX`
- `--ws-auth signed-bearer-token --ws-shared-secret-file /absolute/path`

For signed bearer tokens, you can also set `--ws-issuer`, `--ws-audience`, and
`--ws-max-clock-skew-seconds`. Clients present the credential as
`Authorization: Bearer <token>` during the WebSocket handshake, and app-server
enforces auth before JSON-RPC `initialize`.

Prefer `--ws-token-file` over passing raw bearer tokens on the command line. Use
`--ws-token-sha256` only when the client keeps the raw high-entropy token in a
separate local secret store; the hash is only a verifier, and clients still need
the original token.

In WebSocket mode, app-server uses bounded queues. When request ingress is full,
the server rejects new requests with JSON-RPC error code `-32001` and message
`"Server overloaded; retry later."` Clients should retry with an exponentially
increasing delay and jitter.
