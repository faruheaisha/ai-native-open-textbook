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
pageSha256: "a6150b6c2ebf8f0dcd7b9edb01875069c9ae5acb83c2146ddf3761dae7e01921"
contentMode: "local-full"
zh: ""
---

## Initialization

Clients must send a single `initialize` request per transport connection before invoking any other method on that connection, then acknowledge with an `initialized` notification. Requests sent before initialization receive a `Not initialized` error, and repeated `initialize` calls on the same connection return `Already initialized`.

The server returns the user agent string it will present to upstream services plus `platformFamily` and `platformOs` values that describe the runtime target. Set `clientInfo` to identify your integration.

`initialize.params.capabilities` also supports these client capabilities:

- `optOutNotificationMethods` - exact notification method names to suppress for
  this connection. Matching is exact (no wildcards or prefixes); unknown names
  are accepted and ignored.
- `requestAttestation` - opt into the server-initiated `attestation/generate`
  request. Desktop hosts that provide upstream attestation respond with an
  opaque `\{ "token": "..." \}` value.
- `mcpServerOpenaiFormElicitation` - allow downstream MCP servers to send the
  OpenAI extended-form variant of `mcpServer/elicitation/request`.

**Important**: Use `clientInfo.name` to identify your client for the OpenAI Compliance Logs Platform. If you are developing a new Codex integration intended for enterprise use, please contact OpenAI to get it added to a known clients list. For more context, see the [Codex logs reference](https://chatgpt.com/public/admin/api-reference#tag/Codex).

Example (from the Codex VS Code extension):

```json
{
  "method": "initialize",
  "id": 0,
  "params": {
    "clientInfo": {
      "name": "codex_vscode",
      "title": "Codex VS Code Extension",
      "version": "0.1.0"
    }
  }
}
```

Example with notification opt-out:

```json
{
  "method": "initialize",
  "id": 1,
  "params": {
    "clientInfo": {
      "name": "my_client",
      "title": "My Client",
      "version": "0.1.0"
    },
    "capabilities": {
      "experimentalApi": true,
      "optOutNotificationMethods": ["thread/started", "item/agentMessage/delta"]
    }
  }
}
```
