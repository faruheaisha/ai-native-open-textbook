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
sourceRel: "api/reference/resources/beta/subresources/agents/streaming-events.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/beta/subresources/agents/streaming-events.md"
sourceSha256: "e06665a555636995fe1eb8261151942e9a4dfd0159109c2ca45291045c49af22"
pageSha256: "5cf45123cfdc3d52a1c59187275170f6c0240efeae48d9a05a0db1ac49a624b4"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `SessionEventError`

```json
{
  "(resource) beta.agents > (model) agent_session_error_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionEventError",
    "docstring": "Emitted when a turn or session fails.",
    "ident": "AgentSessionErrorEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "error"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "session_id"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_session_error_event > (schema) > (property) error",
      "(resource) beta.agents > (model) agent_session_error_event > (schema) > (property) event_id",
      "(resource) beta.agents > (model) agent_session_error_event > (schema) > (property) session_id",
      "(resource) beta.agents > (model) agent_session_error_event > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_error_event > (schema) > (property) error": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventError/properties/error",
    "deprecated": false,
    "key": "error",
    "docstring": "The error that occurred.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "SessionError",
      "$ref": "(resource) beta.agents > (model) session_error > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) beta.agents > (model) session_error",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) session_error > (schema) > (property) code",
      "(resource) beta.agents > (model) session_error > (schema) > (property) message",
      "(resource) beta.agents > (model) session_error > (schema) > (property) param",
      "(resource) beta.agents > (model) session_error > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_error_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventError/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "The unique ID of the event.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 0
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) beta.agents > (model) agent_session_error_event > (schema) > (property) session_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventError/properties/session_id",
    "deprecated": false,
    "key": "session_id",
    "docstring": "The ID of the session associated with the event.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 0
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) beta.agents > (model) agent_session_error_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventError/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `error`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionEventError/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "error"
        }
      ]
    },
    "default": "error",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session_error_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) session_error > (schema) > (property) code": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionErrorResource/properties/code",
    "deprecated": false,
    "key": "code",
    "docstring": "The machine-readable error code, if any.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 0
    },
    "optional": false,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) beta.agents > (model) session_error > (schema) > (property) message": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionErrorResource/properties/message",
    "deprecated": false,
    "key": "message",
    "docstring": "A customer-safe explanation of the error.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 0
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) beta.agents > (model) session_error > (schema) > (property) param": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionErrorResource/properties/param",
    "deprecated": false,
    "key": "param",
    "docstring": "The request parameter associated with the error, if any.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 0
    },
    "optional": false,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) beta.agents > (model) session_error > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionErrorResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The error type.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 0
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) beta.agents > (model) session_error > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionErrorResource",
    "docstring": "An error payload with the same public fields as Responses API streaming errors.",
    "ident": "SessionError",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "code"
        },
        {
          "ident": "message"
        },
        {
          "ident": "param"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) session_error > (schema) > (property) code",
      "(resource) beta.agents > (model) session_error > (schema) > (property) message",
      "(resource) beta.agents > (model) session_error > (schema) > (property) param",
      "(resource) beta.agents > (model) session_error > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_error_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "error"
    }
  }
}
```
