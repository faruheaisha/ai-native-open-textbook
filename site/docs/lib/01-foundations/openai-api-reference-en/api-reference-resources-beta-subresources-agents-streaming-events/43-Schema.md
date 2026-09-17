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
pageSha256: "6bb7fdca5d41eab4beeca11908ae6a04b9f64ca34bb368357853579b92c2b49e"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `SessionEventAgentSessionTurnContentPartAdded`

```json
{
  "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnContentPartAdded",
    "docstring": "Emitted when an output text content part is added.",
    "ident": "AgentSessionTurnContentPartAddedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "content_index"
        },
        {
          "ident": "event_id"
        },
        {
          "ident": "item_id"
        },
        {
          "ident": "output_index"
        },
        {
          "ident": "part"
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
      "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) content_index",
      "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) event_id",
      "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) item_id",
      "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) output_index",
      "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) part",
      "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) session_id",
      "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) content_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnContentPartAdded/properties/content_index",
    "deprecated": false,
    "key": "content_index",
    "docstring": "The index of the content part in the message.",
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
  "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnContentPartAdded/properties/event_id",
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
  "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnContentPartAdded/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the message item.",
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
  "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) output_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnContentPartAdded/properties/output_index",
    "deprecated": false,
    "key": "output_index",
    "docstring": "The index of the item in the turn output.",
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
  "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) part": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnContentPartAdded/properties/part",
    "deprecated": false,
    "key": "part",
    "docstring": "The initial content part.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "OutputText",
      "$ref": "(resource) beta.agents > (model) output_text > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) beta.agents > (model) output_text",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) output_text > (schema) > (property) text",
      "(resource) beta.agents > (model) output_text > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) session_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnContentPartAdded/properties/session_id",
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
  "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnContentPartAdded/properties/turn_id",
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
  "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnContentPartAdded/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `agent.session.turn.content_part.added`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionEventAgentSessionTurnContentPartAdded/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "agent.session.turn.content_part.added"
        }
      ]
    },
    "default": "agent.session.turn.content_part.added",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) type > (member) 0"
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
  "(resource) beta.agents > (model) agent_session_turn_content_part_added_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "agent.session.turn.content_part.added"
    }
  },
  "(resource) beta.agents > (model) output_text > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "output_text"
    }
  }
}
```
