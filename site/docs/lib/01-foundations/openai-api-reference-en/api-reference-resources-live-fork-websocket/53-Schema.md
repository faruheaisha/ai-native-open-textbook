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
sourceRel: "api/reference/resources/live/fork-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/fork-websocket.md"
sourceSha256: "9e6521e93be8aca435d9a5de6a3905a8388040ba12e0775d313c91a93fe91796"
pageSha256: "f714f9ad36dfb5ec1f3b56194313da94caf3032e3467530287629191003b62ca"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveInfoEvent`

```json
{
  "(resource) live > (model) info_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInfoEvent",
    "docstring": "An informational notice about the Live session, such as the event permissions applied to a frontend data channel.",
    "ident": "InfoEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "code"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "message"
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
      "(resource) live > (model) info_event > (schema) > (property) code",
      "(resource) live > (model) info_event > (schema) > (property) event_id",
      "(resource) live > (model) info_event > (schema) > (property) message",
      "(resource) live > (model) info_event > (schema) > (property) type",
      "(resource) live > (model) info_event > (schema) > (property) client_event_id"
    ]
  },
  "(resource) live > (model) info_event > (schema) > (property) code": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInfoEvent/properties/code",
    "deprecated": false,
    "key": "code",
    "docstring": "A machine-readable code for the notice, such as `data_channel_permissions`.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) info_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInfoEvent/properties/event_id",
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
  "(resource) live > (model) info_event > (schema) > (property) message": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInfoEvent/properties/message",
    "deprecated": false,
    "key": "message",
    "docstring": "A human-readable explanation of the Live session notice.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) info_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInfoEvent/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, always `info`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInfoEvent/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "info"
        }
      ]
    },
    "default": "info",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) info_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) info_event > (schema) > (property) client_event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInfoEvent/properties/client_event_id",
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
  "(resource) live > (model) info_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "info"
    }
  }
}
```
