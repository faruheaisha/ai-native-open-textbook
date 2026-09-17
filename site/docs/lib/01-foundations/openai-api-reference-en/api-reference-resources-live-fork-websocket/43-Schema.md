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
pageSha256: "7ecb74d3a3327428f8dc7b960244501f50e442b6e34fb2595687b135bd03649f"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveDelegationCreated`

```json
{
  "(resource) live > (model) delegation_created_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveDelegationCreated",
    "docstring": "Returned when the Live model delegates work to your application or a Responses backend. Contains delegation metadata and the position on the session timeline where the work was delegated.",
    "ident": "DelegationCreatedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "delegation"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "offset_ms"
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
      "(resource) live > (model) delegation_created_event > (schema) > (property) delegation",
      "(resource) live > (model) delegation_created_event > (schema) > (property) event_id",
      "(resource) live > (model) delegation_created_event > (schema) > (property) offset_ms",
      "(resource) live > (model) delegation_created_event > (schema) > (property) type",
      "(resource) live > (model) delegation_created_event > (schema) > (property) client_event_id"
    ]
  },
  "(resource) live > (model) delegation_created_event > (schema) > (property) delegation": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDelegationCreated/properties/delegation",
    "deprecated": false,
    "key": "delegation",
    "docstring": "The delegated work identifier and destination. This object contains metadata, not the task text.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "target"
        },
        {
          "ident": "type"
        },
        {
          "ident": "response_id"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) id",
      "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) target",
      "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) type",
      "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) response_id"
    ]
  },
  "(resource) live > (model) delegation_created_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDelegationCreated/properties/event_id",
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
  "(resource) live > (model) delegation_created_event > (schema) > (property) offset_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDelegationCreated/properties/offset_ms",
    "deprecated": false,
    "key": "offset_ms",
    "docstring": "The position on the Live session timeline where the delegation was created, in milliseconds from the beginning of the session.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) live > (model) delegation_created_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDelegationCreated/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, always `session.delegation.created`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveDelegationCreated/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.delegation.created"
        }
      ]
    },
    "default": "session.delegation.created",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) delegation_created_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) delegation_created_event > (schema) > (property) client_event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDelegationCreated/properties/client_event_id",
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
  "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDelegationItem/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the delegation. Use this as delegation_id when replying to client-owned work or correlating Responses events.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) target": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDelegationItem/properties/target",
    "deprecated": false,
    "key": "target",
    "docstring": "Where the Live model delegated the work: `client` for your application, or `responses` for the configured Responses backend.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveDelegationItem/properties/target",
      "types": [
        {
          "kind": "HttpTypeUnion",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "client"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "responses"
            }
          ]
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) target > (variant) 0"
    ]
  },
  "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDelegationItem/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The object type, always `delegation`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveDelegationItem/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "delegation"
        }
      ]
    },
    "default": "delegation",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) response_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDelegationItem/properties/response_id",
    "deprecated": false,
    "key": "response_id",
    "docstring": "The ID of the Responses API response associated with a Responses delegation. Omitted for client delegations.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) delegation_created_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.delegation.created"
    }
  },
  "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) target > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "docstring": "Where the Live model delegated the work: `client` for your application, or `responses` for the configured Responses backend.",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeUnion",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "client"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "responses"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) target > (variant) 0 > (member) 0",
      "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) target > (variant) 0 > (member) 1"
    ]
  },
  "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "delegation"
    }
  },
  "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) target > (variant) 0 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "client"
    }
  },
  "(resource) live > (model) delegation_created_event > (schema) > (property) delegation > (property) target > (variant) 0 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "responses"
    }
  }
}
```
