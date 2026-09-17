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
sourceRel: "docs/en/agents-and-tools/tool-use/advisor-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/advisor-tool.md"
sourceSha256: "e798608a5dfa622e88c58c702ea92d194e53b19d6d35af59857ed01dddea26ab"
pageSha256: "b56c2425a73f2d618cd82d69293851596e459f727e97b73d773a4f06f99e86e8"
contentMode: "local-full"
zh: ""
---

## Response structure

### Successful advisor call

When the advisor is called, a `server_tool_use` block is followed by an `advisor_tool_result` block in the assistant's content. The following example shows the plaintext `advisor_result` variant returned by a Claude Opus 4.8 advisor. The [Quick start](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#quick-start) uses Claude Opus 5, which returns the encrypted `advisor_redacted_result` variant instead; see [Result variants](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#result-variants) for both shapes side by side.

```json
{
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Let me consult the advisor on this."
    },
    {
      "type": "server_tool_use",
      "id": "srvtoolu_abc123",
      "name": "advisor",
      "input": {}
    },
    {
      "type": "advisor_tool_result",
      "tool_use_id": "srvtoolu_abc123",
      "content": {
        "type": "advisor_result",
        "text": "Use a channel-based coordination pattern. The tricky part is draining in-flight work during shutdown: close the input channel first, then wait on a WaitGroup..."
      }
    },
    {
      "type": "text",
      "text": "Here's the implementation. I'm using a channel-based coordination pattern to avoid writer starvation..."
    }
  ]
}
```

The `server_tool_use.input` is always empty. The server constructs the advisor's view from the full transcript automatically. Nothing the executor puts in `input` reaches the advisor.

### Result variants

The `advisor_tool_result.content` field is a discriminated union. For successful calls, the variant depends on the advisor model:

| Variant                   | Fields                             | Returned when                                                       |
| ------------------------- | ---------------------------------- | ------------------------------------------------------------------- |
| `advisor_result`          | `text`, `stop_reason`              | The advisor model returns plaintext (for example, Claude Opus 4.8). |
| `advisor_redacted_result` | `encrypted_content`, `stop_reason` | The advisor model returns encrypted output.                         |

  Claude Fable 5.1, Claude Mythos 5.1, Claude Opus 5, Claude Fable 5, and Claude Mythos 5 advisors return the encrypted `advisor_redacted_result`. Every other advisor model in the [compatibility table](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#model-compatibility) returns the plaintext `advisor_result`. To read the advice text in your own responses, use an advisor that returns plaintext, such as `claude-opus-4-8`, where your executor's row in the [compatibility table](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#model-compatibility) lists one. Claude Fable 5.1, Claude Mythos 5.1, Claude Opus 5, Claude Fable 5, and Claude Mythos 5 executors pair only with advisors that return the encrypted form, so on those executors the advice text isn't readable in the response.

Here is the same request sent twice, identical except for the advisor `model` in the tool definition, showing both variants.

With `"model": "claude-opus-4-8"`, the advice is plaintext:

```json
{
  "type": "advisor_tool_result",
  "tool_use_id": "srvtoolu_abc123",
  "content": {
    "type": "advisor_result",
    "text": "Use a channel-based coordination pattern. The tricky part is draining in-flight work during shutdown: close the input channel first, then wait on a WaitGroup..."
  }
}
```

With `"model": "claude-opus-5"`, the advice is encrypted:

```json
{
  "type": "advisor_tool_result",
  "tool_use_id": "srvtoolu_abc123",
  "content": {
    "type": "advisor_redacted_result",
    "encrypted_content": "EqQBCkYIBRgCIiQ5ZjE0N2M2OC0yYWIxLTRkZTktYjA3ZC1hZTUyMzkxYjhkMmU..."
  }
}
```

Both result variants carry a `stop_reason` field when you set [`max_tokens`](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#capping-advisor-output) on the tool definition, and omit it when you do not. It holds the advisor sub-call's stop reason, typically `"end_turn"`, or `"max_tokens"` when the cap is hit. The values match the top-level Messages API [`stop_reason`](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons).

With `advisor_result`, the `text` field contains human-readable advice. With `advisor_redacted_result`, the `encrypted_content` field contains an opaque blob that you cannot read. On the next turn, the server decrypts it and renders the plaintext into the executor's prompt.

In both cases, round-trip the content verbatim on subsequent turns. If you switch advisor models mid-conversation, branch on `content.type` to handle both shapes.

### Error results

If the advisor call fails, the result carries an error:

```json
{
  "type": "advisor_tool_result",
  "tool_use_id": "srvtoolu_abc123",
  "content": {
    "type": "advisor_tool_result_error",
    "error_code": "overloaded"
  }
}
```

The executor sees the error and continues without further advice. The request itself does not fail.

| `error_code`              | Meaning                                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `max_uses_exceeded`       | The request reached the `max_uses` cap set on the tool definition. Further advisor calls in the same request return this error. |
| `too_many_requests`       | The advisor sub-inference was rate-limited.                                                                                     |
| `overloaded`              | The advisor sub-inference hit capacity limits.                                                                                  |
| `prompt_too_long`         | The transcript exceeded the advisor model's context window.                                                                     |
| `execution_time_exceeded` | The advisor sub-inference timed out.                                                                                            |
| `model_not_found`         | The configured advisor model is not available.                                                                                  |
| `unavailable`             | Any other advisor failure.                                                                                                      |

Advisor rate limits draw from the same per-model bucket as direct calls to the advisor model. A rate limit on the advisor appears as `too_many_requests` inside the tool result. A rate limit on the executor fails the whole request with HTTP 429.
