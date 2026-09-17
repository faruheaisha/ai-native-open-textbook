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
pageSha256: "fb2182ed98f47d3f69cfe221e6750ccfdfb6e7ecff436bc27769ffcf2fdfe78e"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventResponseMCPCallArgumentsDelta`

```json
{
  "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDelta",
    "docstring": "Returned when MCP tool call arguments are updated during response generation.",
    "ident": "ResponseMcpCallArgumentsDelta",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "delta"
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
        },
        {
          "ident": "obfuscation"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) delta",
      "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) event_id",
      "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) item_id",
      "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) output_index",
      "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) response_id",
      "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) type",
      "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) obfuscation"
    ]
  },
  "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) delta": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDelta/properties/delta",
    "deprecated": false,
    "key": "delta",
    "docstring": "The JSON-encoded arguments delta.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDelta/properties/event_id",
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
  "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDelta/properties/item_id",
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
  "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) output_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDelta/properties/output_index",
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
  "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) response_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDelta/properties/response_id",
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
  "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDelta/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `response.mcp_call_arguments.delta`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDelta/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.mcp_call_arguments.delta"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) obfuscation": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseMCPCallArgumentsDelta/properties/obfuscation",
    "deprecated": false,
    "key": "obfuscation",
    "docstring": "If present, indicates the delta text was obfuscated.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_mcp_call_arguments_delta > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.mcp_call_arguments.delta"
    }
  }
}
```
