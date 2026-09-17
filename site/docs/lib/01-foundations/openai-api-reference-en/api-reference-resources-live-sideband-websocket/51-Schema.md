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
pageSha256: "8ccd29f9676afee77419e030a3a400c53a0ca232e1ee85ee8cab7e94e5b6f465"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveTransportDTMFReceived`

```json
{
  "(resource) live > (model) server_event > (schema) > (variant) 17": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveServerEvent-2/oneOf/17",
    "docstring": "A SIP DTMF keypress received from the caller. Delivered only to sideband observers.",
    "ident": "TransportDtmfReceived",
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
      "(resource) live > (model) server_event > (schema) > (variant) 17 > (property) event",
      "(resource) live > (model) server_event > (schema) > (variant) 17 > (property) event_id",
      "(resource) live > (model) server_event > (schema) > (variant) 17 > (property) type"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 17 > (property) event": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportDTMFReceived/properties/event",
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
  "(resource) live > (model) server_event > (schema) > (variant) 17 > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportDTMFReceived/properties/event_id",
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
  "(resource) live > (model) server_event > (schema) > (variant) 17 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportDTMFReceived/properties/type",
    "deprecated": false,
    "key": "type",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveTransportDTMFReceived/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "transport.dtmf.received"
        }
      ]
    },
    "default": "transport.dtmf.received",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) server_event > (schema) > (variant) 17 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 17 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "transport.dtmf.received"
    }
  }
}
```
