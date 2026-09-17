---
title: "Debug your configuration"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/debug-your-config.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/debug-your-config.md"
sourceSha256: "08a9a7963a467a947e86ce53d7545ab0701100f213f37232e54befed4441a137"
pageSha256: "08a9a7963a467a947e86ce53d7545ab0701100f213f37232e54befed4441a137"
contentMode: "local-full"
zh: ""
---

# Debug your configuration

> Diagnose why CLAUDE.md, settings, hooks, MCP servers, or skills aren't taking effect. Use /context, /doctor, /hooks, and /mcp to see what actually loaded.

When Claude ignores an instruction or a feature you configured doesn't appear, the cause is usually that the file didn't load, it loaded from a different location than you expected, or another file overrode it. This guide shows how to inspect what Claude Code actually loaded so you can narrow down which applies.

For installation, authentication, and connectivity problems, see [Troubleshoot installation and login](https://code.claude.com/docs/en/troubleshoot-install) instead.

## See what loaded into context

The `/context` command shows everything occupying the context window for the current session, broken down by category: system prompt, system tools, MCP tools, custom subagents with the source each loaded from, memory files, skills, and conversation messages. Run it first to confirm whether your `CLAUDE.md`, rules, or skill descriptions are present at all. The skills section in `/context` also includes [bundled skills](https://code.claude.com/docs/en/skills#bundled-skills), which `/skills` doesn't list.

For detail on a specific category, follow up with the dedicated command:

| Command          | Shows                                                                                                                                                                                                                                        |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/memory`        | Memory file locations across user and project scopes with the option to open each in your editor, plus access to the auto memory folder and the auto memory toggle                                                                           |
| `/skills`        | Available skills from project, user, and plugin sources                                                                                                                                                                                      |
| `/hooks`         | Active hook configurations                                                                                                                                                                                                                   |
| `/mcp`           | Connected MCP servers and their status                                                                                                                                                                                                       |
| `/permissions`   | Resolved allow and deny rules currently in effect                                                                                                                                                                                            |
| `/doctor`        | Setup checkup: installation health, invalid settings files, unused extensions, duplicate [subagent](https://code.claude.com/docs/en/sub-agents) names in the same directory, and checked-in `CLAUDE.md` content Claude can derive from the codebase, with proposed fixes |
| `/debug [issue]` | Enables debug logging for the session and prompts Claude to diagnose using the log output and settings paths                                                                                                                                 |
| `/status`        | Active settings sources, including whether managed settings are in effect                                                                                                                                                                    |

If a memory file is missing from the `/context` breakdown, check its location against [how CLAUDE.md files load](https://code.claude.com/docs/en/memory#how-claude-md-files-load). Subdirectory `CLAUDE.md` files load on demand when Claude reads a file in that directory with the Read tool, not at session start.

If `/context` confirms the file loaded but Claude still isn't following a particular instruction, the issue is likely how the instruction is written rather than whether it loaded. CLAUDE.md works well for the kinds of guidance you'd give a new teammate, such as project conventions, build commands, and where files belong.

Adherence drops when an instruction is vague enough to interpret multiple ways, when two files give conflicting direction, or when the file has grown long enough that individual rules get less attention. [Write effective instructions](https://code.claude.com/docs/en/memory#write-effective-instructions) covers the specificity, size, and structure patterns that keep adherence high.

  CLAUDE.md and permissions solve different problems. CLAUDE.md tells Claude how your project works so it makes good decisions. [Permissions](https://code.claude.com/docs/en/permissions) and [hooks](https://code.claude.com/docs/en/hooks) enforce limits regardless of what Claude decides. Use CLAUDE.md for "we do it this way here." Use permissions or hooks for security boundaries and anything that must never happen, where you need a guarantee instead of guidance.

## Check resolved settings

Settings merge across managed, user, project, and local scopes. Managed settings apply first when present. Among the rest, the closer scope overrides the broader one in the order local, then project, then user. Some settings can also be set by command-line flags or [environment variables](https://code.claude.com/docs/en/env-vars), which act as another override layer. When a setting doesn't seem to apply, the value you set is usually being overridden by another scope or an environment variable.

To find invalid settings files, run `claude doctor` from your terminal. It prints read-only installation and settings diagnostics without starting a session. For a full checkup that also proposes fixes and asks before applying them, run [`/doctor`](https://code.claude.com/docs/en/commands#all-commands) inside a session.

Run `/status` to see which settings sources are active, including whether managed settings are in effect. To understand which scope Claude Code uses for a given key, see [Settings precedence](https://code.claude.com/docs/en/settings#settings-precedence).

## Check MCP servers

Run `/mcp` to see every configured server, its connection status, and whether you have approved it for the current project. A server can be defined correctly but still not provide tools for a few common reasons:

* Project-scoped servers in `.mcp.json` require a one-time approval. If the prompt was dismissed, the server stays disabled until you approve it from `/mcp`.
* A server that fails to start shows as failed in `/mcp`. Relative file paths in `command` or `args` are a frequent cause, since they resolve against the directory you launched Claude Code from rather than the location of `.mcp.json`.
