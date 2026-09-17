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
sourceRel: "api/reference/resources/realtime/server-events.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/server-events.md"
sourceSha256: "4595bc318a41e7e43d9ea10eda8ce73d0a7f3740791946b9eeb2fb3cc8bab8a6"
pageSha256: "d335aa2b938d8d82a9e130aa45fdb9693db0b49e4a66fe93c46fb637a122e50b"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventResponseOutputItemAdded`

```json
{
  "(resource) realtime > (model) response_output_item_added_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseOutputItemAdded",
    "docstring": "Returned when a new Item is created during Response generation.",
    "ident": "ResponseOutputItemAddedEvent",
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
          "ident": "response_id"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) response_output_item_added_event > (schema) > (property) event_id",
      "(resource) realtime > (model) response_output_item_added_event > (schema) > (property) item",
      "(resource) realtime > (model) response_output_item_added_event > (schema) > (property) output_index",
      "(resource) realtime > (model) response_output_item_added_event > (schema) > (property) response_id",
      "(resource) realtime > (model) response_output_item_added_event > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) response_output_item_added_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseOutputItemAdded/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "The unique ID of the server event.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_output_item_added_event > (schema) > (property) item": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseOutputItemAdded/properties/item",
    "deprecated": false,
    "key": "item",
    "docstring": "A single item within a Realtime conversation.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ConversationItem",
      "$ref": "(resource) realtime > (model) conversation_item > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "union",
    "modelPath": "(resource) realtime > (model) conversation_item",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 0",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 1",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 2",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 3",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 4",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 5",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 6",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 7",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 8"
    ]
  },
  "(resource) realtime > (model) response_output_item_added_event > (schema) > (property) output_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseOutputItemAdded/properties/output_index",
    "deprecated": false,
    "key": "output_index",
    "docstring": "The index of the output item in the Response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) response_output_item_added_event > (schema) > (property) response_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseOutputItemAdded/properties/response_id",
    "deprecated": false,
    "key": "response_id",
    "docstring": "The ID of the Response to which the item belongs.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_output_item_added_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseOutputItemAdded/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `response.output_item.added`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventResponseOutputItemAdded/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.output_item.added"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) response_output_item_added_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) conversation_item > (schema) > (variant) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeConversationItemSystemMessage",
      "$ref": "(resource) realtime > (model) realtime_conversation_item_system_message > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) content",
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) role",
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) type",
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) id",
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) object",
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) status"
    ]
  },
  "(resource) realtime > (model) conversation_item > (schema) > (variant) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeConversationItemUserMessage",
      "$ref": "(resource) realtime > (model) realtime_conversation_item_user_message > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) role",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) type",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) id",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) object",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) status"
    ]
  },
  "(resource) realtime > (model) conversation_item > (schema) > (variant) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeConversationItemAssistantMessage",
      "$ref": "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) role",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) type",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) id",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) object",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) status"
    ]
  },
  "(resource) realtime > (model) conversation_item > (schema) > (variant) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeConversationItemFunctionCall",
      "$ref": "(resource) realtime > (model) realtime_conversation_item_function_call > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) arguments",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) name",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) type",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) id",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) call_id",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) object",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) status"
    ]
  },
  "(resource) realtime > (model) conversation_item > (schema) > (variant) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeConversationItemFunctionCallOutput",
      "$ref": "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) call_id",
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) output",
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) type",
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) id",
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) object",
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) status"
    ]
  },
  "(resource) realtime > (model) conversation_item > (schema) > (variant) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeMcpApprovalResponse",
      "$ref": "(resource) realtime > (model) realtime_mcp_approval_response > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) id",
      "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) approval_request_id",
      "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) approve",
      "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) type",
      "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) reason"
    ]
  },
  "(resource) realtime > (model) conversation_item > (schema) > (variant) 6": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeMcpListTools",
      "$ref": "(resource) realtime > (model) realtime_mcp_list_tools > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) server_label",
      "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) tools",
      "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) type",
      "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) id"
    ]
  },
  "(resource) realtime > (model) conversation_item > (schema) > (variant) 7": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeMcpToolCall",
      "$ref": "(resource) realtime > (model) realtime_mcp_tool_call > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) id",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) arguments",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) name",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) server_label",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) type",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) approval_request_id",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) error",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) output"
    ]
  },
  "(resource) realtime > (model) conversation_item > (schema) > (variant) 8": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeMcpApprovalRequest",
      "$ref": "(resource) realtime > (model) realtime_mcp_approval_request > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) id",
      "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) arguments",
      "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) name",
      "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) server_label",
      "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) conversation_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeConversationItem",
    "docstring": "A single item within a Realtime conversation.",
    "ident": "ConversationItem",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItem",
      "types": [
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeConversationItemSystemMessage",
          "$ref": "(resource) realtime > (model) realtime_conversation_item_system_message > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeConversationItemUserMessage",
          "$ref": "(resource) realtime > (model) realtime_conversation_item_user_message > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeConversationItemAssistantMessage",
          "$ref": "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeConversationItemFunctionCall",
          "$ref": "(resource) realtime > (model) realtime_conversation_item_function_call > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeConversationItemFunctionCallOutput",
          "$ref": "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeMcpApprovalResponse",
          "$ref": "(resource) realtime > (model) realtime_mcp_approval_response > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeMcpListTools",
          "$ref": "(resource) realtime > (model) realtime_mcp_list_tools > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeMcpToolCall",
          "$ref": "(resource) realtime > (model) realtime_mcp_tool_call > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeMcpApprovalRequest",
          "$ref": "(resource) realtime > (model) realtime_mcp_approval_request > (schema)"
        }
      ]
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 0",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 1",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 2",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 3",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 4",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 5",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 6",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 7",
      "(resource) realtime > (model) conversation_item > (schema) > (variant) 8"
    ]
  },
  "(resource) realtime > (model) response_output_item_added_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.output_item.added"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) content": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/content",
    "deprecated": false,
    "key": "content",
    "docstring": "The content of the message.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/content",
      "elementType": {
        "kind": "HttpTypeObject",
        "members": [
          {
            "ident": "text"
          },
          {
            "ident": "type"
          }
        ]
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) content > (items) > (property) text",
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) content > (items) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) role": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/role",
    "deprecated": false,
    "key": "role",
    "docstring": "The role of the message sender. Always `system`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/role",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "system"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) role > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the item. Always `message`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "message"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the item. This may be provided by the client or generated by the server.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) object": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/object",
    "deprecated": false,
    "key": "object",
    "docstring": "Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/object",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "realtime.item"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) object > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the item. Has no effect on the conversation.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "completed"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "incomplete"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "in_progress"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) status > (member) 0",
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) status > (member) 1",
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) status > (member) 2"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem",
    "docstring": "A system message in a Realtime conversation can be used to provide additional context or instructions to the model. This is similar but distinct from the instruction prompt provided at the start of a conversation, as system messages can be added at any point in the conversation. For major changes to the conversation's behavior, use instructions, but for smaller updates (e.g. \"the user is now asking about a different topic\"), use system messages.",
    "ident": "RealtimeConversationItemSystemMessage",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "content"
        },
        {
          "ident": "role"
        },
        {
          "ident": "type"
        },
        {
          "ident": "id"
        },
        {
          "ident": "object"
        },
        {
          "ident": "status"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) content",
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) role",
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) type",
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) id",
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) object",
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) status"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/content",
    "deprecated": false,
    "key": "content",
    "docstring": "The content of the message.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/content",
      "elementType": {
        "kind": "HttpTypeObject",
        "members": [
          {
            "ident": "audio"
          },
          {
            "ident": "detail"
          },
          {
            "ident": "image_url"
          },
          {
            "ident": "text"
          },
          {
            "ident": "transcript"
          },
          {
            "ident": "type"
          }
        ]
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) audio",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) detail",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) image_url",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) text",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) transcript",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) role": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/role",
    "deprecated": false,
    "key": "role",
    "docstring": "The role of the message sender. Always `user`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/role",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "user"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) role > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the item. Always `message`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "message"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the item. This may be provided by the client or generated by the server.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) object": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/object",
    "deprecated": false,
    "key": "object",
    "docstring": "Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/object",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "realtime.item"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) object > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the item. Has no effect on the conversation.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "completed"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "incomplete"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "in_progress"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) status > (member) 0",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) status > (member) 1",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) status > (member) 2"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser",
    "docstring": "A user message item in a Realtime conversation.",
    "ident": "RealtimeConversationItemUserMessage",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "content"
        },
        {
          "ident": "role"
        },
        {
          "ident": "type"
        },
        {
          "ident": "id"
        },
        {
          "ident": "object"
        },
        {
          "ident": "status"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) role",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) type",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) id",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) object",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) status"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/content",
    "deprecated": false,
    "key": "content",
    "docstring": "The content of the message.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/content",
      "elementType": {
        "kind": "HttpTypeObject",
        "members": [
          {
            "ident": "audio"
          },
          {
            "ident": "text"
          },
          {
            "ident": "transcript"
          },
          {
            "ident": "type"
          }
        ]
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content > (items) > (property) audio",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content > (items) > (property) text",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content > (items) > (property) transcript",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content > (items) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) role": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/role",
    "deprecated": false,
    "key": "role",
    "docstring": "The role of the message sender. Always `assistant`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/role",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "assistant"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) role > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the item. Always `message`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "message"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the item. This may be provided by the client or generated by the server.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) object": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/object",
    "deprecated": false,
    "key": "object",
    "docstring": "Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/object",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "realtime.item"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) object > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the item. Has no effect on the conversation.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "completed"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "incomplete"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "in_progress"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) status > (member) 0",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) status > (member) 1",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) status > (member) 2"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant",
    "docstring": "An assistant message item in a Realtime conversation.",
    "ident": "RealtimeConversationItemAssistantMessage",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "content"
        },
        {
          "ident": "role"
        },
        {
          "ident": "type"
        },
        {
          "ident": "id"
        },
        {
          "ident": "object"
        },
        {
          "ident": "status"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) role",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) type",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) id",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) object",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) status"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) arguments": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCall/properties/arguments",
    "deprecated": false,
    "key": "arguments",
    "docstring": "The arguments of the function call. This is a JSON-encoded string representing the arguments passed to the function, for example `{\"arg1\": \"value1\", \"arg2\": 42}`.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCall/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The name of the function being called.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCall/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the item. Always `function_call`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCall/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "function_call"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCall/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the item. This may be provided by the client or generated by the server.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) call_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCall/properties/call_id",
    "deprecated": false,
    "key": "call_id",
    "docstring": "The ID of the function call.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) object": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCall/properties/object",
    "deprecated": false,
    "key": "object",
    "docstring": "Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCall/properties/object",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "realtime.item"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) object > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCall/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the item. Has no effect on the conversation.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCall/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "completed"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "incomplete"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "in_progress"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) status > (member) 0",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) status > (member) 1",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) status > (member) 2"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCall",
    "docstring": "A function call item in a Realtime conversation.",
    "ident": "RealtimeConversationItemFunctionCall",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "arguments"
        },
        {
          "ident": "name"
        },
        {
          "ident": "type"
        },
        {
          "ident": "id"
        },
        {
          "ident": "call_id"
        },
        {
          "ident": "object"
        },
        {
          "ident": "status"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) arguments",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) name",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) type",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) id",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) call_id",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) object",
      "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) status"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) call_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCallOutput/properties/call_id",
    "deprecated": false,
    "key": "call_id",
    "docstring": "The ID of the function call this output is for.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) output": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCallOutput/properties/output",
    "deprecated": false,
    "key": "output",
    "docstring": "The output of the function call, this is free text and can contain any information or simply be empty.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCallOutput/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the item. Always `function_call_output`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCallOutput/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "function_call_output"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCallOutput/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the item. This may be provided by the client or generated by the server.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) object": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCallOutput/properties/object",
    "deprecated": false,
    "key": "object",
    "docstring": "Identifier for the API object being returned - always `realtime.item`. Optional when creating a new item.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCallOutput/properties/object",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "realtime.item"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) object > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCallOutput/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the item. Has no effect on the conversation.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCallOutput/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "completed"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "incomplete"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "in_progress"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) status > (member) 0",
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) status > (member) 1",
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) status > (member) 2"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeConversationItemFunctionCallOutput",
    "docstring": "A function call output item in a Realtime conversation.",
    "ident": "RealtimeConversationItemFunctionCallOutput",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "call_id"
        },
        {
          "ident": "output"
        },
        {
          "ident": "type"
        },
        {
          "ident": "id"
        },
        {
          "ident": "object"
        },
        {
          "ident": "status"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) call_id",
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) output",
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) type",
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) id",
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) object",
      "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) status"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPApprovalResponse/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the approval response.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) approval_request_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPApprovalResponse/properties/approval_request_id",
    "deprecated": false,
    "key": "approval_request_id",
    "docstring": "The ID of the approval request being answered.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) approve": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPApprovalResponse/properties/approve",
    "deprecated": false,
    "key": "approve",
    "docstring": "Whether the request was approved.",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPApprovalResponse/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the item. Always `mcp_approval_response`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeMCPApprovalResponse/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "mcp_approval_response"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) reason": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPApprovalResponse/properties/reason",
    "deprecated": false,
    "key": "reason",
    "docstring": "Optional reason for the decision.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_approval_response > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeMCPApprovalResponse",
    "docstring": "A Realtime item responding to an MCP approval request.\n",
    "ident": "RealtimeMcpApprovalResponse",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "approval_request_id"
        },
        {
          "ident": "approve"
        },
        {
          "ident": "type"
        },
        {
          "ident": "reason"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) id",
      "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) approval_request_id",
      "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) approve",
      "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) type",
      "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) reason"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) server_label": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPListTools/properties/server_label",
    "deprecated": false,
    "key": "server_label",
    "docstring": "The label of the MCP server.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) tools": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPListTools/properties/tools",
    "deprecated": false,
    "key": "tools",
    "docstring": "The tools available on the server.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeMCPListTools/properties/tools",
      "elementType": {
        "kind": "HttpTypeObject",
        "members": [
          {
            "ident": "input_schema"
          },
          {
            "ident": "name"
          },
          {
            "ident": "annotations"
          },
          {
            "ident": "description"
          }
        ]
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) tools > (items) > (property) input_schema",
      "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) tools > (items) > (property) name",
      "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) tools > (items) > (property) annotations",
      "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) tools > (items) > (property) description"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPListTools/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the item. Always `mcp_list_tools`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeMCPListTools/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "mcp_list_tools"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPListTools/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the list.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_list_tools > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeMCPListTools",
    "docstring": "A Realtime item listing tools available on an MCP server.\n",
    "ident": "RealtimeMcpListTools",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "server_label"
        },
        {
          "ident": "tools"
        },
        {
          "ident": "type"
        },
        {
          "ident": "id"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) server_label",
      "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) tools",
      "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) type",
      "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) id"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPToolCall/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the tool call.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) arguments": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPToolCall/properties/arguments",
    "deprecated": false,
    "key": "arguments",
    "docstring": "A JSON string of the arguments passed to the tool.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPToolCall/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The name of the tool that was run.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) server_label": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPToolCall/properties/server_label",
    "deprecated": false,
    "key": "server_label",
    "docstring": "The label of the MCP server running the tool.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPToolCall/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the item. Always `mcp_call`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeMCPToolCall/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "mcp_call"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) approval_request_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPToolCall/properties/approval_request_id",
    "deprecated": false,
    "key": "approval_request_id",
    "docstring": "The ID of an associated approval request, if any.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) error": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPToolCall/properties/error",
    "deprecated": false,
    "key": "error",
    "docstring": "The error from the tool call, if any.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeMCPToolCall/properties/error",
      "types": [
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeMcpProtocolError",
          "$ref": "(resource) realtime > (model) realtime_mcp_protocol_error > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeMcpToolExecutionError",
          "$ref": "(resource) realtime > (model) realtime_mcp_tool_execution_error > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeMcphttpError",
          "$ref": "(resource) realtime > (model) realtime_mcphttp_error > (schema)"
        }
      ]
    },
    "optional": true,
    "nullable": true,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) error > (variant) 0",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) error > (variant) 1",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) error > (variant) 2"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) output": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPToolCall/properties/output",
    "deprecated": false,
    "key": "output",
    "docstring": "The output from the tool call.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_tool_call > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeMCPToolCall",
    "docstring": "A Realtime item representing an invocation of a tool on an MCP server.\n",
    "ident": "RealtimeMcpToolCall",
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
          "ident": "name"
        },
        {
          "ident": "server_label"
        },
        {
          "ident": "type"
        },
        {
          "ident": "approval_request_id"
        },
        {
          "ident": "error"
        },
        {
          "ident": "output"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) id",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) arguments",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) name",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) server_label",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) type",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) approval_request_id",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) error",
      "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) output"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPApprovalRequest/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the approval request.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) arguments": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPApprovalRequest/properties/arguments",
    "deprecated": false,
    "key": "arguments",
    "docstring": "A JSON string of arguments for the tool.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPApprovalRequest/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The name of the tool to run.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) server_label": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPApprovalRequest/properties/server_label",
    "deprecated": false,
    "key": "server_label",
    "docstring": "The label of the MCP server making the request.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPApprovalRequest/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the item. Always `mcp_approval_request`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeMCPApprovalRequest/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "mcp_approval_request"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_approval_request > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeMCPApprovalRequest",
    "docstring": "A Realtime item requesting human approval of a tool invocation.\n",
    "ident": "RealtimeMcpApprovalRequest",
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
      "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) id",
      "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) arguments",
      "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) name",
      "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) server_label",
      "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) content > (items) > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/content/items/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "The text content.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) content > (items) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/content/items/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The content type. Always `input_text` for system messages.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageSystem/properties/content/items/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_text"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) content > (items) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) role > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "system"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "message"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) object > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "realtime.item"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "completed"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) status > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "incomplete"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) status > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "in_progress"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) audio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/content/items/properties/audio",
    "deprecated": false,
    "key": "audio",
    "docstring": "Base64-encoded audio bytes (for `input_audio`), these will be parsed as the format specified in the session input audio type configuration. This defaults to PCM 16-bit 24kHz mono if not specified.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) detail": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/content/items/properties/detail",
    "deprecated": false,
    "key": "detail",
    "docstring": "The detail level of the image (for `input_image`). `auto` will default to `high`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/content/items/properties/detail",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "auto"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "low"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "high"
        }
      ]
    },
    "default": "auto",
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) detail > (member) 0",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) detail > (member) 1",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) detail > (member) 2"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) image_url": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/content/items/properties/image_url",
    "deprecated": false,
    "key": "image_url",
    "docstring": "Base64-encoded image bytes (for `input_image`) as a data URI. For example `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...`. Supported formats are PNG and JPEG.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "format": "uri"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/content/items/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "The text content (for `input_text`).",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) transcript": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/content/items/properties/transcript",
    "deprecated": false,
    "key": "transcript",
    "docstring": "Transcript of the audio (for `input_audio`). This is not sent to the model, but will be attached to the message item for reference.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/content/items/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The content type (`input_text`, `input_audio`, or `input_image`).",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageUser/properties/content/items/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_text"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_audio"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_image"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) type > (member) 0",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) type > (member) 1",
      "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) type > (member) 2"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) role > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "user"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "message"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) object > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "realtime.item"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "completed"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) status > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "incomplete"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) status > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "in_progress"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content > (items) > (property) audio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/content/items/properties/audio",
    "deprecated": false,
    "key": "audio",
    "docstring": "Base64-encoded audio bytes, these will be parsed as the format specified in the session output audio type configuration. This defaults to PCM 16-bit 24kHz mono if not specified.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content > (items) > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/content/items/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "The text content.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content > (items) > (property) transcript": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/content/items/properties/transcript",
    "deprecated": false,
    "key": "transcript",
    "docstring": "The transcript of the audio content, this will always be present if the output type is `audio`.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content > (items) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/content/items/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The content type, `output_text` or `output_audio` depending on the session `output_modalities` configuration.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeConversationItemMessageAssistant/properties/content/items/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "output_text"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "output_audio"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content > (items) > (property) type > (member) 0",
      "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content > (items) > (property) type > (member) 1"
    ]
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) role > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "assistant"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "message"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) object > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "realtime.item"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "completed"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) status > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "incomplete"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) status > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "in_progress"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "function_call"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) object > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "realtime.item"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "completed"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) status > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "incomplete"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call > (schema) > (property) status > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "in_progress"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "function_call_output"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) object > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "realtime.item"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "completed"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) status > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "incomplete"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_function_call_output > (schema) > (property) status > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "in_progress"
    }
  },
  "(resource) realtime > (model) realtime_mcp_approval_response > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "mcp_approval_response"
    }
  },
  "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) tools > (items) > (property) input_schema": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPListToolsTool/properties/input_schema",
    "deprecated": false,
    "key": "input_schema",
    "docstring": "The JSON schema describing the tool's input.\n",
    "type": {
      "kind": "HttpTypeUnknown"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "unknown",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) tools > (items) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPListToolsTool/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The name of the tool.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) tools > (items) > (property) annotations": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPListToolsTool/properties/annotations",
    "deprecated": false,
    "key": "annotations",
    "docstring": "Additional annotations about the tool.\n",
    "type": {
      "kind": "HttpTypeUnknown"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "unknown",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) tools > (items) > (property) description": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPListToolsTool/properties/description",
    "deprecated": false,
    "key": "description",
    "docstring": "The description of the tool.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_list_tools > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "mcp_list_tools"
    }
  },
  "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "mcp_call"
    }
  },
  "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) error > (variant) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeMcpProtocolError",
      "$ref": "(resource) realtime > (model) realtime_mcp_protocol_error > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcp_protocol_error > (schema) > (property) code",
      "(resource) realtime > (model) realtime_mcp_protocol_error > (schema) > (property) message",
      "(resource) realtime > (model) realtime_mcp_protocol_error > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) error > (variant) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeMcpToolExecutionError",
      "$ref": "(resource) realtime > (model) realtime_mcp_tool_execution_error > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcp_tool_execution_error > (schema) > (property) message",
      "(resource) realtime > (model) realtime_mcp_tool_execution_error > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_tool_call > (schema) > (property) error > (variant) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeMcphttpError",
      "$ref": "(resource) realtime > (model) realtime_mcphttp_error > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcphttp_error > (schema) > (property) code",
      "(resource) realtime > (model) realtime_mcphttp_error > (schema) > (property) message",
      "(resource) realtime > (model) realtime_mcphttp_error > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_protocol_error > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeMCPProtocolError",
    "ident": "RealtimeMcpProtocolError",
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
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcp_protocol_error > (schema) > (property) code",
      "(resource) realtime > (model) realtime_mcp_protocol_error > (schema) > (property) message",
      "(resource) realtime > (model) realtime_mcp_protocol_error > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_tool_execution_error > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeMCPToolExecutionError",
    "ident": "RealtimeMcpToolExecutionError",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "message"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcp_tool_execution_error > (schema) > (property) message",
      "(resource) realtime > (model) realtime_mcp_tool_execution_error > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_mcphttp_error > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeMCPHTTPError",
    "ident": "RealtimeMcphttpError",
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
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_mcphttp_error > (schema) > (property) code",
      "(resource) realtime > (model) realtime_mcphttp_error > (schema) > (property) message",
      "(resource) realtime > (model) realtime_mcphttp_error > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_approval_request > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "mcp_approval_request"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_system_message > (schema) > (property) content > (items) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_text"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) detail > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) detail > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) detail > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_text"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) type > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_audio"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_user_message > (schema) > (property) content > (items) > (property) type > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_image"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content > (items) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "output_text"
    }
  },
  "(resource) realtime > (model) realtime_conversation_item_assistant_message > (schema) > (property) content > (items) > (property) type > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "output_audio"
    }
  },
  "(resource) realtime > (model) realtime_mcp_protocol_error > (schema) > (property) code": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPProtocolError/properties/code",
    "deprecated": false,
    "key": "code",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_protocol_error > (schema) > (property) message": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPProtocolError/properties/message",
    "deprecated": false,
    "key": "message",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_protocol_error > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPProtocolError/properties/type",
    "deprecated": false,
    "key": "type",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeMCPProtocolError/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "protocol_error"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_mcp_protocol_error > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_tool_execution_error > (schema) > (property) message": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPToolExecutionError/properties/message",
    "deprecated": false,
    "key": "message",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcp_tool_execution_error > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPToolExecutionError/properties/type",
    "deprecated": false,
    "key": "type",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeMCPToolExecutionError/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "tool_execution_error"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_mcp_tool_execution_error > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_mcphttp_error > (schema) > (property) code": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPHTTPError/properties/code",
    "deprecated": false,
    "key": "code",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcphttp_error > (schema) > (property) message": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPHTTPError/properties/message",
    "deprecated": false,
    "key": "message",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_mcphttp_error > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeMCPHTTPError/properties/type",
    "deprecated": false,
    "key": "type",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeMCPHTTPError/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "http_error"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_mcphttp_error > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_mcp_protocol_error > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "protocol_error"
    }
  },
  "(resource) realtime > (model) realtime_mcp_tool_execution_error > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "tool_execution_error"
    }
  },
  "(resource) realtime > (model) realtime_mcphttp_error > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "http_error"
    }
  }
}
```
