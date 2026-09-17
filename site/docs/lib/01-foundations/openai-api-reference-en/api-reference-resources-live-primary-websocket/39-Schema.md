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
pageSha256: "1b25c554f4f00a86d3ee4fa38b518be717398800a0383513e10cdfd2fd1a91b6"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveInputTranscriptDelta`

```json
{
  "(resource) live > (model) input_transcript_delta_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInputTranscriptDelta",
    "docstring": "A transcript fragment for user input audio in the Live session. Accumulate fragments in delivery order; these events do not define complete turns or include a transcript-done event.",
    "ident": "InputTranscriptDeltaEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "delta"
        },
        {
          "ident": "end_ms"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "start_ms"
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
      "(resource) live > (model) input_transcript_delta_event > (schema) > (property) delta",
      "(resource) live > (model) input_transcript_delta_event > (schema) > (property) end_ms",
      "(resource) live > (model) input_transcript_delta_event > (schema) > (property) event_id",
      "(resource) live > (model) input_transcript_delta_event > (schema) > (property) start_ms",
      "(resource) live > (model) input_transcript_delta_event > (schema) > (property) type",
      "(resource) live > (model) input_transcript_delta_event > (schema) > (property) client_event_id"
    ]
  },
  "(resource) live > (model) input_transcript_delta_event > (schema) > (property) delta": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputTranscriptDelta/properties/delta",
    "deprecated": false,
    "key": "delta",
    "docstring": "The transcript text fragment for the audio in this time range. Append fragments in delivery order to build the transcript.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) input_transcript_delta_event > (schema) > (property) end_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputTranscriptDelta/properties/end_ms",
    "deprecated": false,
    "key": "end_ms",
    "docstring": "The end of this event on the Live session timeline, in milliseconds from the beginning of the session. For appended context, this can equal start_ms.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) live > (model) input_transcript_delta_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputTranscriptDelta/properties/event_id",
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
  "(resource) live > (model) input_transcript_delta_event > (schema) > (property) start_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputTranscriptDelta/properties/start_ms",
    "deprecated": false,
    "key": "start_ms",
    "docstring": "The start of this event on the Live session timeline, in milliseconds from the beginning of the session.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) live > (model) input_transcript_delta_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputTranscriptDelta/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, always `session.input_transcript.delta`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInputTranscriptDelta/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.input_transcript.delta"
        }
      ]
    },
    "default": "session.input_transcript.delta",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) input_transcript_delta_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) input_transcript_delta_event > (schema) > (property) client_event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInputTranscriptDelta/properties/client_event_id",
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
  "(resource) live > (model) input_transcript_delta_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.input_transcript.delta"
    }
  }
}
```
