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
pageSha256: "429b9f303b873449c4c20e70825468addea2a444af9b21ab57a8fb40504f4c5a"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventResponseContentPartAdded`

```json
{
  "(resource) realtime > (model) response_content_part_added_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded",
    "docstring": "Returned when a new content part is added to an assistant message item during\nresponse generation.\n",
    "ident": "ResponseContentPartAddedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "content_index"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "item_id"
        },
        {
          "ident": "output_index"
        },
        {
          "ident": "part"
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
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) content_index",
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) event_id",
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) item_id",
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) output_index",
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part",
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) response_id",
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) content_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded/properties/content_index",
    "deprecated": false,
    "key": "content_index",
    "docstring": "The index of the content part in the item's content array.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded/properties/event_id",
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
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the item to which the content part was added.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) output_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded/properties/output_index",
    "deprecated": false,
    "key": "output_index",
    "docstring": "The index of the output item in the response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded/properties/part",
    "deprecated": false,
    "key": "part",
    "docstring": "The content part that was added.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "audio"
        },
        {
          "ident": "text"
        },
        {
          "ident": "transcript"
        },
        {
          "ident": "type"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part > (property) audio",
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part > (property) text",
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part > (property) transcript",
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part > (property) type"
    ]
  },
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) response_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded/properties/response_id",
    "deprecated": false,
    "key": "response_id",
    "docstring": "The ID of the response.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `response.content_part.added`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.content_part.added"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part > (property) audio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded/properties/part/properties/audio",
    "deprecated": false,
    "key": "audio",
    "docstring": "Base64-encoded audio data (if type is \"audio\").",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded/properties/part/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "The text content (if type is \"text\").",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part > (property) transcript": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded/properties/part/properties/transcript",
    "deprecated": false,
    "key": "transcript",
    "docstring": "The transcript of the audio (if type is \"audio\").",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded/properties/part/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The content type (\"text\", \"audio\").",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventResponseContentPartAdded/properties/part/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "audio"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "text"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part > (property) type > (member) 0",
      "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part > (property) type > (member) 1"
    ]
  },
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.content_part.added"
    }
  },
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "audio"
    }
  },
  "(resource) realtime > (model) response_content_part_added_event > (schema) > (property) part > (property) type > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "text"
    }
  }
}
```
