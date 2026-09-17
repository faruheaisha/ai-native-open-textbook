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
pageSha256: "e0815015fddfe48b7c969a7d7dde5904f4a6c61caf698aec0d7506c695148592"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventMCPListToolsCompleted`

```json
{
  "(resource) realtime > (model) mcp_list_tools_completed > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventMCPListToolsCompleted",
    "docstring": "Returned when listing MCP tools has completed for an item.",
    "ident": "McpListToolsCompleted",
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
      "(resource) realtime > (model) mcp_list_tools_completed > (schema) > (property) event_id",
      "(resource) realtime > (model) mcp_list_tools_completed > (schema) > (property) item_id",
      "(resource) realtime > (model) mcp_list_tools_completed > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) mcp_list_tools_completed > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventMCPListToolsCompleted/properties/event_id",
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
  "(resource) realtime > (model) mcp_list_tools_completed > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventMCPListToolsCompleted/properties/item_id",
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
  "(resource) realtime > (model) mcp_list_tools_completed > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventMCPListToolsCompleted/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `mcp_list_tools.completed`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventMCPListToolsCompleted/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "mcp_list_tools.completed"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) mcp_list_tools_completed > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) mcp_list_tools_completed > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "mcp_list_tools.completed"
    }
  }
}
```
