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
pageSha256: "7c389b611548ec3d92e52c9f4233a7764a3a0b919016db7431744c100fd1276c"
contentMode: "local-full"
zh: ""
---

### Eval Stored Completions Data Source Config

- `EvalStoredCompletionsDataSourceConfig object \{ schema, type, metadata \}`

  Deprecated in favor of LogsDataSourceConfig.

  - `schema: map[unknown]`

    The json schema for the run data source items.
    Learn how to build JSON schemas [here](https://json-schema.org/).

  - `type: "stored_completions"`

    The type of data source. Always `stored_completions`.

    - `"stored_completions"`

  - `metadata: optional Metadata or null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.
