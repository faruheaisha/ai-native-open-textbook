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
pageSha256: "327a0154cb2821b06a8e001bfd94686c439847fdc74460945b9f68ba30f14ffe"
contentMode: "local-full"
zh: ""
---

## Earlier GPT Image models

The details below apply to earlier models, not Sunburst or Flare. For new integrations, use one of the GPT Image 2.5 models described above.

<details>
<summary>GPT Image 2 settings and input fidelity</summary>

`gpt-image-2` accepts any resolution in the `size` parameter when it satisfies the constraints below. Square images are typically fastest to generate.

<table>
  <tbody>
    <tr>
      <td>Popular sizes</td>
      <td>
        <ul>
          <li>
            `1024x1024` (square)
          </li>
          <li>
            `1536x1024` (landscape)
          </li>
          <li>
            `1024x1536` (portrait)
          </li>
          <li>
            `2048x2048` (2K square)
          </li>
          <li>
            `2048x1152` (2K landscape)
          </li>
          <li>
            `3840x2160` (4K landscape)
          </li>
          <li>
            `2160x3840` (4K portrait)
          </li>
          <li>
            `auto` (default)
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Size constraints</td>
      <td>
        <ul>
          <li>
            Maximum edge length must be less than or equal to 
            `3840px`
          </li>
          <li>
            Both edges must be multiples of `16px`
          </li>
          <li>
            Long edge to short edge ratio must not exceed `3:1`
          </li>
          <li>
            Total pixels must be at least `655,360` and no more than 
            `8,294,400`
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Quality options</td>
      <td>
        <ul>
          <li>
            `low`
          </li>
          <li>
            `medium`
          </li>
          <li>
            `high`
          </li>
          <li>
            `auto` (default)
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Image input fidelity

The `input_fidelity` parameter controls how strongly a model preserves details from input images during edits and reference-image workflows. For `gpt-image-2`, omit this parameter; the API doesn't allow changing it because the model processes every image input at high fidelity automatically.

Because `gpt-image-2` always processes image inputs at high fidelity, image
  input tokens can be higher for edit requests that include reference images. To
  understand the cost implications, refer to the [vision
  costs](https://developers.openai.com/api/docs/guides/images-vision?api-mode=responses#calculating-costs)
  section.

</details>

<details>
<summary>Older-model pricing examples</summary>

### Models prior to `gpt-image-2`

GPT Image models prior to `gpt-image-2` generate images by first producing specialized image tokens. Both latency and eventual cost are proportional to the number of tokens required to render an image—larger image sizes and higher quality settings result in more tokens.

The number of tokens generated depends on image dimensions and quality:

| Quality | Square (1024×1024) | Portrait (1024×1536) | Landscape (1536×1024) |
| ------- | ------------------ | -------------------- | --------------------- |
| Low     | 272 tokens         | 408 tokens           | 400 tokens            |
| Medium  | 1056 tokens        | 1584 tokens          | 1568 tokens           |
| High    | 4160 tokens        | 6240 tokens          | 6208 tokens           |

Note that you will also need to account for [input tokens](https://developers.openai.com/api/docs/guides/images-vision?api-mode=responses#calculating-costs): text tokens for the prompt and image tokens for the input images if editing images.
Because `gpt-image-2` always processes image inputs at high fidelity, edit requests that include reference images can use more input tokens.

Refer to the [pricing page](https://developers.openai.com/api/docs/pricing#image-generation) for current
text and image token prices, and use the [Calculating costs](#calculating-costs)
section below to estimate request costs.

The final cost is the sum of:

- input text tokens
- input image tokens if using the edits endpoint
- image output tokens

### Calculating costs

Use the pricing calculator below to estimate request costs for GPT Image models.
`gpt-image-2` supports thousands of valid resolutions; the table below lists the
same sizes used for previous GPT Image models for comparison. For GPT Image 1.5,
GPT Image 1, and GPT Image 1 Mini, the legacy per-image output pricing table is
also listed below. You should still account for text and image input tokens when
estimating the total cost of a request.

A larger non-square resolution can sometimes produce fewer output tokens than
  a smaller or square resolution at the same quality setting.

&lt;table
  style=&#123;&#123; borderCollapse: "collapse", tableLayout: "fixed", width: "100%" &#125;&#125;
>
  <thead>
    <tr>
      &lt;th style=&#123;&#123; textAlign: "left", padding: "8px", width: "28%" &#125;&#125;>Model
      &lt;th style=&#123;&#123; textAlign: "left", padding: "8px", width: "14%" &#125;&#125;>
        Quality
      
      &lt;th style=&#123;&#123; padding: "8px", width: "19.33%" &#125;&#125;>1024 x 1024
      &lt;th style=&#123;&#123; padding: "8px", width: "19.33%" &#125;&#125;>1024 x 1536
      &lt;th style=&#123;&#123; padding: "8px", width: "19.34%" &#125;&#125;>1536 x 1024
    </tr>
  </thead>
  <tbody>
    <tr>
      &lt;td rowSpan="3" style=&#123;&#123; padding: "8px", width: "28%" &#125;&#125;>
        GPT Image 2
        

        
Additional sizes available

      
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>Low
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.006
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.005
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.005
    </tr>
    <tr>
      &lt;td style=&#123;&#123; padding: "8px" }}>Medium
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.053
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.041
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.041
    </tr>
    <tr>
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>High
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.211
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.165
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.165
    </tr>

    <tr>
      &lt;td rowSpan="3" style=&#123;&#123; padding: "8px", width: "28%" }}>
        GPT Image 1.5
      
      &lt;td style=&#123;&#123; padding: "8px" }}>Low
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.009
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.013
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.013
    </tr>
    <tr>
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>Medium
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.034
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.05
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.05
    </tr>
    <tr>
      &lt;td style=&#123;&#123; padding: "8px" }}>High
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.133
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.2
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.2
    </tr>

    <tr>
      &lt;td rowSpan="3" style=&#123;&#123; padding: "8px", width: "28%" &#125;&#125;>
        GPT Image 1
      
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>Low
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.011
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.016
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.016
    </tr>
    <tr>
      &lt;td style=&#123;&#123; padding: "8px" }}>Medium
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.042
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.063
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.063
    </tr>
    <tr>
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>High
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.167
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.25
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.25
    </tr>

    <tr>
      &lt;td rowSpan="3" style=&#123;&#123; padding: "8px", width: "28%" }}>
        GPT Image 1 Mini
      
      &lt;td style=&#123;&#123; padding: "8px" }}>Low
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.005
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.006
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.006
    </tr>
    <tr>
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>Medium
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.011
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.015
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.015
    </tr>
    <tr>
      &lt;td style=&#123;&#123; padding: "8px" }}>High
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.036
      &lt;td style=&#123;&#123; padding: "8px" &#125;&#125;>$0.052
      &lt;td style=&#123;&#123; padding: "8px" }}>$0.052
    </tr>

  </tbody>


</details>
