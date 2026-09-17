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
pageSha256: "86776ef1d88945d5db8136c815ffee8450a4d01f68e28f3d87163522d3d7af3e"
contentMode: "local-full"
zh: ""
---

### UserPromptExpansion

Runs when a user-typed command expands into a prompt before reaching Claude. Use this to block specific commands from direct invocation, inject context for a particular skill, or log which commands users invoke. For example, a hook matching `deploy` can block `/deploy` unless an approval file is present, or a hook matching a review skill can append the team's review checklist as `additionalContext`.

This event covers the path `PreToolUse` doesn't: a `PreToolUse` hook matching the `Skill` tool fires only when Claude calls the tool, but typing `/skillname` directly bypasses `PreToolUse`. `UserPromptExpansion` fires on that direct path.

Matches on `command_name`. Leave the matcher empty to fire on every prompt-type command.

#### UserPromptExpansion input

In addition to the [common input fields](#common-input-fields), UserPromptExpansion hooks receive `expansion_type`, `command_name`, `command_args`, `command_source`, and the original `prompt` string. The `expansion_type` field is `slash_command` for skill and custom commands, or `mcp_prompt` for MCP server prompts.

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../00893aaf.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "UserPromptExpansion",
  "expansion_type": "slash_command",
  "command_name": "example-skill",
  "command_args": "arg1 arg2",
  "command_source": "plugin",
  "prompt": "/example-skill arg1 arg2"
}
```

#### UserPromptExpansion decision control

`UserPromptExpansion` hooks can block the expansion or add context. All [JSON output fields](#json-output) are available.

| Field               | Description                                                                                                           |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| `decision`          | `"block"` prevents the command from expanding. Omit to allow it to proceed                                            |
| `reason`            | Shown to the user when `decision` is `"block"`                                                                        |
| `additionalContext` | String added to Claude's context alongside the expanded prompt. See [Add context for Claude](#add-context-for-claude) |

A hook that blocks by exiting 2 routes the same way as `reason`: the block message shows the stderr text to the user.

```json theme={null}
{
  "decision": "block",
  "reason": "This slash command is not available",
  "hookSpecificOutput": {
    "hookEventName": "UserPromptExpansion",
    "additionalContext": "Additional context for this expansion"
  }
}
```
