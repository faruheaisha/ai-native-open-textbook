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
pageSha256: "15c30a8d6e0e1d77c7e6e07532120a6516d7135900e6ef629ec5db1135070e64"
contentMode: "local-full"
zh: ""
---

### PermissionRequest

Runs when Claude Code is about to ask you for permission to use a tool. In sessions that can't show a prompt, such as background subagents in [non-interactive mode](https://code.claude.com/docs/en/headless), Claude Code still runs these hooks, and if no hook returns a decision, it denies the tool call.
Use [PermissionRequest decision control](#permissionrequest-decision-control) to allow or deny on behalf of the user.

Use this event when you need a signal the moment Claude asks for permission to use a tool. Claude Code runs a [Notification](#notification) hook with the `permission_prompt` type only after the prompt has waited about six seconds.

Claude Code doesn't run PermissionRequest hooks for a sandboxed command's [network request](https://code.claude.com/docs/en/sandboxing#network-isolation). To get a signal for that prompt, use the `permission_prompt` notification type.

Matches on tool name, same values as PreToolUse.

#### PermissionRequest input

PermissionRequest hooks receive `tool_name` and `tool_input` fields like PreToolUse hooks, but without `tool_use_id`. An optional `permission_suggestions` array contains the [permission updates](#permission-update-entries) Claude Code suggests for this request, such as adding an allow rule or changing the permission mode.

The `permission_suggestions` array isn't an exact list of the options you see, because each permission dialog builds its own options. Some dialogs, such as the one for file edits, don't read the array at all and derive their options from the request itself. A dialog that does read it can still withhold an option whose suggestion stays in the array, for example when [`allowManagedPermissionRulesOnly`](https://code.claude.com/docs/en/settings-reference#allowmanagedpermissionrulesonly) hides rule-saving options. It can also offer options that have no suggestion entry, such as [**Yes, and switch to auto mode**](https://code.claude.com/docs/en/permission-modes#switch-permission-modes), which changes the permission mode directly rather than through a permission update.

PreToolUse hooks run before every tool call, whether or not it needs permission. PermissionRequest hooks run only when Claude Code is about to ask you for permission, or when it would otherwise auto-deny a call that can't prompt. Neither event fires for [`EndConversation`](https://code.claude.com/docs/en/tools-reference#endconversation-tool-behavior).

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "PermissionRequest",
  "tool_name": "Bash",
  "tool_input": {
    "command": "rm -rf node_modules",
    "description": "Remove node_modules directory"
  },
  "permission_suggestions": [
    {
      "type": "addRules",
      "rules": [{ "toolName": "Bash", "ruleContent": "rm -rf node_modules" }],
      "behavior": "allow",
      "destination": "localSettings"
    }
  ]
}
```

#### PermissionRequest decision control

`PermissionRequest` hooks can allow or deny permission requests. In addition to the [JSON output fields](#json-output) available to all hooks, your hook script can return a `decision` object with these event-specific fields:

| Field                | Description                                                                                                                                                                                                                     |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `behavior`           | `"allow"` grants the permission, `"deny"` denies it. [Deny and ask rules](https://code.claude.com/docs/en/permissions#manage-permissions) are still evaluated, so a hook returning `"allow"` doesn't override a matching deny rule                          |
| `updatedInput`       | For `"allow"` only: modifies the tool's input parameters before execution. Replaces the entire input object, so include unchanged fields alongside modified ones. The modified input is re-evaluated against deny and ask rules |
| `updatedPermissions` | For `"allow"` only: array of [permission update entries](#permission-update-entries) to apply, such as adding an allow rule or changing the session permission mode                                                             |
| `message`            | For `"deny"` only: tells Claude why the permission was denied                                                                                                                                                                   |
| `interrupt`          | For `"deny"` only: if `true`, stops Claude                                                                                                                                                                                      |

A hook that exits 2 without a `decision` object leaves the permission flow unchanged, and its stderr is discarded. Only the `decision` object can grant or deny the request.

```json theme={null}
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionRequest",
    "decision": {
      "behavior": "allow",
      "updatedInput": {
        "command": "npm run lint"
      }
    }
  }
}
```

#### Permission update entries

The `updatedPermissions` output field and the [`permission_suggestions` input field](#permissionrequest-input) both use the same array of entry objects. Each entry has a `type` that determines its other fields, and a `destination` that controls where the change is written.

| `type`              | Fields                             | Effect                                                                                                                                                                                                                   |
| :------------------ | :--------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addRules`          | `rules`, `behavior`, `destination` | Adds permission rules. `rules` is an array of `\{toolName, ruleContent?\}` objects. Omit `ruleContent` to match the whole tool. `behavior` is `"allow"`, `"deny"`, or `"ask"`                                              |
| `replaceRules`      | `rules`, `behavior`, `destination` | Replaces all rules of the given `behavior` at the `destination` with the provided `rules`                                                                                                                                |
| `removeRules`       | `rules`, `behavior`, `destination` | Removes matching rules of the given `behavior`                                                                                                                                                                           |
| `setMode`           | `mode`, `destination`              | Changes the permission mode. Valid modes are `default`, `auto`, `acceptEdits`, `dontAsk`, `bypassPermissions`, `plan`, and `manual` as an alias for `default`. The `manual` alias requires Claude Code v2.1.200 or later |
| `addDirectories`    | `directories`, `destination`       | Adds working directories. `directories` is an array of path strings                                                                                                                                                      |
| `removeDirectories` | `directories`, `destination`       | Removes working directories                                                                                                                                                                                              |

  `setMode` with `bypassPermissions` only takes effect if you launched the session with bypass mode already available: `--dangerously-skip-permissions`, `--permission-mode bypassPermissions`, `--allow-dangerously-skip-permissions`, or `permissions.defaultMode: "bypassPermissions"` in [user, `--settings`, or managed settings](https://code.claude.com/docs/en/settings-reference#permissions-defaultmode). Otherwise the update is a no-op. The update is also a no-op when [`permissions.disableBypassPermissionsMode`](https://code.claude.com/docs/en/permissions#managed-settings) disables the mode, or when the session starts in [restricted mode](https://code.claude.com/docs/en/cli-reference#cli-flags).

  `bypassPermissions` is never persisted as `defaultMode` regardless of `destination`.

The `destination` field on every entry determines whether the change stays in memory or persists to a settings file.

| `destination`     | Writes to                                       |
| :---------------- | :---------------------------------------------- |
| `session`         | in-memory only, discarded when the session ends |
| `localSettings`   | `.claude/settings.local.json`                   |
| `projectSettings` | `.claude/settings.json`                         |
| `userSettings`    | `~/.claude/settings.json`                       |

A hook can echo one of the `permission_suggestions` it received as its own `updatedPermissions` output.
