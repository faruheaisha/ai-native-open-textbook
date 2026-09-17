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
pageSha256: "e5da99fbfd0e4349dccc92df4a3c78e6206c3e3b88bf7219061b1bc6119fb134"
contentMode: "local-full"
zh: ""
---

### Exit code output

The exit code from your hook command tells Claude Code whether the action should proceed, be blocked, or be ignored. The exit code doesn't act alone. Claude Code reads [JSON output fields](#json-output) from stdout on every exit code, not just 0, and for events that use the standard decision model, a parsed object that passes schema validation takes effect alongside the code. Exit 2's block is the one outcome JSON can't override.

Two tables own the per-event exceptions: [Exit code 2 behavior per event](#exit-code-2-behavior-per-event) says what exit codes do for each event, and [Decision control](#decision-control) says which decision fields each event honors. Universal fields such as `systemMessage` work across most events and are listed in the [JSON output](#json-output) table.

#### Exit code 0

Exit 0 means success, and is the intended exit code when you print JSON for structured control.

For most events, Claude Code writes stdout to the debug log and doesn't show it in the transcript. The exceptions are `UserPromptSubmit`, `UserPromptExpansion`, `SessionStart`, and `PostModelSwitch`, where Claude Code adds plain-text stdout as context that Claude can see and act on.

Whether Claude Code reads your stdout as [JSON output](#json-output) or as plain text depends on how it starts and ends, ignoring surrounding whitespace:

* **Starts with `\{` and ends with `\}`**: Claude Code parses it as JSON. When the output is two or more lines that each parse as JSON on their own, and no line is a [JSON output](#json-output) object that sets a field, Claude Code treats the whole output as plain text. When one of those lines does set a field, the whole output is a parse failure, described below.
* **Starts with `\{` but doesn't end with `\}`**: Claude Code treats it as plain text.
* **Starts with anything else**: Claude Code treats it as plain text, a JSON array or a quoted JSON string included.

For events that use the standard decision model, exit 0 with a parsed object that fails schema validation is a non-blocking error: the action proceeds, and the transcript shows a `<hook name> hook error` notice with the validation message. The same happens on any exit code other than 2, while [exit 2 still blocks](#exit-code-2).

For events that use the standard decision model, when Claude Code tries to parse your stdout as JSON and can't, it reports a non-blocking error on every exit code other than 2. The transcript shows a `<hook name> hook error` notice with the parse message. On the events that add plain-text stdout as context, Claude Code doesn't add the text. Before v2.1.248, Claude Code treated that stdout as plain text.

Stderr from a hook that exits 0 goes to the debug log only, never the transcript, and Claude never sees it. To read it yourself, enable [debug logging](#debug-hooks). To surface a warning to Claude from a `PostToolUse` or `PostToolUseFailure` hook, exit 2 instead so [Claude sees the stderr](#exit-code-2-behavior-per-event) even though the tool already ran.

#### Exit code 2

Exit 2 means a blocking error. On [events that can block](#exit-code-2-behavior-per-event), exit 2 blocks whether or not you print JSON: even a JSON `permissionDecision` of `"allow"` can't override it. Claude Code still reads any valid [JSON output](#json-output) on stdout. On `Elicitation` and `ElicitationResult`, an exit-2 hook's `hookSpecificOutput` is ignored.

The blocking message is the reason from your JSON's blocking decision when it makes one, and your stderr text otherwise. What the block does varies by event: `PreToolUse` blocks the tool call, `UserPromptSubmit` rejects the prompt, and so on. [Exit code 2 behavior per event](#exit-code-2-behavior-per-event) lists the effect for every event, and each event's section says where the message goes.

A hook that exits 2 while printing JSON that fails [JSON output](#json-output) schema validation still blocks: Claude Code uses stderr as the blocking reason and records the validation failure in the debug log. Before v2.1.214, Claude Code treated that combination as a non-blocking error and the action proceeded.

This script blocks `rm` commands by exiting 2 and leaves every other command to the normal permission flow:

```bash theme={null}
#!/bin/bash
# Reads JSON input from stdin, checks the command
input=$(cat)
command=$(jq -r '.tool_input.command' <<<"$input")

if [[ "$command" == rm* ]]; then
  echo "Blocked: rm commands are not allowed" >&2
  exit 2  # Blocking error: tool call is prevented
fi

exit 0  # No decision: the normal permission flow applies
```

#### Other exit codes

Any other exit code doesn't block on its own for most hook events. What happens depends on your stdout:

* With a parsed object that passes schema validation, for events that use the standard decision model, Claude Code ignores the exit code and the JSON alone decides the outcome:
  * Each field the event supports is honored, including `permissionDecision`, `additionalContext`, `updatedInput`, and `systemMessage`, and the hook isn't reported as an error.
  * [Decision control](#decision-control) lists the decision fields per event; universal fields like `systemMessage` follow the [JSON output](#json-output) table.
* With a parsed object that fails schema validation, for events that use the standard decision model, it's the same non-blocking error as [on exit 0](#exit-code-0): the action proceeds, and the `<hook name> hook error` notice carries the validation message.
* With stdout that Claude Code [tries to parse as JSON](#exit-code-0) and can't, Claude Code reports the same non-blocking error as on exit 0 for events that use the standard decision model. The action proceeds, and the notice carries the parse message.
* With stdout that Claude Code [treats as plain text](#exit-code-0), or with empty stdout, it's a non-blocking error for most hook events: the action proceeds, and the transcript shows a `<hook name> hook error` notice followed by the first line of stderr, prefixed with `Failed with non-blocking status code:`. To capture the full stderr, enable [debug logging](#debug-hooks).

Events outside the standard decision model keep their own rows in the [per-event table](#exit-code-2-behavior-per-event): `WorktreeCreate` fails creation on any nonzero exit no matter what your JSON says, and events that discard hook output entirely, like `StopFailure`, ignore your JSON on every exit code, apart from side-effect fields like `terminalSequence`, which still fire.

A hook that can't start lands in the same non-blocking bucket. When the script path doesn't exist or isn't executable, the shell exits with a code like 127 and you see the same notice with the interpreter's message, for example `Failed with non-blocking status code: /bin/sh: /path/to/hook.sh: No such file or directory`. For most hook events, the action proceeds. When you set up a policy hook, watch for this notice on its first run: a mistyped path in `settings.json` leaves the gate silently disabled.

  For most hook events, exit code 2 is the only exit code that blocks through the code alone. Without valid JSON on stdout, Claude Code treats exit code 1 as a non-blocking error and proceeds with the action, even though 1 is the conventional Unix failure code. If your hook is meant to enforce a policy, use `exit 2`. The worktree events differ: any non-zero exit code from `WorktreeCreate` aborts worktree creation, and any non-zero exit code from `WorktreeRemove` makes worktree removal fail if the directory still exists afterward.

#### Timeouts

Apart from a command hook you run with [`async: true`](#run-hooks-in-the-background), Claude Code cancels a `command`, `http`, or `mcp_tool` hook that reaches its [`timeout`](#common-fields), discarding the hook's output, so on most events a timed-out hook renders no decision.

On [`PreModelSwitch`](#premodelswitch), a hook canceled at its timeout blocks the model switch. On `PreToolUse`, the two hook families differ:

* A timed-out `command`, `http`, or `mcp_tool` hook doesn't block the tool call. The call continues through the normal [permission flow](https://code.claude.com/docs/en/permissions), so don't count on a stalled hook to act as a gate.
* An [Agent SDK callback hook](https://code.claude.com/docs/en/agent-sdk/hooks) that exceeds its timeout [blocks the tool call](#pretooluse).

#### Exit code 2 behavior per event

Exit code 2 is the way a hook signals "stop, don't do this." The effect depends on the event, because some events represent actions that can be blocked (like a tool call that hasn't happened yet) and others represent things that already happened or can't be prevented.

| Hook event            | Can block? | What happens on exit 2                                                                                                                                                                                                                         |
| :-------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PreToolUse`          | Yes        | Blocks the tool call                                                                                                                                                                                                                           |
| `PermissionRequest`   | No         | Exit code 2 isn't honored for this event and the permission flow proceeds unchanged. Deny through the [`decision` object](#permissionrequest-decision-control) instead                                                                         |
| `UserPromptSubmit`    | Yes        | Blocks prompt processing and erases the prompt                                                                                                                                                                                                 |
| `UserPromptExpansion` | Yes        | Blocks the expansion                                                                                                                                                                                                                           |
| `Stop`                | Yes        | Prevents Claude from stopping, continues the conversation                                                                                                                                                                                      |
| `SubagentStop`        | Yes        | Prevents the subagent from stopping                                                                                                                                                                                                            |
| `TeammateIdle`        | Yes        | Prevents the teammate from going idle, so it continues working                                                                                                                                                                                 |
| `TaskCreated`         | Yes        | Rolls back the task creation                                                                                                                                                                                                                   |
| `TaskCompleted`       | Yes        | Prevents the task from being marked as completed                                                                                                                                                                                               |
| `ConfigChange`        | Yes        | Blocks the configuration change from taking effect (except `policy_settings`)                                                                                                                                                                  |
| `StopFailure`         | No         | Output and exit code are ignored, except `terminalSequence`                                                                                                                                                                                    |
| `PostToolUse`         | No         | Shows stderr to Claude; the tool already ran                                                                                                                                                                                                   |
| `PostToolUseFailure`  | No         | Shows stderr to Claude; the tool already failed                                                                                                                                                                                                |
| `PostToolBatch`       | Yes        | Stops the agentic loop before the next model call                                                                                                                                                                                              |
| `PermissionDenied`    | No         | Exit code and stderr are ignored because the denial already occurred. Use JSON `hookSpecificOutput.retry: true` to tell the model it may retry; Claude Code ignores `retry: true` for [no-verdict denials](#permissiondenied-decision-control) |
| `Notification`        | No         | Exit code and stderr are ignored                                                                                                                                                                                                               |
| `SubagentStart`       | No         | Shows stderr to user only                                                                                                                                                                                                                      |
| `SessionStart`        | No         | Shows stderr to user only                                                                                                                                                                                                                      |
| `Setup`               | No         | Exit code and stderr are ignored                                                                                                                                                                                                               |
| `SessionEnd`          | No         | Shows stderr to user only                                                                                                                                                                                                                      |
| `CwdChanged`          | No         | Shows stderr to user only                                                                                                                                                                                                                      |
| `DirectoryAdded`      | No         | Stderr goes to the debug log; the directory is already added                                                                                                                                                                                   |
| `FileChanged`         | No         | Shows stderr to user only                                                                                                                                                                                                                      |
| `PreCompact`          | Yes        | Blocks compaction                                                                                                                                                                                                                              |
| `PostCompact`         | No         | Shows stderr to user only                                                                                                                                                                                                                      |
| `PreModelSwitch`      | Yes        | Blocks the model switch and shows stderr to the user                                                                                                                                                                                           |
| `PostModelSwitch`     | No         | Shows stderr to user only; the model already switched                                                                                                                                                                                          |
| `Elicitation`         | Yes        | Denies the elicitation                                                                                                                                                                                                                         |
| `ElicitationResult`   | Yes        | Blocks the response (action becomes decline)                                                                                                                                                                                                   |
| `WorktreeCreate`      | Yes        | Any non-zero exit code causes worktree creation to fail                                                                                                                                                                                        |
| `WorktreeRemove`      | Yes        | Any non-zero exit code causes worktree removal to fail if the directory still exists afterward. See [WorktreeRemove](#worktreeremove) for what happens to the directory                                                                        |
| `InstructionsLoaded`  | No         | Exit code is ignored                                                                                                                                                                                                                           |
| `MessageDisplay`      | No         | The original text is displayed                                                                                                                                                                                                                 |

For `SessionStart`, `SubagentStart`, and `PostModelSwitch`, Claude Code renders the exit code 2 stderr in the transcript as a `<hook name> hook error` notice, the same way it renders a [non-blocking error](#exit-code-output). Claude doesn't see it, and the session or subagent proceeds. For `SubagentStart`, the notice appears in the subagent's own transcript, not in the parent conversation.
