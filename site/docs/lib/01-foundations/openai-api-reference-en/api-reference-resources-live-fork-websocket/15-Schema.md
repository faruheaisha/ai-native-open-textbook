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
pageSha256: "3a1495544bcbcc648137923e657831bbedb05f5ef315bf7cdac4db2f5cdb6274"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveCommentaryAppendParam`

```json
{
  "(resource) live > (model) commentary_append_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveCommentaryAppendParam",
    "docstring": "Provide context the Live model can communicate to the user, optionally for an existing client delegation.",
    "ident": "CommentaryAppendEvent",
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
      "(resource) live > (model) commentary_append_event > (schema) > (property) content",
      "(resource) live > (model) commentary_append_event > (schema) > (property) delegation_id",
      "(resource) live > (model) commentary_append_event > (schema) > (property) type",
      "(resource) live > (model) commentary_append_event > (schema) > (property) event_id"
    ]
  },
  "(resource) live > (model) commentary_append_event > (schema) > (property) content": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveCommentaryAppendParam/properties/content",
    "deprecated": false,
    "key": "content",
    "docstring": "Speakable context for the Live model, limited to 500 tokens. Use this for a result the model should communicate; use session.thinking.append for silent context.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) commentary_append_event > (schema) > (property) delegation_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveCommentaryAppendParam/properties/delegation_id",
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
  "(resource) live > (model) commentary_append_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveCommentaryAppendParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The Live client event type. Always `session.commentary.append`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveCommentaryAppendParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.commentary.append"
        }
      ]
    },
    "default": "session.commentary.append",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) commentary_append_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) commentary_append_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveCommentaryAppendParam/properties/event_id",
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
  "(resource) live > (model) commentary_append_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.commentary.append"
    }
  }
}
```
