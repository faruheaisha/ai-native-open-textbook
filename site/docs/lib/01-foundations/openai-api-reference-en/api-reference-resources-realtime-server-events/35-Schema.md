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
pageSha256: "91d477fc9a9a342e1457ec3d10607a97a1c4c475dee749fe818a724ef0a1ae87"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventInputAudioBufferTimeoutTriggered`

```json
{
  "(resource) realtime > (model) input_audio_buffer_timeout_triggered > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferTimeoutTriggered",
    "docstring": "Returned when the Server VAD timeout is triggered for the input audio buffer. This is configured\nwith `idle_timeout_ms` in the `turn_detection` settings of the session, and it indicates that\nthere hasn't been any speech detected for the configured duration.\n\nThe `audio_start_ms` and `audio_end_ms` fields indicate the segment of audio after the last\nmodel response up to the triggering time, as an offset from the beginning of audio written\nto the input audio buffer. This means it demarcates the segment of audio that was silent and\nthe difference between the start and end values will roughly match the configured timeout.\n\nThe empty audio will be committed to the conversation as an `input_audio` item (there will be a\n`input_audio_buffer.committed` event) and a model response will be generated. There may be speech\nthat didn't trigger VAD but is still detected by the model, so the model may respond with\nsomething relevant to the conversation or a prompt to continue speaking.\n",
    "ident": "InputAudioBufferTimeoutTriggered",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "audio_end_ms"
        },
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
      "(resource) realtime > (model) input_audio_buffer_timeout_triggered > (schema) > (property) audio_end_ms",
      "(resource) realtime > (model) input_audio_buffer_timeout_triggered > (schema) > (property) audio_start_ms",
      "(resource) realtime > (model) input_audio_buffer_timeout_triggered > (schema) > (property) event_id",
      "(resource) realtime > (model) input_audio_buffer_timeout_triggered > (schema) > (property) item_id",
      "(resource) realtime > (model) input_audio_buffer_timeout_triggered > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) input_audio_buffer_timeout_triggered > (schema) > (property) audio_end_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferTimeoutTriggered/properties/audio_end_ms",
    "deprecated": false,
    "key": "audio_end_ms",
    "docstring": "Millisecond offset of audio written to the input audio buffer at the time the timeout was triggered.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) input_audio_buffer_timeout_triggered > (schema) > (property) audio_start_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferTimeoutTriggered/properties/audio_start_ms",
    "deprecated": false,
    "key": "audio_start_ms",
    "docstring": "Millisecond offset of audio written to the input audio buffer that was after the playback time of the last model response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) input_audio_buffer_timeout_triggered > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferTimeoutTriggered/properties/event_id",
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
  "(resource) realtime > (model) input_audio_buffer_timeout_triggered > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferTimeoutTriggered/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the item associated with this segment.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) input_audio_buffer_timeout_triggered > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferTimeoutTriggered/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `input_audio_buffer.timeout_triggered`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferTimeoutTriggered/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_audio_buffer.timeout_triggered"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) input_audio_buffer_timeout_triggered > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) input_audio_buffer_timeout_triggered > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_audio_buffer.timeout_triggered"
    }
  }
}
```
