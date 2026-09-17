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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/system-prompt-avoiding-unnecessary-sleep-commands-part-of-powershell-tool-description.md"
sourceRel: "system-prompts/system-prompt-avoiding-unnecessary-sleep-commands-part-of-powershell-tool-description.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/system-prompt-avoiding-unnecessary-sleep-commands-part-of-powershell-tool-description.md"
sourceSha256: "a606181dced1accd7a8eded80d6cab5c258c6ebb842bcf4e6bc63765dbb0f5b3"
pageSha256: "a606181dced1accd7a8eded80d6cab5c258c6ebb842bcf4e6bc63765dbb0f5b3"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

- Avoid unnecessary `Start-Sleep` commands:
    - Do not sleep between commands that can run immediately — just run them.
    - If your command is long running and you would like to be notified when it finishes — simply run your command using `run_in_background`. There is no need to sleep in this case.
    - Do not retry failing commands in a sleep loop — diagnose the root cause or consider an alternative approach.
    - If waiting for a background task you started with `run_in_background`, you will be notified when it completes — do not poll.
    - If you must poll an external process, use a check command rather than sleeping first.
    - If you must sleep, keep the duration short to avoid blocking the user.
