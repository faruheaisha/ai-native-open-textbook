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
pageSha256: "6340782368b6a60515280b6052614f9601463d7fb4fd686e63326f4590591b06"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventConversationItemInputAudioTranscriptionFailed`

```json
{
  "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionFailed",
    "docstring": "Returned when input audio transcription is configured, and a transcription \nrequest for a user message failed. These events are separate from other \n`error` events so that the client can identify the related Item.\n",
    "ident": "ConversationItemInputAudioTranscriptionFailedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "content_index"
        },
        {
          "ident": "error"
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
      "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) content_index",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) error",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) event_id",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) item_id",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) content_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionFailed/properties/content_index",
    "deprecated": false,
    "key": "content_index",
    "docstring": "The index of the content part containing the audio.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) error": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionFailed/properties/error",
    "deprecated": false,
    "key": "error",
    "docstring": "Details of the transcription error.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "code"
        },
        {
          "ident": "message"
        },
        {
          "ident": "param"
        },
        {
          "ident": "type"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) error > (property) code",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) error > (property) message",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) error > (property) param",
      "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) error > (property) type"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionFailed/properties/event_id",
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
  "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionFailed/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the user message item.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionFailed/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be\n`conversation.item.input_audio_transcription.failed`.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionFailed/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "conversation.item.input_audio_transcription.failed"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) error > (property) code": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionFailed/properties/error/properties/code",
    "deprecated": false,
    "key": "code",
    "docstring": "Error code, if any.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) error > (property) message": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionFailed/properties/error/properties/message",
    "deprecated": false,
    "key": "message",
    "docstring": "A human-readable error message.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) error > (property) param": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionFailed/properties/error/properties/param",
    "deprecated": false,
    "key": "param",
    "docstring": "Parameter related to the error, if any.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) error > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventConversationItemInputAudioTranscriptionFailed/properties/error/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of error.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_input_audio_transcription_failed_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "conversation.item.input_audio_transcription.failed"
    }
  }
}
```
