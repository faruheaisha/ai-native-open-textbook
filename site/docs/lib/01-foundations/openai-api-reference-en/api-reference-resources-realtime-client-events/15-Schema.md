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
pageSha256: "5aba9dc5adb488551df1ce56a39c72a1ad7fa13ce608606babd924fe1bae6a39"
contentMode: "local-full"
zh: ""
---

### Schema

Schema name: `RealtimeClientEventConversationItemDelete`

```json
{
  "(resource) realtime > (model) conversation_item_delete_event > (schema)": {
    "kind": "HttpDeclTypeAlias",
    "oasRef": "#/components/schemas/RealtimeClientEventConversationItemDelete",
    "docstring": "Send this event when you want to remove any item from the conversation \nhistory. The server will respond with a `conversation.item.deleted` event, \nunless the item does not exist in the conversation history, in which case the \nserver will respond with an error.\n",
    "ident": "ConversationItemDeleteEvent",
    "type": {
      "kind": "HttpTypeObject",
      "members": [
        {
          "ident": "item_id"
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
      "(resource) realtime > (model) conversation_item_delete_event > (schema) > (property) item_id",
      "(resource) realtime > (model) conversation_item_delete_event > (schema) > (property) type",
      "(resource) realtime > (model) conversation_item_delete_event > (schema) > (property) event_id"
    ]
  },
  "(resource) realtime > (model) conversation_item_delete_event > (schema) > (property) item_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventConversationItemDelete/properties/item_id",
    "deprecated": false,
    "key": "item_id",
    "docstring": "The ID of the item to delete.",
    "type": {
      "kind": "HttpTypeString"
    },
    "optional": false,
    "nullable": false,
    "schemaType": "string",
    "children": []
  },
  "(resource) realtime > (model) conversation_item_delete_event > (schema) > (property) type": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventConversationItemDelete/properties/type",
    "deprecated": false,
    "key": "type",
    "docstring": "The event type, must be `conversation.item.delete`.",
    "type": {
      "kind": "HttpTypeUnion",
      "oasRef": "#/components/schemas/RealtimeClientEventConversationItemDelete/properties/type",
      "types": [
        {
          "kind": "HttpTypeLiteral",
          "literal": "conversation.item.delete"
        }
      ]
    },
    "optional": false,
    "nullable": false,
    "schemaType": "enum",
    "childrenParentSchema": "enum",
    "children": [
      "(resource) realtime > (model) conversation_item_delete_event > (schema) > (property) type > (member) 0"
    ]
  },
  "(resource) realtime > (model) conversation_item_delete_event > (schema) > (property) event_id": {
    "kind": "HttpDeclProperty",
    "oasRef": "#/components/schemas/RealtimeClientEventConversationItemDelete/properties/event_id",
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
  "(resource) realtime > (model) conversation_item_delete_event > (schema) > (property) type > (member) 0": {
    "kind": "HttpDeclReference",
    "type": {
      "kind": "HttpTypeLiteral",
      "literal": "conversation.item.delete"
    }
  }
}
```
