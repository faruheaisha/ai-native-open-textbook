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
pageSha256: "00fe92528fcc003d261e765ad6f686cc6f9b6eb14f3c0cbb8a37e2a4e625be6a"
contentMode: "local-full"
zh: ""
---

## Model parameters

Use `client.images.generate` for generation and `client.images.edit` for edits. See the [image generation guide](https://developers.openai.com/api/docs/guides/image-generation) for API setup and request examples.

| Parameter            | GPT Image 2                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `model`              | `gpt-image-2`                                                                                                        |
| `quality`            | `low`, `medium`, `high`, or `auto`                                                                                   |
| `size`               | `auto` or a supported resolution; see [size constraints](https://developers.openai.com/api/docs/guides/image-generation#size-and-quality-options) |
| `input_fidelity`     | Omit it. Image inputs are always processed at high fidelity.                                                         |
| `output_format`      | `png`, `jpeg`, or `webp`                                                                                             |
| `background`         | For transparent output, explicitly set `transparent` and use PNG or WebP.                                            |
| `output_compression` | Use only for JPEG or WebP output, not PNG.                                                                           |

Transparent backgrounds are available in preview for `gpt-image-2`.

For the original prompts, inputs, and runnable workflows, see the pinned [GPT Image 2 notebook](https://github.com/openai/openai-cookbook/blob/d310dfa05d20fb653caa9c1c4b89ac1a4aeeeae4/examples/multimodal/image-gen-models-prompting-guide.ipynb).

    

    

      <header className="not-prose mb-8">
        <h2
          id="gpt-image-1.5-guide"
          className="m-0 text-3xl font-semibold text-default"
        >
          \{"GPT Image 1.5 reference"\}
        </h2>
        

          Overview and request settings for existing GPT Image 1.5 workflows.
        

      </header>
