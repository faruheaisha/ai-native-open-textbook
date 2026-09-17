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
pageSha256: "05b3a7170294c215f46143c0c254d5a2df0ab02fdd2847d10093f2aa2d9d9fbc"
contentMode: "local-full"
zh: ""
---

## Error handling

### Common errors

| Error                                      | Where it appears                                                             | Description                                                                    | Solution                                                                                                                         |
| ------------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `invalid_tool_input`                       | `error_code` on the `code_execution_tool_result` error block in the response | Invalid parameters were passed to the code execution tool                      | See the [code execution tool errors](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool#errors)   |
| `invalid_request_error` (on `tool_choice`) | HTTP 400 error response                                                      | `tool_choice` names a tool whose `allowed_callers` does not include `"direct"` | Either add `"direct"` to that tool's `allowed_callers`, or remove the tool from `tool_choice` and let Claude invoke it from code |

### Container expiration during tool call

If your tool result doesn't arrive within about 4 minutes, the pending call raises a `TimeoutError` inside Claude's running code. Claude sees the error in `stderr` and typically retries the call:

```json
{
  "type": "code_execution_tool_result",
  "tool_use_id": "srvtoolu_abc123",
  "content": {
    "type": "code_execution_result",
    "stdout": "",
    "stderr": "TimeoutError: Calling tool ['query_database'] timed out (no response after 270s).",
    "return_code": 0,
    "content": []
  }
}
```

To prevent timeouts:

* Monitor the `expires_at` field in responses
* Implement timeouts for your tool execution
* Consider breaking long operations into smaller chunks

### Tool execution errors

If your tool returns an error:

```json
{
  "type": "tool_result",
  "tool_use_id": "toolu_abc123",
  "content": "Error: Query timeout - table lock exceeded 30 seconds"
}
```

Claude's code receives this error and can handle it appropriately.
