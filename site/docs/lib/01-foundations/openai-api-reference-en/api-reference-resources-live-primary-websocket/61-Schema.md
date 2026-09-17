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
pageSha256: "632e754a98770ccdbf6c2fd66e3042ce8b9991773c8cbd6f1614c2275c779b23"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveTransportRinging`

```json
{
  "(resource) live > (model) server_event > (schema) > (variant) 19": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveServerEvent-2/oneOf/19",
    "docstring": "The outbound SIP provider leg is ringing or providing early media. Delivered only to sideband observers.",
    "ident": "TransportRinging",
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
      "(resource) live > (model) server_event > (schema) > (variant) 19 > (property) event_id",
      "(resource) live > (model) server_event > (schema) > (variant) 19 > (property) session_id",
      "(resource) live > (model) server_event > (schema) > (variant) 19 > (property) type"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 19 > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportRinging/properties/event_id",
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
  "(resource) live > (model) server_event > (schema) > (variant) 19 > (property) session_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportRinging/properties/session_id",
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
  "(resource) live > (model) server_event > (schema) > (variant) 19 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveTransportRinging/properties/type",
    "deprecated": false,
    "key": "type",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveTransportRinging/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "transport.ringing"
        }
      ]
    },
    "default": "transport.ringing",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) server_event > (schema) > (variant) 19 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 19 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "transport.ringing"
    }
  }
}
```
