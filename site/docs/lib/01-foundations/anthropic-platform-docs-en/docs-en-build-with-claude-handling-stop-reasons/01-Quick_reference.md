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
sourceRel: "docs/en/build-with-claude/handling-stop-reasons.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/handling-stop-reasons.md"
sourceSha256: "efd90d3307adede99c65ae6faf26c590849b8ab2bf63e365825480e91855cdfd"
pageSha256: "1a77dab74c492a09c902177144a35de8e4c79d6420b4d8cce80db2b5ab627b0f"
contentMode: "local-full"
zh: ""
---

## Quick reference

| Value                                                                                                                                        | When it occurs                                  | What to do                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`end_turn`](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#end-turn)                                           | Claude finished its response naturally.         | Use the response.                                                                                                                                       |
| [`max_tokens`](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#max-tokens)                                       | The response reached your `max_tokens` limit.   | Raise `max_tokens` or [continue the response](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#ensuring-complete-responses). |
| [`stop_sequence`](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#stop-sequence)                                 | Claude emitted one of your `stop_sequences`.    | Read `stop_sequence` to see which one fired.                                                                                                            |
| [`tool_use`](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#tool-use)                                           | Claude is calling a tool.                       | Run the tool and return the result. A server tool call still missing its result block completes in a later response.                                    |
| [`pause_turn`](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#pause-turn)                                       | A server-tool loop reached its iteration limit. | Send the assistant content back to continue.                                                                                                            |
| [`refusal`](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#refusal)                                             | Claude declined to respond.                     | Read `stop_details` and [retry on a fallback model](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback).                       |
| [`model_context_window_exceeded`](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#model-context-window-exceeded) | The response filled the model's context window. | Treat the response as truncated.                                                                                                                        |
