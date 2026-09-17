---
title: "Fork WebSocket"
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
pageSha256: "917e01c4a4424785af2db6bc1a2604af868c646d61cc8d7f9b3342a419dd65e0"
contentMode: "local-full"
zh: ""
---

# Fork WebSocket

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Start a new Live session from stored conversation state. Send and receive audio and control events on the new WebSocket connection.

WS `/v1/live/sessions/\{session_id\}/fork`

## Connection

`wss://api.openai.com/v1/live/sessions/\{session_id\}/fork`

Authenticate from your backend with your OpenAI API key in the `Authorization: Bearer $OPENAI_API_KEY` header. Keep the key on your server.

`session_id` (required path parameter): The ID of the stored source session to fork. The fork receives a new session ID.

No query parameters. After connecting, send session.start with a session overrides object. An empty object inherits the stored configuration. Do not supply a new model. Wait for session.started before sending audio or other commands.

## Inputs

Required once after connecting. Omitted settings are inherited, including store. You may override Responses delegation settings, storage, and the new WebSocket audio format. Frontend client permissions apply only to WebRTC forks.

### First message: session.start

```json
{
  "type": "session.start",
  "session": {}
}
```

[All client events](#client-events)

## Outputs

The server confirms the new session is ready. Use its new ID for subsequent sideband connections and session controls.

### Fork ready · excerpt: session.started

```json
{
  "type": "session.started",
  "event_id": "event_started_1",
  "session": {
    "id": "live_fork_123",
    "expires_at": 1788307200,
    "status": "active",
    "model": "gpt-live-1"
  }
}
```

[All server events](#server-events)

[Learn how to store a session and fork its conversation.](https://developers.openai.com/api/docs/guides/live-conversations#store-and-fork-a-session)

## Client events

### session.start

Start a Live session after connecting to a stored session’s fork WebSocket. Send an empty `session` object to use the stored configuration.

## 本篇目录

- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
- [Schema](https://developers.openai.com/api/reference)
- [Example](https://developers.openai.com/api/reference)
