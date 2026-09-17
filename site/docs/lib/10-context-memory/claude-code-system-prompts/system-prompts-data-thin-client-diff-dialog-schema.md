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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-thin-client-diff-dialog-schema.md"
sourceRel: "system-prompts/data-thin-client-diff-dialog-schema.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-thin-client-diff-dialog-schema.md"
sourceSha256: "59320c0c92eb53605539c1ba30db633ae8e561fc7e2b799a732086b883393569"
pageSha256: "59320c0c92eb53605539c1ba30db633ae8e561fc7e2b799a732086b883393569"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal Workspace git diff for the thin-client /diff dialog. diff is null when the workspace is not a git repo or is in a transient git state (merge/rebase/cherry-pick). Paths in skippedLarge carry no hunks entry at all — membership alone marks them as too large. An entirely empty hunks array with non-empty perFileStats is not by itself a failure signal: it is the normal shape when all changes are untracked (stats only — git diff emits no hunks for untracked files) or every file was withheld, and can also occur when the hunks fetch transiently failed and only stats are available.
