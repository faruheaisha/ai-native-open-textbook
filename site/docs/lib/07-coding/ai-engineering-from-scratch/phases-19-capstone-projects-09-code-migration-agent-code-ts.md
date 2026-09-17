---
title: "Code migration agent dashboard (TypeScript skeleton)"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/09-code-migration-agent/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/09-code-migration-agent/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/09-code-migration-agent/code/ts/README.md"
sourceSha256: "8e39bafa5841f89aa0364a3f614e6787fb0d0a40ef7a9502222249ead0674a5d"
pageSha256: "8e39bafa5841f89aa0364a3f614e6787fb0d0a40ef7a9502222249ead0674a5d"
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

- Source lesson: `phases/19-capstone-projects/09-code-migration-agent/docs/en.md`
- Recipes: [OpenRewrite](https://docs.openrewrite.org), libcst.
