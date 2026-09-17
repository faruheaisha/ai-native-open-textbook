---
title: "Prompt Engineering Guide"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/guides/4o-image-generation.en.mdx"
sourceRel: "pages/guides/4o-image-generation.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/guides/4o-image-generation.en.mdx"
sourceSha256: "439159a24b7e0fd3ff9fa8a3313a37f930a4a71fac5bf068ec665af7763f2171"
pageSha256: "439159a24b7e0fd3ff9fa8a3313a37f930a4a71fac5bf068ec665af7763f2171"
contentMode: "local-full"
zh: ""
---

# Prompt Engineering Guide

## OpenAI 4o Image Generation Guide

A practical guide to using the 4o Image Generation Model

![A stylized title in front of an OpenAI logo, behind frosted glass.](/mirror/74/7441e5928c7fa35d198eda7ededa9f17605cea3b.png)

### What is the 4o Image Generation model?

4o Image Generation is OpenAI’s latest image model embedded into ChatGPT. It can create photorealistic outputs, take images as inputs and transform them, and follow detailed instructions, including generating text into images. OpenAI has confirmed that the model is autoregressive, and uses the same architecture as the GPT-4o LLM. The model essentially generates images in the same way as the LLM generates text. This enables improved capabilities in rendering text on top of images, more granular image editing, and editing images based on image inputs.

### How to access 4o Image Generation

Access 4o Image Generation in the ChatGPT application (web or mobile) by prompting with text, or by selecting “Create an image” from the tools. The model is also accessible in Sora, or via OpenAI API with gpt-image-1.

Text prompting: “Generate an image of…”
![text_prompt](/mirror/99/998875c31aad22bd0711d879962ccf516295fac4.jpg)

Selecting "Create an image" from the toolbox:
![tool_select](/mirror/f5/f58a373ac3ea8ae19d975798db29aca3a877026e.jpg)

With the OpenAI API [OpenAI API](https://platform.openai.com/docs/guides/images-vision?api-mode=responses).
![Screenshot of the OpenAI API documentation page](/mirror/ae/ae36e15de794af1565143ca7bd9f4512746da413.jpg)

**The 4o image generation is accessible with these models:**
- gpt-4o
- gpt-4o-mini
- gpt-4.1
- gpt-4.1-mini
- gpt-4.1-nano
- o3

### What can the 4o image generation model do?

**Create images in aspect ratios of:**
- Square 1:1 1024x1024 (default)
- Landscape 3:2 1536x1024
- Portrait 2:3 1024x1536

**Use reference images in the file types:**
- PNG
- JPEG
- WEBP
- Non-animated GIF

**Edit images by:**

**Inpainting** (only images generated in that chat)
![Example of inpainting.](/mirror/3b/3b8ec3c60fda3638eea583a30836c698104bd490.png)

**Prompting** (“what would it look like during the winter?”)
![Example image before text prompt revision](/mirror/e6/e64671f82f0e15a8f5a59a47021582ce598465ca.png)

**Reference images & transfer the style**
The model is very good at retexturing and changing image styles when provided a reference image. The ability to ‘Ghiblify’ images went viral when the model was launched.

![Image of Sam Altman and Jony Ive](/mirror/97/9790106c88638242b250699f007f88e707b1dcd4.png) ![Image of Sam Altman and Jony Ive Ghiblified](/mirror/63/6374fb48f7123640f9955579ee2586786df4c156.png)

**Transparent backgrounds (png)**
Needs to be specified in the prompt by mentioning “transparent PNG” or “transparent background”.
![Example of a sticker with a transparent background, suitable for use as a PNG.](/mirror/3b/3b8ec3c60fda3638eea583a30836c698104bd490.png)

**Generate text in images**
![An image of the DAIR.AI Academy text generated with 4o Image Generation.](/mirror/16/16c3bf85c08ab1a0409280c7d60205e6ac3251af.png)

**Generate the same image in different styles**
![Photorealistic teapot.](/mirror/f9/f929ba75efdb5d553c8c886e0ae4710afd3364a6.png) ![Teapot in the style of Van Gogh.](/mirror/62/62c90dda8784e1fe66a0c7cf032caac2e9cc5d88.png)

**Combine images**
![Meerkat and a T-shirt](/mirror/6d/6de0c7c58d6caea4aff4960175a526c78f0744ff.png)
![Combined.](/mirror/e4/e4945250a2e4d29ece2253a53e92aad1f5bd1e37.png)

### Prompting Tips for 4o Image Generation

#### Detailed prompts give you more control.
If your prompt is not descriptive, ChatGPT often fills in additional details. This can be useful for quick tests or exploration, but if you have something specific in mind, write a detailed and descriptive prompt.

  If you are struggling with descriptions, ask o3 to write 3 varied prompts optimized for 4o image generation based on your own description, with the details filled in. Then select the parts you like most and use that as the prompt.

#### Lighting, Composition, Style
Define these in your prompt if you have a specific goal in mind. The model is quite good at estimating them based on the general information in a prompt, but when you need specific results you must define them accurately. If you want the image to resemble a photo taken with a specific camera and lens type, add it to the prompt.

Other details to consider:
- Subject
- Medium
- Environment
- Color
- Mood

#### Select different models for different image generation tasks
4o is fastest for one-off edits or simple image generation tasks.

If you expect the generation to take multiple steps, use a reasoning model. If you are iteratively adding or removing elements when doing creative exploration, the reasoning model will perform better at keeping the consistent elements of an image ‘in mind’. E.g., your image needs a specific style, font, colors, etc. You can find an example in this [link to a thumbnail creation process](https://chatgpt.com/share/68404206-5710-8007-8262-6efaba15a852).

#### Image aspect ratio
It helps to specify the aspect ratio you want in your prompt, even when using a reference image. The model can select the correct aspect ratio if it has clues in the prompt (e.g. images of rockets are often 2:3), but defaults to 1:1 when not clearly instructed otherwise.

*Prompt to test:*
```
A high-resolution photograph of a majestic Art Deco-style rocket inspired by the scale and grandeur of the SpaceX Starship, standing on a realistic launch pad during golden hour. The rocket has monumental vertical lines, stepped geometric ridges like the American Radiator Building, and a mirror-polished metallic surface reflecting a vivid sunset sky. The rocket is photorealistic, awe-inspiring, and elegant, bathed in cinematic warm light with strong shadows and a vast landscape stretching to the horizon.
```

![A photorealistic, Art Deco-style rocket on a launchpad at sunset, generated from the provided test prompt.](/mirror/7f/7f27a867ae73060041443c09e36539fd9275c39c.png)

#### Be aware of consistency in the model’s generations
This can be good if you want to change minor details on an image, but a challenge if you want to be more creative. The model ‘remembers’ images generated in the same chat. For independent and different image generation tasks it's good to start fresh in a new chat every time.

  If the first few iterations on an image are not even close to what you were going for, **ask the model to output the prompt that was used in generating the image**, and try to see if you spot the misplaced emphasis. Then start a new chat and continue generating with a revised prompt.

#### Generating multiple images with one prompt
Reasoning models such as o3 and o4-mini can generate multiple images with a single prompt, but this needs to be explicitly stated in the prompt, and does not always work. Example: [Chat Link](https://chatgpt.com/share/68496cf8-0120-8007-b95f-25a940298c09)

*Prompt to test:*
```
Generate an image of [decide this yourself], in the style of an oil painting by Van Gogh. Use a 3:2 aspect ratio. Before you generate the image, recite the rules of this image generation task. Then send the prompt to the 4o Image Generation model. Do not use DALL-E 3. If the 4o Image Generation model is timed out, tell me how much time is left until you can queue the next prompt to the model.

Rules:
- Use only the aspect ratio mentioned earlier.
- Output the prompt you sent to the image generation model exactly as you sent it, do this every time in between image generations
- Create three variations with a different subject, but the same rules. After an image is generated, immediately start creating the next one, without ending your turn or asking me for confirmation for moving forward.
```

#### Enforcing strict prompt adherence is difficult
Prompts with multiple components sometimes get changed somewhere between the chat model and the 4o Image Generation model. If you have generated multiple images in the same chat, the previously generated images may affect outputs despite the changes you make in the prompts.

### Limitations
- ChatGPT can change your initial prompt before it is sent to the image 4o Image Generation model. This is more likely to happen in multi-turn generation tasks, if the prompt lacks description, or when using a long prompt.
- It is not clear what the generation amount per user or subscription are. OpenAI has stated that the system is dynamic, so it likely depends on your subscription, and server load in your region.
- Generations on the free tier often get queued, and can take a long time to generate.
- Generated images may have a yellow tint.
- Generated images may be too dark if dark elements are in the prompt or reference image(s).
- Generation refusals: The image generation is subject to the same general rules as the rest of OpenAI’s services: [Usage Policies](https://openai.com/policies/usage-policies/). If prohibited subjects are detected inside the prompt, reference images or the generated output image, the generation often gets refused and the partially generated image is deleted.
- No upscaling feature inside ChatGPT.
- The model can make errors in cropping, and output images with only a part of the generated image.
- Hallucinations similar to LLMs.
- Generating images with many concepts or individual subjects at once is difficult.
- Generating images which visualize graph data is not precise.
- Difficulty in generating non-Latin language text in images.
- Requests to edit specific portions of an image generation, such as typos are not always effective.
- Model naming: This model has been given multiple names, which can get confusing: Imagegen, gpt-image-1, 4o Image Generation, image_gen.text2im…
- In some cases the aspect ratio will be wrong, regardless of being specified in the prompt.

### Tips & Best Practices

  **Use ChatGPT Personalization:** To avoid switching to the older DALL-E 3 model, add this instruction to the ‘What traits should ChatGPT have’ section in your settings:
  > "Never use the DALL-E tool. Always generate images with the new image gen tool. If the image tool is timed out, tell me instead of generating with DALL-E."

- If you hit the generation limit, ask ChatGPT how much time is left until you can generate more images. The backend has this information available for the user.
- Image generation and editing works best when you use clear terms like "draw" or "edit" in your prompt.
- Using reasoning models to generate images gives you the added benefit of seeing how the model reasons through the prompt creation and revision process. Open the thinking traces to see what the model is focusing on.

### Use Cases to try

- **Generating a logo:** Use reference images and detailed descriptions. This is often a multi-turn task, so use a reasoning model. [Example Chat](https://chatgpt.com/share/6848aaa7-be7c-8007-ba6c-c69ec1eb9c25).
- **Generating marketing assets:** Use your existing visual assets as references and prompt the model to change text, products, or environments.
- **Generating coloring book pages:** Use the 2:3 aspect ratio to create custom coloring book pages. [Example Chat](https://chatgpt.com/share/684ac538-25c4-8007-861a-3fe682df47ab).
- **Sticker images:** Remember to mention a transparent background. [Example Chat](https://chatgpt.com/share/684960b3-dc00-8007-bf16-adfae003dde5).
- **Material transfer:** Use a reference image for a material and apply it to a subject from a second image or prompt. [Example Chat](https://chatgpt.com/share/684ac8d5-e3f8-8007-9326-ea6291a891e3).
- **Interior design:** Take a picture of a room and prompt for specific furniture and feature changes. [Example Chat](https://chatgpt.com/share/684ac69f-6760-8007-83b9-2e8094e5ae31).

### Prompt & Chat Examples
- [Course thumbnail image generation process](https://chatgpt.com/share/68404206-5710-8007-8262-6efaba15a852)
- [Subject revision in multi-turn image generation](https://chatgpt.com/share/6848a5e1-3730-8007-8a16-56360794722c)
- [Textured icon on a transparent background](https://chatgpt.com/share/6848a7ab-0ab4-8007-843d-e19e3f7daec8)
- [Logo design for a drone flower delivery start-up](https://chatgpt.com/share/6848aaa7-be7c-8007-ba6c-c69ec1eb9c25)
- [White outline sticker of a raccoon eating a strawberry](https://chatgpt.com/share/684960b3-dc00-8007-bf16-adfae003dde5)
- [Generate multiple images with one prompt](https://chatgpt.com/share/68496cf8-0120-8007-b95f-25a940298c09)
- [Editing an image with a text prompt (summer to winter)](https://chatgpt.com/share/684970b8-9718-8007-a591-db40ad5f13ae)
- [A bumblebee napping in the style of Studio Ghibli](https://chatgpt.com/share/68497515-62e8-8007-b927-59d4b5e9a876)
- [Interior design by adding furniture to your own images](https://chatgpt.com/share/684ac69f-6760-8007-83b9-2e8094e5ae31)
- [Material transfer using two reference images](https://chatgpt.com/share/684ac8d5-e3f8-8007-9326-ea6291a891e3)

### References
- [Introducing 4o Image Generation](https://openai.com/index/introducing-4o-image-generation/)
- [Addendum to GPT-4o System Card: Native Image Generation](https://cdn.openai.com/11998be9-5319-4302-bfbf-1167e093f1fb/Native_Image_Generation_System_Card.pdf)
- [Gpt-image-1 in the OpenAI API](https://openai.com/index/image-generation-api/)
- [OpenAI Docs: gpt-image-1](https://platform.openai.com/docs/models/gpt-image-1)
- [OpenAI Docs: Image Generation Guide](https://platform.openai.com/docs/guides/image-generation?image-generation-model=gpt-image-1)
- [More prompt and image examples from OpenAI](https://platform.openai.com/docs/guides/image-generation?image-generation-model=gpt-image-1&gallery=open)

import \{ Callout \} from 'nextra/components'
