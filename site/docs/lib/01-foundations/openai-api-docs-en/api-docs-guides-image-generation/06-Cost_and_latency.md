---
title: "OpenAI API 文档（英文）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/image-generation.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/image-generation.md"
sourceSha256: "74ec2240ab2e82662388b9f4780f7c10c6b7386892c03b1c8f00f67376efd263"
pageSha256: "390150c1ae52ab4fe46840d9138dc3144170b38a759065ff2c6f841eb92b31cd"
contentMode: "local-full"
zh: ""
---

## Cost and latency

### GPT Image 2.5 costs

Responses API requests include the mainline model's token usage in addition to image generation costs.

Both GPT Image 2.5 models use the same token rates: $8 per million image input tokens, $2 per million cached image input tokens, $30 per million image output tokens, $5 per million text input tokens, and $1.25 per million cached text input tokens. See [pricing](https://developers.openai.com/api/docs/pricing#image-generation).

Use the response's `usage` to measure token consumption for your prompts, sizes, and quality settings. Equal token rates don't mean equal cost per image: token consumption can differ by model and quality setting. For older-model pricing examples, see [Earlier GPT Image models](#earlier-gpt-image-models).

### GPT Image 2.5 and GPT Image 2 output tokens

Select a model, quality, and size to estimate output tokens and image output cost.
For `gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`, the quality options are `low`, `medium`, `high`, `xhigh`, and `max`.
For `gpt-image-2`, the options are `low`, `medium`, and `high`.
The models can use different token counts for the same quality setting and share the same price per image output token.
Use explicit quality and size values for this estimate; `auto` depends on the generated image.

&lt;GptImageTokenCalculator
  client:load
  outputPricePerMillion=\{Number(
    pricing.latest.subsections
      .find((section) => section.price_type === "Image tokens")
      ?.items.find((item) => item.name === "gpt-image-2")?.values.main.output
  )\}
/>

### Partial images cost

If you want to [stream image generation](#streaming) using the `partial_images` parameter, each partial image will incur an additional 100 image output tokens.
