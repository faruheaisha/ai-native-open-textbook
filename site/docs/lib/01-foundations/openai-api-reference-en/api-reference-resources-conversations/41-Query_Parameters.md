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
sourceRel: "api/reference/resources/conversations.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/conversations.md"
sourceSha256: "6123458c0e5f960336caab8f4ed471cfe0776f9b3a73f4f86126c614cfabefca"
pageSha256: "d59a2106d78e3fe2e068a874d87571441ae068f15d94f3ba335aaf7f3cf77d09"
contentMode: "local-full"
zh: ""
---

### Query Parameters

- `include: optional array of ResponseIncludable`

  Additional fields to include in the response. See the `include`
  parameter for [listing Conversation items above](https://developers.openai.com/api/reference/resources/conversations/subresources/items/methods/list#(resource) conversations.items > (method) list > (params) default > (param) include > (schema)) for more information.

  - `"file_search_call.results"`

  - `"web_search_call.results"`

  - `"web_search_call.action.sources"`

  - `"message.input_image.image_url"`

  - `"computer_call_output.output.image_url"`

  - `"code_interpreter_call.outputs"`

  - `"reasoning.encrypted_content"`

  - `"message.output_text.logprobs"`
