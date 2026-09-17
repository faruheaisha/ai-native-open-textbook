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
pageSha256: "dc0b0c66ad1d448f047b00a2428b5bdbadc013281deb031c1b7655cff8890ba4"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveInputAudioMuteParam`

```json
{
  "(resource) live > (model) input_audio_mute_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInputAudioMuteParam",
    "docstring": "Mute audio input to the Live model without closing the session. The server acknowledges with `session.input_audio.muted`.",
    "ident": "InputAudioMuteEvent",
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
      "(resource) live > (model) input_audio_mute_event > (schema) > (property) type",
      "(resource) live > (model) input_audio_mute_event > (schema) > (property) event_id"
    ]
  },
  "(resource) live > (model) input_audio_mute_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputAudioMuteParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The Live client event type. Always `session.input_audio.mute`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInputAudioMuteParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.input_audio.mute"
        }
      ]
    },
    "default": "session.input_audio.mute",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) input_audio_mute_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) input_audio_mute_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputAudioMuteParam/properties/event_id",
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
  "(resource) live > (model) input_audio_mute_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.input_audio.mute"
    }
  }
}
```
