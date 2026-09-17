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
pageSha256: "09a3bc46a145f095737c4faa3314086fb705882370817a8f52c49809502f7e9a"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveSessionUsageUpdated`

```json
{
  "(resource) live > (model) session_usage_updated_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveSessionUsageUpdated",
    "docstring": "Reports cumulative Live audio usage and, when available, the most recent context-window usage. Delegated Responses token usage is reported separately in response.event events.",
    "ident": "SessionUsageUpdatedEvent",
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
          "ident": "usage"
        },
        {
          "ident": "client_event_id"
        },
        {
          "ident": "context_window"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_usage_updated_event > (schema) > (property) event_id",
      "(resource) live > (model) session_usage_updated_event > (schema) > (property) type",
      "(resource) live > (model) session_usage_updated_event > (schema) > (property) usage",
      "(resource) live > (model) session_usage_updated_event > (schema) > (property) client_event_id",
      "(resource) live > (model) session_usage_updated_event > (schema) > (property) context_window"
    ]
  },
  "(resource) live > (model) session_usage_updated_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionUsageUpdated/properties/event_id",
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
  "(resource) live > (model) session_usage_updated_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionUsageUpdated/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, always `session.usage.updated`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveSessionUsageUpdated/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.usage.updated"
        }
      ]
    },
    "default": "session.usage.updated",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) session_usage_updated_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) session_usage_updated_event > (schema) > (property) usage": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionUsageUpdated/properties/usage",
    "deprecated": false,
    "key": "usage",
    "docstring": "The cumulative Live audio usage so far.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "SessionUsage",
      "$ref": "(resource) live > (model) session_usage > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) live > (model) session_usage",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_usage > (schema) > (property) seconds"
    ]
  },
  "(resource) live > (model) session_usage_updated_event > (schema) > (property) client_event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionUsageUpdated/properties/client_event_id",
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
  "(resource) live > (model) session_usage_updated_event > (schema) > (property) context_window": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionUsageUpdated/properties/context_window",
    "deprecated": false,
    "key": "context_window",
    "docstring": "The latest measured Live context-window usage. Omitted when the context limit is unknown.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "usage_ratio"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_usage_updated_event > (schema) > (property) context_window > (property) usage_ratio"
    ]
  },
  "(resource) live > (model) session_usage_updated_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.usage.updated"
    }
  },
  "(resource) live > (model) session_usage > (schema) > (property) seconds": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionUsage/properties/seconds",
    "deprecated": false,
    "key": "seconds",
    "docstring": "The cumulative Live audio duration in seconds. Do not sum this value across usage events.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "number",
    "children": []
  },
  "(resource) live > (model) session_usage > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveSessionUsage",
    "docstring": "Cumulative audio duration for a Live session. Values are totals for the session, not increments to sum across usage events.",
    "ident": "SessionUsage",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "seconds"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_usage > (schema) > (property) seconds"
    ]
  },
  "(resource) live > (model) session_usage_updated_event > (schema) > (property) context_window > (property) usage_ratio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveContextWindowUsage/properties/usage_ratio",
    "deprecated": false,
    "key": "usage_ratio",
    "docstring": "The latest active context token count divided by the Live model context limit. Can decrease after compaction and may lag between measured audio frames.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "number",
    "children": []
  }
}
```
