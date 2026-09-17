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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-workspace-trust-directory-field.md"
sourceRel: "system-prompts/data-sdk-workspace-trust-directory-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-workspace-trust-directory-field.md"
sourceSha256: "975f2e52c90e4606375e60b89da8922dcaf01639ecef41344d3989d36c0fd9e6"
pageSha256: "975f2e52c90e4606375e60b89da8922dcaf01639ecef41344d3989d36c0fd9e6"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Absolute path of the directory the user accepted, as it exists on the machine the CLI runs on. Honored only when it resolves to the trust key of the session working directory (the canonical git root when inside a repository, so a repository root and its linked worktrees agree); a network or obfuscated spelling, a path that is not a directory here, or one that resolves elsewhere records nothing. The grant covers that whole repository, exactly as the terminal trust dialog and set_cwd do, so a host whose folder sits inside a repository should name the repository root in its dialog.
