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
pageSha256: "1599070489dd6d2290e040ae281fb7b029642d6e0874be8217225b245f625311"
contentMode: "local-full"
zh: ""
---

### Notification

Runs when Claude Code sends notifications. Matches on notification type. Omit the matcher to run hooks for all notification types.

You receive these hook events even with desktop notifications turned off: the `preferredNotifChannel` setting, including `notifications_disabled`, changes only how you're alerted, not whether your hook runs.

| Matcher                      | When it fires                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `permission_prompt`          | Claude needs you to approve a tool use or a sandboxed command's [network request](https://code.claude.com/docs/en/sandboxing#network-isolation), and the prompt has waited about six seconds                                                                                                                                                                                                                                                                                                      |
| `idle_prompt`                | Claude finished responding about 60 seconds ago and you haven't typed since                                                                                                                                                                                                                                                                                                                                                                                           |
| `auth_success`               | Authentication completes                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `elicitation_dialog`         | An MCP server opens an elicitation form and you haven't typed for about six seconds                                                                                                                                                                                                                                                                                                                                                                                   |
| `elicitation_url_dialog`     | An MCP server asks you to open a browser URL and you haven't typed for about six seconds                                                                                                                                                                                                                                                                                                                                                                              |
| `elicitation_complete`       | An MCP server reports that a [URL-mode elicitation](#elicitation-input) is complete                                                                                                                                                                                                                                                                                                                                                                                   |
| `elicitation_response`       | An MCP elicitation response is sent back to the server                                                                                                                                                                                                                                                                                                                                                                                                                |
| `agent_needs_input`          | A background session starts waiting on your input while [agent view](https://code.claude.com/docs/en/agent-view) is open in a terminal, or the current session asks you an [agent team teammate's terminal setup question](https://code.claude.com/docs/en/agent-teams#choose-a-display-mode) and you haven't typed for about six seconds                                                                                                                                                                                     |
| `agent_completed`            | A background session finishes or fails. Fires only while [agent view](https://code.claude.com/docs/en/agent-view) is open in a terminal                                                                                                                                                                                                                                                                                                                                                           |
| `quota_auto_resume_fired`    | Claude Code continues your task after a claude.ai usage limit paused it: at the reset, or sooner when something you do in Claude Code during the wait, such as adding usage credits, upgrading your plan, or switching models, makes usage available again, with the [model-setting exception](https://code.claude.com/docs/en/interactive-mode#wait-for-a-usage-limit-to-reset)                                                                                                                  |
| `quota_auto_resume_stale`    | A claude.ai usage limit reset while your computer slept for more than about 30 minutes. Claude Code waits for you to press `Enter` instead of continuing. After a shorter sleep it continues and fires `quota_auto_resume_fired` instead                                                                                                                                                                                                                              |
| `quota_auto_resume_disabled` | Claude Code ends its wait for a claude.ai usage limit without continuing your task: [`autoContinueAtUsageLimit`](https://code.claude.com/docs/en/settings-reference#autocontinueatusagelimit) turned off or the reset moved more than 24 hours away during a wait Claude Code started on its own, the continued task kept hitting the limit, or the continuation was blocked before it reached the model. Doesn't fire when you press `Esc` or `Ctrl+C`, or pick **Don't continue automatically** |

The `agent_needs_input` and `agent_completed` types require Claude Code v2.1.198 or later.

The `quota_auto_resume_fired`, `quota_auto_resume_stale`, and `quota_auto_resume_disabled` types require Claude Code v2.1.234 or later.

In terminal sessions, `permission_prompt` for a sandboxed command's network request requires Claude Code v2.1.246 or later.

`agent_needs_input` for a teammate's terminal setup question requires Claude Code v2.1.248 or later.

  The `permission_prompt`, `idle_prompt`, `elicitation_dialog`, and `elicitation_url_dialog` types share their timing with desktop notifications, so in terminal sessions you only see them when you appear to be away from the terminal:

  * Expect `permission_prompt` once you haven't typed for about six seconds. The timer starts when the permission prompt appears, and each keystroke defers it. To run a hook immediately when Claude asks for permission to use a tool, use [PermissionRequest](#permissionrequest) instead.
  * Expect `idle_prompt` about 60 seconds after Claude finishes responding, and only if you haven't typed since. Claude Code doesn't send `idle_prompt` while it waits for a claude.ai usage limit to reset. When the wait ends on its own, one of the `quota_auto_resume_*` types fires instead.
  * Expect `elicitation_dialog` for an elicitation form, or `elicitation_url_dialog` for a browser URL request, once you haven't typed for about six seconds. Both share the same six-second gate as `permission_prompt`: the timer starts when the dialog appears, and each keystroke defers it.

  A permission request or elicitation that arrives while another dialog is on screen keeps the same six-second gate, timed from when the request arrives. Its notification can reach you while the request still waits behind the open dialog.

Claude Code times `permission_prompt` differently in sessions where it sends permission requests to the Agent SDK's [`canUseTool` callback](https://code.claude.com/docs/en/agent-sdk/user-input), which is how Claude Desktop and the VS Code extension host Claude Code:

* Expect `permission_prompt` about six seconds after Claude asks for permission. Claude Code doesn't defer it while you type.
* If you or a [PermissionRequest](#permissionrequest) hook answer sooner, Claude Code doesn't run `permission_prompt`.
* Set [`CLAUDE_CODE_DISABLE_PERMISSION_PROMPT_NOTIFY_HOOKS`](https://code.claude.com/docs/en/env-vars) to `1` to turn `permission_prompt` off in these sessions.

Before v2.1.233, `permission_prompt` didn't fire in these sessions.

Use separate matchers to run different handlers depending on the notification type. This configuration triggers a permission-specific alert script when Claude needs permission approval and a different notification when Claude has been idle:

```json theme={null}
{
  "hooks": {
    "Notification": [
      {
        "matcher": "permission_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/permission-alert.sh"
          }
        ]
      },
      {
        "matcher": "idle_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/idle-notification.sh"
          }
        ]
      }
    ]
  }
}
```

#### Notification input

In addition to the [common input fields](#common-input-fields), Notification hooks receive `message` with the notification text, an optional `title`, and `notification_type` indicating which type fired.

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "Notification",
  "message": "Claude needs your permission",
  "title": "Permission needed",
  "notification_type": "permission_prompt"
}
```

Notification hooks can't block or modify notifications. Claude Code discards their `systemMessage` and `continue` fields but still emits [`terminalSequence`](#emit-terminal-notifications), which is what the desktop notification example relies on. Notification hooks are intended for side effects such as forwarding the notification to an external service.
