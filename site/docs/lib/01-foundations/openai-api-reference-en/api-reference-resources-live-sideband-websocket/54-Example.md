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
sourceRel: "api/reference/resources/live/sideband-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/sideband-websocket.md"
sourceSha256: "3931e3ed281fce5bf05f32a67301bdd3963d7f23e08d45dc8483e7bc1c4302aa"
pageSha256: "2e978759f3e893d5bda3c9b0174caca3770d8a95ef68c874d24e6b46168731e7"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "transport.dtmf.send",
  "event_id": "event_dtmf_2",
  "event": "#"
}
```

### transport.ringing

The outbound SIP provider leg is ringing or providing early media. Delivered only to sideband observers.
