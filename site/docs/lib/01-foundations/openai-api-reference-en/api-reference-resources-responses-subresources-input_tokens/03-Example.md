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
pageSha256: "7ad5e4def3fcaf508f41c60c9a4550dd29b2d1663b3345687eba011c99e8eb60"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/responses/input_tokens \
    -X POST \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "input_tokens": 123,
  "object": "response.input_tokens"
}
```
