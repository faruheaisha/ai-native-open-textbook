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
pageSha256: "870e4d8841dd79c2b190d559bd34cd8448016c377100d6c2d54bf8a9e7194225"
contentMode: "local-full"
zh: ""
---

## Overview

The API lets you generate and edit images from text prompts using `gpt-image-2.5-sunburst` and `gpt-image-2.5-flare`. Choose Sunburst for workflows where editing precision matters most, and Flare for fast, high-quality everyday image generation. You can access image generation capabilities through two APIs:

### Image API

The [Image API](https://developers.openai.com/api/reference/resources/images) provides two endpoints, each with distinct capabilities:

- **Generations**: [Generate images](#generate-images) from scratch based on a text prompt
- **Edits**: [Modify existing images](#edit-images) using a new prompt, either partially or entirely

### Responses API

The [Responses API](https://developers.openai.com/api/reference/resources/responses/methods/create#responses-create-tools) allows you to generate images as part of conversations or multi-step flows. It supports image generation as a [built-in tool](https://developers.openai.com/api/docs/guides/tools?api-mode=responses), and accepts image inputs and outputs within context.

Compared to the Image API, it adds:

- **Multi-turn editing**: Iteratively make high fidelity edits to images with prompting
- **Flexible inputs**: Accept image [File](https://developers.openai.com/api/reference/resources/files) IDs as input images, not just bytes

For mainline models that can call the image generation tool, refer to [supported models](#supported-models).

### Choosing the right API

- If you only need to generate or edit a single image from one prompt, the Image API is your best choice.
- If you want to build conversational, editable image experiences with GPT Image, go with the Responses API.

With the Image API, set `model` to `gpt-image-2.5-sunburst` or `gpt-image-2.5-flare` directly. With the Responses API, select a supported mainline model at the top level and specify `gpt-image-2.5-sunburst` or `gpt-image-2.5-flare` in the image generation tool's `model` field.

Both APIs let you [customize output](#customize-image-output) by adjusting quality, size, format, and compression.

To ensure these models are used responsibly, you may need to complete the [API
  Organization
  Verification](https://help.openai.com/en/articles/10910291-api-organization-verification)
  from your [developer
  console](https://platform.openai.com/settings/organization/general) before
  using GPT Image models.

&lt;div
  className="not-prose"
  style=&#123;&#123; float: "right", margin: "10px 0 10px 10px" &#125;&#125;
>
  &lt;img src="https://developers.openai.com/images/image-25-article/mug.png"
    alt="A beige coffee mug on a wooden table"
    style=&#123;&#123; height: "180px", width: "auto", borderRadius: "8px" &#125;&#125;
  />
