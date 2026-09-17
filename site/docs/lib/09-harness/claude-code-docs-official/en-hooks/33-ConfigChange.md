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
pageSha256: "fab1e3b3311af53da19db1142d83da772e7a6e8f908fa971afa3342c912170c6"
contentMode: "local-full"
zh: ""
---

### ConfigChange

Runs when a configuration file changes during a session. Use this to audit settings changes, enforce security policies, or block unauthorized modifications to configuration files.

Claude Code runs ConfigChange hooks when a settings file, a managed policy file, or a skill file changes. For managed policy, it runs them only when `managed-settings.json` or a file in `managed-settings.d/` changes. It applies [server-managed settings](https://code.claude.com/docs/en/server-managed-settings) and changes to macOS managed preferences or Windows registry policy without running them. On WSL with [`wslInheritsWindowsSettings`](https://code.claude.com/docs/en/settings-reference#wslinheritswindowssettings), it also applies a changed Windows-side managed settings file on its policy poll without running them.

The matcher filters on the configuration source:

| Matcher            | When it fires                                                      |
| :----------------- | :----------------------------------------------------------------- |
| `user_settings`    | `~/.claude/settings.json` changes                                  |
| `project_settings` | `.claude/settings.json` changes                                    |
| `local_settings`   | `.claude/settings.local.json` changes                              |
| `policy_settings`  | `managed-settings.json` or a file in `managed-settings.d/` changes |
| `skills`           | A skill file in `.claude/skills/` changes                          |

This example logs all configuration changes for security auditing:

```json theme={null}
{
  "hooks": {
    "ConfigChange": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/audit-config-change.sh",
            "args": []
          }
        ]
      }
    ]
  }
}
```

#### ConfigChange input

In addition to the [common input fields](#common-input-fields), ConfigChange hooks receive `source` and optionally `file_path`. The `source` field indicates which configuration type changed, and `file_path` provides the path to the specific file that was modified.

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "ConfigChange",
  "source": "project_settings",
  "file_path": "/Users/.../my-project/.claude/settings.json"
}
```

#### ConfigChange decision control

ConfigChange hooks can block configuration changes from taking effect. Use exit code 2 or a JSON `decision` to prevent the change. When blocked, the new settings are not applied to the running session.

| Field      | Description                                                                              |
| :--------- | :--------------------------------------------------------------------------------------- |
| `decision` | `"block"` prevents the configuration change from being applied. Omit to allow the change |
| `reason`   | Accepted but never shown                                                                 |

```json theme={null}
{
  "decision": "block",
  "reason": "Configuration changes to project settings require admin approval"
}
```

`policy_settings` changes can't be blocked. Hooks still fire for `policy_settings` sources when a managed settings file on the machine changes, so you can use them to log those edits, but any blocking decision is ignored. This ensures enterprise-managed settings always take effect. Claude Code doesn't run `ConfigChange` hooks when [server-managed settings](https://code.claude.com/docs/en/server-managed-settings) arrive or refresh.

Claude Code acts on the blocking decision from a ConfigChange hook's JSON output and discards `systemMessage` and `continue`. A blocked change surfaces no message to you or to Claude, whether you block with `reason` or with stderr on exit 2. Claude Code only writes a line to the debug log.
