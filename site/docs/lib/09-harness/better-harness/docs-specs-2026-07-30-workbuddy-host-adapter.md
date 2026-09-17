---
title: "WorkBuddy Host Adapter"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-07-30-workbuddy-host-adapter.md"
sourceRel: "docs/specs/2026-07-30-workbuddy-host-adapter.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-07-30-workbuddy-host-adapter.md"
sourceSha256: "4de03b1e9fc93becdaf44371e86060fc1ad3e7f70493412eb8dde5d59a069e81"
pageSha256: "4de03b1e9fc93becdaf44371e86060fc1ad3e7f70493412eb8dde5d59a069e81"
contentMode: "local-full"
zh: ""
---

# WorkBuddy Host Adapter

## Traceability

- Spec ID: SPEC-2026-07-30-workbuddy-host-adapter
- Status: Implemented

## Intent

Add WorkBuddy as an analysis-capable source-local host so Better Harness can
collect WorkBuddy session evidence and configured-asset inventory with the same
privacy, selection, and reporting boundaries as the existing Codex, Cursor,
Qwen, and Pi hosts. WorkBuddy stores workspace-scoped JSONL transcripts under
