---
title: "CJS↔SDK hard seam — one source of truth per Shared Module"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/adr/3524-cjs-sdk-hard-seam.md"
sourceRel: "docs/adr/3524-cjs-sdk-hard-seam.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/adr/3524-cjs-sdk-hard-seam.md"
sourceSha256: "2384b16da3b95072d4da8f08f2ec18bc71a63301895f9c25371bdd9cc7fdb7a5"
pageSha256: "2384b16da3b95072d4da8f08f2ec18bc71a63301895f9c25371bdd9cc7fdb7a5"
contentMode: "local-full"
zh: ""
---

# CJS↔SDK hard seam — one source of truth per Shared Module

- **Status:** Proposed
- **Date:** 2026-05-14
- **Tracking issue:** [#3524](https://github.com/gsd-build/get-shit-done/issues/3524)
- **Related PRD:** [`docs/prd/3524-cjs-sdk-hard-seam.md`](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/prd/3524-cjs-sdk-hard-seam.md)
- **Extends:** ADR-0005 (seam map) — adds the **Shared-Module Source Policy** to the seam family
- **Defers to:** ADR-0001 (Dispatch Policy Module), ADR-0003 (Model Catalog Module), ADR-0004 (Planning Workspace Module), ADR-0006 (Planning Path Projection Module), ADR-0009 (Shell Command Projection Module — post-Phase 3–4, also subsuming superseded ADR-0010)

We decided to harden the boundary between the CJS tooling layer (`get-shit-done/bin/lib/*.cjs`) and the SDK (`sdk/src/**/*.ts`) by making every Module that is conceptually shared between the two runtimes have exactly one hand-authored source of truth and at most one generated artifact per runtime. The trigger is the recurring drift bug class — #1535, #1542, #2047/#2052, #2638/#2655, #2653/#2670, #2687/#2706, #2798/#2816, #3055/#3116, #3523 — each of which was a fix landing on one side without the other.

The precedent shape is already in the repo. `sdk/scripts/gen-command-aliases.ts` emits `sdk/src/query/command-aliases.generated.ts` **and** `get-shit-done/bin/lib/command-aliases.generated.cjs` from one TypeScript source. `sdk/scripts/check-command-aliases-fresh.mjs` is the CI freshness gate. The two consuming sides are pure Adapters over the generated artifact. This ADR generalizes that pattern to the other Shared Modules and forbids the hand-synced-pair anti-pattern that produced #3523.

## Decision

### 1. Shared-Module Source Policy

A **Shared Module** is any Module whose Interface is consumed identically by both the CJS toolset and the SDK. The CONTEXT.md domain glossary already calls these out — e.g. `STATE.md Document Module` is explicitly typed as "Shared CJS/SDK pure transform Module."

For every Shared Module:
