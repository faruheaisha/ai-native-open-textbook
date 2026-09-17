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
sourceRel: "api/reference/resources/conversations.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/conversations.md"
sourceSha256: "6123458c0e5f960336caab8f4ed471cfe0776f9b3a73f4f86126c614cfabefca"
pageSha256: "2d7c615d0dadaf36ec9b9f38a6b0b4844ad762435156de27ee0f11178fa0b51f"
contentMode: "local-full"
zh: ""
---

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
