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
pageSha256: "afd10e866ec712facd8edaa039a41761652ee4122b9bb76dc52bb7313419cc56"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "info",
  "event_id": "evt_info_001",
  "code": "data_channel_permissions",
  "message": "The frontend data channel is configured with restricted event permissions."
}
```

### session.input_audio.append

Input audio received from the primary transport and reflected to a Live sideband connection before model-input muting.
