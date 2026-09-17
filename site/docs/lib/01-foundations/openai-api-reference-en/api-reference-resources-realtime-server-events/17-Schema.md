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
pageSha256: "3386f5d6438237383bc6bcdb33bb73c1a4c73cf2ab766588d6d777b493af31e4"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventConversationItemInputAudioTranscriptionSegment`

```json
{
  "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionSegment",
    "docstring": "Returned when an input audio transcription segment is identified for an item.",
    "ident": "ConversationItemInputAudioTranscriptionSegment",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "content_index"
        },
        {
          "ident": "end"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "item_id"
        },
        {
          "ident": "speaker"
        },
        {
          "ident": "start"
        },
        {
          "ident": "text"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) id",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) content_index",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) end",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) event_id",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) item_id",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) speaker",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) start",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) text",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionSegment/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The segment identifier.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) content_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionSegment/properties/content_index",
    "deprecated": false,
    "key": "content_index",
    "docstring": "The index of the input audio content part within the item.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) end": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionSegment/properties/end",
    "deprecated": false,
    "key": "end",
    "docstring": "End time of the segment in seconds.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "double"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "number",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionSegment/properties/event_id",
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
  "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionSegment/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the item containing the input audio content.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) speaker": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionSegment/properties/speaker",
    "deprecated": false,
    "key": "speaker",
    "docstring": "The detected speaker label for this segment.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) start": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionSegment/properties/start",
    "deprecated": false,
    "key": "start",
    "docstring": "Start time of the segment in seconds.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "double"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "number",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionSegment/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "The text for this segment.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionSegment/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `conversation.item.input_audio_transcription.segment`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionSegment/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "conversation.item.input_audio_transcription.segment"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_segment > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "conversation.item.input_audio_transcription.segment"
    }
  }
}
```
