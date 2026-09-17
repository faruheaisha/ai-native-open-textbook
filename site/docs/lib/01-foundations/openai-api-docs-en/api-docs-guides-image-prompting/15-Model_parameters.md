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
pageSha256: "3c14cb1e8a5bc2bc28a463e5051f22b9fc7e9d09974d1bced901f4a147bccf50"
contentMode: "local-full"
zh: ""
---

## Model parameters

Use `client.images.generate` for generation and `client.images.edit` for edits. See the [image generation guide](https://developers.openai.com/api/docs/guides/image-generation) for API setup and request examples.

| Parameter            | GPT Image 1.5                                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model`              | `gpt-image-1.5`                                                                                                                                                                        |
| `quality`            | `low`, `medium`, `high`, or `auto`                                                                                                                                                     |
| `size`               | `1024x1024`, `1024x1536`, `1536x1024`, or `auto`                                                                                                                                       |
| `output_format`      | `png`, `jpeg`, or `webp`                                                                                                                                                               |
| `output_compression` | 0 to 100, for JPEG or WebP output only                                                                                                                                                 |
| `background`         | Set `transparent` explicitly for transparent output; use PNG or WebP                                                                                                                   |
| `input_fidelity`     | `low` or `high`; `high` preserves input details, while `quality` controls output generation. Omit this parameter when migrating to GPT Image 2, which always uses high input fidelity. |

    

    

      <header className="not-prose mb-8">
        <h2
          id="gpt-image-1-guide"
          className="m-0 text-3xl font-semibold text-default"
        >
          \{"GPT Image 1 reference"\}
        </h2>
        

          Overview and request settings for existing GPT Image 1 workflows.
        

      </header>
