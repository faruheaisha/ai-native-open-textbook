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
sourceRel: "api/docs/guides/migrate-to-responses.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/migrate-to-responses.md"
sourceSha256: "418a01fec7cbfbdaef2ab472f11c2144b33de5e3007b8b68aa65db3ee85c7a10"
pageSha256: "71ff1328a108db22ddb58fa75c474ffd7ce5f788bac339cdd2207a0352fdc164"
contentMode: "local-full"
zh: ""
---

## Incremental rollout checklist

Chat Completions remains supported, so you can migrate one user flow at a time.

- [ ] Start with a simple text-generation flow.
- [ ] Update the endpoint, request body, and output handling.
- [ ] Decide whether the flow uses `previous_response_id`, manual Item replay, or the Conversations API.
- [ ] If the flow is stateless or ZDR, add `store: false` and include encrypted reasoning items when reasoning context must continue across turns.
- [ ] Migrate function definitions and verify function call outputs include the correct `call_id`.
- [ ] Move Structured Outputs schemas from `response_format` to `text.format`.
- [ ] Update streaming consumers to handle typed Responses events.
- [ ] Replace custom orchestration with OpenAI-hosted tools where they fit the workflow.
- [ ] Compare behavior, latency, token usage, and errors before routing more traffic to Responses.

We recommend migrating all flows to the Responses API over time to take advantage of the latest OpenAI features and improvements.
