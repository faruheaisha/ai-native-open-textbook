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
sourceRel: "api/reference/resources/live/sideband-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/sideband-websocket.md"
sourceSha256: "3931e3ed281fce5bf05f32a67301bdd3963d7f23e08d45dc8483e7bc1c4302aa"
pageSha256: "bf2f6eef2b52179d7c396f47cfa2609939bcb76d8af57ba828ca93916951e23d"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveTransportDTMFSend`

```json
{
  "(resource) live > (model) server_event > (schema) > (variant) 18": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveServerEvent-2/oneOf/18",
    "docstring": "A SIP DTMF keypress successfully sent by the hosted tool. Delivered only to sideband observers; this is not a client command.",
    "ident": "TransportDtmfSend",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "event"
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
      "(resource) live > (model) server_event > (schema) > (variant) 18 > (property) event",
      "(resource) live > (model) server_event > (schema) > (variant) 18 > (property) event_id",
      "(resource) live > (model) server_event > (schema) > (variant) 18 > (property) type"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 18 > (property) event": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportDTMFSend/properties/event",
    "deprecated": false,
    "key": "event",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 1,
      "maxLength": 1
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) server_event > (schema) > (variant) 18 > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportDTMFSend/properties/event_id",
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
  "(resource) live > (model) server_event > (schema) > (variant) 18 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportDTMFSend/properties/type",
    "deprecated": false,
    "key": "type",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveTransportDTMFSend/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "transport.dtmf.send"
        }
      ]
    },
    "default": "transport.dtmf.send",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) server_event > (schema) > (variant) 18 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 18 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "transport.dtmf.send"
    }
  }
}
```
