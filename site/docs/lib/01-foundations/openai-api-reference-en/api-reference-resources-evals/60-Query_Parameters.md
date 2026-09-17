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
pageSha256: "ed39f87426ffa3e561dde25cd11f52b305b67d18eb77ba7e903ba29b565e47a9"
contentMode: "local-full"
zh: ""
---

### Query Parameters

- `after: optional string`

  Identifier for the last output item from the previous pagination request.

- `limit: optional number`

  Number of output items to retrieve.

- `order: optional "asc" or "desc"`

  Sort order for output items by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.

  - `"asc"`

  - `"desc"`

- `status: optional "fail" or "pass"`

  Filter output items by status. Use `failed` to filter by failed output
  items or `pass` to filter by passed output items.

  - `"fail"`

  - `"pass"`
