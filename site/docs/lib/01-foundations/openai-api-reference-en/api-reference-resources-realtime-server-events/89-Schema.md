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
pageSha256: "06f1256339c2da358e9e4d3a8fa7ec7af28878864bccfa30c3747ed533a909b0"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventConversationCreated`

```json
{
  "(resource) realtime > (model) conversation_created_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationCreated",
    "docstring": "Returned when a conversation is created. Emitted right after session creation.\n",
    "ident": "ConversationCreatedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "conversation"
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
      "(resource) realtime > (model) conversation_created_event > (schema) > (property) conversation",
      "(resource) realtime > (model) conversation_created_event > (schema) > (property) event_id",
      "(resource) realtime > (model) conversation_created_event > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) conversation_created_event > (schema) > (property) conversation": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationCreated/properties/conversation",
    "deprecated": false,
    "key": "conversation",
    "docstring": "The conversation resource.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "object"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) conversation_created_event > (schema) > (property) conversation > (property) id",
      "(resource) realtime > (model) conversation_created_event > (schema) > (property) conversation > (property) object"
    ]
  },
  "(resource) realtime > (model) conversation_created_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationCreated/properties/event_id",
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
  "(resource) realtime > (model) conversation_created_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationCreated/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `conversation.created`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventConversationCreated/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "conversation.created"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) conversation_created_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) conversation_created_event > (schema) > (property) conversation > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationCreated/properties/conversation/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the conversation.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_created_event > (schema) > (property) conversation > (property) object": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationCreated/properties/conversation/properties/object",
    "deprecated": false,
    "key": "object",
    "docstring": "The object type, must be `realtime.conversation`.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_created_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "conversation.created"
    }
  }
}
```
