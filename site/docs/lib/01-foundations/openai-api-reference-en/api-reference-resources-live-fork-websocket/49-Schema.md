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
pageSha256: "1bfce31b6e8d23d5d786ea24396ac9aa3228558072dce0dc8f5cd1b05213ad48"
contentMode: "local-full"
zh: ""
---

#### Schema

Schema name: `LiveSessionClosed`

```json
{
  "(resource) live > (model) session_closed_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveSessionClosed",
    "docstring": "Returned after the Live session finishes finalizing, with the close reason, final session snapshot, and cumulative audio usage. A connection closing without this event does not confirm successful finalization.",
    "ident": "SessionClosedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "event_id"
        },
        {
          "ident": "reason"
        },
        {
          "ident": "session"
        },
        {
          "ident": "type"
        },
        {
          "ident": "usage"
        },
        {
          "ident": "client_event_id"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_closed_event > (schema) > (property) event_id",
      "(resource) live > (model) session_closed_event > (schema) > (property) reason",
      "(resource) live > (model) session_closed_event > (schema) > (property) session",
      "(resource) live > (model) session_closed_event > (schema) > (property) type",
      "(resource) live > (model) session_closed_event > (schema) > (property) usage",
      "(resource) live > (model) session_closed_event > (schema) > (property) client_event_id"
    ]
  },
  "(resource) live > (model) session_closed_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionClosed/properties/event_id",
    "deprecated": false,
    "key": "event_id",
    "docstring": "The unique ID of the Live server event.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) session_closed_event > (schema) > (property) reason": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionClosed/properties/reason",
    "deprecated": false,
    "key": "reason",
    "docstring": "Why the Live session ended: `close_requested` for an application close or hangup request, `expired` for the session duration limit, `content` for a safety filter, `remote_hangup` for a graceful remote disconnect, or `connection_lost` for an unexpected primary or upstream disconnection.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveSessionClosed/properties/reason",
      "types": [
        {
          "kind": "HttpTypeUnion",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "close_requested"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "expired"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "content"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "remote_hangup"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "connection_lost"
            }
          ]
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) live > (model) session_closed_event > (schema) > (property) reason > (variant) 0"
    ]
  },
  "(resource) live > (model) session_closed_event > (schema) > (property) session": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionClosed/properties/session",
    "deprecated": false,
    "key": "session",
    "docstring": "The resolved Live session configuration and server-assigned session metadata.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "SessionResource",
      "$ref": "(resource) live > (model) session_resource > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) live > (model) session_resource",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_resource > (schema) > (property) id",
      "(resource) live > (model) session_resource > (schema) > (property) expires_at",
      "(resource) live > (model) session_resource > (schema) > (property) model",
      "(resource) live > (model) session_resource > (schema) > (property) status",
      "(resource) live > (model) session_resource > (schema) > (property) audio",
      "(resource) live > (model) session_resource > (schema) > (property) client",
      "(resource) live > (model) session_resource > (schema) > (property) delegation",
      "(resource) live > (model) session_resource > (schema) > (property) input",
      "(resource) live > (model) session_resource > (schema) > (property) instructions",
      "(resource) live > (model) session_resource > (schema) > (property) store"
    ]
  },
  "(resource) live > (model) session_closed_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionClosed/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, always `session.closed`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveSessionClosed/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "session.closed"
        }
      ]
    },
    "default": "session.closed",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) session_closed_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) session_closed_event > (schema) > (property) usage": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionClosed/properties/usage",
    "deprecated": false,
    "key": "usage",
    "docstring": "The final cumulative Live audio usage after session finalization.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "SessionUsage",
      "$ref": "(resource) live > (model) session_usage > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) live > (model) session_usage",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_usage > (schema) > (property) seconds"
    ]
  },
  "(resource) live > (model) session_closed_event > (schema) > (property) client_event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionClosed/properties/client_event_id",
    "deprecated": false,
    "key": "client_event_id",
    "docstring": "The event_id of the client command associated with this server event, when supplied.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) session_closed_event > (schema) > (property) reason > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "docstring": "Why the Live session ended: `close_requested` for an application close or hangup request, `expired` for the session duration limit, `content` for a safety filter, `remote_hangup` for a graceful remote disconnect, or `connection_lost` for an unexpected primary or upstream disconnection.",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeUnion",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "close_requested"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "expired"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "content"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "remote_hangup"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "connection_lost"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) session_closed_event > (schema) > (property) reason > (variant) 0 > (member) 0",
      "(resource) live > (model) session_closed_event > (schema) > (property) reason > (variant) 0 > (member) 1",
      "(resource) live > (model) session_closed_event > (schema) > (property) reason > (variant) 0 > (member) 2",
      "(resource) live > (model) session_closed_event > (schema) > (property) reason > (variant) 0 > (member) 3",
      "(resource) live > (model) session_closed_event > (schema) > (property) reason > (variant) 0 > (member) 4"
    ]
  },
  "(resource) live > (model) session_resource > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The unique ID of the Live session. Use this ID for sideband connections, forking, and recording download.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) session_resource > (schema) > (property) expires_at": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/expires_at",
    "deprecated": false,
    "key": "expires_at",
    "docstring": "The Unix timestamp, in seconds, at which the Live session expires.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) live > (model) session_resource > (schema) > (property) model": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/model",
    "deprecated": false,
    "key": "model",
    "docstring": "The Live model. Required in the session configuration for every transport; do not pass it as a URL query parameter.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/model",
      "types": [
        {
          "kind": "HttpTypeString"
        },
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/ModelIdsLive/anyOf/1",
          "types": [
            {
              "kind": "HttpTypeLiteral",
              "literal": "gpt-live-1"
            }
          ]
        }
      ]
    },
    "examples": [
      "gpt-live-1"
    ],
    "optional": false,
    "nullable": false,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) live > (model) session_resource > (schema) > (property) model > (variant) 0",
      "(resource) live > (model) session_resource > (schema) > (property) model > (variant) 1"
    ]
  },
  "(resource) live > (model) session_resource > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The status of the session snapshot. Always `active`, including the final snapshot in session.closed; use the event type to determine that the session has closed.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "active"
        }
      ]
    },
    "default": "active",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) session_resource > (schema) > (property) status > (member) 0"
    ]
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/audio",
    "deprecated": false,
    "key": "audio",
    "docstring": "Startup audio configuration. Only primary WebSockets accept audio.format; WebRTC and SIP negotiate their media format. Voice and format are immutable after startup.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "format"
        },
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
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) format",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output"
    ]
  },
  "(resource) live > (model) session_resource > (schema) > (property) client": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/client",
    "deprecated": false,
    "key": "client",
    "docstring": "Startup-only capabilities for an untrusted frontend attached to a unified WebRTC session. Trusted sideband connections are unaffected.",
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
  "(resource) live > (model) session_resource > (schema) > (property) delegation": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/delegation",
    "deprecated": false,
    "key": "delegation",
    "docstring": "Who handles tasks delegated by the Live model. Omitted or null selects your application; use `responses` to let the API manage a Responses backend.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/delegation",
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
              "ident": "responses"
            },
            {
              "ident": "type"
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
      "(resource) live > (model) session_resource > (schema) > (property) delegation > (variant) 0",
      "(resource) live > (model) session_resource > (schema) > (property) delegation > (variant) 1"
    ]
  },
  "(resource) live > (model) session_resource > (schema) > (property) input": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/input",
    "deprecated": false,
    "key": "input",
    "docstring": "Ordered text-only history supplied before startup. Supports developer, user, and assistant messages with one text part each; at most 128 messages and 8,192 rendered tokens in total.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/input",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "InitialItem",
        "$ref": "(resource) live > (model) initial_item > (schema)"
      }
    },
    "optional": true,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "union",
    "children": [
      "(resource) live > (model) initial_item > (schema) > (variant) 0",
      "(resource) live > (model) initial_item > (schema) > (variant) 1",
      "(resource) live > (model) initial_item > (schema) > (variant) 2"
    ]
  },
  "(resource) live > (model) session_resource > (schema) > (property) instructions": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/instructions",
    "deprecated": false,
    "key": "instructions",
    "docstring": "Frontend instructions for voice, conversation, interruptions, and when to delegate. Start with the [Live prompting guide](/api/docs/guides/live-prompting); put business rules and tool workflows in a separate [backend prompt](/api/docs/guides/live-delegation#start-with-your-existing-backend-prompt). Limited to 16,384 client-supplied tokens. Omitted or blank instructions use server defaults. Immutable after startup.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) session_resource > (schema) > (property) store": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/store",
    "deprecated": false,
    "key": "store",
    "docstring": "Whether to store the session for later forking and recording download. Defaults to false for new sessions.",
    "type": {
      "kind": "HttpTypeBoolean"
    },
    "optional": true,
    "nullable": false,
    "schemaType": "boolean",
    "children": []
  },
  "(resource) live > (model) session_resource > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveSessionResourceParam",
    "docstring": "The resolved Live session configuration and server-assigned session metadata.",
    "ident": "SessionResource",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "expires_at"
        },
        {
          "ident": "model"
        },
        {
          "ident": "status"
        },
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
          "ident": "input"
        },
        {
          "ident": "instructions"
        },
        {
          "ident": "store"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_resource > (schema) > (property) id",
      "(resource) live > (model) session_resource > (schema) > (property) expires_at",
      "(resource) live > (model) session_resource > (schema) > (property) model",
      "(resource) live > (model) session_resource > (schema) > (property) status",
      "(resource) live > (model) session_resource > (schema) > (property) audio",
      "(resource) live > (model) session_resource > (schema) > (property) client",
      "(resource) live > (model) session_resource > (schema) > (property) delegation",
      "(resource) live > (model) session_resource > (schema) > (property) input",
      "(resource) live > (model) session_resource > (schema) > (property) instructions",
      "(resource) live > (model) session_resource > (schema) > (property) store"
    ]
  },
  "(resource) live > (model) session_closed_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "session.closed"
    }
  },
  "(resource) live > (model) session_usage > (schema) > (property) seconds": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveSessionUsage/properties/seconds",
    "deprecated": false,
    "key": "seconds",
    "docstring": "The cumulative Live audio duration in seconds. Do not sum this value across usage events.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "number",
    "children": []
  },
  "(resource) live > (model) session_usage > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveSessionUsage",
    "docstring": "Cumulative audio duration for a Live session. Values are totals for the session, not increments to sum across usage events.",
    "ident": "SessionUsage",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "seconds"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_usage > (schema) > (property) seconds"
    ]
  },
  "(resource) live > (model) session_closed_event > (schema) > (property) reason > (variant) 0 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "close_requested"
    }
  },
  "(resource) live > (model) session_closed_event > (schema) > (property) reason > (variant) 0 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "expired"
    }
  },
  "(resource) live > (model) session_closed_event > (schema) > (property) reason > (variant) 0 > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "content"
    }
  },
  "(resource) live > (model) session_closed_event > (schema) > (property) reason > (variant) 0 > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "remote_hangup"
    }
  },
  "(resource) live > (model) session_closed_event > (schema) > (property) reason > (variant) 0 > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "connection_lost"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) model > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/ModelIdsLive/anyOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeString"
    },
    "children": []
  },
  "(resource) live > (model) session_resource > (schema) > (property) model > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/ModelIdsLive/anyOf/1",
    "docstring": "The Live model. Required in the session configuration for every transport; do not pass it as a URL query parameter.",
    "ident": "UnionMember1",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/ModelIdsLive/anyOf/1",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "gpt-live-1"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) session_resource > (schema) > (property) model > (variant) 1 > (member) 0"
    ]
  },
  "(resource) live > (model) session_resource > (schema) > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "active"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) format": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialSessionAudioParam/properties/format",
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
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialSessionAudioParam/properties/output",
    "deprecated": false,
    "key": "output",
    "docstring": "The voice used for speech generated by the Live model.",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
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
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice"
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
  "(resource) live > (model) session_resource > (schema) > (property) delegation > (variant) 0": {
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
  "(resource) live > (model) session_resource > (schema) > (property) delegation > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveSessionResourceParam/properties/delegation/anyOf/0/oneOf/1",
    "docstring": "Delegate tasks to a Responses model managed by the Live session.",
    "ident": "Responses",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "responses"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) session_resource > (schema) > (property) delegation > (variant) 1 > (property) responses",
      "(resource) live > (model) session_resource > (schema) > (property) delegation > (variant) 1 > (property) type"
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
  "(resource) live > (model) initial_item > (schema) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInitialItem/oneOf/0",
    "docstring": "A developer message included in the initial text history of a Live session.",
    "ident": "Developer",
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
          "ident": "id"
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
      "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) content",
      "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) role",
      "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) id",
      "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) status",
      "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) type"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInitialItem/oneOf/1",
    "docstring": "A user message included in the initial text history of a Live session.",
    "ident": "User",
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
          "ident": "id"
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
      "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) content",
      "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) role",
      "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) id",
      "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) status",
      "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) type"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInitialItem/oneOf/2",
    "docstring": "An assistant message included in the initial text history of a Live session.",
    "ident": "Assistant",
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
          "ident": "id"
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
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content",
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) role",
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) id",
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) status",
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) type"
    ]
  },
  "(resource) live > (model) initial_item > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInitialItem",
    "docstring": "A developer, user, or assistant message supplied as text history before the Live session starts.",
    "ident": "InitialItem",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialItem",
      "types": [
        {
          "kind": "HttpTypeObject",
          "members": [
            {
              "ident": "content"
            },
            {
              "ident": "role"
            },
            {
              "ident": "id"
            },
            {
              "ident": "status"
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
              "ident": "content"
            },
            {
              "ident": "role"
            },
            {
              "ident": "id"
            },
            {
              "ident": "status"
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
              "ident": "content"
            },
            {
              "ident": "role"
            },
            {
              "ident": "id"
            },
            {
              "ident": "status"
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
      "(resource) live > (model) initial_item > (schema) > (variant) 0",
      "(resource) live > (model) initial_item > (schema) > (variant) 1",
      "(resource) live > (model) initial_item > (schema) > (variant) 2"
    ]
  },
  "(resource) live > (model) session_resource > (schema) > (property) model > (variant) 1 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gpt-live-1"
    }
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
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialSessionAudioOutputParam/properties/voice",
    "deprecated": false,
    "key": "voice",
    "docstring": "The voice used for Live speech, as a built-in voice name or a custom voice object containing its ID. Defaults to `marin` and cannot change after startup.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialSessionAudioOutputParam/properties/voice",
      "types": [
        {
          "kind": "HttpTypeString"
        },
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/LiveInitialSessionAudioOutputParam/properties/voice/oneOf/0/anyOf/1",
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
              "literal": "beacon"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "bossa"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "cedar"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "cinder"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "coral"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "delta"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "echo"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "gleam"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "marin"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "meridian"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "quartz"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "ripple"
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
              "literal": "stone"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "tempo"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "verse"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "vesper"
            },
            {
              "kind": "HttpTypeLiteral",
              "literal": "willow"
            }
          ]
        },
        {
          "kind": "HttpTypeReference",
          "ident": "CustomVoice",
          "$ref": "(resource) live > (model) custom_voice > (schema)"
        }
      ]
    },
    "optional": true,
    "nullable": false,
    "schemaType": "union",
    "childrenParentSchema": "union",
    "children": [
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 0",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 2"
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
  "(resource) live > (model) session_resource > (schema) > (property) delegation > (variant) 1 > (property) responses": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationParam/properties/responses",
    "deprecated": false,
    "key": "responses",
    "docstring": "Backend model, prompt, and tools used when the Live session delegates a task to Responses.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "ResponsesDelegationConfig",
      "$ref": "(resource) live > (model) responses_delegation_config > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) live > (model) responses_delegation_config",
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) responses_delegation_config > (schema) > (property) model",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) instructions",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) max_output_tokens",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) parallel_tool_calls",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) text",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tools"
    ]
  },
  "(resource) live > (model) session_resource > (schema) > (property) delegation > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The delegation owner. Always `responses` for tasks handled by the Responses API.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveResponsesDelegationParam/properties/type",
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
      "(resource) live > (model) session_resource > (schema) > (property) delegation > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) content": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialDeveloperMessageItemParam/properties/content",
    "deprecated": false,
    "key": "content",
    "docstring": "The message content. Supply exactly one text part for the initial Live conversation history.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/LiveInitialDeveloperMessageItemParam/properties/content",
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
      "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) content > (items) > (property) text",
      "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) content > (items) > (property) type"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) role": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialDeveloperMessageItemParam/properties/role",
    "deprecated": false,
    "key": "role",
    "docstring": "The author of this history message. Always `developer`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialDeveloperMessageItemParam/properties/role",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "developer"
        }
      ]
    },
    "default": "developer",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) role > (member) 0"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialDeveloperMessageItemParam/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "An optional identifier for the supplied history message. Live uses the message’s role and text to initialize the conversation.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialDeveloperMessageItemParam/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The supplied message’s status. Live uses its text as history and does not resume an incomplete message.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialDeveloperMessageItemParam/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "incomplete"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "completed"
        }
      ]
    },
    "optional": true,
    "nullable": true,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) status > (member) 0",
      "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) status > (member) 1"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialDeveloperMessageItemParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The history item type. Always `message`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialDeveloperMessageItemParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "message"
        }
      ]
    },
    "default": "message",
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) content": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialUserMessageItemParam/properties/content",
    "deprecated": false,
    "key": "content",
    "docstring": "The message content. Supply exactly one text part for the initial Live conversation history.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/LiveInitialUserMessageItemParam/properties/content",
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
      "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) content > (items) > (property) text",
      "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) content > (items) > (property) type"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) role": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialUserMessageItemParam/properties/role",
    "deprecated": false,
    "key": "role",
    "docstring": "The author of this history message. Always `user`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialUserMessageItemParam/properties/role",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "user"
        }
      ]
    },
    "default": "user",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) role > (member) 0"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialUserMessageItemParam/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "An optional identifier for the supplied history message. Live uses the message’s role and text to initialize the conversation.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialUserMessageItemParam/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The supplied message’s status. Live uses its text as history and does not resume an incomplete message.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialUserMessageItemParam/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "incomplete"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "completed"
        }
      ]
    },
    "optional": true,
    "nullable": true,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) status > (member) 0",
      "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) status > (member) 1"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialUserMessageItemParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The history item type. Always `message`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialUserMessageItemParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "message"
        }
      ]
    },
    "default": "message",
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialAssistantMessageItemParam/properties/content",
    "deprecated": false,
    "key": "content",
    "docstring": "The message content. Supply exactly one text part for the initial Live conversation history.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/LiveInitialAssistantMessageItemParam/properties/content",
      "elementType": {
        "kind": "HttpTypeUnion",
        "oasRef": "#/components/schemas/LiveInitialAssistantMessageItemParam/properties/content/items",
        "types": [
          {
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
          {
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
        ]
      }
    },
    "optional": false,
    "nullable": false,
    "schemaType": "array",
    "childrenParentSchema": "union",
    "children": [
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 0",
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 1"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) role": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialAssistantMessageItemParam/properties/role",
    "deprecated": false,
    "key": "role",
    "docstring": "The author of this history message. Always `assistant`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialAssistantMessageItemParam/properties/role",
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
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) role > (member) 0"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialAssistantMessageItemParam/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "An optional identifier for the supplied history message. Live uses the message’s role and text to initialize the conversation.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": true,
    "nullable": true,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialAssistantMessageItemParam/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The supplied message’s status. Live uses its text as history and does not resume an incomplete message.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialAssistantMessageItemParam/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "incomplete"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "completed"
        }
      ]
    },
    "optional": true,
    "nullable": true,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) status > (member) 0",
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) status > (member) 1"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialAssistantMessageItemParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The history item type. Always `message`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialAssistantMessageItemParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "message"
        }
      ]
    },
    "default": "message",
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) type > (member) 0"
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
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInitialSessionAudioOutputParam/properties/voice/oneOf/0/anyOf/0",
    "ident": "UnionMember0",
    "type": {
      "kind": "HttpTypeString"
    },
    "children": []
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInitialSessionAudioOutputParam/properties/voice/oneOf/0/anyOf/1",
    "docstring": "The voice used for Live speech, as a built-in voice name or a custom voice object containing its ID. Defaults to `marin` and cannot change after startup.",
    "ident": "UnionMember1",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialSessionAudioOutputParam/properties/voice/oneOf/0/anyOf/1",
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
          "literal": "beacon"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "bossa"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "cedar"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "cinder"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "coral"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "delta"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "echo"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "gleam"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "marin"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "meridian"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "quartz"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "ripple"
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
          "literal": "stone"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "tempo"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "verse"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "vesper"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "willow"
        }
      ]
    },
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 0",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 1",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 2",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 3",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 4",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 5",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 6",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 7",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 8",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 9",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 10",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 11",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 12",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 13",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 14",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 15",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 16",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 17",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 18",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 19",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 20",
      "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 21"
    ]
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "CustomVoice",
      "$ref": "(resource) live > (model) custom_voice > (schema)"
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) live > (model) custom_voice > (schema) > (property) id"
    ]
  },
  "(resource) live > (model) custom_voice > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveCustomVoiceParam",
    "ident": "CustomVoice",
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
      "(resource) live > (model) custom_voice > (schema) > (property) id"
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
  "(resource) live > (model) client_delegation > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "client"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) model": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/model",
    "deprecated": false,
    "key": "model",
    "docstring": "The model used for server-owned Responses delegations.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) instructions": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/instructions",
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
  "(resource) live > (model) responses_delegation_config > (schema) > (property) max_output_tokens": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/max_output_tokens",
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
  "(resource) live > (model) responses_delegation_config > (schema) > (property) parallel_tool_calls": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/parallel_tool_calls",
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
  "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/reasoning",
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) summary"
    ]
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/service_tier",
    "deprecated": false,
    "key": "service_tier",
    "docstring": "Service tier for delegated Responses requests.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/service_tier",
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier > (member) 0",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier > (member) 1",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier > (member) 2",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier > (member) 3",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier > (member) 4",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier > (member) 5"
    ]
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/text",
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) text > (property) verbosity"
    ]
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/tool_choice",
    "deprecated": false,
    "key": "tool_choice",
    "docstring": "Controls which tool the Responses backend uses when handling a task delegated by the Live model.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/tool_choice",
      "types": [
        {
          "kind": "HttpTypeUnion",
          "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/tool_choice/oneOf/0",
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 0",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 1",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 2"
    ]
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tools": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/tools",
    "deprecated": false,
    "key": "tools",
    "docstring": "Tools available to the Responses backend while it handles tasks delegated by the Live model.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/tools",
      "elementType": {
        "kind": "HttpTypeUnion",
        "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/tools/items",
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tools > (items) > (variant) 0",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tools > (items) > (variant) 1"
    ]
  },
  "(resource) live > (model) responses_delegation_config > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam",
    "docstring": "Model, prompt, and tool settings for tasks delegated by the Live session to a Responses backend.",
    "ident": "ResponsesDelegationConfig",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "model"
        },
        {
          "ident": "instructions"
        },
        {
          "ident": "max_output_tokens"
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) model",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) instructions",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) max_output_tokens",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) parallel_tool_calls",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) text",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tools"
    ]
  },
  "(resource) live > (model) session_resource > (schema) > (property) delegation > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "responses"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) content > (items) > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialInputTextContentPartParam/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "The message text to include in the Live session’s initial conversation history.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) content > (items) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialInputTextContentPartParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The text content type. Always `input_text`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialInputTextContentPartParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_text"
        }
      ]
    },
    "default": "input_text",
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) content > (items) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) role > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "developer"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "incomplete"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) status > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "completed"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "message"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) content > (items) > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialInputTextContentPartParam/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "The message text to include in the Live session’s initial conversation history.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) content > (items) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialInputTextContentPartParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The text content type. Always `input_text`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialInputTextContentPartParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "input_text"
        }
      ]
    },
    "default": "input_text",
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) content > (items) > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) role > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "user"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "incomplete"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) status > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "completed"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "message"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInitialAssistantMessageItemParam/properties/content/items/oneOf/0",
    "docstring": "Assistant text supplied as conversation history when starting a Live session.",
    "ident": "Text",
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
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 0 > (property) text",
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 0 > (property) type"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveInitialAssistantMessageItemParam/properties/content/items/oneOf/1",
    "docstring": "Assistant output text supplied as conversation history when starting a Live session.",
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
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 1 > (property) text",
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 1 > (property) type"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) role > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "assistant"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "incomplete"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) status > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "completed"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "message"
    }
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
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "alloy"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "ash"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "ballad"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "beacon"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "bossa"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "cedar"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 6": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "cinder"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 7": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "coral"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 8": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "delta"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 9": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "echo"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 10": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "gleam"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 11": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "marin"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 12": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "meridian"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 13": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "quartz"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 14": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "ripple"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 15": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "sage"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 16": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "shimmer"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 17": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "stone"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 18": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "tempo"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 19": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "verse"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 20": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "vesper"
    }
  },
  "(resource) live > (model) session_resource > (schema) > (property) audio > (property) output > (property) voice > (variant) 1 > (member) 21": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "willow"
    }
  },
  "(resource) live > (model) custom_voice > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveCustomVoiceParam/properties/id",
    "deprecated": false,
    "key": "id",
    "type": {
      "kind": "HttpTypeString"
    },
    "constraints": {
      "minLength": 1,
      "maxLength": 128
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
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
  "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort": {
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort > (member) 0",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort > (member) 1",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort > (member) 2",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort > (member) 3",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort > (member) 4",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort > (member) 5"
    ]
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) summary": {
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) summary > (member) 0",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) summary > (member) 1",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) summary > (member) 2"
    ]
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "default"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "fast_tier_temp_pilot"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "flex"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "priority"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) service_tier > (member) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "ultrafast"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) text > (property) verbosity": {
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) text > (property) verbosity > (member) 0",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) text > (property) verbosity > (member) 1",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) text > (property) verbosity > (member) 2"
    ]
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 0": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/tool_choice/oneOf/0",
    "ident": "LiveToolChoiceEnum",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/tool_choice/oneOf/0",
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 0 > (member) 0",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 0 > (member) 1",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 0 > (member) 2"
    ]
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/tool_choice/oneOf/1",
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 1 > (property) name",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 1 > (property) type"
    ]
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 2": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/tool_choice/oneOf/2",
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 2 > (property) name",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 2 > (property) server_label",
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 2 > (property) type"
    ]
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tools > (items) > (variant) 0": {
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
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tools > (items) > (variant) 1": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/LiveResponsesDelegationSettingsInputParam/properties/tools/items/oneOf/1",
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tools > (items) > (variant) 1 > (property) type"
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
  "(resource) live > (model) initial_item > (schema) > (variant) 0 > (property) content > (items) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_text"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 1 > (property) content > (items) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "input_text"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 0 > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialTextContentPartParam/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "The message text to include in the Live session’s initial conversation history.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 0 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialTextContentPartParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The text content type. Always `text`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialTextContentPartParam/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "text"
        }
      ]
    },
    "default": "text",
    "optional": true,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 0 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 1 > (property) text": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialOutputTextContentPartParam/properties/text",
    "deprecated": false,
    "key": "text",
    "docstring": "The message text to include in the Live session’s initial conversation history.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 1 > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/LiveInitialOutputTextContentPartParam/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The text content type. Always `output_text`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/LiveInitialOutputTextContentPartParam/properties/type",
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
      "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "none"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "minimal"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort > (member) 3": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "medium"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort > (member) 4": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) effort > (member) 5": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "xhigh"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) summary > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "concise"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) summary > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "detailed"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) reasoning > (property) summary > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) text > (property) verbosity > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "low"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) text > (property) verbosity > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "medium"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) text > (property) verbosity > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "high"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 0 > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "auto"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 0 > (member) 1": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "none"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 0 > (member) 2": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "required"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 1 > (property) name": {
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
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 1 > (property) type": {
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 2 > (property) name": {
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
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 2 > (property) server_label": {
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
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 2 > (property) type": {
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 2 > (property) type > (member) 0"
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
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tools > (items) > (variant) 1 > (property) type": {
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
      "(resource) live > (model) responses_delegation_config > (schema) > (property) tools > (items) > (variant) 1 > (property) type > (member) 0"
    ]
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 0 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "text"
    }
  },
  "(resource) live > (model) initial_item > (schema) > (variant) 2 > (property) content > (items) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "output_text"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "function"
    }
  },
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tool_choice > (variant) 2 > (property) type > (member) 0": {
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
  "(resource) live > (model) responses_delegation_config > (schema) > (property) tools > (items) > (variant) 1 > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "web_search"
    }
  }
}
```
