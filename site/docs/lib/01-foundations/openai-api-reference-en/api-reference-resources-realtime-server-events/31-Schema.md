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
pageSha256: "e909aadda7bc0f38b892186e775df3f818de9a3eb628023d946e51f40d866c55"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventInputAudioBufferSpeechStarted`

```json
{
  "(resource) realtime > (model) input_audio_buffer_speech_started_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferSpeechStarted",
    "docstring": "Sent by the server when in `server_vad` mode to indicate that speech has been \ndetected in the audio buffer. This can happen any time audio is added to the \nbuffer (unless speech is already detected). The client may want to use this \nevent to interrupt audio playback or provide visual feedback to the user. \n\nThe client should expect to receive a `input_audio_buffer.speech_stopped` event \nwhen speech stops. The `item_id` property is the ID of the user message item \nthat will be created when speech stops and will also be included in the \n`input_audio_buffer.speech_stopped` event (unless the client manually commits \nthe audio buffer during VAD activation).\n",
    "ident": "InputAudioBufferSpeechStartedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "audio_start_ms"
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
      "(resource) realtime > (model) input_audio_buffer_speech_started_event > (schema) > (property) audio_start_ms",
      "(resource) realtime > (model) input_audio_buffer_speech_started_event > (schema) > (property) event_id",
      "(resource) realtime > (model) input_audio_buffer_speech_started_event > (schema) > (property) item_id",
      "(resource) realtime > (model) input_audio_buffer_speech_started_event > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) input_audio_buffer_speech_started_event > (schema) > (property) audio_start_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferSpeechStarted/properties/audio_start_ms",
    "deprecated": false,
    "key": "audio_start_ms",
    "docstring": "Milliseconds from the start of all audio written to the buffer during the \nsession when speech was first detected. This will correspond to the \nbeginning of audio sent to the model, and thus includes the \n`prefix_padding_ms` configured in the Session.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) input_audio_buffer_speech_started_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferSpeechStarted/properties/event_id",
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
  "(resource) realtime > (model) input_audio_buffer_speech_started_event > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferSpeechStarted/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the user message item that will be created when speech stops.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) input_audio_buffer_speech_started_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferSpeechStarted/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `input_audio_buffer.speech_started`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferSpeechStarted/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_audio_buffer.speech_started"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) input_audio_buffer_speech_started_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) input_audio_buffer_speech_started_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_audio_buffer.speech_started"
    }
  }
}
```
