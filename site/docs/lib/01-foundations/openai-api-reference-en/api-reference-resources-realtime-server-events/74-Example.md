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
pageSha256: "3be8e869170545568fc9925620c5f771fee65c4580c8bc54425608a5a9d8a28e"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
    "event_id": "event_6202",
    "type": "response.mcp_call_arguments.done",
    "response_id": "resp_001",
    "item_id": "mcp_call_001",
    "output_index": 0,
    "arguments": "{\"q\":\"docs\"}"
}
```

## response.mcp_call.in_progress

Returned when an MCP tool call has started and is in progress.
