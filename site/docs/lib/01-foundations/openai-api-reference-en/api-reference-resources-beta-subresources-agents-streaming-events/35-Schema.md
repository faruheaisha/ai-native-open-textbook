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
pageSha256: "18356d5cfbfb08e0bd96f681747d4f647fbbf594821caec5c79750abd2c684d5"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `SessionEventAgentSessionSubagentCreated`

```json
{
  "(resource) beta.agents > (model) agent_session_subagent_created_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SessionEventAgentSessionSubagentCreated",
    "docstring": "Emitted when a subagent is created.",
    "ident": "AgentSessionSubagentCreatedEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "event_id"
        },
        {
          "ident": "subagent"
        },
        {
          "ident": "type"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) agent_session_subagent_created_event > (schema) > (property) event_id",
      "(resource) beta.agents > (model) agent_session_subagent_created_event > (schema) > (property) subagent",
      "(resource) beta.agents > (model) agent_session_subagent_created_event > (schema) > (property) type"
    ]
  },
  "(resource) beta.agents > (model) agent_session_subagent_created_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionSubagentCreated/properties/event_id",
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
  "(resource) beta.agents > (model) agent_session_subagent_created_event > (schema) > (property) subagent": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionSubagentCreated/properties/subagent",
    "deprecated": false,
    "key": "subagent",
    "docstring": "The subagent that was created.",
    "type": {
      "kind": "HttpTypeReference",
      "ident": "Subagent",
      "$ref": "(resource) beta.agents > (model) subagent > (schema)"
    },
    "optional": false,
    "nullable": false,
    "modelImplicit": false,
    "schemaType": "object",
    "modelPath": "(resource) beta.agents > (model) subagent",
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) subagent > (schema) > (property) id",
      "(resource) beta.agents > (model) subagent > (schema) > (property) closed_at",
      "(resource) beta.agents > (model) subagent > (schema) > (property) instructions",
      "(resource) beta.agents > (model) subagent > (schema) > (property) name",
      "(resource) beta.agents > (model) subagent > (schema) > (property) object",
      "(resource) beta.agents > (model) subagent > (schema) > (property) opened_at",
      "(resource) beta.agents > (model) subagent > (schema) > (property) parent_agent_id",
      "(resource) beta.agents > (model) subagent > (schema) > (property) session_id",
      "(resource) beta.agents > (model) subagent > (schema) > (property) status"
    ]
  },
  "(resource) beta.agents > (model) agent_session_subagent_created_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SessionEventAgentSessionSubagentCreated/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The type of the object. Always `agent.session.subagent.created`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SessionEventAgentSessionSubagentCreated/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "agent.session.subagent.created"
        }
      ]
    },
    "default": "agent.session.subagent.created",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) agent_session_subagent_created_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) subagent > (schema) > (property) id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SubagentResource/properties/id",
    "deprecated": false,
    "key": "id",
    "docstring": "The ID of the subagent.",
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
  "(resource) beta.agents > (model) subagent > (schema) > (property) closed_at": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SubagentResource/properties/closed_at",
    "deprecated": false,
    "key": "closed_at",
    "docstring": "The Unix timestamp, in seconds, when the subagent was closed. Null while active, including after resume.",
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
  "(resource) beta.agents > (model) subagent > (schema) > (property) instructions": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SubagentResource/properties/instructions",
    "deprecated": false,
    "key": "instructions",
    "docstring": "Initial task content, or null when unavailable. Text may contain placeholders for images or audio when only a preview is available.",
    "type": {
      "kind": "HttpTypeArray",
      "oasRef": "#/components/schemas/SubagentResource/properties/instructions",
      "elementType": {
        "kind": "HttpTypeReference",
        "ident": "AgentContent",
        "$ref": "(resource) beta.agents > (model) agent_content > (schema)"
      }
    },
    "optional": false,
    "nullable": true,
    "schemaType": "array",
    "childrenParentSchema": "union",
    "children": [
      "(resource) beta.agents > (model) agent_content > (schema) > (variant) 0",
      "(resource) beta.agents > (model) agent_content > (schema) > (variant) 1"
    ]
  },
  "(resource) beta.agents > (model) subagent > (schema) > (property) name": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SubagentResource/properties/name",
    "deprecated": false,
    "key": "name",
    "docstring": "The runner-assigned nickname, or null when unavailable.",
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
  "(resource) beta.agents > (model) subagent > (schema) > (property) object": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SubagentResource/properties/object",
    "deprecated": false,
    "key": "object",
    "docstring": "The object type. Always `agent.session.subagent`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SubagentResource/properties/object",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "agent.session.subagent"
        }
      ]
    },
    "default": "agent.session.subagent",
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) subagent > (schema) > (property) object > (member) 0"
    ]
  },
  "(resource) beta.agents > (model) subagent > (schema) > (property) opened_at": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SubagentResource/properties/opened_at",
    "deprecated": false,
    "key": "opened_at",
    "docstring": "The Unix timestamp, in seconds, when the subagent was first opened. Resuming does not change it.",
    "type": {
      "kind": "HttpTypeNumber"
    },
    "constraints": {
      "format": "int64"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "integer",
    "children": []
  },
  "(resource) beta.agents > (model) subagent > (schema) > (property) parent_agent_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SubagentResource/properties/parent_agent_id",
    "deprecated": false,
    "key": "parent_agent_id",
    "docstring": "The ID of the agent that created this subagent.",
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
  "(resource) beta.agents > (model) subagent > (schema) > (property) session_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SubagentResource/properties/session_id",
    "deprecated": false,
    "key": "session_id",
    "docstring": "The ID of the session that owns the subagent.",
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
  "(resource) beta.agents > (model) subagent > (schema) > (property) status": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/SubagentResource/properties/status",
    "deprecated": false,
    "key": "status",
    "docstring": "The current status of the subagent.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/SubagentResource/properties/status",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "active"
        },
        {
          "kind": "HttpTypeLiteral",
          "literal": "closed"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) beta.agents > (model) subagent > (schema) > (property) status > (member) 0",
      "(resource) beta.agents > (model) subagent > (schema) > (property) status > (member) 1"
    ]
  },
  "(resource) beta.agents > (model) subagent > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/SubagentResource",
    "docstring": "A subagent created within a session.",
    "ident": "Subagent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "id"
        },
        {
          "ident": "closed_at"
        },
        {
          "ident": "instructions"
        },
        {
          "ident": "name"
        },
        {
          "ident": "object"
        },
        {
          "ident": "opened_at"
        },
        {
          "ident": "parent_agent_id"
        },
        {
          "ident": "session_id"
        },
        {
          "ident": "status"
        }
      ]
    },
    "childrenParentSchema": "object",
    "children": [
      "(resource) beta.agents > (model) subagent > (schema) > (property) id",
      "(resource) beta.agents > (model) subagent > (schema) > (property) closed_at",
      "(resource) beta.agents > (model) subagent > (schema) > (property) instructions",
      "(resource) beta.agents > (model) subagent > (schema) > (property) name",
      "(resource) beta.agents > (model) subagent > (schema) > (property) object",
      "(resource) beta.agents > (model) subagent > (schema) > (property) opened_at",
      "(resource) beta.agents > (model) subagent > (schema) > (property) parent_agent_id",
      "(resource) beta.agents > (model) subagent > (schema) > (property) session_id",
      "(resource) beta.agents > (model) subagent > (schema) > (property) status"
    ]
  },
  "(resource) beta.agents > (model) agent_session_subagent_created_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "agent.session.subagent.created"
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
  "(resource) beta.agents > (model) subagent > (schema) > (property) object > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "agent.session.subagent"
    }
  },
  "(resource) beta.agents > (model) subagent > (schema) > (property) status > (member) 0": {
    "kind": "HttpDeclReference",
    "docstring": "The subagent remains available, including while idle between turns.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "active"
    }
  },
  "(resource) beta.agents > (model) subagent > (schema) > (property) status > (member) 1": {
    "kind": "HttpDeclReference",
    "docstring": "The subagent is closed.",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "closed"
    }
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
  "(resource) beta.agents > (model) output_text > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "output_text"
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
