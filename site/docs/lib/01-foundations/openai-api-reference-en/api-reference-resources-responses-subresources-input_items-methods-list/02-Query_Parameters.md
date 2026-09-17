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
sourceRel: "api/reference/resources/responses/subresources/input_items/methods/list.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/responses/subresources/input_items/methods/list.md"
sourceSha256: "3c778702ff10b5942649794eba3ea201175667c74dcc72d6806283917b0168bf"
pageSha256: "f57bf00fa1934fcc518e5cb4b99b3a09ec63bd0ed8c0cd203ecc1bc8130a149a"
contentMode: "local-full"
zh: ""
---

### Query Parameters

- `after: optional string`

  An item ID to list items after, used in pagination.

- `include: optional array of ResponseIncludable`

  Additional fields to include in the response. See the `include`
  parameter for Response creation above for more information.

  - `"file_search_call.results"`

  - `"web_search_call.results"`

  - `"web_search_call.action.sources"`

  - `"message.input_image.image_url"`

  - `"computer_call_output.output.image_url"`

  - `"code_interpreter_call.outputs"`

  - `"reasoning.encrypted_content"`

  - `"message.output_text.logprobs"`

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between
  1 and 100, and the default is 20.

- `order: optional "asc" or "desc"`

  The order to return the input items in. Default is `desc`.

  - `asc`: Return the input items in ascending order.
  - `desc`: Return the input items in descending order.

  - `"asc"`

  - `"desc"`
