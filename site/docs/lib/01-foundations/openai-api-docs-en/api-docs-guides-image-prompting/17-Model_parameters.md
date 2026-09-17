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
pageSha256: "3cb653caf4d8cfb5ecba28d32e58468553ad6e2277e075d9a1c98c75c9dab607"
contentMode: "local-full"
zh: ""
---

## Model parameters

Use `client.images.generate` for generation and `client.images.edit` for edits. See the [image generation guide](https://developers.openai.com/api/docs/guides/image-generation) for API setup and request examples.

| Parameter            | GPT Image 1                                                                                                                                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model`              | `gpt-image-1`                                                                                                                                                                                                                            |
| `quality`            | `low`, `medium`, `high`, or `auto`                                                                                                                                                                                                       |
| `size`               | `1024x1024`, `1024x1536`, `1536x1024`, or `auto`                                                                                                                                                                                         |
| `output_format`      | `png`, `jpeg`, or `webp`                                                                                                                                                                                                                 |
| `output_compression` | 0 to 100, for JPEG or WebP output only                                                                                                                                                                                                   |
| `background`         | Set `transparent` explicitly for transparent output; use PNG or WebP                                                                                                                                                                     |
| `input_fidelity`     | `low` or `high`; `high` preserves input details, while `quality` controls output generation. High input fidelity uses more image input tokens. Omit this parameter when migrating to GPT Image 2, which always uses high input fidelity. |
