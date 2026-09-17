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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-command-plugin-source-command-field.md"
sourceRel: "system-prompts/data-command-plugin-source-command-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-command-plugin-source-command-field.md"
sourceSha256: "b07c16302a19d81a2cc4fba20d31f42d9ceb6a5b65c4bbb810e478e4e9c6c1c6"
pageSha256: "b07c16302a19d81a2cc4fba20d31f42d9ceb6a5b65c4bbb810e478e4e9c6c1c6"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Shell command that prints the absolute path of the plugin directory on stdout (exactly one line) and exits 0. It must leave a complete plugin in that directory before exiting; the directory is copied into the plugin cache, so the printed path may change between runs (it is re-resolved on every install and update, and once per session in the background). Runs through the platform shell (sh on macOS/Linux, cmd.exe on Windows) from the user's home directory with Claude Code's subprocess environment.
