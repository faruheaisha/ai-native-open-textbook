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
pageSha256: "fa19daa6c6eb1ad53f6cb2028e9fe0b976b1e4e7415b6e8a53372c65de43a0ff"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeServerEventResponseCreated`

```json
{
  "(resource) realtime > (model) response_created_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseCreated",
    "docstring": "Returned when a new Response is created. The first event of response creation,\nwhere the response is in an initial state of `in_progress`.\n",
    "ident": "ResponseCreatedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "event_id"
        },
        {
          "ident": "response"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) response_created_event > (schema) > (property) event_id",
      "(resource) realtime > (model) response_created_event > (schema) > (property) response",
      "(resource) realtime > (model) response_created_event > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) response_created_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseCreated/properties/event_id",
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
  "(resource) realtime > (model) response_created_event > (schema) > (property) response": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseCreated/properties/response",
    "deprecated": false,
    "key": "response",
    "docstring": "The response resource.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeResponse",
      "$ref": "(resource) realtime > (model) realtime_response > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_response",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response > (schema) > (property) id",
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio",
      "(resource) realtime > (model) realtime_response > (schema) > (property) conversation_id",
      "(resource) realtime > (model) realtime_response > (schema) > (property) max_output_tokens",
      "(resource) realtime > (model) realtime_response > (schema) > (property) metadata",
      "(resource) realtime > (model) realtime_response > (schema) > (property) object",
      "(resource) realtime > (model) realtime_response > (schema) > (property) output",
      "(resource) realtime > (model) realtime_response > (schema) > (property) output_modalities",
      "(resource) realtime > (model) realtime_response > (schema) > (property) status",
      "(resource) realtime > (model) realtime_response > (schema) > (property) status_details",
      "(resource) realtime > (model) realtime_response > (schema) > (property) usage"
    ]
  },
  "(resource) realtime > (model) response_created_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeServerEventResponseCreated/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `response.created`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeServerEventResponseCreated/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.created"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) response_created_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the response, will look like `resp_1234`.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/audio",
    "deprecated": false,
    "key": "audio",
    "docstring": "Configuration for audio output.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "output"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) conversation_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/conversation_id",
    "deprecated": false,
    "key": "conversation_id",
    "docstring": "Which conversation the response is added to, determined by the `conversation`\nfield in the `response.create` event. If `auto`, the response will be added to\nthe default conversation and the value of `conversation_id` will be an id like\n`conv_1234`. If `none`, the response will not be added to any conversation and\nthe value of `conversation_id` will be `null`. If responses are being triggered\nautomatically by VAD the response will be added to the default conversation\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) max_output_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/max_output_tokens",
    "deprecated": false,
    "key": "max_output_tokens",
    "docstring": "Maximum number of output tokens for a single assistant response,\ninclusive of tool calls, that was used in this response.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeResponse/properties/max_output_tokens",
      "types": [
        {
          "kind": "HttpTypeNumber"
        },
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/RealtimeResponse/properties/max_output_tokens/oneOf/1",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "inf"
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
      "(resource) realtime > (model) realtime_response > (schema) > (property) max_output_tokens > (variant) 0",
      "(resource) realtime > (model) realtime_response > (schema) > (property) max_output_tokens > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) metadata": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/metadata",
    "deprecated": false,
    "key": "metadata",
    "docstring": "Set of 16 key-value pairs that can be attached to an object. This can be\nuseful for storing additional information about the object in a structured\nformat, and querying for objects via API or the dashboard.\n\nKeys are strings with a maximum length of 64 characters. Values are strings\nwith a maximum length of 512 characters.\n",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "Metadata",
      "$ref": "(resource) $shared > (model) metadata > (schema)"
    },
    "optional": true,
    "nullable": true,
    "modelImplicit": false,
    "schemaType": "map",
    "modelPath": "(resource) $shared > (model) metadata",
    "children": []
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) object": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/object",
    "deprecated": false,
    "key": "object",
    "docstring": "The object type, must be `realtime.response`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeResponse/properties/object",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "realtime.response"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_response > (schema) > (property) object > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) output": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/output",
    "deprecated": false,
    "key": "output",
    "docstring": "The list of output items generated by the response.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeResponse/properties/output",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "ConversationItem",
        "$ref": "(resource) realtime > (model) conversation_item > (schema)"
      }
    },
    "optional": true,
    "nullable": false,
    "schemaType": "array",
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
  "(resource) realtime > (model) realtime_response > (schema) > (property) output_modalities": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/output_modalities",
    "deprecated": false,
    "key": "output_modalities",
    "docstring": "The set of modalities the model used to respond, currently the only possible values are\n`[\\\"audio\\\"]`, `[\\\"text\\\"]`. Audio output always include a text transcript. Setting the\noutput to mode `text` will disable audio output from the model.\n",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeResponse/properties/output_modalities",
      "elementType": {
        "kind": "HttpTypeUnion",
        "oasRef": "#/components/schemas/RealtimeResponse/properties/output_modalities/items",
        "types": [
          {
            "kind": "HttpTypeLiteral",
            "literal": "text"
          },
          {
            "kind": "HttpTypeLiteral",
            "literal": "audio"
          }
        ]
      }
    },
    "optional": true,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_response > (schema) > (property) output_modalities > (items) > (member) 0",
      "(resource) realtime > (model) realtime_response > (schema) > (property) output_modalities > (items) > (member) 1"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The final status of the response (`completed`, `cancelled`, `failed`, or \n`incomplete`, `in_progress`).\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeResponse/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "completed"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "cancelled"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "failed"
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
      "(resource) realtime > (model) realtime_response > (schema) > (property) status > (member) 0",
      "(resource) realtime > (model) realtime_response > (schema) > (property) status > (member) 1",
      "(resource) realtime > (model) realtime_response > (schema) > (property) status > (member) 2",
      "(resource) realtime > (model) realtime_response > (schema) > (property) status > (member) 3",
      "(resource) realtime > (model) realtime_response > (schema) > (property) status > (member) 4"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) status_details": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/status_details",
    "deprecated": false,
    "key": "status_details",
    "docstring": "Additional details about the status.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeResponseStatus",
      "$ref": "(resource) realtime > (model) realtime_response_status > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_response_status",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) error",
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) reason",
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) usage": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage",
    "deprecated": false,
    "key": "usage",
    "docstring": "Usage statistics for the Response, this will correspond to billing. A \nRealtime API session will maintain a conversation context and append new \nItems to the Conversation, thus output from previous turns (text and \naudio tokens) will become the input for later turns.\n",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeResponseUsage",
      "$ref": "(resource) realtime > (model) realtime_response_usage > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_response_usage",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_usage > (schema) > (property) input_token_details",
      "(resource) realtime > (model) realtime_response_usage > (schema) > (property) input_tokens",
      "(resource) realtime > (model) realtime_response_usage > (schema) > (property) output_token_details",
      "(resource) realtime > (model) realtime_response_usage > (schema) > (property) output_tokens",
      "(resource) realtime > (model) realtime_response_usage > (schema) > (property) total_tokens"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponse",
    "docstring": "The response resource.",
    "ident": "RealtimeResponse",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "audio"
        },
        {
          "ident": "conversation_id"
        },
        {
          "ident": "max_output_tokens"
        },
        {
          "ident": "metadata"
        },
        {
          "ident": "object"
        },
        {
          "ident": "output"
        },
        {
          "ident": "output_modalities"
        },
        {
          "ident": "status"
        },
        {
          "ident": "status_details"
        },
        {
          "ident": "usage"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response > (schema) > (property) id",
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio",
      "(resource) realtime > (model) realtime_response > (schema) > (property) conversation_id",
      "(resource) realtime > (model) realtime_response > (schema) > (property) max_output_tokens",
      "(resource) realtime > (model) realtime_response > (schema) > (property) metadata",
      "(resource) realtime > (model) realtime_response > (schema) > (property) object",
      "(resource) realtime > (model) realtime_response > (schema) > (property) output",
      "(resource) realtime > (model) realtime_response > (schema) > (property) output_modalities",
      "(resource) realtime > (model) realtime_response > (schema) > (property) status",
      "(resource) realtime > (model) realtime_response > (schema) > (property) status_details",
      "(resource) realtime > (model) realtime_response > (schema) > (property) usage"
    ]
  },
  "(resource) realtime > (model) response_created_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.created"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/audio/properties/output",
    "deprecated": false,
    "key": "output",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "format"
        },
        {
          "ident": "voice"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) format",
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) max_output_tokens > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/max_output_tokens/oneOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "children": []
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) max_output_tokens > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/max_output_tokens/oneOf/1",
    "ident": "UnionMember1",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeResponse/properties/max_output_tokens/oneOf/1",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "inf"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_response > (schema) > (property) max_output_tokens > (variant) 1 > (member) 0"
    ]
  },
  "(resource) $shared > (model) metadata > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/Metadata",
    "docstring": "Set of 16 key-value pairs that can be attached to an object. This can be\nuseful for storing additional information about the object in a structured\nformat, and querying for objects via API or the dashboard.\n\nKeys are strings with a maximum length of 64 characters. Values are strings\nwith a maximum length of 512 characters.\n",
    "ident": "Metadata",
    "type": {
      "kind": "HttpTypeReference",
      "oasRef": "#/components/schemas/Metadata",
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
    "children": []
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) object > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "realtime.response"
    }
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
  "(resource) realtime > (model) realtime_response > (schema) > (property) output_modalities > (items) > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "text"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) output_modalities > (items) > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "audio"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "completed"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) status > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "cancelled"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) status > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "failed"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) status > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "incomplete"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) status > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "in_progress"
    }
  },
  "(resource) realtime > (model) realtime_response_status > (schema) > (property) error": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/status_details/properties/error",
    "deprecated": false,
    "key": "error",
    "docstring": "A description of the error that caused the response to fail, \npopulated when the `status` is `failed`.\n",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "code"
        },
        {
          "ident": "type"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) error > (property) code",
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) error > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_response_status > (schema) > (property) reason": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/status_details/properties/reason",
    "deprecated": false,
    "key": "reason",
    "docstring": "The reason the Response did not complete. For a `cancelled` Response,  one of `turn_detected` (the server VAD detected a new start of speech)  or `client_cancelled` (the client sent a cancel event). For an  `incomplete` Response, one of `max_output_tokens` or `content_filter`  (the server-side safety filter activated and cut off the response).\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeResponse/properties/status_details/properties/reason",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "turn_detected"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "client_cancelled"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "max_output_tokens"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "content_filter"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) reason > (member) 0",
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) reason > (member) 1",
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) reason > (member) 2",
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) reason > (member) 3"
    ]
  },
  "(resource) realtime > (model) realtime_response_status > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/status_details/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of error that caused the response to fail, corresponding \nwith the `status` field (`completed`, `cancelled`, `incomplete`, \n`failed`).\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeResponse/properties/status_details/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "completed"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "cancelled"
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
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) type > (member) 0",
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) type > (member) 1",
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) type > (member) 2",
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) type > (member) 3"
    ]
  },
  "(resource) realtime > (model) realtime_response_status > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/status_details",
    "docstring": "Additional details about the status.",
    "ident": "RealtimeResponseStatus",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "error"
        },
        {
          "ident": "reason"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) error",
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) reason",
      "(resource) realtime > (model) realtime_response_status > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_response_usage > (schema) > (property) input_token_details": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/input_token_details",
    "deprecated": false,
    "key": "input_token_details",
    "docstring": "Details about the input tokens used in the Response. Cached tokens are tokens from previous turns in the conversation that are included as context for the current response. Cached tokens here are counted as a subset of input tokens, meaning input tokens will include cached and uncached tokens.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeResponseUsageInputTokenDetails",
      "$ref": "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_response_usage_input_token_details",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) audio_tokens",
      "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) cached_tokens",
      "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) cached_tokens_details",
      "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) image_tokens",
      "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) text_tokens"
    ]
  },
  "(resource) realtime > (model) realtime_response_usage > (schema) > (property) input_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/input_tokens",
    "deprecated": false,
    "key": "input_tokens",
    "docstring": "The number of input tokens used in the Response, including text and \naudio tokens.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_usage > (schema) > (property) output_token_details": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/output_token_details",
    "deprecated": false,
    "key": "output_token_details",
    "docstring": "Details about the output tokens used in the Response.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeResponseUsageOutputTokenDetails",
      "$ref": "(resource) realtime > (model) realtime_response_usage_output_token_details > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_response_usage_output_token_details",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_usage_output_token_details > (schema) > (property) audio_tokens",
      "(resource) realtime > (model) realtime_response_usage_output_token_details > (schema) > (property) text_tokens"
    ]
  },
  "(resource) realtime > (model) realtime_response_usage > (schema) > (property) output_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/output_tokens",
    "deprecated": false,
    "key": "output_tokens",
    "docstring": "The number of output tokens sent in the Response, including text and \naudio tokens.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_usage > (schema) > (property) total_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/total_tokens",
    "deprecated": false,
    "key": "total_tokens",
    "docstring": "The total number of tokens in the Response including input and output \ntext and audio tokens.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_usage > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage",
    "docstring": "Usage statistics for the Response, this will correspond to billing. A \nRealtime API session will maintain a conversation context and append new \nItems to the Conversation, thus output from previous turns (text and \naudio tokens) will become the input for later turns.\n",
    "ident": "RealtimeResponseUsage",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "input_token_details"
        },
        {
          "ident": "input_tokens"
        },
        {
          "ident": "output_token_details"
        },
        {
          "ident": "output_tokens"
        },
        {
          "ident": "total_tokens"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_usage > (schema) > (property) input_token_details",
      "(resource) realtime > (model) realtime_response_usage > (schema) > (property) input_tokens",
      "(resource) realtime > (model) realtime_response_usage > (schema) > (property) output_token_details",
      "(resource) realtime > (model) realtime_response_usage > (schema) > (property) output_tokens",
      "(resource) realtime > (model) realtime_response_usage > (schema) > (property) total_tokens"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) format": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/audio/properties/output/properties/format",
    "deprecated": false,
    "key": "format",
    "docstring": "The format of the output audio.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeAudioFormats",
      "$ref": "(resource) realtime > (model) realtime_audio_formats > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "union",
    "modelPath": "(resource) realtime > (model) realtime_audio_formats",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 1",
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 2"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/audio/properties/output/properties/voice",
    "deprecated": false,
    "key": "voice",
    "docstring": "The voice the model uses to respond. Voice cannot be changed during the\nsession once the model has responded with audio at least once. Current\nvoice options are `alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`,\n`shimmer`, `verse`, `marin`, and `cedar`. We recommend `marin` and `cedar` for\nbest quality.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeResponse/properties/audio/properties/output/properties/voice",
      "types": [
        {
          "kind": "HttpTypeString"
        },
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/VoiceIdsShared/anyOf/1",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "alloy"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "ash"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "ballad"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "coral"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "echo"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "sage"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "shimmer"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "verse"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "marin"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "cedar"
            }
          ]
        }
      ]
    },
    "default": "alloy",
    "examples": [
      "ash"
    ],
    "optional": true,
    "nullable": false,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 0",
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) max_output_tokens > (variant) 1 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "inf"
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
  "(resource) realtime > (model) realtime_response_status > (schema) > (property) error > (property) code": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/status_details/properties/error/properties/code",
    "deprecated": false,
    "key": "code",
    "docstring": "Error code, if any.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_status > (schema) > (property) error > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/status_details/properties/error/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of error.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_status > (schema) > (property) reason > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "turn_detected"
    }
  },
  "(resource) realtime > (model) realtime_response_status > (schema) > (property) reason > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "client_cancelled"
    }
  },
  "(resource) realtime > (model) realtime_response_status > (schema) > (property) reason > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "max_output_tokens"
    }
  },
  "(resource) realtime > (model) realtime_response_status > (schema) > (property) reason > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "content_filter"
    }
  },
  "(resource) realtime > (model) realtime_response_status > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "completed"
    }
  },
  "(resource) realtime > (model) realtime_response_status > (schema) > (property) type > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "cancelled"
    }
  },
  "(resource) realtime > (model) realtime_response_status > (schema) > (property) type > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "failed"
    }
  },
  "(resource) realtime > (model) realtime_response_status > (schema) > (property) type > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "incomplete"
    }
  },
  "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) audio_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/input_token_details/properties/audio_tokens",
    "deprecated": false,
    "key": "audio_tokens",
    "docstring": "The number of audio tokens used as input for the Response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) cached_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/input_token_details/properties/cached_tokens",
    "deprecated": false,
    "key": "cached_tokens",
    "docstring": "The number of cached tokens used as input for the Response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) cached_tokens_details": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/input_token_details/properties/cached_tokens_details",
    "deprecated": false,
    "key": "cached_tokens_details",
    "docstring": "Details about the cached tokens used as input for the Response.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "audio_tokens"
        },
        {
          "ident": "image_tokens"
        },
        {
          "ident": "text_tokens"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) cached_tokens_details > (property) audio_tokens",
      "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) cached_tokens_details > (property) image_tokens",
      "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) cached_tokens_details > (property) text_tokens"
    ]
  },
  "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) image_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/input_token_details/properties/image_tokens",
    "deprecated": false,
    "key": "image_tokens",
    "docstring": "The number of image tokens used as input for the Response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) text_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/input_token_details/properties/text_tokens",
    "deprecated": false,
    "key": "text_tokens",
    "docstring": "The number of text tokens used as input for the Response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/input_token_details",
    "docstring": "Details about the input tokens used in the Response. Cached tokens are tokens from previous turns in the conversation that are included as context for the current response. Cached tokens here are counted as a subset of input tokens, meaning input tokens will include cached and uncached tokens.",
    "ident": "RealtimeResponseUsageInputTokenDetails",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "audio_tokens"
        },
        {
          "ident": "cached_tokens"
        },
        {
          "ident": "cached_tokens_details"
        },
        {
          "ident": "image_tokens"
        },
        {
          "ident": "text_tokens"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) audio_tokens",
      "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) cached_tokens",
      "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) cached_tokens_details",
      "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) image_tokens",
      "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) text_tokens"
    ]
  },
  "(resource) realtime > (model) realtime_response_usage_output_token_details > (schema) > (property) audio_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/output_token_details/properties/audio_tokens",
    "deprecated": false,
    "key": "audio_tokens",
    "docstring": "The number of audio tokens used in the Response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_usage_output_token_details > (schema) > (property) text_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/output_token_details/properties/text_tokens",
    "deprecated": false,
    "key": "text_tokens",
    "docstring": "The number of text tokens used in the Response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_usage_output_token_details > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/output_token_details",
    "docstring": "Details about the output tokens used in the Response.",
    "ident": "RealtimeResponseUsageOutputTokenDetails",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "audio_tokens"
        },
        {
          "ident": "text_tokens"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_usage_output_token_details > (schema) > (property) audio_tokens",
      "(resource) realtime > (model) realtime_response_usage_output_token_details > (schema) > (property) text_tokens"
    ]
  },
  "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeAudioFormats/anyOf/0",
    "docstring": "The PCM audio format. Only a 24kHz sample rate is supported.",
    "ident": "PCMAudio",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "rate"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 0 > (property) rate",
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 0 > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeAudioFormats/anyOf/1",
    "docstring": "The G.711 μ-law format.",
    "ident": "PCMUAudio",
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
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 1 > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 2": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeAudioFormats/anyOf/2",
    "docstring": "The G.711 A-law format.",
    "ident": "PCMAAudio",
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
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 2 > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_audio_formats > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeAudioFormats",
    "docstring": "The PCM audio format. Only a 24kHz sample rate is supported.",
    "ident": "RealtimeAudioFormats",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeAudioFormats",
      "types": [
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "rate"
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
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 1",
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 2"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/VoiceIdsShared/anyOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeString"
    },
    "children": []
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/VoiceIdsShared/anyOf/1",
    "docstring": "The voice the model uses to respond. Voice cannot be changed during the\nsession once the model has responded with audio at least once. Current\nvoice options are `alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`,\n`shimmer`, `verse`, `marin`, and `cedar`. We recommend `marin` and `cedar` for\nbest quality.\n",
    "ident": "UnionMember1",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/VoiceIdsShared/anyOf/1",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "alloy"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "ash"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "ballad"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "coral"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "echo"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "sage"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "shimmer"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "verse"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "marin"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "cedar"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 0",
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 1",
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 2",
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 3",
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 4",
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 5",
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 6",
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 7",
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 8",
      "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 9"
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
  "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) cached_tokens_details > (property) audio_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/input_token_details/properties/cached_tokens_details/properties/audio_tokens",
    "deprecated": false,
    "key": "audio_tokens",
    "docstring": "The number of cached audio tokens used as input for the Response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) cached_tokens_details > (property) image_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/input_token_details/properties/cached_tokens_details/properties/image_tokens",
    "deprecated": false,
    "key": "image_tokens",
    "docstring": "The number of cached image tokens used as input for the Response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_usage_input_token_details > (schema) > (property) cached_tokens_details > (property) text_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponse/properties/usage/properties/input_token_details/properties/cached_tokens_details/properties/text_tokens",
    "deprecated": false,
    "key": "text_tokens",
    "docstring": "The number of cached text tokens used as input for the Response.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 0 > (property) rate": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeAudioFormats/anyOf/0/properties/rate",
    "deprecated": false,
    "key": "rate",
    "docstring": "The sample rate of the audio. Always `24000`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeAudioFormats/anyOf/0/properties/rate",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": 24000
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 0 > (property) rate > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 0 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeAudioFormats/anyOf/0/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The audio format. Always `audio/pcm`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeAudioFormats/anyOf/0/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "audio/pcm"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 0 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeAudioFormats/anyOf/1/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The audio format. Always `audio/pcmu`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeAudioFormats/anyOf/1/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "audio/pcmu"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 2 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeAudioFormats/anyOf/2/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The audio format. Always `audio/pcma`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeAudioFormats/anyOf/2/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "audio/pcma"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 2 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "alloy"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "ash"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "ballad"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "coral"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "echo"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "sage"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 6": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "shimmer"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 7": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "verse"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 8": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "marin"
    }
  },
  "(resource) realtime > (model) realtime_response > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 9": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "cedar"
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
  "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 0 > (property) rate > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": 24000
    }
  },
  "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 0 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "audio/pcm"
    }
  },
  "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "audio/pcmu"
    }
  },
  "(resource) realtime > (model) realtime_audio_formats > (schema) > (variant) 2 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "audio/pcma"
    }
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
