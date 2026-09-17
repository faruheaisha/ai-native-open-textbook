---
title: "Keep copied finding fixes bound without exposing local paths"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-07-30-html-finding-fix-callback.md"
sourceRel: "docs/specs/2026-07-30-html-finding-fix-callback.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-07-30-html-finding-fix-callback.md"
sourceSha256: "da5d23fed7d4e70f44c72c025ba7c9ecdce9851340cff8b055d8255d3cdd919a"
pageSha256: "da5d23fed7d4e70f44c72c025ba7c9ecdce9851340cff8b055d8255d3cdd919a"
contentMode: "local-full"
zh: ""
---

# Keep copied finding fixes bound without exposing local paths

## Traceability

- Spec ID: html-finding-fix-callback
- Review: QoderAI/better-harness#39
- Status: Implemented

## Intent

Make `Copy AI Fix` from a durable Codex HTML report executable by the
activated Better Harness Skill when the report remains in its generated
workspace-relative location. Preserve callback-free report compatibility and
the report's portable reader surface without embedding renderer-added absolute
workspace or artifact paths.

The callback is local action transport, not an analysis conclusion or
AI-authored reader field. Rendering must leave the persisted `findings.json`,
paired Markdown report, finding scores, and reviewed `aiFixPrompt` unchanged.

## Acceptance Scenarios

- AC-1: A report renders two Copy controls only for each finding whose reviewed
  `aiFixPrompt` is a non-empty, non-whitespace string. A finding without a
  usable prompt retains its details control but has no action row and no
  callback metadata.
- AC-2: A bound report embeds only a normalized workspace-relative POSIX route
  to the final `report.html`, plus finding ids and current revisions. It does
  not embed renderer-added absolute `workspacePath`, `findingsPath`,
  `dataPath`, or `target.path` values in either interaction payload.
- AC-3: When the current document is a `file:` URL whose decoded path ends in
  the exact embedded report route, Copy derives the workspace root and sibling
  final `findings.json` path locally. It appends exactly one
