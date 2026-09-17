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
pageSha256: "395d4e96591f664fe961511638e7ce60c0473bf2509b853464502ce015a7321d"
contentMode: "local-full"
zh: ""
---

## Plan and Tasks

1. Implement canonical checkpoint substrate, state-home/catalog store, topology
   scope, the analysis adapter's closed intake registry, and the CLI
   (HRC-AC-1..HRC-AC-8, HRC-AC-11..HRC-AC-14).
2. Register the advanced CLI leaf and update inventory/help/side-effect fixtures
   (HRC-AC-7, HRC-AC-8, HRC-AC-11, HRC-AC-12).
3. Add explicit learning checkpoint loading while preserving the no-option
   fallback and documenting the multi-host limitation
   (HRC-AC-9, HRC-AC-15, HRC-AC-16).
4. Add I/O-free public selection validators and validate component/selection
   artifacts from the same once-read buffers through public owners
   (HRC-AC-5, HRC-AC-10).
5. Update architecture and concept/troubleshooting routes only after executable
   behavior exists. Do not edit release or version metadata.
6. Run Review Readiness Check over the implementation diff before commit.
