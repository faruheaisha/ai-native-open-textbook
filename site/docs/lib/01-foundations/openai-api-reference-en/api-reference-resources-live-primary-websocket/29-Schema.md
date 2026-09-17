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
sourceRel: "api/reference/resources/live/primary-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/primary-websocket.md"
sourceSha256: "4558a25169681bbcab3ba8bc8e5bc27bbf2495d07378248f8dc8ef05d4b5ca8b"
pageSha256: "16d9b7f90352d909d92f68a5f7632346cc2f0bac6cff17e1ca1a692add5ba3c7"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveInputAudioUnmuted`

```json
{
  "(resource) live > (model) input_audio_unmuted_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInputAudioUnmuted",
    "docstring": "Returned when a session.input_audio.unmute command is accepted. Input audio is sent to the model again.",
    "ident": "InputAudioUnmutedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "event_id"
        },
        {
          "ident": "type"
        },
        {
          "ident": "client_event_id"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) input_audio_unmuted_event > (schema) > (property) event_id",
      "(resource) live > (model) input_audio_unmuted_event > (schema) > (property) type",
      "(resource) live > (model) input_audio_unmuted_event > (schema) > (property) client_event_id"
    ]
  },
  "(resource) live > (model) input_audio_unmuted_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputAudioUnmuted/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "The unique ID of the Live server event.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) input_audio_unmuted_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputAudioUnmuted/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, always `session.input_audio.unmuted`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInputAudioUnmuted/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.input_audio.unmuted"
        }
      ]
    },
    "default": "session.input_audio.unmuted",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) input_audio_unmuted_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) input_audio_unmuted_event > (schema) > (property) client_event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputAudioUnmuted/properties/client_event_id",
    "deprecated": false,
    "key": "client_event_id",
    "docstring": "The event_id of the client command associated with this server event, when supplied.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) input_audio_unmuted_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.input_audio.unmuted"
    }
  }
}
```
