---
title: "Capstone 19/02 — RAG over Codebase (TypeScript)"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/02-rag-over-codebase/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/02-rag-over-codebase/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/02-rag-over-codebase/code/ts/README.md"
sourceSha256: "27c31d0e599cfadd5db1b7ff0aa8325dc1e7eb881004e83d376c56a9ed455fcb"
pageSha256: "27c31d0e599cfadd5db1b7ff0aa8325dc1e7eb881004e83d376c56a9ed455fcb"
contentMode: "local-full"
zh: ""
---

# Capstone 19/02 — RAG over Codebase (TypeScript)

Multi-file TypeScript code-search API for the hybrid retrieval pipeline
described in `../docs/zh.md`. Offline, deterministic, six-chunk sample corpus,
node:http behind a hono fetch handler.

## Layout

```text
src/
  index.ts        entry point; boots node:http + self-probe + exits 0
  server.ts       hono routes (/healthz, /query) with zod-validated POST body
  retrieval.ts    runQuery + RRF merge over dense and BM25
  index_store.ts  FNV-1a hash embedder, cosine, field-weighted BM25
  corpus.ts       six-chunk sample (uploader / auth / client / catalog)
  types.ts        Chunk, RankedChunk, QueryResponse, anchor()
tests/
  index_store.test.ts
  retrieval.test.ts
  server.test.ts
```

## Run

```bash
npm install
npm start                # boots api, probes three queries, exits 0
npm start -- --serve     # keep server up; ctrl-c to stop
npm test                 # node --test runner via tsx
npm run typecheck        # tsc --noEmit
```

The non-interactive `npm start` path asserts that `/healthz` returns 200 and
that every probe query returns at least one citation. Routes:

- `GET /healthz` — returns `\{ok, corpus\}`.
- `GET /query?q=...` — runs a hybrid query.
- `POST /query` — JSON `\{q, topK?\}`, validated by zod (`topK` capped at 50).
