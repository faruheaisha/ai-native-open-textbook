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
pageSha256: "3e3ae70541464e201daa71b80957b11d07bf2e6476ab6b6bb6146afcf1b10576"
contentMode: "local-full"
zh: ""
---

#### Example

```json
{
  "type": "session.start",
  "session": {}
}
```

### session.update

Update the delegation settings of an active Live session. The server acknowledges accepted changes with `session.updated`.
