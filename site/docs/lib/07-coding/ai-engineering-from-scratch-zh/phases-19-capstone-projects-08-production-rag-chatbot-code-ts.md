---
title: "Capstone 08 - Production RAG Chatbot (TypeScript)"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/08-production-rag-chatbot/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/08-production-rag-chatbot/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/08-production-rag-chatbot/code/ts/README.md"
sourceSha256: "316be57ec336680c8b215429dfd59ad50ae0ae37ff8ff54ba5763564a58fb459"
pageSha256: "316be57ec336680c8b215429dfd59ad50ae0ae37ff8ff54ba5763564a58fb459"
contentMode: "local-full"
zh: ""
---

# Capstone 08 - Production RAG Chatbot (TypeScript)

Chat UI skeleton that streams a citation-anchored response over Server-Sent
Events. Pairs with the Python pipeline in `../main.py`. Conversation state lives
in an in-process Map keyed by `sessionId`, so the same session id can drive
multi-turn dialogues.

## Layout

```text
ts/
  package.json
  tsconfig.json
  src/
    index.ts        # entrypoint, demo + HTTP server
    server.ts      # hono app, /, /chat/stream (SSE), /sessions, /health
    session.ts     # SessionStore (Map<sessionId, Session>)
    stream.ts      # SSE frame encoder + parser + mock retrieval + tokenizer
    types.ts        # Session, Turn, Citation, KbEntry, SseEvent
  tests/
    session.test.ts
    stream.test.ts
    server.test.ts
```

## Run

```bash
npm install
npm run typecheck
npm test
npm start          # one self-check pass, exits 0
npm run serve      # interactive HTTP server on 127.0.0.1:<port>
```

The interactive server picks a free port when `PORT` is unset, mounts the chat
HTML client on `/`, and streams via `GET /chat/stream?sessionId=...&q=...`. The
demo client uses `EventSource` and listens for `session`, `citations`, `token`,
and `done` events.

## Tests

`node --test` runner via tsx. Coverage:

- SessionStore: create, lookup, append, list, no-op on missing id.
- SSE encoder + parser round-trip; retrieval boost by jurisdiction tag;
  tokenizer fallback + "See also" tail.
- Server: `/`, `/health`, `/chat/stream` happy path (session + citations +
  token + done), 400 on missing q, multi-turn session persistence,
  `/sessions` listing.
