---
title: "Claude transcript-dir slug must fold dots like Claude Code does"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-01-41-claude-transcript-dir-dot-slug.md"
sourceRel: "docs/specs/2026-08-01-41-claude-transcript-dir-dot-slug.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-01-41-claude-transcript-dir-dot-slug.md"
sourceSha256: "56e37114eb3223523e75b45727f32d7844e010ae4ffdf3a2a5ef405397b48bcf"
pageSha256: "56e37114eb3223523e75b45727f32d7844e010ae4ffdf3a2a5ef405397b48bcf"
contentMode: "local-full"
zh: ""
---

# Claude transcript-dir slug must fold dots like Claude Code does

## Traceability

- Spec ID: 41-claude-transcript-dir-dot-slug
- Story: QoderAI/better-harness#41
- Status: Implemented

## Intent

The Claude session-evidence collector derives the project-transcript directory
from the workspace path by replacing `/` (and drive-letter `:`) with `-`, but
Claude Code's own project-directory naming also replaces `.` with `-`. For any
workspace path containing a dot component (`~/.claude`, `~/src/foo.bar`,
`~/work/my.project`), the computed root does not exist and every
session-derived signal is silently computed from an empty set. The collector
must resolve the same directory name Claude Code actually creates so dotted
workspace paths stop reporting zero sessions.

## Acceptance Scenarios

- AC-1: `workspaceToClaudeSlugVariants("/Users/twurm/.claude")` includes
  `-Users-twurm--claude` (each `/` and `.` folded to `-`, dots not collapsed),
  and that variant is preferred as the primary slug.
- AC-2: A Claude provider fixture whose workspace path contains a dotted
  directory component discovers its transcript sessions from
