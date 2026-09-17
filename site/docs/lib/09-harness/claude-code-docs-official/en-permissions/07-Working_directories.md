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
sourceRel: "en/permissions.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/permissions.md"
sourceSha256: "6cc02236c28e33b38f1977f95d5c1b3c8805c0ad97cb377866cd1de1c5cb8cbc"
pageSha256: "397b13f08fdfbd5e6d4ed907ee360d95ea01407804d712e911600e36ff0c2599"
contentMode: "local-full"
zh: ""
---

## Working directories

By default, Claude has access to files in the directory where you launched it. That directory is the session's primary working directory until you [move the session with `/cd`](#move-the-session-to-another-directory). You can extend this access:

* **During startup**: use `--add-dir <path>` CLI argument
* **During session**: use `/add-dir` command
* **Persistent configuration**: add to `additionalDirectories` in [settings files](https://code.claude.com/docs/en/settings#where-settings-live)

Files in additional directories follow the same permission rules as the original working directory: they become readable without prompts, and file editing permissions follow the current permission mode.

You can't add most [network paths](https://code.claude.com/docs/en/errors#working-directory-is-a-network-path), such as the UNC share `\\server\share`, as working directories, because looking one up can contact the host it names. On Windows, map the share to a drive letter instead and pass the drive with `--add-dir` at launch.

Set [`permissions.blockReadsOutsideWorkingDirectories`](https://code.claude.com/docs/en/settings-reference#permissions-blockreadsoutsideworkingdirectories) to make the file tools refuse the paths it fences in every permission mode. In auto mode, Claude Code offers to turn it on the first time Claude [reads outside the working directories](https://code.claude.com/docs/en/permission-modes#first-read-outside-the-working-directories).

In background sessions on macOS, the session host requests access to protected folders such as `~/Desktop`, `~/Documents`, and `~/Downloads` separately from your terminal when Claude needs to read or write files there; if reads there fail with `Operation not permitted`, see [how to grant folder access to background sessions](https://code.claude.com/docs/en/agent-view#background-sessions-can’t-read-desktop-documents-or-downloads-on-macos).

### Move the session to another directory

To move the session to a different primary working directory, rather than [adding a directory](#working-directories) alongside the current one, run `/cd <path>`. Claude Code keeps the conversation, loads the new directory's `CLAUDE.md`, and prompts you to [trust the workspace](#project-allow-rules-and-workspace-trust) if you haven't worked in it before. Afterward, Claude Code [finds the moved session](https://code.claude.com/docs/en/sessions#resume-a-session) when you run `--resume` from the new directory.

As soon as you move, Claude Code applies the new directory's project configuration:

* Its project settings, including their permission rules and [hooks](https://code.claude.com/docs/en/hooks)
* Its [`.mcp.json` servers](https://code.claude.com/docs/en/mcp#project-scope), subject to the same [server approval](https://code.claude.com/docs/en/mcp#project-server-approvals-and-workspace-trust) as at startup, and the [local-scope](https://code.claude.com/docs/en/mcp#local-scope) MCP servers you registered in it
* The [plugins](https://code.claude.com/docs/en/plugins) its settings enable, its [skills](https://code.claude.com/docs/en/skills#discovery-from-parent-and-nested-directories), and its [subagents](https://code.claude.com/docs/en/sub-agents)
* Its [`env`](https://code.claude.com/docs/en/settings-reference#env) values, applied on top of the environment variables from the previous directory's settings, which stay in effect

Claude Code also disconnects the previous directory's project and [local-scope](https://code.claude.com/docs/en/mcp#local-scope) MCP servers, and the servers of [plugins](https://code.claude.com/docs/en/mcp#plugin-provided-mcp-servers) that are no longer enabled after the move. It takes [additional directories](#working-directories) from the new directory's settings instead of the previous one's, and keeps the directories you added with `--add-dir` or `/add-dir`. Hooks the move activates still receive [`$\{CLAUDE_PROJECT_DIR\}`](https://code.claude.com/docs/en/hooks#reference-scripts-by-path) set to the project root where the session started.

When the new directory isn't trusted yet, Claude Code lists in the trust prompt the allow rules, additional directories, hooks, and helper commands the directory's settings would activate, so you can review them before you accept. If you decline, the session stays where it is. Before v2.1.246, `/cd` didn't apply the new directory's settings, hooks, MCP servers, or skills until you resumed the session, and its trust prompt didn't list what the directory's settings would activate.

Restrict or disable `/cd` targets with [`Cd` permission rules](#cd).

### Additional directories grant file access, not configuration

Adding a directory extends where Claude can read and edit files. It doesn't make that directory a full configuration root: most `.claude/` configuration is not discovered from additional directories, though a few types are loaded as exceptions.

These exceptions apply only to directories added with the `--add-dir` flag or the `/add-dir` command, including directories the Agent SDK adds through the flag. Directories listed in `permissions.additionalDirectories` in a settings file grant file access only and don't load any of the configuration below.

The Agent SDK's [`additionalDirectories`](https://code.claude.com/docs/en/agent-sdk/typescript#options) option in TypeScript and [`add_dirs`](https://code.claude.com/docs/en/agent-sdk/python#claudeagentoptions) option in Python receive the exceptions too, even though the TypeScript option shares its name with the settings key. The SDK passes each entry to Claude Code as `--add-dir`, so those directories behave like flag-added directories. Skills, commands, and subagents from any flag-added directory load through the `project` [setting source](https://code.claude.com/docs/en/agent-sdk/claude-code-features#control-filesystem-settings-with-settingsources), so they don't load when you exclude that source with [`--setting-sources`](https://code.claude.com/docs/en/cli-reference) on the CLI or `settingSources` in the SDK, and [bare mode](https://code.claude.com/docs/en/headless#start-faster-with-bare-mode) skips the commands and subagents among them.

The following configuration types are loaded from `--add-dir` directories:

| Configuration                                                                         | Loaded from `--add-dir`                                                                                                                                            |
| :------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Skills](https://code.claude.com/docs/en/skills) in `.claude/skills/`                                             | Yes, with live reload                                                                                                                                              |
| [Command files](https://code.claude.com/docs/en/skills#where-skills-live) in `.claude/commands/`                  | Yes, without live reload. When the added directory and your project both define a command with the same name, Claude Code runs your project's command              |
| [Subagents](https://code.claude.com/docs/en/sub-agents) in `.claude/agents/`                                      | Yes, without live reload                                                                                                                                           |
| [Settings](https://code.claude.com/docs/en/settings) in `.claude/settings.json` and `.claude/settings.local.json` | `enabledPlugins` and [`extraKnownMarketplaces`](https://code.claude.com/docs/en/settings-reference#extraknownmarketplaces) keys only                                                           |
| [CLAUDE.md](https://code.claude.com/docs/en/memory) files, `.claude/rules/`, and `CLAUDE.local.md`                | Only when `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` is set. `CLAUDE.local.md` additionally requires the `local` setting source, which is enabled by default |

To load the skills, commands, and subagents from a subdirectory of your [primary working directory](#working-directories) mid-session, run `/add-dir` with that subdirectory's path. Claude Code loads them for the rest of the session without prompting you or adding a working directory, because the subdirectory is already readable. This requires Claude Code v2.1.257 or later.

Claude Code discovers output styles from the current working directory and its parents, your user directory at `~/.claude/`, and managed settings. Hooks and other `.claude/settings.json` keys load from the current working directory's `.claude/` folder with no parent-directory fallback, alongside your user `~/.claude/settings.json` and managed settings. `.claude/settings.local.json` loads from the git repository root instead, even when you start Claude Code in a subdirectory, except in the cases where Claude Code [doesn't use the repository root](https://code.claude.com/docs/en/settings#where-claude-code-looks-for-each-file), such as on Windows; before v2.1.211, it too loaded only from the current working directory. [Agent SDK](https://code.claude.com/docs/en/agent-sdk/claude-code-features#control-filesystem-settings-with-settingsources) sessions load it from the working directory in all versions.

To share that configuration across projects, use one of these approaches:

* **User-level configuration**: place files in `~/.claude/agents/`, `~/.claude/output-styles/`, or `~/.claude/settings.json` to make them available in every project
* **Plugins**: package and distribute configuration as a [plugin](https://code.claude.com/docs/en/plugins) that teams can install
* **Launch from the config directory**: run Claude Code from the directory containing the `.claude/` configuration you want
