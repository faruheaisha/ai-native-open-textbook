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
pageSha256: "24a749afb9bd4bf2de61094e4d4bc6a536ee8bfc9f5bbae16faef563597b7357"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveThinkingAppendParam`

```json
{
  "(resource) live > (model) thinking_append_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveThinkingAppendParam",
    "docstring": "Provide silent reasoning or progress context to the Live model, optionally for an existing client delegation.",
    "ident": "ThinkingAppendEvent",
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
      "(resource) live > (model) thinking_append_event > (schema) > (property) content",
      "(resource) live > (model) thinking_append_event > (schema) > (property) delegation_id",
      "(resource) live > (model) thinking_append_event > (schema) > (property) type",
      "(resource) live > (model) thinking_append_event > (schema) > (property) event_id"
    ]
  },
  "(resource) live > (model) thinking_append_event > (schema) > (property) content": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveThinkingAppendParam/properties/content",
    "deprecated": false,
    "key": "content",
    "docstring": "Silent reasoning or progress context, limited to 500 tokens. It does not directly request speech, but can influence later speech and is not a secrecy boundary.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) thinking_append_event > (schema) > (property) delegation_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveThinkingAppendParam/properties/delegation_id",
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
  "(resource) live > (model) thinking_append_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveThinkingAppendParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The Live client event type. Always `session.thinking.append`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveThinkingAppendParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.thinking.append"
        }
      ]
    },
    "default": "session.thinking.append",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) thinking_append_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) thinking_append_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveThinkingAppendParam/properties/event_id",
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
  "(resource) live > (model) thinking_append_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.thinking.append"
    }
  }
}
```
