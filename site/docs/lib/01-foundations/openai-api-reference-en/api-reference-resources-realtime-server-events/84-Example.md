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
pageSha256: "7835f9b4a7d052b65964f851df9c37e0211360ef4054bdec4a94ab455685eb4f"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
    "event_id": "event_6102",
    "type": "mcp_list_tools.completed",
    "item_id": "mcp_list_tools_001"
}
```

## mcp_list_tools.failed

Returned when listing MCP tools has failed for an item.
