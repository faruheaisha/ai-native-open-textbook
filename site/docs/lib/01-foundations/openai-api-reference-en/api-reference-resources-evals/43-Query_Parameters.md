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
pageSha256: "07e0b919c6107789947728c874fe0505f2d650c8c3ad10cbb98818ec297d3ce7"
contentMode: "local-full"
zh: ""
---

### Query Parameters

- `after: optional string`

  Identifier for the last run from the previous pagination request.

- `limit: optional number`

  Number of runs to retrieve.

- `order: optional "asc" or "desc"`

  Sort order for runs by timestamp. Use `asc` for ascending order or `desc` for descending order. Defaults to `asc`.

  - `"asc"`

  - `"desc"`

- `status: optional "queued" or "in_progress" or "completed" or 2 more`

  Filter runs by status. One of `queued` | `in_progress` | `failed` | `completed` | `canceled`.

  - `"queued"`

  - `"in_progress"`

  - `"completed"`

  - `"canceled"`

  - `"failed"`
