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
pageSha256: "612f64198135217accf1657914077ed01798631d329fb3d2f56d146ac5d29f18"
contentMode: "local-full"
zh: ""
---

### SessionEnd

Runs when a Claude Code session ends. Useful for cleanup tasks, logging session
statistics, or saving session state. Supports matchers to filter by exit reason.

The `reason` field in the hook input indicates why the session ended:

| Reason                        | Description                                                                               |
| :---------------------------- | :---------------------------------------------------------------------------------------- |
| `clear`                       | Session cleared with `/clear` command                                                     |
| `resume`                      | Session switched via interactive `/resume`                                                |
| `logout`                      | User logged out                                                                           |
| `prompt_input_exit`           | User exited while prompt input was visible                                                |
| `other`                       | Other exit reasons                                                                        |
| `bypass_permissions_disabled` | Removed in v2.1.234; Claude Code doesn't send it. Drop it from your `SessionEnd` matchers |

#### SessionEnd input

In addition to the [common input fields](#common-input-fields), SessionEnd hooks receive a `reason` field indicating why the session ended. See the [reason table](#sessionend) above for all values.

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "SessionEnd",
  "reason": "other"
}
```

SessionEnd hooks have no decision control. They can't block session termination but can perform cleanup tasks. Claude Code discards their [JSON output fields](#json-output), such as `systemMessage`.

SessionEnd hooks have a default timeout of 1.5 seconds. This applies to session exit, `/clear`, and switching sessions via interactive `/resume`. If a hook needs more time, set a per-hook `timeout` in the hook configuration. The overall budget is automatically raised to the highest per-hook timeout configured in settings files, up to 60 seconds. Timeouts set on plugin-provided hooks don't raise the budget. To override the budget explicitly, set the `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` environment variable in milliseconds.

```bash theme={null}
CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS=5000 claude
```
