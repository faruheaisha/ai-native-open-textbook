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
pageSha256: "15f96531e78d326caa8a3140ce279e189eb9817b8254ee286926e1d066f0d38e"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveTransportAnswered`

```json
{
  "(resource) live > (model) server_event > (schema) > (variant) 20": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveServerEvent-2/oneOf/20",
    "docstring": "The outbound SIP provider leg answered and media is established. Delivered only to sideband observers.",
    "ident": "TransportAnswered",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
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
      "(resource) live > (model) server_event > (schema) > (variant) 20 > (property) event_id",
      "(resource) live > (model) server_event > (schema) > (variant) 20 > (property) session_id",
      "(resource) live > (model) server_event > (schema) > (variant) 20 > (property) type"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 20 > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportAnswered/properties/event_id",
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
  "(resource) live > (model) server_event > (schema) > (variant) 20 > (property) session_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportAnswered/properties/session_id",
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
  "(resource) live > (model) server_event > (schema) > (variant) 20 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportAnswered/properties/type",
    "deprecated": false,
    "key": "type",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveTransportAnswered/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "transport.answered"
        }
      ]
    },
    "default": "transport.answered",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) server_event > (schema) > (variant) 20 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 20 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "transport.answered"
    }
  }
}
```
