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
pageSha256: "82cdce4e8051056c39e9ca1e433122f6809241f426dfb506e7601c6715613749"
contentMode: "local-full"
zh: ""
---

## Prompting fundamentals

1. **Define the result.** Name the subject and intended use, such as a product photograph, advertisement, or diagram. Specify the composition, aspect ratio, and important placement constraints. For complex requests, organize the prompt as scene, subject, details, and constraints, using labeled sections.
2. **Choose a maintainable format.** Short prompts, descriptive paragraphs, JSON-like structures, instructions, and tags can all express the same intent. Choose the format that makes the requirements easiest to read and update rather than relying on special syntax.
3. **Describe visible details.** Name materials, lighting, colors, and the visual medium. Request “photorealistic” or “real photograph” explicitly when that is the goal, and describe framing and texture. Treat camera specifications as cues for appearance, not a guarantee of exact physical simulation. For wide, cinematic, low-light, rainy, or neon scenes, specify scale, atmosphere, and color instead of relying on mood words alone.
4. **Specify people and actions.** Describe body framing, relative scale, gaze, and interaction with objects. Instructions such as “full body visible, feet included,” “looking down at the open book,” or “hands naturally gripping the handlebars” make the intended pose and action clearer.
5. **Specify exact text.** Put required wording in quotes and describe its position and typography. Spell unusual words or brand names letter by letter when needed. Ask for no extra text, then check spelling and legibility in the output. Compare medium or high quality for small text, dense information, or multiple fonts.
6. **Separate changes from constraints.** For edits, say “change only X” and list the details to preserve, such as identity, geometry, layout, lighting, or labels. State exclusions such as unwanted text, logos, or watermarks. For precise local edits, also identify saturation, contrast, arrows, camera angle, and surrounding objects that must remain unchanged.
7. **Assign roles to references.** Identify each input by number and purpose: subject, style, clothing, or background. Explain how the inputs should combine and which elements should move where.
8. **Iterate deliberately.** Pass the previous output as the next edit input, request one change, and repeat the details to preserve. References such as “same style as before” can carry context, but restate critical constraints if the result drifts. Compare results before adding more instructions.

The examples below each demonstrate a different technique. Keep their prompts as starting points and adapt them to your own images and requirements.
