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
pageSha256: "6a1d3afab269049d0aa4827f7f86ab0d39f4fb098a0b46fe1d53981f860e12e9"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveCommentaryAppended`

```json
{
  "(resource) live > (model) commentary_appended_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveCommentaryAppended",
    "docstring": "Returned when a session.commentary.append command is accepted into the Live session timeline. Acknowledges the added commentary without guaranteeing exact wording or completed audio playback.",
    "ident": "CommentaryAppendedEvent",
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
      "(resource) live > (model) commentary_appended_event > (schema) > (property) end_ms",
      "(resource) live > (model) commentary_appended_event > (schema) > (property) event_id",
      "(resource) live > (model) commentary_appended_event > (schema) > (property) start_ms",
      "(resource) live > (model) commentary_appended_event > (schema) > (property) type",
      "(resource) live > (model) commentary_appended_event > (schema) > (property) client_event_id"
    ]
  },
  "(resource) live > (model) commentary_appended_event > (schema) > (property) end_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveCommentaryAppended/properties/end_ms",
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
  "(resource) live > (model) commentary_appended_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveCommentaryAppended/properties/event_id",
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
  "(resource) live > (model) commentary_appended_event > (schema) > (property) start_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveCommentaryAppended/properties/start_ms",
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
  "(resource) live > (model) commentary_appended_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveCommentaryAppended/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, always `session.commentary.appended`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveCommentaryAppended/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.commentary.appended"
        }
      ]
    },
    "default": "session.commentary.appended",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) commentary_appended_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) commentary_appended_event > (schema) > (property) client_event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveCommentaryAppended/properties/client_event_id",
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
  "(resource) live > (model) commentary_appended_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.commentary.appended"
    }
  }
}
```
