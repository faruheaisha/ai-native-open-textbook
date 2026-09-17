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
pageSha256: "0691462ebe859aab64244e17c50d398350517f474bec5c600130f77e9864e740"
contentMode: "local-full"
zh: ""
---

## Migrate an existing workflow

1. **Save a baseline.** Collect representative production prompts and reference images, including difficult edits, exact text, faces, product geometry, and transparent assets. Record the current model, request settings, and results.
2. **Choose the first candidate.** If GPT Image 2 already meets your quality requirements, start with GPT Image 2.5 Flare and test for a latency improvement. If GPT Image 2 falls short on a complex use case, start with GPT Image 2.5 Sunburst and first establish that it meets your quality requirements. Keep the prompt, references, dimensions, and output format unchanged for the first comparison.
3. **Check the complete result.** Compare instruction following, identity and product preservation, text accuracy, unwanted changes, and transparency. Repeat requests to measure consistency. For editing workflows, test the complete sequence of edits as well as individual steps.
4. **Test for a latency gain after quality passes.** If you started with GPT Image 2.5 Sunburst and it meets your quality requirements, evaluate GPT Image 2.5 Flare against the same requirements. Switch only if the quality remains acceptable and latency improves; otherwise, keep GPT Image 2.5 Sunburst.
5. **Tune one setting at a time.** Compare quality levels before rewriting the prompt. Measure typical and slow responses, failures, retries, and cost per accepted image. Confirm current pricing rather than assuming the faster model costs less.
6. **Roll out by workflow.** Once the released model passes your acceptance criteria, move a small share of traffic, monitor the same measures, and expand gradually. Keep the previous model available for rollback while it remains supported.

When migrating from GPT Image 1 or 1.5, use the reference tabs to check parameter differences and shutdown dates. Test the candidate model's supported request settings rather than copying older settings unchanged. For GPT Image 2, keep your existing resolution and transparency requirements in the comparison.

Repeated edits can still change details you intended to preserve. Restate those constraints and inspect each result. If a region must remain pixel-identical, composite the approved edit into the original image instead of relying on prompting alone.
