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
pageSha256: "3a4764a1015ef0a53c2de10cc135515b016ef72f0c74ee1a62b8a76854edbf35"
contentMode: "local-full"
zh: ""
---

## live.call.incoming

Deprecated: use `live.transport.incoming`. Retained for existing subscriptions
during migration; new subscriptions to this event are not allowed.
Sent when an incoming API SIP session is available for Live acceptance. The
same pending session can also emit `realtime.call.incoming`; the first
successful Realtime or Live accept endpoint selects the runtime surface.

### Schema

Schema name: `WebhookLiveCallIncoming`

```json
{
  "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/webhooks/live_call_incoming/post/requestBody/content/application%2Fjson/schema",
    "docstring": "Deprecated: use `live.transport.incoming`. Retained for existing subscriptions\nduring migration; new subscriptions to this event are not allowed.\nSent when an incoming API SIP session is available for Live acceptance. The\nsame pending session can also emit `realtime.call.incoming`; the first\nsuccessful Realtime or Live accept endpoint selects the runtime surface.\n",
    "ident": "LiveCallIncomingWebhookEvent",
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
      "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) id",
      "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) created_at",
      "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) data",
      "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) type",
      "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) object"
    ]
  },
  "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookLiveCallIncoming/properties/id",
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
  "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) created_at": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookLiveCallIncoming/properties/created_at",
    "deprecated": false,
    "key": "created_at",
    "docstring": "The Unix timestamp (in seconds) of when the event was created.\n",
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
  "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) data": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookLiveCallIncoming/properties/data",
    "deprecated": false,
    "key": "data",
    "docstring": "Event data payload.\n",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "session_id"
        },
        {
          "ident": "sip_headers"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) data > (property) session_id",
      "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) data > (property) sip_headers"
    ]
  },
  "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookLiveCallIncoming/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the event. Always `live.call.incoming`.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/WebhookLiveCallIncoming/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "live.call.incoming"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) object": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookLiveCallIncoming/properties/object",
    "deprecated": false,
    "key": "object",
    "docstring": "The object of the event. Always `event`.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/WebhookLiveCallIncoming/properties/object",
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
      "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) object > (member) 0"
    ]
  },
  "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) data > (property) session_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookLiveCallIncoming/properties/data/properties/session_id",
    "deprecated": false,
    "key": "session_id",
    "docstring": "The `live_...` ID of the pending SIP session. Pass this value unchanged\nto Live call controls and sideband connections. The corresponding\n`realtime.call.incoming` event uses a separate `rtc_...` call ID.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) data > (property) sip_headers": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookLiveCallIncoming/properties/data/properties/sip_headers",
    "deprecated": false,
    "key": "sip_headers",
    "docstring": "Headers from the SIP INVITE, excluding SIP authorization headers.\nRetained names, values, repeated entries, and order are preserved.\nTreat these values as untrusted call metadata.\n",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/WebhookLiveCallIncoming/properties/data/properties/sip_headers",
      "elementType": {
        "kind": "HttpTypeObject",
        "members": [
          {
            "ident": "name"
          },
          {
            "ident": "value"
          }
        ]
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "object",
    "children": [
      "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) data > (property) sip_headers > (items) > (property) name",
      "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) data > (property) sip_headers > (items) > (property) value"
    ]
  },
  "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "live.call.incoming"
    }
  },
  "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) object > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "event"
    }
  },
  "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) data > (property) sip_headers > (items) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookLiveCallIncoming/properties/data/properties/sip_headers/items/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "Name of the SIP Header.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) webhooks > (model) live_call_incoming_webhook_event > (schema) > (property) data > (property) sip_headers > (items) > (property) value": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebhookLiveCallIncoming/properties/data/properties/sip_headers/items/properties/value",
    "deprecated": false,
    "key": "value",
    "docstring": "Value of the SIP Header.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  }
}
```

### Example

```json
{
  "id": "evt_abc123",
  "type": "live.call.incoming",
  "created_at": 1719168000,
  "data": {
    "session_id": "live_u0_479a275623b54bdb9b6fbae2f7cbd408",
    "sip_headers": [
      {"name": "From", "value": "<sip:alice@example.com>;tag=abc123"},
      {"name": "To", "value": "<sip:recipient@example.com>"},
      {"name": "Call-ID", "value": "call-123@example.com"}
    ]
  }
}
```
