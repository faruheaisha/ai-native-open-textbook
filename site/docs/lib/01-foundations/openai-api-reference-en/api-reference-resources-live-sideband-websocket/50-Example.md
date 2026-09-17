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
pageSha256: "518d8ce8889c8df630971778f6a495eb86856e4d46e1f7bc84ea5966b63caa41"
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

### transport.dtmf.received

A SIP DTMF keypress received from the caller. Delivered only to sideband observers.
