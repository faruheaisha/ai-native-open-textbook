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
sourceRel: "api/reference/resources/responses/methods/delete.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/responses/methods/delete.md"
sourceSha256: "26254c3c69acce6517f6ab5c7790adb813d552fdb3098a6c441df9b1ddb0b46a"
pageSha256: "26254c3c69acce6517f6ab5c7790adb813d552fdb3098a6c441df9b1ddb0b46a"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Delete a model response

**delete** `/responses/\{response_id\}`

Deletes a model response with the given ID.

### Path Parameters

- `response_id: string`

### Example

```http
curl https://api.openai.com/v1/responses/$RESPONSE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Example

```http
curl -X DELETE https://api.openai.com/v1/responses/resp_123 \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "resp_6786a1bec27481909a17d673315b29f6",
  "object": "response",
  "deleted": true
}
```
