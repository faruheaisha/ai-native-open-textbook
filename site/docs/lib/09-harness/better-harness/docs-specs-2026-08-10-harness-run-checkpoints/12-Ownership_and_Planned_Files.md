---
title: "Better Harness（QoderAI）"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-10-harness-run-checkpoints.md"
sourceRel: "docs/specs/2026-08-10-harness-run-checkpoints.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-10-harness-run-checkpoints.md"
sourceSha256: "f7811fdcad2c22c4a893a1eef7e44f5a3bdc9dc613727ba7fc5f0559e5bfadbb"
pageSha256: "9a93799d458bae41f1b1db8ce3a522fbf620c0767b7f323913ced92d70fd92fb"
contentMode: "local-full"
zh: ""
---

## Ownership and Planned Files

- `scripts/harness-checkpoint/contract.mjs` — envelope, canonical JSON, ids,
  digests, anchors, and exact validation contract.
- `scripts/harness-checkpoint/references.mjs` — workspace reference and
  topology-root/target refs and canonical containment.
- `scripts/harness-checkpoint/state-root.mjs` — cross-platform Better Harness
  user-state resolution; no worktree writes.
- `scripts/harness-checkpoint/catalog.mjs` — fixed record, cursor, bounded tail
  reads, append/fsync, and diagnostics.
- `scripts/harness-checkpoint/store.mjs` — scoped envelope paths, atomic create,
  direct read, and catalog composition.
- `scripts/harness-checkpoint/index.mjs` — substrate exports only; no native
  artifact knowledge.
- `scripts/harness-analysis/checkpoint-adapter.mjs` — closed intake table,
  topology/target binding, native validator dispatch, anchors, byte validation,
  and learning-context resolution.
- `scripts/harness-analysis/fluency-dimensions.mjs` — existing owner of the
  imported Agent Work Loop model/contract constants; no checkpoint logic.
- `scripts/harness-analysis/checkpoint-cli.mjs` — parsing, help, human output,
  and JSON over the analysis adapter.
- `scripts/better-harness-cli/registry.mjs` — metadata-only advanced command.
- `scripts/workspace-topology/index.mjs` — existing public topology resolver and
  target contract used without duplicating monorepo logic.
- `scripts/session-analysis/index.mjs` and `selection-plan.mjs` — public
  I/O-free profile/snapshot/pair validation added beside existing readers.
- `scripts/harness-analysis/learning-capture-state.mjs` and
  `scripts/harness-analysis/task-loop-source.mjs` — explicit consumer option.
- `docs/ARCHITECTURE.md` — under `## Directory Conventions`, add a checkpoint
  ownership bullet immediately before the existing `scripts/plugin-lifecycle/`
  bullet: substrate scope, its six files, its single index, analysis
  adapter/CLI ownership, and the one-way dependency rule above.
- `docs/docs/concepts/harness-run-checkpoints.md` and
  `docs/docs/troubleshooting.md` — after behavior exists, document the advanced
  CLI, its non-restore boundary, stale-artifact failures, platform namespace,
  and the Qoder-only legacy fallback limitation from `HRC-AC-16`.

Contributor and agent routing is fixed:

| Change | Owner / required version |
| --- | --- |
| Envelope/reference/store mechanics | `scripts/harness-checkpoint/` |
| Intake, native artifact, anchors, or learning continuity | `scripts/harness-analysis/checkpoint-adapter.mjs` |
| Root command behavior | `scripts/harness-analysis/checkpoint-cli.mjs` plus metadata registry |
| New host | Existing `scripts/host-support/` admission only; no checkpoint storage metadata |
| New artifact kind, anchor kind, or resume capability | A reviewed V2 spec before implementation |
| Legacy/no-option learning behavior | `scripts/harness-analysis/learning-capture-state.mjs` |
| Any anchor, summary-count, or capabilities change | Update adapter reconstruction, substrate structural derivation, the Derived fields table, validation sequence, and cross-layer equality fixture together |
