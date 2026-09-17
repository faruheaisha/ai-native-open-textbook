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
pageSha256: "d0e56b37384dfe0f10ec66e979b15a5135f0c7d579e849c6f200536c9487d4c9"
contentMode: "local-full"
zh: ""
---

### Returns

- `id: string`

  Unique identifier for the evaluation run output item.

- `created_at: number`

  Unix timestamp (in seconds) when the evaluation run was created.

- `datasource_item: map[unknown]`

  Details of the input data source item.

- `datasource_item_id: number`

  The identifier for the data source item.

- `eval_id: string`

  The identifier of the evaluation group.

- `object: "eval.run.output_item"`

  The type of the object. Always "eval.run.output_item".

  - `"eval.run.output_item"`

- `results: array of object \{ name, passed, score, 2 more \}`

  A list of grader results for this output item.

  - `name: string`

    The name of the grader.

  - `passed: boolean`

    Whether the grader considered the output a pass.

  - `score: number`

    The numeric score produced by the grader.

  - `sample: optional map[unknown] or null`

    Optional sample or intermediate data produced by the grader.

  - `type: optional string`

    The grader type (for example, "string-check-grader").

- `run_id: string`

  The identifier of the evaluation run associated with this output item.

- `sample: object \{ error, finish_reason, input, 7 more \}`

  A sample containing the input and output of the evaluation run.

  - `error: EvalAPIError`

    An object representing an error response from the Eval API.

    - `code: string`

      The error code.

    - `message: string`

      The error message.

  - `finish_reason: string`

    The reason why the sample generation was finished.

  - `input: array of object \{ content, role \}`

    An array of input messages.

    - `content: string`

      The content of the message.

    - `role: string`

      The role of the message sender (e.g., system, user, developer).

  - `max_completion_tokens: number`

    The maximum number of tokens allowed for completion.

  - `model: string`

    The model used for generating the sample.

  - `output: array of object \{ content, role \}`

    An array of output messages.

    - `content: optional string`

      The content of the message.

    - `role: optional string`

      The role of the message (e.g. "system", "assistant", "user").

  - `seed: number`

    The seed used for generating the sample.

  - `temperature: number`

    The sampling temperature used.

  - `top_p: number`

    The top_p value used for sampling.

  - `usage: object \{ cached_tokens, completion_tokens, prompt_tokens, total_tokens \}`

    Token usage details for the sample.

    - `cached_tokens: number`

      The number of tokens retrieved from cache.

    - `completion_tokens: number`

      The number of completion tokens generated.

    - `prompt_tokens: number`

      The number of prompt tokens used.

    - `total_tokens: number`

      The total number of tokens used.

- `status: string`

  The status of the evaluation run.
