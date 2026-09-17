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
pageSha256: "77bb972532ef738ca799dcc3dc125c0d90d9c8bbfa622b5aaec0c0939e1abea3"
contentMode: "local-full"
zh: ""
---

### Stop

Runs when the main Claude Code agent has finished responding. Does not run if
the stoppage occurred due to a user interrupt. API errors fire
[StopFailure](#stopfailure) instead.

  The [`/goal`](https://code.claude.com/docs/en/goal) command is a built-in shortcut for a session-scoped prompt-based Stop hook. Use it when you want Claude to keep working toward a condition without writing hook configuration.

#### Stop input

In addition to the [common input fields](#common-input-fields), Stop hooks receive `stop_hook_active`, `last_assistant_message`, `background_tasks`, and `session_crons`. The `stop_hook_active` field is `true` when Claude Code is already continuing as a result of a stop hook. Check this value or process the transcript to avoid blocking on a condition that will never resolve. Claude Code overrides the hook and ends the turn after 8 consecutive blocks.

The `last_assistant_message` field contains the text content of Claude's final response, so hooks can access it without parsing the transcript file. For hooks that act on the just-completed turn, such as read-aloud or notification hooks, use this field rather than reading `transcript_path`: the transcript file isn't guaranteed to include the final message at Stop time on all versions.

The `background_tasks` and `session_crons` arrays let hooks distinguish "session is done" from "session is paused waiting for background work to wake it back up". Both arrays are present when the task registry is reachable and are empty when nothing is in flight or scheduled.

Each entry in `background_tasks` describes one in-flight task and uses these fields:

| Field         | Description                                                                                                                                                                                                                                          |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | Task identifier                                                                                                                                                                                                                                      |
| `type`        | Friendly task-type label such as `shell`, `subagent`, `monitor`, `workflow`, `teammate`, `cloud session`, or `MCP task`. Each label identifies which Claude Code feature created the task. Falls back to the raw discriminant for unrecognized types |
| `status`      | Current task status                                                                                                                                                                                                                                  |
| `description` | Free-text description, capped at 1000 characters with an in-string `… [+N chars]` marker when clipped                                                                                                                                                |
| `command`     | Shell command line, capped at 1000 characters. Present only for `shell` tasks                                                                                                                                                                        |
| `agent_type`  | Subagent type name. Present only for `subagent` tasks                                                                                                                                                                                                |
| `server`      | MCP server name. Present only for `monitor` and `MCP task` tasks                                                                                                                                                                                     |
| `tool`        | MCP tool name. Present only for `monitor` and `MCP task` tasks                                                                                                                                                                                       |
| `name`        | Workflow name. Present only for `workflow` tasks                                                                                                                                                                                                     |

Each entry in `session_crons` describes one session-scoped scheduled wakeup, sourced from `CronCreate`, `ScheduleWakeup`, and `/loop`:

| Field       | Description                                                                                                          |
| :---------- | :------------------------------------------------------------------------------------------------------------------- |
| `id`        | Cron task identifier                                                                                                 |
| `schedule`  | Cron expression, for example `0 9 * * 1-5`                                                                           |
| `recurring` | `false` for one-shot wakeups whose schedule encodes a single fire time, `true` for tasks that re-fire on every match |
| `prompt`    | Prompt submitted when the cron fires, capped at 1000 characters with the same `… [+N chars]` marker                  |

This example shows a Stop input with one in-flight shell task and one recurring cron:

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "Stop",
  "stop_hook_active": true,
  "last_assistant_message": "I've completed the refactoring. Here's a summary...",
  "background_tasks": [
    {
      "id": "task-001",
      "type": "shell",
      "status": "running",
      "description": "tail logs",
      "command": "tail -f /var/log/syslog"
    }
  ],
  "session_crons": [
    {
      "id": "cron-001",
      "schedule": "0 9 * * 1-5",
      "recurring": true,
      "prompt": "check the build"
    }
  ]
}
```

#### Stop decision control

`Stop` and `SubagentStop` hooks can control whether Claude continues. In addition to the [JSON output fields](#json-output) available to all hooks, your hook script can return these event-specific fields:

| Field                                  | Description                                                                                                                                                                               |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `decision`                             | `"block"` prevents Claude from stopping. Omit to allow Claude to stop                                                                                                                     |
| `reason`                               | Required when `decision` is `"block"`. Tells Claude why it should continue                                                                                                                |
| `hookSpecificOutput.additionalContext` | Non-error feedback for Claude. The conversation continues so Claude can act on it, but unlike `decision: "block"` it is shown in the transcript as hook feedback rather than a hook error |

A hook that blocks by exiting 2 routes the same way as `reason`: Claude receives the stderr message as the explanation for why it should continue.

```json theme={null}
{
  "decision": "block",
  "reason": "Must be provided when Claude is blocked from stopping"
}
```

Use `additionalContext` when the hook is working as designed and giving Claude guidance, such as "run the test suite before finishing". It keeps the conversation going through the same loop protections as `decision: "block"`, namely the `stop_hook_active` input and the 8-consecutive-continuation cap, but the transcript labels it `Stop hook feedback` and no hook error notification is shown:

```json theme={null}
{
  "hookSpecificOutput": {
    "hookEventName": "Stop",
    "additionalContext": "Please run the test suite before finishing"
  }
}
```
