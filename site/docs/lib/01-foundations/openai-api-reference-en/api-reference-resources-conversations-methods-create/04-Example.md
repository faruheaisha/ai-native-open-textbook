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
pageSha256: "1e30ba5a124cce03c60bc3d8274546c044cbdd04d28949c1ebf0722aaf6f4a78"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/conversations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "metadata": {"topic": "demo"},
    "items": [
      {
        "type": "message",
        "role": "user",
        "content": "Hello!"
      }
    ]
  }'
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
