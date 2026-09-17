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
sourceRel: "api/reference/resources/realtime/client-events.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/client-events.md"
sourceSha256: "e5a80993ba40bb1f036ff2b5a28b932938a9edd0419e361d3019481770cb5e4a"
pageSha256: "932b8e1809d0f9ced775accb04c4abf6594b4d8f588661b7bf03dff88bd1ba89"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeClientEventConversationItemTruncate`

```json
{
  "(resource) realtime > (model) conversation_item_truncate_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeClientEventConversationItemTruncate",
    "docstring": "Send this event to truncate a previous assistant message’s audio. The server \nwill produce audio faster than realtime, so this event is useful when the user \ninterrupts to truncate audio that has already been sent to the client but not \nyet played. This will synchronize the server's understanding of the audio with \nthe client's playback.\n\nTruncating audio will delete the server-side text transcript to ensure there \nis not text in the context that hasn't been heard by the user.\n\nIf successful, the server will respond with a `conversation.item.truncated` \nevent. \n",
    "ident": "ConversationItemTruncateEvent",
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
          "ident": "item_id"
        },
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
      "(resource) realtime > (model) conversation_item_truncate_event > (schema) > (property) audio_end_ms",
      "(resource) realtime > (model) conversation_item_truncate_event > (schema) > (property) content_index",
      "(resource) realtime > (model) conversation_item_truncate_event > (schema) > (property) item_id",
      "(resource) realtime > (model) conversation_item_truncate_event > (schema) > (property) type",
      "(resource) realtime > (model) conversation_item_truncate_event > (schema) > (property) event_id"
    ]
  },
  "(resource) realtime > (model) conversation_item_truncate_event > (schema) > (property) audio_end_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventConversationItemTruncate/properties/audio_end_ms",
    "deprecated": false,
    "key": "audio_end_ms",
    "docstring": "Inclusive duration up to which audio is truncated, in milliseconds. If \nthe audio_end_ms is greater than the actual audio duration, the server \nwill respond with an error.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_truncate_event > (schema) > (property) content_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventConversationItemTruncate/properties/content_index",
    "deprecated": false,
    "key": "content_index",
    "docstring": "The index of the content part to truncate. Set this to `0`.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_truncate_event > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventConversationItemTruncate/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the assistant message item to truncate. Only assistant message \nitems can be truncated.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_truncate_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventConversationItemTruncate/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `conversation.item.truncate`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeClientEventConversationItemTruncate/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "conversation.item.truncate"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) conversation_item_truncate_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) conversation_item_truncate_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventConversationItemTruncate/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "Optional client-generated ID used to identify this event.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "maxLength": 512
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_truncate_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "conversation.item.truncate"
    }
  }
}
```
