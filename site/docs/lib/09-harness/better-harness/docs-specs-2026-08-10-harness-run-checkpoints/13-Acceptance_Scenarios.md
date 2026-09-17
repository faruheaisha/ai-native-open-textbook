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
pageSha256: "0545c84a1884ea89acb13b6585f6979173e52fa466f58558d27e917cc6691629"
contentMode: "local-full"
zh: ""
---

## Acceptance Scenarios

- **HRC-AC-1 (semantic boundary):** Checkpoint help says it anchors analysis
  state and cannot preserve or restore code, Git, config, native sessions,
  transcripts, or prompts.
- **HRC-AC-2 (sealed create):** A contained run writes one new immutable
  envelope plus one fixed catalog commit under user state, with random id,
  derived fields, artifact/state digests, and a valid checkpoint digest;
  referenced artifacts and Git status do not change.
- **HRC-AC-3 (deterministic intake):** Only exact intake-table filenames and
  explicit flags become artifacts; findings is required, optional outputs are
  inspect-only, paired selection input is enforced, and unknown files are
  ignored.
- **HRC-AC-4 (safe references):** Absolute, traversal, NUL, cross-topology-root,
  symlink/junction escape, directory, user-state, or external-temp targets fail
  before publication on Windows, macOS, and Linux; native realpath and the
  platform case rules reproduce the workspace golden vectors.
- **HRC-AC-5 (honest anchors):** Four rows are always present; unavailable shape
  and reason are explicit; a present invalid learning ledger fails rather than
  degrading to unavailable; component and selection never grant resume in V1.
- **HRC-AC-6 (digest separation):** Byte, native, selected-state, and envelope
  digests are independently checked and never substituted.
- **HRC-AC-7 (bounded discovery):** List follows newest catalog commits, reads
  at most the fixed scan budget independent of total count, and returns an
  opaque earlier cursor; torn/corrupt/missing entries produce partial safe
  diagnostics.
- **HRC-AC-8 (show/validate):** Show does not imply artifact verification;
  validate detects corrupt envelope, topology-root/target/version mismatch,
  missing or changed artifacts, invalid native contracts, and stale derived
  fields.
- **HRC-AC-9 (learning continuity):** A valid explicit checkpoint restores only
  the ledger; explicit missing/stale/unavailable inputs fail closed without
  modification-time fallback.
- **HRC-AC-10 (selection/component honesty):** Selection validates only its
  frozen profile/snapshot identity and makes no live drift or resume claim;
  component state remains inspect/diff-only with mutation unauthorized.
- **HRC-AC-11 (CLI effects):** CLI help is zero-read; list/show/validate are
  read-only; create writes only Better Harness user-state envelope/catalog data
  and leaves the worktree unchanged; JSON stdout is one document. The
  consumer-only continuity loader is also read-only, and V1 exposes no
  continuity CLI.
- **HRC-AC-12 (platform paths):** State-home resolution follows the normative
  Windows/macOS/Linux policy; platform remains provenance/filter data; custom
  topology-contained run paths work; path/argv behavior is cross-platform.
- **HRC-AC-13 (privacy):** Envelopes contain no absolute/home paths, session ids,
  prompts, transcripts, commands, credentials, or artifact bodies. Private
  selection snapshots remain referenced, never inlined.
- **HRC-AC-14 (stale artifacts):** Changed/deleted artifacts leave the checkpoint
  listable but make validate and affected continuity fail without digest repair.
- **HRC-AC-15 (compatibility/versioning):** With no checkpoint option existing
  behavior is unchanged, including the literal Qoder implicit-learning root for
  non-Qoder callers; V1 rejects unsupported versions and never scans future
  version stores, while future readers retain explicit V1 compatibility mode.
- **HRC-AC-16 (multi-host fallback hazard):** User and troubleshooting docs say
  non-Qoder continuity requires an explicit checkpoint/findings input; tests
  prove no-option still scans only the literal Qoder root, and the V2 path is an
  explicit scan root or removal of implicit scanning rather than copying that
  literal into community hosts.
