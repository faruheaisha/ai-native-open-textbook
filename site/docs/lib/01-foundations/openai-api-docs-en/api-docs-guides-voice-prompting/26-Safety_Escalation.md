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
pageSha256: "9227562b38abad16efd6f2ad5a2a5b94f53bf30e924e4c109e89aa338658847d"
contentMode: "local-full"
zh: ""
---

## Safety & Escalation

Often with Realtime voice agents, having a reliable way to escalate to a human is important. In this section, you should modify the instructions on WHEN to escalate depending on your use case.

- **When to use**: Model is struggling to determine when to properly escalate to a human or fallback system
- **What it does**: Defines fast, reliable escalation and what to say.
- **How to adapt**: Insert your own thresholds and what the model has to say.

#### Example

```
# Safety & Escalation
When to escalate (no extra troubleshooting):
- Safety risk (self-harm, threats, harassment)
- User explicitly asks for a human
- Severe dissatisfaction (e.g., “extremely frustrated,” repeated complaints, profanity)
- **2** failed tool attempts on the same task **or** **3** consecutive no-match/no-input events
- Out-of-scope or restricted (e.g., real-time news, financial/legal/medical advice)

What to say at the same time as calling the escalate_to_human tool (MANDATORY):
- “Thanks for your patience—I’m connecting you with a specialist now.”
- Then call the tool: `escalate_to_human`

Examples that would require escalation:
- “This is the third time the reset didn’t work. Just get me a person.”
- “I am extremely frustrated!”
```

The first example shows conversation responses from `gpt-4o-realtime-preview-2025-06-03` using the instruction.

![escalate 06](https://developers.openai.com/cookbook/assets/images/escalate_06.png)

The second example shows conversation responses from `gpt-realtime-1.5` using the instruction.

![escalate 07](https://developers.openai.com/cookbook/assets/images/escalate_07.png)

`gpt-realtime-1.5` is able to follow the instruction and escalate to a human more reliably.
