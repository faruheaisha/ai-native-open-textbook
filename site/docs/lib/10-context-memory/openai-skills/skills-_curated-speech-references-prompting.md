---
title: "Instructioning best practices (TTS)"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/speech/references/prompting.md"
sourceRel: "skills/.curated/speech/references/prompting.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/speech/references/prompting.md"
sourceSha256: "2adcb001813be04e56918eb0d34d9a45f9326aa0fb240526ae74a926522b6554"
pageSha256: "2adcb001813be04e56918eb0d34d9a45f9326aa0fb240526ae74a926522b6554"
contentMode: "local-full"
zh: ""
---

# Instructioning best practices (TTS)

## Contents
- Structure
- Specificity
- Avoiding conflicts
- Pronunciation and names
- Pauses and pacing
- Iterate deliberately
- Where to find copy/paste recipes

## Structure
- Use a consistent order: affect -> tone -> pacing -> emotion -> pronunciation/pauses -> emphasis -> delivery.
- For complex requests, use short labeled lines instead of a long paragraph.

## Specificity
- Name the delivery you want ("calm and steady" vs "friendly").
- If you need a specific cadence, call it out explicitly ("slow and measured", "brisk and energetic").

## Avoiding conflicts
- Do not mix opposing instructions ("fast and slow", "formal and casual").
- Keep instructions short: 4 to 8 lines are usually enough.

## Pronunciation and names
- For acronyms, write the pronunciation hint in text ("A-I" instead of "AI").
- For names or brands, add a simple phonetic guide in the input text if clarity matters.
- If a word must be emphasized, add an Emphasis line and repeat the word exactly.

## Pauses and pacing
- Use punctuation or short line breaks in the input text to create natural pauses.
- Use the Pauses line for intentional pauses ("pause after the greeting").

## Iterate deliberately
- Start with a clean base instruction set, then make one change at a time.
- Repeat critical constraints on each iteration ("keep pacing steady").

## Where to find copy/paste recipes
For copy/paste instruction templates, see `references/sample-prompts.md`. This file focuses on principles, structure, and iteration patterns.
