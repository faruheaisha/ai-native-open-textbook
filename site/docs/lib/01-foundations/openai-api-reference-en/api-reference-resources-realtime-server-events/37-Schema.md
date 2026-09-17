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
pageSha256: "92473dcadacc1c546ce471b1e08b7ef9c31ca017cf3da24a264daf43a786d2ed"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventOutputAudioBufferStarted`

```json
{
  "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 31": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEvent/anyOf/31",
    "docstring": "**WebRTC/SIP Only:** Emitted when the server begins streaming audio to the client. This event is\nemitted after an audio content part has been added (`response.content_part.added`)\nto the response.\n[Learn more](/api/docs/guides/realtime-conversations#client-and-server-events-for-audio-in-webrtc).\n",
    "ident": "OutputAudioBufferStarted",
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
      "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 31 > (property) event_id",
      "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 31 > (property) response_id",
      "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 31 > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 31 > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventOutputAudioBufferStarted/properties/event_id",
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
  "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 31 > (property) response_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventOutputAudioBufferStarted/properties/response_id",
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
  "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 31 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventOutputAudioBufferStarted/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `output_audio_buffer.started`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventOutputAudioBufferStarted/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "output_audio_buffer.started"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 31 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_server_event > (schema) > (variant) 31 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "output_audio_buffer.started"
    }
  }
}
```
