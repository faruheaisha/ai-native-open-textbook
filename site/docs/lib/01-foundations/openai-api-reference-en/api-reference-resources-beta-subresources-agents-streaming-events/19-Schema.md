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
pageSha256: "6336b9ccc15d7b4a0abc18c07be89ae7cd063888696e4fdd81371be7b561c339"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `SessionEventAgentSessionIdle`

```json
{
  "(resource) beta.agents > (model) agent_session_idle_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionEventAgentSessionIdle",
    "docstring": "Emitted when a session becomes idle.",
    "ident": "AgentSessionIdleEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "event_id"
        },
        {
          "ident": "session"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_session_idle_event > (schema) > (property) event_id",
      "(resource) beta.agents > (model) agent_session_idle_event > (schema) > (property) session",
      "(resource) beta.agents > (model) agent_session_idle_event > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_idle_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionIdle/properties/event_id",
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
  "(resource) beta.agents > (model) agent_session_idle_event > (schema) > (property) session": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionIdle/properties/session",
    "deprecated": false,
    "key": "session",
    "docstring": "The session that became idle.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentSession",
      "$ref": "(resource) beta.agents > (model) agent_session > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) beta.agents > (model) agent_session",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_session > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) created_at",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) environment",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) error",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) last_active_at",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) metadata",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) object",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) usage",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) vault_ids"
    ]
  },
  "(resource) beta.agents > (model) agent_session_idle_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionIdle/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `agent.session.idle`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionEventAgentSessionIdle/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "agent.session.idle"
        }
      ]
    },
    "default": "agent.session.idle",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session_idle_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the session.",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionResource/properties/agent",
    "deprecated": false,
    "key": "agent",
    "docstring": "The agent running in the session.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "instructions"
        },
        {
          "ident": "model"
        },
        {
          "ident": "multi_agent"
        },
        {
          "ident": "name"
        },
        {
          "ident": "reasoning"
        },
        {
          "ident": "service_tier"
        },
        {
          "ident": "text"
        },
        {
          "ident": "tools"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) id",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) instructions",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) model",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) multi_agent",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) name",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) reasoning",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) service_tier",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) text",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) tools"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) created_at": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionResource/properties/created_at",
    "deprecated": false,
    "key": "created_at",
    "docstring": "The Unix timestamp, in seconds, when the session was created.",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) environment": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionResource/properties/environment",
    "deprecated": false,
    "key": "environment",
    "docstring": "The execution environment for the session.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "Environment",
      "$ref": "(resource) beta.agents > (model) environment > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "union",
    "modelPath": "(resource) beta.agents > (model) environment",
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) environment > (schema) > (variant) 0",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 2"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) error": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionResource/properties/error",
    "deprecated": false,
    "key": "error",
    "docstring": "The error that caused the session to fail, if any.",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) last_active_at": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionResource/properties/last_active_at",
    "deprecated": false,
    "key": "last_active_at",
    "docstring": "The Unix timestamp, in seconds, when the session was last active.",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) metadata": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionResource/properties/metadata",
    "deprecated": false,
    "key": "metadata",
    "docstring": "Custom string key-value pairs attached to the session.",
    "type": {
      "kind": "HttpTypeReference",
      "oasRef": "#/components/schemas/SessionResource/properties/metadata",
      "ident": "Record",
      "typeParameters": [
        {
          "kind": "HttpTypeString"
        },
        {
          "kind": "HttpTypeString"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "map",
    "children": []
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) object": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionResource/properties/object",
    "deprecated": false,
    "key": "object",
    "docstring": "The object type. Always `agent.session`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionResource/properties/object",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "agent.session"
        }
      ]
    },
    "default": "agent.session",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session > (schema) > (property) object > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionResource/properties/required_actions",
    "deprecated": false,
    "key": "required_actions",
    "docstring": "Actions that must be completed before the session can continue.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/SessionResource/properties/required_actions",
      "elementType": {
        "kind": "HttpTypeUnion",
        "oasRef": "#/components/schemas/SessionResource/properties/required_actions/items",
        "types": [
          {
            "kind": "HttpTypeObject",
            "members": [
              {
                "ident": "arguments"
              },
              {
                "ident": "call_id"
              },
              {
                "ident": "name"
              },
              {
                "ident": "turn_id"
              },
              {
                "ident": "type"
              }
            ]
          },
          {
            "kind": "HttpTypeObject",
            "members": [
              {
                "ident": "environment_id"
              },
              {
                "ident": "type"
              }
            ]
          }
        ]
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 1"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The current status of the session.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionResource/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "idle"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "in_progress"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "requires_action"
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
      "(resource) beta.agents > (model) agent_session > (schema) > (property) status > (member) 0",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) status > (member) 1",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) status > (member) 2",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) status > (member) 3"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) usage": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionResource/properties/usage",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) vault_ids": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionResource/properties/vault_ids",
    "deprecated": false,
    "key": "vault_ids",
    "docstring": "The IDs of vaults made available to the session.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/SessionResource/properties/vault_ids",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) beta.agents > (model) agent_session > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionResource",
    "docstring": "A Managed Agents session.",
    "ident": "AgentSession",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "agent"
        },
        {
          "ident": "created_at"
        },
        {
          "ident": "environment"
        },
        {
          "ident": "error"
        },
        {
          "ident": "last_active_at"
        },
        {
          "ident": "metadata"
        },
        {
          "ident": "object"
        },
        {
          "ident": "required_actions"
        },
        {
          "ident": "status"
        },
        {
          "ident": "usage"
        },
        {
          "ident": "vault_ids"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_session > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) created_at",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) environment",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) error",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) last_active_at",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) metadata",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) object",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) usage",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) vault_ids"
    ]
  },
  "(resource) beta.agents > (model) agent_session_idle_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "agent.session.idle"
    }
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionAgentResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the agent.",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) instructions": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionAgentResource/properties/instructions",
    "deprecated": false,
    "key": "instructions",
    "docstring": "Custom instructions appended to the agent's default base instructions.",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) model": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionAgentResource/properties/model",
    "deprecated": false,
    "key": "model",
    "docstring": "The model used by the agent.",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) multi_agent": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionAgentResource/properties/multi_agent",
    "deprecated": false,
    "key": "multi_agent",
    "docstring": "Configuration for creating and coordinating subagents.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "MultiAgentConfig",
      "$ref": "(resource) beta.agents > (model) multi_agent_config > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) beta.agents > (model) multi_agent_config",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) multi_agent_config > (schema) > (property) enabled",
      "(resource) beta.agents > (model) multi_agent_config > (schema) > (property) max_concurrent_subagents"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionAgentResource/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The reusable agent's name when the session was created, or null if no name was saved. Later changes to the agent's name do not affect this value.",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) reasoning": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionAgentResource/properties/reasoning",
    "deprecated": false,
    "key": "reasoning",
    "docstring": "The agent's reasoning configuration.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentReasoning",
      "$ref": "(resource) beta.agents > (model) agent_reasoning > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) beta.agents > (model) agent_reasoning",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort",
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) summary"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) service_tier": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionAgentResource/properties/service_tier",
    "deprecated": false,
    "key": "service_tier",
    "docstring": "The effective service-tier policy for model requests. Defaults to `auto`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionAgentResource/properties/service_tier",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "auto"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "default"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "flex"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "priority"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "fast"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) service_tier > (member) 0",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) service_tier > (member) 1",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) service_tier > (member) 2",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) service_tier > (member) 3",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) service_tier > (member) 4"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionAgentResource/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "Configuration for text generated by the agent.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentText",
      "$ref": "(resource) beta.agents > (model) agent_text > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) beta.agents > (model) agent_text",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_text > (schema) > (property) format",
      "(resource) beta.agents > (model) agent_text > (schema) > (property) verbosity"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) tools": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionAgentResource/properties/tools",
    "deprecated": false,
    "key": "tools",
    "docstring": "Tools available to the agent.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/SessionAgentResource/properties/tools",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "AgentTool",
        "$ref": "(resource) beta.agents > (model) agent_tool > (schema)"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 1",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/EnvironmentResource/oneOf/0",
    "docstring": "The session talks to CCA without selecting or provisioning an execution environment.",
    "ident": "None",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) environment > (schema) > (variant) 0 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/EnvironmentResource/oneOf/1",
    "docstring": "An environment hosted by OpenAI.",
    "ident": "OpenAIHosted",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "capability_directories"
        },
        {
          "ident": "files"
        },
        {
          "ident": "network"
        },
        {
          "ident": "packages"
        },
        {
          "ident": "plugins"
        },
        {
          "ident": "skills"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) id",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) capability_directories",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) files",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) network",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) packages",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) plugins",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) skills",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 2": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/EnvironmentResource/oneOf/2",
    "docstring": "An environment hosted by the application.",
    "ident": "SelfHosted",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "capability_directories"
        },
        {
          "ident": "remote_url"
        },
        {
          "ident": "type"
        },
        {
          "ident": "workspace_directory"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) environment > (schema) > (variant) 2 > (property) id",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 2 > (property) capability_directories",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 2 > (property) remote_url",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 2 > (property) type",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 2 > (property) workspace_directory"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/EnvironmentResource",
    "docstring": "The execution environment for a session.",
    "ident": "Environment",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/EnvironmentResource",
      "types": [
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "type"
            }
          ]
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "id"
            },
            {
              "ident": "capability_directories"
            },
            {
              "ident": "files"
            },
            {
              "ident": "network"
            },
            {
              "ident": "packages"
            },
            {
              "ident": "plugins"
            },
            {
              "ident": "skills"
            },
            {
              "ident": "type"
            }
          ]
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "id"
            },
            {
              "ident": "capability_directories"
            },
            {
              "ident": "remote_url"
            },
            {
              "ident": "type"
            },
            {
              "ident": "workspace_directory"
            }
          ]
        }
      ]
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) environment > (schema) > (variant) 0",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 2"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) object > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "agent.session"
    }
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionRequiredActionResource/oneOf/0",
    "docstring": "Run a function tool and submit its result.",
    "ident": "FunctionCall",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "arguments"
        },
        {
          "ident": "call_id"
        },
        {
          "ident": "name"
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
      "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0 > (property) arguments",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0 > (property) call_id",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0 > (property) name",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0 > (property) turn_id",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionRequiredActionResource/oneOf/1",
    "docstring": "Reconnect a session environment.",
    "ident": "EnvironmentConnection",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "environment_id"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 1 > (property) environment_id",
      "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 1 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "The session has no turn in progress and is ready for input. A hosted environment may still be provisioning.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "idle"
    }
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) status > (member) 1": {
    "kind": "HttpDeclReference",
    "docstring": "The session is processing a turn.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "in_progress"
    }
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) status > (member) 2": {
    "kind": "HttpDeclReference",
    "docstring": "The session is waiting for one or more required actions.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "requires_action"
    }
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) status > (member) 3": {
    "kind": "HttpDeclReference",
    "docstring": "The session failed.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "failed"
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
  "(resource) beta.agents > (model) multi_agent_config > (schema) > (property) enabled": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MultiAgentConfigResource/properties/enabled",
    "deprecated": false,
    "key": "enabled",
    "docstring": "Whether subagent tools are enabled. Defaults to false.",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) beta.agents > (model) multi_agent_config > (schema) > (property) max_concurrent_subagents": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MultiAgentConfigResource/properties/max_concurrent_subagents",
    "deprecated": false,
    "key": "max_concurrent_subagents",
    "docstring": "Maximum number of subagents that may run concurrently, or null when disabled. Defaults to 6 when enabled.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "int64",
      "minimum": 1,
      "maximum": 4294967295
    },
    "optional": false,
    "nullable": true,
    "schemaType": "integer",
    "children": []
  },
  "(resource) beta.agents > (model) multi_agent_config > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/MultiAgentConfigResource",
    "docstring": "The resolved configuration for creating and coordinating subagents.",
    "ident": "MultiAgentConfig",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "enabled"
        },
        {
          "ident": "max_concurrent_subagents"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) multi_agent_config > (schema) > (property) enabled",
      "(resource) beta.agents > (model) multi_agent_config > (schema) > (property) max_concurrent_subagents"
    ]
  },
  "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ReasoningResource/properties/effort",
    "deprecated": false,
    "key": "effort",
    "docstring": "The amount of reasoning effort used by an agent.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/ReasoningResource/properties/effort",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "none"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "minimal"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "low"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "medium"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "high"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "xhigh"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "max"
        }
      ]
    },
    "optional": false,
    "nullable": true,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 0",
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 1",
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 2",
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 3",
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 4",
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 5",
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 6"
    ]
  },
  "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) summary": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ReasoningResource/properties/summary",
    "deprecated": false,
    "key": "summary",
    "docstring": "The reasoning summary format requested from an agent.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/ReasoningResource/properties/summary",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "concise"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "detailed"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "auto"
        }
      ]
    },
    "optional": false,
    "nullable": true,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) summary > (member) 0",
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) summary > (member) 1",
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) summary > (member) 2"
    ]
  },
  "(resource) beta.agents > (model) agent_reasoning > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/ReasoningResource",
    "docstring": "The reasoning configuration used by an agent.",
    "ident": "AgentReasoning",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "effort"
        },
        {
          "ident": "summary"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort",
      "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) summary"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) service_tier > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) service_tier > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "default"
    }
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) service_tier > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "flex"
    }
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) service_tier > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "priority"
    }
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) agent > (property) service_tier > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "fast"
    }
  },
  "(resource) beta.agents > (model) agent_text > (schema) > (property) format": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TextResource/properties/format",
    "deprecated": false,
    "key": "format",
    "docstring": "The effective output format. Defaults to ordinary text.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "TextFormat",
      "$ref": "(resource) beta.agents > (model) text_format > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "union",
    "modelPath": "(resource) beta.agents > (model) text_format",
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) text_format > (schema) > (variant) 0",
      "(resource) beta.agents > (model) text_format > (schema) > (variant) 1"
    ]
  },
  "(resource) beta.agents > (model) agent_text > (schema) > (property) verbosity": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TextResource/properties/verbosity",
    "deprecated": false,
    "key": "verbosity",
    "docstring": "The amount of text produced by the agent. Defaults to `medium`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/TextResource/properties/verbosity",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "low"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "medium"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "high"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_text > (schema) > (property) verbosity > (member) 0",
      "(resource) beta.agents > (model) agent_text > (schema) > (property) verbosity > (member) 1",
      "(resource) beta.agents > (model) agent_text > (schema) > (property) verbosity > (member) 2"
    ]
  },
  "(resource) beta.agents > (model) agent_text > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/TextResource",
    "docstring": "The text configuration used by an agent.",
    "ident": "AgentText",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "format"
        },
        {
          "ident": "verbosity"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_text > (schema) > (property) format",
      "(resource) beta.agents > (model) agent_text > (schema) > (property) verbosity"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/AgentToolResource/oneOf/0",
    "docstring": "A function defined by the application.",
    "ident": "Function",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "defer_loading"
        },
        {
          "ident": "description"
        },
        {
          "ident": "name"
        },
        {
          "ident": "parameters"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0 > (property) defer_loading",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0 > (property) description",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0 > (property) name",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0 > (property) parameters",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/AgentToolResource/oneOf/1",
    "docstring": "Enables calling tools from model-generated code.",
    "ident": "ProgrammaticToolCalling",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "enabled"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 1 > (property) enabled",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 1 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/AgentToolResource/oneOf/2",
    "docstring": "Tools provided by a remote MCP server.",
    "ident": "Mcp",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "allowed_tools"
        },
        {
          "ident": "connection_origin"
        },
        {
          "ident": "credential_id"
        },
        {
          "ident": "request_metadata"
        },
        {
          "ident": "required"
        },
        {
          "ident": "server_label"
        },
        {
          "ident": "transport"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) allowed_tools",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) connection_origin",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) credential_id",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) request_metadata",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) required",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) server_label",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) transport",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/AgentToolResource/oneOf/3",
    "docstring": "Web search.",
    "ident": "WebSearch",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "allowed_domains"
        },
        {
          "ident": "context_size"
        },
        {
          "ident": "location"
        },
        {
          "ident": "mode"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) allowed_domains",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) context_size",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) location",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) mode",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/AgentToolResource",
    "docstring": "A tool available to the agent.",
    "ident": "AgentTool",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AgentToolResource",
      "types": [
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "defer_loading"
            },
            {
              "ident": "description"
            },
            {
              "ident": "name"
            },
            {
              "ident": "parameters"
            },
            {
              "ident": "type"
            }
          ]
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "enabled"
            },
            {
              "ident": "type"
            }
          ]
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "allowed_tools"
            },
            {
              "ident": "connection_origin"
            },
            {
              "ident": "credential_id"
            },
            {
              "ident": "request_metadata"
            },
            {
              "ident": "required"
            },
            {
              "ident": "server_label"
            },
            {
              "ident": "transport"
            },
            {
              "ident": "type"
            }
          ]
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "allowed_domains"
            },
            {
              "ident": "context_size"
            },
            {
              "ident": "location"
            },
            {
              "ident": "mode"
            },
            {
              "ident": "type"
            }
          ]
        }
      ]
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 1",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 0 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceNone/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `none`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/EnvironmentResourceNone/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "none"
        }
      ]
    },
    "default": "none",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) environment > (schema) > (variant) 0 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceOpenaiHosted/properties/id",
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
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) capability_directories": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceOpenaiHosted/properties/capability_directories",
    "deprecated": false,
    "key": "capability_directories",
    "docstring": "Directories that contain capabilities exposed to the agent.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/EnvironmentResourceOpenaiHosted/properties/capability_directories",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) files": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceOpenaiHosted/properties/files",
    "deprecated": false,
    "key": "files",
    "docstring": "Files available in the environment, excluding their contents.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/EnvironmentResourceOpenaiHosted/properties/files",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "HostedEnvironmentFile",
        "$ref": "(resource) beta.agents > (model) hosted_environment_file > (schema)"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 0",
      "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 1"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) network": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceOpenaiHosted/properties/network",
    "deprecated": false,
    "key": "network",
    "docstring": "The effective network access policy for the environment.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "access"
        },
        {
          "ident": "allowed_domains"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) network > (property) access",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) network > (property) allowed_domains"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) packages": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceOpenaiHosted/properties/packages",
    "deprecated": false,
    "key": "packages",
    "docstring": "Packages installed in the environment.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "npm"
        },
        {
          "ident": "python"
        },
        {
          "ident": "system"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) packages > (property) npm",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) packages > (property) python",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) packages > (property) system"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) plugins": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceOpenaiHosted/properties/plugins",
    "deprecated": false,
    "key": "plugins",
    "docstring": "Plugins installed in the environment, excluding their archive contents.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/EnvironmentResourceOpenaiHosted/properties/plugins",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "HostedPlugin",
        "$ref": "(resource) beta.agents > (model) hosted_plugin > (schema)"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) hosted_plugin > (schema) > (property) description",
      "(resource) beta.agents > (model) hosted_plugin > (schema) > (property) name",
      "(resource) beta.agents > (model) hosted_plugin > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) skills": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceOpenaiHosted/properties/skills",
    "deprecated": false,
    "key": "skills",
    "docstring": "Skills installed in the environment, excluding their archive contents.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/EnvironmentResourceOpenaiHosted/properties/skills",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "HostedSkill",
        "$ref": "(resource) beta.agents > (model) hosted_skill > (schema)"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 0",
      "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 1"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceOpenaiHosted/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `openai_hosted`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/EnvironmentResourceOpenaiHosted/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "openai_hosted"
        }
      ]
    },
    "default": "openai_hosted",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 2 > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceSelfHosted/properties/id",
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
  "(resource) beta.agents > (model) environment > (schema) > (variant) 2 > (property) capability_directories": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceSelfHosted/properties/capability_directories",
    "deprecated": false,
    "key": "capability_directories",
    "docstring": "Directories that contain capabilities exposed to the agent.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/EnvironmentResourceSelfHosted/properties/capability_directories",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 2 > (property) remote_url": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceSelfHosted/properties/remote_url",
    "deprecated": false,
    "key": "remote_url",
    "docstring": "Pass this URL unchanged to `codex exec-server --remote` when connecting this environment.",
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
  "(resource) beta.agents > (model) environment > (schema) > (variant) 2 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceSelfHosted/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `self_hosted`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/EnvironmentResourceSelfHosted/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "self_hosted"
        }
      ]
    },
    "default": "self_hosted",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) environment > (schema) > (variant) 2 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 2 > (property) workspace_directory": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentResourceSelfHosted/properties/workspace_directory",
    "deprecated": false,
    "key": "workspace_directory",
    "docstring": "The absolute project directory inside the environment. Defaults to `/workspace`.",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0 > (property) arguments": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionRequiredActionResourceFunctionCall/properties/arguments",
    "deprecated": false,
    "key": "arguments",
    "docstring": "The arguments supplied by the model.",
    "type": {
      "kind": "HttpTypeUnknown"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "unknown",
    "children": []
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0 > (property) call_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionRequiredActionResourceFunctionCall/properties/call_id",
    "deprecated": false,
    "key": "call_id",
    "docstring": "The ID to include when submitting the function result.",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0 > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionRequiredActionResourceFunctionCall/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The function name.",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0 > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionRequiredActionResourceFunctionCall/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn that requested the function call.",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionRequiredActionResourceFunctionCall/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `function_call`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionRequiredActionResourceFunctionCall/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "function_call"
        }
      ]
    },
    "default": "function_call",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 1 > (property) environment_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionRequiredActionResourceEnvironmentConnection/properties/environment_id",
    "deprecated": false,
    "key": "environment_id",
    "docstring": "The ID of the environment to reconnect.",
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
  "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionRequiredActionResourceEnvironmentConnection/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `environment_connection`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionRequiredActionResourceEnvironmentConnection/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "environment_connection"
        }
      ]
    },
    "default": "environment_connection",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 1 > (property) type > (member) 0"
    ]
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
  },
  "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "none"
    }
  },
  "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "minimal"
    }
  },
  "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "medium"
    }
  },
  "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "xhigh"
    }
  },
  "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) effort > (member) 6": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "max"
    }
  },
  "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) summary > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "Returns a concise reasoning summary when supported.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "concise"
    }
  },
  "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) summary > (member) 1": {
    "kind": "HttpDeclReference",
    "docstring": "Returns a detailed reasoning summary when supported.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "detailed"
    }
  },
  "(resource) beta.agents > (model) agent_reasoning > (schema) > (property) summary > (member) 2": {
    "kind": "HttpDeclReference",
    "docstring": "Automatically selects the most detailed summary supported by the model.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) beta.agents > (model) text_format > (schema) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/TextFormatResource/oneOf/0",
    "docstring": "Generates ordinary text without a structured-output constraint.",
    "ident": "Text",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) text_format > (schema) > (variant) 0 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) text_format > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/TextFormatResource/oneOf/1",
    "docstring": "Constrains generated text to a JSON Schema.",
    "ident": "JSONSchema",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "schema"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) text_format > (schema) > (variant) 1 > (property) schema",
      "(resource) beta.agents > (model) text_format > (schema) > (variant) 1 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) text_format > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/TextFormatResource",
    "docstring": "The effective output format for generated text.",
    "ident": "TextFormat",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/TextFormatResource",
      "types": [
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "type"
            }
          ]
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "schema"
            },
            {
              "ident": "type"
            }
          ]
        }
      ]
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) text_format > (schema) > (variant) 0",
      "(resource) beta.agents > (model) text_format > (schema) > (variant) 1"
    ]
  },
  "(resource) beta.agents > (model) agent_text > (schema) > (property) verbosity > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) beta.agents > (model) agent_text > (schema) > (property) verbosity > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "medium"
    }
  },
  "(resource) beta.agents > (model) agent_text > (schema) > (property) verbosity > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0 > (property) defer_loading": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceFunction/properties/defer_loading",
    "deprecated": false,
    "key": "defer_loading",
    "docstring": "Whether the function is deferred and discovered through tool search.",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0 > (property) description": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceFunction/properties/description",
    "deprecated": false,
    "key": "description",
    "docstring": "A description of what the function does.",
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
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0 > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceFunction/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The name of the function.",
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
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0 > (property) parameters": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceFunction/properties/parameters",
    "deprecated": false,
    "key": "parameters",
    "docstring": "A JSON Schema object describing the function's arguments.",
    "type": {
      "kind": "HttpTypeReference",
      "oasRef": "#/components/schemas/AgentToolResourceFunction/properties/parameters",
      "ident": "Record",
      "typeParameters": [
        {
          "kind": "HttpTypeString"
        },
        {
          "kind": "HttpTypeUnknown"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "map",
    "children": []
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceFunction/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `function`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AgentToolResourceFunction/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "function"
        }
      ]
    },
    "default": "function",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 1 > (property) enabled": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceProgrammaticToolCalling/properties/enabled",
    "deprecated": false,
    "key": "enabled",
    "docstring": "Whether tools can be called from model-generated code.",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceProgrammaticToolCalling/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `programmatic_tool_calling`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AgentToolResourceProgrammaticToolCalling/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "programmatic_tool_calling"
        }
      ]
    },
    "default": "programmatic_tool_calling",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) allowed_tools": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceMcp/properties/allowed_tools",
    "deprecated": false,
    "key": "allowed_tools",
    "docstring": "The MCP tools the agent may call.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/AgentToolResourceMcp/properties/allowed_tools",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": false,
    "nullable": true,
    "schemaType": "array",
    "children": []
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) connection_origin": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceMcp/properties/connection_origin",
    "deprecated": false,
    "key": "connection_origin",
    "docstring": "Where outbound MCP HTTP connections originate.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AgentToolResourceMcp/properties/connection_origin",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "service"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "environment"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) connection_origin > (member) 0",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) connection_origin > (member) 1"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) credential_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceMcp/properties/credential_id",
    "deprecated": false,
    "key": "credential_id",
    "docstring": "The attached vault credential selected for this MCP server, if any. Optional when exactly one attached credential matches the server URL.",
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
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) request_metadata": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceMcp/properties/request_metadata",
    "deprecated": false,
    "key": "request_metadata",
    "docstring": "Metadata included with requests to this MCP server.",
    "type": {
      "kind": "HttpTypeReference",
      "oasRef": "#/components/schemas/AgentToolResourceMcp/properties/request_metadata",
      "ident": "Record",
      "typeParameters": [
        {
          "kind": "HttpTypeString"
        },
        {
          "kind": "HttpTypeUnknown"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "map",
    "children": []
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) required": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceMcp/properties/required",
    "deprecated": false,
    "key": "required",
    "docstring": "Whether this MCP server must initialize before the first turn.",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) server_label": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceMcp/properties/server_label",
    "deprecated": false,
    "key": "server_label",
    "docstring": "A label used to identify the MCP server in tool calls.",
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
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) transport": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceMcp/properties/transport",
    "deprecated": false,
    "key": "transport",
    "docstring": "The transport used to connect to the MCP server.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "McpTransport",
      "$ref": "(resource) beta.agents > (model) mcp_transport > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "union",
    "modelPath": "(resource) beta.agents > (model) mcp_transport",
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 0",
      "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceMcp/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `mcp`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AgentToolResourceMcp/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "mcp"
        }
      ]
    },
    "default": "mcp",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) allowed_domains": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceWebSearch/properties/allowed_domains",
    "deprecated": false,
    "key": "allowed_domains",
    "docstring": "Allowed search domains, or `null` when the search is unrestricted.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/AgentToolResourceWebSearch/properties/allowed_domains",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": false,
    "nullable": true,
    "schemaType": "array",
    "children": []
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) context_size": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceWebSearch/properties/context_size",
    "deprecated": false,
    "key": "context_size",
    "docstring": "The amount of search context made available to the model. Defaults to `medium`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AgentToolResourceWebSearch/properties/context_size",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "low"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "medium"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "high"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) context_size > (member) 0",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) context_size > (member) 1",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) context_size > (member) 2"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) location": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceWebSearch/properties/location",
    "deprecated": false,
    "key": "location",
    "docstring": "Approximate user location used to localize web search results.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "city"
        },
        {
          "ident": "country"
        },
        {
          "ident": "region"
        },
        {
          "ident": "timezone"
        }
      ]
    },
    "optional": false,
    "nullable": true,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) location > (property) city",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) location > (property) country",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) location > (property) region",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) location > (property) timezone"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) mode": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceWebSearch/properties/mode",
    "deprecated": false,
    "key": "mode",
    "docstring": "The source used for web search results.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AgentToolResourceWebSearch/properties/mode",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "disabled"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "cached"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "live"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) mode > (member) 0",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) mode > (member) 1",
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) mode > (member) 2"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AgentToolResourceWebSearch/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `web_search`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AgentToolResourceWebSearch/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "web_search"
        }
      ]
    },
    "default": "web_search",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 0 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "none"
    }
  },
  "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "HostedEnvironmentFileID",
      "$ref": "(resource) beta.agents > (model) hosted_environment_file_id > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) id",
      "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) file_id",
      "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) path",
      "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) size_bytes",
      "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/HostedEnvironmentFileResource/oneOf/1",
    "docstring": "A file supplied inline when the session was created.",
    "ident": "Inline",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "path"
        },
        {
          "ident": "size_bytes"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 1 > (property) id",
      "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 1 > (property) path",
      "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 1 > (property) size_bytes",
      "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 1 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) hosted_environment_file > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/HostedEnvironmentFileResource",
    "docstring": "Metadata for a file materialized in an OpenAI-hosted execution environment.",
    "ident": "HostedEnvironmentFile",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/HostedEnvironmentFileResource",
      "types": [
        {
          "kind": "HttpTypeReference",
          "ident": "HostedEnvironmentFileID",
          "$ref": "(resource) beta.agents > (model) hosted_environment_file_id > (schema)"
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "id"
            },
            {
              "ident": "path"
            },
            {
              "ident": "size_bytes"
            },
            {
              "ident": "type"
            }
          ]
        }
      ]
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 0",
      "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 1"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) network > (property) access": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/NetworkPolicyResource/properties/access",
    "deprecated": false,
    "key": "access",
    "docstring": "The environment's network access mode.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/NetworkPolicyResource/properties/access",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "enabled"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "disabled"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "restricted"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) network > (property) access > (member) 0",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) network > (property) access > (member) 1",
      "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) network > (property) access > (member) 2"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) network > (property) allowed_domains": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/NetworkPolicyResource/properties/allowed_domains",
    "deprecated": false,
    "key": "allowed_domains",
    "docstring": "Domains the environment may access when network access is restricted.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/NetworkPolicyResource/properties/allowed_domains",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) packages > (property) npm": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentPackagesResource/properties/npm",
    "deprecated": false,
    "key": "npm",
    "docstring": "npm packages installed globally in the environment.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/EnvironmentPackagesResource/properties/npm",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) packages > (property) python": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentPackagesResource/properties/python",
    "deprecated": false,
    "key": "python",
    "docstring": "Python packages installed in the environment.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/EnvironmentPackagesResource/properties/python",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) packages > (property) system": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EnvironmentPackagesResource/properties/system",
    "deprecated": false,
    "key": "system",
    "docstring": "System packages installed in the environment.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/EnvironmentPackagesResource/properties/system",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) beta.agents > (model) hosted_plugin > (schema) > (property) description": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedPluginResourceInline/properties/description",
    "deprecated": false,
    "key": "description",
    "docstring": "The installed plugin description.",
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
  "(resource) beta.agents > (model) hosted_plugin > (schema) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedPluginResourceInline/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The installed plugin name.",
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
  "(resource) beta.agents > (model) hosted_plugin > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedPluginResourceInline/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `inline`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/HostedPluginResourceInline/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "inline"
        }
      ]
    },
    "default": "inline",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) hosted_plugin > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) hosted_plugin > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/HostedPluginResource",
    "docstring": "A plugin installed from an inline ZIP archive.",
    "ident": "HostedPlugin",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "description"
        },
        {
          "ident": "name"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) hosted_plugin > (schema) > (property) description",
      "(resource) beta.agents > (model) hosted_plugin > (schema) > (property) name",
      "(resource) beta.agents > (model) hosted_plugin > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "HostedSkillReference",
      "$ref": "(resource) beta.agents > (model) hosted_skill_reference > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) description",
      "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) name",
      "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) skill_id",
      "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) type",
      "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) version"
    ]
  },
  "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/HostedSkillResource/oneOf/1",
    "docstring": "A skill installed from an inline ZIP archive.",
    "ident": "Inline",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "description"
        },
        {
          "ident": "name"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 1 > (property) description",
      "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 1 > (property) name",
      "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 1 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) hosted_skill > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/HostedSkillResource",
    "docstring": "A skill installed in an OpenAI-hosted environment.",
    "ident": "HostedSkill",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/HostedSkillResource",
      "types": [
        {
          "kind": "HttpTypeReference",
          "ident": "HostedSkillReference",
          "$ref": "(resource) beta.agents > (model) hosted_skill_reference > (schema)"
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "description"
            },
            {
              "ident": "name"
            },
            {
              "ident": "type"
            }
          ]
        }
      ]
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 0",
      "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 1"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "openai_hosted"
    }
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 2 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "self_hosted"
    }
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 0 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "function_call"
    }
  },
  "(resource) beta.agents > (model) agent_session > (schema) > (property) required_actions > (items) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "environment_connection"
    }
  },
  "(resource) beta.agents > (model) text_format > (schema) > (variant) 0 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TextFormatResourceText/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `text`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/TextFormatResourceText/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "text"
        }
      ]
    },
    "default": "text",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) text_format > (schema) > (variant) 0 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) text_format > (schema) > (variant) 1 > (property) schema": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TextFormatResourceJsonSchema/properties/schema",
    "deprecated": false,
    "key": "schema",
    "docstring": "The JSON Schema that generated text must match.",
    "type": {
      "kind": "HttpTypeReference",
      "oasRef": "#/components/schemas/TextFormatResourceJsonSchema/properties/schema",
      "ident": "Record",
      "typeParameters": [
        {
          "kind": "HttpTypeString"
        },
        {
          "kind": "HttpTypeUnknown"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "map",
    "children": []
  },
  "(resource) beta.agents > (model) text_format > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/TextFormatResourceJsonSchema/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `json_schema`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/TextFormatResourceJsonSchema/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "json_schema"
        }
      ]
    },
    "default": "json_schema",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) text_format > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 0 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "function"
    }
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "programmatic_tool_calling"
    }
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) connection_origin > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "service"
    }
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) connection_origin > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "environment"
    }
  },
  "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/McpTransportResource/oneOf/0",
    "docstring": "Connects to an MCP server over HTTP.",
    "ident": "HTTP",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "server_url"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 0 > (property) server_url",
      "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 0 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/McpTransportResource/oneOf/1",
    "docstring": "Starts an MCP server as a local process.",
    "ident": "Stdio",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "args"
        },
        {
          "ident": "command"
        },
        {
          "ident": "cwd"
        },
        {
          "ident": "env_vars"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1 > (property) args",
      "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1 > (property) command",
      "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1 > (property) cwd",
      "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1 > (property) env_vars",
      "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) mcp_transport > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/McpTransportResource",
    "docstring": "The transport used to connect to an MCP server.",
    "ident": "McpTransport",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/McpTransportResource",
      "types": [
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "server_url"
            },
            {
              "ident": "type"
            }
          ]
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "args"
            },
            {
              "ident": "command"
            },
            {
              "ident": "cwd"
            },
            {
              "ident": "env_vars"
            },
            {
              "ident": "type"
            }
          ]
        }
      ]
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 0",
      "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1"
    ]
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 2 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "mcp"
    }
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) context_size > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) context_size > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "medium"
    }
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) context_size > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) location > (property) city": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchLocationResource/properties/city",
    "deprecated": false,
    "key": "city",
    "docstring": "The city name.",
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
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) location > (property) country": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchLocationResource/properties/country",
    "deprecated": false,
    "key": "country",
    "docstring": "The two-letter ISO country code, such as `US`.",
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
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) location > (property) region": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchLocationResource/properties/region",
    "deprecated": false,
    "key": "region",
    "docstring": "The region or state name.",
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
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) location > (property) timezone": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchLocationResource/properties/timezone",
    "deprecated": false,
    "key": "timezone",
    "docstring": "The IANA timezone, such as `America/Los_Angeles`.",
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
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) mode > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "disabled"
    }
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) mode > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "cached"
    }
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) mode > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "live"
    }
  },
  "(resource) beta.agents > (model) agent_tool > (schema) > (variant) 3 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "web_search"
    }
  },
  "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedEnvironmentFileResourceFileId/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The session-scoped ID of the file in the execution environment.",
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
  "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) file_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedEnvironmentFileResourceFileId/properties/file_id",
    "deprecated": false,
    "key": "file_id",
    "docstring": "The ID of the uploaded file.",
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
  "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) path": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedEnvironmentFileResourceFileId/properties/path",
    "deprecated": false,
    "key": "path",
    "docstring": "The file's absolute path inside the environment.",
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
  "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) size_bytes": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedEnvironmentFileResourceFileId/properties/size_bytes",
    "deprecated": false,
    "key": "size_bytes",
    "docstring": "The decoded file size in bytes.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "int64",
      "minimum": 0
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedEnvironmentFileResourceFileId/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `file_id`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/HostedEnvironmentFileResourceFileId/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "file_id"
        }
      ]
    },
    "default": "file_id",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) hosted_environment_file_id > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/HostedEnvironmentFileResourceFileId",
    "docstring": "A file copied from the OpenAI Files API.",
    "ident": "HostedEnvironmentFileID",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "file_id"
        },
        {
          "ident": "path"
        },
        {
          "ident": "size_bytes"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) id",
      "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) file_id",
      "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) path",
      "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) size_bytes",
      "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 1 > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedEnvironmentFileResourceInline/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The session-scoped ID of the file in the execution environment.",
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
  "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 1 > (property) path": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedEnvironmentFileResourceInline/properties/path",
    "deprecated": false,
    "key": "path",
    "docstring": "The file's absolute path inside the environment.",
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
  "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 1 > (property) size_bytes": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedEnvironmentFileResourceInline/properties/size_bytes",
    "deprecated": false,
    "key": "size_bytes",
    "docstring": "The decoded file size in bytes.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "int64",
      "minimum": 0
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedEnvironmentFileResourceInline/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `inline`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/HostedEnvironmentFileResourceInline/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "inline"
        }
      ]
    },
    "default": "inline",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) network > (property) access > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "Allows unrestricted network access.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "enabled"
    }
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) network > (property) access > (member) 1": {
    "kind": "HttpDeclReference",
    "docstring": "Disables network access.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "disabled"
    }
  },
  "(resource) beta.agents > (model) environment > (schema) > (variant) 1 > (property) network > (property) access > (member) 2": {
    "kind": "HttpDeclReference",
    "docstring": "Allows access only to configured domains.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "restricted"
    }
  },
  "(resource) beta.agents > (model) hosted_plugin > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "inline"
    }
  },
  "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) description": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedSkillResourceSkillReference/properties/description",
    "deprecated": false,
    "key": "description",
    "docstring": "The installed skill description.",
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
  "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedSkillResourceSkillReference/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The installed skill name.",
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
  "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) skill_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedSkillResourceSkillReference/properties/skill_id",
    "deprecated": false,
    "key": "skill_id",
    "docstring": "The referenced skill ID.",
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
  "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedSkillResourceSkillReference/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `skill_reference`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/HostedSkillResourceSkillReference/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "skill_reference"
        }
      ]
    },
    "default": "skill_reference",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) version": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedSkillResourceSkillReference/properties/version",
    "deprecated": false,
    "key": "version",
    "docstring": "The concrete skill version installed for this session.",
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
  "(resource) beta.agents > (model) hosted_skill_reference > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/HostedSkillResourceSkillReference",
    "docstring": "A skill installed from the Skills API.",
    "ident": "HostedSkillReference",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "description"
        },
        {
          "ident": "name"
        },
        {
          "ident": "skill_id"
        },
        {
          "ident": "type"
        },
        {
          "ident": "version"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) description",
      "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) name",
      "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) skill_id",
      "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) type",
      "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) version"
    ]
  },
  "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 1 > (property) description": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedSkillResourceInline/properties/description",
    "deprecated": false,
    "key": "description",
    "docstring": "The installed skill description.",
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
  "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 1 > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedSkillResourceInline/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The installed skill name.",
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
  "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/HostedSkillResourceInline/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `inline`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/HostedSkillResourceInline/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "inline"
        }
      ]
    },
    "default": "inline",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) text_format > (schema) > (variant) 0 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "text"
    }
  },
  "(resource) beta.agents > (model) text_format > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "json_schema"
    }
  },
  "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 0 > (property) server_url": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpTransportResourceHttp/properties/server_url",
    "deprecated": false,
    "key": "server_url",
    "docstring": "The URL of the MCP server.",
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
  "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 0 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpTransportResourceHttp/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `http`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/McpTransportResourceHttp/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "http"
        }
      ]
    },
    "default": "http",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 0 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1 > (property) args": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpTransportResourceStdio/properties/args",
    "deprecated": false,
    "key": "args",
    "docstring": "Arguments passed to the MCP server command.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/McpTransportResourceStdio/properties/args",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1 > (property) command": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpTransportResourceStdio/properties/command",
    "deprecated": false,
    "key": "command",
    "docstring": "The command used to start the MCP server.",
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
  "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1 > (property) cwd": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpTransportResourceStdio/properties/cwd",
    "deprecated": false,
    "key": "cwd",
    "docstring": "The working directory used to start the MCP server.",
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
  "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1 > (property) env_vars": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpTransportResourceStdio/properties/env_vars",
    "deprecated": false,
    "key": "env_vars",
    "docstring": "Environment variable names inherited from the execution environment.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/McpTransportResourceStdio/properties/env_vars",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpTransportResourceStdio/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `stdio`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/McpTransportResourceStdio/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "stdio"
        }
      ]
    },
    "default": "stdio",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) hosted_environment_file_id > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "file_id"
    }
  },
  "(resource) beta.agents > (model) hosted_environment_file > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "inline"
    }
  },
  "(resource) beta.agents > (model) hosted_skill_reference > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "skill_reference"
    }
  },
  "(resource) beta.agents > (model) hosted_skill > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "inline"
    }
  },
  "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 0 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "http"
    }
  },
  "(resource) beta.agents > (model) mcp_transport > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "stdio"
    }
  }
}
```
