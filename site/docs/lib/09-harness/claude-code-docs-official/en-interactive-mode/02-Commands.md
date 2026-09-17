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
sourceRel: "en/interactive-mode.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/interactive-mode.md"
sourceSha256: "a43f4a145320ecff8da141c321f3220246884acb226285095ad0ff123ceb2b60"
pageSha256: "545e98989e197dc9fd9c4a838156b05b18c29c2af816bc3970120a0905053cbc"
contentMode: "local-full"
zh: ""
---

## Commands

Type `/` in Claude Code to see the commands available to you, or type `/` followed by any letters to filter. The `/` menu lists built-in commands, bundled and user-authored [skills](https://code.claude.com/docs/en/skills), and commands contributed by [plugins](https://code.claude.com/docs/en/plugins) and [MCP servers](https://code.claude.com/docs/en/mcp#use-mcp-prompts-as-commands). Not all built-in commands are visible to every user since some depend on your platform or plan, and [a few available commands are hidden from the menu by design](https://code.claude.com/docs/en/commands#how-the-command-menu-matches-what-you-type) and run when you type their full name.

In [fullscreen rendering](https://code.claude.com/docs/en/fullscreen#use-the-mouse), the `/` command and `@` file suggestion lists also respond to the mouse: hovering highlights a row and clicking accepts it.

See the [commands reference](https://code.claude.com/docs/en/commands) for the full list of commands included in Claude Code.

### Complete a command mid-prompt

Command completion also works partway through a prompt: type `/` after a space, then the first letters of a name, as in `run the tests, then /com`. Only commands whose names start with those letters match, so a file path such as `/tmp/notes.md` doesn't keep a list open. Claude Code runs a command itself only when the command [starts your message](https://code.claude.com/docs/en/commands).

* **In [fullscreen rendering](https://code.claude.com/docs/en/fullscreen)**: the matches open as a list while you type, with no row highlighted, so `Enter` still sends your prompt as typed. Press `Tab` to insert the top match, or pick a row with the arrow keys and `Enter`.
* **Outside fullscreen**: the rest of the top match appears as ghost text at your cursor, with a count such as `+2` when more commands match. Press `Tab` to insert the only match, or to open the list when several match, then pick a row with the arrow keys and `Enter`.

In both renderers, press `Tab` on a bare mid-prompt `/` to list every command.

A plugin skill matches on its bare name too, so `/deploy` finds a skill named `myplugin:deploy-app`. When you insert the match, Claude Code writes the full `/myplugin:deploy-app`.
