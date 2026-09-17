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
sourceRel: "api/reference/resources/live/sideband-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/sideband-websocket.md"
sourceSha256: "3931e3ed281fce5bf05f32a67301bdd3963d7f23e08d45dc8483e7bc1c4302aa"
pageSha256: "d3bd41af5c3b9d1c566843a48e411ac390b657e5f207befb428e5fa3effafe8b"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveInstructionsAppended`

```json
{
  "(resource) live > (model) instructions_appended_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInstructionsAppended",
    "docstring": "Returned when a session.instructions.append command is accepted into the Live session timeline. Acknowledges the appended instructions without guaranteeing that the model has acted on them.",
    "ident": "InstructionsAppendedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
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
      "(resource) live > (model) instructions_appended_event > (schema) > (property) end_ms",
      "(resource) live > (model) instructions_appended_event > (schema) > (property) event_id",
      "(resource) live > (model) instructions_appended_event > (schema) > (property) start_ms",
      "(resource) live > (model) instructions_appended_event > (schema) > (property) type",
      "(resource) live > (model) instructions_appended_event > (schema) > (property) client_event_id"
    ]
  },
  "(resource) live > (model) instructions_appended_event > (schema) > (property) end_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInstructionsAppended/properties/end_ms",
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
  "(resource) live > (model) instructions_appended_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInstructionsAppended/properties/event_id",
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
  "(resource) live > (model) instructions_appended_event > (schema) > (property) start_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInstructionsAppended/properties/start_ms",
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
  "(resource) live > (model) instructions_appended_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInstructionsAppended/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, always `session.instructions.appended`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInstructionsAppended/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.instructions.appended"
        }
      ]
    },
    "default": "session.instructions.appended",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) instructions_appended_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) instructions_appended_event > (schema) > (property) client_event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInstructionsAppended/properties/client_event_id",
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
  "(resource) live > (model) instructions_appended_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.instructions.appended"
    }
  }
}
```
