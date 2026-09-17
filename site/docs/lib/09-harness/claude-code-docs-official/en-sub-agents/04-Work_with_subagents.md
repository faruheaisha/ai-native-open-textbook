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
pageSha256: "1c6aa44b1a16202f7b5074816d8947c97504c7ed75a1981745cc6c216600429b"
contentMode: "local-full"
zh: ""
---

## Work with subagents

### Understand automatic delegation

Claude automatically delegates tasks based on the task description in your request, the `description` field in subagent configurations, and current context. To encourage proactive delegation, include phrases like "use proactively" in your subagent's description field.

Keep descriptions brief: Claude Code shows a startup warning when your subagents' combined descriptions pass [the 15,000-token limit](https://code.claude.com/docs/en/errors#agent-descriptions-are-over-the-15000-token-limit), and still loads every subagent.

### Invoke subagents explicitly

When automatic delegation isn't enough, you can request a subagent yourself. Three patterns escalate from a one-off suggestion to a session-wide default:

* **Natural language**: name the subagent in your prompt; Claude decides whether to delegate
* **@-mention**: guarantees the subagent runs for one task
* **Session-wide**: the whole session uses that subagent's system prompt, tool restrictions, and model via the `--agent` flag or the `agent` setting

For natural language, there's no special syntax. Name the subagent and Claude typically delegates:

```text wrap theme={null}
Use the test-runner subagent to fix failing tests
Have the code-reviewer subagent look at my recent changes
```

**@-mention the subagent.** Type `@` and pick the subagent from the typeahead, the same way you @-mention files. This ensures that specific subagent runs rather than leaving the choice to Claude:

```text wrap theme={null}
@"code-reviewer (agent)" look at the auth changes
```

Your full message still goes to Claude, which writes the subagent's task prompt based on what you asked. The @-mention controls which subagent Claude invokes, not what prompt it receives.

Subagents provided by an enabled [plugin](https://code.claude.com/docs/en/plugins) appear in the typeahead under their scoped name, such as `my-plugin:code-reviewer` or `my-plugin:review:security` when the plugin [organizes agents into subfolders](#choose-the-subagent-scope). Named background subagents currently running in the session also appear in the typeahead, showing their status next to the name.

You can also type the mention manually without using the picker: `@agent-<name>` for local subagents, or `@agent-` followed by the scoped name for plugin subagents, for example `@agent-my-plugin:code-reviewer`. While you type this form the typeahead shows file matches rather than agents. The agent mention still resolves when you submit.

**Run the whole session as a subagent.** Pass [`--agent <name>`](https://code.claude.com/docs/en/cli-reference) to start a session where the main thread itself takes on that subagent's system prompt, tool restrictions, and model:

```bash theme={null}
claude --agent code-reviewer
```

The subagent's system prompt replaces the default Claude Code system prompt entirely, the same way [`--system-prompt`](https://code.claude.com/docs/en/cli-reference) does. `CLAUDE.md` files and project memory still load through the normal message flow. The agent name appears as `@<name>` in the startup header so you can confirm it's active.

This works with built-in and custom subagents, and the choice persists when you resume the session: Claude Code restores the agent's tool restrictions and model along with the conversation. If the agent no longer exists when you resume, the session continues with the default tools and shows a [warning naming the agent](https://code.claude.com/docs/en/errors#session-agent-no-longer-available). For the system prompt in either case, see [System prompt flags in resumed conversations](https://code.claude.com/docs/en/cli-reference#system-prompt-flags-in-resumed-conversations).

For a plugin-provided subagent, you can pass only the agent name and Claude Code finds it:

```bash theme={null}
claude --agent security-reviewer
```

If multiple plugins provide agents with the same name, pass the scoped name to disambiguate:

```bash theme={null}
claude --agent my-plugin:security-reviewer
```

If the plugin places the agent in a subfolder of its `agents/` directory, include the subfolder in the scoped name, for example `claude --agent my-plugin:review:security`.

To make it the default for every session in a project, set `agent` in `.claude/settings.json`:

```json theme={null}
{
  "agent": "code-reviewer"
}
```

The CLI flag overrides the setting if both are present.

### Run subagents in foreground or background

Subagents can run in the foreground or the background:

* **Foreground subagents** block the main conversation until complete. Permission prompts are passed through to you as they come up.
* **Background subagents** run concurrently while you continue working. When a background subagent reaches a tool call that needs permission, Claude Code surfaces the prompt in your main session and names the subagent that is asking. Approve to let the subagent continue, or press Esc to deny that one tool call without stopping the subagent. Before v2.1.186, background subagents auto-denied any tool call that would have prompted.

For each subagent Claude spawns with the Agent tool, Claude Code picks foreground or background from the first of these cases that applies:

* If an in-process [agent team](https://code.claude.com/docs/en/agent-teams#limitations) teammate spawned the subagent, Claude Code runs it in the foreground. Claude Code refuses with an error to spawn a teammate's subagent whose definition sets [`background: true`](#supported-frontmatter-fields). Where [fork mode](#turn-fork-mode-on-or-off) is off and you haven't [turned background tasks off](https://code.claude.com/docs/en/env-vars), Claude Code also refuses with an error when a teammate sets `run_in_background: true`.
* If you set [`CLAUDE_CODE_DISABLE_BACKGROUND_TASKS`](https://code.claude.com/docs/en/env-vars) to `1`, Claude Code runs the subagent in the foreground, in every kind of session and whether or not fork mode is on.
* Where [fork mode](#turn-fork-mode-on-or-off) is on, as it is by default in an interactive session, Claude Code runs the subagent in the background, forks and non-fork subagents alike, and Claude can't ask for the foreground.
* Where fork mode is off, Claude runs the subagent in the background by default and in the foreground when it needs the result before continuing. Fork mode is off in [non-interactive mode](https://code.claude.com/docs/en/headless) with `-p` and in the Agent SDK unless you turn it on. To keep a particular subagent in the background even when Claude wants the result, set its frontmatter [`background`](#supported-frontmatter-fields) field to `true`.

For a skill with `context: fork`, Claude Code follows the rules in [Run skills in a subagent](https://code.claude.com/docs/en/skills#run-skills-in-a-subagent) instead, whether or not fork mode is on.

Background subagents run with a [smaller built-in tool set](#available-tools) than foreground subagents, except for conversation forks and [resumed](#resume-subagents) foreground subagents.

Background subagents surface every permission prompt in your main session. When you answer one of those prompts with a choice that lasts beyond that one tool call, such as a grant that lasts for the rest of the session, Claude Code applies your answer to the whole session, including your main conversation.

A background subagent can leave a background [Bash or PowerShell command](https://code.claude.com/docs/en/tools-reference#background-commands) [running past the end of its turn](https://code.claude.com/docs/en/interactive-mode#how-backgrounding-works). When that command ends, Claude Code sends the subagent a notification.

A background subagent's results reach Claude as a completion notification in a later turn. Claude waits for that notification before reporting the subagent's results, and if you ask about progress first, it reports that the subagent is still running. Before v2.1.211, Claude sometimes reported results for a background subagent that hadn't finished.

You can also steer this yourself:

* Where fork mode is off, ask Claude to run a task in the background or in the foreground
* Press **Ctrl+B** to background a running task

Claude Code clears a background subagent's row from the subagent panel below the prompt input in one of two ways, depending on how the subagent ended:

* When a subagent finishes successfully, Claude Code removes its row immediately and, except in [screen reader mode](https://code.claude.com/docs/en/accessibility), shows `/tasks to see subagents` in the footer for 30 seconds. During those 30 seconds, run [`/tasks`](https://code.claude.com/docs/en/commands) and press `Enter` on the subagent to open its transcript. Before v2.1.232, Claude Code kept the row for 30 seconds after the subagent finished, the same as a failed one, and showed no footer hint.
* When a subagent fails or you stop it, Claude Code keeps its row for 30 seconds. To clear the row sooner, select it and press `x`.

A background subagent that completes stays listed in [`/tasks`](https://code.claude.com/docs/en/commands), marked done and sorted below running work, for the same 30 seconds as the footer hint. Its detail view stays open when the subagent finishes. Subagents that fail or that you stop leave the list. Before v2.1.208, a completed subagent left the list the moment it finished and its detail view closed.

### Subagent names

Claude can give a subagent a name by passing a `name` parameter on the Agent tool call, and may do so on its own, without asking you first. The name makes the subagent addressable: Claude can [message or resume it by name](#resume-subagents) after it finishes.

In an interactive session with [agent teams](https://code.claude.com/docs/en/agent-teams) enabled, a subagent that Claude spawns from the main conversation with a `name` launches as a teammate instead, unless the call is a [fork](#fork-the-current-conversation) or passes `isolation` on the call itself. An `isolation` value in the subagent's frontmatter doesn't prevent it, and the teammate then runs in the main session's working directory. See [How Claude starts agent teams](https://code.claude.com/docs/en/agent-teams#how-claude-starts-agent-teams).

### API errors in subagents

When something [cuts off a subagent's response mid-stream](https://code.claude.com/docs/en/errors#the-response-above-may-be-incomplete), and the partial response contains text but no tool calls, Claude Code prompts the subagent to continue rather than ending the run. This happens in interactive sessions too. The run ends on the error only once those continuations are used up.

As of v2.1.199, a subagent whose run ends on an API error, such as a usage limit or a repeated server error, reports that failure back to Claude instead of returning the error text as if it were the subagent's findings. What Claude receives depends on where the subagent ran:

* **Foreground**: if a rate limit, overload, or server error cuts off a subagent that already produced text output, the Agent tool returns that partial output with a note that the subagent was cut off and didn't finish its task. A subagent that produced nothing, or whose only output was tool calls, fails with [`Agent terminated early due to an API error`](https://code.claude.com/docs/en/errors#agent-terminated-early-due-to-an-api-error), followed by the error detail. In v2.1.199, a rate limit, overload, or server error that cut off the tool-calls-only shape returned an empty partial result containing only the cut-off note instead.
* **Background**: the subagent is marked failed, and the message Claude receives when it ends names the API error and includes the subagent's last output, so partial work isn't lost.

When you configure a [fallback model chain](https://code.claude.com/docs/en/model-config#fallback-model-chains) and a subagent encounters a failure the chain covers, such as its model being unavailable, Claude Code switches the subagent to the first model in the chain that accepts the request. The subagent keeps working instead of ending on the error.

Once the underlying API error clears, ask Claude to retry the task or [resume the subagent](#resume-subagents).

### Subagent output scanning

Claude Code scans each subagent's final report before Claude reads it. A subagent may have read files, web pages, or command output you never reviewed, and text from those sources can carry instructions aimed at the main conversation. The scan never removes or rewords anything; it makes two kinds of change you may notice in a report:
