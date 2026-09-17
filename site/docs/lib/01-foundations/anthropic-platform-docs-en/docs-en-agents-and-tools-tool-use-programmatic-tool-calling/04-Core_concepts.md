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
sourceRel: "docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md"
sourceSha256: "5256f453318138b7eb03910688ec74c8df7cbe541509c6528bbd721e702f7df1"
pageSha256: "1dfeeeb74fa18c95c22744aa09ef62f629496af3a08ff5811192fae3d1b7cb6b"
contentMode: "local-full"
zh: ""
---

## Core concepts

### The `allowed_callers` field

The `allowed_callers` field specifies which contexts can invoke a tool:

```json
{
  "name": "query_database",
  "description": "Execute a SQL query against the database",
  "input_schema": {
    // ...
  },
  "allowed_callers": ["code_execution_20260120"]
}
```

**Possible values:**

* `["direct"]` - Claude is guided to call this tool directly (default if omitted)
* `["code_execution_20260120"]` - Claude is guided to call this tool only from within code execution
* `["direct", "code_execution_20260120"]` - Claude may call this tool directly or from within code execution

Both `"code_execution_20260120"` and `"code_execution_20260521"` are accepted in `allowed_callers` and are interchangeable: a request using either code-execution tool version satisfies tools that list either caller. Response blocks always tag the caller as `code_execution_20260120` regardless of which version the request declared.

  Choose either `["direct"]` or `["code_execution_20260120"]` for each tool rather than enabling both, as this provides clearer guidance to Claude for how best to use the tool.

  `allowed_callers` controls how the tool is presented to Claude and is validated against `tool_choice`, but it is not a hard API-level block on direct invocation. Claude is strongly guided to respect it, but your client should still be prepared to handle a direct `tool_use` for any tool it defines. Do not rely on `allowed_callers` as a security boundary.

### The `caller` field in responses

Every tool use block includes a `caller` field indicating how it was invoked:

**Direct invocation (traditional tool use):**

```json
{
  "type": "tool_use",
  "id": "toolu_abc123",
  "name": "query_database",
  "input": { "sql": "<sql>" },
  "caller": { "type": "direct" }
}
```

**Programmatic invocation:**

```json
{
  "type": "tool_use",
  "id": "toolu_xyz789",
  "name": "query_database",
  "input": { "sql": "<sql>" },
  "caller": {
    "type": "code_execution_20260120",
    "tool_id": "srvtoolu_abc123"
  }
}
```

The `tool_id` is the `id` of the code execution `server_tool_use` block that made the call, so you can match each programmatic `tool_use` to the code execution run that produced it.

### Container lifecycle

Programmatic tool calling uses the same containers as code execution:

* **Container creation:** A new container is created for each request unless you reuse an existing one
* **Container ID:** Returned in responses in the `container` field, along with an `expires_at` timestamp
* **Reuse:** Pass the container ID back on the next request to keep state. While a programmatic tool call is waiting for your result, the container ID is required on that request, not optional: the API rejects the request without it.
* **Expiration:** `expires_at` tells you how long the container has left. Idle containers are currently reclaimed after about 5 minutes, and no container can be reused more than 30 days after it was created.

  While Claude's code is waiting for a programmatic tool result, the pending call times out after about 4 minutes and raises a `TimeoutError` inside the code. Return each tool result well before the `expires_at` timestamp on the paused response. See [Container expiration during tool call](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling#container-expiration-during-tool-call).
