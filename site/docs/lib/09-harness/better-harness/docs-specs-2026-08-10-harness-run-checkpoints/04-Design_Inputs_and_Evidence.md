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
pageSha256: "369d9114e038c234b88e57d0940576e4493f8b27d70f82d6ee9de0cb933f011a"
contentMode: "local-full"
zh: ""
---

## Design Inputs and Evidence

The reference implementation is [entireio/cli](https://github.com/entireio/cli)
at commit `caa0c9be90261fb2b64bf6cfc7147ee3981494db`, inspected from a local checkout
on 2026-08-10. It is a design input, not a runtime dependency.

Relevant Entire CLI evidence:

- `docs/architecture/sessions-and-checkpoints.md` separates an active Session,
  ephemeral full-state checkpoints, persistent summaries, and session content.
- `api/checkpoint/interfaces.go` separates checkpoint `Read`/`List` from
  session-content reads and seals persistent writes behind typed operations.
- `cmd/entire/cli/checkpoint/checkpoint.go` makes ephemeral checkpoints full
  worktree state on shadow branches, while persistent checkpoints keep
  metadata and commit linkage.
- `cmd/entire/cli/checkpoint_resume.go` and `cmd/entire/cli/resume.go` show that
  Entire resume may switch branch/worktree context and write an agent's native
  session log. Better Harness must not inherit either behavior.
- `docs/architecture/ref-checkpoint-backend.md` solves remote Git-ref storage,
  discovery, push, and migration. Those problems are outside this local MVP.

Relevant Better Harness evidence:

- `scripts/harness-analysis/run-dir.mjs` allocates collision-safe report run
  directories.
- `scripts/harness-analysis/render-report.mjs` publishes an artifact set through
  a staging directory. `scripts/harness-analysis/report-run.mjs`, in contrast,
  states that `harness analyze` normally writes no files. A checkpoint therefore
  anchors a completed artifact run, normally after `harness render`, not every
  analysis call.
- `scripts/harness-analysis/learning-capture-state.mjs` restores one validated
  field projection from an earlier `findings.json`, but its implicit fallback
  recursively scans `.qoder/better-harness` and chooses by modification time.
- `scripts/harness-component-snapshot/` already owns component identity,
  revision, digest, diff, and rollback-reference resolution. Its resolver
  explicitly returns `mutationAuthorized: false`.
- `scripts/session-analysis/selection-plan.mjs` owns the selection profile and
  private fact snapshot. Those artifacts bind an eligible population but do
  not retain the actual plan or selected subset. Profile and snapshot digests
  are therefore a drift anchor, not selection-resume state.
- [Architecture Principles](/lib/09-harness/better-harness/docs-ARCHITECTURE) require capability ownership,
  public imports, parser-safe output, read-only defaults, explicit mutation,
  argv-array dispatch, and honest evidence classes.
