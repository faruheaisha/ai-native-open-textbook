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
sourceRel: "api/reference/resources/evals.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/evals.md"
sourceSha256: "8f940ae3c16748ec2321b258d8d2330f315132b3e34fb7b04a9a359d56c9590e"
pageSha256: "578dc6a605744b4b4574485b66984322aaea79a95ef4d22ae7c148fa047fed38"
contentMode: "local-full"
zh: ""
---

### Query Parameters

- `after: optional string`

  Identifier for the last eval from the previous pagination request.

- `limit: optional number`

  Number of evals to retrieve.

- `order: optional "asc" or "desc"`

  Sort order for evals by timestamp. Use `asc` for ascending order or `desc` for descending order.

  - `"asc"`

  - `"desc"`

- `order_by: optional "created_at" or "updated_at"`

  Evals can be ordered by creation time or last updated time. Use
  `created_at` for creation time or `updated_at` for last updated time.

  - `"created_at"`

  - `"updated_at"`
