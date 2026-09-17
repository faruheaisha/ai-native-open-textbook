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
pageSha256: "ab2ffe38b9b88e9daa8e6477eae80a02904facf4a65ce201da1407c772068391"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `SessionEventAgentSessionTurnItemDone`

```json
{
  "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnItemDone",
    "docstring": "Emitted when an output item is complete.",
    "ident": "AgentSessionTurnItemDoneEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "event_id"
        },
        {
          "ident": "item"
        },
        {
          "ident": "output_index"
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
      "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) event_id",
      "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) item",
      "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) output_index",
      "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) session_id",
      "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnItemDone/properties/event_id",
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
  "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) item": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnItemDone/properties/item",
    "deprecated": false,
    "key": "item",
    "docstring": "The completed output item.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentOutputItem",
      "$ref": "(resource) beta.agents > (model) agent_output_item > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "union",
    "modelPath": "(resource) beta.agents > (model) agent_output_item",
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 0",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 1",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 2",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 3",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 4",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 5",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 6",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 7",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 8",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 9",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 10",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 11"
    ]
  },
  "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) output_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnItemDone/properties/output_index",
    "deprecated": false,
    "key": "output_index",
    "docstring": "The index of the output item in the turn output.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "int64",
      "minimum": 0,
      "maximum": 4294967295
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) session_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnItemDone/properties/session_id",
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
  "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnItemDone/properties/turn_id",
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
  "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnItemDone/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `agent.session.turn.item.done`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionEventAgentSessionTurnItemDone/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "agent.session.turn.item.done"
        }
      ]
    },
    "default": "agent.session.turn.item.done",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentSessionAssistantMessage",
      "$ref": "(resource) beta.agents > (model) agent_session_assistant_message > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) content",
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) phase",
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) role",
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentReasoningItem",
      "$ref": "(resource) beta.agents > (model) agent_reasoning_item > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) summary",
      "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentFunctionCallItem",
      "$ref": "(resource) beta.agents > (model) agent_function_call_item > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) arguments",
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) call_id",
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) name",
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentMcpCallItem",
      "$ref": "(resource) beta.agents > (model) agent_mcp_call_item > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) arguments",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) error",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) name",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) output",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) server_label",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentWebSearchCallItem",
      "$ref": "(resource) beta.agents > (model) agent_web_search_call_item > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) action",
      "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentCommandExecutionItem",
      "$ref": "(resource) beta.agents > (model) agent_command_execution_item > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) command",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) cwd",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) duration_ms",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) exit_code",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) output",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 6": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentCreateSubagentCallItem",
      "$ref": "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) agent_id",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) content",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) model",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) reasoning_effort",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 7": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentSendSubagentInputCallItem",
      "$ref": "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) content",
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) recipient_agent_id",
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) sender_agent_id",
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 8": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentResumeSubagentCallItem",
      "$ref": "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) recipient_agent_id",
      "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) sender_agent_id",
      "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 9": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentWaitForSubagentsCallItem",
      "$ref": "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) recipient_agent_ids",
      "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) sender_agent_id",
      "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 10": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentInterruptSubagentCallItem",
      "$ref": "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) recipient_agent_id",
      "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) sender_agent_id",
      "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 11": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentCloseSubagentCallItem",
      "$ref": "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) recipient_agent_id",
      "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) sender_agent_id",
      "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_output_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/AgentOutputItemResource",
    "docstring": "An output item produced by an agent.",
    "ident": "AgentOutputItem",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AgentOutputItemResource",
      "types": [
        {
          "kind": "HttpTypeReference",
          "ident": "AgentSessionAssistantMessage",
          "$ref": "(resource) beta.agents > (model) agent_session_assistant_message > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "AgentReasoningItem",
          "$ref": "(resource) beta.agents > (model) agent_reasoning_item > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "AgentFunctionCallItem",
          "$ref": "(resource) beta.agents > (model) agent_function_call_item > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "AgentMcpCallItem",
          "$ref": "(resource) beta.agents > (model) agent_mcp_call_item > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "AgentWebSearchCallItem",
          "$ref": "(resource) beta.agents > (model) agent_web_search_call_item > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "AgentCommandExecutionItem",
          "$ref": "(resource) beta.agents > (model) agent_command_execution_item > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "AgentCreateSubagentCallItem",
          "$ref": "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "AgentSendSubagentInputCallItem",
          "$ref": "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "AgentResumeSubagentCallItem",
          "$ref": "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "AgentWaitForSubagentsCallItem",
          "$ref": "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "AgentInterruptSubagentCallItem",
          "$ref": "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "AgentCloseSubagentCallItem",
          "$ref": "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema)"
        }
      ]
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 0",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 1",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 2",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 3",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 4",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 5",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 6",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 7",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 8",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 9",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 10",
      "(resource) beta.agents > (model) agent_output_item > (schema) > (variant) 11"
    ]
  },
  "(resource) beta.agents > (model) agent_session_turn_item_done_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "agent.session.turn.item.done"
    }
  },
  "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AssistantMessageItemResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the message.",
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
  "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) content": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AssistantMessageItemResource/properties/content",
    "deprecated": false,
    "key": "content",
    "docstring": "The content of the message.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/AssistantMessageItemResource/properties/content",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "OutputText",
        "$ref": "(resource) beta.agents > (model) output_text > (schema)"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) output_text > (schema) > (property) text",
      "(resource) beta.agents > (model) output_text > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) phase": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AssistantMessageItemResource/properties/phase",
    "deprecated": false,
    "key": "phase",
    "docstring": "The phase of an assistant message.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AssistantMessageItemResource/properties/phase",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "commentary"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "final_answer"
        }
      ]
    },
    "optional": false,
    "nullable": true,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) phase > (member) 0",
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) phase > (member) 1"
    ]
  },
  "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) role": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AssistantMessageItemResource/properties/role",
    "deprecated": false,
    "key": "role",
    "docstring": "The role of the message author. Always `assistant`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AssistantMessageItemResource/properties/role",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "assistant"
        }
      ]
    },
    "default": "assistant",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) role > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AssistantMessageItemResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the message.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentOutputItemStatus",
      "$ref": "(resource) beta.agents > (model) agent_output_item_status > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) beta.agents > (model) agent_output_item_status",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 2"
    ]
  },
  "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AssistantMessageItemResource/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn that contains this item.",
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
  "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AssistantMessageItemResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The item type. Always `message`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AssistantMessageItemResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "message"
        }
      ]
    },
    "default": "message",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_session_assistant_message > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/AssistantMessageItemResource",
    "docstring": "An assistant message produced by the agent.",
    "ident": "AgentSessionAssistantMessage",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "content"
        },
        {
          "ident": "phase"
        },
        {
          "ident": "role"
        },
        {
          "ident": "status"
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
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) content",
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) phase",
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) role",
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ReasoningItemResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the reasoning item.",
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
  "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ReasoningItemResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of an agent output item.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentOutputItemStatus",
      "$ref": "(resource) beta.agents > (model) agent_output_item_status > (schema)"
    },
    "optional": false,
    "nullable": true,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) beta.agents > (model) agent_output_item_status",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 2"
    ]
  },
  "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) summary": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ReasoningItemResource/properties/summary",
    "deprecated": false,
    "key": "summary",
    "docstring": "The reasoning summaries produced by the agent.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/ReasoningItemResource/properties/summary",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "SummaryText",
        "$ref": "(resource) beta.agents > (model) summary_text > (schema)"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) summary_text > (schema) > (property) text",
      "(resource) beta.agents > (model) summary_text > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ReasoningItemResource/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn that contains this item.",
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
  "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ReasoningItemResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The item type. Always `reasoning`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/ReasoningItemResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "reasoning"
        }
      ]
    },
    "default": "reasoning",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_reasoning_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/ReasoningItemResource",
    "docstring": "A reasoning item produced by the agent.",
    "ident": "AgentReasoningItem",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "status"
        },
        {
          "ident": "summary"
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
      "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) summary",
      "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/FunctionCallItemResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the function call item.",
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
  "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) arguments": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/FunctionCallItemResource/properties/arguments",
    "deprecated": false,
    "key": "arguments",
    "docstring": "The arguments to pass to the function.",
    "type": {
      "kind": "HttpTypeUnknown"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "unknown",
    "children": []
  },
  "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) call_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/FunctionCallItemResource/properties/call_id",
    "deprecated": false,
    "key": "call_id",
    "docstring": "The ID used to submit the function result.",
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
  "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/FunctionCallItemResource/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The name of the function to call.",
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
  "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/FunctionCallItemResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the function call.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentFunctionCallStatus",
      "$ref": "(resource) beta.agents > (model) agent_function_call_status > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) beta.agents > (model) agent_function_call_status",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 2",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 3"
    ]
  },
  "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/FunctionCallItemResource/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn that contains this item.",
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
  "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/FunctionCallItemResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The item type. Always `function_call`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/FunctionCallItemResource/properties/type",
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
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_function_call_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/FunctionCallItemResource",
    "docstring": "A function call produced by the agent.",
    "ident": "AgentFunctionCallItem",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
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
          "ident": "status"
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
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) arguments",
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) call_id",
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) name",
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpCallItemResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the MCP call item.",
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
  "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) arguments": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpCallItemResource/properties/arguments",
    "deprecated": false,
    "key": "arguments",
    "docstring": "The arguments passed to the MCP tool.",
    "type": {
      "kind": "HttpTypeUnknown"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "unknown",
    "children": []
  },
  "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) error": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpCallItemResource/properties/error",
    "deprecated": false,
    "key": "error",
    "docstring": "The error returned by the MCP tool, if any.",
    "type": {
      "kind": "HttpTypeUnknown"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "unknown",
    "children": []
  },
  "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpCallItemResource/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The name of the MCP tool.",
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
  "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) output": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpCallItemResource/properties/output",
    "deprecated": false,
    "key": "output",
    "docstring": "The output returned by the MCP tool, if any.",
    "type": {
      "kind": "HttpTypeUnknown"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "unknown",
    "children": []
  },
  "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) server_label": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpCallItemResource/properties/server_label",
    "deprecated": false,
    "key": "server_label",
    "docstring": "The label of the MCP server.",
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
  "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpCallItemResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the MCP tool call.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentFunctionCallStatus",
      "$ref": "(resource) beta.agents > (model) agent_function_call_status > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) beta.agents > (model) agent_function_call_status",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 2",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 3"
    ]
  },
  "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpCallItemResource/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn that contains this item.",
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
  "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/McpCallItemResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The item type. Always `mcp_call`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/McpCallItemResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "mcp_call"
        }
      ]
    },
    "default": "mcp_call",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_mcp_call_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/McpCallItemResource",
    "docstring": "A call to a tool on an MCP server.",
    "ident": "AgentMcpCallItem",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "arguments"
        },
        {
          "ident": "error"
        },
        {
          "ident": "name"
        },
        {
          "ident": "output"
        },
        {
          "ident": "server_label"
        },
        {
          "ident": "status"
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
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) arguments",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) error",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) name",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) output",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) server_label",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchCallItemResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the web search call.",
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
  "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) action": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchCallItemResource/properties/action",
    "deprecated": false,
    "key": "action",
    "docstring": "An action performed by the web search tool.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "WebSearchAction",
      "$ref": "(resource) beta.agents > (model) web_search_action > (schema)"
    },
    "optional": false,
    "nullable": true,
    "modelImplicit": false,
    "schemaType": "union",
    "modelPath": "(resource) beta.agents > (model) web_search_action",
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 0",
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 1",
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 2",
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 3"
    ]
  },
  "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchCallItemResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the web search call.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentOutputItemStatus",
      "$ref": "(resource) beta.agents > (model) agent_output_item_status > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) beta.agents > (model) agent_output_item_status",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 2"
    ]
  },
  "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchCallItemResource/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn that contains this item.",
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
  "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchCallItemResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The item type. Always `web_search_call`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/WebSearchCallItemResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "web_search_call"
        }
      ]
    },
    "default": "web_search_call",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_web_search_call_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/WebSearchCallItemResource",
    "docstring": "A web search call produced by the agent.",
    "ident": "AgentWebSearchCallItem",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "action"
        },
        {
          "ident": "status"
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
      "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) action",
      "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CommandExecutionItemResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the command execution item.",
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
  "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) command": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CommandExecutionItemResource/properties/command",
    "deprecated": false,
    "key": "command",
    "docstring": "The command that was executed.",
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
  "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) cwd": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CommandExecutionItemResource/properties/cwd",
    "deprecated": false,
    "key": "cwd",
    "docstring": "The working directory used to execute the command.",
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
  "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) duration_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CommandExecutionItemResource/properties/duration_ms",
    "deprecated": false,
    "key": "duration_ms",
    "docstring": "The command duration in milliseconds.",
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
  "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) exit_code": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CommandExecutionItemResource/properties/exit_code",
    "deprecated": false,
    "key": "exit_code",
    "docstring": "The process exit code, if the command completed.",
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
  "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) output": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CommandExecutionItemResource/properties/output",
    "deprecated": false,
    "key": "output",
    "docstring": "The command output, if available.",
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
  "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CommandExecutionItemResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the command execution.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentFunctionCallStatus",
      "$ref": "(resource) beta.agents > (model) agent_function_call_status > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) beta.agents > (model) agent_function_call_status",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 2",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 3"
    ]
  },
  "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CommandExecutionItemResource/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn that contains this item.",
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
  "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CommandExecutionItemResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The item type. Always `command_execution`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/CommandExecutionItemResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "command_execution"
        }
      ]
    },
    "default": "command_execution",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_command_execution_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/CommandExecutionItemResource",
    "docstring": "A command execution produced by the agent.",
    "ident": "AgentCommandExecutionItem",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "command"
        },
        {
          "ident": "cwd"
        },
        {
          "ident": "duration_ms"
        },
        {
          "ident": "exit_code"
        },
        {
          "ident": "output"
        },
        {
          "ident": "status"
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
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) command",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) cwd",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) duration_ms",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) exit_code",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) output",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CreateSubagentCallItemResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the tool call item.",
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
  "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) agent_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CreateSubagentCallItemResource/properties/agent_id",
    "deprecated": false,
    "key": "agent_id",
    "docstring": "The ID of the agent that requested the subagent.",
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
  "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) content": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CreateSubagentCallItemResource/properties/content",
    "deprecated": false,
    "key": "content",
    "docstring": "The task given to the spawned agent.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/CreateSubagentCallItemResource/properties/content",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "AgentContent",
        "$ref": "(resource) beta.agents > (model) agent_content > (schema)"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) agent_content > (schema) > (variant) 0",
      "(resource) beta.agents > (model) agent_content > (schema) > (variant) 1"
    ]
  },
  "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) model": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CreateSubagentCallItemResource/properties/model",
    "deprecated": false,
    "key": "model",
    "docstring": "The model requested for the spawned agent.",
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
  "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) reasoning_effort": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CreateSubagentCallItemResource/properties/reasoning_effort",
    "deprecated": false,
    "key": "reasoning_effort",
    "docstring": "The reasoning effort requested for the spawned agent.",
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
  "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CreateSubagentCallItemResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the tool call.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentFunctionCallStatus",
      "$ref": "(resource) beta.agents > (model) agent_function_call_status > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) beta.agents > (model) agent_function_call_status",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 2",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 3"
    ]
  },
  "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CreateSubagentCallItemResource/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn that contains this item.",
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
  "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CreateSubagentCallItemResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The item type. Always `create_subagent_call`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/CreateSubagentCallItemResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "create_subagent_call"
        }
      ]
    },
    "default": "create_subagent_call",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/CreateSubagentCallItemResource",
    "docstring": "A request to spawn a subagent.",
    "ident": "AgentCreateSubagentCallItem",
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
          "ident": "content"
        },
        {
          "ident": "model"
        },
        {
          "ident": "reasoning_effort"
        },
        {
          "ident": "status"
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
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) agent_id",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) content",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) model",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) reasoning_effort",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SendSubagentInputCallItemResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the tool call item.",
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
  "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) content": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SendSubagentInputCallItemResource/properties/content",
    "deprecated": false,
    "key": "content",
    "docstring": "The input sent to the receiving agent.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/SendSubagentInputCallItemResource/properties/content",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "AgentContent",
        "$ref": "(resource) beta.agents > (model) agent_content > (schema)"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) agent_content > (schema) > (variant) 0",
      "(resource) beta.agents > (model) agent_content > (schema) > (variant) 1"
    ]
  },
  "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) recipient_agent_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SendSubagentInputCallItemResource/properties/recipient_agent_id",
    "deprecated": false,
    "key": "recipient_agent_id",
    "docstring": "The ID of the agent receiving the input.",
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
  "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) sender_agent_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SendSubagentInputCallItemResource/properties/sender_agent_id",
    "deprecated": false,
    "key": "sender_agent_id",
    "docstring": "The ID of the agent sending the input.",
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
  "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SendSubagentInputCallItemResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the tool call.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentFunctionCallStatus",
      "$ref": "(resource) beta.agents > (model) agent_function_call_status > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) beta.agents > (model) agent_function_call_status",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 2",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 3"
    ]
  },
  "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SendSubagentInputCallItemResource/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn that contains this item.",
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
  "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SendSubagentInputCallItemResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The item type. Always `send_subagent_input_call`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SendSubagentInputCallItemResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "send_subagent_input_call"
        }
      ]
    },
    "default": "send_subagent_input_call",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SendSubagentInputCallItemResource",
    "docstring": "A request to send input to another agent.",
    "ident": "AgentSendSubagentInputCallItem",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "content"
        },
        {
          "ident": "recipient_agent_id"
        },
        {
          "ident": "sender_agent_id"
        },
        {
          "ident": "status"
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
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) content",
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) recipient_agent_id",
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) sender_agent_id",
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ResumeSubagentCallItemResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the tool call item.",
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
  "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) recipient_agent_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ResumeSubagentCallItemResource/properties/recipient_agent_id",
    "deprecated": false,
    "key": "recipient_agent_id",
    "docstring": "The ID of the agent to resume.",
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
  "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) sender_agent_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ResumeSubagentCallItemResource/properties/sender_agent_id",
    "deprecated": false,
    "key": "sender_agent_id",
    "docstring": "The ID of the agent requesting the resume.",
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
  "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ResumeSubagentCallItemResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the tool call.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentFunctionCallStatus",
      "$ref": "(resource) beta.agents > (model) agent_function_call_status > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) beta.agents > (model) agent_function_call_status",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 2",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 3"
    ]
  },
  "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ResumeSubagentCallItemResource/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn that contains this item.",
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
  "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ResumeSubagentCallItemResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The item type. Always `resume_subagent_call`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/ResumeSubagentCallItemResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "resume_subagent_call"
        }
      ]
    },
    "default": "resume_subagent_call",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/ResumeSubagentCallItemResource",
    "docstring": "A request to resume a subagent.",
    "ident": "AgentResumeSubagentCallItem",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "recipient_agent_id"
        },
        {
          "ident": "sender_agent_id"
        },
        {
          "ident": "status"
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
      "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) recipient_agent_id",
      "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) sender_agent_id",
      "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WaitForSubagentsCallItemResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the tool call item.",
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
  "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) recipient_agent_ids": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WaitForSubagentsCallItemResource/properties/recipient_agent_ids",
    "deprecated": false,
    "key": "recipient_agent_ids",
    "docstring": "The IDs of the agents to wait for.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/WaitForSubagentsCallItemResource/properties/recipient_agent_ids",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) sender_agent_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WaitForSubagentsCallItemResource/properties/sender_agent_id",
    "deprecated": false,
    "key": "sender_agent_id",
    "docstring": "The ID of the agent waiting for results.",
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
  "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WaitForSubagentsCallItemResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the tool call.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentFunctionCallStatus",
      "$ref": "(resource) beta.agents > (model) agent_function_call_status > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) beta.agents > (model) agent_function_call_status",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 2",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 3"
    ]
  },
  "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WaitForSubagentsCallItemResource/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn that contains this item.",
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
  "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WaitForSubagentsCallItemResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The item type. Always `wait_for_subagents_call`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/WaitForSubagentsCallItemResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "wait_for_subagents_call"
        }
      ]
    },
    "default": "wait_for_subagents_call",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/WaitForSubagentsCallItemResource",
    "docstring": "A request to wait for one or more subagents.",
    "ident": "AgentWaitForSubagentsCallItem",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "recipient_agent_ids"
        },
        {
          "ident": "sender_agent_id"
        },
        {
          "ident": "status"
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
      "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) recipient_agent_ids",
      "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) sender_agent_id",
      "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InterruptSubagentCallItemResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the tool call item.",
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
  "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) recipient_agent_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InterruptSubagentCallItemResource/properties/recipient_agent_id",
    "deprecated": false,
    "key": "recipient_agent_id",
    "docstring": "The ID of the agent to interrupt.",
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
  "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) sender_agent_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InterruptSubagentCallItemResource/properties/sender_agent_id",
    "deprecated": false,
    "key": "sender_agent_id",
    "docstring": "The ID of the agent requesting the interrupt.",
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
  "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InterruptSubagentCallItemResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the tool call.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentFunctionCallStatus",
      "$ref": "(resource) beta.agents > (model) agent_function_call_status > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) beta.agents > (model) agent_function_call_status",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 2",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 3"
    ]
  },
  "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InterruptSubagentCallItemResource/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn that contains this item.",
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
  "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InterruptSubagentCallItemResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The item type. Always `interrupt_subagent_call`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/InterruptSubagentCallItemResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "interrupt_subagent_call"
        }
      ]
    },
    "default": "interrupt_subagent_call",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/InterruptSubagentCallItemResource",
    "docstring": "A request to interrupt a subagent's current turn. The subagent remains available.",
    "ident": "AgentInterruptSubagentCallItem",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "recipient_agent_id"
        },
        {
          "ident": "sender_agent_id"
        },
        {
          "ident": "status"
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
      "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) recipient_agent_id",
      "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) sender_agent_id",
      "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CloseSubagentCallItemResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the tool call item.",
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
  "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) recipient_agent_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CloseSubagentCallItemResource/properties/recipient_agent_id",
    "deprecated": false,
    "key": "recipient_agent_id",
    "docstring": "The ID of the agent to close.",
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
  "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) sender_agent_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CloseSubagentCallItemResource/properties/sender_agent_id",
    "deprecated": false,
    "key": "sender_agent_id",
    "docstring": "The ID of the agent requesting the close.",
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
  "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CloseSubagentCallItemResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the tool call.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AgentFunctionCallStatus",
      "$ref": "(resource) beta.agents > (model) agent_function_call_status > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) beta.agents > (model) agent_function_call_status",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 2",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 3"
    ]
  },
  "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CloseSubagentCallItemResource/properties/turn_id",
    "deprecated": false,
    "key": "turn_id",
    "docstring": "The ID of the turn that contains this item.",
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
  "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/CloseSubagentCallItemResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The item type. Always `close_subagent_call`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/CloseSubagentCallItemResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "close_subagent_call"
        }
      ]
    },
    "default": "close_subagent_call",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/CloseSubagentCallItemResource",
    "docstring": "A request to close a subagent.",
    "ident": "AgentCloseSubagentCallItem",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "recipient_agent_id"
        },
        {
          "ident": "sender_agent_id"
        },
        {
          "ident": "status"
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
      "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) id",
      "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) recipient_agent_id",
      "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) sender_agent_id",
      "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) output_text > (schema) > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/OutputTextResource/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "The text produced by the agent.",
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
  "(resource) beta.agents > (model) output_text > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/OutputTextResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The content type. Always `output_text`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/OutputTextResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "output_text"
        }
      ]
    },
    "default": "output_text",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) output_text > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) output_text > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/OutputTextResource",
    "docstring": "A text content part produced by the agent.",
    "ident": "OutputText",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "text"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) output_text > (schema) > (property) text",
      "(resource) beta.agents > (model) output_text > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) phase > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "Commentary produced while the agent works.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "commentary"
    }
  },
  "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) phase > (member) 1": {
    "kind": "HttpDeclReference",
    "docstring": "The agent's final answer.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "final_answer"
    }
  },
  "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) role > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "assistant"
    }
  },
  "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "The item is in progress.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "in_progress"
    }
  },
  "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 1": {
    "kind": "HttpDeclReference",
    "docstring": "The item is complete.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "completed"
    }
  },
  "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 2": {
    "kind": "HttpDeclReference",
    "docstring": "The item stopped before completing.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "incomplete"
    }
  },
  "(resource) beta.agents > (model) agent_output_item_status > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/OutputItemStatusResource",
    "docstring": "The status of an agent output item.",
    "ident": "AgentOutputItemStatus",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/OutputItemStatusResource",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "in_progress"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "completed"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "incomplete"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_output_item_status > (schema) > (member) 2"
    ]
  },
  "(resource) beta.agents > (model) agent_session_assistant_message > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "message"
    }
  },
  "(resource) beta.agents > (model) summary_text > (schema) > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SummaryTextResource/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "The reasoning summary text.",
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
  "(resource) beta.agents > (model) summary_text > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SummaryTextResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The content type. Always `summary_text`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SummaryTextResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "summary_text"
        }
      ]
    },
    "default": "summary_text",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) summary_text > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) summary_text > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SummaryTextResource",
    "docstring": "A reasoning summary content part.",
    "ident": "SummaryText",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "text"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) summary_text > (schema) > (property) text",
      "(resource) beta.agents > (model) summary_text > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_reasoning_item > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "reasoning"
    }
  },
  "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "The call is in progress.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "in_progress"
    }
  },
  "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 1": {
    "kind": "HttpDeclReference",
    "docstring": "The call completed successfully.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "completed"
    }
  },
  "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 2": {
    "kind": "HttpDeclReference",
    "docstring": "The call failed.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "failed"
    }
  },
  "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 3": {
    "kind": "HttpDeclReference",
    "docstring": "The call stopped before completing.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "incomplete"
    }
  },
  "(resource) beta.agents > (model) agent_function_call_status > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/FunctionCallStatusResource",
    "docstring": "The status of a tool call.",
    "ident": "AgentFunctionCallStatus",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/FunctionCallStatusResource",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "in_progress"
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
          "literal": "incomplete"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 0",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 1",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 2",
      "(resource) beta.agents > (model) agent_function_call_status > (schema) > (member) 3"
    ]
  },
  "(resource) beta.agents > (model) agent_function_call_item > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "function_call"
    }
  },
  "(resource) beta.agents > (model) agent_mcp_call_item > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "mcp_call"
    }
  },
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/WebSearchActionResource/oneOf/0",
    "docstring": "A search query or group of search queries.",
    "ident": "Search",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "queries"
        },
        {
          "ident": "query"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 0 > (property) queries",
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 0 > (property) query",
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 0 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/WebSearchActionResource/oneOf/1",
    "docstring": "Opens a web page.",
    "ident": "OpenPage",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        },
        {
          "ident": "url"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 1 > (property) type",
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 1 > (property) url"
    ]
  },
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 2": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/WebSearchActionResource/oneOf/2",
    "docstring": "Finds text within a web page.",
    "ident": "FindInPage",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "pattern"
        },
        {
          "ident": "type"
        },
        {
          "ident": "url"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 2 > (property) pattern",
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 2 > (property) type",
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 2 > (property) url"
    ]
  },
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 3": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/WebSearchActionResource/oneOf/3",
    "docstring": "Another web search action.",
    "ident": "Other",
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
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 3 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) web_search_action > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/WebSearchActionResource",
    "docstring": "An action performed by the web search tool.",
    "ident": "WebSearchAction",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/WebSearchActionResource",
      "types": [
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "queries"
            },
            {
              "ident": "query"
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
              "ident": "type"
            },
            {
              "ident": "url"
            }
          ]
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "pattern"
            },
            {
              "ident": "type"
            },
            {
              "ident": "url"
            }
          ]
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
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 0",
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 1",
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 2",
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 3"
    ]
  },
  "(resource) beta.agents > (model) agent_web_search_call_item > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "web_search_call"
    }
  },
  "(resource) beta.agents > (model) agent_command_execution_item > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "command_execution"
    }
  },
  "(resource) beta.agents > (model) agent_content > (schema) > (variant) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "OutputText",
      "$ref": "(resource) beta.agents > (model) output_text > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) output_text > (schema) > (property) text",
      "(resource) beta.agents > (model) output_text > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_content > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/AgentContentResource/oneOf/1",
    "docstring": "Encrypted content exchanged between agents.",
    "ident": "EncryptedContent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "encrypted_content"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_content > (schema) > (variant) 1 > (property) encrypted_content",
      "(resource) beta.agents > (model) agent_content > (schema) > (variant) 1 > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_content > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/AgentContentResource",
    "docstring": "A plaintext or encrypted content part exchanged between agents.",
    "ident": "AgentContent",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AgentContentResource",
      "types": [
        {
          "kind": "HttpTypeReference",
          "ident": "OutputText",
          "$ref": "(resource) beta.agents > (model) output_text > (schema)"
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "encrypted_content"
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
      "(resource) beta.agents > (model) agent_content > (schema) > (variant) 0",
      "(resource) beta.agents > (model) agent_content > (schema) > (variant) 1"
    ]
  },
  "(resource) beta.agents > (model) agent_create_subagent_call_item > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "The current public item type.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "create_subagent_call"
    }
  },
  "(resource) beta.agents > (model) agent_send_subagent_input_call_item > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "The current public item type.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "send_subagent_input_call"
    }
  },
  "(resource) beta.agents > (model) agent_resume_subagent_call_item > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "The current public item type.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "resume_subagent_call"
    }
  },
  "(resource) beta.agents > (model) agent_wait_for_subagents_call_item > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "The current public item type.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "wait_for_subagents_call"
    }
  },
  "(resource) beta.agents > (model) agent_interrupt_subagent_call_item > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "The current public item type.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "interrupt_subagent_call"
    }
  },
  "(resource) beta.agents > (model) agent_close_subagent_call_item > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "The current public item type.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "close_subagent_call"
    }
  },
  "(resource) beta.agents > (model) output_text > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "output_text"
    }
  },
  "(resource) beta.agents > (model) summary_text > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "summary_text"
    }
  },
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 0 > (property) queries": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchActionResourceSearch/properties/queries",
    "deprecated": false,
    "key": "queries",
    "docstring": "The search queries, when multiple queries were used.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/WebSearchActionResourceSearch/properties/queries",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": false,
    "nullable": true,
    "schemaType": "array",
    "children": []
  },
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 0 > (property) query": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchActionResourceSearch/properties/query",
    "deprecated": false,
    "key": "query",
    "docstring": "The search query, when a single query was used.",
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
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 0 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchActionResourceSearch/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `search`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/WebSearchActionResourceSearch/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "search"
        }
      ]
    },
    "default": "search",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 0 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchActionResourceOpenPage/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `open_page`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/WebSearchActionResourceOpenPage/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "open_page"
        }
      ]
    },
    "default": "open_page",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 1 > (property) url": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchActionResourceOpenPage/properties/url",
    "deprecated": false,
    "key": "url",
    "docstring": "The URL of the page that was opened.",
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
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 2 > (property) pattern": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchActionResourceFindInPage/properties/pattern",
    "deprecated": false,
    "key": "pattern",
    "docstring": "The text pattern that was searched for.",
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
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 2 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchActionResourceFindInPage/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `find_in_page`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/WebSearchActionResourceFindInPage/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "find_in_page"
        }
      ]
    },
    "default": "find_in_page",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 2 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 2 > (property) url": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchActionResourceFindInPage/properties/url",
    "deprecated": false,
    "key": "url",
    "docstring": "The URL of the page that was searched.",
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
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 3 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/WebSearchActionResourceOther/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `other`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/WebSearchActionResourceOther/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "other"
        }
      ]
    },
    "default": "other",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 3 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_content > (schema) > (variant) 1 > (property) encrypted_content": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EncryptedContentResource/properties/encrypted_content",
    "deprecated": false,
    "key": "encrypted_content",
    "docstring": "The encrypted content payload.",
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
  "(resource) beta.agents > (model) agent_content > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/EncryptedContentResource/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The content type. Always `encrypted_content`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/EncryptedContentResource/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "encrypted_content"
        }
      ]
    },
    "default": "encrypted_content",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_content > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 0 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "search"
    }
  },
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "open_page"
    }
  },
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 2 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "find_in_page"
    }
  },
  "(resource) beta.agents > (model) web_search_action > (schema) > (variant) 3 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "other"
    }
  },
  "(resource) beta.agents > (model) agent_content > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "encrypted_content"
    }
  }
}
```
