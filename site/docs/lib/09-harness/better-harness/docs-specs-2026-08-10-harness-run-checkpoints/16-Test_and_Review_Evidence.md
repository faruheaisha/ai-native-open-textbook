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
pageSha256: "fdc5829890d757f969415aac734a96e10b97933ed6a14efedc0062ebed7ec8b7"
contentMode: "local-full"
zh: ""
---

## Test and Review Evidence

Planned tests:

- `test/harness-checkpoint-digest-vectors.test.mjs`: regenerate every normative
  workspace/state/envelope vector from the literal domain inputs above and
  compare the published hex values.
- `test/harness-checkpoint.test.mjs`: exact shape, versioning, canonical golden
  vectors and artifact ordering, digest tamper, containment/symlink and Windows
  paths, fixed catalog records/torn tails/cursors/scan budgets, atomic envelope
  plus catalog publication, stale artifacts, privacy, and substrate isolation.
- `test/harness-checkpoint-adapter.test.mjs`: exact intake/media/contract
  mapping, full/compact findings dispatch, anchor derivation, absent/empty/
  invalid learning ledgers, two-member topology target isolation, repo-root run
  for a member target, project-name independence, native owners, and one
  physical read per artifact.
- `test/harness-checkpoint-cli.test.mjs`: human/JSON actions, exit mapping,
  zero-side-effect help, OS/env state-home resolution, unchanged Git status,
  custom contained run, catalog cursor/scan flags, and file-mode validate.
- `test/learning-capture-state.test.mjs`: explicit success, option conflict,
  topology-root/target/digest/anchor/ledger failures, checkpoint platform
  plumbing, and literal `.qoder/better-harness` no-option fallback.
- `test/session-selection-plan.test.mjs`: public I/O-free profile/snapshot/pair
  validators, existing reader delegation, frozen identity, and absence of
  live-drift/resume claims.
- `test/harness-component-snapshot.test.mjs`: unchanged digest/diff/resolve and
  `mutationAuthorized: false`.
- `test/better-harness-cli.test.mjs` and
  `test/scripts-refactor-contract.test.mjs`: registry, audience, discovery,
  argv dispatch, help fixtures, and one-way import boundaries.

Planned commands:

```text
node --test test/harness-checkpoint-digest-vectors.test.mjs test/harness-checkpoint.test.mjs test/harness-checkpoint-adapter.test.mjs test/harness-checkpoint-cli.test.mjs
node --test test/learning-capture-state.test.mjs test/session-selection-plan.test.mjs
node --test test/harness-component-snapshot.test.mjs test/better-harness-cli.test.mjs
node --test test/doc-link-graph.test.mjs
node scripts/doc-link-graph/cli.mjs skills/better-harness
npm test
npm run pack:verify
git diff --check
```

The routing-graph command is expected to leave the skill-seeded graph unchanged
because this spec is not routed from `skills/better-harness`; implementation
must verify that expectation. Before acceptance, the independent spec review on
`complexity`, `convenience`, and `evolution` must have no P1/P2 findings. This
Draft does not authorize implementation.
