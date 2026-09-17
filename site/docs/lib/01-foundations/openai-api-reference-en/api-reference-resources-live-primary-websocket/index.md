---
title: "Primary WebSocket"
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
pageSha256: "e6048aaeee2e65b274797269d9ea08fad55f136f4efb2df686787c4677130e1c"
contentMode: "local-full"
zh: ""
---

# Primary WebSocket

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Connect from your backend server with your OpenAI API key to start a Live session. Send and receive audio and control events on the same WebSocket connection.

WS `/v1/live/sessions`

## Connection

`wss://api.openai.com/v1/live/sessions`

Authenticate from your backend with your OpenAI API key in the `Authorization: Bearer $OPENAI_API_KEY` header. Keep the key on your server.

No query parameters. After connecting, send session.start with your model and session configuration. Wait for session.started before sending audio.

## Inputs

Required once, immediately after connecting. Configure the session here, then send audio and other client events.

### First message: session.start

```json
{
  "type": "session.start",
  "event_id": "evt_start_001",
  "session": {
    "model": "gpt-live-1",
    "instructions": "Help the caller plan a restaurant reservation. Confirm details before booking.",
    "audio": {
      "format": {
        "type": "audio/pcm",
        "rate": 24000
      },
      "output": {
        "voice": "marin"
      }
    },
    "delegation": {
      "type": "client"
    }
  }
}
```

[All client events](#client-events)

## Outputs

The server confirms the session has started. Audio, transcripts, and other server events follow as the session runs.

### Session ready · excerpt: session.started

```json
{
  "type": "session.started",
  "event_id": "event_started_1",
  "session": {
    "id": "live_123",
    "expires_at": 1788307200,
    "status": "active",
    "model": "gpt-live-1"
  }
}
```

[All server events](#server-events)

[Using WebRTC on the frontend? Attach a sideband WebSocket from your backend.](https://developers.openai.com/api/reference/resources/live/sideband-websocket)

## Client events

### session.start

Start a Live session on a primary WebSocket. Send this event before other commands and wait for `session.started`.

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
