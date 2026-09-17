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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-rewind-files-skippedlinks-field.md"
sourceRel: "system-prompts/data-rewind-files-skippedlinks-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-rewind-files-skippedlinks-field.md"
sourceSha256: "b8c25500bdb9e2b98fa5b35c081d8b0d98244778dadbfc18f369f593b3aa43c0"
pageSha256: "b8c25500bdb9e2b98fa5b35c081d8b0d98244778dadbfc18f369f593b3aa43c0"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Count of tracked files NOT restored or deleted because a symlink, hard link, or other non-regular file was detected at the tracked path, its parent directory no longer resolves to where it pointed when the checkpoint was taken, or its backup could not be safely read. Only populated by a real (non-dryRun) rewind — on a dryRun response the field is never set and the preview counts do not reflect link-safety refusals. Absent or 0 on a real rewind means no link-safety refusals occurred; other per-file failures (for example a missing backup file) are not counted here; they are reported in telemetry, and when every differing file fails to restore the rewind itself fails (canRewind: false).
