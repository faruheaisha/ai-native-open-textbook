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
pageSha256: "c862bfc5df3e62c0c927361cd81fe967af22245b93dcb0d30b22d183552c06c2"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeClientEventSessionUpdate`

```json
{
  "(resource) realtime > (model) session_update_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeClientEventSessionUpdate",
    "docstring": "Send this event to update the session’s configuration.\nThe client may send this event at any time to update any field\nexcept for `voice` and `model`. `voice` can be updated only if there have been no other audio outputs yet.\n\nWhen the server receives a `session.update`, it will respond\nwith a `session.updated` event showing the full, effective configuration.\nOnly the fields that are present in the `session.update` are updated. To clear a field like\n`instructions`, pass an empty string. To clear a field like `tools`, pass an empty array.\nTo clear a field like `turn_detection`, pass `null`.\n",
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
      "(resource) realtime > (model) session_update_event > (schema) > (property) session",
      "(resource) realtime > (model) session_update_event > (schema) > (property) type",
      "(resource) realtime > (model) session_update_event > (schema) > (property) event_id"
    ]
  },
  "(resource) realtime > (model) session_update_event > (schema) > (property) session": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventSessionUpdate/properties/session",
    "deprecated": false,
    "key": "session",
    "docstring": "Update the Realtime session. Choose either a realtime\nsession or a transcription session.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeClientEventSessionUpdate/properties/session",
      "types": [
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeSessionCreateRequest",
          "$ref": "(resource) realtime > (model) realtime_session_create_request > (schema)"
        },
        {
          "kind": "HttpTypeReference",
          "ident": "RealtimeTranscriptionSessionCreateRequest",
          "$ref": "(resource) realtime > (model) realtime_transcription_session_create_request > (schema)"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) session_update_event > (schema) > (property) session > (variant) 0",
      "(resource) realtime > (model) session_update_event > (schema) > (property) session > (variant) 1"
    ]
  },
  "(resource) realtime > (model) session_update_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventSessionUpdate/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `session.update`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeClientEventSessionUpdate/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.update"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) session_update_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) session_update_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventSessionUpdate/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "Optional client-generated ID used to identify this event. This is an arbitrary string that a client may assign. It will be passed back if there is an error with the event, but the corresponding `session.updated` event will not include it.",
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
  "(resource) realtime > (model) session_update_event > (schema) > (property) session > (variant) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeSessionCreateRequest",
      "$ref": "(resource) realtime > (model) realtime_session_create_request > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) type",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) audio",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) include",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) instructions",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) max_output_tokens",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) output_modalities",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) parallel_tool_calls",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) prompt",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) reasoning",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) tool_choice",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) tools",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) tracing",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) truncation"
    ]
  },
  "(resource) realtime > (model) session_update_event > (schema) > (property) session > (variant) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeTranscriptionSessionCreateRequest",
      "$ref": "(resource) realtime > (model) realtime_transcription_session_create_request > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_create_request > (schema) > (property) type",
      "(resource) realtime > (model) realtime_transcription_session_create_request > (schema) > (property) audio",
      "(resource) realtime > (model) realtime_transcription_session_create_request > (schema) > (property) include"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA",
    "docstring": "Realtime session object configuration.",
    "ident": "RealtimeSessionCreateRequest",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        },
        {
          "ident": "audio"
        },
        {
          "ident": "include"
        },
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
        },
        {
          "ident": "tracing"
        },
        {
          "ident": "truncation"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) type",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) audio",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) include",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) instructions",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) max_output_tokens",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) output_modalities",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) parallel_tool_calls",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) prompt",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) reasoning",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) tool_choice",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) tools",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) tracing",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) truncation"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_create_request > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA",
    "docstring": "Realtime transcription session object configuration.",
    "ident": "RealtimeTranscriptionSessionCreateRequest",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        },
        {
          "ident": "audio"
        },
        {
          "ident": "include"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_create_request > (schema) > (property) type",
      "(resource) realtime > (model) realtime_transcription_session_create_request > (schema) > (property) audio",
      "(resource) realtime > (model) realtime_transcription_session_create_request > (schema) > (property) include"
    ]
  },
  "(resource) realtime > (model) session_update_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.update"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of session to create. Always `realtime` for the Realtime API.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "realtime"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) audio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio",
    "deprecated": false,
    "key": "audio",
    "docstring": "Configuration for input and output audio.\n",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeAudioConfig",
      "$ref": "(resource) realtime > (model) realtime_audio_config > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_audio_config",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_audio_config > (schema) > (property) input",
      "(resource) realtime > (model) realtime_audio_config > (schema) > (property) output"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) include": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/include",
    "deprecated": false,
    "key": "include",
    "docstring": "Additional fields to include in server outputs.\n\n`item.input_audio_transcription.logprobs`: Include logprobs for input audio transcription.\n",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/include",
      "elementType": {
        "kind": "HttpTypeUnion",
        "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/include/items",
        "types": [
          {
            "kind": "HttpTypeLiteral",
            "literal": "item.input_audio_transcription.logprobs"
          }
        ]
      }
    },
    "optional": true,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) include > (items) > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) instructions": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/instructions",
    "deprecated": false,
    "key": "instructions",
    "docstring": "The default system instructions (i.e. system message) prepended to model calls. This field allows the client to guide the model on desired responses. The model can be instructed on response content and format, (e.g. \"be extremely succinct\", \"act friendly\", \"here are examples of good responses\") and on audio behavior (e.g. \"talk quickly\", \"inject emotion into your voice\", \"laugh frequently\"). The instructions are not guaranteed to be followed by the model, but they provide guidance to the model on the desired behavior.\n\nNote that the server sets default instructions which will be used if this field is not set and are visible in the `session.created` event at the start of the session.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) max_output_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/max_output_tokens",
    "deprecated": false,
    "key": "max_output_tokens",
    "docstring": "Maximum number of output tokens for a single assistant response,\ninclusive of tool calls. Provide an integer between 1 and 4096 to\nlimit output tokens, or `inf` for the maximum available tokens for a\ngiven model. Defaults to `inf`.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/max_output_tokens",
      "types": [
        {
          "kind": "HttpTypeNumber"
        },
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/max_output_tokens/oneOf/1",
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
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) max_output_tokens > (variant) 0",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) max_output_tokens > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/model",
    "deprecated": false,
    "key": "model",
    "docstring": "The Realtime model used for this session.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/model",
      "types": [
        {
          "kind": "HttpTypeString"
        },
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/model/anyOf/1",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-realtime"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-realtime-1.5"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-realtime-2"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-realtime-2.1"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-realtime-2.1-mini"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-realtime-2025-08-28"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-4o-realtime-preview"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-4o-realtime-preview-2024-10-01"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-4o-realtime-preview-2024-12-17"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-4o-realtime-preview-2025-06-03"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-4o-mini-realtime-preview"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-4o-mini-realtime-preview-2024-12-17"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-realtime-mini"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-realtime-mini-2025-10-06"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-realtime-mini-2025-12-15"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-audio-1.5"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-audio-mini"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-audio-mini-2025-10-06"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-audio-mini-2025-12-15"
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
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 0",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) output_modalities": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/output_modalities",
    "deprecated": false,
    "key": "output_modalities",
    "docstring": "The set of modalities the model can respond with. It defaults to `[\"audio\"]`, indicating\nthat the model will respond with audio plus a transcript. `[\"text\"]` can be used to make\nthe model respond with text only. It is not possible to request both `text` and `audio` at the same time.\n",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/output_modalities",
      "elementType": {
        "kind": "HttpTypeUnion",
        "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/output_modalities/items",
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
    "default": [
      "audio"
    ],
    "optional": true,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) output_modalities > (items) > (member) 0",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) output_modalities > (items) > (member) 1"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) parallel_tool_calls": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/parallel_tool_calls",
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
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) prompt": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/prompt",
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
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) reasoning": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/reasoning",
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
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) tool_choice": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tool_choice",
    "deprecated": false,
    "key": "tool_choice",
    "docstring": "How the model chooses tools. Provide one of the string modes or force a specific\nfunction/MCP tool.\n",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeToolChoiceConfig",
      "$ref": "(resource) realtime > (model) realtime_tool_choice_config > (schema)"
    },
    "default": "auto",
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "union",
    "modelPath": "(resource) realtime > (model) realtime_tool_choice_config",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_tool_choice_config > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_tool_choice_config > (schema) > (variant) 1",
      "(resource) realtime > (model) realtime_tool_choice_config > (schema) > (variant) 2"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) tools": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tools",
    "deprecated": false,
    "key": "tools",
    "docstring": "Tools available to the model.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeToolsConfig",
      "$ref": "(resource) realtime > (model) realtime_tools_config > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "array",
    "modelPath": "(resource) realtime > (model) realtime_tools_config",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) tracing": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tracing",
    "deprecated": false,
    "key": "tracing",
    "docstring": "Realtime API can write session traces to the [Traces Dashboard](https://platform.openai.com/logs?api=traces). Set to null to disable tracing. Once\ntracing is enabled for a session, the configuration cannot be modified.\n\n`auto` will create a trace for the session with default values for the\nworkflow name, group id, and metadata.\n",
    "title": "Tracing Configuration",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeTracingConfig",
      "$ref": "(resource) realtime > (model) realtime_tracing_config > (schema)"
    },
    "optional": true,
    "nullable": true,
    "modelImplicit": false,
    "schemaType": "union",
    "modelPath": "(resource) realtime > (model) realtime_tracing_config",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) truncation": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/truncation",
    "deprecated": false,
    "key": "truncation",
    "docstring": "When the number of tokens in a conversation exceeds the model's input token limit, the conversation be truncated, meaning messages (starting from the oldest) will not be included in the model's context. A 32k context model with 4,096 max output tokens can only include 28,224 tokens in the context before truncation occurs.\n\nClients can configure truncation behavior to truncate with a lower max token limit, which is an effective way to control token usage and cost.\n\nTruncation will reduce the number of cached tokens on the next turn (busting the cache), since messages are dropped from the beginning of the context. However, clients can also configure truncation to retain messages up to a fraction of the maximum context size, which will reduce the need for future truncations and thus improve the cache rate.\n\nTruncation can be disabled entirely, which means the server will never truncate but would instead return an error if the conversation exceeds the model's input token limit.\n",
    "title": "Realtime Truncation Controls",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeTruncation",
      "$ref": "(resource) realtime > (model) realtime_truncation > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "union",
    "modelPath": "(resource) realtime > (model) realtime_truncation",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_create_request > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of session to create. Always `transcription` for transcription sessions.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "transcription"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_create_request > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_create_request > (schema) > (property) audio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/audio",
    "deprecated": false,
    "key": "audio",
    "docstring": "Configuration for input and output audio.\n",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeTranscriptionSessionAudio",
      "$ref": "(resource) realtime > (model) realtime_transcription_session_audio > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_transcription_session_audio",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_audio > (schema) > (property) input"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_create_request > (schema) > (property) include": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/include",
    "deprecated": false,
    "key": "include",
    "docstring": "Additional fields to include in server outputs.\n\n`item.input_audio_transcription.logprobs`: Include logprobs for input audio transcription.\n",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/include",
      "elementType": {
        "kind": "HttpTypeUnion",
        "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/include/items",
        "types": [
          {
            "kind": "HttpTypeLiteral",
            "literal": "item.input_audio_transcription.logprobs"
          }
        ]
      }
    },
    "optional": true,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_create_request > (schema) > (property) include > (items) > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "realtime"
    }
  },
  "(resource) realtime > (model) realtime_audio_config > (schema) > (property) input": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/input",
    "deprecated": false,
    "key": "input",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeAudioConfigInput",
      "$ref": "(resource) realtime > (model) realtime_audio_config_input > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_audio_config_input",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) format",
      "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) noise_reduction",
      "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) transcription",
      "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) turn_detection"
    ]
  },
  "(resource) realtime > (model) realtime_audio_config > (schema) > (property) output": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/output",
    "deprecated": false,
    "key": "output",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeAudioConfigOutput",
      "$ref": "(resource) realtime > (model) realtime_audio_config_output > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_audio_config_output",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) format",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) speed",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice"
    ]
  },
  "(resource) realtime > (model) realtime_audio_config > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio",
    "docstring": "Configuration for input and output audio.\n",
    "ident": "RealtimeAudioConfig",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "input"
        },
        {
          "ident": "output"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_audio_config > (schema) > (property) input",
      "(resource) realtime > (model) realtime_audio_config > (schema) > (property) output"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) include > (items) > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "item.input_audio_transcription.logprobs"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) max_output_tokens > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/max_output_tokens/oneOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "children": []
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) max_output_tokens > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/max_output_tokens/oneOf/1",
    "ident": "UnionMember1",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/max_output_tokens/oneOf/1",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "inf"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) max_output_tokens > (variant) 1 > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/model/anyOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeString"
    },
    "children": []
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/model/anyOf/1",
    "docstring": "The Realtime model used for this session.\n",
    "ident": "UnionMember1",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/model/anyOf/1",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-realtime"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-realtime-1.5"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-realtime-2"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-realtime-2.1"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-realtime-2.1-mini"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-realtime-2025-08-28"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-4o-realtime-preview"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-4o-realtime-preview-2024-10-01"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-4o-realtime-preview-2024-12-17"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-4o-realtime-preview-2025-06-03"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-4o-mini-realtime-preview"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-4o-mini-realtime-preview-2024-12-17"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-realtime-mini"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-realtime-mini-2025-10-06"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-realtime-mini-2025-12-15"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-audio-1.5"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-audio-mini"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-audio-mini-2025-10-06"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-audio-mini-2025-12-15"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 0",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 1",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 2",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 3",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 4",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 5",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 6",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 7",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 8",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 9",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 10",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 11",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 12",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 13",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 14",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 15",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 16",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 17",
      "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 18"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) output_modalities > (items) > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "text"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) output_modalities > (items) > (member) 1": {
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
  "(resource) realtime > (model) realtime_tool_choice_config > (schema) > (variant) 0": {
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
  "(resource) realtime > (model) realtime_tool_choice_config > (schema) > (variant) 1": {
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
  "(resource) realtime > (model) realtime_tool_choice_config > (schema) > (variant) 2": {
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
  "(resource) realtime > (model) realtime_tool_choice_config > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tool_choice",
    "docstring": "How the model chooses tools. Provide one of the string modes or force a specific\nfunction/MCP tool.\n",
    "ident": "RealtimeToolChoiceConfig",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tool_choice",
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
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_tool_choice_config > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_tool_choice_config > (schema) > (variant) 1",
      "(resource) realtime > (model) realtime_tool_choice_config > (schema) > (variant) 2"
    ]
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 0": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tools/items/oneOf/1",
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
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) server_label",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) type",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_callers",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_tools",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) authorization",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) defer_loading",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) headers",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) server_description",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) server_url",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) tunnel_id"
    ]
  },
  "(resource) realtime > (model) realtime_tools_config > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tools",
    "docstring": "Tools available to the model.",
    "ident": "RealtimeToolsConfig",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tools",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "RealtimeToolsConfigUnion",
        "$ref": "(resource) realtime > (model) realtime_tools_config_union > (schema)"
      }
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tracing/oneOf/0",
    "docstring": "Enables tracing and sets default values for tracing configuration options. Always `auto`.\n",
    "ident": "Auto",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tracing/oneOf/0",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "auto"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 0 > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tracing/oneOf/1",
    "docstring": "Granular configuration for tracing.\n",
    "ident": "TracingConfiguration",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "group_id"
        },
        {
          "ident": "metadata"
        },
        {
          "ident": "workflow_name"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 1 > (property) group_id",
      "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 1 > (property) metadata",
      "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 1 > (property) workflow_name"
    ]
  },
  "(resource) realtime > (model) realtime_tracing_config > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tracing",
    "docstring": "Realtime API can write session traces to the [Traces Dashboard](https://platform.openai.com/logs?api=traces). Set to null to disable tracing. Once\ntracing is enabled for a session, the configuration cannot be modified.\n\n`auto` will create a trace for the session with default values for the\nworkflow name, group id, and metadata.\n",
    "ident": "RealtimeTracingConfig",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tracing",
      "types": [
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tracing/oneOf/0",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "auto"
            }
          ]
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "group_id"
            },
            {
              "ident": "metadata"
            },
            {
              "ident": "workflow_name"
            }
          ]
        }
      ]
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeTruncation/oneOf/0",
    "docstring": "The truncation strategy to use for the session. `auto` is the default truncation strategy. `disabled` will disable truncation and emit errors when the conversation exceeds the input token limit.",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeTruncation/oneOf/0",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "auto"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "disabled"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 0 > (member) 0",
      "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 0 > (member) 1"
    ]
  },
  "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeTruncation/oneOf/1",
    "docstring": "Retain a fraction of the conversation tokens when the conversation exceeds the input token limit. This allows you to amortize truncations across multiple turns, which can help improve cached token usage.",
    "ident": "RetentionRatioTruncation",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "retention_ratio"
        },
        {
          "ident": "type"
        },
        {
          "ident": "token_limits"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 1 > (property) retention_ratio",
      "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 1 > (property) type",
      "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 1 > (property) token_limits"
    ]
  },
  "(resource) realtime > (model) realtime_truncation > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeTruncation",
    "docstring": "When the number of tokens in a conversation exceeds the model's input token limit, the conversation be truncated, meaning messages (starting from the oldest) will not be included in the model's context. A 32k context model with 4,096 max output tokens can only include 28,224 tokens in the context before truncation occurs.\n\nClients can configure truncation behavior to truncate with a lower max token limit, which is an effective way to control token usage and cost.\n\nTruncation will reduce the number of cached tokens on the next turn (busting the cache), since messages are dropped from the beginning of the context. However, clients can also configure truncation to retain messages up to a fraction of the maximum context size, which will reduce the need for future truncations and thus improve the cache rate.\n\nTruncation can be disabled entirely, which means the server will never truncate but would instead return an error if the conversation exceeds the model's input token limit.\n",
    "ident": "RealtimeTruncation",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeTruncation",
      "types": [
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/RealtimeTruncation/oneOf/0",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "auto"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "disabled"
            }
          ]
        },
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "retention_ratio"
            },
            {
              "ident": "type"
            },
            {
              "ident": "token_limits"
            }
          ]
        }
      ]
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_create_request > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "transcription"
    }
  },
  "(resource) realtime > (model) realtime_transcription_session_audio > (schema) > (property) input": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/audio/properties/input",
    "deprecated": false,
    "key": "input",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeTranscriptionSessionAudioInput",
      "$ref": "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) realtime_transcription_session_audio_input",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) format",
      "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) noise_reduction",
      "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) transcription",
      "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) turn_detection"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_audio > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/audio",
    "docstring": "Configuration for input and output audio.\n",
    "ident": "RealtimeTranscriptionSessionAudio",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "input"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_audio > (schema) > (property) input"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_create_request > (schema) > (property) include > (items) > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "item.input_audio_transcription.logprobs"
    }
  },
  "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) format": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/input/properties/format",
    "deprecated": false,
    "key": "format",
    "docstring": "The format of the input audio.",
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
  "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) noise_reduction": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/input/properties/noise_reduction",
    "deprecated": false,
    "key": "noise_reduction",
    "docstring": "Configuration for input audio noise reduction. This can be set to `null` to turn off.\nNoise reduction filters audio added to the input audio buffer before it is sent to VAD and the model.\nFiltering the audio can improve VAD and turn detection accuracy (reducing false positives) and model performance by improving perception of the input audio.\n",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
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
      "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) noise_reduction > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) transcription": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/input/properties/transcription",
    "deprecated": false,
    "key": "transcription",
    "docstring": "Configuration for input audio transcription, defaults to off and can be set to `null` to turn off once on. Input audio transcription is not native to the model, since the model consumes audio directly. Transcription runs asynchronously through [the /audio/transcriptions endpoint](/api/reference/resources/audio/subresources/transcriptions/methods/create) and should be treated as guidance of input audio content rather than precisely what the model heard. The client can optionally set the language and prompt for transcription, these offer additional guidance to the transcription service.\n",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AudioTranscription",
      "$ref": "(resource) realtime > (model) audio_transcription > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) audio_transcription",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) audio_transcription > (schema) > (property) delay",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) keywords",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) language",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) languages",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) model",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) prompt"
    ]
  },
  "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) turn_detection": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/input/properties/turn_detection",
    "deprecated": false,
    "key": "turn_detection",
    "docstring": "Configuration for turn detection, ether Server VAD or Semantic VAD. This can be set to `null` to turn off, in which case the client must manually trigger model response.\n\nServer VAD means that the model will detect the start and end of speech based on audio volume and respond at the end of user speech.\n\nSemantic VAD is more advanced and uses a turn detection model (in conjunction with VAD) to semantically estimate whether the user has finished speaking, then dynamically sets a timeout based on this probability. For example, if user audio trails off with \"uhhm\", the model will score a low probability of turn end and wait longer for the user to continue speaking. This can be useful for more natural conversations, but may have a higher latency.\n\nFor `gpt-realtime-whisper` transcription sessions, turn detection must be\nset to `null`; VAD is not supported.\n",
    "title": "Realtime Turn Detection",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeAudioInputTurnDetection",
      "$ref": "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema)"
    },
    "optional": true,
    "nullable": true,
    "modelImplicit": false,
    "schemaType": "union",
    "modelPath": "(resource) realtime > (model) realtime_audio_input_turn_detection",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_audio_config_input > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/input",
    "ident": "RealtimeAudioConfigInput",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "format"
        },
        {
          "ident": "noise_reduction"
        },
        {
          "ident": "transcription"
        },
        {
          "ident": "turn_detection"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) format",
      "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) noise_reduction",
      "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) transcription",
      "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) turn_detection"
    ]
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) format": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/output/properties/format",
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
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) speed": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/output/properties/speed",
    "deprecated": false,
    "key": "speed",
    "docstring": "The speed of the model's spoken response as a multiple of the original speed.\n1.0 is the default speed. 0.25 is the minimum speed. 1.5 is the maximum speed. This value can only be changed in between model turns, not while a response is in progress.\n\nThis parameter is a post-processing adjustment to the audio after it is generated, it's\nalso possible to prompt the model to speak faster or slower.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "minimum": 0.25,
      "maximum": 1.5
    },
    "default": 1,
    "optional": true,
    "nullable": false,
    "schemaType": "number",
    "children": []
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/output/properties/voice",
    "deprecated": false,
    "key": "voice",
    "docstring": "The voice the model uses to respond. Supported built-in voices are\n`alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`, `shimmer`, `verse`,\n`marin`, and `cedar`. You may also provide a custom voice object with\nan `id`, for example `{ \"id\": \"voice_1234\" }`. Voice cannot be changed\nduring the session once the model has responded with audio at least once.\nWe recommend `marin` and `cedar` for best quality.\n",
    "title": "Voice",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/output/properties/voice",
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
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 0",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 2"
    ]
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/output",
    "ident": "RealtimeAudioConfigOutput",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "format"
        },
        {
          "ident": "speed"
        },
        {
          "ident": "voice"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) format",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) speed",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice"
    ]
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) max_output_tokens > (variant) 1 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "inf"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-realtime"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-realtime-1.5"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-realtime-2"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-realtime-2.1"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-realtime-2.1-mini"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-realtime-2025-08-28"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 6": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-4o-realtime-preview"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 7": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-4o-realtime-preview-2024-10-01"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 8": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-4o-realtime-preview-2024-12-17"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 9": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-4o-realtime-preview-2025-06-03"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 10": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-4o-mini-realtime-preview"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 11": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-4o-mini-realtime-preview-2024-12-17"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 12": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-realtime-mini"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 13": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-realtime-mini-2025-10-06"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 14": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-realtime-mini-2025-12-15"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 15": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-audio-1.5"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 16": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-audio-mini"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 17": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-audio-mini-2025-10-06"
    }
  },
  "(resource) realtime > (model) realtime_session_create_request > (schema) > (property) model > (variant) 1 > (member) 18": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-audio-mini-2025-12-15"
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) server_label": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) type": {
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
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_callers": {
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
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_callers > (items) > (member) 0",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_callers > (items) > (member) 1"
    ]
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_tools": {
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
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_tools > (variant) 0",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_tools > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) authorization": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id": {
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
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 0",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 1",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 2",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 3",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 4",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 5",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 6",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 7"
    ]
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) defer_loading": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) headers": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval": {
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
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) server_description": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) server_url": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) tunnel_id": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tools/items",
    "docstring": "Give the model access to additional tools via remote Model Context Protocol\n(MCP) servers. [Learn more about MCP](/api/docs/guides/tools-connectors-mcp).\n",
    "ident": "RealtimeToolsConfigUnion",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tools/items",
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
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 0 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 1 > (property) group_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tracing/oneOf/1/properties/group_id",
    "deprecated": false,
    "key": "group_id",
    "docstring": "The group id to attach to this trace to enable filtering and\ngrouping in the Traces Dashboard.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 1 > (property) metadata": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tracing/oneOf/1/properties/metadata",
    "deprecated": false,
    "key": "metadata",
    "docstring": "The arbitrary metadata to attach to this trace to enable\nfiltering in the Traces Dashboard.\n",
    "type": {
      "kind": "HttpTypeUnknown"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "unknown",
    "children": []
  },
  "(resource) realtime > (model) realtime_tracing_config > (schema) > (variant) 1 > (property) workflow_name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/tracing/oneOf/1/properties/workflow_name",
    "deprecated": false,
    "key": "workflow_name",
    "docstring": "The name of the workflow to attach to this trace. This is used to\nname the trace in the Traces Dashboard.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 0 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 0 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "disabled"
    }
  },
  "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 1 > (property) retention_ratio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTruncation/oneOf/1/properties/retention_ratio",
    "deprecated": false,
    "key": "retention_ratio",
    "docstring": "Fraction of post-instruction conversation tokens to retain (`0.0` - `1.0`) when the conversation exceeds the input token limit. Setting this to `0.8` means that messages will be dropped until 80% of the maximum allowed tokens are used. This helps reduce the frequency of truncations and improve cache rates.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "minimum": 0,
      "maximum": 1
    },
    "optional": false,
    "nullable": false,
    "schemaType": "number",
    "children": []
  },
  "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTruncation/oneOf/1/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "Use retention ratio truncation.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeTruncation/oneOf/1/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "retention_ratio"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 1 > (property) token_limits": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTruncation/oneOf/1/properties/token_limits",
    "deprecated": false,
    "key": "token_limits",
    "docstring": "Optional custom token limits for this truncation strategy. If not provided, the model's default token limits will be used.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "post_instructions"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 1 > (property) token_limits > (property) post_instructions"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) format": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/audio/properties/input/properties/format",
    "deprecated": false,
    "key": "format",
    "docstring": "The PCM audio format. Only a 24kHz sample rate is supported.",
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
  "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) noise_reduction": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/audio/properties/input/properties/noise_reduction",
    "deprecated": false,
    "key": "noise_reduction",
    "docstring": "Configuration for input audio noise reduction. This can be set to `null` to turn off.\nNoise reduction filters audio added to the input audio buffer before it is sent to VAD and the model.\nFiltering the audio can improve VAD and turn detection accuracy (reducing false positives) and model performance by improving perception of the input audio.\n",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
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
      "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) noise_reduction > (property) type"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) transcription": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/audio/properties/input/properties/transcription",
    "deprecated": false,
    "key": "transcription",
    "docstring": "Configuration for input audio transcription, defaults to off and can be set to `null` to turn off once on. Input audio transcription is not native to the model, since the model consumes audio directly. Transcription runs asynchronously through [the /audio/transcriptions endpoint](/api/reference/resources/audio/subresources/transcriptions/methods/create) and should be treated as guidance of input audio content rather than precisely what the model heard. The client can optionally set the language and prompt for transcription, these offer additional guidance to the transcription service.\n",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AudioTranscription",
      "$ref": "(resource) realtime > (model) audio_transcription > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) realtime > (model) audio_transcription",
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) audio_transcription > (schema) > (property) delay",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) keywords",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) language",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) languages",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) model",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) prompt"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) turn_detection": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/audio/properties/input/properties/turn_detection",
    "deprecated": false,
    "key": "turn_detection",
    "docstring": "Configuration for turn detection, ether Server VAD or Semantic VAD. This can be set to `null` to turn off, in which case the client must manually trigger model response.\n\nServer VAD means that the model will detect the start and end of speech based on audio volume and respond at the end of user speech.\n\nSemantic VAD is more advanced and uses a turn detection model (in conjunction with VAD) to semantically estimate whether the user has finished speaking, then dynamically sets a timeout based on this probability. For example, if user audio trails off with \"uhhm\", the model will score a low probability of turn end and wait longer for the user to continue speaking. This can be useful for more natural conversations, but may have a higher latency.\n\nFor `gpt-realtime-whisper` transcription sessions, turn detection must be\nset to `null`; VAD is not supported.\n",
    "title": "Realtime Turn Detection",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "RealtimeTranscriptionSessionAudioInputTurnDetection",
      "$ref": "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema)"
    },
    "optional": true,
    "nullable": true,
    "modelImplicit": false,
    "schemaType": "union",
    "modelPath": "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection",
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/audio/properties/input",
    "ident": "RealtimeTranscriptionSessionAudioInput",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "format"
        },
        {
          "ident": "noise_reduction"
        },
        {
          "ident": "transcription"
        },
        {
          "ident": "turn_detection"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) format",
      "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) noise_reduction",
      "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) transcription",
      "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) turn_detection"
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
  "(resource) realtime > (model) realtime_audio_config_input > (schema) > (property) noise_reduction > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/input/properties/noise_reduction/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "Type of noise reduction. `near_field` is for close-talking microphones such as headphones, `far_field` is for far-field microphones such as laptop or conference room microphones.\n",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "NoiseReductionType",
      "$ref": "(resource) realtime > (model) noise_reduction_type > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) realtime > (model) noise_reduction_type",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) noise_reduction_type > (schema) > (member) 0",
      "(resource) realtime > (model) noise_reduction_type > (schema) > (member) 1"
    ]
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) delay": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AudioTranscription/properties/delay",
    "deprecated": false,
    "key": "delay",
    "docstring": "Controls how long the model waits before emitting transcription text.\nHigher values can improve transcription accuracy at the cost of latency.\nOnly supported with `gpt-realtime-whisper` in GA Realtime sessions.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AudioTranscription/properties/delay",
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
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) audio_transcription > (schema) > (property) delay > (member) 0",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) delay > (member) 1",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) delay > (member) 2",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) delay > (member) 3",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) delay > (member) 4"
    ]
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) keywords": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AudioTranscription/properties/keywords",
    "deprecated": false,
    "key": "keywords",
    "docstring": "Words or phrases to guide transcription of the input audio. Supported by `gpt-transcribe` and `gpt-live-transcribe`.\n",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/AudioTranscription/properties/keywords",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": true,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) language": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AudioTranscription/properties/language",
    "deprecated": false,
    "key": "language",
    "docstring": "The language of the input audio. Supplying the input language in\n[ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (e.g. `en`) format\nwill improve accuracy and latency.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) languages": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AudioTranscription/properties/languages",
    "deprecated": false,
    "key": "languages",
    "docstring": "Possible languages of the input audio, in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format. Supported by `gpt-transcribe` and `gpt-live-transcribe`.\n",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/AudioTranscription/properties/languages",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "optional": true,
    "nullable": false,
    "schemaType": "array",
    "children": []
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) model": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AudioTranscription/properties/model",
    "deprecated": false,
    "key": "model",
    "docstring": "The model to use for transcription. Current options are `whisper-1`, `gpt-transcribe`, `gpt-live-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `gpt-4o-transcribe`, `gpt-4o-transcribe-diarize`, and `gpt-realtime-whisper`. Use `gpt-4o-transcribe-diarize` when you need diarization with speaker labels.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AudioTranscription/properties/model",
      "types": [
        {
          "kind": "HttpTypeString"
        },
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/AudioTranscription/properties/model/anyOf/1",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "whisper-1"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-transcribe"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-live-transcribe"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-4o-mini-transcribe"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-4o-mini-transcribe-2025-12-15"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-4o-transcribe"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-4o-transcribe-diarize"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-realtime-whisper"
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
      "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 0",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1"
    ]
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) prompt": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/AudioTranscription/properties/prompt",
    "deprecated": false,
    "key": "prompt",
    "docstring": "An optional text to guide the model's style or continue a previous audio\nsegment.\nFor `whisper-1`, the [prompt is a list of keywords](/api/docs/guides/speech-to-text#prompting).\nFor `gpt-4o-transcribe` models (excluding `gpt-4o-transcribe-diarize`), the prompt is a free text string, for example \"expect words related to technology\".\nPrompt is not supported with `gpt-realtime-whisper` in GA Realtime sessions.\n",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) audio_transcription > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/AudioTranscription",
    "ident": "AudioTranscription",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "delay"
        },
        {
          "ident": "keywords"
        },
        {
          "ident": "language"
        },
        {
          "ident": "languages"
        },
        {
          "ident": "model"
        },
        {
          "ident": "prompt"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) audio_transcription > (schema) > (property) delay",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) keywords",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) language",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) languages",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) model",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) prompt"
    ]
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0",
    "docstring": "Server-side voice activity detection (VAD) which flips on when user speech is detected and off after a period of silence.",
    "ident": "ServerVad",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        },
        {
          "ident": "create_response"
        },
        {
          "ident": "idle_timeout_ms"
        },
        {
          "ident": "interrupt_response"
        },
        {
          "ident": "prefix_padding_ms"
        },
        {
          "ident": "silence_duration_ms"
        },
        {
          "ident": "threshold"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) type",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) create_response",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) idle_timeout_ms",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) interrupt_response",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) prefix_padding_ms",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) silence_duration_ms",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) threshold"
    ]
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1",
    "docstring": "Server-side semantic turn detection which uses a model to determine when the user has finished speaking.",
    "ident": "SemanticVad",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        },
        {
          "ident": "create_response"
        },
        {
          "ident": "eagerness"
        },
        {
          "ident": "interrupt_response"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) type",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) create_response",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) interrupt_response"
    ]
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/input/properties/turn_detection",
    "docstring": "Configuration for turn detection, ether Server VAD or Semantic VAD. This can be set to `null` to turn off, in which case the client must manually trigger model response.\n\nServer VAD means that the model will detect the start and end of speech based on audio volume and respond at the end of user speech.\n\nSemantic VAD is more advanced and uses a turn detection model (in conjunction with VAD) to semantically estimate whether the user has finished speaking, then dynamically sets a timeout based on this probability. For example, if user audio trails off with \"uhhm\", the model will score a low probability of turn end and wait longer for the user to continue speaking. This can be useful for more natural conversations, but may have a higher latency.\n\nFor `gpt-realtime-whisper` transcription sessions, turn detection must be\nset to `null`; VAD is not supported.\n",
    "ident": "RealtimeAudioInputTurnDetection",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeSessionCreateRequestGA/properties/audio/properties/input/properties/turn_detection",
      "types": [
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "type"
            },
            {
              "ident": "create_response"
            },
            {
              "ident": "idle_timeout_ms"
            },
            {
              "ident": "interrupt_response"
            },
            {
              "ident": "prefix_padding_ms"
            },
            {
              "ident": "silence_duration_ms"
            },
            {
              "ident": "threshold"
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
              "ident": "create_response"
            },
            {
              "ident": "eagerness"
            },
            {
              "ident": "interrupt_response"
            }
          ]
        }
      ]
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1"
    ]
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/VoiceIdsShared/anyOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeString"
    },
    "children": []
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1": {
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
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 0",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 1",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 2",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 3",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 4",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 5",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 6",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 7",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 8",
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 9"
    ]
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 2": {
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
      "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 2 > (property) id"
    ]
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "mcp"
    }
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_callers > (items) > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "direct"
    }
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_callers > (items) > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "programmatic"
    }
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_tools > (variant) 0": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_tools > (variant) 1": {
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
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_tools > (variant) 1 > (property) read_only",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_tools > (variant) 1 > (property) tool_names"
    ]
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_dropbox"
    }
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_gmail"
    }
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_googlecalendar"
    }
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_googledrive"
    }
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_microsoftteams"
    }
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_outlookcalendar"
    }
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 6": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_outlookemail"
    }
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) connector_id > (member) 7": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connector_sharepoint"
    }
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0": {
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
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0 > (property) always",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0 > (property) never"
    ]
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 1": {
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
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 1 > (member) 0",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 1 > (member) 1"
    ]
  },
  "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "retention_ratio"
    }
  },
  "(resource) realtime > (model) realtime_truncation > (schema) > (variant) 1 > (property) token_limits > (property) post_instructions": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTruncation/oneOf/1/properties/token_limits/properties/post_instructions",
    "deprecated": false,
    "key": "post_instructions",
    "docstring": "Maximum tokens allowed in the conversation after instructions (which including tool definitions). For example, setting this to 5,000 would mean that truncation would occur when the conversation exceeds 5,000 tokens after instructions. This cannot be higher than the model's context window size minus the maximum output tokens.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "minimum": 0
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input > (schema) > (property) noise_reduction > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/audio/properties/input/properties/noise_reduction/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "Type of noise reduction. `near_field` is for close-talking microphones such as headphones, `far_field` is for far-field microphones such as laptop or conference room microphones.\n",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "NoiseReductionType",
      "$ref": "(resource) realtime > (model) noise_reduction_type > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "enum",
    "modelPath": "(resource) realtime > (model) noise_reduction_type",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) noise_reduction_type > (schema) > (member) 0",
      "(resource) realtime > (model) noise_reduction_type > (schema) > (member) 1"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0",
    "docstring": "Server-side voice activity detection (VAD) which flips on when user speech is detected and off after a period of silence.",
    "ident": "ServerVad",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        },
        {
          "ident": "create_response"
        },
        {
          "ident": "idle_timeout_ms"
        },
        {
          "ident": "interrupt_response"
        },
        {
          "ident": "prefix_padding_ms"
        },
        {
          "ident": "silence_duration_ms"
        },
        {
          "ident": "threshold"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) type",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) create_response",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) idle_timeout_ms",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) interrupt_response",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) prefix_padding_ms",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) silence_duration_ms",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) threshold"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1",
    "docstring": "Server-side semantic turn detection which uses a model to determine when the user has finished speaking.",
    "ident": "SemanticVad",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        },
        {
          "ident": "create_response"
        },
        {
          "ident": "eagerness"
        },
        {
          "ident": "interrupt_response"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) type",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) create_response",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) interrupt_response"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/audio/properties/input/properties/turn_detection",
    "docstring": "Configuration for turn detection, ether Server VAD or Semantic VAD. This can be set to `null` to turn off, in which case the client must manually trigger model response.\n\nServer VAD means that the model will detect the start and end of speech based on audio volume and respond at the end of user speech.\n\nSemantic VAD is more advanced and uses a turn detection model (in conjunction with VAD) to semantically estimate whether the user has finished speaking, then dynamically sets a timeout based on this probability. For example, if user audio trails off with \"uhhm\", the model will score a low probability of turn end and wait longer for the user to continue speaking. This can be useful for more natural conversations, but may have a higher latency.\n\nFor `gpt-realtime-whisper` transcription sessions, turn detection must be\nset to `null`; VAD is not supported.\n",
    "ident": "RealtimeTranscriptionSessionAudioInputTurnDetection",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeTranscriptionSessionCreateRequestGA/properties/audio/properties/input/properties/turn_detection",
      "types": [
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "type"
            },
            {
              "ident": "create_response"
            },
            {
              "ident": "idle_timeout_ms"
            },
            {
              "ident": "interrupt_response"
            },
            {
              "ident": "prefix_padding_ms"
            },
            {
              "ident": "silence_duration_ms"
            },
            {
              "ident": "threshold"
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
              "ident": "create_response"
            },
            {
              "ident": "eagerness"
            },
            {
              "ident": "interrupt_response"
            }
          ]
        }
      ]
    },
    "childrenParentSchema": "union",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1"
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
  "(resource) realtime > (model) noise_reduction_type > (schema) > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "near_field"
    }
  },
  "(resource) realtime > (model) noise_reduction_type > (schema) > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "far_field"
    }
  },
  "(resource) realtime > (model) noise_reduction_type > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/NoiseReductionType",
    "docstring": "Type of noise reduction. `near_field` is for close-talking microphones such as headphones, `far_field` is for far-field microphones such as laptop or conference room microphones.\n",
    "ident": "NoiseReductionType",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/NoiseReductionType",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "near_field"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "far_field"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) noise_reduction_type > (schema) > (member) 0",
      "(resource) realtime > (model) noise_reduction_type > (schema) > (member) 1"
    ]
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) delay > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "minimal"
    }
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) delay > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) delay > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "medium"
    }
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) delay > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) delay > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "xhigh"
    }
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/AudioTranscription/properties/model/anyOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeString"
    },
    "children": []
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/AudioTranscription/properties/model/anyOf/1",
    "docstring": "The model to use for transcription. Current options are `whisper-1`, `gpt-transcribe`, `gpt-live-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-mini-transcribe-2025-12-15`, `gpt-4o-transcribe`, `gpt-4o-transcribe-diarize`, and `gpt-realtime-whisper`. Use `gpt-4o-transcribe-diarize` when you need diarization with speaker labels.\n",
    "ident": "UnionMember1",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/AudioTranscription/properties/model/anyOf/1",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "whisper-1"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-transcribe"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-live-transcribe"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-4o-mini-transcribe"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-4o-mini-transcribe-2025-12-15"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-4o-transcribe"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-4o-transcribe-diarize"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-realtime-whisper"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 0",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 1",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 2",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 3",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 4",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 5",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 6",
      "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 7"
    ]
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "Type of turn detection, `server_vad` to turn on simple Server VAD.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "server_vad"
        }
      ]
    },
    "default": "server_vad",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) create_response": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/create_response",
    "deprecated": false,
    "key": "create_response",
    "docstring": "Whether or not to automatically generate a response when a VAD stop event occurs. If `interrupt_response` is set to `false` this may fail to create a response if the model is already responding.\n\nIf both `create_response` and `interrupt_response` are set to `false`, the model will never respond automatically but VAD events will still be emitted.\n",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "default": true,
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) idle_timeout_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/idle_timeout_ms",
    "deprecated": false,
    "key": "idle_timeout_ms",
    "docstring": "Optional timeout after which a model response will be triggered automatically. This is\nuseful for situations in which a long pause from the user is unexpected, such as a phone\ncall. The model will effectively prompt the user to continue the conversation based\non the current context.\n\nThe timeout value will be applied after the last model response's audio has finished playing,\ni.e. it's set to the `response.done` time plus audio playback duration.\n\nAn `input_audio_buffer.timeout_triggered` event (plus events\nassociated with the Response) will be emitted when the timeout is reached.\nIdle timeout is currently only supported for `server_vad` mode.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "minimum": 5000,
      "maximum": 30000
    },
    "optional": true,
    "nullable": true,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) interrupt_response": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/interrupt_response",
    "deprecated": false,
    "key": "interrupt_response",
    "docstring": "Whether or not to automatically interrupt (cancel) any ongoing response with output to the default\nconversation (i.e. `conversation` of `auto`) when a VAD start event occurs. If `true` then the response will be cancelled, otherwise it will continue until complete.\n\nIf both `create_response` and `interrupt_response` are set to `false`, the model will never respond automatically but VAD events will still be emitted.\n",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "default": true,
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) prefix_padding_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/prefix_padding_ms",
    "deprecated": false,
    "key": "prefix_padding_ms",
    "docstring": "Used only for `server_vad` mode. Amount of audio to include before the VAD detected speech (in\nmilliseconds). Defaults to 300ms.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) silence_duration_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/silence_duration_ms",
    "deprecated": false,
    "key": "silence_duration_ms",
    "docstring": "Used only for `server_vad` mode. Duration of silence to detect speech stop (in milliseconds). Defaults\nto 500ms. With shorter values the model will respond more quickly,\nbut may jump in on short pauses from the user.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) threshold": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/threshold",
    "deprecated": false,
    "key": "threshold",
    "docstring": "Used only for `server_vad` mode. Activation threshold for VAD (0.0 to 1.0), this defaults to 0.5. A\nhigher threshold will require louder audio to activate the model, and\nthus might perform better in noisy environments.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "number",
    "children": []
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "Type of turn detection, `semantic_vad` to turn on Semantic VAD.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "semantic_vad"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) create_response": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1/properties/create_response",
    "deprecated": false,
    "key": "create_response",
    "docstring": "Whether or not to automatically generate a response when a VAD stop event occurs.\n",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "default": true,
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1/properties/eagerness",
    "deprecated": false,
    "key": "eagerness",
    "docstring": "Used only for `semantic_vad` mode. The eagerness of the model to respond. `low` will wait longer for the user to continue speaking, `high` will respond more quickly. `auto` is the default and is equivalent to `medium`. `low`, `medium`, and `high` have max timeouts of 8s, 4s, and 2s respectively.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1/properties/eagerness",
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
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "auto"
        }
      ]
    },
    "default": "auto",
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 0",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 1",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 2",
      "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 3"
    ]
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) interrupt_response": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1/properties/interrupt_response",
    "deprecated": false,
    "key": "interrupt_response",
    "docstring": "Whether or not to automatically interrupt any ongoing response with output to the default\nconversation (i.e. `conversation` of `auto`) when a VAD start event occurs.\n",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "default": true,
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "alloy"
    }
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "ash"
    }
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "ballad"
    }
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "coral"
    }
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "echo"
    }
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "sage"
    }
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 6": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "shimmer"
    }
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 7": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "verse"
    }
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 8": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "marin"
    }
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 1 > (member) 9": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "cedar"
    }
  },
  "(resource) realtime > (model) realtime_audio_config_output > (schema) > (property) voice > (variant) 2 > (property) id": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_tools > (variant) 1 > (property) read_only": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) allowed_tools > (variant) 1 > (property) tool_names": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0 > (property) always": {
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
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0 > (property) always > (property) read_only",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0 > (property) always > (property) tool_names"
    ]
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0 > (property) never": {
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
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0 > (property) never > (property) read_only",
      "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0 > (property) never > (property) tool_names"
    ]
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 1 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "always"
    }
  },
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 1 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "never"
    }
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "Type of turn detection, `server_vad` to turn on simple Server VAD.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "server_vad"
        }
      ]
    },
    "default": "server_vad",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) create_response": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/create_response",
    "deprecated": false,
    "key": "create_response",
    "docstring": "Whether or not to automatically generate a response when a VAD stop event occurs. If `interrupt_response` is set to `false` this may fail to create a response if the model is already responding.\n\nIf both `create_response` and `interrupt_response` are set to `false`, the model will never respond automatically but VAD events will still be emitted.\n",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "default": true,
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) idle_timeout_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/idle_timeout_ms",
    "deprecated": false,
    "key": "idle_timeout_ms",
    "docstring": "Optional timeout after which a model response will be triggered automatically. This is\nuseful for situations in which a long pause from the user is unexpected, such as a phone\ncall. The model will effectively prompt the user to continue the conversation based\non the current context.\n\nThe timeout value will be applied after the last model response's audio has finished playing,\ni.e. it's set to the `response.done` time plus audio playback duration.\n\nAn `input_audio_buffer.timeout_triggered` event (plus events\nassociated with the Response) will be emitted when the timeout is reached.\nIdle timeout is currently only supported for `server_vad` mode.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "minimum": 5000,
      "maximum": 30000
    },
    "optional": true,
    "nullable": true,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) interrupt_response": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/interrupt_response",
    "deprecated": false,
    "key": "interrupt_response",
    "docstring": "Whether or not to automatically interrupt (cancel) any ongoing response with output to the default\nconversation (i.e. `conversation` of `auto`) when a VAD start event occurs. If `true` then the response will be cancelled, otherwise it will continue until complete.\n\nIf both `create_response` and `interrupt_response` are set to `false`, the model will never respond automatically but VAD events will still be emitted.\n",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "default": true,
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) prefix_padding_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/prefix_padding_ms",
    "deprecated": false,
    "key": "prefix_padding_ms",
    "docstring": "Used only for `server_vad` mode. Amount of audio to include before the VAD detected speech (in\nmilliseconds). Defaults to 300ms.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) silence_duration_ms": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/silence_duration_ms",
    "deprecated": false,
    "key": "silence_duration_ms",
    "docstring": "Used only for `server_vad` mode. Duration of silence to detect speech stop (in milliseconds). Defaults\nto 500ms. With shorter values the model will respond more quickly,\nbut may jump in on short pauses from the user.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) threshold": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/0/properties/threshold",
    "deprecated": false,
    "key": "threshold",
    "docstring": "Used only for `server_vad` mode. Activation threshold for VAD (0.0 to 1.0), this defaults to 0.5. A\nhigher threshold will require louder audio to activate the model, and\nthus might perform better in noisy environments.\n",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "number",
    "children": []
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "Type of turn detection, `semantic_vad` to turn on Semantic VAD.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "semantic_vad"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) create_response": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1/properties/create_response",
    "deprecated": false,
    "key": "create_response",
    "docstring": "Whether or not to automatically generate a response when a VAD stop event occurs.\n",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "default": true,
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1/properties/eagerness",
    "deprecated": false,
    "key": "eagerness",
    "docstring": "Used only for `semantic_vad` mode. The eagerness of the model to respond. `low` will wait longer for the user to continue speaking, `high` will respond more quickly. `auto` is the default and is equivalent to `medium`. `low`, `medium`, and `high` have max timeouts of 8s, 4s, and 2s respectively.\n",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1/properties/eagerness",
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
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "auto"
        }
      ]
    },
    "default": "auto",
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 0",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 1",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 2",
      "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 3"
    ]
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) interrupt_response": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeTurnDetection/anyOf/0/oneOf/1/properties/interrupt_response",
    "deprecated": false,
    "key": "interrupt_response",
    "docstring": "Whether or not to automatically interrupt any ongoing response with output to the default\nconversation (i.e. `conversation` of `auto`) when a VAD start event occurs.\n",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "default": true,
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
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
  "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "whisper-1"
    }
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-transcribe"
    }
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-live-transcribe"
    }
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-4o-mini-transcribe"
    }
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-4o-mini-transcribe-2025-12-15"
    }
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-4o-transcribe"
    }
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 6": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-4o-transcribe-diarize"
    }
  },
  "(resource) realtime > (model) audio_transcription > (schema) > (property) model > (variant) 1 > (member) 7": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-realtime-whisper"
    }
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 0 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "server_vad"
    }
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "semantic_vad"
    }
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "medium"
    }
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) realtime > (model) realtime_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0 > (property) always > (property) read_only": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0 > (property) always > (property) tool_names": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0 > (property) never > (property) read_only": {
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
  "(resource) realtime > (model) realtime_tools_config_union > (schema) > (variant) 1 > (property) require_approval > (variant) 0 > (property) never > (property) tool_names": {
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
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 0 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "server_vad"
    }
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "semantic_vad"
    }
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "medium"
    }
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) realtime > (model) realtime_transcription_session_audio_input_turn_detection > (schema) > (variant) 1 > (property) eagerness > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  }
}
```
