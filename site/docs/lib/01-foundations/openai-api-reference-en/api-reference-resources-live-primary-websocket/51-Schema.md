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
sourceRel: "api/reference/resources/live/primary-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/primary-websocket.md"
sourceSha256: "4558a25169681bbcab3ba8bc8e5bc27bbf2495d07378248f8dc8ef05d4b5ca8b"
pageSha256: "957f5c16e9d92f32ff1cbab96bc279cd634469df85f1046c3b52fe4e70faf6dc"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveErrorEvent`

```json
{
  "(resource) live > (model) error_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveErrorEvent",
    "docstring": "Reports an error in the Live session, such as an invalid client command. Use error.client_event_id, when present, to identify the command that caused the error.",
    "ident": "ErrorEvent",
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
        },
        {
          "ident": "client_event_id"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) error_event > (schema) > (property) error",
      "(resource) live > (model) error_event > (schema) > (property) event_id",
      "(resource) live > (model) error_event > (schema) > (property) type",
      "(resource) live > (model) error_event > (schema) > (property) client_event_id"
    ]
  },
  "(resource) live > (model) error_event > (schema) > (property) error": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveErrorEvent/properties/error",
    "deprecated": false,
    "key": "error",
    "docstring": "Details of the Live error and the client command that caused it, when known.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "Error",
      "$ref": "(resource) live > (model) error > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) live > (model) error",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) error > (schema) > (property) code",
      "(resource) live > (model) error > (schema) > (property) message",
      "(resource) live > (model) error > (schema) > (property) type",
      "(resource) live > (model) error > (schema) > (property) client_event_id",
      "(resource) live > (model) error > (schema) > (property) param"
    ]
  },
  "(resource) live > (model) error_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveErrorEvent/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "The unique ID of the Live server event.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) error_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveErrorEvent/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, always `error`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveErrorEvent/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "error"
        }
      ]
    },
    "default": "error",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) error_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) error_event > (schema) > (property) client_event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveErrorEvent/properties/client_event_id",
    "deprecated": false,
    "key": "client_event_id",
    "docstring": "The event_id of the client command associated with this server event, when supplied.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) error > (schema) > (property) code": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveLiveError/properties/code",
    "deprecated": false,
    "key": "code",
    "docstring": "A machine-readable code identifying the Live error, such as `unknown_parameter`.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) error > (schema) > (property) message": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveLiveError/properties/message",
    "deprecated": false,
    "key": "message",
    "docstring": "A human-readable explanation of the Live error.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) error > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveLiveError/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The category of error, such as `invalid_request_error` for an invalid Live client command.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) error > (schema) > (property) client_event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveLiveError/properties/client_event_id",
    "deprecated": false,
    "key": "client_event_id",
    "docstring": "The event_id of the client command that caused the error, when supplied.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) error > (schema) > (property) param": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveLiveError/properties/param",
    "deprecated": false,
    "key": "param",
    "docstring": "The parameter that caused the error, when applicable, such as `session.voice`.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) error > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveLiveError",
    "docstring": "Details of an error encountered by the Live session, including the affected parameter or client command when available.",
    "ident": "Error",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "code"
        },
        {
          "ident": "message"
        },
        {
          "ident": "type"
        },
        {
          "ident": "client_event_id"
        },
        {
          "ident": "param"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) error > (schema) > (property) code",
      "(resource) live > (model) error > (schema) > (property) message",
      "(resource) live > (model) error > (schema) > (property) type",
      "(resource) live > (model) error > (schema) > (property) client_event_id",
      "(resource) live > (model) error > (schema) > (property) param"
    ]
  },
  "(resource) live > (model) error_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "error"
    }
  }
}
```
