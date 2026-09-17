---
title: "WorkBuddy Best Practices"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/references/agent-customize/platforms/workbuddy.md"
sourceRel: "references/agent-customize/platforms/workbuddy.md"
rawUrl: "/raw/09-harness/better-harness/references/agent-customize/platforms/workbuddy.md"
sourceSha256: "f84474db32c87968b67d86cac200051ebb20503671f8f0a283eb583ecf59034e"
pageSha256: "f84474db32c87968b67d86cac200051ebb20503671f8f0a283eb583ecf59034e"
contentMode: "local-full"
zh: ""
---

# WorkBuddy Best Practices

Use this file for WorkBuddy-specific operating practice. Use `../routing.md`
for host-neutral owner selection and `codex.md`/`claude.md`/`qwen.md`/`pi.md`
for other host references. Do not copy WorkBuddy-only workflow advice into
shared docs unless there is matching surface evidence.

## Operating Frame

Treat WorkBuddy as a persistent personal-assistant harness layered over a
coding agent. It keeps standing identity context (`SOUL.md`, `IDENTITY.md`,
`USER.md`) and a global `AGENTS.md` in `~/.workbuddy`, injects them into every
conversation, and persists workspace-scoped transcripts per working
directory. Move repeated guidance into the global or project `AGENTS.md`,
turn repeated work into Skills, and install shared workflows through
WorkBuddy marketplaces.

## Durable Guidance

Use `AGENTS.md` for guidance that should load automatically. WorkBuddy loads
the global `~/.workbuddy/AGENTS.md` and the identity files as standing
context before project rules:

- repo layout and important directories
- build, test, lint, and local run commands
- engineering conventions and review expectations
- safety constraints and do-not rules

Keep the identity files (`SOUL.md`, `IDENTITY.md`, `USER.md`) focused on
stable operating posture; they enter every session, so oversized identity
context taxes each turn.

## Configured Surfaces

- **Skills**: `~/.workbuddy/skills/<name>/SKILL.md` follows the Agent Skills
  standard (`name` and `description` frontmatter). User-imported skills carry
  a `_user_meta.json` install record. The shared `~/.agents/skills/` and
  project `.agents/skills/` directories are also honored.
- **Marketplace plugins**: installed under
  `~/.workbuddy/plugins/marketplaces/<marketplace>/plugins/<plugin>/` with a
  `.codebuddy-plugin/plugin.json` manifest. Enabled state lives in
  `~/.workbuddy/settings.json` `enabledPlugins` keyed as
  `<plugin>@<marketplace>`. Marketplace records live in
  `plugins/known_marketplaces.json`.
- **MCP servers**: `~/.workbuddy/mcp.json` or `~/.workbuddy/.mcp.json`
  (`mcpServers`) declares user-scope MCP servers. Marketplace plugins can
  declare plugin-scope servers through the same filenames at the plugin root.
- **Project assets**: a project `.workbuddy/` directory can carry
  `skills/`, `rules/`, and `commands/`; project `AGENTS.md` provides repo
  rules.

## Session Evidence

WorkBuddy sessions are flat JSONL records under
