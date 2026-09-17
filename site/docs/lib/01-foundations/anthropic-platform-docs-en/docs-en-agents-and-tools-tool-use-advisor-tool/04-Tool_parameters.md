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
pageSha256: "279c7838b35c5aff96fb1711b2adffe0f19e37c7d09f5a4d2758a6b47547fff2"
contentMode: "local-full"
zh: ""
---

## Tool parameters

| Parameter    | Type           | Default                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------ | -------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`       | string         | *required*                 | Must be `"advisor_20260301"`.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `name`       | string         | *required*                 | Must be `"advisor"`.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `model`      | string         | *required*                 | The advisor model ID, such as claude-opus-5. Billed at this model's rates for the sub-inference.                                                                                                                                                                                                                                                                                                                                                         |
| `max_uses`   | integer        | unlimited                  | Maximum number of advisor calls allowed in a single request. Once the executor reaches this cap, further advisor calls return an `advisor_tool_result_error` with `error_code: "max_uses_exceeded"` and the executor continues without further advice. This is a per-request cap, not a per-conversation cap. See [Cost control](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#cost-control) for conversation-level limits. |
| `max_tokens` | integer        | advisor model's output cap | Caps the advisor's total output (thinking plus text) per call. Minimum 1024. See [Capping advisor output](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#capping-advisor-output).                                                                                                                                                                                                                                            |
| `caching`    | object \| null | `null` (off)               | Enables [prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) for the advisor's own transcript across calls within a conversation. See [Advisor prompt caching](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#advisor-prompt-caching).                                                                                                                                                     |

The `caching` object has the shape `\{"type": "ephemeral", "ttl": "5m" | "1h"\}`. Unlike `cache_control` on content blocks, this is not a breakpoint marker. It is an on/off switch. The server determines where cache boundaries go.

The advisor tool also accepts the generic properties available on any tool definition: `cache_control`, `allowed_callers`, `defer_loading`, and `strict` (covered in [structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)). See the [Tool reference](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference#tool-definition-properties) for their semantics.
