---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-code-review-phase-0-gather-the-diff.md"
sourceRel: "system-prompts/skill-code-review-phase-0-gather-the-diff.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-code-review-phase-0-gather-the-diff.md"
sourceSha256: "7c0d7c64d17bacdce48ef05cd8fe2fc6ed1f18cdc47e665ed2e77567733b29ea"
pageSha256: "7c0d7c64d17bacdce48ef05cd8fe2fc6ed1f18cdc47e665ed2e77567733b29ea"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

## Phase 0 — Gather the diff

Run `git diff @\{upstream\}...HEAD` (or `git diff main...HEAD` / `git diff HEAD~1`
if there's no upstream) to get the unified diff under review. If there are
uncommitted changes, or the range diff is empty, also run `git diff HEAD` and
include the working-tree changes in scope — the review often runs before the
commit. If a PR number, branch name, or file path was passed as an argument,
review that target instead. Treat this diff as the review scope.
