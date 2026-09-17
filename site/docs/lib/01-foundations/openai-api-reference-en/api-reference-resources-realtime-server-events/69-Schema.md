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
pageSha256: "573f3dfb5c74648b770d3fef0f8c74ec1ffd63609d59b7f19d54f267be939558"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventResponseFunctionCallArgumentsDone`

```json
{
  "(resource) realtime > (model) response_function_call_arguments_done_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseFunctionCallArgumentsDone",
    "docstring": "Returned when the model-generated function call arguments are done streaming.\nAlso emitted when a Response is interrupted, incomplete, or cancelled.\n",
    "ident": "ResponseFunctionCallArgumentsDoneEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "arguments"
        },
        {
          "ident": "call_id"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "item_id"
        },
        {
          "ident": "name"
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
      "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) arguments",
      "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) call_id",
      "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) event_id",
      "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) item_id",
      "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) name",
      "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) output_index",
      "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) response_id",
      "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) arguments": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseFunctionCallArgumentsDone/properties/arguments",
    "deprecated": false,
    "key": "arguments",
    "docstring": "The final arguments as a JSON string.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) call_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseFunctionCallArgumentsDone/properties/call_id",
    "deprecated": false,
    "key": "call_id",
    "docstring": "The ID of the function call.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseFunctionCallArgumentsDone/properties/event_id",
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
  "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseFunctionCallArgumentsDone/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the function call item.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseFunctionCallArgumentsDone/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The name of the function that was called.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) output_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseFunctionCallArgumentsDone/properties/output_index",
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
  "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) response_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseFunctionCallArgumentsDone/properties/response_id",
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
  "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseFunctionCallArgumentsDone/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `response.function_call_arguments.done`.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventResponseFunctionCallArgumentsDone/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.function_call_arguments.done"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) response_function_call_arguments_done_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.function_call_arguments.done"
    }
  }
}
```
