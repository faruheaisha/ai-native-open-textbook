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
sourceRel: "en/sub-agents.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/sub-agents.md"
sourceSha256: "73532b0b6accc67223319be1b24adec1e3b41a9d96a580770694ce718437d2bc"
pageSha256: "991ec72912f766b20fd9ff1d4f3b8a9da85f44c054a1c3a3f515091c565eb3de"
contentMode: "local-full"
zh: ""
---

## Fork the current conversation

  Run a forked subagent with `/subtask`, which requires Claude Code v2.1.212 or later. When [agent view is turned off](https://code.claude.com/docs/en/agent-view#turn-off-agent-view), `/subtask` isn't available and `/fork` starts the forked subagent instead; otherwise `/fork` copies the whole session into a new [background session](https://code.claude.com/docs/en/agent-view#from-inside-a-session).

A fork is a subagent that inherits the entire conversation so far instead of starting fresh. This drops the input isolation that subagents otherwise provide: a fork sees the same system prompt, tools, model, and message history as the main session, so you can hand it a side task without re-explaining the situation. The fork's own tool calls still stay out of your conversation and only its final result comes back, so your main context window stays clean. Use a fork when any other subagent would need too much background to be useful, or when you want to try several approaches in parallel from the same starting point.

Claude starts a fork by requesting the `fork` subagent type through the Agent tool. You control whether it can with [fork mode](#turn-fork-mode-on-or-off), which is on by default in interactive sessions.

You can start a fork yourself with `/subtask` followed by a task, whether or not fork mode is on. On v2.1.161 through v2.1.211 the command is `/fork`. Claude Code names the fork from the first words of the task. The following example forks the conversation to draft test cases while you continue with the implementation in the main session:

```text wrap theme={null}
/subtask draft unit tests for the parser changes so far
```

The fork appears in a panel below your prompt and runs in the background while you keep working. When it finishes, its result arrives as a message in your main conversation. The next section covers the panel controls for watching and steering forks while they run.

### Observe and steer running forks

Running forks appear in a panel below the prompt input, with one row for the main session and one for each fork.

When a fork finishes successfully, Claude Code removes its row. Claude Code keeps the row of a fork that failed or that you stopped for 30 seconds, [the same as for any other background subagent](#run-subagents-in-foreground-or-background). Before v2.1.232, Claude Code kept a finished fork's row for 30 seconds as well.

Use these keys to interact with the panel:

| Key       | Action                                                                                                                                                                                                               |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `↑` / `↓` | Move between rows                                                                                                                                                                                                    |
| `Enter`   | Open the selected fork's transcript and send it follow-up messages                                                                                                                                                   |
| `x`       | Stop the selected fork if it's running, or dismiss its row if it's no longer running. On the main session row, or on the row of the fork whose transcript you opened with `Enter`, `x` types into the prompt instead |
| `Esc`     | Return focus to the prompt input                                                                                                                                                                                     |

With a fork's or subagent's transcript open, follow-up messages and [skills](https://code.claude.com/docs/en/skills) go to that agent, but built-in commands still run in your main conversation. As of v2.1.199, typing `/model` or `/fast` in that view shows a notice that it changes the main conversation's model or fast mode, not the viewed agent's, instead of running it silently.

### How forks differ from other subagents

A fork inherits everything the main session has at the moment it spawns. Any other subagent starts fresh from its definition.

|                         | Fork                             | Non-fork subagent                                                                                                 |
| :---------------------- | :------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| Context                 | Full conversation history        | Fresh context with the prompt you pass                                                                            |
| System prompt and tools | Same as main session             | From the subagent's [definition file](#write-subagent-files), [filtered for background runs](#available-tools)    |
| Model                   | Same as main session             | From the subagent's `model` field                                                                                 |
| Permissions             | Prompts surface in your terminal | [Prompts surface in your main session](#run-subagents-in-foreground-or-background) when running in the background |
| Prompt cache            | Shared with main session         | Separate cache                                                                                                    |

Because a fork's system prompt and tool definitions are identical to the parent, its first request reuses the parent's [prompt cache](https://code.claude.com/docs/en/prompt-caching#subagents-and-the-cache). This makes forking cheaper than spawning a fresh subagent for tasks that need the same context.

When Claude spawns a fork through the Agent tool, it can pass `isolation: "worktree"` so the fork's file edits are written to a separate git worktree instead of your checkout. A fork can't spawn further forks.

### Turn fork mode on or off

Claude Code turns fork mode on by default in interactive sessions and leaves it off by default in [non-interactive mode](https://code.claude.com/docs/en/headless) with `-p` and in the Agent SDK. The interactive default requires Claude Code v2.1.232 or later. On earlier versions, set `CLAUDE_CODE_FORK_SUBAGENT` to `1` to turn fork mode on.

You can tell fork mode is on from how Claude Code handles the Agent tool:

* Claude can spawn a fork by requesting the `fork` subagent type. When Claude doesn't request a type, it gets the [general-purpose](#built-in-subagents) subagent, if the session still has that type. Subagents spawned from a definition, such as Explore, work as usual.
* Claude Code runs the subagents Claude spawns in the background, forks and non-fork subagents alike, apart from the [cases that stay in the foreground](#run-subagents-in-foreground-or-background). Claude Code also removes the Agent tool's `run_in_background` parameter, so Claude can't ask for the foreground.

Set the [`CLAUDE_CODE_FORK_SUBAGENT`](https://code.claude.com/docs/en/env-vars) environment variable to override the defaults:

* `1` turns fork mode on in non-interactive mode and the Agent SDK as well
* `0` turns fork mode off in every kind of session

To keep fork mode on but stop Claude from spawning forks, [deny the `fork` subagent type](#disable-specific-subagents) with an `Agent(fork)` rule. Claude Code still runs the subagents Claude spawns in the background, apart from the same [cases that stay in the foreground](#run-subagents-in-foreground-or-background).
