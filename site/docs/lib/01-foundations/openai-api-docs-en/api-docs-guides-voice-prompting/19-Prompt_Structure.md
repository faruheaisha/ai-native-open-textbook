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
pageSha256: "6e10155ec85728bb6e2c7b1113ffcda9d2883bc9cf60b32f0019efc66e7d5677"
contentMode: "local-full"
zh: ""
---

## Prompt Structure

Organizing your prompt makes it easier for the model to understand context and stay consistent across turns. It also makes it easier for you to iterate and modify problematic sections.

- **What it does**: Use clear, labeled sections in your system prompt so the model can find and follow them. Keep each section focused on one thing.
- **How to adapt**: Add domain-specific sections (e.g., Compliance, Brand Policy). Remove sections you don’t need (e.g., Reference Pronunciations if not struggling with pronunciation).

Example

```
# Role & Objective        — who you are and what “success” means
# Personality & Tone      — the voice and style to maintain
# Context                 — retrieved context, relevant info
# Reference Pronunciations — phonetic guides for tricky words
# Tools                   — names, usage rules, and preambles
# Instructions / Rules    — do’s, don’ts, and approach
# Conversation Flow       — states, goals, and transitions
# Safety & Escalation     — fallback and handoff logic
```
