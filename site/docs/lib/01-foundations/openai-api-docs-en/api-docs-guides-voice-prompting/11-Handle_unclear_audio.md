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
pageSha256: "1297813532e54cc4d6af44853f555a76c5e784c679888b7ac5d6a5a1ea4707e6"
contentMode: "local-full"
zh: ""
---

## Handle unclear audio

The model should only act on audio it can understand with confidence. If the audio is unclear, the model should ask a brief clarification question instead of guessing.

Do not let the model infer missing words, call tools, capture entities, generate preambles, or spend hidden reasoning time trying to reconstruct what the user may have said.

```text
## Unclear Audio

- Only respond to clear audio or text.
- If the user's audio is not clear, ask for clarification using a short English phrase such as "Sorry, could you repeat that clearly?"
- Don't repeat the same unclear-audio clarification twice.
- Treat audio as unclear if it is ambiguous, noisy, silent, unintelligible, partially cut off, or if you are unsure of the exact words the user said.
- Do not guess what the user meant from unclear audio.
- Do not reason when the audio is unclear.
- Do not provide a preamble or call tools in the commentary channel when the audio is unclear.
```

Example:

> User audio: "Check order three one-" [cut off]

Bad:

> Assistant: I'll check order 31 now.

Good:

> Assistant: I heard only part of the order number. Could you repeat it digit by digit?
