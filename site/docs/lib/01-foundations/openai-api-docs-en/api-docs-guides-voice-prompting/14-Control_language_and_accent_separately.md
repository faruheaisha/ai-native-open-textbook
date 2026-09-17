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
pageSha256: "8ad7286bee8d34869e802907072ba162f0817f9d6fdc6a1d159a933f2a17cec6"
contentMode: "local-full"
zh: ""
---

## Control language and accent separately

Language and accent should be controlled separately.

A user's accent is not the same as their intended language. A user may speak English with a Hindi, Spanish, French, or Mandarin accent and still expect English responses.

Avoid broad language instructions such as:

```text
Mirror the user.
Respond naturally in the user's language.
Switch languages when appropriate.
Sound local.
Adapt to the user's accent.
```

These are too broad. The model may interpret accent, filler words, backchannels, or isolated foreign words as a reason to switch languages.

### English language policy

```text
## Language

English is the default response language.

- Do not infer language from accent alone.
- Ignore short filler sounds, backchannels, and isolated foreign words for language detection.
- Only switch languages if the user explicitly asks or provides a substantive utterance in another language.
- If language confidence is low, ask a short clarification instead of guessing.
- Keep preambles, spoken bridges, tool-related messages, and final answers in the same language.
- Accent adaptation must not change the response language.
```

### Multilingual policy

```text
## Language

Default to English unless the user clearly uses another language.

Switch languages only when:

- the user explicitly asks to use another language;
- the user provides a substantive utterance in another language. A substantive utterance means the user gives a complete request, question, or correction in another language, not just a greeting, name, address, filler word, or borrowed phrase.

Do not switch languages based on:

- accent;
- pronunciation;
- filler words;
- short backchannels;
- names;
- addresses;
- isolated foreign words.

If uncertain, ask:

"Would you like me to continue in English or [LANGUAGE]?"
```

### Accent control

`gpt-realtime-2` can follow accent instructions more strongly, but vague accent prompts can cause drift or unintended language switching.

Accent-control prompts work best when they specify:

- the target accent;
- which characteristics should remain stable;
- the intended pacing, stress, and prosody;
- whether accent adaptation should affect language choice.

Instead of:

```text
Sound Australian.
```

Use:

```text
## Accent

Speak English with a light Australian accent.

- Keep the accent stable from the first word to the last.
- Use natural Australian vowel shaping, but keep speech easy to understand.
- Do not exaggerate the accent.
- Do not change response language based on the user's accent.
```

### Custom voices

Use [Custom Voices](https://developers.openai.com/blog/updates-audio-models#custom-voices) when standard voices cannot reliably meet brand, accent, or character requirements.

Prompting can steer accent, pacing, and delivery, but it cannot fully replace voice design. For use cases that require consistent branded voice identity or accent fidelity, consider [Custom Voices](https://developers.openai.com/blog/updates-audio-models#custom-voices).

Custom Voices are available only to approved customers. Contact your account team for access.
