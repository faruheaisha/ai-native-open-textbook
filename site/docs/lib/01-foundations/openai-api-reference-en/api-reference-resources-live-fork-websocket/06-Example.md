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
pageSha256: "4992cf0c7a6b6f623406ccd6f3360c5acc5926d3cb99347cd6be4c1efeadedd1"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.input_audio.append",
  "audio": "AACAAIAAAIAAAP9/AIAAgA=="
}
```

### session.input_audio.mute

Mute audio input to the Live model without closing the session. The server acknowledges with `session.input_audio.muted`.
