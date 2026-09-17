---
title: "Realtime server events"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/realtime/server-events.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/server-events.md"
sourceSha256: "4595bc318a41e7e43d9ea10eda8ce73d0a7f3740791946b9eeb2fb3cc8bab8a6"
pageSha256: "61c54f5bc8e3fd21c7afdb38fedaece3949df9b13ba962566f3961379bfff842"
contentMode: "local-full"
zh: ""
---

# Realtime server events

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

These are events emitted from the OpenAI Realtime WebSocket server to the client.

## error

Returned when an error occurs, which could be a client problem or a server
problem. Most errors are recoverable and the session will stay open, we
recommend to implementors to monitor and log error messages by default.

## 本篇目录

- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
