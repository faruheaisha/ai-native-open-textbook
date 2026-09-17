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
pageSha256: "871e60284eae165bfe3ca3b464232429cd251f144a045e1a465ac6b8824b6f57"
contentMode: "local-full"
zh: ""
---

## Reference Pronunciations

This section covers how to ensure the model pronounces important words, numbers, names, and terms correctly during spoken interactions.

- **When to use**: Brand names, technical terms, or locations are often mispronounced.
- **What it does**: Improves trust and clarity with phonetic hints.
- **How to adapt**: Keep to a short list; update as you hear errors.

#### Example

```
# Reference Pronunciations
When voicing these words, use the respective pronunciations:
- Pronounce “SQL” as “sequel.”
- Pronounce “PostgreSQL” as “post-gress.”
- Pronounce “Kyiv” as “KEE-iv.”
- Pronounce "Huawei" as “HWAH-way”
```

Earlier realtime preview:

  `gpt-realtime-1.5`:

  With the reference pronunciation instructions, `gpt-realtime-1.5` can correctly pronounce SQL as "sequel."

### Alphanumeric Pronunciations

Realtime S2S can blur or merge digits/letters when reading back key info (phone, credit card, order IDs). Explicit character-by-character confirmation prevents mishearing and drives clearer synthesis.

- **When to use**: If the model struggles to capture or read back phone numbers, card numbers, 2FA codes, order IDs, serials, addresses, unit numbers, or mixed alphanumeric strings.
- **What it does**: Forces the model to speak one character at a time with separators, then confirm with the user and reconfirm after corrections. Optionally uses a phonetic disambiguator for letters (e.g., “A as in Alpha”).

#### Example (general instruction section)

```
# Instructions/Rules
- When reading numbers or codes, speak each character separately, separated by hyphens (e.g., 4-1-5).
- Repeat EXACTLY the provided number; do not omit any digits.
```

_Tip: If you are following a conversation flow prompting strategy, you can specify which conversation state needs to apply the alpha-numeric pronunciations instruction._

#### Example (instruction in conversation state)

_(taken from the conversation flow of the prompt of our [openai-realtime-agents](https://github.com/openai/openai-realtime-agents/blob/main/src/app/agentConfigs/customerServiceRetail/authentication.ts))_

```txt
{
    "id": "3_get_and_verify_phone",
    "description": "Request phone number and verify by repeating it back.",
    "instructions": [
      "Politely request the user’s phone number.",
      "Once provided, confirm it by repeating each digit and ask if it’s correct.",
      "If the user corrects you, confirm AGAIN to make sure you understand.",
    ],
    "examples": [
      "I'll need some more information to access your account if that's okay. May I have your phone number, please?",
      "You said 0-2-1-5-5-5-1-2-3-4, correct?",
      "You said 4-5-6-7-8-9-0-1-2-3, correct?"
    ],
    "transitions": [{
      "next_step": "4_authentication_DOB",
      "condition": "Once phone number is confirmed"
    }]
}
```

These are the responses **before** applying the instruction using `gpt-realtime-1.5`.

> Sure! The number is 55119765423. Let me know if you need anything else!

These are the responses **after** applying the instruction using `gpt-realtime-1.5`.

> Sure! The number is: 5-5-1-1-1-9-7-6-5-4-2-3. Please let me know if you need anything else!
