---
title: "Realtime client events"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/realtime/client-events.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/client-events.md"
sourceSha256: "e5a80993ba40bb1f036ff2b5a28b932938a9edd0419e361d3019481770cb5e4a"
pageSha256: "a9e611ea80f20431f47c9323b384b54d75756d5cb4663bce8e16ec6c58b369bc"
contentMode: "local-full"
zh: ""
---

# Realtime client events

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

These are events that the OpenAI Realtime WebSocket server will accept from the client.

## session.update

Send this event to update the session’s configuration.
The client may send this event at any time to update any field
except for `voice` and `model`. `voice` can be updated only if there have been no other audio outputs yet.

When the server receives a `session.update`, it will respond
with a `session.updated` event showing the full, effective configuration.
Only the fields that are present in the `session.update` are updated. To clear a field like
`instructions`, pass an empty string. To clear a field like `tools`, pass an empty array.
To clear a field like `turn_detection`, pass `null`.

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
