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
pageSha256: "186c159ff1042433ac59fb2ae96a0ee919b2fe435b857bc70c4eb6eb70f54a8a"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventResponseTextDone`

```json
{
  "(resource) realtime > (model) response_text_done_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseTextDone",
    "docstring": "Returned when the text value of an \"output_text\" content part is done streaming. Also\nemitted when a Response is interrupted, incomplete, or cancelled.\n",
    "ident": "ResponseTextDoneEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "content_index"
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
          "ident": "text"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) response_text_done_event > (schema) > (property) content_index",
      "(resource) realtime > (model) response_text_done_event > (schema) > (property) event_id",
      "(resource) realtime > (model) response_text_done_event > (schema) > (property) item_id",
      "(resource) realtime > (model) response_text_done_event > (schema) > (property) output_index",
      "(resource) realtime > (model) response_text_done_event > (schema) > (property) response_id",
      "(resource) realtime > (model) response_text_done_event > (schema) > (property) text",
      "(resource) realtime > (model) response_text_done_event > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) response_text_done_event > (schema) > (property) content_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseTextDone/properties/content_index",
    "deprecated": false,
    "key": "content_index",
    "docstring": "The index of the content part in the item's content array.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) response_text_done_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseTextDone/properties/event_id",
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
  "(resource) realtime > (model) response_text_done_event > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseTextDone/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the item.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_text_done_event > (schema) > (property) output_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseTextDone/properties/output_index",
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
  "(resource) realtime > (model) response_text_done_event > (schema) > (property) response_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseTextDone/properties/response_id",
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
  "(resource) realtime > (model) response_text_done_event > (schema) > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseTextDone/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "The final text content.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_text_done_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseTextDone/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `response.output_text.done`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventResponseTextDone/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.output_text.done"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) response_text_done_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) response_text_done_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.output_text.done"
    }
  }
}
```
