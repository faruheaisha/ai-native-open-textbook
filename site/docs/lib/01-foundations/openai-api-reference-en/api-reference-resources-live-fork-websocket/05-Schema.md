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
sourceRel: "api/reference/resources/live/fork-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/fork-websocket.md"
sourceSha256: "9e6521e93be8aca435d9a5de6a3905a8388040ba12e0775d313c91a93fe91796"
pageSha256: "b0fa3dc9f8b641bb3218307fb06cdbc3c85cb869f5a1933c08cce1b28508dfff"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveInputAudioAppendEvent`

```json
{
  "(resource) live > (model) input_audio_append_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInputAudioAppendEvent",
    "docstring": "Send audio to a Live session over its primary WebSocket. WebRTC and SIP sessions send audio over their media transport.",
    "ident": "InputAudioAppendEvent",
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
      "(resource) live > (model) input_audio_append_event > (schema) > (property) audio",
      "(resource) live > (model) input_audio_append_event > (schema) > (property) type",
      "(resource) live > (model) input_audio_append_event > (schema) > (property) event_id"
    ]
  },
  "(resource) live > (model) input_audio_append_event > (schema) > (property) audio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputAudioAppendEvent/properties/audio",
    "deprecated": false,
    "key": "audio",
    "docstring": "Base64-encoded raw audio in the startup-selected format, without a WAV or other container header. Primary WebSocket only; media transports use their audio track. Audio appends have no acknowledgment. Reflected sideband server events reuse this event type and audio key, with no timestamps or event_id; their audio is always mono PCM16LE at 24 kHz.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 1
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) input_audio_append_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputAudioAppendEvent/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The Live client event type. Always `session.input_audio.append`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInputAudioAppendEvent/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.input_audio.append"
        }
      ]
    },
    "default": "session.input_audio.append",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) input_audio_append_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) input_audio_append_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputAudioAppendEvent/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "Optional client identifier for correlating this command with a server event's client_event_id or error.client_event_id.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "maxLength": 512
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) input_audio_append_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.input_audio.append"
    }
  }
}
```
