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
pageSha256: "cda99a309e0b4c0f912d2e4f181cf619f729afcbea08cb7ed94405d5bb23e553"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeClientEventOutputAudioBufferClear`

```json
{
  "(resource) realtime > (model) output_audio_buffer_clear_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeClientEventOutputAudioBufferClear",
    "docstring": "**WebRTC/SIP Only:** Emit to cut off the current audio response. This will trigger the server to\nstop generating audio and emit a `output_audio_buffer.cleared` event. This\nevent should be preceded by a `response.cancel` client event to stop the\ngeneration of the current response.\n[Learn more](/api/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).\n",
    "ident": "OutputAudioBufferClearEvent",
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
      "(resource) realtime > (model) output_audio_buffer_clear_event > (schema) > (property) type",
      "(resource) realtime > (model) output_audio_buffer_clear_event > (schema) > (property) event_id"
    ]
  },
  "(resource) realtime > (model) output_audio_buffer_clear_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventOutputAudioBufferClear/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `output_audio_buffer.clear`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeClientEventOutputAudioBufferClear/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "output_audio_buffer.clear"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) output_audio_buffer_clear_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) output_audio_buffer_clear_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventOutputAudioBufferClear/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "The unique ID of the client event used for error handling.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) output_audio_buffer_clear_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "output_audio_buffer.clear"
    }
  }
}
```
