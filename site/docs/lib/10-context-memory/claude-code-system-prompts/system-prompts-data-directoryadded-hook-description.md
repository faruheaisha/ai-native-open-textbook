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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-directoryadded-hook-description.md"
sourceRel: "system-prompts/data-directoryadded-hook-description.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-directoryadded-hook-description.md"
sourceSha256: "d46c68d564cbad921d0b57010b4dd6e038741f7b10df8c4950e13498a1d2f9eb"
pageSha256: "d46c68d564cbad921d0b57010b4dd6e038741f7b10df8c4950e13498a1d2f9eb"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Fires after /add-dir or the register_repo_root SDK control request registers a new working directory, after the sandbox configuration has been refreshed — so sandboxed tools and permission state already see the new directory (hook commands themselves run unsandboxed).
Input to command is JSON with directory (absolute path) and source ("slash_command" or "register_repo_root").
Exit code 0 - command completes successfully
Other exit codes - stderr is debug-logged on both paths; for /add-dir, a failure count is summarized to Claude and hook systemMessage output reaches Claude as bounded context; for register_repo_root, everything is debug-logged only
