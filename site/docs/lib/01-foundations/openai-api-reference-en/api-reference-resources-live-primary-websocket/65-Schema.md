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
pageSha256: "e24d94c306b5d1a1d80d61e9456c9a3fbb2d7e123555acadc67169a13b06c2ef"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveTransportFailed`

```json
{
  "(resource) live > (model) server_event > (schema) > (variant) 21": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveServerEvent-2/oneOf/21",
    "docstring": "An asynchronous outbound SIP setup failure. Delivered only to sideband observers.",
    "ident": "TransportFailed",
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
          "ident": "session_id"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) error",
      "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) event_id",
      "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) session_id",
      "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) type"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) error": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportFailed/properties/error",
    "deprecated": false,
    "key": "error",
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
          "ident": "param"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) error > (property) code",
      "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) error > (property) message",
      "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) error > (property) type",
      "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) error > (property) param"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportFailed/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) session_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportFailed/properties/session_id",
    "deprecated": false,
    "key": "session_id",
    "docstring": "The canonical Live session ID.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportFailed/properties/type",
    "deprecated": false,
    "key": "type",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveTransportFailed/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "transport.failed"
        }
      ]
    },
    "default": "transport.failed",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) error > (property) code": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportCallError/properties/code",
    "deprecated": false,
    "key": "code",
    "docstring": "The call setup failure code.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) error > (property) message": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportCallError/properties/message",
    "deprecated": false,
    "key": "message",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) error > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportCallError/properties/type",
    "deprecated": false,
    "key": "type",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveTransportCallError/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "call_error"
        }
      ]
    },
    "default": "call_error",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) error > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) error > (property) param": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportCallError/properties/param",
    "deprecated": false,
    "key": "param",
    "docstring": "The parameter related to the error, if any. Empty when no parameter applies.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "transport.failed"
    }
  },
  "(resource) live > (model) server_event > (schema) > (variant) 21 > (property) error > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "call_error"
    }
  }
}
```
