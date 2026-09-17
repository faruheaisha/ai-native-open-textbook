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
sourceRel: "api/reference/resources/realtime/subresources/calls/methods/refer.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/subresources/calls/methods/refer.md"
sourceSha256: "79818d749048464fb002311da6a00f113f741d38b699c8c5999fc3cd59b92520"
pageSha256: "79818d749048464fb002311da6a00f113f741d38b699c8c5999fc3cd59b92520"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Refer call

**post** `/realtime/calls/\{call_id\}/refer`

Transfer an active SIP call to a new destination using the SIP REFER verb.

### Path Parameters

- `call_id: string`

### Body Parameters

- `target_uri: string`

  URI that should appear in the SIP Refer-To header. Supports values like
  `tel:+14155550123` or `sip:agent@example.com`.

### Example

```http
curl https://api.openai.com/v1/realtime/calls/$CALL_ID/refer \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "target_uri": "tel:+14155550123"
        }'
```

### Example

```http
curl -X POST https://api.openai.com/v1/realtime/calls/$CALL_ID/refer \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"target_uri": "tel:+14155550123"}'
```
