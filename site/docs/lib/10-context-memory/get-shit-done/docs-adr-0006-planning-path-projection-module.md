---
title: "Planning Path Projection Module for SDK query handlers"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/adr/0006-planning-path-projection-module.md"
sourceRel: "docs/adr/0006-planning-path-projection-module.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/adr/0006-planning-path-projection-module.md"
sourceSha256: "b43c07233034d85cd760df8523c6fb5b1d39335cfcb3dd9fd0b721a14afbe738"
pageSha256: "b43c07233034d85cd760df8523c6fb5b1d39335cfcb3dd9fd0b721a14afbe738"
contentMode: "local-full"
zh: ""
---

# Planning Path Projection Module for SDK query handlers

- **Status:** Accepted
- **Date:** 2026-05-09

We decided to centralize SDK planning-path projection behind one Module interface instead of reconstructing `.planning` paths in each handler with ad-hoc joins. This deepens the planning seam and prevents path-policy drift between helper and caller layers.

## Decision

- `helpers.planningPaths(projectDir, workstream?)` is the canonical SDK projection interface for planning paths.
- `helpers.planningPaths` delegates to `workspacePlanningPaths` + `resolveWorkspaceContext` for policy, not duplicate local path composition.
- Policy precedence is explicit and stable: `explicit workstream > env workstream > env project > root`.
- Query/init handlers (`initExecutePhase`, `initPlanPhase`, `initPhaseOp`, `initMilestoneOp`) must consume `planningPaths(...).planning` rather than direct `relPlanningPath` joins.
- SDK project scope for planning is `.planning/<project>` (never `.planning/projects/<project>`), aligned with CJS planning workspace behavior.

## Consequences

- One fix in planning path policy updates all handlers and reduces regression surface.
- Tests can target seam behavior (`workspace.test.ts`, `helpers.test.ts`, init handler tests) instead of source-grep heuristics.
- Cross-package parity bugs between SDK and CJS planning path resolution become easier to detect and correct.
