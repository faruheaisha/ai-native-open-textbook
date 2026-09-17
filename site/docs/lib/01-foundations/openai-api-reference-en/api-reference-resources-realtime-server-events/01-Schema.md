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
pageSha256: "aef5a070d431a746fdc712f5e625b00d49d2957ea627d8270d95e137cf98fabe"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventError`

```json
{
  "(resource) realtime > (model) realtime_error_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventError",
    "docstring": "Returned when an error occurs, which could be a client problem or a server\nproblem. Most errors are recoverable and the session will stay open, we\nrecommend to implementors to monitor and log error messages by default.\n",
    "ident": "RealtimeErrorEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "error"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_error_event > (schema) > (property) error",
      "(resource) realtime > (model) realtime_error_event > (schema) > (property) event_id",
      "(resource) realtime > (model) realtime_error_event > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_error_event > (schema) > (property) error": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventError/properties/error",
    "deprecated": false,
    "key": "error",
    "docstring": "Details of the error.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeError",
      "$ref": "(resource) realtime > (model) realtime_error > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_error",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_error > (schema) > (property) message",
      "(resource) realtime > (model) realtime_error > (schema) > (property) type",
      "(resource) realtime > (model) realtime_error > (schema) > (property) code",
      "(resource) realtime > (model) realtime_error > (schema) > (property) event_id",
      "(resource) realtime > (model) realtime_error > (schema) > (property) param"
    ]
  },
  "(resource) realtime > (model) realtime_error_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventError/properties/event_id",
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
  "(resource) realtime > (model) realtime_error_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventError/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `error`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventError/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "error"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_error_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_error > (schema) > (property) message": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventError/properties/error/properties/message",
    "deprecated": false,
    "key": "message",
    "docstring": "A human-readable error message.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_error > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventError/properties/error/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of error (e.g., \"invalid_request_error\", \"server_error\").\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_error > (schema) > (property) code": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventError/properties/error/properties/code",
    "deprecated": false,
    "key": "code",
    "docstring": "Error code, if any.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_error > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventError/properties/error/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "The event_id of the client event that caused the error, if applicable.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_error > (schema) > (property) param": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventError/properties/error/properties/param",
    "deprecated": false,
    "key": "param",
    "docstring": "Parameter related to the error, if any.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_error > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventError/properties/error",
    "docstring": "Details of the error.",
    "ident": "RealtimeError",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "message"
        },
        {
          "ident": "type"
        },
        {
          "ident": "code"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "param"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_error > (schema) > (property) message",
      "(resource) realtime > (model) realtime_error > (schema) > (property) type",
      "(resource) realtime > (model) realtime_error > (schema) > (property) code",
      "(resource) realtime > (model) realtime_error > (schema) > (property) event_id",
      "(resource) realtime > (model) realtime_error > (schema) > (property) param"
    ]
  },
  "(resource) realtime > (model) realtime_error_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "error"
    }
  }
}
```
