---
title: "Global Coding-Agent Assets"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/references/agent-customize/global-assets.md"
sourceRel: "references/agent-customize/global-assets.md"
rawUrl: "/raw/09-harness/better-harness/references/agent-customize/global-assets.md"
sourceSha256: "9429fb7ac038b00b4abe8c7781f114071fef0822e37dfb1b83b0e2b3edf5ff99"
pageSha256: "9429fb7ac038b00b4abe8c7781f114071fef0822e37dfb1b83b0e2b3edf5ff99"
contentMode: "local-full"
zh: ""
---

# Global Coding-Agent Assets

Use this reference when a readiness run, screenshot, or user request points to
Cursor, Qoder, Codex, Claude, Qwen, Copilot, Kimi Code, or DeepSeek Harness
(DSH) settings, installed
assets, global skills, user hooks, commands, agents, plugins, MCPs, or
memories. Treat this as a configured asset inventory, not a session behavior
report.

## Scope

- Project assets: `.cursor`, `.qoder`, `.codex`, `.claude`, `.agents`,
  `.github`, `.kimi-code`, `.kimi`, project rules, skills, agents, commands,
  hooks, workflows, settings, and MCP config.
- User/global assets: `~/.\{cursor,qoder,codex,claude,qwen,copilot,kimi-code\}`
  skills, hooks, commands, agents, rules, settings, and MCP config.
- Plugin/marketplace assets: provider plugin caches and install evidence under
  `~/.cursor`, `~/.qoder`, `~/.codex`, `~/.claude`, `~/.qwen`, `~/.copilot`,
  and `~/.kimi-code`, including plugin-declared Skills, MCPs, Commands, Hooks,
  Rules, and Subagents.
- Memories: `~/.qoder/memories/**` plus Qoder `SharedClientCache`
  `app-config.json` memory keys and `cache/db/*.db*` file presence; and Codex
  generated-memory metadata under `~/.codex/memories/` plus supported
  `config.toml` memory settings.
- Session observed behavior: cite `session-analysis.mjs sources/facets`
  separately; configured assets do not prove runtime use.

## Inventory Command

Run the read-only inventory when user-home or installed assets are in scope:

```bash
