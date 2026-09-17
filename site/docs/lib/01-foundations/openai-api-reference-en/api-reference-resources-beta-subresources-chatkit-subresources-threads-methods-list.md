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
sourceRel: "api/reference/resources/beta/subresources/chatkit/subresources/threads/methods/list.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/beta/subresources/chatkit/subresources/threads/methods/list.md"
sourceSha256: "1b9436322d960dedf93b81f6b92ccd573473f62336c01883b53eb1ec09a1567b"
pageSha256: "1b9436322d960dedf93b81f6b92ccd573473f62336c01883b53eb1ec09a1567b"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## List ChatKit threads

**get** `/chatkit/threads`

List ChatKit threads with optional pagination and user filters.

### Query Parameters

- `after: optional string`

  List items created after this thread item ID. Defaults to null for the first page.

- `before: optional string`

  List items created before this thread item ID. Defaults to null for the newest results.

- `limit: optional number`

  Maximum number of thread items to return. Defaults to 20.

- `order: optional "asc" or "desc"`

  Sort order for results by creation time. Defaults to `desc`.

  - `"asc"`

  - `"desc"`

- `user: optional string`

  Filter threads that belong to this user identifier. Defaults to null to return all users.

### Returns

- `data: array of ChatKitThread`

  A list of items

  - `id: string`

    Identifier of the thread.

  - `created_at: number`

    Unix timestamp (in seconds) for when the thread was created.

  - `object: "chatkit.thread"`

    Type discriminator that is always `chatkit.thread`.

    - `"chatkit.thread"`

  - `status: object \{ type \}  or object \{ reason, type \}  or object \{ reason, type \}`

    Current status for the thread. Defaults to `active` for newly created threads.

    - `Active object \{ type \}`

      Indicates that a thread is active.

      - `type: "active"`

        Status discriminator that is always `active`.

        - `"active"`

    - `Locked object \{ reason, type \}`

      Indicates that a thread is locked and cannot accept new input.

      - `reason: string or null`

        Reason that the thread was locked. Defaults to null when no reason is recorded.

      - `type: "locked"`

        Status discriminator that is always `locked`.

        - `"locked"`

    - `Closed object \{ reason, type \}`

      Indicates that a thread has been closed.

      - `reason: string or null`

        Reason that the thread was closed. Defaults to null when no reason is recorded.

      - `type: "closed"`

        Status discriminator that is always `closed`.

        - `"closed"`

  - `title: string or null`

    Optional human-readable title for the thread. Defaults to null when no title has been generated.

  - `user: string`

    Free-form string that identifies your end user who owns the thread.

- `first_id: string or null`

  The ID of the first item in the list.

- `has_more: boolean`

  Whether there are more items available.

- `last_id: string or null`

  The ID of the last item in the list.

- `object: "list"`

  The type of object returned, must be `list`.

  - `"list"`

### Example

```http
curl https://api.openai.com/v1/chatkit/threads \
    -H 'OpenAI-Beta: chatkit_beta=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "cthr_def456",
      "created_at": 1712345600,
      "object": "chatkit.thread",
      "status": {
        "type": "active"
      },
      "title": "Demo feedback",
      "user": "user_456"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id",
  "object": "list"
}
```

### Example

```http
curl "https://api.openai.com/v1/chatkit/threads?limit=2&order=desc" \
  -H "OpenAI-Beta: chatkit_beta=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "cthr_abc123",
      "object": "chatkit.thread",
      "title": "Customer escalation"
    },
    {
      "id": "cthr_def456",
      "object": "chatkit.thread",
      "title": "Demo feedback"
    }
  ],
  "has_more": false,
  "object": "list"
}
```
