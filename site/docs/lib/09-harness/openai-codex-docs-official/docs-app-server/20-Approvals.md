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
pageSha256: "64cc5f302a630e98b4db01ec53dae803885e040340206f44ecfdd4e899ea5294"
contentMode: "local-full"
zh: ""
---

## Approvals

Depending on a user's Codex settings, command execution and file changes may require approval. The app-server sends a server-initiated JSON-RPC request to the client, and the client responds with a decision payload.

- Command execution decisions: `accept`, `acceptForSession`, `decline`, `cancel`, or `\{ "acceptWithExecpolicyAmendment": \{ "execpolicy_amendment": ["cmd", "..."] \} \}`.
- File change decisions: `accept`, `acceptForSession`, `decline`, `cancel`.

- Requests include `threadId` and `turnId` - use them to scope UI state to the active conversation.
- The server resumes or declines the work and ends the item with `item/completed`.

### Command execution approvals

Order of messages:

1. `item/started` shows the pending `commandExecution` item with `command`, `cwd`, and other fields.
2. `item/commandExecution/requestApproval` includes `itemId`, `threadId`, `turnId`, optional `reason`, optional `command`, optional `cwd`, optional `commandActions`, optional `proposedExecpolicyAmendment`, optional `networkApprovalContext`, and optional `availableDecisions`. When `initialize.params.capabilities.experimentalApi = true`, the payload can also include experimental `additionalPermissions` describing requested per-command sandbox access. Any filesystem paths inside `additionalPermissions` are absolute on the wire.
3. Client responds with one of the command execution approval decisions above.
4. `serverRequest/resolved` confirms that the pending request has been answered or cleared.
5. `item/completed` returns the final `commandExecution` item with `status: completed | failed | declined`.

When `networkApprovalContext` is present, the prompt is for managed network access (not a general shell-command approval). The current v2 schema exposes the target `host` and `protocol`; clients should render a network-specific prompt and not rely on `command` being a user-meaningful shell command preview.

Codex groups concurrent network approval prompts by destination (`host`, protocol, and port). The app-server may therefore send one prompt that unblocks multiple queued requests to the same destination, while different ports on the same host are treated separately.

### File change approvals

Order of messages:

1. `item/started` emits a `fileChange` item with proposed `changes` and `status: "inProgress"`.
2. `item/fileChange/requestApproval` includes `itemId`, `threadId`, `turnId`, optional `reason`, and optional `grantRoot`.
3. Client responds with one of the file change approval decisions above.
4. `serverRequest/resolved` confirms that the pending request has been answered or cleared.
5. `item/completed` returns the final `fileChange` item with `status: completed | failed | declined`.

### `tool/requestUserInput`

When the client responds to `item/tool/requestUserInput`, app-server emits `serverRequest/resolved` with `\{ threadId, requestId \}`. If the pending request is cleared by turn start, turn completion, or turn interruption before the client answers, the server emits the same notification for that cleanup.

Request params include `autoResolutionMs` as an integer millisecond timeout or
`null`. When present, host clients can resolve the prompt automatically after that
interval if the user doesn't answer.

### Permission requests

The built-in `request_permissions` tool sends
`item/permissions/requestApproval` with the `threadId`, `turnId`, `itemId`,
`environmentId`, `cwd`, optional `reason`, and requested network or filesystem
permissions. Respond with `permissions` containing only the granted subset.
Set `scope` to `"session"` to persist the grant for later turns in the same
session; omit it or use `"turn"` for a turn-scoped grant. Permissions that
weren't requested are ignored.

### MCP server elicitation requests

An MCP server can interrupt a turn with `mcpServer/elicitation/request`. The
request includes `threadId`, an optional `turnId`, `serverName`, and one of
these request shapes:

- `mode: "form"` or `mode: "openai/form"`, with `message` and
  `requestedSchema`.
- `mode: "url"`, with `message`, `url`, and `elicitationId`.

Respond with `action: "accept"` and the requested `content`, or with
`action: "decline"` or `"cancel"` and `content: null`. App-server then emits
`serverRequest/resolved`. To receive the `openai/form` variant, opt in with
`initialize.params.capabilities.mcpServerOpenaiFormElicitation`.

### Dynamic tool calls (experimental)

`dynamicTools` on `thread/start` and the corresponding `item/tool/call` request or response flow are experimental APIs.

Dynamic tool names and namespace names must follow Responses API naming
constraints. Avoid reserved namespace names used by built-in Codex tools.

When a dynamic tool is invoked during a turn, app-server emits:

1. `item/started` with `item.type = "dynamicToolCall"`, `status = "inProgress"`, plus `tool` and `arguments`.
2. `item/tool/call` as a server request to the client.
3. The client response payload with returned content items.
4. `item/completed` with `item.type = "dynamicToolCall"`, the final `status`, and any returned `contentItems` or `success` value.

### MCP tool-call approvals (apps)

App (connector) tool calls can also require approval. When an app tool call has side effects, the server may elicit approval with `tool/requestUserInput` and options such as **Accept**, **Decline**, and **Cancel**. Destructive tool annotations always trigger approval even when the tool also advertises less-privileged hints. If the user declines or cancels, the related `mcpToolCall` item completes with an error instead of running the tool.
