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
pageSha256: "3f30763f3b8d9db4da296314e84339f65552cfeb8264f9cf09b11c5498fdc4b5"
contentMode: "local-full"
zh: ""
---

## Run a complete example

This runnable example remains pinned to `gpt-image-2`. Use it as a baseline, then choose an available model and its supported request settings for your evaluation.

The examples below generate four logo variations and extract a product onto a transparent background. Install the [OpenAI SDK](https://developers.openai.com/api/docs/libraries#install-an-official-sdk) with `pip install openai` for Python or `gem install openai` for Ruby. Set `OPENAI_API_KEY` and save the [product photograph](https://developers.openai.com/images/platform/guides/image-prompting/shampoo.webp) as `input_images/shampoo.webp`. Live requests incur API usage charges.

### View the complete example

  Generate and edit transparent assets

```python
import base64
from pathlib import Path

from openai import OpenAI

client = OpenAI()

prompt = """
Create an original, non-infringing logo for a company called Field & Flour, a local bakery.
The logo should feel warm, simple, and timeless. Use clean, vector-like shapes, a strong silhouette, and balanced negative space.
Favor simplicity over detail so it reads clearly at small and large sizes. Flat design, minimal strokes, no gradients unless essential.
Fully transparent background. Deliver a single centered logo with generous padding, clean alpha edges, and no solid backdrop, scenery, checkerboard, or watermark.
"""

result = client.images.generate(
    model="gpt-image-2",
    prompt=prompt,
    size="1024x1536",
    quality="medium",
    background="transparent",
    output_format="png",
    n=4,  # Generate 4 versions of the logo
)

# Preserve the returned PNG bytes, including the alpha channel.
for index, item in enumerate(result.data, start=1):
    Path(f"logo-generation-{index}-gpt-image-2.png").write_bytes(
        base64.b64decode(item.b64_json)
    )

# Extract a product from a reference image.
prompt = """
Extract the product from the input image and isolate it on a fully transparent background.
Output: centered product, crisp silhouette, no halos/fringing.
Preserve product geometry and label legibility exactly.
Add only light polishing. Do not add a solid backdrop, checkerboard, scenery, or shadow.
Do not restyle the product; remove the background and preserve clean alpha transparency.
"""

result = client.images.edit(
    model="gpt-image-2",
    image=[
        Path("input_images/shampoo.webp"),
    ],
    prompt=prompt,
    size="1024x1536",
    quality="medium",
    background="transparent",
    output_format="png",
)

Path("extract-product-gpt-image-2.png").write_bytes(
    base64.b64decode(result.data[0].b64_json)
)
```

```ruby
require "base64"
require "openai"
require "pathname"

client = OpenAI::Client.new
result = client.images.generate(
  model: "gpt-image-2",
  prompt: "Create an original logo for Field & Flour, a local bakery. Use warm, simple shapes on a fully transparent background, with clean alpha edges and no shadow or checkerboard.",
  size: "1024x1536", quality: :medium, background: :transparent, output_format: :png, n: 4
)
Array(result.data).each_with_index do |item, index|
  File.binwrite("logo-generation-#{index + 1}-gpt-image-2.png", Base64.strict_decode64(item.b64_json || raise("No PNG returned")))
end
result = client.images.edit(
  model: "gpt-image-2", image: OpenAI::FilePart.new(Pathname("input_images/shampoo.webp"), content_type: "image/webp"),
  prompt: "Extract the product onto a fully transparent background. Preserve its geometry and label, with clean edges and no shadow or restyling.",
  size: "1024x1536", quality: :medium, background: :transparent, output_format: :png
)
File.binwrite("extract-product-gpt-image-2.png", Base64.strict_decode64(Array(result.data).fetch(0).b64_json || raise("No PNG returned")))
```

For additional prompts and complete workflows, see the [original notebook](https://github.com/openai/openai-cookbook/blob/d310dfa05d20fb653caa9c1c4b89ac1a4aeeeae4/examples/multimodal/image-gen-models-prompting-guide.ipynb).
