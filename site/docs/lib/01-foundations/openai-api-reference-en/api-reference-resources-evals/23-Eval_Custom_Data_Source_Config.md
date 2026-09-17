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
pageSha256: "3928f1d638868165a52250237a40f0222517840adf5946fa52a9b8b5d08a0600"
contentMode: "local-full"
zh: ""
---

### Eval Custom Data Source Config

- `EvalCustomDataSourceConfig object \{ schema, type \}`

  A CustomDataSourceConfig which specifies the schema of your `item` and optionally `sample` namespaces.
  The response schema defines the shape of the data that will be:

  - Used to define your testing criteria and
  - What data is required when creating a run

  - `schema: map[unknown]`

    The json schema for the run data source items.
    Learn how to build JSON schemas [here](https://json-schema.org/).

  - `type: "custom"`

    The type of data source. Always `custom`.

    - `"custom"`
