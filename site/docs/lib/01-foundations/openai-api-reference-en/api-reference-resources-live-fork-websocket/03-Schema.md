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
pageSha256: "fe20185e74abbe5863b9f9043f76de462b9bf0e113cbf0f2c02b387d4862df8d"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveSessionUpdateParam`

```json
{
  "(resource) live > (model) session_update_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveSessionUpdateParam",
    "docstring": "Update the delegation settings of an active Live session. The server acknowledges accepted changes with `session.updated`.",
    "ident": "SessionUpdateEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "session"
        },
        {
          "ident": "type"
        },
        {
          "ident": "event_id"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_update_event > (schema) > (property) session",
      "(resource) live > (model) session_update_event > (schema) > (property) type",
      "(resource) live > (model) session_update_event > (schema) > (property) event_id"
    ]
  },
  "(resource) live > (model) session_update_event > (schema) > (property) session": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionUpdateParam/properties/session",
    "deprecated": false,
    "key": "session",
    "docstring": "Sparse delegation updates. Omitted settings retain their values. The delegation type cannot change, including resetting Responses delegation to null or client. Model, frontend instructions, audio, and startup input are immutable.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "SessionUpdateConfig",
      "$ref": "(resource) live > (model) session_update_config > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) live > (model) session_update_config",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_update_config > (schema) > (property) delegation"
    ]
  },
  "(resource) live > (model) session_update_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionUpdateParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The Live client event type. Always `session.update`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveSessionUpdateParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.update"
        }
      ]
    },
    "default": "session.update",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) session_update_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) session_update_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionUpdateParam/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "Optional client identifier for correlating this command with a server event's client_event_id or error.client_event_id.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "maxLength": 512
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) session_update_config > (schema) > (property) delegation": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionUpdateParams/properties/delegation",
    "deprecated": false,
    "key": "delegation",
    "docstring": "Delegation settings to update. The delegation type must match the current session; omitted settings retain their values.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveSessionUpdateParams/properties/delegation",
      "types": [
        {
          "kind": "HttpTypeReference",
          "ident": "ClientDelegation",
          "$ref": "(resource) live > (model) client_delegation > (schema)"
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "type"
            },
            {
              "ident": "responses"
            }
          ]
        }
      ]
    },
    "optional": true,
    "nullable": true,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) live > (model) session_update_config > (schema) > (property) delegation > (variant) 0",
      "(resource) live > (model) session_update_config > (schema) > (property) delegation > (variant) 1"
    ]
  },
  "(resource) live > (model) session_update_config > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveSessionUpdateParams",
    "docstring": "Changes to an active Live session. Only delegation backend settings can be updated after startup.",
    "ident": "SessionUpdateConfig",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "delegation"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_update_config > (schema) > (property) delegation"
    ]
  },
  "(resource) live > (model) session_update_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.update"
    }
  },
  "(resource) live > (model) session_update_config > (schema) > (property) delegation > (variant) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ClientDelegation",
      "$ref": "(resource) live > (model) client_delegation > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) client_delegation > (schema) > (property) type"
    ]
  },
  "(resource) live > (model) session_update_config > (schema) > (property) delegation > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveSessionUpdateParams/properties/delegation/anyOf/0/oneOf/1",
    "docstring": "Update the Responses backend for an existing Live session without changing delegation ownership.",
    "ident": "Responses",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        },
        {
          "ident": "responses"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_update_config > (schema) > (property) delegation > (variant) 1 > (property) type",
      "(resource) live > (model) session_update_config > (schema) > (property) delegation > (variant) 1 > (property) responses"
    ]
  },
  "(resource) live > (model) client_delegation > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveClientDelegationParam",
    "docstring": "Delegate tasks to your application. The Live session emits delegation events that your backend handles.",
    "ident": "ClientDelegation",
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
      "(resource) live > (model) client_delegation > (schema) > (property) type"
    ]
  },
  "(resource) live > (model) client_delegation > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveClientDelegationParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The delegation owner. Always `client` for tasks handled by your application.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveClientDelegationParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "client"
        }
      ]
    },
    "default": "client",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) client_delegation > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) session_update_config > (schema) > (property) delegation > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationUpdateParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The delegation owner. Always `responses` for tasks handled by the Responses API.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveResponsesDelegationUpdateParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "responses"
        }
      ]
    },
    "default": "responses",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) session_update_config > (schema) > (property) delegation > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) session_update_config > (schema) > (property) delegation > (variant) 1 > (property) responses": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationUpdateParam/properties/responses",
    "deprecated": false,
    "key": "responses",
    "docstring": "Responses backend settings to update. Omitted settings keep their existing values.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ResponsesDelegationUpdateConfig",
      "$ref": "(resource) live > (model) responses_delegation_update_config > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) live > (model) responses_delegation_update_config",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) instructions",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) max_output_tokens",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) model",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) parallel_tool_calls",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) text",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tools"
    ]
  },
  "(resource) live > (model) client_delegation > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "client"
    }
  },
  "(resource) live > (model) session_update_config > (schema) > (property) delegation > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "responses"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) instructions": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/instructions",
    "deprecated": false,
    "key": "instructions",
    "docstring": "Instructions for the delegated Responses model, separate from Live instructions. See [backend prompting](/api/docs/guides/live-delegation#start-with-your-existing-backend-prompt).",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) max_output_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/max_output_tokens",
    "deprecated": false,
    "key": "max_output_tokens",
    "docstring": "Maximum number of output tokens for each delegated response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "minimum": 16
    },
    "optional": true,
    "nullable": true,
    "schemaType": "integer",
    "children": []
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) model": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/model",
    "deprecated": false,
    "key": "model",
    "docstring": "The Responses backend model to use for subsequent delegated requests. Omit to keep the current backend model.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) parallel_tool_calls": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/parallel_tool_calls",
    "deprecated": false,
    "key": "parallel_tool_calls",
    "docstring": "Whether the delegated Responses model may request multiple tool calls in a single response.",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/reasoning",
    "deprecated": false,
    "key": "reasoning",
    "docstring": "Reasoning settings passed to each delegated Responses request.",
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
    "optional": true,
    "nullable": true,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) summary"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/service_tier",
    "deprecated": false,
    "key": "service_tier",
    "docstring": "Service tier for delegated Responses requests.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/service_tier",
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
          "literal": "fast_tier_temp_pilot"
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
          "literal": "ultrafast"
        }
      ]
    },
    "optional": true,
    "nullable": true,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier > (member) 0",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier > (member) 1",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier > (member) 2",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier > (member) 3",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier > (member) 4",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier > (member) 5"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "Text generation settings passed to each delegated Responses request.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "verbosity"
        }
      ]
    },
    "optional": true,
    "nullable": true,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) text > (property) verbosity"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/tool_choice",
    "deprecated": false,
    "key": "tool_choice",
    "docstring": "Controls which tool the Responses backend uses when handling a task delegated by the Live model.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/tool_choice",
      "types": [
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/tool_choice/oneOf/0",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "auto"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "none"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "required"
            }
          ]
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "name"
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
              "ident": "name"
            },
            {
              "ident": "server_label"
            },
            {
              "ident": "type"
            }
          ]
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 0",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 1",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 2"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tools": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/tools",
    "deprecated": false,
    "key": "tools",
    "docstring": "Tools available to the Responses backend while it handles tasks delegated by the Live model.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/tools",
      "elementType": {
        "kind": "HttpTypeUnion",
        "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/tools/items",
        "types": [
          {
            "kind": "HttpTypeReference",
            "ident": "FunctionTool",
            "$ref": "(resource) live > (model) function_tool > (schema)"
          },
          {
            "kind": "HttpTypeObject",
            "members": [
              {
                "ident": "type"
              }
            ]
          }
        ]
      }
    },
    "optional": true,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "union",
    "children": [
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tools > (items) > (variant) 0",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tools > (items) > (variant) 1"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam",
    "docstring": "Updates to the Responses backend of an existing Live session. Omitted settings retain their current values.",
    "ident": "ResponsesDelegationUpdateConfig",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "instructions"
        },
        {
          "ident": "max_output_tokens"
        },
        {
          "ident": "model"
        },
        {
          "ident": "parallel_tool_calls"
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
          "ident": "tool_choice"
        },
        {
          "ident": "tools"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) instructions",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) max_output_tokens",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) model",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) parallel_tool_calls",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) text",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tools"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDelegationReasoningInputParam/properties/effort",
    "deprecated": false,
    "key": "effort",
    "docstring": "How much reasoning effort the delegated Responses model should use. Supported values depend on the backend model.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveDelegationReasoningInputParam/properties/effort",
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
        }
      ]
    },
    "optional": true,
    "nullable": true,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort > (member) 0",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort > (member) 1",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort > (member) 2",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort > (member) 3",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort > (member) 4",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort > (member) 5"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) summary": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDelegationReasoningInputParam/properties/summary",
    "deprecated": false,
    "key": "summary",
    "docstring": "The reasoning summary to request from the delegated Responses model, when supported.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveDelegationReasoningInputParam/properties/summary",
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
    "optional": true,
    "nullable": true,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) summary > (member) 0",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) summary > (member) 1",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) summary > (member) 2"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "default"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "fast_tier_temp_pilot"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "flex"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "priority"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) service_tier > (member) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "ultrafast"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) text > (property) verbosity": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDelegationTextInputParam/properties/verbosity",
    "deprecated": false,
    "key": "verbosity",
    "docstring": "The amount of detail in text generated by the Responses backend. This does not configure the Live model’s spoken delivery.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveDelegationTextInputParam/properties/verbosity",
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
    "optional": true,
    "nullable": true,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) text > (property) verbosity > (member) 0",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) text > (property) verbosity > (member) 1",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) text > (property) verbosity > (member) 2"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/tool_choice/oneOf/0",
    "ident": "LiveToolChoiceEnum",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/tool_choice/oneOf/0",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "auto"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "none"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "required"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 0 > (member) 0",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 0 > (member) 1",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 0 > (member) 2"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/tool_choice/oneOf/1",
    "ident": "LiveFunctionToolChoiceParam",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
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
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 1 > (property) name",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 1 > (property) type"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 2": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/tool_choice/oneOf/2",
    "ident": "LiveMCPToolChoiceParam",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "name"
        },
        {
          "ident": "server_label"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 2 > (property) name",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 2 > (property) server_label",
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 2 > (property) type"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tools > (items) > (variant) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "FunctionTool",
      "$ref": "(resource) live > (model) function_tool > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) function_tool > (schema) > (property) name",
      "(resource) live > (model) function_tool > (schema) > (property) type",
      "(resource) live > (model) function_tool > (schema) > (property) description",
      "(resource) live > (model) function_tool > (schema) > (property) parameters",
      "(resource) live > (model) function_tool > (schema) > (property) strict"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tools > (items) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsUpdateInputParam/properties/tools/items/oneOf/1",
    "docstring": "A web search tool available to the Live session’s Responses backend.",
    "ident": "WebSearch",
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
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tools > (items) > (variant) 1 > (property) type"
    ]
  },
  "(resource) live > (model) function_tool > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveFunctionToolInputParam",
    "docstring": "A function tool available to the Responses backend when the Live model delegates a task.",
    "ident": "FunctionTool",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "name"
        },
        {
          "ident": "type"
        },
        {
          "ident": "description"
        },
        {
          "ident": "parameters"
        },
        {
          "ident": "strict"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) function_tool > (schema) > (property) name",
      "(resource) live > (model) function_tool > (schema) > (property) type",
      "(resource) live > (model) function_tool > (schema) > (property) description",
      "(resource) live > (model) function_tool > (schema) > (property) parameters",
      "(resource) live > (model) function_tool > (schema) > (property) strict"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "none"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "minimal"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "medium"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) effort > (member) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "xhigh"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) summary > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "concise"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) summary > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "detailed"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) reasoning > (property) summary > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) text > (property) verbosity > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) text > (property) verbosity > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "medium"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) text > (property) verbosity > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 0 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 0 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "none"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 0 > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "required"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 1 > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveFunctionToolChoiceParam/properties/name",
    "deprecated": false,
    "key": "name",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 1,
      "maxLength": 64
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveFunctionToolChoiceParam/properties/type",
    "deprecated": false,
    "key": "type",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveFunctionToolChoiceParam/properties/type",
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
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 2 > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveMCPToolChoiceParam/properties/name",
    "deprecated": false,
    "key": "name",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 1,
      "maxLength": 64
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 2 > (property) server_label": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveMCPToolChoiceParam/properties/server_label",
    "deprecated": false,
    "key": "server_label",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 1,
      "maxLength": 64
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 2 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveMCPToolChoiceParam/properties/type",
    "deprecated": false,
    "key": "type",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveMCPToolChoiceParam/properties/type",
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
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 2 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) function_tool > (schema) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveFunctionToolInputParam/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The name the delegated Responses model uses when calling this function.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) function_tool > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveFunctionToolInputParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The tool type. Always `function`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveFunctionToolInputParam/properties/type",
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
      "(resource) live > (model) function_tool > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) function_tool > (schema) > (property) description": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveFunctionToolInputParam/properties/description",
    "deprecated": false,
    "key": "description",
    "docstring": "What the function does and when the delegated Responses model should call it.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) function_tool > (schema) > (property) parameters": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveFunctionToolInputParam/properties/parameters",
    "deprecated": false,
    "key": "parameters",
    "docstring": "A JSON Schema object describing the arguments accepted by the function.",
    "type": {
      "kind": "HttpTypeReference",
      "oasRef": "#/components/schemas/LiveFunctionToolInputParam/properties/parameters",
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
    "optional": true,
    "nullable": true,
    "schemaType": "map",
    "children": []
  },
  "(resource) live > (model) function_tool > (schema) > (property) strict": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveFunctionToolInputParam/properties/strict",
    "deprecated": false,
    "key": "strict",
    "docstring": "Whether the delegated Responses model must follow the function’s parameter schema exactly.",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tools > (items) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveWebSearchToolInputParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The tool type. Always `web_search`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveWebSearchToolInputParam/properties/type",
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
      "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tools > (items) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "function"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tool_choice > (variant) 2 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "mcp"
    }
  },
  "(resource) live > (model) function_tool > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "function"
    }
  },
  "(resource) live > (model) responses_delegation_update_config > (schema) > (property) tools > (items) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "web_search"
    }
  }
}
```
