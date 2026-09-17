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
sourceRel: "api/docs/guides/reasoning.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/reasoning.md"
sourceSha256: "cf636c88ee3feaf7cad399534f49fe70ca853728f4bd2f387c6295206c10e93d"
pageSha256: "b0f5d4baf062696e6463d570a0006d62861aa3860fce815b26a4d431e290bab3"
contentMode: "local-full"
zh: ""
---

## Reasoning mode

GPT-5.6 models support `standard` and `pro` reasoning modes in the Responses API. `standard` is the default. Set `reasoning.mode` to `pro` for difficult tasks that need more model work and can tolerate higher latency and token usage.

Reasoning mode and reasoning effort are independent. Mode selects standard or pro execution, while `reasoning.effort` controls how much reasoning the model applies within that mode. If you omit `reasoning.effort`, GPT-5.6 defaults to `medium` in both modes.

Using pro reasoning mode

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-5.6",
    "reasoning": {
      "mode": "pro",
      "effort": "medium"
    },
    "input": "Review this database migration plan and identify potential failure modes."
  }'
```

Pro mode aggregates the model work performed to produce the final answer and bills those tokens at the selected model's standard [token rates](https://developers.openai.com/api/docs/pricing). Pro mode performs more model work than standard mode, increasing token usage and cost. Existing Pro model IDs keep their current behavior and pricing.
