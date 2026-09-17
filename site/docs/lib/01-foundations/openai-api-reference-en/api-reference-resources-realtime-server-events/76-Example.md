---
title: "OpenAI API 参考（字段级）"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/realtime/server-events.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/server-events.md"
sourceSha256: "4595bc318a41e7e43d9ea10eda8ce73d0a7f3740791946b9eeb2fb3cc8bab8a6"
pageSha256: "c1ff7b8ae41b5372b0ec706108c5215828c858de7d9aab7ed2dae4a60105260c"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
    "event_id": "event_6301",
    "type": "response.mcp_call.in_progress",
    "output_index": 0,
    "item_id": "mcp_call_001"
}
```

## response.mcp_call.completed

Returned when an MCP tool call has completed successfully.
