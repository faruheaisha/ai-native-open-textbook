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
pageSha256: "814fc0c1d0a55495396f3d3f908e28040f501ebd567415099b068ee07a552891"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
    "event_id": "event_9101",
    "type": "conversation.created",
    "conversation": {
        "id": "conv_001",
        "object": "realtime.conversation"
    }
}
```

## conversation.item.created

Returned when a conversation item is created. There are several scenarios that produce this event:
  - The server is generating a Response, which if successful will produce
    either one or two Items, which will be of type `message`
    (role `assistant`) or type `function_call`.
  - The input audio buffer has been committed, either by the client or the
    server (in `server_vad` mode). The server will take the content of the
    input audio buffer and add it to a new user message Item.
  - The client has sent a `conversation.item.create` event to add a new Item
    to the Conversation.
