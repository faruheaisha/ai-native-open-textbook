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
pageSha256: "71f449f72e4492dd9ac1709842b2982246ec96e90a662f77176d511434f6b3f1"
contentMode: "local-full"
zh: ""
---

### Common input fields

Hook events receive these fields as JSON, in addition to event-specific fields documented in each [hook event](#hook-events) section. For command hooks, this JSON arrives via stdin. For HTTP hooks, it arrives as the POST request body.

| Field             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `session_id`      | Current session identifier                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `prompt_id`       | UUID identifying the user prompt currently being processed. Matches the [`prompt.id` attribute on OpenTelemetry events](https://code.claude.com/docs/en/monitoring-usage#event-correlation-attributes), so you can correlate hook output with telemetry for a single prompt. Absent until the first user input. Requires Claude Code v2.1.196 or later                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `transcript_path` | Path to conversation JSON. The transcript file is written asynchronously and may lag the in-memory conversation, so it may not yet include the current turn's most recent messages when a hook fires. Hooks that need the final assistant text of the current turn should use `last_assistant_message` on [Stop](#stop) and [SubagentStop](#subagentstop) instead of reading the transcript                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `cwd`             | Current working directory when the hook is invoked                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `scratchpad_dir`  | Path to the session's scratchpad directory, where Claude keeps temporary working files. Absent when the session has no scratchpad or the temp directory is unavailable. Requires Claude Code v2.1.257 or later                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `permission_mode` | Current [permission mode](https://code.claude.com/docs/en/permissions#permission-modes): `"default"`, `"plan"`, `"acceptEdits"`, `"auto"`, `"dontAsk"`, or `"bypassPermissions"`. The mode labeled **Manual** arrives as `"default"`, never as `"manual"`, so scripts that match `"default"` keep working. Not all events receive this field. Check the JSON example in each [hook event](#hook-events) section                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `effort`          | Object with a `level` field holding the [effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) in effect when the hook runs: `"low"`, `"medium"`, `"high"`, `"xhigh"`, or `"max"`. If you set a level the active model doesn't support, `level` reports the level Claude Code ran instead; [Adjust effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) says how it picks that level. Ultracode is not a distinct level and reports as `"xhigh"`. The object matches the [status line](https://code.claude.com/docs/en/statusline#available-data) `effort` field. Present for events that fire within a tool-use context, such as `PreToolUse`, `PostToolUse`, `Stop`, and `SubagentStop`, when the current model supports the effort parameter. The level is also available to hook commands and the Bash tool as the `$CLAUDE_EFFORT` environment variable. |
| `hook_event_name` | Name of the event that fired                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

When running with `--agent` or inside a subagent, two additional fields are included:

| Field        | Description                                                                                                                                                                                                                                                                                                                                                                         |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agent_id`   | Unique identifier for the subagent. Present only when the hook fires inside a subagent call. Use this to distinguish subagent hook calls from main-thread calls.                                                                                                                                                                                                                    |
| `agent_type` | Agent name (for example, `"Explore"` or `"security-reviewer"`). Present when the session uses `--agent` or the hook fires inside a subagent. For subagents, the subagent's type takes precedence over the session's `--agent` value. See [SubagentStart](#subagentstart) for the values custom and plugin subagents report and how to write a matcher against a plugin-scoped name. |

Only [`SessionStart`](#sessionstart) hooks can receive a `model` field, and Claude Code doesn't always include it. [`PreModelSwitch`](#premodelswitch) and [`PostModelSwitch`](#postmodelswitch) hooks receive `from_model` and `to_model` instead, so use a PostModelSwitch hook to follow the model as it changes during a session.

There is no `$CLAUDE_MODEL` environment variable. The hook can read `$ANTHROPIC_MODEL` if you set it in your shell, but that value doesn't change when you switch models with `/model` during a session.

A hook process inherits the parent environment, apart from the `OTEL_*` exporter variables that Claude Code [removes from every subprocess it spawns](https://code.claude.com/docs/en/monitoring-usage#administrator-configuration) and, when [`CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`](https://code.claude.com/docs/en/env-vars#variables) is set to `1`, the variables it strips.

For example, a `PreToolUse` hook for a Bash command receives this on stdin:

```json theme={null}
{
  "session_id": "abc123",
  "prompt_id": "550e8400-e29b-41d4-a716-446655440000",
  "transcript_path": "/home/user/.claude/projects/.../transcript.jsonl",
  "cwd": "/home/user/my-project",
  "scratchpad_dir": "/tmp/claude-1000/-home-user-my-project/abc123/scratchpad",
  "permission_mode": "default",
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_input": {
    "command": "npm test",
    "description": "Run test suite",
    "timeout": 120000,
    "run_in_background": false
  },
  "tool_use_id": "toolu_01ABC123..."
}
```

The `tool_name`, `tool_input`, and `tool_use_id` fields are event-specific. Each [hook event](#hook-events) section documents the additional fields for that event.
