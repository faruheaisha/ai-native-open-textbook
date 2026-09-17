---
title: "LLM observability dashboard (TypeScript skeleton)"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/11-llm-observability-dashboard/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/11-llm-observability-dashboard/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/11-llm-observability-dashboard/code/ts/README.md"
sourceSha256: "5c67809604d8eb9a1de2d204c63f867b30c20d000346959bf4481728e372f2f8"
pageSha256: "5c67809604d8eb9a1de2d204c63f867b30c20d000346959bf4481728e372f2f8"
contentMode: "local-full"
zh: ""
---

# LLM observability dashboard (TypeScript skeleton)

Multi-file TypeScript skeleton for the LLM observability dashboard capstone.
A Hono server accepts OpenTelemetry GenAI spans, holds them in a 10k ring
buffer, and renders p50/p95/p99 latency and per-model cost.

## Layout

- `src/index.ts` — entry point, seeds synthetic spans and optionally serves HTTP.
- `src/server.ts` — Hono routes for `/trace`, `/`, `/dashboard`, `/dashboard.json`, `/healthz`.
- `src/spans.ts` — `RingBuffer` and `ObservabilityStore` (10k spans by default).
- `src/rollup.ts` — `percentile` and `rollUpByModel`.
- `src/pricing.ts` — 2026 per-model prices and cost helpers.
- `src/types.ts` — shared types.
- `tests/*.test.ts` — `node --test` style tests via `tsx`.

## Install

```bash
npm install
```

## Run

```bash
npm start         # seeds 1200 synthetic spans and prints the rollup
npm run serve     # also serves the HTTP ingest + dashboard on PORT (default 8011)
```

## Verify

```bash
npm run typecheck
npm test
```

## Spec references

- Source lesson: `phases/19-capstone-projects/11-llm-observability-dashboard/docs/zh.md`
- [OpenTelemetry GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
