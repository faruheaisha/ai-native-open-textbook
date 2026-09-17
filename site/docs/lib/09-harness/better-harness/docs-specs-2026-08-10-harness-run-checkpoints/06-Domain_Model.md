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
pageSha256: "ec86e56f0cda52e4a9e74bfca83bf83460d1fef1e9c75e1a786d0554c62e4b4c"
contentMode: "local-full"
zh: ""
---

## Domain Model

### Run

A run is a caller-selected local artifact directory for one canonical topology
target, platform, evidence window, and report lifecycle. CLI `--workspace`
means the requested analysis target. The adapter resolves its public
workspace-topology contract; the topology root is the Git root when present and
otherwise the requested standalone directory. `run.runRef` is relative to that
topology root, so a repo-root render directory can safely anchor a member
target. A coding agent session and a Harness run are different concepts.

### Artifact

An artifact is an existing regular file beneath the canonical topology root. The
checkpoint records its portable `workspace:` reference, media type, byte size,
exact-byte digest, and detected native contract. V1 kinds are closed:

- `findings`;
- `report-markdown`;
- `report-html`;
- `canvas-data`;
- `canvas-module`;
- `report-source`;
- `component-snapshot`;
- `session-selection-profile`; and
- `session-selection-snapshot`.

Each kind appears at most once. Unknown run files are ignored, never assigned a
generic semantic role. Adding another artifact kind requires V2. The top-level
`artifacts` array is always emitted in the intake-table order below with absent
optional kinds skipped; envelope validation rejects any other order.

### Normative artifact intake

`scripts/harness-analysis/checkpoint-adapter.mjs` owns the closed intake
registry and all native-contract dispatch. Creation uses exact run-root
filenames for rendered outputs and exact CLI flags for supporting artifacts; it
does not recursively scan the run. Media type is derived from kind, never
sniffed or caller-supplied. `contract` is `null` for byte-only rows and the
listed native `\{ name, version \}` for structured rows.

| Artifact kind | Intake | Presence | Media type | Validation and recorded contract at create | Anchor |
| --- | --- | --- | --- | --- | --- |
