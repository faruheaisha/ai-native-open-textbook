---
title: "ICM Session Starter"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/memory/icm-session-starter.md"
sourceRel: "examples/memory/icm-session-starter.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/memory/icm-session-starter.md"
sourceSha256: "c1c614dd25919f15fb09bd20f6e6988d852a177b8b81c644d085f66315077b0a"
pageSha256: "c1c614dd25919f15fb09bd20f6e6988d852a177b8b81c644d085f66315077b0a"
contentMode: "local-full"
zh: ""
---

# ICM Session Starter
> Paste this at the beginning of any Claude Code session to activate ICM context.
> Requires ICM installed and configured: `brew tap rtk-ai/tap && brew install icm`
> then `icm init --mode mcp && icm init --mode hook && icm init --mode skill`

---

# Context: ICM (Infinite Context Memory) active in this session

ICM is installed and configured on this machine. Use it to store and retrieve persistent
memory across sessions, bypassing context window limits.

## Available MCP tools

The `icm` MCP server is running. You have access to 22 `icm_*` tools for storing,
recalling, and managing persistent memory.

**Direct CLI** (via Bash if needed):

```bash
# Store a memory
