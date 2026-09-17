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
pageSha256: "1f55c036a1fb5552d4aaf402e7da142158d0eb1d22b78d1d2ed27774852935bb"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `SessionEventAgentSessionTurnCreated`

```json
{
  "(resource) beta.agents > (model) agent_session_turn_created_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnCreated",
    "docstring": "Emitted when a turn is created.",
    "ident": "AgentSessionTurnCreatedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "event_id"
        },
        {
          "ident": "session_id"
        },
        {
          "ident": "turn"
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
      "(resource) beta.agents > (model) agent_session_turn_created_event > (schema) > (property) event_id",
      "(resource) beta.agents > (model) agent_session_turn_created_event > (schema) > (property) session_id",
      "(resource) beta.agents > (model) agent_session_turn_created_event > (schema) > (property) turn",
      "(resource) beta.agents > (model) agent_session_turn_created_event > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_session_turn_created_event > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_turn_created_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnCreated/properties/event_id",
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
  "(resource) beta.agents > (model) agent_session_turn_created_event > (schema) > (property) session_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnCreated/properties/session_id",
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
  "(resource) beta.agents > (model) agent_session_turn_created_event > (schema) > (property) turn": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnCreated/properties/turn",
    "deprecated": false,
    "key": "turn",
    "docstring": "The turn at the time it was created.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "Turn",
      "$ref": "(resource) beta.agents.sessions.turns > (model) turn > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) beta.agents.sessions.turns > (model) turn",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) id",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) agent_id",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) completed_at",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) created_at",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) error",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) object",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) session_id",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) started_at",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) subagent_id",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) usage"
    ]
  },
  "(resource) beta.agents > (model) agent_session_turn_created_event > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnCreated/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn associated with the event.",
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
  "(resource) beta.agents > (model) agent_session_turn_created_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnCreated/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `agent.session.turn.created`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionEventAgentSessionTurnCreated/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "agent.session.turn.created"
        }
      ]
    },
    "default": "agent.session.turn.created",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session_turn_created_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TurnResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the turn.",
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
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) agent_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TurnResource/properties/agent_id",
    "deprecated": false,
    "key": "agent_id",
    "docstring": "The ID of the agent that ran the turn.",
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
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) completed_at": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TurnResource/properties/completed_at",
    "deprecated": false,
    "key": "completed_at",
    "docstring": "The Unix timestamp, in seconds, when the turn reached a terminal state.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "int64"
    },
    "optional": false,
    "nullable": true,
    "schemaType": "integer",
    "children": []
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) created_at": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TurnResource/properties/created_at",
    "deprecated": false,
    "key": "created_at",
    "docstring": "The Unix timestamp, in seconds, used to order the turn by creation time. Subagent turns use their start time, falling back to completion time or the subagent opening time when the preceding timestamps are unavailable.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "int64"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) error": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TurnResource/properties/error",
    "deprecated": false,
    "key": "error",
    "docstring": "A customer-safe error describing why a session request failed.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "SessionTurnError",
      "$ref": "(resource) beta.agents > (model) session_turn_error > (schema)"
    },
    "optional": false,
    "nullable": true,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) beta.agents > (model) session_turn_error",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) message"
    ]
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) object": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TurnResource/properties/object",
    "deprecated": false,
    "key": "object",
    "docstring": "The object type. Always `agent.session.turn`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/TurnResource/properties/object",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "agent.session.turn"
        }
      ]
    },
    "default": "agent.session.turn",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) object > (member) 0"
    ]
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) session_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TurnResource/properties/session_id",
    "deprecated": false,
    "key": "session_id",
    "docstring": "The ID of the session that owns the turn.",
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
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) started_at": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TurnResource/properties/started_at",
    "deprecated": false,
    "key": "started_at",
    "docstring": "The Unix timestamp, in seconds, when the turn started.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "int64"
    },
    "optional": false,
    "nullable": true,
    "schemaType": "integer",
    "children": []
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TurnResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The current status of the turn.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/TurnResource/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "queued"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "in_progress"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "waiting"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "completed"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "failed"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "cancelled"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status > (member) 0",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status > (member) 1",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status > (member) 2",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status > (member) 3",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status > (member) 4",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status > (member) 5"
    ]
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) subagent_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TurnResource/properties/subagent_id",
    "deprecated": false,
    "key": "subagent_id",
    "docstring": "The ID of the subagent that ran the turn, if applicable.",
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
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) usage": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TurnResource/properties/usage",
    "deprecated": false,
    "key": "usage",
    "docstring": "Recorded token usage for a session or turn. Usage is best effort and may change.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "TokenUsage",
      "$ref": "(resource) beta.agents > (model) token_usage > (schema)"
    },
    "optional": false,
    "nullable": true,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) beta.agents > (model) token_usage",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) token_usage > (schema) > (property) input_tokens",
      "(resource) beta.agents > (model) token_usage > (schema) > (property) input_tokens_details",
      "(resource) beta.agents > (model) token_usage > (schema) > (property) output_tokens",
      "(resource) beta.agents > (model) token_usage > (schema) > (property) output_tokens_details",
      "(resource) beta.agents > (model) token_usage > (schema) > (property) total_tokens"
    ]
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/TurnResource",
    "docstring": "The canonical public representation of a session turn.",
    "ident": "Turn",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "agent_id"
        },
        {
          "ident": "completed_at"
        },
        {
          "ident": "created_at"
        },
        {
          "ident": "error"
        },
        {
          "ident": "object"
        },
        {
          "ident": "session_id"
        },
        {
          "ident": "started_at"
        },
        {
          "ident": "status"
        },
        {
          "ident": "subagent_id"
        },
        {
          "ident": "usage"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) id",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) agent_id",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) completed_at",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) created_at",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) error",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) object",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) session_id",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) started_at",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) subagent_id",
      "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) usage"
    ]
  },
  "(resource) beta.agents > (model) agent_session_turn_created_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "agent.session.turn.created"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionTurnErrorResource/properties/code",
    "deprecated": false,
    "key": "code",
    "docstring": "A stable, machine-readable failure category.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionTurnErrorResource/properties/code",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "context_length_exceeded"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "session_budget_exceeded"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "usage_limit_exceeded"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "credit_balance_exhausted"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "rate_limit_exceeded"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "server_overloaded"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "cyber_policy"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "connection_failed"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "server_error"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "authentication_error"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "invalid_request"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "resource_not_found"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "sandbox_error"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "executor_version_incompatible"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "active_turn_not_steerable"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "request_timeout"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "internal_error"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 0",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 1",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 2",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 3",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 4",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 5",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 6",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 7",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 8",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 9",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 10",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 11",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 12",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 13",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 14",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 15",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 16"
    ]
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) message": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionTurnErrorResource/properties/message",
    "deprecated": false,
    "key": "message",
    "docstring": "A customer-safe explanation of the failure.",
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
  "(resource) beta.agents > (model) session_turn_error > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionTurnErrorResource",
    "docstring": "A customer-safe error describing why a session request failed.",
    "ident": "SessionTurnError",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "code"
        },
        {
          "ident": "message"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code",
      "(resource) beta.agents > (model) session_turn_error > (schema) > (property) message"
    ]
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) object > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "agent.session.turn"
    }
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "The turn is waiting to start.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "queued"
    }
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status > (member) 1": {
    "kind": "HttpDeclReference",
    "docstring": "The turn is in progress.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "in_progress"
    }
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status > (member) 2": {
    "kind": "HttpDeclReference",
    "docstring": "The turn is waiting for external input.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "waiting"
    }
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status > (member) 3": {
    "kind": "HttpDeclReference",
    "docstring": "The turn completed successfully.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "completed"
    }
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status > (member) 4": {
    "kind": "HttpDeclReference",
    "docstring": "The turn failed.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "failed"
    }
  },
  "(resource) beta.agents.sessions.turns > (model) turn > (schema) > (property) status > (member) 5": {
    "kind": "HttpDeclReference",
    "docstring": "The turn was cancelled.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "cancelled"
    }
  },
  "(resource) beta.agents > (model) token_usage > (schema) > (property) input_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TokenUsageResource/properties/input_tokens",
    "deprecated": false,
    "key": "input_tokens",
    "docstring": "The number of input tokens used by the agent.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "int64"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) beta.agents > (model) token_usage > (schema) > (property) input_tokens_details": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TokenUsageResource/properties/input_tokens_details",
    "deprecated": false,
    "key": "input_tokens_details",
    "docstring": "A breakdown of the agent's input token usage.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "cached_tokens"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) token_usage > (schema) > (property) input_tokens_details > (property) cached_tokens"
    ]
  },
  "(resource) beta.agents > (model) token_usage > (schema) > (property) output_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TokenUsageResource/properties/output_tokens",
    "deprecated": false,
    "key": "output_tokens",
    "docstring": "The number of output tokens generated by the agent.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "int64"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) beta.agents > (model) token_usage > (schema) > (property) output_tokens_details": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TokenUsageResource/properties/output_tokens_details",
    "deprecated": false,
    "key": "output_tokens_details",
    "docstring": "A breakdown of the agent's output token usage.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "reasoning_tokens"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) token_usage > (schema) > (property) output_tokens_details > (property) reasoning_tokens"
    ]
  },
  "(resource) beta.agents > (model) token_usage > (schema) > (property) total_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TokenUsageResource/properties/total_tokens",
    "deprecated": false,
    "key": "total_tokens",
    "docstring": "The total number of input and output tokens used by the agent.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "int64"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) beta.agents > (model) token_usage > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/TokenUsageResource",
    "docstring": "Recorded token usage for a session or turn. Usage is best effort and may change.",
    "ident": "TokenUsage",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "input_tokens"
        },
        {
          "ident": "input_tokens_details"
        },
        {
          "ident": "output_tokens"
        },
        {
          "ident": "output_tokens_details"
        },
        {
          "ident": "total_tokens"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) token_usage > (schema) > (property) input_tokens",
      "(resource) beta.agents > (model) token_usage > (schema) > (property) input_tokens_details",
      "(resource) beta.agents > (model) token_usage > (schema) > (property) output_tokens",
      "(resource) beta.agents > (model) token_usage > (schema) > (property) output_tokens_details",
      "(resource) beta.agents > (model) token_usage > (schema) > (property) total_tokens"
    ]
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "The request exceeds the model's context window.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "context_length_exceeded"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 1": {
    "kind": "HttpDeclReference",
    "docstring": "The session has reached its usage budget.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session_budget_exceeded"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 2": {
    "kind": "HttpDeclReference",
    "docstring": "The organization has reached a usage, plan, or billing limit.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "usage_limit_exceeded"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 3": {
    "kind": "HttpDeclReference",
    "docstring": "The organization has no API credits remaining.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "credit_balance_exhausted"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 4": {
    "kind": "HttpDeclReference",
    "docstring": "The request exceeds the available rate limit.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "rate_limit_exceeded"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 5": {
    "kind": "HttpDeclReference",
    "docstring": "The model service is temporarily overloaded.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "server_overloaded"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 6": {
    "kind": "HttpDeclReference",
    "docstring": "The request was rejected by a safety policy.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "cyber_policy"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 7": {
    "kind": "HttpDeclReference",
    "docstring": "The request could not connect to the model service.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connection_failed"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 8": {
    "kind": "HttpDeclReference",
    "docstring": "The model service encountered an unexpected error.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "server_error"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 9": {
    "kind": "HttpDeclReference",
    "docstring": "The API credentials are invalid or lack the required access.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "authentication_error"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 10": {
    "kind": "HttpDeclReference",
    "docstring": "The request contains invalid input or configuration.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "invalid_request"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 11": {
    "kind": "HttpDeclReference",
    "docstring": "The requested model or resource is unavailable.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "resource_not_found"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 12": {
    "kind": "HttpDeclReference",
    "docstring": "The request could not complete in its execution environment.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "sandbox_error"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 13": {
    "kind": "HttpDeclReference",
    "docstring": "The executor must be upgraded before it can run this turn.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "executor_version_incompatible"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 14": {
    "kind": "HttpDeclReference",
    "docstring": "The session cannot accept additional input while a request is running.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "active_turn_not_steerable"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 15": {
    "kind": "HttpDeclReference",
    "docstring": "The request timed out before the model service responded.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "request_timeout"
    }
  },
  "(resource) beta.agents > (model) session_turn_error > (schema) > (property) code > (member) 16": {
    "kind": "HttpDeclReference",
    "docstring": "An unexpected internal error prevented the session request from completing.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "internal_error"
    }
  },
  "(resource) beta.agents > (model) token_usage > (schema) > (property) input_tokens_details > (property) cached_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputTokensDetailsResource/properties/cached_tokens",
    "deprecated": false,
    "key": "cached_tokens",
    "docstring": "The number of input tokens retrieved from the prompt cache.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "int64"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) beta.agents > (model) token_usage > (schema) > (property) output_tokens_details > (property) reasoning_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/OutputTokensDetailsResource/properties/reasoning_tokens",
    "deprecated": false,
    "key": "reasoning_tokens",
    "docstring": "The number of output tokens used for reasoning.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "int64"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  }
}
```
