---
title: "Route explicit manual fixes without requiring a report callback"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-07-30-manual-direct-fix-routing.md"
sourceRel: "docs/specs/2026-07-30-manual-direct-fix-routing.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-07-30-manual-direct-fix-routing.md"
sourceSha256: "ca65d14bfb24dfce7be3d88e1355c530fa4fc471ee3548684dc3a3b82a0f8222"
pageSha256: "ca65d14bfb24dfce7be3d88e1355c530fa4fc471ee3548684dc3a3b82a0f8222"
contentMode: "local-full"
zh: ""
---

# Route explicit manual fixes without requiring a report callback

## Traceability

- Spec ID: manual-direct-fix-routing
- Review: QoderAI/better-harness#39
- Status: Implemented

## Intent

Let ChatGPT Desktop users invoke an explicit command such as
`/better-harness fix this issue` with a concrete problem, bounded change
request, and validation instructions without first generating a Better Harness
report. Preserve the Skill's existing review trigger surface and keep the
manual route separate from report-bound repair and ordinary Harness reviews.

The manual route may change only the task-local workspace authorized by the
prompt. It must not discover, update, or claim repair progress for a
`findings.json`.

## Acceptance Scenarios

- AC-1: A callback-free slash-command request selects Manual Direct Fix only
  when its first instruction is an explicit `fix`, `repair`, or `修复`
  directive and the prompt identifies a concrete problem or requested outcome.
  The agent inspects the smallest relevant owner, applies the bounded change,
  and runs the smallest relevant validation without requesting report callback
  fields or starting a new Harness review.
- AC-2: A request containing a machine-owned
