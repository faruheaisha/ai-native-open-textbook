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
pageSha256: "884d71f4ce54643de6189ffb30a16c25837c6da529351f2a60076ef2e169dbf6"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventConversationItemTruncated`

```json
{
  "(resource) realtime > (model) conversation_item_truncated_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemTruncated",
    "docstring": "Returned when an earlier assistant audio message item is truncated by the \nclient with a `conversation.item.truncate` event. This event is used to \nsynchronize the server's understanding of the audio with the client's playback.\n\nThis action will truncate the audio and remove the server-side text transcript \nto ensure there is no text in the context that hasn't been heard by the user.\n",
    "ident": "ConversationItemTruncatedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "audio_end_ms"
        },
        {
          "ident": "content_index"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "item_id"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) conversation_item_truncated_event > (schema) > (property) audio_end_ms",
      "(resource) realtime > (model) conversation_item_truncated_event > (schema) > (property) content_index",
      "(resource) realtime > (model) conversation_item_truncated_event > (schema) > (property) event_id",
      "(resource) realtime > (model) conversation_item_truncated_event > (schema) > (property) item_id",
      "(resource) realtime > (model) conversation_item_truncated_event > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) conversation_item_truncated_event > (schema) > (property) audio_end_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemTruncated/properties/audio_end_ms",
    "deprecated": false,
    "key": "audio_end_ms",
    "docstring": "The duration up to which the audio was truncated, in milliseconds.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_truncated_event > (schema) > (property) content_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemTruncated/properties/content_index",
    "deprecated": false,
    "key": "content_index",
    "docstring": "The index of the content part that was truncated.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_truncated_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemTruncated/properties/event_id",
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
  "(resource) realtime > (model) conversation_item_truncated_event > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemTruncated/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the assistant message item that was truncated.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_truncated_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemTruncated/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `conversation.item.truncated`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventConversationItemTruncated/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "conversation.item.truncated"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) conversation_item_truncated_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) conversation_item_truncated_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "conversation.item.truncated"
    }
  }
}
```
