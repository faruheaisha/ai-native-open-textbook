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
pageSha256: "fda9407cf3a07a8c839b1729f4220a3a4df45f38a1f1b720dda150467a251e83"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventOutputAudioBufferStopped`

```json
{
  "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 32": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEvent/anyOf/32",
    "docstring": "**WebRTC/SIP Only:** Emitted when the output audio buffer has been completely drained on the server,\nand no more audio is forthcoming. This event is emitted after the full response\ndata has been sent to the client (`response.done`).\n[Learn more](/api/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).\n",
    "ident": "OutputAudioBufferStopped",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "event_id"
        },
        {
          "ident": "response_id"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 32 > (property) event_id",
      "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 32 > (property) response_id",
      "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 32 > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 32 > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventOutputAudioBufferStopped/properties/event_id",
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
  "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 32 > (property) response_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventOutputAudioBufferStopped/properties/response_id",
    "deprecated": false,
    "key": "response_id",
    "docstring": "The unique ID of the response that produced the audio.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 32 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventOutputAudioBufferStopped/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `output_audio_buffer.stopped`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventOutputAudioBufferStopped/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "output_audio_buffer.stopped"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 32 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 32 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "output_audio_buffer.stopped"
    }
  }
}
```
