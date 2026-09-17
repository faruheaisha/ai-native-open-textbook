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
pageSha256: "896a9b565c1d3ebbd4f8ca7991b4fbfd4bbe6795de9480e611aa0f6ada7fd752"
contentMode: "local-full"
zh: ""
---

## safety.org_alert.created

Sent when an approved safety alert is available for an enterprise workspace.

### Schema

Schema name: `WebhookSafetyOrgAlertCreated`

```json
{
  "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/webhooks/safety_org_alert_created/post/requestBody/content/application%2Fjson/schema",
    "docstring": "Sent when an approved safety alert is available for an enterprise workspace.",
    "ident": "SafetyOrgAlertCreatedWebhookEvent",
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
          "ident": "object"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) id",
      "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) created_at",
      "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) data",
      "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) object",
      "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) type"
    ]
  },
  "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookSafetyOrgAlertCreated/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the webhook event.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) created_at": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookSafetyOrgAlertCreated/properties/created_at",
    "deprecated": false,
    "key": "created_at",
    "docstring": "The Unix timestamp in seconds when the event was created.",
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
  "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) data": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookSafetyOrgAlertCreated/properties/data",
    "deprecated": false,
    "key": "data",
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
      "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) data > (property) id"
    ]
  },
  "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) object": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookSafetyOrgAlertCreated/properties/object",
    "deprecated": false,
    "key": "object",
    "docstring": "Always `event`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/WebhookSafetyOrgAlertCreated/properties/object",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "event"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) object > (member) 0"
    ]
  },
  "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookSafetyOrgAlertCreated/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "Always `safety.org_alert.created`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/WebhookSafetyOrgAlertCreated/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "safety.org_alert.created"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) data > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookSafetyOrgAlertCreated/properties/data/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The safety alert ID to pass to `GET /v1/safety/alerts/{id}`.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) object > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "event"
    }
  },
  "(resource) webhooks > (model) safety_org_alert_created_webhook_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "safety.org_alert.created"
    }
  }
}
```

### Example

```json
{
  "id": "evt_123",
  "object": "event",
  "created_at": 1787659200,
  "type": "safety.org_alert.created",
  "data": {"id": "alert_0123456789abcdef0123456789abcdef"}
}
```
