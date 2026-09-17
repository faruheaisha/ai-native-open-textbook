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
pageSha256: "3cd5f5927d9b350c23def0c2de38c13960f4aca97338c34d8e8050cf93d5d1da"
contentMode: "local-full"
zh: ""
---

## General Tips

- **Iterate relentlessly**: Small wording changes can make or break behavior.
  - Example: For unclear audio instruction, we swapped “inaudible” → “unintelligible” which improved noisy input handling.
- **Prefer bullets over paragraphs**: Clear, short bullets outperform long paragraphs.
- **Guide with examples**: The model closely follows sample phrases.
- **Be precise**: Ambiguity or conflicting instructions = degraded performance similar to GPT-5.
- **Control language**: Pin output to a target language if you see unwanted language switching.
- **Reduce repetition**: Add a Variety rule to reduce robotic phrasing.
- **Use capitalized text for emphasis**: Capitalizing key rules makes them stand out and easier for the model to follow.
- **Convert non-text rules to text**: instead of writing "IF x > 3 THEN ESCALATE", write, "IF MORE THAN THREE FAILURES THEN ESCALATE".
