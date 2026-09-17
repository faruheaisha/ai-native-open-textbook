---
title: "OpenAI API 参考（字段级）"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/responses/methods/cancel.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/responses/methods/cancel.md"
sourceSha256: "e7aa3aa174fcbcb3d66008d47015898be32f1e85b23280a84cddaddd9791818c"
pageSha256: "57eb53dc2c96ffdc90e64a776371f4eea7a23b0be47ba42218efea06ae43c862"
contentMode: "local-full"
zh: ""
---

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Cancel a response

**post** `/responses/\{response_id\}/cancel`

Cancels a model response with the given ID. Only responses created with
the `background` parameter set to `true` can be cancelled.
[Learn more](https://developers.openai.com/api/docs/guides/background).

## 本篇目录

- [Path Parameters](https://developers.openai.com/api/reference)
- [Returns](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
