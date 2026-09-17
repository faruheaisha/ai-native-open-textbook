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
sourceRel: "api/reference/resources/realtime/subresources/calls/methods/reject.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/realtime/subresources/calls/methods/reject.md"
sourceSha256: "6ba6d2a3ef1603fcbaa3057d6e03dfd533db03fbf13bbc1a8e43fb02264fff69"
pageSha256: "6ba6d2a3ef1603fcbaa3057d6e03dfd533db03fbf13bbc1a8e43fb02264fff69"
contentMode: "local-full"
zh: ""
---

# OpenAI API 参考（字段级）

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Reject call

**post** `/realtime/calls/\{call_id\}/reject`

Decline an incoming SIP call by returning a SIP status code to the caller.

### Path Parameters

- `call_id: string`

### Body Parameters

- `status_code: optional number`

  SIP response code to send back to the caller. Defaults to `603` (Decline)
  when omitted.

### Example

```http
curl https://api.openai.com/v1/realtime/calls/$CALL_ID/reject \
    -X POST \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Example

```http
curl -X POST https://api.openai.com/v1/realtime/calls/$CALL_ID/reject \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status_code": 486}'
```
