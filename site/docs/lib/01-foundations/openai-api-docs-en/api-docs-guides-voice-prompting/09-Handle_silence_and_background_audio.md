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
pageSha256: "b4884c1cc0fd472039aa051d4d5a464be6bde053bda5ef9d9a0ee8150d957e80"
contentMode: "local-full"
zh: ""
---

## Handle silence and background audio

Voice agents tend to respond by default. In production, they often hear audio that should not receive a spoken response, such as silence, background noise, hold music, TV audio, or side conversations.

Use a no-op wait tool when the assistant should stay quiet and keep listening. The tool gives the model a valid non-speaking action instead of making it say things like "I'm here" or "I didn't catch that."

Tool design:

```json
{
  "name": "wait_for_user",
  "description": "Call this when the latest audio does not need a spoken response, such as silence, background noise, hold music, TV audio, side conversation, or speech not addressed to the assistant. This tool helps end the turn without a spoken reply.",
  "parameters": {
    "type": "object",
    "properties": {},
    "required": []
  }
}
```

Pair it with prompt instructions:

```text
## Handling Silence and Background Noise

If the latest audio is silence, background noise, hold music, TV audio, side conversation, or speech not addressed to you, call `wait_for_user`.

Do not respond conversationally after calling this tool.

Do not say "I'm here," "I didn't catch that," "Take your time," or "Let me know when you're ready."

Resume normal responses only when the user clearly addresses you or asks for help.
```

Use this for non-addressed audio, not for unclear user requests. If the user is clearly speaking to the assistant but the content is unintelligible, ask for clarification instead.
