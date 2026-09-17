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
pageSha256: "fcaae4ca871182e7539e4591cc4a2c06cc66641354802e7a433df37ef18ba613"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventResponseMCPCallFailed`

```json
{
  "(resource) realtime > (model) response_mcp_call_failed > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallFailed",
    "docstring": "Returned when an MCP tool call has failed.",
    "ident": "ResponseMcpCallFailed",
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
      "(resource) realtime > (model) response_mcp_call_failed > (schema) > (property) event_id",
      "(resource) realtime > (model) response_mcp_call_failed > (schema) > (property) item_id",
      "(resource) realtime > (model) response_mcp_call_failed > (schema) > (property) output_index",
      "(resource) realtime > (model) response_mcp_call_failed > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) response_mcp_call_failed > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallFailed/properties/event_id",
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
  "(resource) realtime > (model) response_mcp_call_failed > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallFailed/properties/item_id",
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
  "(resource) realtime > (model) response_mcp_call_failed > (schema) > (property) output_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallFailed/properties/output_index",
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
  "(resource) realtime > (model) response_mcp_call_failed > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallFailed/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `response.mcp_call.failed`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallFailed/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.mcp_call.failed"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) response_mcp_call_failed > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) response_mcp_call_failed > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.mcp_call.failed"
    }
  }
}
```
