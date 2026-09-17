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
sourceRel: "api/reference/resources/conversations/methods/create.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/conversations/methods/create.md"
sourceSha256: "cfcd4ec2d01d86f4da0f06829c056c451d714c5e6f5d1e0abdcf24dd9a6f327c"
pageSha256: "db1d412c3ddeb22915f8dd567fe4b1a4228fd9695e4e2fffb9e5beac46438c51"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/conversations \
    -X POST \
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
