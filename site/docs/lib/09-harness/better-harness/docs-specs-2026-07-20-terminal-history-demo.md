---
title: "Generalize the terminal history demo"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-07-20-terminal-history-demo.md"
sourceRel: "docs/specs/2026-07-20-terminal-history-demo.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-07-20-terminal-history-demo.md"
sourceSha256: "ef0e9862e1c4f253f4c9f23a35ce9689b15781cc010a4cf922704747b88b62a7"
pageSha256: "ef0e9862e1c4f253f4c9f23a35ce9689b15781cc010a4cf922704747b88b62a7"
contentMode: "local-full"
zh: ""
---

# Generalize the terminal history demo

## Traceability

- Spec ID: terminal-history-demo
- Status: Implemented

## Intent

Make the terminal history animation a project-neutral Better Harness development
tool. It should discover current report roots for one workspace or read
explicitly supplied host-specific roots without mixing unrelated projects.

## Acceptance Scenarios

- AC-1: The primary entrypoint and documentation use the Better Harness name;
  no pre-public compatibility wrapper remains.
- AC-2: With `--workspace <project>`, or the current working directory by
  default, discovery reads existing `.qoder/better-harness` and
  `.codex/better-harness` report roots. It may recognize the same product
  directory names below another first-level hidden host directory.
- AC-3: Repeated `--history-root <path>` arguments bypass workspace discovery,
  expand `~`, and may point directly at paths such as
  `~/.qoder/better-harness` or `~/.xx/better-harness`. Missing roots produce a
  concise diagnostic that names the attempted scope.
- AC-4: When multiple current host roots exist for one workspace, their valid
  `findings.json` runs form one chronological history with duplicate file paths
  removed. Report-contract boundaries remain visible and source artifacts are
  never rewritten.
