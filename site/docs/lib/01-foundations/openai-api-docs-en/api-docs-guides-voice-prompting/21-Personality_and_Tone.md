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
pageSha256: "3fd31963eb247227aa6873fd93176abc6baf90e8c9f573be8f462aae5ecc886e"
contentMode: "local-full"
zh: ""
---

## Personality and Tone

`gpt-realtime-1.5` follows instructions well when imitating a particular personality or tone. You can tailor the voice experience and delivery depending on what your use case expects.

- **When to use**: Responses feel flat, overly verbose, or inconsistent across turns.
- **What it does**: Sets voice, brevity, and pacing so replies sound natural and consistent.
- **How to adapt**: Tune warmth/formality and default length. For regulated domains, favor neutral precision. Add other subsections that are relevant to your use case.

#### Example

```
# Personality & Tone
## Personality
- Friendly, calm and approachable expert customer service assistant.

## Tone
- Warm, concise, confident, never fawning.

## Length
2–3 sentences per turn.
```

#### Example (multi-emotion)

```
# Personality & Tone
- Start your response very happy
- Midway, change to sad
- At the end change your mood to very angry
```

`gpt-realtime-1.5`:

  The model is able to adhere to the complex instructions and switch between three emotions throughout the audio response.

### Speed Instructions

In the Realtime API, the `speed` parameter changes playback rate, not how the model composes speech. To actually sound faster, add instructions that can guide the pacing.

- **When to use**: Users want faster speaking voice; playback speed (with speed parameter) alone doesn’t fix speaking style.
- **What it does**: Tunes speaking style (brevity, cadence) independent of client playback speed.
- **How to adapt**: Modify speed instruction to meet use case requirements.

#### Example

```
# Personality & Tone
## Personality
- Friendly, calm and approachable expert customer service assistant.

## Tone
- Warm, concise, confident, never fawning.

## Length
- 2–3 sentences per turn.

## Pacing
- Deliver your audio response fast, but do not sound rushed.
- Do not modify the content of your response, only increase speaking speed for the same response.
```

Earlier realtime preview:

  `gpt-realtime-1.5`:

  With explicit pacing instructions, `gpt-realtime-1.5` can produce a noticeably faster pace without sounding too hurried.

### Language Constraint

Language constraints ensure the model consistently responds in the intended language, even in challenging conditions like background noise or multilingual inputs.

- **When to use**: To prevent accidental language switching in multilingual or noisy environments.
- **What it does**: Locks output to the chosen language to prevent accidental language changes.
- **How to adapt**: Switch “English” to your target language; or add more complex instructions based on your use case.

#### Example (pinning to one language)

```
# Personality & Tone
## Personality
- Friendly, calm and approachable expert customer service assistant.

## Tone
- Warm, concise, confident, never fawning.

## Length
- 2–3 sentences per turn.

## Language
- The conversation will be only in English.
- Do not respond in any other language even if the user asks.
- If the user speaks another language, politely explain that support is limited to English.
```

These are the responses after applying the instruction using `gpt-realtime-1.5`.

![lang constraint en](https://developers.openai.com/cookbook/assets/images/lang_constraint_en.png)

#### Example (model teaches a language)

```
# Role & Objective
- You are a friendly, knowledgeable voice tutor for French learners.
- Your goal is to help the user improve their French speaking and listening skills through engaging conversation and clear explanations.
- Balance immersive French practice with supportive English guidance to ensure understanding and progress.

# Personality & Tone
## Personality
- Friendly, calm and approachable expert customer service assistant.

## Tone
- Warm, concise, confident, never fawning.

## Length
- 2–3 sentences per turn.

## Language
### Explanations
Use English when explaining grammar, vocabulary, or cultural context.

### Conversation
Speak in French when conducting practice, giving examples, or engaging in dialogue.
```

These are the responses after applying the instruction using `gpt-realtime-1.5`.

![multi language](https://developers.openai.com/cookbook/assets/images/multi-language.png)

The model is able to code-switch from one language to another based on custom instructions.

### Reduce Repetition

The realtime model can follow sample phrases closely to stay on-brand, but it may overuse them, making responses sound robotic or repetitive. Adding a repetition rule helps maintain variety while preserving clarity and brand voice.

- **When to use**: Outputs recycle the same openings, fillers, or sentence patterns across turns or sessions.
- **What it does**: Adds a variety constraint—discourages repeated phrases, nudges synonyms and alternate sentence structures, and keeps required terms intact.
- **How to adapt**: Tune strictness (e.g., “don’t reuse the same opener more than once every N turns”), whitelist must-keep phrases (legal/compliance/brand), and allow tighter phrasing where consistency matters.

#### Example

```
# Personality & Tone
## Personality
- Friendly, calm and approachable expert customer service assistant.

## Tone
- Warm, concise, confident, never fawning.

## Length
- 2–3 sentences per turn.

## Language
- The conversation will be only in English.
- Do not respond in any other language even if the user asks.
- If the user speaks another language, politely explain that support is limited to English.

## Variety
- Do not repeat the same sentence twice.
- Vary your responses so they don't sound robotic.
```

These are the responses **before** applying the instruction using `gpt-realtime-1.5`. The model repeats the same confirmation: `Got it`.

![repeat before](https://developers.openai.com/cookbook/assets/images/repeat_before.png)

These are the responses **after** applying the instruction using `gpt-realtime-1.5`.

![repeat after](https://developers.openai.com/cookbook/assets/images/repeat_after.png)

Now the model is able to vary its responses and confirmation and not sound robotic.
