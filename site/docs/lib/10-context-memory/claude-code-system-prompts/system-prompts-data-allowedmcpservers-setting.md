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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-allowedmcpservers-setting.md"
sourceRel: "system-prompts/data-allowedmcpservers-setting.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-allowedmcpservers-setting.md"
sourceSha256: "b3dc93c402ed102a782003088a0fa83f6d220f22ce11d235a89b890d3ec974cc"
pageSha256: "b3dc93c402ed102a782003088a0fa83f6d220f22ce11d235a89b890d3ec974cc"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Enterprise allowlist of the MCP servers users may use. Governs servers users add (user, project and local config, --mcp-config, agent frontmatter, plugins, claude.ai connectors); servers the organization itself delivers (managedMcpServers, and managed-mcp.json entries that use no ${VAR} expansion) are allowed without being listed; a managed-mcp.json entry that uses ${VAR\} expansion is still checked against this list. If undefined, all servers are allowed. If empty array, users can use no servers of their own. Denylist takes precedence - if a server is on both lists, it is denied.
