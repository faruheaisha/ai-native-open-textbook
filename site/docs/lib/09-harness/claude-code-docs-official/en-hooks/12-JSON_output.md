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
pageSha256: "f9b8bd3ddfdfddb9bc90a06494d39a914179cb2e6588569c0c89a9b1b2a1533a"
contentMode: "local-full"
zh: ""
---

### JSON output

Exit codes only let you block or stay silent, but JSON output gives you finer-grained control. Instead of exiting with code 2 to block, exit 0 and print a JSON object to stdout. Claude Code reads specific fields from that JSON to control behavior, including [decision control](#decision-control) for blocking, allowing, or escalating to the user.

  Choose one approach per hook: either use exit codes alone for signaling, or exit 0 and print JSON for structured control. If you mix them, exit 2 keeps its [blocking effect](#exit-code-2-behavior-per-event), and Claude Code still reads the JSON fields, with the one elicitation exception noted under [Exit code 2](#exit-code-2).

Your hook's stdout must contain only the JSON object. If your shell profile prints text on startup, it can interfere with JSON parsing. See [Hook JSON has no effect](https://code.claude.com/docs/en/hooks-guide#hook-json-has-no-effect) in the troubleshooting guide.

Hook output strings, including `additionalContext`, `systemMessage`, and plain stdout, are capped at 10,000 characters. Output that exceeds this limit is saved to a file and replaced with a preview and file path, the same way a large valid Bash result is handled under [Output limits](https://code.claude.com/docs/en/tools-reference#output-limits).

The JSON object supports three kinds of fields:

* **Universal fields** like `continue` are listed in the table below. Every event accepts them, but some events discard them or deliver `systemMessage` somewhere other than the transcript. Each event's section says so. `terminalSequence` works on those events too, with the exceptions listed under [Emit terminal notifications](#emit-terminal-notifications).
* **Top-level `decision` and `reason`** are used by some events to block or provide feedback.
* **`hookSpecificOutput`** is a nested object for events that need richer control. It requires a `hookEventName` field set to the event name.

| Field              | Default | Description                                                                                                                                                                                                                                                                                                                          |
| :----------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `continue`         | `true`  | If `false`, Claude stops processing entirely after the hook runs. Takes precedence over any event-specific decision fields                                                                                                                                                                                                           |
| `stopReason`       | none    | Message shown to the user when `continue` is `false`. It stays in the conversation, so Claude sees it if the conversation continues                                                                                                                                                                                                  |
| `suppressOutput`   | `false` | Has no effect: Claude Code accepts the field but doesn't act on it. A successful hook's stdout is never shown in the transcript and is recorded in the debug log                                                                                                                                                                     |
| `systemMessage`    | none    | Warning message shown to the user. In [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) and [`--output-format stream-json`](https://code.claude.com/docs/en/headless) output, it can arrive as an [`SDKInformationalMessage`](https://code.claude.com/docs/en/agent-sdk/typescript#sdkinformationalmessage)                                                                                                |
| `terminalSequence` | none    | A terminal escape sequence for Claude Code to emit on your behalf, such as a desktop notification, window title, or bell. Restricted to OSC `0`/`1`/`2`/`9`/`99`/`777` and BEL. If the value contains anything outside the allowlist, the field is ignored. Use this instead of writing to `/dev/tty`, which is unavailable to hooks |

To stop Claude entirely:

```json theme={null}
{ "continue": false, "stopReason": "Build failed, fix errors before continuing" }
```

For `PreToolUse` and `PostToolUse` hooks, the stop applies even when the tool call fails or completes while Claude is still streaming a response.

#### Emit terminal notifications

Hooks run without a controlling terminal, so writing escape sequences directly to `/dev/tty` fails. Instead, return the escape sequence in the `terminalSequence` field and Claude Code emits it for you through its own terminal write path. This is race-free, works inside tmux and GNU screen, and works on Windows where there is no `/dev/tty`.

The field accepts a string of one or more allowlisted escape sequences:

* OSC `0`, `1`, `2`: window and icon titles
* OSC `9`: iTerm2, ConEmu, Windows Terminal, and WezTerm notifications, including `9;4` taskbar progress
* OSC `99`: Kitty notifications
* OSC `777`: urxvt, Ghostty, and Warp notifications
* Bare BEL

Sequences may be terminated with BEL or with ST. Anything outside the allowlist, including CSI cursor and color sequences, OSC palette sequences, OSC 8 hyperlinks, OSC 52 clipboard writes, and OSC 1337, is rejected and the field is ignored.

Claude Code writes the sequence itself when it processes your hook's output, so the field works on events that discard `systemMessage` and `continue`, such as `Notification` and `StopFailure`. It has two limits:

* Claude Code writes the sequence only in an interactive session, and only while its interface is on screen. In non-interactive mode with the `-p` flag and in the Agent SDK, it ignores the field.
* A `WorktreeCreate` command hook can't return JSON, because Claude Code reads its stdout as the worktree path. An HTTP `WorktreeCreate` hook returns JSON and can include the field.

The example below fires a desktop notification from a `Notification` hook. The escape sequence is built with `printf` octal escapes so the control bytes never appear on the shell command line, and `jq -n --arg` builds the JSON output so quotes, backslashes, and newlines in the notification message are escaped correctly:

```bash theme={null}
#!/bin/bash
# Notification hook: ping the desktop when Claude Code needs attention.
input=$(cat)
title="Claude Code"
body=$(jq -r '.message // "Needs your attention"' <<<"$input")
seq=$(printf '\033]777;notify;%s;%s\007' "$title" "$body")
jq -nc --arg seq "$seq" '{terminalSequence: $seq}'
```

The `\{ "terminalSequence": "..." \}` shape is the same from any shell or language.

#### Add context for Claude

The `additionalContext` field passes a string from your hook into Claude's context window. Claude Code wraps the string in a system reminder and inserts it into the conversation at the point where the hook fired. Claude reads the reminder on the next model request, but it doesn't appear as a chat message in the interface.

Return `additionalContext` inside `hookSpecificOutput` alongside the event name:

```json theme={null}
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "This file is generated. Edit src/schema.ts and run `bun generate` instead."
  }
}
```

Where the reminder appears depends on the event:

* [SessionStart](#sessionstart) and [SubagentStart](#subagentstart): at the start of the conversation, before the first prompt
* [UserPromptSubmit](#userpromptsubmit) and [UserPromptExpansion](#userpromptexpansion): alongside the submitted prompt
* [PreToolUse](#pretooluse), [PostToolUse](#posttooluse), [PostToolUseFailure](#posttoolusefailure), and [PostToolBatch](#posttoolbatch): next to the tool result
* [Stop](#stop) and [SubagentStop](#subagentstop): at the end of the turn. The conversation continues so Claude can act on the feedback. See [Stop decision control](#stop-decision-control)
* [PostModelSwitch](#postmodelswitch): with the next request after the switch. See [PostModelSwitch decision control](#postmodelswitch-decision-control) for timing

When several hooks return `additionalContext` for the same event, Claude receives all of the values.

If a value exceeds 10,000 characters, Claude Code writes the text to a file in the session directory and passes Claude the file path with a short preview instead.

Use `additionalContext` for information Claude should know about the current state of your environment or the operation that just ran:

* **Environment state**: the current branch, deployment target, or active feature flags
* **Conditional project rules**: which test command applies to the file just edited, which directories are read-only in this worktree
* **External data**: open issues assigned to you, recent CI results, content fetched from an internal service

For instructions that never change, prefer [CLAUDE.md](https://code.claude.com/docs/en/memory). It loads without running a script and is the standard place for static project conventions.

Write the text as factual statements rather than imperative system instructions. Phrasing such as "The deployment target is production" or "This repo uses `bun test`" reads as project information. Text framed as out-of-band system commands can trigger Claude's prompt-injection defenses, which causes Claude to surface the text to you instead of treating it as context.

Claude Code saves the injected text in the session transcript. For mid-session events like `PostToolUse` or `UserPromptSubmit`, when you resume with `--continue` or `--resume`, Claude Code replays the saved text rather than re-running the hook for past turns, so values like timestamps or commit SHAs become stale. `SessionStart` hooks run again on resume with `source` set to `"resume"`, or `"fork"` if you added `--fork-session`, so they can refresh their context.

#### Decision control

Not every event supports blocking or controlling behavior through JSON. The events that do each use a different set of fields to express that decision. Use this table as a quick reference before writing a hook:

| Events                                                                                                                              | Decision pattern                             | Key fields                                                                                                                                                                                                                                                                      |
| :---------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| UserPromptSubmit, UserPromptExpansion, PostToolUse, PostToolUseFailure, PostToolBatch, Stop, SubagentStop, ConfigChange, PreCompact | Top-level `decision`                         | `decision: "block"`, `reason`. Stop and SubagentStop also accept `hookSpecificOutput.additionalContext` for [non-error feedback that continues the conversation](#stop-decision-control)                                                                                        |
| TeammateIdle, TaskCompleted                                                                                                         | Exit code or `continue: false`               | Exit code 2 blocks the action with stderr feedback. JSON `\{"continue": false, "stopReason": "..."\}` also stops the teammate entirely, matching `Stop` hook behavior; [TaskCompleted ignores it when the `TaskUpdate` tool triggered the event](#taskcompleted-decision-control) |
| TaskCreated                                                                                                                         | Exit code or top-level `decision`            | Exit code 2 or `decision: "block"` [cancels the task](#taskcreated-decision-control) and returns the message to Claude. `continue: false` is ignored                                                                                                                            |
| PreToolUse                                                                                                                          | `hookSpecificOutput`                         | `permissionDecision` (allow/deny/ask/defer), `permissionDecisionReason`                                                                                                                                                                                                         |
| PreModelSwitch                                                                                                                      | `hookSpecificOutput` or top-level `decision` | `permissionDecision` (allow/deny/ask), `permissionDecisionReason`. `decision: "block"` also [cancels the switch](#premodelswitch-decision-control)                                                                                                                              |
| PermissionRequest                                                                                                                   | `hookSpecificOutput`                         | `decision.behavior` (allow/deny)                                                                                                                                                                                                                                                |
| PermissionDenied                                                                                                                    | `hookSpecificOutput`                         | `retry: true` tells the model it may retry the denied tool call; Claude Code ignores it for [no-verdict denials](#permissiondenied-decision-control)                                                                                                                            |
| WorktreeCreate                                                                                                                      | path return                                  | Command hook prints path on stdout; HTTP hook returns `hookSpecificOutput.worktreePath`. Hook failure or missing path fails creation                                                                                                                                            |
| WorktreeRemove                                                                                                                      | Exit code                                    | Any non-zero exit code makes the removal fail if the directory still exists afterward. JSON output is discarded                                                                                                                                                                 |
| Elicitation                                                                                                                         | `hookSpecificOutput`                         | `action` (accept/decline/cancel), `content` (form field values for accept)                                                                                                                                                                                                      |
| ElicitationResult                                                                                                                   | `hookSpecificOutput`                         | `action` (accept/decline/cancel), `content` (form field values override)                                                                                                                                                                                                        |
| MessageDisplay                                                                                                                      | `hookSpecificOutput`                         | `displayContent` replaces the displayed text on screen. Display-only: the transcript and what Claude sees keep the original                                                                                                                                                     |
| SessionStart, SubagentStart, PostModelSwitch                                                                                        | Context only                                 | `hookSpecificOutput.additionalContext` adds context for Claude. SessionStart also accepts [`initialUserMessage`, `watchPaths`, `sessionTitle`, and `reloadSkills`](#sessionstart-decision-control). No blocking or decision control                                             |
| Setup, Notification, SessionEnd, PostCompact, InstructionsLoaded, StopFailure, CwdChanged, DirectoryAdded, FileChanged              | None                                         | No decision control. Used for side effects like logging or cleanup                                                                                                                                                                                                              |

A few events can also rewrite content rather than only allow or block it:

* `PreToolUse`: `updatedInput` directly under `hookSpecificOutput` replaces a tool's arguments before it runs. See [PreToolUse decision control](#pretooluse-decision-control)
* `PermissionRequest`: `updatedInput` inside the `decision` object. See [PermissionRequest decision control](#permissionrequest-decision-control)
* `PostToolUse`: `updatedToolOutput` replaces the tool's result. See [PostToolUse decision control](#posttooluse-decision-control)
* `UserPromptSubmit`: can't replace the prompt; it only injects `additionalContext` alongside it

For redaction or transformation use cases, intercept at `PreToolUse` for outbound tool inputs and `PostToolUse` for inbound tool results.

Here are examples of each pattern in action:

    The only value for `decision` is `"block"`. To allow the action to proceed, omit `decision` from your JSON, or exit 0 without any JSON at all:

    ```json theme=\{null\}
    \{
      "decision": "block",
      "reason": "Test suite must pass before proceeding"
    \}
    ```

    Uses `hookSpecificOutput` for richer control: allow, deny, or escalate to the user. You can also modify tool input before it runs or inject additional context for Claude. See [PreToolUse decision control](#pretooluse-decision-control) for the full set of options.

    ```json theme=\{null\}
    \{
      "hookSpecificOutput": \{
        "hookEventName": "PreToolUse",
        "permissionDecision": "deny",
        "permissionDecisionReason": "Database writes are not allowed"
      \}
    \}
    ```

    Uses `hookSpecificOutput` to allow or deny a permission request on behalf of the user. When allowing, you can also modify the tool's input or apply permission rules so the user isn't prompted again. See [PermissionRequest decision control](#permissionrequest-decision-control) for the full set of options.

    ```json theme=\{null\}
    \{
      "hookSpecificOutput": \{
        "hookEventName": "PermissionRequest",
        "decision": \{
          "behavior": "allow",
          "updatedInput": \{
            "command": "npm run lint"
          \}
        \}
      \}
    \}
    ```

For extended examples including Bash command validation, prompt filtering, and auto-approval scripts, see [What you can automate](https://code.claude.com/docs/en/hooks-guide#what-you-can-automate) in the guide and the [Bash command validator reference implementation](https://github.com/anthropics/claude-code/blob/main/examples/hooks/bash_command_validator_example.py).

## Hook events

Each event corresponds to a point in Claude Code's lifecycle where hooks can run. The sections below are ordered to match the lifecycle: from session setup through the agentic loop to session end. Each section describes when the event fires, what matchers it supports, the JSON input it receives, and how to control behavior through output.
