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
pageSha256: "884b00e5f2d4db88cbb53322cd3d7dbcf37914994d1d74960d2f2d3bd56d03af"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveInstructionsAppendParam`

```json
{
  "(resource) live > (model) instructions_append_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInstructionsAppendParam",
    "docstring": "Append instructions to the Live conversation while it is running, optionally associating them with an existing client delegation.",
    "ident": "InstructionsAppendEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "content"
        },
        {
          "ident": "delegation_id"
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
      "(resource) live > (model) instructions_append_event > (schema) > (property) content",
      "(resource) live > (model) instructions_append_event > (schema) > (property) delegation_id",
      "(resource) live > (model) instructions_append_event > (schema) > (property) type",
      "(resource) live > (model) instructions_append_event > (schema) > (property) event_id"
    ]
  },
  "(resource) live > (model) instructions_append_event > (schema) > (property) content": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInstructionsAppendParam/properties/content",
    "deprecated": false,
    "key": "content",
    "docstring": "Instruction text to append, limited to 500 tokens. This is a plain string, not an array of content parts.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) instructions_append_event > (schema) > (property) delegation_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInstructionsAppendParam/properties/delegation_id",
    "deprecated": false,
    "key": "delegation_id",
    "docstring": "Required, nullable. Set null for general session context, or use the ID from session.delegation.created for an existing client delegation. Non-null IDs are not accepted with Responses delegation.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 1
    },
    "optional": false,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) instructions_append_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInstructionsAppendParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The Live client event type. Always `session.instructions.append`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInstructionsAppendParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.instructions.append"
        }
      ]
    },
    "default": "session.instructions.append",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) instructions_append_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) instructions_append_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInstructionsAppendParam/properties/event_id",
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
  "(resource) live > (model) instructions_append_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.instructions.append"
    }
  }
}
```
