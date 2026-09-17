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
pageSha256: "998d3ed3b0e3a5fed072c2728e00ec3a6bbb048fa2a9533367c4b065d659f599"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveResponseEvent`

```json
{
  "(resource) live > (model) response_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveResponseEvent",
    "docstring": "A streaming Responses API event from a backend delegated to by the Live session. Use the outer delegation_id to associate the nested stream with its Live delegation.",
    "ident": "ResponseEvent",
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
        },
        {
          "ident": "client_event_id"
        },
        {
          "ident": "delegation_id"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) response_event > (schema) > (property) event",
      "(resource) live > (model) response_event > (schema) > (property) event_id",
      "(resource) live > (model) response_event > (schema) > (property) type",
      "(resource) live > (model) response_event > (schema) > (property) client_event_id",
      "(resource) live > (model) response_event > (schema) > (property) delegation_id"
    ]
  },
  "(resource) live > (model) response_event > (schema) > (property) event": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponseEvent/properties/event",
    "deprecated": false,
    "key": "event",
    "docstring": "The nested Responses streaming event. Dispatch on its type field. Response lifecycle snapshots omit input and clear instructions, tools, and output to keep messages small; consume granular output events for the generated content.",
    "type": {
      "kind": "HttpTypeReference",
      "oasRef": "#/components/schemas/LiveResponseEvent/properties/event",
      "ident": "Record",
      "typeParameters": [
        {
          "kind": "HttpTypeString"
        },
        {
          "kind": "HttpTypeUnknown"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "map",
    "children": []
  },
  "(resource) live > (model) response_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponseEvent/properties/event_id",
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
  "(resource) live > (model) response_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponseEvent/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, always `response.event`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveResponseEvent/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.event"
        }
      ]
    },
    "default": "response.event",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) response_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) response_event > (schema) > (property) client_event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponseEvent/properties/client_event_id",
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
  "(resource) live > (model) response_event > (schema) > (property) delegation_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponseEvent/properties/delegation_id",
    "deprecated": false,
    "key": "delegation_id",
    "docstring": "The Live delegation associated with the nested Responses event. May be null or omitted when the event cannot be correlated with a delegation.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) response_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.event"
    }
  }
}
```
