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
pageSha256: "449551778459d29908e99aaaff5e47dbab64af0d230b91c1240deedfa733c9b2"
contentMode: "local-full"
zh: ""
---

### ElicitationResult

Runs after a user responds to an MCP elicitation. Hooks can observe, modify, or block the response before it is sent back to the MCP server.

The matcher field matches against the MCP server name.

#### ElicitationResult input

In addition to the [common input fields](#common-input-fields), ElicitationResult hooks receive `mcp_server_name`, `action`, and optional `mode`, `elicitation_id`, and `content` fields.

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "ElicitationResult",
  "mcp_server_name": "my-mcp-server",
  "action": "accept",
  "content": { "username": "alice" },
  "mode": "form",
  "elicitation_id": "elicit-123"
}
```

#### ElicitationResult output

To override the user's response, return a JSON object with `hookSpecificOutput`:

```json theme={null}
{
  "hookSpecificOutput": {
    "hookEventName": "ElicitationResult",
    "action": "decline",
    "content": {}
  }
}
```

| Field     | Values                        | Description                                                            |
| :-------- | :---------------------------- | :--------------------------------------------------------------------- |
| `action`  | `accept`, `decline`, `cancel` | Overrides the user's action                                            |
| `content` | object                        | Overrides form field values. Only meaningful when `action` is `accept` |

Exit code 2 blocks the response, changing the effective action to `decline`. Claude Code doesn't show your stderr message anywhere.

Claude Code acts on `hookSpecificOutput` from an ElicitationResult hook's JSON output and discards `systemMessage` and `continue`.

## Prompt-based hooks

In addition to command, HTTP, and MCP tool hooks, Claude Code supports prompt-based hooks (`type: "prompt"`) that use an LLM to evaluate whether to allow or block an action, and agent hooks (`type: "agent"`) that spawn an agentic verifier with tool access. Not all events support every hook type.

Events that support all five hook types (`command`, `http`, `mcp_tool`, `prompt`, and `agent`):

* `PermissionDenied`
* `PermissionRequest`
* `PostToolBatch`
* `PostToolUse`
* `PostToolUseFailure`
* `PreToolUse`
* `Stop`
* `SubagentStop`
* `TaskCompleted`
* `TaskCreated`
* `TeammateIdle`
* `UserPromptExpansion`
* `UserPromptSubmit`

Events that support `command`, `http`, and `mcp_tool` hooks but not `prompt` or `agent`:

* `ConfigChange`
* `CwdChanged`
* `DirectoryAdded`
* `Elicitation`
* `ElicitationResult`
* `FileChanged`
* `InstructionsLoaded`
* `MessageDisplay`
* `Notification`
* `PostCompact`
* `PostModelSwitch`
* `PreCompact`
* `PreModelSwitch`
* `SessionEnd`
* `StopFailure`
* `SubagentStart`
* `WorktreeCreate`
* `WorktreeRemove`

`SessionStart` and `Setup` support `command` and `mcp_tool` hooks, and [MCP tool hook fields](#mcp-tool-hook-fields) describes when their `mcp_tool` hooks run. They don't support `http`, `prompt`, or `agent` hooks.
