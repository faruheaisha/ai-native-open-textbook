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
pageSha256: "33ea3f7554b1a027c133aecc7386ebca6f3eec4a28283bc5768c81df9f3cef75"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeClientEventInputAudioBufferAppend`

```json
{
  "(resource) realtime > (model) input_audio_buffer_append_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeClientEventInputAudioBufferAppend",
    "docstring": "Send this event to append audio bytes to the input audio buffer. The audio \nbuffer is temporary storage you can write to and later commit. A \"commit\" will create a new\nuser message item in the conversation history from the buffer content and clear the buffer.\nInput audio transcription (if enabled) will be generated when the buffer is committed.\n\nIf VAD is enabled the audio buffer is used to detect speech and the server will decide \nwhen to commit. When Server VAD is disabled, you must commit the audio buffer\nmanually. Input audio noise reduction operates on writes to the audio buffer.\n\nThe client may choose how much audio to place in each event up to a maximum \nof 15 MiB, for example streaming smaller chunks from the client may allow the \nVAD to be more responsive. Unlike most other client events, the server will \nnot send a confirmation response to this event.\n",
    "ident": "InputAudioBufferAppendEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "audio"
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
      "(resource) realtime > (model) input_audio_buffer_append_event > (schema) > (property) audio",
      "(resource) realtime > (model) input_audio_buffer_append_event > (schema) > (property) type",
      "(resource) realtime > (model) input_audio_buffer_append_event > (schema) > (property) event_id"
    ]
  },
  "(resource) realtime > (model) input_audio_buffer_append_event > (schema) > (property) audio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventInputAudioBufferAppend/properties/audio",
    "deprecated": false,
    "key": "audio",
    "docstring": "Base64-encoded audio bytes. This must be in the format specified by the \n`input_audio_format` field in the session configuration.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) input_audio_buffer_append_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventInputAudioBufferAppend/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `input_audio_buffer.append`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeClientEventInputAudioBufferAppend/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_audio_buffer.append"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) input_audio_buffer_append_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) input_audio_buffer_append_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventInputAudioBufferAppend/properties/event_id",
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
  "(resource) realtime > (model) input_audio_buffer_append_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_audio_buffer.append"
    }
  }
}
```
