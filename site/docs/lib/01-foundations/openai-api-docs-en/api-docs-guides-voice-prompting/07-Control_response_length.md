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
pageSha256: "6287e5a4e6320f893701bd51fd5a2aa16fe40e12e1788b4027f6fb474d4d0b2f"
contentMode: "local-full"
zh: ""
---

## Control response length

`gpt-realtime-2` follows length guidance best when the prompt specifies how much detail to give for each task type. Instead of telling the model to "be concise," define what concise means in context: direct answers, tool results, troubleshooting, comparisons, and escalations may each need different response lengths.

```text
## Verbosity

- Direct answers: Use 1-2 short sentences.
- Clarifying questions: Ask one question at a time.
- Tool results: Summarize the result first, then give only the next useful action.
- Product or option comparisons: Include key differences, tradeoffs, and who each option fits.
- Troubleshooting: Give one step at a time unless the user asks for the full procedure.
- Escalations: Briefly explain why escalation is needed and what will happen next.
```

Example:

> User: Which plan should I choose?

> Assistant: If you want the lowest cost, choose Basic. If you need team permissions and shared billing, choose Pro. If compliance review or admin controls matter, choose Enterprise.
