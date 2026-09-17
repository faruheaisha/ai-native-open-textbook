---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/hooks.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks.md"
sourceSha256: "a6f4f82aca2e63d64ba787c2dc8d735ff95ae86fd3a53471b87eb089133cbdca"
pageSha256: "155504b892440a907c78653fc3e1c1dd5f3ac9a774f55a113dcd9c9c504e6c20"
contentMode: "local-full"
zh: ""
---

### The `/hooks` menu

Type `/hooks` in Claude Code to open a read-only browser for your configured hooks. The menu shows every hook event with a count of configured hooks, lets you drill into matchers, and shows the full details of each hook handler. Use it to verify configuration, check which settings file a hook came from, or inspect a hook's command, prompt, or URL.

The menu displays all five hook types: `command`, `prompt`, `agent`, `http`, and `mcp_tool`. Each hook is labeled with a `[type]` prefix and a source indicating where it was defined:

* `User Settings`: from `~/.claude/settings.json`
* `Project Settings`: from `.claude/settings.json`
* `Local Settings`: from `.claude/settings.local.json`
* `Plugin Hooks`: from a plugin's `hooks/hooks.json`
* `Session Hooks`: registered in memory for the current session

Selecting a hook opens a detail view showing its event, matcher, type, source file, and the full command, prompt, or URL. The menu is read-only: to add, modify, or remove hooks, edit the settings JSON directly or ask Claude to make the change.
