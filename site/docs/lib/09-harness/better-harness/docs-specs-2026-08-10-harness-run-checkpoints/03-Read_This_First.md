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
pageSha256: "eeba0709fdbda01d1b98f8993264cb3f75d236b4708b727e5f72d4bcb1ea6a3c"
contentMode: "local-full"
zh: ""
---

## Read This First

- Flow: completed run -> topology/target binding -> analysis intake/validation
  adapter -> sealed envelope substrate -> Better Harness user-state store -> read-only inspect or allowlisted
  learning-context load.
- Native report/selection/component meaning stays in
  `harness-analysis/checkpoint-adapter.mjs`; generic sealing stays in
  `harness-checkpoint/`.
- The normative object is in **Envelope Contract**, path/discovery rules are in
  **Storage and Lifecycle**, callable behavior is in **Public Surface and
  Errors**, and growth rules are in **Versioning and coexistence**.
- V1 never retains artifact bytes, restores code, resumes native sessions,
  merges platform-scoped catalogs, or turns selection/component anchors into
  mutation.
- Multi-host rule (`HRC-AC-16`): implicit learning scan is Qoder-only; every
  other host must supply `--previous-checkpoint` or `--previous-findings` for
  host-correct continuity.

V1 invariants: create is explicit; one immutable envelope is written; artifacts
are referenced rather than copied; artifact kinds and four anchor rows are
closed; topology root plus target identity binds continuity; only learning
capture grants resume-context; Better Harness owns one Git-neutral state store;
platform is provenance/filter data; selection and component state never
authorize mutation; V2 is required before widening any of those semantic
boundaries.
