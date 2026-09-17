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
pageSha256: "f4f410b7dece60536f7f9ad4b23a60d7042a52e38516c09fccd954a482180afb"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventMCPListToolsInProgress`

```json
{
  "(resource) realtime > (model) mcp_list_tools_in_progress > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventMCPListToolsInProgress",
    "docstring": "Returned when listing MCP tools is in progress for an item.",
    "ident": "McpListToolsInProgress",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "event_id"
        },
        {
          "ident": "item_id"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) mcp_list_tools_in_progress > (schema) > (property) event_id",
      "(resource) realtime > (model) mcp_list_tools_in_progress > (schema) > (property) item_id",
      "(resource) realtime > (model) mcp_list_tools_in_progress > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) mcp_list_tools_in_progress > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventMCPListToolsInProgress/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "The unique ID of the server event.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) mcp_list_tools_in_progress > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventMCPListToolsInProgress/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the MCP list tools item.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) mcp_list_tools_in_progress > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventMCPListToolsInProgress/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `mcp_list_tools.in_progress`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventMCPListToolsInProgress/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "mcp_list_tools.in_progress"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) mcp_list_tools_in_progress > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) mcp_list_tools_in_progress > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "mcp_list_tools.in_progress"
    }
  }
}
```
