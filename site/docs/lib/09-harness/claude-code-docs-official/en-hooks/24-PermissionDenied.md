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
pageSha256: "a66363b20ba80856116858ada6d383d537fd1ff8abe9aefe71bc18714cbf69d5"
contentMode: "local-full"
zh: ""
---

### PermissionDenied

Runs when [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) denies a tool call, including when it denies without a classifier verdict because [a safety check separate from auto mode refused the classifier's own request](https://code.claude.com/docs/en/errors#auto-mode-cannot-determine-the-safety-of-an-action) or its response didn't parse. This hook only fires in auto mode: it doesn't run when you manually deny a permission dialog, when a `PreToolUse` hook blocks a call, or when a `deny` rule matches. Use it to log denials, adjust configuration, or tell the model it may retry the tool call.

Matches on tool name, same values as PreToolUse.

#### PermissionDenied input

In addition to the [common input fields](#common-input-fields), PermissionDenied hooks receive `tool_name`, `tool_input`, `tool_use_id`, and `reason`.

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "auto",
  "hook_event_name": "PermissionDenied",
  "tool_name": "Bash",
  "tool_input": {
    "command": "rm -rf /tmp/build",
    "description": "Clean build directory"
  },
  "tool_use_id": "toolu_01ABC123...",
  "reason": "[Irreversible Local Destruction]"
}
```

| Field    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reason` | The denial reason. For a classifier verdict, in most sessions it names the matched rule in square brackets, such as `[Data Exfiltration]`; see [Review denials](https://code.claude.com/docs/en/auto-mode-config#review-denials) for the other forms. For a [no-verdict denial](#permissiondenied-decision-control), it starts with `Auto mode could not evaluate this action and is blocking it for safety`. For a denial because the classifier model was unavailable, it is the fixed text `Classifier unavailable` |

#### PermissionDenied decision control

PermissionDenied hooks can tell the model it may retry the denied tool call. Return a JSON object with `hookSpecificOutput.retry` set to `true`:

```json theme={null}
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionDenied",
    "retry": true
  }
}
```

When `retry` is `true`, Claude Code adds a message to the conversation telling the model it may retry the tool call. Claude Code doesn't reverse the denial itself. If your hook doesn't return JSON, or returns `retry: false`, the denial stands and the model receives the original rejection message.

Claude Code ignores `retry: true` when the classifier produced [no verdict on the action](https://code.claude.com/docs/en/errors#auto-mode-cannot-determine-the-safety-of-an-action): its response didn't parse, or a safety check separate from auto mode refused the classifier's own request. For those denials, Claude Code already tells the model in the rejection message whether to retry later or move on.
