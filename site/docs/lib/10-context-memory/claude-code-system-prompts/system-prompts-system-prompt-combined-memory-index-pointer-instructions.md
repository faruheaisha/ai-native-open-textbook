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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/system-prompt-combined-memory-index-pointer-instructions.md"
sourceRel: "system-prompts/system-prompt-combined-memory-index-pointer-instructions.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/system-prompt-combined-memory-index-pointer-instructions.md"
sourceSha256: "23e2365bd02e56bb2af6290076a15d32ef35d61ccb69dcd45018309220d7982d"
pageSha256: "23e2365bd02e56bb2af6290076a15d32ef35d61ccb69dcd45018309220d7982d"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

**Step 2** — add a pointer to that file in `${INDEX_FILE}` in the private directory. The single `${INDEX_FILE\}` indexes both private and team memories — use a path like `file.md` for private memories and `team/file.md` for team memories. Each entry should be one line, under ~150 characters: `- [Title](https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/file.md) — one-line hook`. It has no frontmatter. Never write memory content directly into `$\{INDEX_FILE\}`.
