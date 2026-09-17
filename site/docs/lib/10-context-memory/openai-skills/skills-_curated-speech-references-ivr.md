---
title: "IVR / phone prompt defaults"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/speech/references/ivr.md"
sourceRel: "skills/.curated/speech/references/ivr.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/speech/references/ivr.md"
sourceSha256: "2aaf225b7cea9277fe5413eb0360a845de035c00ea0d6f30348b5ce7138803fc"
pageSha256: "2aaf225b7cea9277fe5413eb0360a845de035c00ea0d6f30348b5ce7138803fc"
contentMode: "local-full"
zh: ""
---

# IVR / phone prompt defaults

## Suggested defaults
- Voice: `cedar` (clear) or `marin` (brighter)
- Format: `wav`
- Speed: `0.9` to `1.0`

## Guidance
- Prioritize clarity and slower pacing.
- Enunciate numbers and menu options.
- Keep sentences short and consistent.

## Instruction template
```
Voice Affect: Clear and neutral.
Tone: Professional and concise.
Pacing: Slow and even.
Pronunciation: Enunciate numbers and menu options.
Emphasis: Stress the option numbers.
```

## Example (short)
Input text:
"For sales, press 1. For support, press 2."

Instructions:
```
Voice Affect: Clear and neutral.
Tone: Professional and concise.
Pacing: Slow and even.
Emphasis: Stress "press 1" and "press 2".
```
