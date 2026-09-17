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
pageSha256: "4e27cc746886f7d07d08379540ab712ed50ac69a709f10ffbe520bb838395390"
contentMode: "local-full"
zh: ""
---

## Intent

Introduce a Better Harness checkpoint as a sealed, local state anchor for one
completed Harness artifact run. Later analysis can list, inspect, validate, and
selectively load allowlisted prior context without changing project files,
restoring an agent transcript, switching a Git branch, or claiming that old
artifact bytes have been retained.

The design adopts Entire CLI's separation between a lightweight checkpoint
summary and checkpoint content, but rejects Entire's code-state and Git-history
semantics. In Better Harness, a checkpoint is a run continuity index, not a
source-code rollback mechanism.
