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
sourceRel: "api/reference/resources/responses/subresources/input_tokens.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/responses/subresources/input_tokens.md"
sourceSha256: "e59ee8ff2a6d2cfd66daea949610f967075c7e971591c44d41e181a4d9885f40"
pageSha256: "f275a04fe573b1530fa7f7859f3b1c30fd3a4c51f74183c00fa7d1b79afcd428"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl -X POST https://api.openai.com/v1/responses/input_tokens \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
      "model": "gpt-6-astra",
      "input": "Tell me a joke."
    }'
```

#### Response

```json
{
  "object": "response.input_tokens",
  "input_tokens": 11
}
```

## Domain Types
