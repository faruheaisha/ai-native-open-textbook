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
pageSha256: "48a785b21317e0374bf155fc928b6d56f67bdba3bef77b41e93fe1de6bd4d48d"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `SessionEventAgentSessionTurnReasoningSummaryPartDone`

```json
{
  "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnReasoningSummaryPartDone",
    "docstring": "Emitted when a reasoning summary part is complete.",
    "ident": "AgentSessionTurnReasoningSummaryPartDoneEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
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
          "ident": "status"
        },
        {
          "ident": "summary_index"
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
      "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) event_id",
      "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) item_id",
      "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) output_index",
      "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) part",
      "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) session_id",
      "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) status",
      "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) summary_index",
      "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) turn_id",
      "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnReasoningSummaryPartDone/properties/event_id",
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
  "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnReasoningSummaryPartDone/properties/item_id",
    "deprecated": false,
    "key": "item_id",
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
  "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) output_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnReasoningSummaryPartDone/properties/output_index",
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
  "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) part": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnReasoningSummaryPartDone/properties/part",
    "deprecated": false,
    "key": "part",
    "docstring": "The completed summary part.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "SummaryText",
      "$ref": "(resource) beta.agents > (model) summary_text > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) beta.agents > (model) summary_text",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) summary_text > (schema) > (property) text",
      "(resource) beta.agents > (model) summary_text > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) session_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnReasoningSummaryPartDone/properties/session_id",
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
  "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnReasoningSummaryPartDone/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "Present as `incomplete` when summary generation was interrupted.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionEventAgentSessionTurnReasoningSummaryPartDone/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "incomplete"
        }
      ]
    },
    "optional": false,
    "nullable": true,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) status > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) summary_index": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnReasoningSummaryPartDone/properties/summary_index",
    "deprecated": false,
    "key": "summary_index",
    "docstring": "The index of the summary part.",
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
  "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) turn_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnReasoningSummaryPartDone/properties/turn_id",
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
  "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionTurnReasoningSummaryPartDone/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `agent.session.turn.reasoning_summary_part.done`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionEventAgentSessionTurnReasoningSummaryPartDone/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "agent.session.turn.reasoning_summary_part.done"
        }
      ]
    },
    "default": "agent.session.turn.reasoning_summary_part.done",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) type > (member) 0"
    ]
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
  "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "incomplete"
    }
  },
  "(resource) beta.agents > (model) agent_session_turn_reasoning_summary_part_done_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "agent.session.turn.reasoning_summary_part.done"
    }
  },
  "(resource) beta.agents > (model) summary_text > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "summary_text"
    }
  }
}
```
