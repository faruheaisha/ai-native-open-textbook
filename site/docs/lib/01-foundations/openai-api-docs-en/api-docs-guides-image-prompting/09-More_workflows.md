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
pageSha256: "d8d7e4d19d86c8627609c42448c354df978fdf78f557481e86cc27f2fff803a6"
contentMode: "local-full"
zh: ""
---

## More workflows

### Change furniture in a room

Visualize furniture or décor changes in real spaces without recreating the entire scene. The goal is surgical realism: swap a single object while preserving camera angle, lighting, shadows, and surrounding context so the edit looks like a real photograph, not a redesign.

Edit settings: `size="1536x1024"`, `quality="medium"`.

```text
In this room photo, replace ONLY the white chairs with chairs made of wood.
Preserve camera angle, room lighting, floor shadows, and surrounding objects.
Keep all other aspects of the image unchanged.
Photorealistic contact shadows and fabric texture.
```

Input image:

![Original kitchen with white chairs](https://developers.openai.com/images/platform/guides/image-prompting/kitchen.webp)

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Kitchen with replacement wooden chairs — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/kitchen-chairs-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Kitchen with replacement wooden chairs — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/kitchen-chairs-gpt-image-2-5-sunburst.webp)

  </figure>

### Design a holiday card

For seasonal card concepts, describe the scene, emotional tone, materials, lighting, and exact copy. For a 3D pop-up or photographed-card treatment, specify paper layers, fibers, folds, and soft studio lighting. The example below uses a nostalgic teddy-bear scene.

Generation settings: `size="1024x1536"`, `quality="medium"`.

```text
Create a Christmas holiday card illustration.

Scene:
a cozy Christmas scene with an old teddy bear sitting inside a keepsake box, slightly worn fur, soft stitching repairs, placed near a window with falling snow outside. The scene suggests the child has grown up, but the memories remain.

Mood:
Warm, nostalgic, gentle, emotional.

Style:
Premium holiday card photography, soft cinematic lighting,
realistic textures, shallow depth of field,
tasteful bokeh lights, high print-quality composition.

Constraints:
- Original artwork only
- No trademarks
- No watermarks
- No logos

Include ONLY this card text (verbatim):
"Merry Christmas — some memories never fade."
```

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Holiday card showing a teddy bear by a window — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/christmas-holiday-card-teddy-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Holiday card showing a teddy bear by a window — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/christmas-holiday-card-teddy-gpt-image-2-5-sunburst.webp)

  </figure>

### Design collectible merchandise

Explore merchandise and packaging concepts using product photography cues: materials, packaging, and print clarity. Keep designs original and non-infringing, and compare multiple character or packaging variants.

Generation settings: `size="1024x1536"`, `quality="medium"`.

```text
Create a collectible action figure of a vintage-style toy propeller airplane with rounded wings, a front-mounted spinning propeller, slightly worn paint edges, classic childhood proportions, designed as a nostalgic holiday collectible, in blister packaging.

Concept:
A nostalgic holiday collectible inspired by the simple toy airplanes
children used to play with during winter holidays.
Evokes warmth, imagination, and childhood wonder.

Style:
Premium toy photography, realistic plastic and painted metal textures,
studio lighting, shallow depth of field,
sharp label printing, high-end retail presentation.

Constraints:
- Original design only
- No trademarks
- No watermarks
- No logos

Include ONLY this packaging text (verbatim):
"Christmas Memories Edition"
```

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Collectible toy airplane in holiday packaging — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/christmas-collectible-toy-airplane-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Collectible toy airplane in holiday packaging — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/christmas-collectible-toy-airplane-gpt-image-2-5-sunburst.webp)

  </figure>
