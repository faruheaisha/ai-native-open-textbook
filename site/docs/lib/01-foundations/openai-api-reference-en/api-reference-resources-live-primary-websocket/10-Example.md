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
sourceRel: "api/reference/resources/live/primary-websocket.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/live/primary-websocket.md"
sourceSha256: "4558a25169681bbcab3ba8bc8e5bc27bbf2495d07378248f8dc8ef05d4b5ca8b"
pageSha256: "cd5d16046462d2c3c61c51a9846430dc36d425c25a2d9615ea13e80bf6de3be1"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.input_audio.unmute",
  "event_id": "evt_unmute_001"
}
```

### session.instructions.append

Append instructions to the Live conversation while it is running, optionally associating them with an existing client delegation.
