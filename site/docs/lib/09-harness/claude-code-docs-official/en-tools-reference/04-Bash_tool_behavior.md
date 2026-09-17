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
sourceRel: "en/tools-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/tools-reference.md"
sourceSha256: "f928a98a3f2e69421eeadeb064439c827340f4b19a28c7ad920c2a0e60b142f9"
pageSha256: "1872f8d6959b3d87291f0080f1bd54cd7f6befd43e58834bf598d61b0033ab76"
contentMode: "local-full"
zh: ""
---

## Bash tool behavior

The Bash tool runs each command in a separate process.

### What persists between commands

* When Claude runs `cd` in the main session, the new working directory carries over to later Bash commands as long as it stays inside the project directory or an [additional working directory](https://code.claude.com/docs/en/permissions#working-directories) you added with `--add-dir`, `/add-dir`, or `additionalDirectories` in settings. This includes commands Claude runs in response to your later messages.
  * Subagent sessions never carry over working directory changes.
  * If `cd` lands outside those directories, Claude Code resets to the project directory and appends `Shell cwd was reset to <dir>` to the tool result.
  * To disable this carry-over so every Bash command starts in the project directory, set `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR=1`.
* Environment variables don't persist. An `export` in one command won't be available in the next.
* Aliases and shell functions defined in your shell startup file are available. At session start, Claude Code sources `~/.zshrc`, `~/.bashrc`, or `~/.profile` depending on your shell, captures the resulting aliases, functions, and shell options, and applies them to every Bash command.

Activate your virtualenv or conda environment before launching Claude Code. To make environment variables persist across Bash commands, set [`CLAUDE_ENV_FILE`](https://code.claude.com/docs/en/env-vars) to a shell script before launching Claude Code, or use a [SessionStart hook](https://code.claude.com/docs/en/hooks#persist-environment-variables) to populate it dynamically.

### Timeout and output limits

Each command runs under a timeout, and Claude manages it: when it wants longer than the default for a command, it passes the `timeout` parameter with that call — you never set a per-command timeout. Two [environment variables](https://code.claude.com/docs/en/env-vars) bound what Claude gets:

* `BASH_DEFAULT_TIMEOUT_MS` — the default when Claude passes no timeout; two minutes out of the box
* `BASH_MAX_TIMEOUT_MS` — with the default, sets the ceiling that caps whatever Claude requests: the effective ceiling is the larger of the two, ten minutes out of the box

#### Output limits

Claude Code streams a command's output to a working file as the command runs; a command whose output passes 5 GB is killed. When the command finishes, Claude Code reads the output back from that file, up to the read-back window described below. How much of the output reaches Claude inline depends on whether Claude Code treats the result as a failure:

| Result  | What Claude gets                                                                                                                                                                                                                             |
| :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Valid   | Inline up to roughly 30,000 characters by default; past that, the path of a file saved to the session directory and truncated past 64 MiB, plus a short preview from the start, and Claude reads or searches the file when it needs the rest |
| Failure | Inline up to roughly 10,000 characters; past that, a head-and-tail excerpt of that size cut from the read-back window, with no file path                                                                                                     |

A command that exits 1 counts as a valid result for the Bash tool only when Claude Code recognizes exit code 1 as a benign outcome for that command: `grep`, `rg`, `egrep`, `fgrep`, `find`, `diff`, `test`, and `[`, plus `git diff` and `git grep`. Every other command that exits 1 counts as a failure, even when exit 1 is a benign informational outcome: no matches for `pgrep` and `jq -e`, files that differ for `cmp`.

[`BASH_MAX_OUTPUT_LENGTH`](https://code.claude.com/docs/en/env-vars) sets how many characters of output Claude Code reads back from the working file into a command's result: 30,000 by default, up to a hard ceiling of 150,000. Raise it when your commands routinely overflow that window, such as a verbose build or a full test-suite log. Raising it enlarges the read-back window, which is also the window a failing command's excerpt is cut from. It doesn't raise the inline ceilings: a valid result over the inline ceiling arrives as a file path plus preview regardless of this variable.

To change how much of a valid result Claude receives inline, set the [`bashOutputMaxChars`](https://code.claude.com/docs/en/settings-reference#bashoutputmaxchars) setting instead, up to 128,000 characters. It sizes the inline ceiling and the read-back window together, and Claude Code then ignores `BASH_MAX_OUTPUT_LENGTH`. Requires Claude Code v2.1.261 or later.

### Background commands

For long-running processes such as dev servers or watch builds, Claude can set `run_in_background: true` to start the command as a background task and continue working while it runs. List and stop background tasks with `/tasks`. After you stop one there, or from a connected client such as the desktop app, Claude moves on instead of waiting for it. If a subagent started the command, it's that subagent that moves on.

A command that a [foreground subagent](https://code.claude.com/docs/en/sub-agents#run-subagents-in-foreground-or-background) started stops when that subagent gives its final response. A command that the main conversation or a background subagent started keeps running after a final response. In non-interactive mode with the `-p` flag, [background commands end shortly after the run's final result](https://code.claude.com/docs/en/headless#background-tasks-at-exit).

When a command reaches its timeout without finishing, Claude Code moves it to the background instead of stopping it, unless the command starts with `sleep`. Claude keeps working while the command continues. Claude Code applies the same lifetime rules to a moved command as to any other background command, so it still ends a foreground subagent's command at that subagent's final response. Setting [`CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1`](https://code.claude.com/docs/en/env-vars#variables) disables auto-backgrounding along with the rest of the background task functionality.

The result of a command moved to the background states what happened:

* When the timeout triggers the move, the result reports it explicitly: `Command did not complete within its 120s timeout and was moved to the background`, with the seconds matching the timeout that applied, followed by the task ID and the path of the file the output is being written to.
* A `cd`, `pushd`, `popd`, or `chdir` inside a command that is moved to the background never carries over: the result states `Session cwd remains <dir>; directory changes made by the backgrounded command do not apply to subsequent commands.`, so Claude doesn't act on a directory change that didn't happen.

### Memory limit on Linux and WSL

On Linux and WSL, set [`CLAUDE_CODE_TOOL_MEMORY_LIMIT`](https://code.claude.com/docs/en/env-vars#variables) to a size such as `4G` to cap the memory that Bash, PowerShell, and [Monitor](#monitor-tool) tool commands can use, so one runaway build can't take the memory the rest of the session needs. Requires Claude Code v2.1.233 or later. Before v2.1.246, Monitor tool commands ran outside the cap.

* Write the size as a number of bytes or with a `K`, `M`, `G`, or `T` suffix. Set `0`, `off`, `false`, `no`, or `none` to turn the cap off. Claude Code ignores any other value it can't read as a size, such as `4e9`.
* Claude Code counts all of a session's Bash, PowerShell, and Monitor commands against the one cap, not each command on its own.
* Claude Code applies the cap with a memory cgroup. When it can't set the cgroup up, commands run without a cap, and the debug log from `claude --debug` says why.
* After the first process Claude Code starts has turned the cap on, or has turned it off because of an off value or a failed cgroup setup, Claude Code holds that result until you relaunch. To apply a changed or removed value, or a fixed setup, launch `claude` again.
* When commands can't stay under the cap, the kernel kills a command, and nothing in its result names the cap.

Claude Code can also count other kinds of processes it starts against the same limit. Set [`CLAUDE_CODE_TOOL_MEMORY_CGROUP_EXCLUDE`](https://code.claude.com/docs/en/env-vars#variables) to a comma-separated list of the kinds to exempt from the cap; Claude Code applies the cap to every kind not on your list. Set it to `none` to cap every kind, or to `all-new` to cap only Bash, PowerShell, and Monitor tool commands. Requires Claude Code v2.1.246 or later. The kinds you can name:

* `mcp`: local [MCP servers](https://code.claude.com/docs/en/mcp)
* `lsp`: [language servers](#lsp-tool-behavior)
* `hooks`: [hook](https://code.claude.com/docs/en/hooks) commands
* `plugin`: commands that [plugins](https://code.claude.com/docs/en/plugins) run
* `helper`: Claude Code's own helper commands, such as `git`
* `agent`: child Claude Code processes, such as [agent teammates](https://code.claude.com/docs/en/agent-teams)

Whatever you list, these rules apply:

* **Unknown names**: Claude Code ignores names it doesn't recognize
* **Bash, PowerShell, and Monitor**: Claude Code keeps Bash, PowerShell, and Monitor tool commands under the cap whatever you list
* **Variable unset**: Claude Code takes the set of other capped kinds from configuration Anthropic delivers from the server, and that set can change over time, so set the variable when you need a set that doesn't change
* **Permission-gating hooks**: even with every kind capped, Claude Code excludes from the cap a hook that can block or change the outcome of an action, and any MCP server that such a hook calls, so the kernel killing a permission-gating hook can't allow the action it was blocking
