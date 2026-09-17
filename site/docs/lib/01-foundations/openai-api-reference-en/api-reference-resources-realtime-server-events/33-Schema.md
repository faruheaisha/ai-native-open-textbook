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
pageSha256: "6f9173ba84675a9fa77f7aecadc5b22964cc336680dbbc214303b08fe5061989"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventInputAudioBufferSpeechStopped`

```json
{
  "(resource) realtime > (model) input_audio_buffer_speech_stopped_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferSpeechStopped",
    "docstring": "Returned in `server_vad` mode when the server detects the end of speech in \nthe audio buffer. The server will also send an `conversation.item.created` \nevent with the user message item that is created from the audio buffer.\n",
    "ident": "InputAudioBufferSpeechStoppedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "audio_end_ms"
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
      "(resource) realtime > (model) input_audio_buffer_speech_stopped_event > (schema) > (property) audio_end_ms",
      "(resource) realtime > (model) input_audio_buffer_speech_stopped_event > (schema) > (property) event_id",
      "(resource) realtime > (model) input_audio_buffer_speech_stopped_event > (schema) > (property) item_id",
      "(resource) realtime > (model) input_audio_buffer_speech_stopped_event > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) input_audio_buffer_speech_stopped_event > (schema) > (property) audio_end_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferSpeechStopped/properties/audio_end_ms",
    "deprecated": false,
    "key": "audio_end_ms",
    "docstring": "Milliseconds since the session started when speech stopped. This will \ncorrespond to the end of audio sent to the model, and thus includes the \n`min_silence_duration_ms` configured in the Session.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) input_audio_buffer_speech_stopped_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferSpeechStopped/properties/event_id",
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
  "(resource) realtime > (model) input_audio_buffer_speech_stopped_event > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferSpeechStopped/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the user message item that will be created.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) input_audio_buffer_speech_stopped_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferSpeechStopped/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `input_audio_buffer.speech_stopped`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferSpeechStopped/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_audio_buffer.speech_stopped"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) input_audio_buffer_speech_stopped_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) input_audio_buffer_speech_stopped_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_audio_buffer.speech_stopped"
    }
  }
}
```
