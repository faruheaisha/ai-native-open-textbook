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
pageSha256: "8cda59ac856001eac54f1f483b07bb686f9a21225c1c36a244251b3be287526d"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventRateLimitsUpdated`

```json
{
  "(resource) realtime > (model) rate_limits_updated_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventRateLimitsUpdated",
    "docstring": "Emitted at the beginning of a Response to indicate the updated rate limits. \nWhen a Response is created some tokens will be \"reserved\" for the output \ntokens, the rate limits shown here reflect that reservation, which is then \nadjusted accordingly once the Response is completed.\n",
    "ident": "RateLimitsUpdatedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "event_id"
        },
        {
          "ident": "rate_limits"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) event_id",
      "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits",
      "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventRateLimitsUpdated/properties/event_id",
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
  "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventRateLimitsUpdated/properties/rate_limits",
    "deprecated": false,
    "key": "rate_limits",
    "docstring": "List of rate limit information.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeServerEventRateLimitsUpdated/properties/rate_limits",
      "elementType": {
        "kind": "HttpTypeObject",
        "members": [
          {
            "ident": "limit"
          },
          {
            "ident": "name"
          },
          {
            "ident": "remaining"
          },
          {
            "ident": "reset_seconds"
          }
        ]
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits > (items) > (property) limit",
      "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits > (items) > (property) name",
      "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits > (items) > (property) remaining",
      "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits > (items) > (property) reset_seconds"
    ]
  },
  "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventRateLimitsUpdated/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `rate_limits.updated`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventRateLimitsUpdated/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "rate_limits.updated"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits > (items) > (property) limit": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventRateLimitsUpdated/properties/rate_limits/items/properties/limit",
    "deprecated": false,
    "key": "limit",
    "docstring": "The maximum allowed value for the rate limit.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits > (items) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventRateLimitsUpdated/properties/rate_limits/items/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The name of the rate limit (`requests`, `tokens`).\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventRateLimitsUpdated/properties/rate_limits/items/properties/name",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "requests"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "tokens"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits > (items) > (property) name > (member) 0",
      "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits > (items) > (property) name > (member) 1"
    ]
  },
  "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits > (items) > (property) remaining": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventRateLimitsUpdated/properties/rate_limits/items/properties/remaining",
    "deprecated": false,
    "key": "remaining",
    "docstring": "The remaining value before the limit is reached.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits > (items) > (property) reset_seconds": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventRateLimitsUpdated/properties/rate_limits/items/properties/reset_seconds",
    "deprecated": false,
    "key": "reset_seconds",
    "docstring": "Seconds until the rate limit resets.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "number",
    "children": []
  },
  "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "rate_limits.updated"
    }
  },
  "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits > (items) > (property) name > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "requests"
    }
  },
  "(resource) realtime > (model) rate_limits_updated_event > (schema) > (property) rate_limits > (items) > (property) name > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "tokens"
    }
  }
}
```
