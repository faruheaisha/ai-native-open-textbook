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
pageSha256: "38f0044405fc34a1ed6308c6833baf5f558b94bcc9d91955b355393e4cccef5b"
contentMode: "local-full"
zh: ""
---

## Choose a model

For a new workflow, start with GPT Image 2.5 Flare when speed is the priority, or GPT Image 2.5 Sunburst when demanding quality requirements are the priority. Once the output meets your requirements, look for opportunities to reduce latency.

For migrating from a current image model, use your current image quality as the starting point. Both models support image generation, editing, and transparent backgrounds.

| Your current workflow                                                               | Start by testing                                                                             |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| An existing, validated GPT Image 2 workflow already meets your quality requirements | GPT Image 2.5 Flare. Check whether you can retain acceptable quality while reducing latency. |
| A complex use case where GPT Image 2 does not meet your quality requirements        | GPT Image 2.5 Sunburst. First establish that it delivers the quality you need.               |

If GPT Image 2.5 Sunburst meets your quality requirements, then test GPT Image 2.5 Flare with the same prompts and inputs. Switch to GPT Image 2.5 Flare if it also meets those requirements and improves latency. Keep GPT Image 2.5 Sunburst when its quality advantage is necessary for your workflow.

Measure response time and quality on your own workload. Results depend on your prompts, reference images, output dimensions, and quality settings; a speed improvement on one workload doesn't establish a fixed improvement on another.
