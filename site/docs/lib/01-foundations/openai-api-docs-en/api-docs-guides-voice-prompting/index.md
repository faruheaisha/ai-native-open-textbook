---
title: "Prompting Realtime models"
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
pageSha256: "dea0a0b95b1c74f975771c2e4f933249fb031acbae9694ae11748ddec4224caa"
contentMode: "local-full"
zh: ""
---

# Prompting Realtime models

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Choose the Realtime model you are building with. For GPT-Live, use [Prompting GPT-Live](https://developers.openai.com/api/docs/guides/live-prompting).

`gpt-realtime-2` is our state-of-the-art reasoning voice model for low-latency speech-to-speech applications. It can think before it speaks, follow instructions more reliably, use a larger context window, and call tools with greater precision than earlier realtime models.

To take advantage of these gains, design prompts with more intent. Explicitly define the assistant's responsibilities, decision points, tool-calling behavior, and guardrails: what it should do, when it should do it, and what it should avoid.

Start simple. Do not over-prompt upfront. Begin with a minimal prompt, run
  evaluations, then add instructions only for behaviors that fail in testing.

## 本篇目录

- [Choose a model](https://developers.openai.com/api/docs)
- [Realtime 2.0 Prompting Guide](https://developers.openai.com/api/docs)
- [What changed in Realtime 2](https://developers.openai.com/api/docs)
- [Recommended prompt structure](https://developers.openai.com/api/docs)
- [Set reasoning effort](https://developers.openai.com/api/docs)
- [Use preambles intentionally](https://developers.openai.com/api/docs)
- [Control response length](https://developers.openai.com/api/docs)
- [Design tool behavior](https://developers.openai.com/api/docs)
- [Handle silence and background audio](https://developers.openai.com/api/docs)
- [Use message channels deliberately](https://developers.openai.com/api/docs)
- [Handle unclear audio](https://developers.openai.com/api/docs)
- [Capture exact entities](https://developers.openai.com/api/docs)
- [Avoid literal instruction traps](https://developers.openai.com/api/docs)
- [Control language and accent separately](https://developers.openai.com/api/docs)
- [Maintain state in long sessions](https://developers.openai.com/api/docs)
- [Migrate from earlier realtime models](https://developers.openai.com/api/docs)
- [Realtime 1.5 Prompting Guide](https://developers.openai.com/api/docs)
- [General Tips](https://developers.openai.com/api/docs)
- [Prompt Structure](https://developers.openai.com/api/docs)
- [Role and Objective](https://developers.openai.com/api/docs)
- [Personality and Tone](https://developers.openai.com/api/docs)
- [Reference Pronunciations](https://developers.openai.com/api/docs)
- [Instructions](https://developers.openai.com/api/docs)
- [Tools](https://developers.openai.com/api/docs)
- [Conversation Flow](https://developers.openai.com/api/docs)
- [Safety & Escalation](https://developers.openai.com/api/docs)
- [Next steps](https://developers.openai.com/api/docs)
