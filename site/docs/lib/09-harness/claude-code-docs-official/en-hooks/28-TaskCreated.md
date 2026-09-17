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
pageSha256: "446d0dbe200a11fc78b89c89bd43f52c7fd1fcc37bdb43d666be196cadc8640d"
contentMode: "local-full"
zh: ""
---

### TaskCreated

Runs when a task is being created via the `TaskCreate` tool. Use this to enforce naming conventions, require task descriptions, or prevent certain tasks from being created. In a [session without the Task tools](https://code.claude.com/docs/en/tools-reference#task-tool-availability), this event doesn't fire.

TaskCreated hooks don't support matchers and fire on every occurrence.

#### TaskCreated input

In addition to the [common input fields](#common-input-fields), TaskCreated hooks receive `task_id`, `task_subject`, and optionally `task_description`, `teammate_name`, and `team_name`.

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "TaskCreated",
  "task_id": "task-001",
  "task_subject": "Implement user authentication",
  "task_description": "Add login and signup endpoints",
  "teammate_name": "implementer",
  "team_name": "session-a1b2c3d4"
}
```

| Field              | Description                                                                |
| :----------------- | :------------------------------------------------------------------------- |
| `task_id`          | Identifier of the task being created                                       |
| `task_subject`     | Title of the task                                                          |
| `task_description` | Detailed description of the task. May be absent                            |
| `teammate_name`    | Name of the teammate creating the task. May be absent                      |
| `team_name`        | Deprecated. Session-derived team name; will be removed in a future release |

#### TaskCreated decision control

A TaskCreated hook can block the creation in two ways. Either way, Claude Code deletes the task and returns your message to Claude as the tool's error. Claude Code ignores `continue: false` from this event and Claude keeps working.

* **Exit code 2**: Claude Code returns the stderr text as the message.
* **JSON `\{"decision": "block", "reason": "..."\}`**: Claude Code returns `reason` as the message.

This example blocks tasks whose subjects don't follow the required format:

```bash theme={null}
#!/bin/bash
INPUT=$(cat)
TASK_SUBJECT=$(echo "$INPUT" | jq -r '.task_subject')

if [[ ! "$TASK_SUBJECT" =~ ^\[TICKET-[0-9]+\] ]]; then
  echo "Task subject must start with a ticket number, e.g. '[TICKET-123] Add feature'" >&2
  exit 2
fi

exit 0
```
