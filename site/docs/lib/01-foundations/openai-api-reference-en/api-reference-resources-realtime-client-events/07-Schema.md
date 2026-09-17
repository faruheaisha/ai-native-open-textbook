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
pageSha256: "0370716c93c7d5e59fe5c8058af40cb3b14f3eb45db2340f3e0d3b363f9f7f11"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeClientEventInputAudioBufferClear`

```json
{
  "(resource) realtime > (model) input_audio_buffer_clear_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeClientEventInputAudioBufferClear",
    "docstring": "Send this event to clear the audio bytes in the buffer. The server will \nrespond with an `input_audio_buffer.cleared` event.\n",
    "ident": "InputAudioBufferClearEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
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
      "(resource) realtime > (model) input_audio_buffer_clear_event > (schema) > (property) type",
      "(resource) realtime > (model) input_audio_buffer_clear_event > (schema) > (property) event_id"
    ]
  },
  "(resource) realtime > (model) input_audio_buffer_clear_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventInputAudioBufferClear/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `input_audio_buffer.clear`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeClientEventInputAudioBufferClear/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_audio_buffer.clear"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) input_audio_buffer_clear_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) input_audio_buffer_clear_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventInputAudioBufferClear/properties/event_id",
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
  "(resource) realtime > (model) input_audio_buffer_clear_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_audio_buffer.clear"
    }
  }
}
```
