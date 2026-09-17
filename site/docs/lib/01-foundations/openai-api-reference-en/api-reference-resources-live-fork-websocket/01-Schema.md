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
pageSha256: "d3ece513d3bceca3b631b6a323b4ee46f22fb867c5d3f17ae4c8c17674ad48b8"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveForkSessionStartEvent`

```json
{
  "(resource) live > (model) fork_session_start_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveForkSessionStartEvent",
    "docstring": "Start a Live session after connecting to a stored session’s fork WebSocket. Send an empty `session` object to use the stored configuration.",
    "ident": "ForkSessionStartEvent",
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
      "(resource) live > (model) fork_session_start_event > (schema) > (property) session",
      "(resource) live > (model) fork_session_start_event > (schema) > (property) type",
      "(resource) live > (model) fork_session_start_event > (schema) > (property) event_id"
    ]
  },
  "(resource) live > (model) fork_session_start_event > (schema) > (property) session": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveForkSessionStartEvent/properties/session",
    "deprecated": false,
    "key": "session",
    "docstring": "Overrides for a stored session after connecting to the fork WebSocket. An empty object inherits the stored configuration; do not supply a new model. audio.format applies only to the new WebSocket connection. client overrides are only supported for WebRTC forks.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ForkSessionConfig",
      "$ref": "(resource) live > (model) fork_session_config > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) live > (model) fork_session_config",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) fork_session_config > (schema) > (property) audio",
      "(resource) live > (model) fork_session_config > (schema) > (property) client",
      "(resource) live > (model) fork_session_config > (schema) > (property) delegation",
      "(resource) live > (model) fork_session_config > (schema) > (property) store"
    ]
  },
  "(resource) live > (model) fork_session_start_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveForkSessionStartEvent/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The Live client event type. Always `session.start`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveForkSessionStartEvent/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.start"
        }
      ]
    },
    "default": "session.start",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) fork_session_start_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) fork_session_start_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveForkSessionStartEvent/properties/event_id",
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
  "(resource) live > (model) fork_session_config > (schema) > (property) audio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveForkSessionConfigParam/properties/audio",
    "deprecated": false,
    "key": "audio",
    "docstring": "Audio format for a WebSocket fork. WebRTC forks negotiate their audio format and must omit this field.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "format"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) fork_session_config > (schema) > (property) audio > (property) format"
    ]
  },
  "(resource) live > (model) fork_session_config > (schema) > (property) client": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveForkSessionConfigParam/properties/client",
    "deprecated": false,
    "key": "client",
    "docstring": "Frontend data-channel permissions for a WebRTC fork. Omitted permissions inherit the stored values. Not supported for WebSocket forks.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ClientConfig",
      "$ref": "(resource) live > (model) client_config > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) live > (model) client_config",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) client_config > (schema) > (property) data_channel"
    ]
  },
  "(resource) live > (model) fork_session_config > (schema) > (property) delegation": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveForkSessionConfigParam/properties/delegation",
    "deprecated": false,
    "key": "delegation",
    "docstring": "Overrides for the stored session’s Responses backend. Only supported when the stored session already uses Responses delegation; the delegation type cannot change.",
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
    "optional": true,
    "nullable": false,
    "schemaType": "object",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) fork_session_config > (schema) > (property) delegation > (property) type",
      "(resource) live > (model) fork_session_config > (schema) > (property) delegation > (property) responses"
    ]
  },
  "(resource) live > (model) fork_session_config > (schema) > (property) store": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveForkSessionConfigParam/properties/store",
    "deprecated": false,
    "key": "store",
    "docstring": "Whether to store the forked session. Omission inherits the stored session's setting.",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) live > (model) fork_session_config > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveForkSessionConfigParam",
    "docstring": "Overrides for a stored session after connecting to the fork WebSocket. An empty object inherits the stored configuration; do not supply a new model. audio.format applies only to the new WebSocket connection. client overrides are only supported for WebRTC forks.",
    "ident": "ForkSessionConfig",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "audio"
        },
        {
          "ident": "client"
        },
        {
          "ident": "delegation"
        },
        {
          "ident": "store"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) fork_session_config > (schema) > (property) audio",
      "(resource) live > (model) fork_session_config > (schema) > (property) client",
      "(resource) live > (model) fork_session_config > (schema) > (property) delegation",
      "(resource) live > (model) fork_session_config > (schema) > (property) store"
    ]
  },
  "(resource) live > (model) fork_session_start_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.start"
    }
  },
  "(resource) live > (model) fork_session_config > (schema) > (property) audio > (property) format": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveForkAudioParam/properties/format",
    "deprecated": false,
    "key": "format",
    "docstring": "Audio encoding and sample rate for audio sent and received over a Live WebSocket connection. WebRTC and SIP negotiate their media format separately.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "AudioFormat",
      "$ref": "(resource) live > (model) audio_format > (schema)"
    },
    "optional": true,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "union",
    "modelPath": "(resource) live > (model) audio_format",
    "childrenParentSchema": "union",
    "children": [
      "(resource) live > (model) audio_format > (schema) > (variant) 0",
      "(resource) live > (model) audio_format > (schema) > (variant) 1",
      "(resource) live > (model) audio_format > (schema) > (variant) 2"
    ]
  },
  "(resource) live > (model) client_config > (schema) > (property) data_channel": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveClientConfigParam/properties/data_channel",
    "deprecated": false,
    "key": "data_channel",
    "docstring": "Client and server event permissions for the WebRTC frontend data channel.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "DataChannelConfig",
      "$ref": "(resource) live > (model) data_channel_config > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) live > (model) data_channel_config",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) data_channel_config > (schema) > (property) allowed_client_events",
      "(resource) live > (model) data_channel_config > (schema) > (property) allowed_server_events"
    ]
  },
  "(resource) live > (model) client_config > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveClientConfigParam",
    "docstring": "Startup-only capabilities for an untrusted frontend attached to a unified WebRTC session. Trusted sideband connections are unaffected.",
    "ident": "ClientConfig",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "data_channel"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) client_config > (schema) > (property) data_channel"
    ]
  },
  "(resource) live > (model) fork_session_config > (schema) > (property) delegation > (property) type": {
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
      "(resource) live > (model) fork_session_config > (schema) > (property) delegation > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) fork_session_config > (schema) > (property) delegation > (property) responses": {
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
  "(resource) live > (model) audio_format > (schema) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveAudioFormat/oneOf/0",
    "docstring": "Raw, mono 16-bit little-endian PCM audio for a Live WebSocket connection.",
    "ident": "AudioPCM",
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
      "(resource) live > (model) audio_format > (schema) > (variant) 0 > (property) rate",
      "(resource) live > (model) audio_format > (schema) > (variant) 0 > (property) type"
    ]
  },
  "(resource) live > (model) audio_format > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveAudioFormat/oneOf/1",
    "docstring": "Raw, mono G.711 μ-law audio for a Live WebSocket connection.",
    "ident": "AudioPCMU",
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
      "(resource) live > (model) audio_format > (schema) > (variant) 1 > (property) rate",
      "(resource) live > (model) audio_format > (schema) > (variant) 1 > (property) type"
    ]
  },
  "(resource) live > (model) audio_format > (schema) > (variant) 2": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveAudioFormat/oneOf/2",
    "docstring": "Raw, mono G.711 A-law audio for a Live WebSocket connection.",
    "ident": "AudioPCMA",
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
      "(resource) live > (model) audio_format > (schema) > (variant) 2 > (property) rate",
      "(resource) live > (model) audio_format > (schema) > (variant) 2 > (property) type"
    ]
  },
  "(resource) live > (model) audio_format > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveAudioFormat",
    "docstring": "Audio encoding and sample rate for audio sent and received over a Live WebSocket connection. WebRTC and SIP negotiate their media format separately.",
    "ident": "AudioFormat",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveAudioFormat",
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
              "ident": "rate"
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
      "(resource) live > (model) audio_format > (schema) > (variant) 0",
      "(resource) live > (model) audio_format > (schema) > (variant) 1",
      "(resource) live > (model) audio_format > (schema) > (variant) 2"
    ]
  },
  "(resource) live > (model) data_channel_config > (schema) > (property) allowed_client_events": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_client_events",
    "deprecated": false,
    "key": "allowed_client_events",
    "docstring": "Client event types that the frontend data channel may send. Use 'all' to allow every client event; an empty array allows none. Omission preserves the existing allow-all behavior.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_client_events",
      "types": [
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_client_events/oneOf/0",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "all"
            }
          ]
        },
        {
          "kind": "HttpTypeArray",
          "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_client_events/oneOf/1",
          "elementType": {
            "kind": "HttpTypeString"
          }
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) live > (model) data_channel_config > (schema) > (property) allowed_client_events > (variant) 0",
      "(resource) live > (model) data_channel_config > (schema) > (property) allowed_client_events > (variant) 1"
    ]
  },
  "(resource) live > (model) data_channel_config > (schema) > (property) allowed_server_events": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_server_events",
    "deprecated": false,
    "key": "allowed_server_events",
    "docstring": "Server events that may be sent to the frontend data channel. Use 'all' to allow every server event; an empty array allows none. Omission preserves the existing allow-all behavior. Responses events use an object with type 'response.event' and a response_event selector.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_server_events",
      "types": [
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_server_events/oneOf/0",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "all"
            }
          ]
        },
        {
          "kind": "HttpTypeArray",
          "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_server_events/oneOf/1",
          "elementType": {
            "kind": "HttpTypeReference",
            "ident": "ServerEventSelector",
            "$ref": "(resource) live > (model) server_event_selector > (schema)"
          }
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) live > (model) data_channel_config > (schema) > (property) allowed_server_events > (variant) 0",
      "(resource) live > (model) data_channel_config > (schema) > (property) allowed_server_events > (variant) 1"
    ]
  },
  "(resource) live > (model) data_channel_config > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveDataChannelConfigParam",
    "docstring": "Control which Live events an untrusted WebRTC frontend can send and receive over its data channel. These restrictions do not apply to trusted sideband connections.",
    "ident": "DataChannelConfig",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "allowed_client_events"
        },
        {
          "ident": "allowed_server_events"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) data_channel_config > (schema) > (property) allowed_client_events",
      "(resource) live > (model) data_channel_config > (schema) > (property) allowed_server_events"
    ]
  },
  "(resource) live > (model) fork_session_config > (schema) > (property) delegation > (property) type > (member) 0": {
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
  "(resource) live > (model) audio_format > (schema) > (variant) 0 > (property) rate": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionAudioFormatPCMParam/properties/rate",
    "deprecated": false,
    "key": "rate",
    "docstring": "Audio sample rate in hertz. Live WebSocket PCM audio supports 16000 or 24000 Hz.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveSessionAudioFormatPCMParam/properties/rate",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": 16000
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": 24000
        }
      ]
    },
    "constraints": {
      "minimum": 16000,
      "maximum": 24000
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) audio_format > (schema) > (variant) 0 > (property) rate > (member) 0",
      "(resource) live > (model) audio_format > (schema) > (variant) 0 > (property) rate > (member) 1"
    ]
  },
  "(resource) live > (model) audio_format > (schema) > (variant) 0 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionAudioFormatPCMParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The audio encoding. Always `audio/pcm`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveSessionAudioFormatPCMParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "audio/pcm"
        }
      ]
    },
    "default": "audio/pcm",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) audio_format > (schema) > (variant) 0 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) audio_format > (schema) > (variant) 1 > (property) rate": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionAudioFormatPCMUParam/properties/rate",
    "deprecated": false,
    "key": "rate",
    "docstring": "Audio sample rate in hertz. G.711 audio uses 8000 Hz.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "minimum": 8000,
      "maximum": 8000
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) live > (model) audio_format > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionAudioFormatPCMUParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The audio encoding. Always `audio/pcmu`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveSessionAudioFormatPCMUParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "audio/pcmu"
        }
      ]
    },
    "default": "audio/pcmu",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) audio_format > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) audio_format > (schema) > (variant) 2 > (property) rate": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionAudioFormatPCMAParam/properties/rate",
    "deprecated": false,
    "key": "rate",
    "docstring": "Audio sample rate in hertz. G.711 audio uses 8000 Hz.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "minimum": 8000,
      "maximum": 8000
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) live > (model) audio_format > (schema) > (variant) 2 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionAudioFormatPCMAParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The audio encoding. Always `audio/pcma`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveSessionAudioFormatPCMAParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "audio/pcma"
        }
      ]
    },
    "default": "audio/pcma",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) audio_format > (schema) > (variant) 2 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) data_channel_config > (schema) > (property) allowed_client_events > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_client_events/oneOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_client_events/oneOf/0",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "all"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) data_channel_config > (schema) > (property) allowed_client_events > (variant) 0 > (member) 0"
    ]
  },
  "(resource) live > (model) data_channel_config > (schema) > (property) allowed_client_events > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_client_events/oneOf/1",
    "ident": "UnionMember1",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_client_events/oneOf/1",
      "elementType": {
        "kind": "HttpTypeString"
      }
    },
    "children": []
  },
  "(resource) live > (model) data_channel_config > (schema) > (property) allowed_server_events > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_server_events/oneOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_server_events/oneOf/0",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "all"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) data_channel_config > (schema) > (property) allowed_server_events > (variant) 0 > (member) 0"
    ]
  },
  "(resource) live > (model) data_channel_config > (schema) > (property) allowed_server_events > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_server_events/oneOf/1",
    "ident": "UnionMember1",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/LiveDataChannelConfigParam/properties/allowed_server_events/oneOf/1",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "ServerEventSelector",
        "$ref": "(resource) live > (model) server_event_selector > (schema)"
      }
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) server_event_selector > (schema) > (property) type",
      "(resource) live > (model) server_event_selector > (schema) > (property) response_event"
    ]
  },
  "(resource) live > (model) server_event_selector > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveAllowedServerEventParam",
    "docstring": "A Live server event selector for the WebRTC frontend data channel.",
    "ident": "ServerEventSelector",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "type"
        },
        {
          "ident": "response_event"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) server_event_selector > (schema) > (property) type",
      "(resource) live > (model) server_event_selector > (schema) > (property) response_event"
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
  "(resource) live > (model) audio_format > (schema) > (variant) 0 > (property) rate > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": 16000
    }
  },
  "(resource) live > (model) audio_format > (schema) > (variant) 0 > (property) rate > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": 24000
    }
  },
  "(resource) live > (model) audio_format > (schema) > (variant) 0 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "audio/pcm"
    }
  },
  "(resource) live > (model) audio_format > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "audio/pcmu"
    }
  },
  "(resource) live > (model) audio_format > (schema) > (variant) 2 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "audio/pcma"
    }
  },
  "(resource) live > (model) data_channel_config > (schema) > (property) allowed_client_events > (variant) 0 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "all"
    }
  },
  "(resource) live > (model) data_channel_config > (schema) > (property) allowed_server_events > (variant) 0 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "all"
    }
  },
  "(resource) live > (model) server_event_selector > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveAllowedServerEventParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The outer Live server event type. Use 'response.event' for Responses events.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 1,
      "maxLength": 256
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) server_event_selector > (schema) > (property) response_event": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveAllowedServerEventParam/properties/response_event",
    "deprecated": false,
    "key": "response_event",
    "docstring": "The nested Responses event type. Required when type is 'response.event'; forbidden for other event types.",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 1,
      "maxLength": 256
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
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
