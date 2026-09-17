---
title: "Sideband WebSocket"
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
pageSha256: "76bd8299248476cc7a1bbbe04ed75feb283e74b20afdf8d74c71faea2efdb2da"
contentMode: "local-full"
zh: ""
---

# Sideband WebSocket

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Attach your backend server to an existing Live session with your OpenAI API key. For example, when your frontend connects over WebRTC, use this WebSocket to handle events and control the session from your backend.

WS `/v1/live/sessions/\{session_id\}/attach`

## Connection

`wss://api.openai.com/v1/live/sessions/\{session_id\}/attach`

Authenticate from your backend with your OpenAI API key in the `Authorization: Bearer $OPENAI_API_KEY` header. Keep the key on your server.

`session_id` (required path parameter): The ID of the existing session to attach to.

Attaching does not create a session or replay earlier events. Audio stays on the primary connection. Do not send session.start or session.input_audio.append on this WebSocket.

## Inputs

For a session using Responses delegation, update its tool choice. The delegation type cannot change. There is no required first message after attaching.

### Example client event: session.update

```json
{
  "type": "session.update",
  "event_id": "update_1",
  "session": {
    "delegation": {
      "type": "responses",
      "responses": {
        "tool_choice": "required"
      }
    }
  }
}
```

[All client events](#client-events)

## Outputs

A configuration update is acknowledged with session.updated. You also receive subsequent session events; attaching alone does not trigger this event.

### Example server event · excerpt: session.updated

```json
{
  "type": "session.updated",
  "event_id": "event_updated_1",
  "client_event_id": "update_1",
  "session": {
    "id": "live_123",
    "expires_at": 1788307200,
    "status": "active",
    "model": "gpt-live-1"
  }
}
```

[All server events](#server-events)

[Need to start a session and stream audio from your backend? Use a primary WebSocket.](https://developers.openai.com/api/reference/resources/live/primary-websocket)

## Client events

### session.update

Update the delegation settings of an active Live session. The server acknowledges accepted changes with `session.updated`.

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
