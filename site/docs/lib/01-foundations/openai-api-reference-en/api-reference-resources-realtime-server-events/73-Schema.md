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
pageSha256: "5a0e9f479f6b87b571bdd29ce06fe8a72dade1d17fa37ba90e73a496a23994d5"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventResponseMCPCallArgumentsDone`

```json
{
  "(resource) realtime > (model) response_mcp_call_arguments_done > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDone",
    "docstring": "Returned when MCP tool call arguments are finalized during response generation.",
    "ident": "ResponseMcpCallArgumentsDone",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "arguments"
        },
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
          "ident": "response_id"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) arguments",
      "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) event_id",
      "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) item_id",
      "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) output_index",
      "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) response_id",
      "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) arguments": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDone/properties/arguments",
    "deprecated": false,
    "key": "arguments",
    "docstring": "The final JSON-encoded arguments string.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDone/properties/event_id",
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
  "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDone/properties/item_id",
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
  "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) output_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDone/properties/output_index",
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
  "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) response_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDone/properties/response_id",
    "deprecated": false,
    "key": "response_id",
    "docstring": "The ID of the response.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDone/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `response.mcp_call_arguments.done`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDone/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.mcp_call_arguments.done"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) response_mcp_call_arguments_done > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.mcp_call_arguments.done"
    }
  }
}
```
