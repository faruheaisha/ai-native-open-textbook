---
title: "Lesson 13 - Stateless MCP Server (TypeScript)"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/13-mcp-server-with-registry/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/13-mcp-server-with-registry/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/13-mcp-server-with-registry/code/ts/README.md"
sourceSha256: "e0e52957e5f11b11d89b86220d3999aa8413d4be91ee211cc0e295a4a52cd5b4"
pageSha256: "e0e52957e5f11b11d89b86220d3999aa8413d4be91ee211cc0e295a4a52cd5b4"
contentMode: "local-full"
zh: ""
---

# Lesson 13 - Stateless MCP Server (TypeScript)

TypeScript half of the capstone. The Python side (`code/main.py`) ships the
registry and policy gate; this project is the MCP transport: hand-rolled
newline-delimited JSON-RPC 2.0 over stdio with three mock incident tools. It
implements MCP `2026-07-28` directly, without `@modelcontextprotocol/sdk`, so
you can inspect every byte on the wire.

The protocol is stateless even though the mock incident store persists data.
Every request repeats its protocol version and client capabilities in
`params._meta`; no connection, process, or earlier request establishes a
session. The server exposes mandatory `server/discover`, identifies itself in
every successful result, and publishes deterministic, cacheable tool listings.
`tools/call` validates arguments against the same bounded schemas returned by
`tools/list`; malformed arguments for a known tool return a complete tool result
with `isError: true` and never reach its executor.

The runtime identity is `com.example/internal-incidents`. It uses the reverse-DNS
namespace for the verified `example.com` publisher. A matching published
`server.json` must use that same name even though the local npm package has its
own private project name.

## Layout

```text
src/
  index.ts      entry: fixture demo (default) or stdio loop (--serve)
  transport.ts  stdin readline + fixture replay
  protocol.ts   request validation / server/discover / tools/list / tools/call
  tools.ts      three incident tools + executors
  types.ts      JSON-RPC + tool shapes
tests/
  protocol.test.ts  stateless metadata, discovery, tools, errors, roundtrip
```

## Run

```bash
npm install
npm run typecheck
npm test
npm start            # self-terminating fixture demo
npm run serve        # real stdio loop (waits on stdin)
```

The demo is self-terminating. The real stdio server stays alive until its input
stream closes; there is no MCP shutdown request or initialization handshake.
