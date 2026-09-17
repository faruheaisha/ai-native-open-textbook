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
sourceRel: "api/reference/resources/realtime/client-events.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/client-events.md"
sourceSha256: "e5a80993ba40bb1f036ff2b5a28b932938a9edd0419e361d3019481770cb5e4a"
pageSha256: "63835326e444ad5470d3b1dc8f191667d2d62bac75a434c6767c206db1622c62"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeClientEventResponseCreate`

```json
{
  "(resource) realtime > (model) response_create_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeClientEventResponseCreate",
    "docstring": "This event instructs the server to create a Response, which means triggering \nmodel inference. When in Server VAD mode, the server will create Responses \nautomatically.\n\nA Response will include at least one Item, and may have two, in which case \nthe second will be a function call. These Items will be appended to the \nconversation history by default.\n\nThe server will respond with a `response.created` event, events for Items \nand content created, and finally a `response.done` event to indicate the \nResponse is complete.\n\nThe `response.create` event includes inference configuration like \n`instructions` and `tools`. If these are set, they will override the Session's \nconfiguration for this Response only.\n\nResponses can be created out-of-band of the default Conversation, meaning that they can\nhave arbitrary input, and it's possible to disable writing the output to the Conversation.\nOnly one Response can write to the default Conversation at a time, but otherwise multiple\nResponses can be created in parallel. The `metadata` field is a good way to disambiguate\nmultiple simultaneous Responses.\n\nClients can set `conversation` to `none` to create a Response that does not write to the default\nConversation. Arbitrary input can be provided with the `input` field, which is an array accepting\nraw Items and references to existing Items.\n",
    "ident": "ResponseCreateEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "response"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) response_create_event > (schema) > (property) type",
      "(resource) realtime > (model) response_create_event > (schema) > (property) event_id",
      "(resource) realtime > (model) response_create_event > (schema) > (property) response"
    ]
  },
  "(resource) realtime > (model) response_create_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventResponseCreate/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `response.create`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeClientEventResponseCreate/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "response.create"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) response_create_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) response_create_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventResponseCreate/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "Optional client-generated ID used to identify this event.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "maxLength": 512
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) response_create_event > (schema) > (property) response": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventResponseCreate/properties/response",
    "deprecated": false,
    "key": "response",
    "docstring": "Create a new Realtime response with these parameters",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeResponseCreateParams",
      "$ref": "(resource) realtime > (model) realtime_response_create_params > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_response_create_params",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) audio",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) conversation",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) input",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) instructions",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) max_output_tokens",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) metadata",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) output_modalities",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) parallel_tool_calls",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) prompt",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) reasoning",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tool_choice",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools"
    ]
  },
  "(resource) realtime > (model) response_create_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "response.create"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) audio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/audio",
    "deprecated": false,
    "key": "audio",
    "docstring": "Configuration for audio input and output.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeResponseCreateAudioOutput",
      "$ref": "(resource) realtime > (model) realtime_response_create_audio_output > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_response_create_audio_output",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) conversation": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/conversation",
    "deprecated": false,
    "key": "conversation",
    "docstring": "Controls which conversation the response is added to. Currently supports\n`auto` and `none`, with `auto` as the default value. The `auto` value\nmeans that the contents of the response will be added to the default\nconversation. Set this to `none` to create an out-of-band response which\nwill not add items to default conversation.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/conversation",
      "types": [
        {
          "kind": "HttpTypeString"
        },
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/conversation/oneOf/1",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "auto"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "none"
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
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) conversation > (variant) 0",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) conversation > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) input": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/input",
    "deprecated": false,
    "key": "input",
    "docstring": "Input items to include in the prompt for the model. Using this field\ncreates a new context for this Response instead of using the default\nconversation. An empty array `[]` will clear the context for this Response.\nNote that this can include references to items that previously appeared in the session\nusing their id.\n",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/input",
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
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) instructions": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/instructions",
    "deprecated": false,
    "key": "instructions",
    "docstring": "The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. \"be extremely succinct\", \"act friendly\", \"here are examples of good responses\") and on audio behavior (e.g. \"talk quickly\", \"inject emotion into your voice\", \"laugh frequently\"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.\nNote that the server sets default instructions which will be used if this field is not set and are visible in the `session.created` event at the start of the session.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) max_output_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/max_output_tokens",
    "deprecated": false,
    "key": "max_output_tokens",
    "docstring": "Maximum number of output tokens for a single assistant response,\ninclusive of tool calls. Provide an integer between 1 and 4096 to\nlimit output tokens, or `inf` for the maximum available tokens for a\ngiven model. Defaults to `inf`.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/max_output_tokens",
      "types": [
        {
          "kind": "HttpTypeNumber"
        },
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/max_output_tokens/oneOf/1",
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
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) max_output_tokens > (variant) 0",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) max_output_tokens > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) metadata": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/metadata",
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
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) output_modalities": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/output_modalities",
    "deprecated": false,
    "key": "output_modalities",
    "docstring": "The set of modalities the model used to respond, currently the only possible values are\n`[\\\"audio\\\"]`, `[\\\"text\\\"]`. Audio output always include a text transcript. Setting the\noutput to mode `text` will disable audio output from the model.\n",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/output_modalities",
      "elementType": {
        "kind": "HttpTypeUnion",
        "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/output_modalities/items",
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
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) output_modalities > (items) > (member) 0",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) output_modalities > (items) > (member) 1"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) parallel_tool_calls": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/parallel_tool_calls",
    "deprecated": false,
    "key": "parallel_tool_calls",
    "docstring": "Whether the model may call multiple tools in parallel. Only supported by\nreasoning Realtime models such as `gpt-realtime-2`.\n",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) prompt": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/prompt",
    "deprecated": false,
    "key": "prompt",
    "docstring": "Reference to a prompt template and its variables.\n[Learn more](/api/docs/guides/text?api-mode=responses#version-prompts-in-code).\n",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ResponsePrompt",
      "$ref": "(resource) responses > (model) response_prompt > (schema)"
    },
    "optional": true,
    "nullable": true,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) responses > (model) response_prompt",
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) response_prompt > (schema) > (property) id",
      "(resource) responses > (model) response_prompt > (schema) > (property) variables",
      "(resource) responses > (model) response_prompt > (schema) > (property) version"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) reasoning": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/reasoning",
    "deprecated": false,
    "key": "reasoning",
    "docstring": "Configuration for reasoning-capable Realtime models such as `gpt-realtime-2`.\n",
    "title": "Realtime reasoning configuration",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeReasoning",
      "$ref": "(resource) realtime > (model) realtime_reasoning > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_reasoning",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_reasoning > (schema) > (property) effort"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tool_choice": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/tool_choice",
    "deprecated": false,
    "key": "tool_choice",
    "docstring": "How the model chooses tools. Provide one of the string modes or force a specific\nfunction/MCP tool.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/tool_choice",
      "types": [
        {
          "kind": "HttpTypeReference",
          "ident": "ToolChoiceOptions",
          "$ref": "(resource) responses > (model) tool_choice_options > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "ToolChoiceFunction",
          "$ref": "(resource) responses > (model) tool_choice_function > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "ToolChoiceMcp",
          "$ref": "(resource) responses > (model) tool_choice_mcp > (schema)"
        }
      ]
    },
    "default": "auto",
    "optional": true,
    "nullable": false,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tool_choice > (variant) 0",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tool_choice > (variant) 1",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tool_choice > (variant) 2"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/tools",
    "deprecated": false,
    "key": "tools",
    "docstring": "Tools available to the model.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/tools",
      "elementType": {
        "kind": "HttpTypeUnion",
        "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/tools/items",
        "types": [
          {
            "kind": "HttpTypeReference",
            "ident": "RealtimeFunctionTool",
            "$ref": "(resource) realtime > (model) realtime_function_tool > (schema)"
          },
          {
            "kind": "HttpTypeObject",
            "members": [
              {
                "ident": "server_label"
              },
              {
                "ident": "type"
              },
              {
                "ident": "allowed_callers"
              },
              {
                "ident": "allowed_tools"
              },
              {
                "ident": "authorization"
              },
              {
                "ident": "connector_id"
              },
              {
                "ident": "defer_loading"
              },
              {
                "ident": "headers"
              },
              {
                "ident": "require_approval"
              },
              {
                "ident": "server_description"
              },
              {
                "ident": "server_url"
              },
              {
                "ident": "tunnel_id"
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
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 0",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams",
    "docstring": "Create a new Realtime response with these parameters",
    "ident": "RealtimeResponseCreateParams",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "audio"
        },
        {
          "ident": "conversation"
        },
        {
          "ident": "input"
        },
        {
          "ident": "instructions"
        },
        {
          "ident": "max_output_tokens"
        },
        {
          "ident": "metadata"
        },
        {
          "ident": "output_modalities"
        },
        {
          "ident": "parallel_tool_calls"
        },
        {
          "ident": "prompt"
        },
        {
          "ident": "reasoning"
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
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) audio",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) conversation",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) input",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) instructions",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) max_output_tokens",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) metadata",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) output_modalities",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) parallel_tool_calls",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) prompt",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) reasoning",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tool_choice",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/audio/properties/output",
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
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) format",
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/audio",
    "docstring": "Configuration for audio input and output.",
    "ident": "RealtimeResponseCreateAudioOutput",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "output"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) conversation > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/conversation/oneOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeString"
    },
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) conversation > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/conversation/oneOf/1",
    "docstring": "Controls which conversation the response is added to. Currently supports\n`auto` and `none`, with `auto` as the default value. The `auto` value\nmeans that the contents of the response will be added to the default\nconversation. Set this to `none` to create an out-of-band response which\nwill not add items to default conversation.\n",
    "ident": "UnionMember1",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/conversation/oneOf/1",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "auto"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "none"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) conversation > (variant) 1 > (member) 0",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) conversation > (variant) 1 > (member) 1"
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
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) max_output_tokens > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/max_output_tokens/oneOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) max_output_tokens > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/max_output_tokens/oneOf/1",
    "ident": "UnionMember1",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/max_output_tokens/oneOf/1",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "inf"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) max_output_tokens > (variant) 1 > (member) 0"
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
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) output_modalities > (items) > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "text"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) output_modalities > (items) > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "audio"
    }
  },
  "(resource) responses > (model) response_prompt > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/Prompt/anyOf/0/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique identifier of the prompt template to use.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) responses > (model) response_prompt > (schema) > (property) variables": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/Prompt/anyOf/0/properties/variables",
    "deprecated": false,
    "key": "variables",
    "docstring": "Optional map of values to substitute in for variables in your\nprompt. The substitution values can either be strings, or other\nResponse input types like images or files.\n",
    "title": "Prompt Variables",
    "type": {
      "kind": "HttpTypeReference",
      "oasRef": "#/components/schemas/Prompt/anyOf/0/properties/variables",
      "ident": "Record",
      "typeParameters": [
        {
          "kind": "HttpTypeString"
        },
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/ResponsePromptVariables/anyOf/0/additionalProperties",
          "types": [
            {
              "kind": "HttpTypeString"
            },
            {
              "kind": "HttpTypeReference",
              "ident": "ResponseInputText",
              "$ref": "(resource) responses > (model) response_input_text > (schema)"
            },
            {
              "kind": "HttpTypeReference",
              "ident": "ResponseInputImage",
              "$ref": "(resource) responses > (model) response_input_image > (schema)"
            },
            {
              "kind": "HttpTypeReference",
              "ident": "ResponseInputFile",
              "$ref": "(resource) responses > (model) response_input_file > (schema)"
            }
          ]
        }
      ]
    },
    "optional": true,
    "nullable": true,
    "schemaType": "map",
    "childrenParentSchema": "union",
    "children": [
      "(resource) responses > (model) response_prompt > (schema) > (property) variables > (items) > (variant) 0",
      "(resource) responses > (model) response_prompt > (schema) > (property) variables > (items) > (variant) 1",
      "(resource) responses > (model) response_prompt > (schema) > (property) variables > (items) > (variant) 2",
      "(resource) responses > (model) response_prompt > (schema) > (property) variables > (items) > (variant) 3"
    ]
  },
  "(resource) responses > (model) response_prompt > (schema) > (property) version": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/Prompt/anyOf/0/properties/version",
    "deprecated": false,
    "key": "version",
    "docstring": "Optional version of the prompt template.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) responses > (model) response_prompt > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/Prompt",
    "docstring": "Reference to a prompt template and its variables.\n[Learn more](/api/docs/guides/text?api-mode=responses#version-prompts-in-code).\n",
    "ident": "ResponsePrompt",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "variables"
        },
        {
          "ident": "version"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) response_prompt > (schema) > (property) id",
      "(resource) responses > (model) response_prompt > (schema) > (property) variables",
      "(resource) responses > (model) response_prompt > (schema) > (property) version"
    ]
  },
  "(resource) realtime > (model) realtime_reasoning > (schema) > (property) effort": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeReasoning/properties/effort",
    "deprecated": false,
    "key": "effort",
    "docstring": "Constrains effort on reasoning for reasoning-capable Realtime models such as\n`gpt-realtime-2`.\n",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeReasoningEffort",
      "$ref": "(resource) realtime > (model) realtime_reasoning_effort > (schema)"
    },
    "default": "low",
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) realtime > (model) realtime_reasoning_effort",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 0",
      "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 1",
      "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 2",
      "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 3",
      "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 4"
    ]
  },
  "(resource) realtime > (model) realtime_reasoning > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeReasoning",
    "docstring": "Configuration for reasoning-capable Realtime models such as `gpt-realtime-2`.\n",
    "ident": "RealtimeReasoning",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "effort"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_reasoning > (schema) > (property) effort"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tool_choice > (variant) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ToolChoiceOptions",
      "$ref": "(resource) responses > (model) tool_choice_options > (schema)"
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) responses > (model) tool_choice_options > (schema) > (member) 0",
      "(resource) responses > (model) tool_choice_options > (schema) > (member) 1",
      "(resource) responses > (model) tool_choice_options > (schema) > (member) 2"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tool_choice > (variant) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ToolChoiceFunction",
      "$ref": "(resource) responses > (model) tool_choice_function > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) tool_choice_function > (schema) > (property) name",
      "(resource) responses > (model) tool_choice_function > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tool_choice > (variant) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ToolChoiceMcp",
      "$ref": "(resource) responses > (model) tool_choice_mcp > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) tool_choice_mcp > (schema) > (property) server_label",
      "(resource) responses > (model) tool_choice_mcp > (schema) > (property) type",
      "(resource) responses > (model) tool_choice_mcp > (schema) > (property) name"
    ]
  },
  "(resource) responses > (model) tool_choice_options > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/ToolChoiceOptions",
    "docstring": "Controls which (if any) tool is called by the model.\n\n`none` means the model will not call any tool and instead generates a message.\n\n`auto` means the model can pick between generating a message or calling one or\nmore tools.\n\n`required` means the model must call one or more tools.\n",
    "ident": "ToolChoiceOptions",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/ToolChoiceOptions",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "none"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "auto"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "required"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) responses > (model) tool_choice_options > (schema) > (member) 0",
      "(resource) responses > (model) tool_choice_options > (schema) > (member) 1",
      "(resource) responses > (model) tool_choice_options > (schema) > (member) 2"
    ]
  },
  "(resource) responses > (model) tool_choice_function > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/ToolChoiceFunction",
    "docstring": "Use this option to force the model to call a specific function.\n",
    "ident": "ToolChoiceFunction",
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
      "(resource) responses > (model) tool_choice_function > (schema) > (property) name",
      "(resource) responses > (model) tool_choice_function > (schema) > (property) type"
    ]
  },
  "(resource) responses > (model) tool_choice_mcp > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/ToolChoiceMCP",
    "docstring": "Use this option to force the model to call a specific tool on a remote MCP server.\n",
    "ident": "ToolChoiceMcp",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "server_label"
        },
        {
          "ident": "type"
        },
        {
          "ident": "name"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) tool_choice_mcp > (schema) > (property) server_label",
      "(resource) responses > (model) tool_choice_mcp > (schema) > (property) type",
      "(resource) responses > (model) tool_choice_mcp > (schema) > (property) name"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeFunctionTool",
      "$ref": "(resource) realtime > (model) realtime_function_tool > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_function_tool > (schema) > (property) description",
      "(resource) realtime > (model) realtime_function_tool > (schema) > (property) name",
      "(resource) realtime > (model) realtime_function_tool > (schema) > (property) parameters",
      "(resource) realtime > (model) realtime_function_tool > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/tools/items/oneOf/1",
    "docstring": "Give the model access to additional tools via remote Model Context Protocol\n(MCP) servers. [Learn more about MCP](/api/docs/guides/tools-connectors-mcp).\n",
    "ident": "McpTool",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "server_label"
        },
        {
          "ident": "type"
        },
        {
          "ident": "allowed_callers"
        },
        {
          "ident": "allowed_tools"
        },
        {
          "ident": "authorization"
        },
        {
          "ident": "connector_id"
        },
        {
          "ident": "defer_loading"
        },
        {
          "ident": "headers"
        },
        {
          "ident": "require_approval"
        },
        {
          "ident": "server_description"
        },
        {
          "ident": "server_url"
        },
        {
          "ident": "tunnel_id"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) server_label",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) type",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_callers",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_tools",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) authorization",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) defer_loading",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) headers",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) server_description",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) server_url",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) tunnel_id"
    ]
  },
  "(resource) realtime > (model) realtime_function_tool > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeFunctionTool",
    "ident": "RealtimeFunctionTool",
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
          "ident": "parameters"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_function_tool > (schema) > (property) description",
      "(resource) realtime > (model) realtime_function_tool > (schema) > (property) name",
      "(resource) realtime > (model) realtime_function_tool > (schema) > (property) parameters",
      "(resource) realtime > (model) realtime_function_tool > (schema) > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) format": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/audio/properties/output/properties/format",
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
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/audio/properties/output/properties/voice",
    "deprecated": false,
    "key": "voice",
    "docstring": "The voice the model uses to respond. Supported built-in voices are\n`alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`, `shimmer`, `verse`,\n`marin`, and `cedar`. You may also provide a custom voice object with\nan `id`, for example `{ \"id\": \"voice_1234\" }`. Voice cannot be changed\nduring the session once the model has responded with audio at least once.\nWe recommend `marin` and `cedar` for best quality.\n",
    "title": "Voice",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeResponseCreateParams/properties/audio/properties/output/properties/voice",
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
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "id"
            }
          ]
        }
      ]
    },
    "default": "alloy",
    "optional": true,
    "nullable": false,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 0",
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1",
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 2"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) conversation > (variant) 1 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) conversation > (variant) 1 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "none"
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
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) max_output_tokens > (variant) 1 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "inf"
    }
  },
  "(resource) responses > (model) response_prompt > (schema) > (property) variables > (items) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/ResponsePromptVariables/anyOf/0/additionalProperties/oneOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeString"
    },
    "children": []
  },
  "(resource) responses > (model) response_prompt > (schema) > (property) variables > (items) > (variant) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ResponseInputText",
      "$ref": "(resource) responses > (model) response_input_text > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) response_input_text > (schema) > (property) text",
      "(resource) responses > (model) response_input_text > (schema) > (property) type",
      "(resource) responses > (model) response_input_text > (schema) > (property) prompt_cache_breakpoint"
    ]
  },
  "(resource) responses > (model) response_prompt > (schema) > (property) variables > (items) > (variant) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ResponseInputImage",
      "$ref": "(resource) responses > (model) response_input_image > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) response_input_image > (schema) > (property) detail",
      "(resource) responses > (model) response_input_image > (schema) > (property) type",
      "(resource) responses > (model) response_input_image > (schema) > (property) file_id",
      "(resource) responses > (model) response_input_image > (schema) > (property) image_url",
      "(resource) responses > (model) response_input_image > (schema) > (property) prompt_cache_breakpoint"
    ]
  },
  "(resource) responses > (model) response_prompt > (schema) > (property) variables > (items) > (variant) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ResponseInputFile",
      "$ref": "(resource) responses > (model) response_input_file > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) response_input_file > (schema) > (property) type",
      "(resource) responses > (model) response_input_file > (schema) > (property) detail",
      "(resource) responses > (model) response_input_file > (schema) > (property) file_data",
      "(resource) responses > (model) response_input_file > (schema) > (property) file_id",
      "(resource) responses > (model) response_input_file > (schema) > (property) file_url",
      "(resource) responses > (model) response_input_file > (schema) > (property) filename",
      "(resource) responses > (model) response_input_file > (schema) > (property) prompt_cache_breakpoint"
    ]
  },
  "(resource) responses > (model) response_input_text > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/InputTextContent",
    "docstring": "A text input to the model.",
    "ident": "ResponseInputText",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "text"
        },
        {
          "ident": "type"
        },
        {
          "ident": "prompt_cache_breakpoint"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) response_input_text > (schema) > (property) text",
      "(resource) responses > (model) response_input_text > (schema) > (property) type",
      "(resource) responses > (model) response_input_text > (schema) > (property) prompt_cache_breakpoint"
    ]
  },
  "(resource) responses > (model) response_input_image > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/InputImageContent",
    "docstring": "An image input to the model. Learn about [image inputs](/api/docs/guides/images-vision).",
    "ident": "ResponseInputImage",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "detail"
        },
        {
          "ident": "type"
        },
        {
          "ident": "file_id"
        },
        {
          "ident": "image_url"
        },
        {
          "ident": "prompt_cache_breakpoint"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) response_input_image > (schema) > (property) detail",
      "(resource) responses > (model) response_input_image > (schema) > (property) type",
      "(resource) responses > (model) response_input_image > (schema) > (property) file_id",
      "(resource) responses > (model) response_input_image > (schema) > (property) image_url",
      "(resource) responses > (model) response_input_image > (schema) > (property) prompt_cache_breakpoint"
    ]
  },
  "(resource) responses > (model) response_input_file > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/InputFileContent",
    "docstring": "A file input to the model.",
    "ident": "ResponseInputFile",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        },
        {
          "ident": "detail"
        },
        {
          "ident": "file_data"
        },
        {
          "ident": "file_id"
        },
        {
          "ident": "file_url"
        },
        {
          "ident": "filename"
        },
        {
          "ident": "prompt_cache_breakpoint"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) response_input_file > (schema) > (property) type",
      "(resource) responses > (model) response_input_file > (schema) > (property) detail",
      "(resource) responses > (model) response_input_file > (schema) > (property) file_data",
      "(resource) responses > (model) response_input_file > (schema) > (property) file_id",
      "(resource) responses > (model) response_input_file > (schema) > (property) file_url",
      "(resource) responses > (model) response_input_file > (schema) > (property) filename",
      "(resource) responses > (model) response_input_file > (schema) > (property) prompt_cache_breakpoint"
    ]
  },
  "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "minimal"
    }
  },
  "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "medium"
    }
  },
  "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "xhigh"
    }
  },
  "(resource) realtime > (model) realtime_reasoning_effort > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeReasoningEffort",
    "docstring": "Constrains effort on reasoning for reasoning-capable Realtime models such as\n`gpt-realtime-2`.\n",
    "ident": "RealtimeReasoningEffort",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeReasoningEffort",
      "types": [
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
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 0",
      "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 1",
      "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 2",
      "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 3",
      "(resource) realtime > (model) realtime_reasoning_effort > (schema) > (member) 4"
    ]
  },
  "(resource) responses > (model) tool_choice_options > (schema) > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "none"
    }
  },
  "(resource) responses > (model) tool_choice_options > (schema) > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) responses > (model) tool_choice_options > (schema) > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "required"
    }
  },
  "(resource) responses > (model) tool_choice_function > (schema) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ToolChoiceFunction/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The name of the function to call.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) responses > (model) tool_choice_function > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ToolChoiceFunction/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "For function calling, the type is always `function`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/ToolChoiceFunction/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "function"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) responses > (model) tool_choice_function > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) responses > (model) tool_choice_mcp > (schema) > (property) server_label": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ToolChoiceMCP/properties/server_label",
    "deprecated": false,
    "key": "server_label",
    "docstring": "The label of the MCP server to use.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) responses > (model) tool_choice_mcp > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ToolChoiceMCP/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "For MCP tools, the type is always `mcp`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/ToolChoiceMCP/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "mcp"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) responses > (model) tool_choice_mcp > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) responses > (model) tool_choice_mcp > (schema) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/ToolChoiceMCP/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The name of the tool to call on the server.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_function_tool > (schema) > (property) description": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeFunctionTool/properties/description",
    "deprecated": false,
    "key": "description",
    "docstring": "The description of the function, including guidance on when and how\nto call it, and guidance about what to tell the user when calling\n(if anything).\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_function_tool > (schema) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeFunctionTool/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The name of the function.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_function_tool > (schema) > (property) parameters": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeFunctionTool/properties/parameters",
    "deprecated": false,
    "key": "parameters",
    "docstring": "Parameters of the function in JSON Schema.",
    "type": {
      "kind": "HttpTypeUnknown"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "unknown",
    "children": []
  },
  "(resource) realtime > (model) realtime_function_tool > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeFunctionTool/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the tool, i.e. `function`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeFunctionTool/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "function"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_function_tool > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) server_label": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/server_label",
    "deprecated": false,
    "key": "server_label",
    "docstring": "A label for this MCP server, used to identify it in tool calls.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the MCP tool. Always `mcp`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/MCPTool/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "mcp"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_callers": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/allowed_callers",
    "deprecated": false,
    "key": "allowed_callers",
    "docstring": "The tool invocation context(s).",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/MCPTool/properties/allowed_callers",
      "elementType": {
        "kind": "HttpTypeUnion",
        "oasRef": "#/components/schemas/MCPTool/properties/allowed_callers/anyOf/0/items",
        "types": [
          {
            "kind": "HttpTypeLiteral",
            "literal": "direct"
          },
          {
            "kind": "HttpTypeLiteral",
            "literal": "programmatic"
          }
        ]
      }
    },
    "optional": true,
    "nullable": true,
    "schemaType": "array",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_callers > (items) > (member) 0",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_callers > (items) > (member) 1"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_tools": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/allowed_tools",
    "deprecated": false,
    "key": "allowed_tools",
    "docstring": "List of allowed tool names or a filter object.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/MCPTool/properties/allowed_tools",
      "types": [
        {
          "kind": "HttpTypeArray",
          "oasRef": "#/components/schemas/MCPTool/properties/allowed_tools/anyOf/0/oneOf/0",
          "elementType": {
            "kind": "HttpTypeString"
          }
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "read_only"
            },
            {
              "ident": "tool_names"
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
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_tools > (variant) 0",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_tools > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) authorization": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/authorization",
    "deprecated": false,
    "key": "authorization",
    "docstring": "An OAuth access token that can be used with a remote MCP server, either\nwith a custom MCP server URL or a service connector. Your application\nmust handle the OAuth authorization flow and provide the token here.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/connector_id",
    "deprecated": false,
    "key": "connector_id",
    "docstring": "Identifier for service connectors, like those available in ChatGPT. One of\n`server_url`, `connector_id`, or `tunnel_id` must be provided. Learn more\nabout service connectors [here](/api/docs/guides/tools-connectors-mcp#connectors).\n\nCurrently supported `connector_id` values are:\n\n- Dropbox: `connector_dropbox`\n- Gmail: `connector_gmail`\n- Google Calendar: `connector_googlecalendar`\n- Google Drive: `connector_googledrive`\n- Microsoft Teams: `connector_microsoftteams`\n- Outlook Calendar: `connector_outlookcalendar`\n- Outlook Email: `connector_outlookemail`\n- SharePoint: `connector_sharepoint`\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/MCPTool/properties/connector_id",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "connector_dropbox"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "connector_gmail"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "connector_googlecalendar"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "connector_googledrive"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "connector_microsoftteams"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "connector_outlookcalendar"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "connector_outlookemail"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "connector_sharepoint"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 0",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 1",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 2",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 3",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 4",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 5",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 6",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 7"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) defer_loading": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/defer_loading",
    "deprecated": false,
    "key": "defer_loading",
    "docstring": "Whether this MCP tool is deferred and discovered via tool search.\n",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) headers": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/headers",
    "deprecated": false,
    "key": "headers",
    "docstring": "Optional HTTP headers to send to the MCP server. Use for authentication\nor other purposes.\n",
    "type": {
      "kind": "HttpTypeReference",
      "oasRef": "#/components/schemas/MCPTool/properties/headers",
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
    "optional": true,
    "nullable": true,
    "schemaType": "map",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/require_approval",
    "deprecated": false,
    "key": "require_approval",
    "docstring": "Specify which of the MCP server's tools require approval.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/MCPTool/properties/require_approval",
      "types": [
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "always"
            },
            {
              "ident": "never"
            }
          ]
        },
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/MCPTool/properties/require_approval/anyOf/0/oneOf/1",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "always"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "never"
            }
          ]
        }
      ]
    },
    "default": "always",
    "optional": true,
    "nullable": true,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) server_description": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/server_description",
    "deprecated": false,
    "key": "server_description",
    "docstring": "Optional description of the MCP server, used to provide more context.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) server_url": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/server_url",
    "deprecated": false,
    "key": "server_url",
    "docstring": "The URL for the MCP server. One of `server_url`, `connector_id`, or\n`tunnel_id` must be provided.\n",
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
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) tunnel_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/tunnel_id",
    "deprecated": false,
    "key": "tunnel_id",
    "docstring": "The Secure MCP Tunnel ID to use instead of a direct server URL. One of\n`server_url`, `connector_id`, or `tunnel_id` must be provided.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
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
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/VoiceIdsShared/anyOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeString"
    },
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/VoiceIdsShared/anyOf/1",
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
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 0",
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 1",
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 2",
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 3",
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 4",
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 5",
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 6",
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 7",
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 8",
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 9"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 2": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/VoiceIdsOrCustomVoice/anyOf/1",
    "docstring": "Custom voice reference.",
    "ident": "ID",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 2 > (property) id"
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
  "(resource) responses > (model) response_input_text > (schema) > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputTextContent/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "The text input to the model.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) responses > (model) response_input_text > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputTextContent/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the input item. Always `input_text`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/InputTextContent/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_text"
        }
      ]
    },
    "default": "input_text",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) responses > (model) response_input_text > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) responses > (model) response_input_text > (schema) > (property) prompt_cache_breakpoint": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputTextContent/properties/prompt_cache_breakpoint",
    "deprecated": false,
    "key": "prompt_cache_breakpoint",
    "docstring": "Marks the exact end of a reusable prompt prefix. The breakpoint inherits its TTL from the request's `prompt_cache_options.ttl`; the boundary is not rounded to a token block.",
    "title": "Prompt cache breakpoint",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "mode"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) response_input_text > (schema) > (property) prompt_cache_breakpoint > (property) mode"
    ]
  },
  "(resource) responses > (model) response_input_image > (schema) > (property) detail": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputImageContent/properties/detail",
    "deprecated": false,
    "key": "detail",
    "docstring": "The detail level of the image to be sent to the model. One of `high`, `low`, `auto`, or `original`. Defaults to `auto`.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ImageDetail",
      "$ref": "(resource) responses > (model) image_detail > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) responses > (model) image_detail",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) responses > (model) image_detail > (schema) > (member) 0",
      "(resource) responses > (model) image_detail > (schema) > (member) 1",
      "(resource) responses > (model) image_detail > (schema) > (member) 2",
      "(resource) responses > (model) image_detail > (schema) > (member) 3"
    ]
  },
  "(resource) responses > (model) response_input_image > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputImageContent/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the input item. Always `input_image`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/InputImageContent/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_image"
        }
      ]
    },
    "default": "input_image",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) responses > (model) response_input_image > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) responses > (model) response_input_image > (schema) > (property) file_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputImageContent/properties/file_id",
    "deprecated": false,
    "key": "file_id",
    "docstring": "The ID of the file to be sent to the model.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) responses > (model) response_input_image > (schema) > (property) image_url": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputImageContent/properties/image_url",
    "deprecated": false,
    "key": "image_url",
    "docstring": "The URL of the image to be sent to the model. A fully qualified URL or base64 encoded image in a data URL.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "format": "uri"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) responses > (model) response_input_image > (schema) > (property) prompt_cache_breakpoint": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputImageContent/properties/prompt_cache_breakpoint",
    "deprecated": false,
    "key": "prompt_cache_breakpoint",
    "docstring": "Marks the exact end of a reusable prompt prefix. The breakpoint inherits its TTL from the request's `prompt_cache_options.ttl`; the boundary is not rounded to a token block.",
    "title": "Prompt cache breakpoint",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "mode"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) response_input_image > (schema) > (property) prompt_cache_breakpoint > (property) mode"
    ]
  },
  "(resource) responses > (model) response_input_file > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputFileContent/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the input item. Always `input_file`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/InputFileContent/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_file"
        }
      ]
    },
    "default": "input_file",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) responses > (model) response_input_file > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) responses > (model) response_input_file > (schema) > (property) detail": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputFileContent/properties/detail",
    "deprecated": false,
    "key": "detail",
    "docstring": "The detail level of the file to be sent to the model. Use `auto` to let the system select the detail level; for GPT-5.6 and later models, `auto` uses high-quality rendering, which may increase input token usage. Use `low` for lower-cost rendering, or `high` to render the file at higher quality. Defaults to `auto`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/InputFileContent/properties/detail",
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
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) responses > (model) response_input_file > (schema) > (property) detail > (member) 0",
      "(resource) responses > (model) response_input_file > (schema) > (property) detail > (member) 1",
      "(resource) responses > (model) response_input_file > (schema) > (property) detail > (member) 2"
    ]
  },
  "(resource) responses > (model) response_input_file > (schema) > (property) file_data": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputFileContent/properties/file_data",
    "deprecated": false,
    "key": "file_data",
    "docstring": "The content of the file to be sent to the model.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) responses > (model) response_input_file > (schema) > (property) file_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputFileContent/properties/file_id",
    "deprecated": false,
    "key": "file_id",
    "docstring": "The ID of the file to be sent to the model.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) responses > (model) response_input_file > (schema) > (property) file_url": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputFileContent/properties/file_url",
    "deprecated": false,
    "key": "file_url",
    "docstring": "The URL of the file to be sent to the model.",
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
  "(resource) responses > (model) response_input_file > (schema) > (property) filename": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputFileContent/properties/filename",
    "deprecated": false,
    "key": "filename",
    "docstring": "The name of the file to be sent to the model.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) responses > (model) response_input_file > (schema) > (property) prompt_cache_breakpoint": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/InputFileContent/properties/prompt_cache_breakpoint",
    "deprecated": false,
    "key": "prompt_cache_breakpoint",
    "docstring": "Marks the exact end of a reusable prompt prefix. The breakpoint inherits its TTL from the request's `prompt_cache_options.ttl`; the boundary is not rounded to a token block.",
    "title": "Prompt cache breakpoint",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "mode"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) responses > (model) response_input_file > (schema) > (property) prompt_cache_breakpoint > (property) mode"
    ]
  },
  "(resource) responses > (model) tool_choice_function > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "function"
    }
  },
  "(resource) responses > (model) tool_choice_mcp > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "mcp"
    }
  },
  "(resource) realtime > (model) realtime_function_tool > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "function"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "mcp"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_callers > (items) > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "direct"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_callers > (items) > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "programmatic"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_tools > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/MCPTool/properties/allowed_tools/anyOf/0/oneOf/0",
    "docstring": "A string array of allowed tool names",
    "ident": "McpAllowedTools",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/MCPTool/properties/allowed_tools/anyOf/0/oneOf/0",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_tools > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/MCPTool/properties/allowed_tools/anyOf/0/oneOf/1",
    "docstring": "A filter object to specify which tools are allowed.\n",
    "ident": "McpToolFilter",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "read_only"
        },
        {
          "ident": "tool_names"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_tools > (variant) 1 > (property) read_only",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_tools > (variant) 1 > (property) tool_names"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_dropbox"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_gmail"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_googlecalendar"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_googledrive"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_microsoftteams"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_outlookcalendar"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 6": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_outlookemail"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) connector_id > (member) 7": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_sharepoint"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/MCPTool/properties/require_approval/anyOf/0/oneOf/0",
    "docstring": "Specify which of the MCP server's tools require approval. Can be\n`always`, `never`, or a filter object associated with tools\nthat require approval.\n",
    "ident": "McpToolApprovalFilter",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "always"
        },
        {
          "ident": "never"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0 > (property) always",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0 > (property) never"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/MCPTool/properties/require_approval/anyOf/0/oneOf/1",
    "docstring": "Specify a single approval policy for all tools. One of `always` or\n`never`. When set to `always`, all tools will require approval. When\nset to `never`, all tools will not require approval.\n",
    "ident": "McpToolApprovalSetting",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/MCPTool/properties/require_approval/anyOf/0/oneOf/1",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "always"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "never"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 1 > (member) 0",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 1 > (member) 1"
    ]
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
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "alloy"
    }
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "ash"
    }
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "ballad"
    }
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "coral"
    }
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "echo"
    }
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "sage"
    }
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 6": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "shimmer"
    }
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 7": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "verse"
    }
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 8": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "marin"
    }
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 1 > (member) 9": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "cedar"
    }
  },
  "(resource) realtime > (model) realtime_response_create_audio_output > (schema) > (property) output > (property) voice > (variant) 2 > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/VoiceIdsOrCustomVoice/anyOf/1/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The custom voice ID, e.g. `voice_1234`.",
    "type": {
      "kind": "HttpTypeString"
    },
    "examples": [
      "voice_1234"
    ],
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
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
  "(resource) responses > (model) response_input_text > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_text"
    }
  },
  "(resource) responses > (model) response_input_text > (schema) > (property) prompt_cache_breakpoint > (property) mode": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/PromptCacheBreakpointConfig/properties/mode",
    "deprecated": false,
    "key": "mode",
    "docstring": "The breakpoint mode. Always `explicit`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/PromptCacheBreakpointConfig/properties/mode",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "explicit"
        }
      ]
    },
    "default": "explicit",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) responses > (model) response_input_text > (schema) > (property) prompt_cache_breakpoint > (property) mode > (member) 0"
    ]
  },
  "(resource) responses > (model) image_detail > (schema) > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) responses > (model) image_detail > (schema) > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) responses > (model) image_detail > (schema) > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) responses > (model) image_detail > (schema) > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "original"
    }
  },
  "(resource) responses > (model) image_detail > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/DetailEnum",
    "ident": "ImageDetail",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/DetailEnum",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "low"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "high"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "auto"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "original"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) responses > (model) image_detail > (schema) > (member) 0",
      "(resource) responses > (model) image_detail > (schema) > (member) 1",
      "(resource) responses > (model) image_detail > (schema) > (member) 2",
      "(resource) responses > (model) image_detail > (schema) > (member) 3"
    ]
  },
  "(resource) responses > (model) response_input_image > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_image"
    }
  },
  "(resource) responses > (model) response_input_image > (schema) > (property) prompt_cache_breakpoint > (property) mode": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/PromptCacheBreakpointConfig/properties/mode",
    "deprecated": false,
    "key": "mode",
    "docstring": "The breakpoint mode. Always `explicit`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/PromptCacheBreakpointConfig/properties/mode",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "explicit"
        }
      ]
    },
    "default": "explicit",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) responses > (model) response_input_image > (schema) > (property) prompt_cache_breakpoint > (property) mode > (member) 0"
    ]
  },
  "(resource) responses > (model) response_input_file > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_file"
    }
  },
  "(resource) responses > (model) response_input_file > (schema) > (property) detail > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) responses > (model) response_input_file > (schema) > (property) detail > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) responses > (model) response_input_file > (schema) > (property) detail > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) responses > (model) response_input_file > (schema) > (property) prompt_cache_breakpoint > (property) mode": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/PromptCacheBreakpointConfig/properties/mode",
    "deprecated": false,
    "key": "mode",
    "docstring": "The breakpoint mode. Always `explicit`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/PromptCacheBreakpointConfig/properties/mode",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "explicit"
        }
      ]
    },
    "default": "explicit",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) responses > (model) response_input_file > (schema) > (property) prompt_cache_breakpoint > (property) mode > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_tools > (variant) 1 > (property) read_only": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPToolFilter/properties/read_only",
    "deprecated": false,
    "key": "read_only",
    "docstring": "Indicates whether or not a tool modifies data or is read-only. If an\nMCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),\nit will match this filter.\n",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) allowed_tools > (variant) 1 > (property) tool_names": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPToolFilter/properties/tool_names",
    "deprecated": false,
    "key": "tool_names",
    "docstring": "List of allowed tool names.",
    "title": "MCP allowed tools",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/MCPToolFilter/properties/tool_names",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": true,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0 > (property) always": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/require_approval/anyOf/0/oneOf/0/properties/always",
    "deprecated": false,
    "key": "always",
    "docstring": "A filter object to specify which tools are allowed.\n",
    "title": "MCP tool filter",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "read_only"
        },
        {
          "ident": "tool_names"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0 > (property) always > (property) read_only",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0 > (property) always > (property) tool_names"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0 > (property) never": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPTool/properties/require_approval/anyOf/0/oneOf/0/properties/never",
    "deprecated": false,
    "key": "never",
    "docstring": "A filter object to specify which tools are allowed.\n",
    "title": "MCP tool filter",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "read_only"
        },
        {
          "ident": "tool_names"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0 > (property) never > (property) read_only",
      "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0 > (property) never > (property) tool_names"
    ]
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 1 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "always"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 1 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "never"
    }
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
  },
  "(resource) responses > (model) response_input_text > (schema) > (property) prompt_cache_breakpoint > (property) mode > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "explicit"
    }
  },
  "(resource) responses > (model) response_input_image > (schema) > (property) prompt_cache_breakpoint > (property) mode > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "explicit"
    }
  },
  "(resource) responses > (model) response_input_file > (schema) > (property) prompt_cache_breakpoint > (property) mode > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "explicit"
    }
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0 > (property) always > (property) read_only": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPToolFilter/properties/read_only",
    "deprecated": false,
    "key": "read_only",
    "docstring": "Indicates whether or not a tool modifies data or is read-only. If an\nMCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),\nit will match this filter.\n",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0 > (property) always > (property) tool_names": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPToolFilter/properties/tool_names",
    "deprecated": false,
    "key": "tool_names",
    "docstring": "List of allowed tool names.",
    "title": "MCP allowed tools",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/MCPToolFilter/properties/tool_names",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": true,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0 > (property) never > (property) read_only": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPToolFilter/properties/read_only",
    "deprecated": false,
    "key": "read_only",
    "docstring": "Indicates whether or not a tool modifies data or is read-only. If an\nMCP server is [annotated with `readOnlyHint`](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations-readonlyhint),\nit will match this filter.\n",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) realtime > (model) realtime_response_create_params > (schema) > (property) tools > (items) > (variant) 1 > (property) require_approval > (variant) 0 > (property) never > (property) tool_names": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/MCPToolFilter/properties/tool_names",
    "deprecated": false,
    "key": "tool_names",
    "docstring": "List of allowed tool names.",
    "title": "MCP allowed tools",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/MCPToolFilter/properties/tool_names",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": true,
    "nullable": false,
    "schemaType": "array",
    "children": []
  }
}
```
