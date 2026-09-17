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
pageSha256: "a4770c7836511cba999883162000b8a1c905f9aedf5b2a722cdb1d41614421d3"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveInputAudioAppend`

```json
{
  "(resource) live > (model) server_event > (schema) > (variant) 7": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveServerEvent-2/oneOf/7",
    "docstring": "Input audio received from the primary transport and reflected to a Live sideband connection before model-input muting.",
    "ident": "SessionInputAudioAppend",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "audio"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) server_event > (schema) > (variant) 7 > (property) audio",
      "(resource) live > (model) server_event > (schema) > (variant) 7 > (property) type"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 7 > (property) audio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputAudioAppend/properties/audio",
    "deprecated": false,
    "key": "audio",
    "docstring": "Base64-encoded raw mono PCM16LE at 24 kHz received from the primary transport, reflected to the sideband before model-input muting. This server event uses the same audio key as the client command, but is not an acknowledgment of it.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) server_event > (schema) > (variant) 7 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputAudioAppend/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, always `session.input_audio.append`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInputAudioAppend/properties/type",
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
      "(resource) live > (model) server_event > (schema) > (variant) 7 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) server_event > (schema) > (variant) 7 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.input_audio.append"
    }
  }
}
```
