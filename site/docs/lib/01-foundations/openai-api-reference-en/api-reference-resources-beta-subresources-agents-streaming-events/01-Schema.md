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
pageSha256: "3b3a74869705ec9babf8a815257ec4e0046f814ff691019a8117889f9d537521"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `SessionEventAgentSessionEnvironmentReady`

```json
{
  "(resource) beta.agents > (model) agent_session_environment_ready_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionEventAgentSessionEnvironmentReady",
    "docstring": "Emitted when a hosted session environment is ready to connect.",
    "ident": "AgentSessionEnvironmentReadyEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "environment"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "session_id"
        },
        {
          "ident": "turn_id"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_session_environment_ready_event > (schema) > (property) environment",
      "(resource) beta.agents > (model) agent_session_environment_ready_event > (schema) > (property) event_id",
      "(resource) beta.agents > (model) agent_session_environment_ready_event > (schema) > (property) session_id",
      "(resource) beta.agents > (model) agent_session_environment_ready_event > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_session_environment_ready_event > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_environment_ready_event > (schema) > (property) environment": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionEnvironmentReady/properties/environment",
    "deprecated": false,
    "key": "environment",
    "docstring": "The current environment state.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentSessionEnvironmentState",
      "$ref": "(resource) beta.agents > (model) agent_session_environment_state > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) beta.agents > (model) agent_session_environment_state",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) error",
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_environment_ready_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionEnvironmentReady/properties/event_id",
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
  "(resource) beta.agents > (model) agent_session_environment_ready_event > (schema) > (property) session_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionEnvironmentReady/properties/session_id",
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
  "(resource) beta.agents > (model) agent_session_environment_ready_event > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionEnvironmentReady/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn associated with the event, when applicable.",
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
  "(resource) beta.agents > (model) agent_session_environment_ready_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionEnvironmentReady/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `agent.session.environment.ready`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionEventAgentSessionEnvironmentReady/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "agent.session.environment.ready"
        }
      ]
    },
    "default": "agent.session.environment.ready",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session_environment_ready_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEnvironmentStateResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The public ID of the environment.",
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
  "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) error": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEnvironmentStateResource/properties/error",
    "deprecated": false,
    "key": "error",
    "docstring": "An error reported while preparing a session environment.",
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
          "ident": "type"
        }
      ]
    },
    "optional": false,
    "nullable": true,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) error > (property) code",
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) error > (property) message",
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) error > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEnvironmentStateResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The environment's connection status.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionEnvironmentStateResource/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "pending"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "ready"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "connected"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "disconnected"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "failed"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) status > (member) 0",
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) status > (member) 1",
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) status > (member) 2",
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) status > (member) 3",
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) status > (member) 4"
    ]
  },
  "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEnvironmentStateResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The environment type.",
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
  "(resource) beta.agents > (model) agent_session_environment_state > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionEnvironmentStateResource",
    "docstring": "The current state of a session environment.",
    "ident": "AgentSessionEnvironmentState",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "error"
        },
        {
          "ident": "status"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) error",
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_environment_ready_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "agent.session.environment.ready"
    }
  },
  "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) error > (property) code": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEnvironmentErrorResource/properties/code",
    "deprecated": false,
    "key": "code",
    "docstring": "A machine-readable error code.",
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
  "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) error > (property) message": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEnvironmentErrorResource/properties/message",
    "deprecated": false,
    "key": "message",
    "docstring": "A human-readable error message.",
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
  "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) error > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEnvironmentErrorResource/properties/type",
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
  "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "The environment is being prepared.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "pending"
    }
  },
  "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) status > (member) 1": {
    "kind": "HttpDeclReference",
    "docstring": "The environment is ready to connect.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "ready"
    }
  },
  "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) status > (member) 2": {
    "kind": "HttpDeclReference",
    "docstring": "The environment is connected.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connected"
    }
  },
  "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) status > (member) 3": {
    "kind": "HttpDeclReference",
    "docstring": "The environment is disconnected.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "disconnected"
    }
  },
  "(resource) beta.agents > (model) agent_session_environment_state > (schema) > (property) status > (member) 4": {
    "kind": "HttpDeclReference",
    "docstring": "The environment failed to connect.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "failed"
    }
  }
}
```
