---
title: "Capstone 19/02 — RAG over Codebase (TypeScript)"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/02-rag-over-codebase/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/02-rag-over-codebase/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/02-rag-over-codebase/code/ts/README.md"
sourceSha256: "b66a047f05ff058f2e4f0c3f06cc96ad0053b5a56d2838a763735daa3bec56e0"
pageSha256: "b66a047f05ff058f2e4f0c3f06cc96ad0053b5a56d2838a763735daa3bec56e0"
contentMode: "local-full"
zh: ""
---

# Capstone 19/02 — RAG over Codebase (TypeScript)

Multi-file TypeScript code-search API for the hybrid retrieval pipeline
described in `../docs/en.md`. Offline, deterministic, six-chunk sample corpus,
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
