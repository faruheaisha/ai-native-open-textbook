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
pageSha256: "0525e7a83b82912319f11f38075c2b77f9c2bf9372559d5d6acbe76228b2ec2e"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventInputAudioBufferDtmfEventReceived`

```json
{
  "(resource) realtime > (model) input_audio_buffer_dtmf_event_received_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferDtmfEventReceived",
    "docstring": "**SIP Only:** Returned when an DTMF event is received. A DTMF event is a message that\nrepresents a telephone keypad press (0–9, *, #, A–D). The `event` property\nis the keypad that the user press. The `received_at` is the UTC Unix Timestamp\nthat the server received the event.\n",
    "ident": "InputAudioBufferDtmfEventReceivedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "event"
        },
        {
          "ident": "received_at"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) input_audio_buffer_dtmf_event_received_event > (schema) > (property) event",
      "(resource) realtime > (model) input_audio_buffer_dtmf_event_received_event > (schema) > (property) received_at",
      "(resource) realtime > (model) input_audio_buffer_dtmf_event_received_event > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) input_audio_buffer_dtmf_event_received_event > (schema) > (property) event": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferDtmfEventReceived/properties/event",
    "deprecated": false,
    "key": "event",
    "docstring": "The telephone keypad that was pressed by the user.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) input_audio_buffer_dtmf_event_received_event > (schema) > (property) received_at": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferDtmfEventReceived/properties/received_at",
    "deprecated": false,
    "key": "received_at",
    "docstring": "UTC Unix Timestamp when DTMF Event was received by server.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) input_audio_buffer_dtmf_event_received_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferDtmfEventReceived/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `input_audio_buffer.dtmf_event_received`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventInputAudioBufferDtmfEventReceived/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_audio_buffer.dtmf_event_received"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) input_audio_buffer_dtmf_event_received_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) input_audio_buffer_dtmf_event_received_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_audio_buffer.dtmf_event_received"
    }
  }
}
```
