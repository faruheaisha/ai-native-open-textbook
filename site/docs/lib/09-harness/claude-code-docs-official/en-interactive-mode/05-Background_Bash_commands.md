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
pageSha256: "971a0b9fb0bf0c037c9b7bf4506028f31ebb888653de8c8facc0729e2f9e1cd9"
contentMode: "local-full"
zh: ""
---

## Background Bash commands

Claude Code supports running Bash commands in the background, allowing you to continue working while long-running processes execute.

### How backgrounding works

When Claude Code runs a command in the background, it runs the command asynchronously and immediately returns a background task ID. Claude Code can respond to new prompts while the command continues executing in the background.

To run commands in the background, you can either:

* Prompt Claude Code to run a command in the background
* Press `Ctrl+B` to move a regular Bash tool invocation to the background. Tmux users must press `Ctrl+B` twice due to tmux's prefix key.

**Key features:**

* Output is written to a file and Claude can retrieve it using the Read tool
* Background tasks have unique IDs for tracking and output retrieval
* Background tasks are automatically cleaned up when Claude Code exits. On macOS and Linux, when you stop a background task from [`/tasks`](https://code.claude.com/docs/en/commands) or Claude Code stops it at exit, processes that detached from the task's shell, such as ones started under `setsid` or `timeout`, stop too
* If you background the session instead of exiting it, your background tasks keep running in the background session. See [background a running session](https://code.claude.com/docs/en/agent-view#from-inside-a-session)
* Background tasks are automatically terminated if output exceeds 5GB, with a note in stderr explaining why
* On macOS and Linux, Claude Code terminates running background tasks when the operating system signals memory pressure, provided the session has been idle for at least 30 minutes and no turn or subagent is running. Set [`CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP`](https://code.claude.com/docs/en/env-vars) to `1` to turn this off. Requires Claude Code v2.1.193 or later
* Background commands owned by a [subagent](https://code.claude.com/docs/en/sub-agents) have no time limit, except that a command owned by a subagent running in the foreground ends when that subagent gives its final response; see [Background commands](https://code.claude.com/docs/en/tools-reference#background-commands) in the tools reference. Before v2.1.218, neither the memory-pressure reap nor the former 60-minute limit on subagent commands covered commands moved to the background with `Ctrl+B`

To disable all background task functionality, set the `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` environment variable to `1`. See [Environment variables](https://code.claude.com/docs/en/env-vars) for details.

**Common backgrounded commands:**

* Build tools (webpack, vite, make)
* Package managers (npm, yarn, pnpm)
* Test runners (jest, pytest)
* Development servers
* Long-running processes (docker, terraform)

### Shell mode with `!` prefix

Run shell commands directly without going through Claude by prefixing your input with `!`:

```bash theme={null}
! npm test
! git status
! ls -la
```

Shell mode:

* Adds the command and its output to the conversation context
* Shows real-time progress and output
* Supports the same `Ctrl+B` backgrounding for long-running commands
* Doesn't require Claude to interpret or approve the command
* Supports history-based autocomplete: type a partial command and press `Tab` to complete from previous `!` commands in the current project
* Supports live file path autocomplete as of v2.1.193 on all platforms: type a token containing a forward slash, such as `./src/` or `~/`, to see a dropdown of matching files and directories, then press `Tab` to accept. Use forward slashes on Windows too; the dropdown is triggered by `/`, not `\`
* Exit with `Escape`, `Backspace`, or `Ctrl+U` on an empty prompt
* Pasting text that starts with `!` into an empty prompt enters shell mode automatically, matching typed `!` behavior

Unless your session is one of those listed under [strict sandbox mode](https://code.claude.com/docs/en/sandboxing#the-unsandboxed-retry-escape-hatch), commands you type in shell mode run outside the [sandbox](https://code.claude.com/docs/en/sandboxing) even when you've enabled sandboxing, because the sandbox applies to the commands Claude runs.

Claude responds to the command output automatically once it lands in the transcript, so you can run `! npm test` and get an explanation of the failures without a second prompt. The response costs the same as sending a normal prompt. To restore the earlier behavior where the output is added to context without a response, set [`respondToBashCommands`](https://code.claude.com/docs/en/settings-reference#respondtobashcommands) to `false` in `settings.json`. Before v2.1.186, shell mode always added output to context without a response.
