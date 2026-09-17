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
sourceRel: "api/reference/resources/live/fork-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/fork-websocket.md"
sourceSha256: "9e6521e93be8aca435d9a5de6a3905a8388040ba12e0775d313c91a93fe91796"
pageSha256: "790906bff7538d812aa9e915d2c4a77e26877ab8cdd0075096f83cbc9ef40feb"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "response.create",
  "event_id": "evt_response_001"
}
```

### session.close

Request that the Live session close. The terminal `session.closed` event contains the close reason and final usage.
