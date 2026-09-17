---
title: "Code migration agent dashboard (TypeScript skeleton)"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/09-code-migration-agent/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/09-code-migration-agent/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/09-code-migration-agent/code/ts/README.md"
sourceSha256: "3ca26e620a26c7f413d5e112527995f9d64ce65afcfe8bdcbf6e805ce637f356"
pageSha256: "3ca26e620a26c7f413d5e112527995f9d64ce65afcfe8bdcbf6e805ce637f356"
contentMode: "local-full"
zh: ""
---

# Code migration agent dashboard (TypeScript skeleton)

Multi-file TypeScript skeleton for the dashboard layer of the code migration
agent capstone. The agent (Python) runs in a sandbox; this server renders
progress for the operator.

## Layout

- `src/index.ts` — entry point, simulates ticks and optionally serves HTTP.
- `src/server.ts` — Hono routes for `/`, `/dashboard`, `/migrations`, `/migrations/:id`.
- `src/migrations.ts` — per-file state machine and seed data.
- `src/cost.ts` — turn count and dollar budget enforcement.
- `src/types.ts` — shared types.
- `tests/*.test.ts` — `node --test` style tests via `tsx`.

## Install

```bash
npm install
```

## Run

```bash
npm start         # offline: simulate 40 ticks and print rollup
npm run serve     # serve the HTML dashboard on PORT (default 8009)
```

## Verify

```bash
npm run typecheck
npm test
```

## Spec references

- Source lesson: `phases/19-capstone-projects/09-code-migration-agent/docs/zh.md`
- Recipes: [OpenRewrite](https://docs.openrewrite.org), libcst.
