---
title: "Image input token and cost calculator"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/image-cost-calculator.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/image-cost-calculator.md"
sourceSha256: "4544ba8a914f2d14fc14993ac6727b6506d406d9a66ba059e12dc1821f06f062"
pageSha256: "4544ba8a914f2d14fc14993ac6727b6506d406d9a66ba059e12dc1821f06f062"
contentMode: "local-full"
zh: ""
---

# Image input token and cost calculator

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Estimate the input tokens and cost of sending an image to an OpenAI vision model. Select a model, enter your image dimensions, and choose a detail level.

For GPT Image generation and editing costs, use the [image generation calculator](https://developers.openai.com/api/docs/guides/image-generation#calculating-costs).

## Use the calculator

1. Select the vision model you plan to use.
2. Enter the original image width and height in pixels. The calculator applies the model's resizing rules.
3. Select an image detail level supported by the model.
4. Read the image input tokens and estimated cost. If the processed image exceeds the [30,000-patch limit](https://developers.openai.com/api/docs/guides/images-vision#image-input-requirements), the calculator shows a rejection message instead of an estimate. Expand **Calculation details** to see the resized dimensions and token calculation.

For example, a 6000 × 6000 image on `gpt-6-astra` exceeds the limit with `original` detail (35,344 patches), but fits after resizing with `high` detail (2,500 patches). Choose `high` only when your task does not require original resolution or precise image coordinates.

## Understand the estimate

The estimate covers one image at standard input rates. It excludes other prompt tokens, model output, caching, long-context pricing, and data-residency adjustments. Billing can differ by one token due to rounding.

For the resizing and tokenization rules, see [image input cost calculations](https://developers.openai.com/api/docs/guides/images-vision#calculating-costs). For current model rates and other charges, see [API pricing](https://developers.openai.com/api/docs/pricing).
