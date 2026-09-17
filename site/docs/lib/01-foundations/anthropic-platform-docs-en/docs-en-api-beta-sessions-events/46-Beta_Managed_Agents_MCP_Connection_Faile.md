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
sourceRel: "docs/en/api/beta/sessions/events.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/events.md"
sourceSha256: "f0e0c20f4abb8b0c003df5a7b79ed32e56eaa3f30efeb7e3c91931c3e4e1cb51"
pageSha256: "2610e42270a069600531c641e3abe7a39d1cea72e069c5a48202d7fcbe19cb44"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents MCP Connection Failed Error

- `BetaManagedAgentsMCPConnectionFailedError object`

  Failed to connect to an MCP server.

  - `type: "mcp_connection_failed_error"`

  - `mcp_server_name: string`

    Name of the MCP server that failed to connect.

  - `message: string`

    Human-readable error description.

  - `retry_status: BetaManagedAgentsRetryStatusRetrying or BetaManagedAgentsRetryStatusExhausted or BetaManagedAgentsRetryStatusTerminal`

    What the client should do next in response to this error.

    - `BetaManagedAgentsRetryStatusRetrying object`

      The server is retrying automatically. Client should wait; the same error type may fire again as retrying, then once as exhausted when the retry budget runs out.

      - `type: "retrying"`

    - `BetaManagedAgentsRetryStatusExhausted object`

      This turn is dead; queued inputs are flushed and the session returns to idle. Client may send a new prompt.

      - `type: "exhausted"`

    - `BetaManagedAgentsRetryStatusTerminal object`

      The session encountered a terminal error and will transition to `terminated` state.

      - `type: "terminal"`
