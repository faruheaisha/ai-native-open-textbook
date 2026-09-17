---
title: "Stabilize Scripts Refactoring Contracts"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-07-21-scripts-refactor-contracts.md"
sourceRel: "docs/specs/2026-07-21-scripts-refactor-contracts.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-07-21-scripts-refactor-contracts.md"
sourceSha256: "c7edfa5555bc566cff9a0cb94e7b23fe698c888aec6e6c9a12dfc61c471c13f7"
pageSha256: "c7edfa5555bc566cff9a0cb94e7b23fe698c888aec6e6c9a12dfc61c471c13f7"
contentMode: "local-full"
zh: ""
---

# Stabilize Scripts Refactoring Contracts

## Traceability

- Spec ID: 2026-07-21-scripts-refactor-contracts
- Status: Accepted

## Intent

Reorganize `scripts/` around clearer capability and CLI boundaries without
changing public command behavior, machine-readable output, report artifacts, or
documented compatibility entrypoints. Establish a committed characterization
baseline before moving implementation files so later refactor commits can be
reviewed against unchanged tests.

## Acceptance Scenarios

- AC-1: Characterization tests compare the exact maintainer-level root help,
  Harness group help, and session-analysis help emitted by the current primary
  CLI, including whitespace and trailing newlines.
- AC-2: Characterization tests freeze the complete command-routing projection:
  command and subcommand names, kinds, audiences, aliases, and exposed script
  paths. Existing direct paths remain callable compatibility entrypoints even
  when their implementation moves.
- AC-3: Characterization tests freeze representative failure behavior,
  including exit status, empty stdout, exact stderr text, and newline handling
  for unknown commands and subcommands.
- AC-4: Existing report, JSON, Markdown, Canvas, validation, and session-analysis
  tests pass before the refactor baseline is committed. The later refactor must
  pass the same tests without changing their expected output.
- AC-5: The baseline commit contains the spec and test-only assets, with no
  `scripts/` implementation change. Later refactor commits must leave all files
  under `test/` byte-for-byte unchanged relative to the baseline commit, checked
