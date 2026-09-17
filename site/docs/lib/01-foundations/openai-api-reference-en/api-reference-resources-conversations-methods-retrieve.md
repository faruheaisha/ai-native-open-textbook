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
sourceRel: "api/reference/resources/conversations/methods/retrieve.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/conversations/methods/retrieve.md"
sourceSha256: "249da6e143be3fc29102a7973d3fcc9a358f36235d376b7c796d2ec03784936c"
pageSha256: "249da6e143be3fc29102a7973d3fcc9a358f36235d376b7c796d2ec03784936c"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Retrieve a conversation

**get** `/conversations/\{conversation_id\}`

Get a conversation

### Path Parameters

- `conversation_id: string`

### Returns

- `Conversation object \{ id, created_at, metadata, object \}`

  - `id: string`

    The unique ID of the conversation.

  - `created_at: number`

    The time at which the conversation was created, measured in seconds since the Unix epoch.

  - `metadata: unknown`

    Set of 16 key-value pairs that can be attached to an object. This can be         useful for storing additional information about the object in a structured         format, and querying for objects via API or the dashboard.
    Keys are strings with a maximum length of 64 characters. Values are strings         with a maximum length of 512 characters.

  - `object: "conversation"`

    The object type, which is always `conversation`.

    - `"conversation"`

### Example

```http
curl https://api.openai.com/v1/conversations/$CONVERSATION_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "metadata": {},
  "object": "conversation"
}
```

### Example

```http
curl https://api.openai.com/v1/conversations/conv_123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "conv_123",
  "object": "conversation",
  "created_at": 1741900000,
  "metadata": {"topic": "demo"}
}
```
