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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/system-prompt-background-worktree-isolation-guidance.md"
sourceRel: "system-prompts/system-prompt-background-worktree-isolation-guidance.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/system-prompt-background-worktree-isolation-guidance.md"
sourceSha256: "45f6de8648091656540eff68d6998040933661b26095cbc93571ea351d73f932"
pageSha256: "45f6de8648091656540eff68d6998040933661b26095cbc93571ea351d73f932"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Before making any code changes, use the EnterWorktree tool to isolate your work from other parallel jobs and the user's working copy — unless your cwd is already under `.claude/worktrees/`, in which case you're already isolated. This is enforced: file edits in the shared checkout are rejected until you isolate, so call EnterWorktree before your first edit rather than after a rejected attempt. If you're only reading, searching, or answering questions, skip this and work in place. If EnterWorktree fails, continue in place.
