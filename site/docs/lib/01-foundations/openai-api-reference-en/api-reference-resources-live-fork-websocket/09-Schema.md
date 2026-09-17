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
pageSha256: "428f77cba2e7c4f2fb97e2120d10eeaddf14a2f68b27015ab0f73f2301f79f98"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveInputAudioUnmuteParam`

```json
{
  "(resource) live > (model) input_audio_unmute_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInputAudioUnmuteParam",
    "docstring": "Resume audio input to a Live model after muting it. The server acknowledges with `session.input_audio.unmuted`.",
    "ident": "InputAudioUnmuteEvent",
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
      "(resource) live > (model) input_audio_unmute_event > (schema) > (property) type",
      "(resource) live > (model) input_audio_unmute_event > (schema) > (property) event_id"
    ]
  },
  "(resource) live > (model) input_audio_unmute_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputAudioUnmuteParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The Live client event type. Always `session.input_audio.unmute`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInputAudioUnmuteParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.input_audio.unmute"
        }
      ]
    },
    "default": "session.input_audio.unmute",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) input_audio_unmute_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) input_audio_unmute_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputAudioUnmuteParam/properties/event_id",
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
  "(resource) live > (model) input_audio_unmute_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.input_audio.unmute"
    }
  }
}
```
