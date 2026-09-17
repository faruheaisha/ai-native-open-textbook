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
pageSha256: "51b4d094d04af2c9d9a5ef7a18e0c4d9d1a4049af046a58bed9c45ae399e30e0"
contentMode: "local-full"
zh: ""
---

## Customize Image Output

You can configure the following output options:

- **Size**: Image dimensions (for example, `1024x1024`, `1024x1536`)
- **Quality**: Rendering quality (for example, `low`, `medium`, `high`)
- **Format**: File output format
- **Compression**: Compression level (0-100%) for JPEG and WebP formats
- **Background**: Transparent, opaque, or automatic

`size`, `quality`, and `background` support the `auto` option, where the model will automatically select the best option based on the prompt.

### Size and quality options

`gpt-image-2.5-sunburst` and `gpt-image-2.5-flare` add `xhigh` and `max` quality settings. Both default to `auto`. Earlier GPT Image models support quality settings up to `high`.

| Setting           | Options                                                               |
| ----------------- | --------------------------------------------------------------------- |
| Recommended sizes | `1024x1024` (square), `1536x1024` (landscape), `1024x1536` (portrait) |
| Quality           | `low`, `medium`, `high`, `xhigh`, `max`, `auto`                       |

Both models also support custom dimensions as `WIDTHxHEIGHT` strings, such as `1536x864`. Width and height must be multiples of 16, the aspect ratio must be between 1:3 and 3:1, and neither edge may exceed 3840 pixels. The total pixel count must be between 655,360 and 8,294,400 (4K). Resolutions above `2560x1440` are experimental.

For transparent backgrounds with either model, set `background: "transparent"` and use `output_format: "png"` or `"webp"`.

Use `quality: "low"` for quick drafts. For final assets, compare higher quality settings to find the right balance of detail, latency, and cost.

### Output format

The Image API returns base64-encoded image data.
The default format is `png`, but you can also request `jpeg` or `webp`.

If using `jpeg` or `webp`, you can also specify the `output_compression` parameter to control the compression level (0-100%). For example, `output_compression=50` will compress the image by 50%.

Using `jpeg` is faster than `png`, so you should prioritize this format if
  latency is a concern.
