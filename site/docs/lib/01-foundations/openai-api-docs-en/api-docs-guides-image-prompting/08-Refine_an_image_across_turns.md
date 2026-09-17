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
pageSha256: "e584bae1bd74427dd00c5879e55ae7b96de17e247c876c4ab579eb57b8d97f36"
contentMode: "local-full"
zh: ""
---

## Refine an image across turns

Start with one output, inspect it, and use it as the next input. Keep each follow-up narrow so you can see which change helped.

### Create the starting image

Use the shampoo photograph from [Create a transparent product cutout](#create-a-transparent-product-cutout) as the input for this billboard scene. Quote the label text exactly.

Edit settings: `size="1024x1536"`, `quality="medium"`.

```text
Create a realistic billboard mockup of the shampoo on a highway scene during sunset.
Billboard text (EXACT, verbatim, no extra characters):
"Fresh and clean"
Typography: bold sans-serif, high contrast, centered, clean kerning.
Ensure text appears once and is perfectly legible.
No watermarks, no logos.
```

Input image:

![Original shampoo product photograph](https://developers.openai.com/images/platform/guides/image-prompting/shampoo.webp)

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Shampoo billboard at sunset — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/billboard-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Shampoo billboard at sunset — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/billboard-gpt-image-2-5-sunburst.webp)

  </figure>

### Change one condition

Pass each model's billboard output from the previous step into its next edit request. This short follow-up changes the weather while retaining the existing scene.

Edit settings: `size="1024x1536"`, `quality="medium"`.

```text
Make it look like a winter evening with snowfall.
```

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Shampoo billboard in a snowy evening scene — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/billboard-winter-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Shampoo billboard in a snowy evening scene — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/billboard-winter-gpt-image-2-5-sunburst.webp)

  </figure>

### Keep a character consistent

For a book with multiple illustrations, create a reusable character reference to help preserve appearance across scenes, poses, and pages. Change the environment and story while repeating the character’s defining details.

#### Establish the character

Define the character’s appearance, proportions, outfit, and tone.

Generation settings: `size="1024x1536"`, `quality="medium"`.

```text
Create a children’s book illustration introducing a main character.

Character:
A young, storybook-style hero inspired by a little forest outlaw,
wearing a simple green hooded tunic, soft brown boots, and a small belt pouch.
The character has a kind expression, gentle eyes, and a brave but warm demeanor.
Carries a small wooden bow used only for helping, never harming.

Theme:
The character protects and rescues small forest animals like squirrels, birds, and rabbits.

Style:
Children’s book illustration, hand-painted watercolor look,
soft outlines, warm earthy colors, whimsical and friendly.
Proportions suitable for picture books (slightly oversized head, expressive face).

Constraints:
- Original character (no copyrighted characters)
- No text
- No watermarks
- Plain forest background to clearly showcase the character
```

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Forest hero introducing a children&#x27;s book character — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/childrens-book-illustration-1-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Forest hero introducing a children&#x27;s book character — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/childrens-book-illustration-1-gpt-image-2-5-sunburst.webp)

  </figure>

#### Continue the story

Reuse each model's generated character image and describe a new scene. Repeat the appearance constraints so the character stays consistent.

Edit settings: `size="1024x1536"`, `quality="medium"`.

```text
Continue the children’s book story using the same character.

Scene:
The same young forest hero is gently helping a frightened squirrel
out of a fallen tree after a winter storm.
The character kneels beside the squirrel, offering reassurance.

Character Consistency:
- Same green hooded tunic
- Same facial features, proportions, and color palette
- Same gentle, heroic personality

Style:
Children’s book watercolor illustration,
soft lighting, snowy forest environment,
warm and comforting mood.

Constraints:
- Do not redesign the character
- No text
- No watermarks
```

Example outputs:

  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Flare
    </figcaption>
    

![Same forest hero helping a squirrel in a winter scene — GPT Image 2.5 Flare](https://developers.openai.com/images/platform/guides/image-prompting/childrens-book-illustration-2-gpt-image-2-5-flare.webp)

  </figure>
  <figure className="m-0 min-w-0">
    <figcaption className="mb-2 min-h-10 text-sm font-semibold">
      GPT Image 2.5 Sunburst
    </figcaption>
    

![Same forest hero helping a squirrel in a winter scene — GPT Image 2.5 Sunburst](https://developers.openai.com/images/platform/guides/image-prompting/childrens-book-illustration-2-gpt-image-2-5-sunburst.webp)

  </figure>
