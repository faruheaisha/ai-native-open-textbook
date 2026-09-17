---
title: "LLM observability dashboard (TypeScript skeleton)"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/11-llm-observability-dashboard/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/11-llm-observability-dashboard/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/11-llm-observability-dashboard/code/ts/README.md"
sourceSha256: "c8a862766b2c0a6291cdd12b4df3bb4574047f3abed92e7ab98153a84c9ebdf3"
pageSha256: "c8a862766b2c0a6291cdd12b4df3bb4574047f3abed92e7ab98153a84c9ebdf3"
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

- Source lesson: `phases/19-capstone-projects/11-llm-observability-dashboard/docs/en.md`
- [OpenTelemetry GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
