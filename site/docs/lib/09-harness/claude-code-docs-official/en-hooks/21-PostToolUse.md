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
pageSha256: "4cd5e7177861f0b1409cbac3940f0f7db3acb1b1c9c08e1b763f3811a75b6eb7"
contentMode: "local-full"
zh: ""
---

### PostToolUse

Runs immediately after a tool completes successfully.

Matches on tool name, same values as PreToolUse.

Match more broadly when the tool name isn't the right filter:

* To run a hook after any tool completes successfully, omit the `matcher` or set it to `"*"`. Your hook can then discover what changed itself, for example by running `git status --porcelain`, which also lists untracked files that `git diff` misses. For tool calls that fail, add the same hook under [PostToolUseFailure](#posttoolusefailure).
* To run a hook when a specific file changes on disk, whatever wrote it, use [FileChanged](#filechanged). Claude Code doesn't run a `PostToolUse` hook matching `Edit|Write` when a `Bash` command or a process outside Claude Code rewrites the same file.

#### PostToolUse input

`PostToolUse` hooks fire after a tool has already executed successfully. The input includes both `tool_input`, the arguments sent to the tool, and `tool_response`, the result it returned. The exact schema for both depends on the tool. File-tool `tool_input` paths arrive in the same format as for [PreToolUse](#pretooluse-input): always absolute, with the platform's native separators, so backslashes on Windows.

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "PostToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  },
  "tool_response": {
    "filePath": "/path/to/file.txt",
    "type": "create"
  },
  "tool_use_id": "toolu_01ABC123...",
  "duration_ms": 12
}
```

| Field         | Description                                                                                                   |
| :------------ | :------------------------------------------------------------------------------------------------------------ |
| `duration_ms` | Optional. Tool execution time in milliseconds. Excludes time spent in permission prompts and PreToolUse hooks |

#### PostToolUse decision control

`PostToolUse` hooks can provide feedback to Claude after tool execution. In addition to the [JSON output fields](#json-output) available to all hooks, your hook script can return these event-specific fields:

| Field                  | Description                                                                                                                                                                                                                                                                                     |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `decision`             | `"block"` adds the `reason` next to the tool result. Claude still sees the original output; to replace it, use `updatedToolOutput`                                                                                                                                                              |
| `reason`               | Explanation shown to Claude when `decision` is `"block"`                                                                                                                                                                                                                                        |
| `additionalContext`    | String added to Claude's context alongside the tool result. See [Add context for Claude](#add-context-for-claude)                                                                                                                                                                               |
| `classifierContext`    | Short note about this call's result for the [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) classifier rather than for Claude. See [Annotate a result for the auto mode classifier](#annotate-a-result-for-the-auto-mode-classifier). Requires Claude Code v2.1.236 or later |
| `updatedToolOutput`    | Replaces the tool's output with the provided value before it is sent to Claude. The value must match the tool's output shape                                                                                                                                                                    |
| `updatedMCPToolOutput` | Replaces the output for [MCP tools](#match-mcp-tools) only. Prefer `updatedToolOutput`, which works for all tools                                                                                                                                                                               |

The example below replaces the output of a `Bash` call. The replacement value matches the `Bash` tool's output shape:

```json theme={null}
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "Additional information for Claude",
    "updatedToolOutput": {
      "stdout": "[redacted]",
      "stderr": "",
      "interrupted": false,
      "isImage": false
    }
  }
}
```

  `updatedToolOutput` only changes what Claude sees. The tool has already run by the time the hook fires, so any files written, commands executed, or network requests sent have already taken effect. Telemetry such as OpenTelemetry tool spans and analytics events also captures the original output before the hook runs. To prevent or modify a tool call before it runs, use a [PreToolUse](#pretooluse) hook instead.

  The replacement value must match the tool's output shape. Built-in tools return structured objects rather than plain strings. For example, `Bash` returns an object with `stdout`, `stderr`, `interrupted`, and `isImage` fields. For built-in tools, a value that doesn't match the tool's output schema is ignored and the original output is used. MCP tool output is passed through without schema validation. Stripping error details that Claude needs can cause it to proceed on a false assumption.

#### Annotate a result for the auto mode classifier

Return `classifierContext` to send a short note about the tool call's result to the [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) classifier rather than to Claude. The classifier [never receives tool results themselves](https://code.claude.com/docs/en/permission-modes#how-the-classifier-evaluates-actions), so this field is the supported way to tell it something about what a call returned before it reviews later actions. The field requires Claude Code v2.1.236 or later.

The example below tells the classifier where a query's output came from:

```json theme={null}
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "classifierContext": "This query ran against the staging database, not production."
  }
}
```

How much weight the classifier gives the note depends on where you configured the hook:

* **Hooks configured in Claude Code**: for hooks from settings files, plugins, skills, and agent frontmatter, the classifier treats the note as unverified, application-provided context. The note never establishes user intent, and if it claims you approved or requested something, the classifier checks that claim against your own messages in the conversation
* **In-process Agent SDK callbacks**: when an application embedding Claude Code registers the hook as a [TypeScript SDK callback](https://code.claude.com/docs/en/agent-sdk/hooks) and returns the note during the live session, the classifier may weigh a user statement relayed in the note as user intent. Such a statement can satisfy a consent requirement the classifier would accept from a message you send, but it never lifts a block that your own message couldn't lift either. After a session resumes, Claude Code treats restored notes as unverified context. When hooks from both groups annotate the same call, the classifier treats the combined note as unverified

Claude Code applies these limits when delivering the note:

* **Length**: Claude Code caps the notes for one tool call at 2,000 characters and truncates the rest. The cap is shared across every hook that responds to that call
* **Synchronous responses only**: Claude Code ignores the field in the response of a hook that [runs in the background](#run-hooks-in-the-background), because that response arrives after Claude Code records the tool result
* **Calls that the classifier doesn't record**: the classifier's transcript omits read-only lookups such as file reads and searches. Claude Code discards a note attached to one of those calls
* **Interaction with rewrites**: when the note describes output you're replacing with `updatedToolOutput`, return both fields in the same hook response. Claude Code drops the note if that rewrite is rejected or another hook's rewrite replaces it. Claude Code delivers a note you return without a rewrite even when another hook rewrites the output

  The classifier reads content you place in `classifierContext` as information from the application hosting the session, so don't copy untrusted tool output or third-party text into it. Keep the note to a short assertion about this one call, such as a fact about its origin or a user statement about it; don't use the field to deliver unrelated messages or a stream of events.
