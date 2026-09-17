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
sourceRel: "api/reference/resources/beta/subresources/chatkit/subresources/threads/methods/delete.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/beta/subresources/chatkit/subresources/threads/methods/delete.md"
sourceSha256: "711ab62d04d34229e0598133cd9451be9cf81bd3e266e6eb241ca5834a98e3c5"
pageSha256: "711ab62d04d34229e0598133cd9451be9cf81bd3e266e6eb241ca5834a98e3c5"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Delete ChatKit thread

**delete** `/chatkit/threads/\{thread_id\}`

Delete a ChatKit thread along with its items and stored attachments.

### Path Parameters

- `thread_id: string`

### Returns

- `id: string`

  Identifier of the deleted thread.

- `deleted: boolean`

  Indicates that the thread has been deleted.

- `object: "chatkit.thread.deleted"`

  Type discriminator that is always `chatkit.thread.deleted`.

  - `"chatkit.thread.deleted"`

### Example

```http
curl https://api.openai.com/v1/chatkit/threads/$THREAD_ID \
    -X DELETE \
    -H 'OpenAI-Beta: chatkit_beta=v1' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "chatkit.thread.deleted"
}
```
