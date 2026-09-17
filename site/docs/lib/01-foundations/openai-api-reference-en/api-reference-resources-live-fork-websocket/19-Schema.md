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
pageSha256: "d372eb021686b910cce333942631dd0d7d93aefe534da4e7ed8e95fc7e818c34"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveResponseCreateParam`

```json
{
  "(resource) live > (model) response_create_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveResponseCreateParam",
    "docstring": "Request a response from the Live session’s Responses backend, or continue a delegated response waiting for tool results. Requires Responses delegation.",
    "ident": "ResponseCreateEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        },
        {
          "ident": "event_id"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) response_create_event > (schema) > (property) type",
      "(resource) live > (model) response_create_event > (schema) > (property) event_id"
    ]
  },
  "(resource) live > (model) response_create_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponseCreateParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The Live client event type. Always `response.create`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveResponseCreateParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.create"
        }
      ]
    },
    "default": "response.create",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) response_create_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) response_create_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponseCreateParam/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "Optional client identifier for correlating this command with a server event's client_event_id or error.client_event_id.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "maxLength": 512
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) response_create_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.create"
    }
  }
}
```
