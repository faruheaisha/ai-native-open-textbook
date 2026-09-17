---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-sdk/python.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/python.md"
sourceSha256: "f49fb09963fda69499dc97a835a8db4970f3cd3070dff7f68ae6b644bd544987"
pageSha256: "3299e2c3d703955486ba5d722e0d6a55ba0800cf2443f02783f88a66e66a14a5"
contentMode: "local-full"
zh: ""
---

## Choosing between `query()` and `ClaudeSDKClient`

The Python SDK provides two ways to interact with Claude Code:

| Feature             | `query()`                                      | `ClaudeSDKClient`                  |
| :------------------ | :--------------------------------------------- | :--------------------------------- |
| **Session**         | Creates a new session by default               | Reuses same session                |
| **Conversation**    | Single exchange                                | Multiple exchanges in same context |
| **Connection**      | Managed automatically                          | Manual control                     |
| **Streaming Input** | ✅ Supported                                    | ✅ Supported                        |
| **Interrupts**      | ❌ Not supported                                | ✅ Supported                        |
| **Hooks**           | ✅ Supported                                    | ✅ Supported                        |
| **Custom Tools**    | ✅ Supported                                    | ✅ Supported                        |
| **Continue Chat**   | Manual via `continue_conversation` or `resume` | ✅ Automatic                        |
| **Use Case**        | One-off tasks                                  | Continuous conversations           |

Use `ClaudeSDKClient` for interactive applications such as chat interfaces, or when the next action depends on Claude's response.
