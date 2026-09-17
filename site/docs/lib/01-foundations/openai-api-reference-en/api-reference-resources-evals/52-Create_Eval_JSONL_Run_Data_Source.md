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
pageSha256: "03f87eb77947a6d6dd1364cff152c02450b36ac654709ac66379397aaf71e94b"
contentMode: "local-full"
zh: ""
---

### Create Eval JSONL Run Data Source

- `CreateEvalJSONLRunDataSource object \{ source, type \}`

  A JsonlRunDataSource object with that specifies a JSONL file that matches the eval

  - `source: object \{ content, type \}  or object \{ id, type \}`

    Determines what populates the `item` namespace in the data source.

    - `EvalJSONLFileContentSource object \{ content, type \}`

      - `content: array of object \{ item, sample \}`

        The content of the jsonl file.

        - `item: map[unknown]`

        - `sample: optional map[unknown]`

      - `type: "file_content"`

        The type of jsonl source. Always `file_content`.

        - `"file_content"`

    - `EvalJSONLFileIDSource object \{ id, type \}`

      - `id: string`

        The identifier of the file.

      - `type: "file_id"`

        The type of jsonl source. Always `file_id`.

        - `"file_id"`

  - `type: "jsonl"`

    The type of data source. Always `jsonl`.

    - `"jsonl"`
