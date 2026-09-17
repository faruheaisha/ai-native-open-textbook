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
sourceRel: "api/reference/resources/webhooks.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/webhooks.md"
sourceSha256: "a121e01c698c86b1c12f9a4e8098fb0193de88c00d6f4605a54cfddb72679f51"
pageSha256: "560de28cf7a99c6c3997575d6d6f66a4e22fa8b0f69e732f6a31da3c4cae038b"
contentMode: "local-full"
zh: ""
---

## response.failed

Sent when a background response has failed.

### Schema

Schema name: `WebhookResponseFailed`

```json
{
  "(resource) webhooks > (model) response_failed_webhook_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/webhooks/response_failed/post/requestBody/content/application%2Fjson/schema",
    "docstring": "Sent when a background response has failed.\n",
    "ident": "ResponseFailedWebhookEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "created_at"
        },
        {
          "ident": "data"
        },
        {
          "ident": "type"
        },
        {
          "ident": "object"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) id",
      "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) created_at",
      "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) data",
      "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) type",
      "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) object"
    ]
  },
  "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookResponseFailed/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the event.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) created_at": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookResponseFailed/properties/created_at",
    "deprecated": false,
    "key": "created_at",
    "docstring": "The Unix timestamp (in seconds) of when the model response failed.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "unixtime"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) data": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookResponseFailed/properties/data",
    "deprecated": false,
    "key": "data",
    "docstring": "Event data payload.\n",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) data > (property) id"
    ]
  },
  "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookResponseFailed/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the event. Always `response.failed`.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/WebhookResponseFailed/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.failed"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) object": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookResponseFailed/properties/object",
    "deprecated": false,
    "key": "object",
    "docstring": "The object of the event. Always `event`.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/WebhookResponseFailed/properties/object",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "event"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) object > (member) 0"
    ]
  },
  "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) data > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookResponseFailed/properties/data/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the model response.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.failed"
    }
  },
  "(resource) webhooks > (model) response_failed_webhook_event > (schema) > (property) object > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "event"
    }
  }
}
```

### Example

```json
{
  "id": "evt_abc123",
  "type": "response.failed",
  "created_at": 1719168000,
  "data": {
    "id": "resp_abc123"
  }
}
```
