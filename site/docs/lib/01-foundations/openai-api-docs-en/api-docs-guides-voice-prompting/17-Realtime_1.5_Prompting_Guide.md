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
pageSha256: "4e37350715620a79646b28c532cb48b9fc8f16d7e9f4cca3e9766e1216416dcb"
contentMode: "local-full"
zh: ""
---

## Realtime 1.5 Prompting Guide

`gpt-realtime-1.5` is a speech-to-speech model in the Realtime API. The same `gpt-realtime` prompting guidance applies to this model.

Speech-to-speech systems are essential for enabling voice as a core AI interface. `gpt-realtime-1.5` supports robust, usable realtime voice agents that can handle mission-critical workflows at scale.

Compared with earlier realtime preview models, `gpt-realtime-1.5` delivers stronger instruction following, more reliable tool calling, better voice quality, and an overall smoother feel. These gains make it practical to move from chained approaches to true realtime experiences, cutting latency and producing responses that sound more natural and expressive.

Realtime models benefit from prompting techniques that wouldn't directly apply to text-based models. This prompting guide starts with a suggested prompt skeleton, then walks through each part with practical tips, small patterns you can copy, and examples you can adapt to your use case.
