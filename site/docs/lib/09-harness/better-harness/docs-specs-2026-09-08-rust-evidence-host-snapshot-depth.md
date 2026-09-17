---
title: "Deepen Desktop evidence snapshots"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-09-08-rust-evidence-host-snapshot-depth.md"
sourceRel: "docs/specs/2026-09-08-rust-evidence-host-snapshot-depth.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-09-08-rust-evidence-host-snapshot-depth.md"
sourceSha256: "fc3b3d84667f23a9c13101d963b536a27f947a8ca3c493e8f71a4f9b5f1b244e"
pageSha256: "fc3b3d84667f23a9c13101d963b536a27f947a8ca3c493e8f71a4f9b5f1b244e"
contentMode: "local-full"
zh: ""
---

# Deepen Desktop evidence snapshots

## Traceability

- Spec ID: rust-evidence-host-snapshot-depth
- Status: Implemented
- Follows: `docs/specs/2026-09-08-rust-evidence-host-remaining-adapters.md`

## Intent

The remaining-adapter slice found every host, but several real Desktop
sessions still disappear or leak private text: compressed DSH artifacts, Pi
custom session directories, forked Pi transcripts that double-count a parent,
and retained prompts/tool detail that still carry credentials. Deepen the
existing snapshot — do not port the JS analyzers.

## Acceptance Scenarios

- **AC-1:** A workspace-qualified DSH `session.jsonl.zstd` is discovered when
  no uncompressed `session.jsonl` is present. Decode failure omits that
  artifact. Both files in one session directory are omitted as ambiguous.
- **AC-2:** Pi discovery honors `PI_CODING_AGENT_SESSION_DIR`, then
