---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/claude-code-releases.md"
sourceRel: "guide/core/claude-code-releases.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/claude-code-releases.md"
sourceSha256: "55f65e8656bd4d5aa12299ad17ed58a1b97e06151d418a538461d12cc4a87134"
pageSha256: "1411c2053844c978e0c1920b74f25a553851ec62d56c447742ef50f5a2ef41e3"
contentMode: "local-full"
zh: ""
---

## Milestone Features

| Version | Key Features |
|---------|--------------|
| **v2.1.232** | Subagent forking on by default (fork inherits conversation + prompt cache), `@`-mention another session by name, GitLab plugin marketplaces and token redaction |
| **v2.1.224** | Self-hosted environments (`claude self-hosted-runner`) for Team and Enterprise, cross-session `SendMessage` across your machines, `archive` plugin source over HTTPS |
| **v2.1.219** | Claude Opus 5 becomes the default Opus model (1M context, fast mode $10/$50 per Mtok), `DirectoryAdded` hook, `sandbox.network.strictAllowlist`, subagent nesting restored to depth 3 |
| **v2.1.218** | `/code-review` runs as a background subagent, agent frontmatter hooks require workspace trust, `context: fork` skills background by default |
| **v2.1.217** | Concurrent subagent cap (default 20), `--max-budget-usd` halts background subagents, MCP truncated-output memory leak fixed |
| **v2.1.214** | Eight Bash permission-check security fixes, EndConversation tool, heartbeat for long-running tool calls, OTel message-level correlation attributes |
| **v2.1.212** | `/fork` copies the conversation into a new background session (in-session subagent renamed `/subtask`), WebSearch + subagent-spawn session caps, MCP calls auto-background after 2 min |
| **v2.1.208** | Screen reader mode (opt-in plain-text rendering), `vimInsertModeRemaps`, `CLAUDE_CODE_PROCESS_WRAPPER` corporate launcher support |
| **v2.1.198** | Subagents run in the background by default, Claude in Chrome generally available |
| **v2.1.197** | Claude Sonnet 5 becomes the default model, native 1M-token context, promotional pricing $2/$10 per Mtok through August 31 |
| **v2.1.69** | InstructionsLoaded hook, 4 security fixes, 15+ memory fixes, Voice STT 20 languages |
| **v2.1.68** | ultrathink re-introduced, Opus 4.6 medium effort default, Opus 4/4.1 removed |
| **v2.1.63** | HTTP hooks, worktree config sharing, /simplify + /batch bundled commands |
| **v2.1.32** | Opus 4.6, Agent teams preview, Automatic memory |
| **v2.1.18** | Customizable keyboard shortcuts with /keybindings |
| **v2.1.16** | New task management system with dependency tracking |
| **v2.1.0** | Skill hot-reload, Shift+Enter OOTB, Vim motions, /plan command |
| **v2.0.74** | LSP tool for code intelligence |
| **v2.0.72** | Claude in Chrome (browser control) |
| **v2.0.67** | Thinking mode default for Opus 4.5 |
| **v2.0.64** | Instant auto-compact, async agents, named sessions |
| **v2.0.60** | Background agents |
| **v2.0.51** | Opus 4.5, Claude Code for Desktop |
| **v2.0.45** | Microsoft Foundry, PermissionRequest hook |
| **v2.0.28** | Plan subagent, subagent resume/model selection |
| **v2.0.24** | Web teleport, Sandbox mode |
