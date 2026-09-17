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
sourceRel: "api/reference/resources/realtime/client-events.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/client-events.md"
sourceSha256: "e5a80993ba40bb1f036ff2b5a28b932938a9edd0419e361d3019481770cb5e4a"
pageSha256: "09be59cb57d0535770803c266fa3233069cdf62b4c1d120208a7a1979eae5b1d"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeClientEventResponseCancel`

```json
{
  "(resource) realtime > (model) response_cancel_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeClientEventResponseCancel",
    "docstring": "Send this event to cancel an in-progress response. The server will respond \nwith a `response.done` event with a status of `response.status=cancelled`. If \nthere is no response to cancel, the server will respond with an error. It's safe\nto call `response.cancel` even if no response is in progress, an error will be\nreturned the session will remain unaffected.\n",
    "ident": "ResponseCancelEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "response_id"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) response_cancel_event > (schema) > (property) type",
      "(resource) realtime > (model) response_cancel_event > (schema) > (property) event_id",
      "(resource) realtime > (model) response_cancel_event > (schema) > (property) response_id"
    ]
  },
  "(resource) realtime > (model) response_cancel_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventResponseCancel/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `response.cancel`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeClientEventResponseCancel/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.cancel"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) response_cancel_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) response_cancel_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventResponseCancel/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "Optional client-generated ID used to identify this event.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "maxLength": 512
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_cancel_event > (schema) > (property) response_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventResponseCancel/properties/response_id",
    "deprecated": false,
    "key": "response_id",
    "docstring": "A specific response ID to cancel - if not provided, will cancel an \nin-progress response in the default conversation.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_cancel_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.cancel"
    }
  }
}
```
