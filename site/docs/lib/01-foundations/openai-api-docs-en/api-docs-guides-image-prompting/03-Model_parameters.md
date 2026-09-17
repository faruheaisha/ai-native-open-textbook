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
sourceRel: "api/docs/guides/image-prompting.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/image-prompting.md"
sourceSha256: "ba92dbffa51d75ed5e67cb01ee85d014d08e304fe9c24ca684ac66fbe1d81887"
pageSha256: "bbb44af469ea62fff15e94b56e33e568392c24a784357b1ed8194c082c13695a"
contentMode: "local-full"
zh: ""
---

## Model parameters

Set API parameters separately from the prompt.

| Parameter    | GPT Image 2.5 settings                                                                                                                                                                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model`      | `gpt-image-2.5-flare` (small model) or `gpt-image-2.5-sunburst` (base model)                                                                                                                                                        |
| `quality`    | `auto` (default), `low`, `medium`, `high`, `xhigh`, or `max`                                                                                                                                                                        |
| `size`       | `auto` or a custom resolution. Common sizes: `1024x1024` (square), `1536x1024` (landscape), `1024x1536` (portrait), `2048x2048` (2K square), `2048x1152` (2K landscape), `3840x2160` (4K landscape), and `2160x3840` (4K portrait). |
| `background` | `auto`, `opaque`, or `transparent`                                                                                                                                                                                                  |

For a custom resolution, use `WIDTHxHEIGHT` and follow these constraints:

- Each edge must be no more than 3,840 pixels.
- Both edges must be multiples of 16 pixels.
- The ratio of the longer edge to the shorter edge must not exceed 3:1.
- The total pixel count must be between 655,360 and 8,294,400.

Outputs with more than 3,686,400 total pixels (`2560x1440`) are experimental.

Choose the model using the workflow above before tuning `quality`. For the first comparison, keep an explicitly selected quality setting unchanged when both models support it, along with the prompt, reference images, and output dimensions. The same quality label does not imply the same image quality or response time across models.

If the output falls short, test a higher quality setting. Once it meets your requirements, test lower settings to see whether they preserve acceptable quality while reducing latency. Use `xhigh` or `max` only when they improve an unmet quality requirement within your latency budget. A higher setting doesn't guarantee a better result for every prompt.

For transparent assets, explicitly request `background="transparent"` and use PNG or WebP. Check the decoded image's alpha channel, including hair, glass, shadows, and object edges. Use `output_compression` only for JPEG or WebP output, not PNG.
