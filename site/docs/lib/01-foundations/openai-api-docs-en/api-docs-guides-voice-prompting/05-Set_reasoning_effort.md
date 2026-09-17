---
title: "OpenAI API 文档（英文）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/voice-prompting.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/voice-prompting.md"
sourceSha256: "5f08b8a5661181c66582baad274d7700e4aba37b4fd02cc2e4b41265a24ea075"
pageSha256: "c7f677066751f8c831318ea6214cb3e8c4a73ee97665e9d82131475e2dabbddb"
contentMode: "local-full"
zh: ""
---

## Set reasoning effort

`gpt-realtime-2` can trade latency for deeper reasoning. Use the lowest reasoning level that still gives the assistant enough intelligence for the workflow.

Start with `low` for most production voice agents. Tune up or down based on task complexity, latency tolerance, and failure cost.

| Effort    | Use when                                            | Example                                                                 |
| --------- | --------------------------------------------------- | ----------------------------------------------------------------------- |
| `minimal` | Lowest latency matters most and the task is simple. | Smart-home commands, timers, simple calendar checks.                    |
| `low`     | You need responsiveness plus basic reasoning.       | Customer support, order lookup, simple policy questions.                |
| `medium`  | The assistant must reason through multi-step tasks. | Technical support, diagnostics, complex routing.                        |
| `high`    | Deeper reasoning materially improves success.       | High-precision workflows, escalation decisions, tasks with constraints. |
| `xhigh`   | Maximum reasoning is worth added latency and cost.  | Complex planning, critical triage, high-stakes tool orchestration.      |

Beyond the API setting, steer the model on when and how much to reason.

```text
## Reasoning

- For direct answers, simple lookups, and short confirmations, respond quickly and do not reason.
- For multi-step tasks, tool decisions, troubleshooting, or escalation, reason before acting.
- Do not perform extended reasoning when the user's audio is unclear; ask for clarification instead.
```
