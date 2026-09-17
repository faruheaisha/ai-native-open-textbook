---
title: "Capstone 19/03 — Realtime Voice Assistant (TypeScript)"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/03-realtime-voice-assistant/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/03-realtime-voice-assistant/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/03-realtime-voice-assistant/code/ts/README.md"
sourceSha256: "c31daddcef72005437836a8ffe6467691332150106e03062e1e57811cdfe737c"
pageSha256: "c31daddcef72005437836a8ffe6467691332150106e03062e1e57811cdfe737c"
contentMode: "local-full"
zh: ""
---

# Capstone 19/03 — Realtime Voice Assistant (TypeScript)

Multi-file TypeScript web-client harness for the streaming voice pipeline
described in `../docs/en.md`. Offline state-machine simulation plus a live
WebSocket server backed by the `ws` package.

## Layout

```text
src/
  index.ts        entry point; runs two offline sessions, probes the live ws, exits 0
  server.ts       hono /healthz + ws upgrade via WebSocketServer
  orchestrator.ts IDLE -> LISTENING -> WAITING -> THINKING -> SPEAKING with barge-in
  vad.ts          turn-completion scorer + synthetic 20ms-frame generator
  protocol.ts     zod-validated frame envelope (event / summary)
  types.ts        AudioChunk, Metrics, SessionOptions, SessionSummary
tests/
  vad.test.ts
  orchestrator.test.ts
  protocol.test.ts
```

## Run

```bash
npm install
npm start                # runs two offline sessions + ws self-probe, exits 0
npm start -- --serve     # keep ws server up; ctrl-c to stop
npm test                 # node --test runner via tsx
npm run typecheck        # tsc --noEmit
```

The non-interactive `npm start` path asserts the clean session reaches
`first_audio_out`, the barge-in session registers at least one barge-in event,
and the live WebSocket probe receives a `summary` frame before close.
