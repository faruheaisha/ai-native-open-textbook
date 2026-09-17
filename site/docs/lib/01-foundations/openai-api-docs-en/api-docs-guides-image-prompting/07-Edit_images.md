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
pageSha256: "abc9e20dc7e837c95232039a57c1f6032e665169d3943df1cbf91184e482c4e7"
contentMode: "local-full"
zh: ""
---

## Edit images

Use `client.images.edit` with the referenced input images. For local edits that require a mask, see [editing with a mask](https://developers.openai.com/api/docs/guides/image-generation#edit-an-image-using-a-mask).

### Translate while preserving layout

Use each model's coffee-machine diagram from [Explain a process visually](#explain-a-process-visually) as the input. Ask to replace its text while keeping the design unchanged, then check the translation and any words left in the original language.

Edit settings: `size="1024x1536"`, `quality="high"`.

```text
Translate the text in the infographic to Spanish. Do not change any other aspect of the image.
```

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Coffee machine diagram translated into Spanish — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/infographic-coffee-machine-sp-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Coffee machine diagram translated into Spanish — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/infographic-coffee-machine-sp-gpt-image-2-5-sunburst.webp)

  </figure>

### Transfer a visual style

Assign the reference image a specific role: its palette, texture, or visual medium. Describe the new subject separately. Use the pixel-art image below as the input.

Edit settings: `size="1024x1536"`, `quality="medium"`.

```text
Use the same style from the input image and generate a man riding a motorcycle on a white background.
```

Input image:

![Pixel-art game screen used as a style reference](https://developers.openai.com/images/platform/guides/image-prompting/pixels.webp)

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Pixel-art motorcycle rider using the reference style — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/motorcycle-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Pixel-art motorcycle rider using the reference style — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/motorcycle-gpt-image-2-5-sunburst.webp)

  </figure>

### Preserve identity and change clothing

Use the person photograph and three clothing references below as inputs. State which aspects of the person must remain fixed, and allow only the clothing to change. This pattern also applies to edits where a product or object must remain recognizable.

Edit settings: `size="1024x1536"`, `quality="medium"`.

```text
Edit the image to dress the woman using the provided clothing images. Do not change her face, facial features, skin tone, body shape, pose, or identity in any way. Preserve her exact likeness, expression, hairstyle, and proportions. Replace only the clothing, fitting the garments naturally to her existing pose and body geometry with realistic fabric behavior. Match lighting, shadows, and color temperature to the original photo so the outfit integrates photorealistically, without looking pasted on. Do not change the background, camera angle, framing, or image quality, and do not add accessories, text, logos, or watermarks.
```

Input images:

  

![Woman in a museum used as the identity reference](https://developers.openai.com/images/platform/guides/image-prompting/woman-in-museum.webp)

  

![Beige jacket used as a clothing reference](https://developers.openai.com/images/platform/guides/image-prompting/jacket.webp)

  

![White tank top used as a clothing reference](https://developers.openai.com/images/platform/guides/image-prompting/tank-top.webp)

  

![Gray boots used as a clothing reference](https://developers.openai.com/images/platform/guides/image-prompting/boots.webp)

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Woman wearing the supplied clothing items — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/outfit-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Woman wearing the supplied clothing items — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/outfit-gpt-image-2-5-sunburst.webp)

  </figure>

### Combine references

Pass the scene photograph as image 1 and the dog photograph as image 2. Specify which element to move, its destination, and what must remain unchanged.

Edit settings: `size="1024x1536"`, `quality="medium"`.

```text
Place the dog from the second image into the setting of image 1, right next to the woman, use the same style of lighting, composition and background. Do not change anything else.
```

Input images:

  

![Woman in a street scene, the first compositing input](https://developers.openai.com/images/platform/guides/image-prompting/test-woman.webp)

  

![Woman with a dog, the second compositing input](https://developers.openai.com/images/platform/guides/image-prompting/test-woman-2.webp)

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Dog placed beside the woman in the street scene — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/test-woman-with-dog-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Dog placed beside the woman in the street scene — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/test-woman-with-dog-gpt-image-2-5-sunburst.webp)

  </figure>

### Create a transparent product cutout

Request both an isolated subject in the prompt and `background="transparent"` in the API. Use PNG or WebP, preserve the returned alpha channel, and omit `output_compression` for PNG. A drawn checkerboard is not transparency. For subsequent edits, repeat the requirement to preserve the transparent background. Use the product photograph below as the input.

Edit settings: `size="1024x1536"`, `quality="medium"`, `background="transparent"`, `output_format="png"`.

```text
Extract the product from the input image and isolate it on a fully transparent background.
Output: centered product, crisp silhouette, no halos/fringing.
Preserve product geometry and label legibility exactly.
Add only light polishing. Do not add a solid backdrop, checkerboard, scenery, or shadow.
Do not restyle the product; remove the background and preserve clean alpha transparency.
```

Input image:

![Original shampoo product photograph](https://developers.openai.com/images/platform/guides/image-prompting/shampoo.webp)

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Isolated shampoo bottle from the original example — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/extract-product-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Isolated shampoo bottle from the original example — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/extract-product-gpt-image-2-5-sunburst.webp)

  </figure>

### Turn a drawing into a realistic image

Sketch-to-render workflows are great for turning rough drawings into photorealistic concepts while keeping the original intent. Treat the prompt like a spec: preserve layout and perspective, then _add realism_ by specifying plausible materials, lighting, and environment. Include "do not add new elements/text" to avoid creative reinterpretations.

Edit settings: `size="1024x1536"`, `quality="medium"`.

```text
Turn this drawing into a photorealistic image.
Preserve the exact layout, proportions, and perspective.
Choose realistic materials and lighting consistent with the sketch intent.
Do not add new elements or text.
```

Input image:

![Line drawing of a river valley](https://developers.openai.com/images/platform/guides/image-prompting/drawings.webp)

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Photorealistic river valley rendered from the drawing — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/realistic-valley-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Photorealistic river valley rendered from the drawing — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/realistic-valley-gpt-image-2-5-sunburst.webp)

  </figure>

### Remove an object

Remove one object by naming it explicitly and preserving everything around it. Keep the person, pose, lighting, and composition unchanged so the edit stays local.

Edit settings: `size="1024x1536"`, `quality="medium"`.

```text
Remove the flower from man's hand. Do not change anything else.
```

Input image:

![Man holding a flower and wearing a blue cap](https://developers.openai.com/images/platform/guides/image-prompting/man-with-blue-hat.webp)

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Same man after the flower has been removed — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/man-with-no-flower-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Same man after the flower has been removed — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/man-with-no-flower-gpt-image-2-5-sunburst.webp)

  </figure>

### Insert a person into a scene

Insert a person into a new scene while preserving their identity. Specify natural lighting, believable detail, body framing, gaze, and interaction with the scene. State which facial features and proportions must remain unchanged. For `gpt-image-2`, omit `input_fidelity`; image inputs are always processed at high fidelity.

Use the [woman in the museum](https://developers.openai.com/images/platform/guides/image-prompting/woman-in-museum.webp) as the input image.

Edit settings: `size="1024x1536"`, `quality="medium"`.

```text
Generate a highly realistic action scene where this person is running away from a large, realistic brown bear attacking a campsite. The image should look like a real photograph someone could have taken, not an overly enhanced or cinematic movie-poster image.
She is centered in the image but looking away from the camera, wearing outdoorsy camping attire, with dirt on her face and tears in her clothing. She is clearly afraid but focused on escaping, running away from the bear as it destroys the campsite behind her.
The campsite is in Yosemite National Park, with believable natural details. The time of day is dusk, with natural lighting and realistic colors. Everything should feel grounded, authentic, and unstyled, as if captured in a real moment. Avoid cinematic lighting, dramatic color grading, or stylized composition.
```

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Woman running from a bear in a campsite scene — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/scene-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Woman running from a bear in a campsite scene — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/scene-gpt-image-2-5-sunburst.webp)

  </figure>
