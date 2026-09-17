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
sourceRel: "api/reference/resources/responses/methods/retrieve.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/responses/methods/retrieve.md"
sourceSha256: "5a264731dd0e7f3f6511cc36887943ad245207c338456ff462770c5eafd5206f"
pageSha256: "27cefd33db936f53adcc9458fa4506ae8e72e2770550b233877fb73f62193a92"
contentMode: "local-full"
zh: ""
---

### Query Parameters

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

- `include_obfuscation: optional boolean`

  When true, stream obfuscation will be enabled. Stream obfuscation adds
  random characters to an `obfuscation` field on streaming delta events
  to normalize payload sizes as a mitigation to certain side-channel
  attacks. These obfuscation fields are included by default, but add a
  small amount of overhead to the data stream. You can set
  `include_obfuscation` to false to optimize for bandwidth if you trust
  the network links between your application and the OpenAI API.

- `starting_after: optional number`

  The sequence number of the event after which to start streaming.

- `stream: optional false`

  If set to true, the model response data will be streamed to the client
  as it is generated using [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format).
  See the [Streaming section below](https://developers.openai.com/api/reference/resources/responses/streaming-events)
  for more information.

  - `false`
