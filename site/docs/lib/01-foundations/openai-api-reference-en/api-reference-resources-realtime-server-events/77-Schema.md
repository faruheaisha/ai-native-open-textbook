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
pageSha256: "a544f9764489eb596fbd3842d9e42ce0051135ef7476a9d0db793027634af6ea"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventResponseMCPCallCompleted`

```json
{
  "(resource) realtime > (model) response_mcp_call_completed > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallCompleted",
    "docstring": "Returned when an MCP tool call has completed successfully.",
    "ident": "ResponseMcpCallCompleted",
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
          "ident": "output_index"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) response_mcp_call_completed > (schema) > (property) event_id",
      "(resource) realtime > (model) response_mcp_call_completed > (schema) > (property) item_id",
      "(resource) realtime > (model) response_mcp_call_completed > (schema) > (property) output_index",
      "(resource) realtime > (model) response_mcp_call_completed > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) response_mcp_call_completed > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallCompleted/properties/event_id",
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
  "(resource) realtime > (model) response_mcp_call_completed > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallCompleted/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the MCP tool call item.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_mcp_call_completed > (schema) > (property) output_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallCompleted/properties/output_index",
    "deprecated": false,
    "key": "output_index",
    "docstring": "The index of the output item in the response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) response_mcp_call_completed > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallCompleted/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `response.mcp_call.completed`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallCompleted/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.mcp_call.completed"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) response_mcp_call_completed > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) response_mcp_call_completed > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.mcp_call.completed"
    }
  }
}
```
