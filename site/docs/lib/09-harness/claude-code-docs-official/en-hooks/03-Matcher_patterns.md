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
pageSha256: "2b77cc786f24f60700b238fef6b006a9d1a73cfe9c943651f940dd2733bd0c0f"
contentMode: "local-full"
zh: ""
---

### Matcher patterns

The `matcher` field filters when hooks fire. How a matcher is evaluated depends on the characters it contains:

| Matcher value                                         | Evaluated as                                                                                         | Example                                                                                                                                         |
| :---------------------------------------------------- | :--------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `"*"`, `""`, or omitted                               | Match all                                                                                            | fires on every occurrence of the event                                                                                                          |
| Only letters, digits, `_`, `-`, spaces, `,`, and `\|` | Exact string, or list of exact strings separated by `\|` or `,` with optional surrounding whitespace | `Bash` matches only the Bash tool; `Edit\|Write` and `Edit, Write` each match either tool exactly; `code-reviewer` matches only that agent type |
| Contains any other character                          | JavaScript regular expression, unanchored                                                            | `^Notebook` matches any tool whose name starts with `Notebook`; `mcp__memory__.*` matches every tool from the `memory` server                   |

A matcher on the regular-expression path is tested with JavaScript's `RegExp.prototype.test`, which succeeds on a match anywhere in the value. `Edit.*` matches both `Edit` and `NotebookEdit`; wrap the pattern in `^` and `$`, as in `^Edit$`, when you need a whole-string match.

Comma separators and the surrounding whitespace tolerance require Claude Code v2.1.191 or later.

Hyphens in the exact-match set require Claude Code v2.1.195 or later. On earlier versions a hyphenated name like `code-reviewer` is evaluated as an unanchored regular expression, so it also fires for `senior-code-reviewer`; anchor it as `^code-reviewer$` on those versions to match only that name.

`FileChanged` and `StopFailure` use a narrower exact-match set of letters, digits, `_`, and `|` only. A hyphen, space, or comma in a matcher for those two events keeps it on the regular-expression path, and only `|` separates alternatives. Every other event with matcher support in the table that follows accepts `|` or `,`.

The `FileChanged` event doesn't follow these rules when building its watch list. See [FileChanged](#filechanged).

Each event type matches on a different field:

| Event                                                                                                                                             | What the matcher filters                                                                                  | Example matcher values                                                                                                                                                                                                                                                         |
| :------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, `PermissionDenied`                                                        | tool name                                                                                                 | `Bash`, `Edit\|Write`, `mcp__.*`                                                                                                                                                                                                                                               |
| `SessionStart`                                                                                                                                    | how the session started                                                                                   | `startup`, `resume`, `clear`, `compact`, `fork`                                                                                                                                                                                                                                |
| `Setup`                                                                                                                                           | which CLI flag triggered setup                                                                            | `init`, `maintenance`                                                                                                                                                                                                                                                          |
| `SessionEnd`                                                                                                                                      | why the session ended                                                                                     | `clear`, `resume`, `logout`, `prompt_input_exit`, `other`                                                                                                                                                                                                                      |
| `Notification`                                                                                                                                    | notification type                                                                                         | `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog`, `elicitation_url_dialog`, `elicitation_complete`, `elicitation_response`, `agent_needs_input`, `agent_completed`, `quota_auto_resume_fired`, `quota_auto_resume_stale`, `quota_auto_resume_disabled` |
| `SubagentStart`                                                                                                                                   | agent type                                                                                                | `general-purpose`, `Explore`, `Plan`, custom agent names, or plugin-scoped names like `^my-plugin:reviewer$`                                                                                                                                                                   |
| `PreCompact`, `PostCompact`                                                                                                                       | what triggered compaction                                                                                 | `manual`, `auto`                                                                                                                                                                                                                                                               |
| `PreModelSwitch`, `PostModelSwitch`                                                                                                               | canonical name of the model the session switches to, as described under [PreModelSwitch](#premodelswitch) | `claude-opus-5`, `claude-opus-4-6\|claude-opus-5`, `.*opus.*`                                                                                                                                                                                                                  |
| `SubagentStop`                                                                                                                                    | agent type                                                                                                | same values as `SubagentStart`                                                                                                                                                                                                                                                 |
| `ConfigChange`                                                                                                                                    | configuration source                                                                                      | `user_settings`, `project_settings`, `local_settings`, `policy_settings`, `skills`                                                                                                                                                                                             |
| `CwdChanged`                                                                                                                                      | no matcher support                                                                                        | always fires on every occurrence                                                                                                                                                                                                                                               |
| `DirectoryAdded`                                                                                                                                  | how the directory was added                                                                               | `slash_command`, `register_repo_root`                                                                                                                                                                                                                                          |
| `FileChanged`                                                                                                                                     | literal filenames to watch (see [FileChanged](#filechanged))                                              | `.envrc\|.env`                                                                                                                                                                                                                                                                 |
| `StopFailure`                                                                                                                                     | error type                                                                                                | `rate_limit`, `overloaded`, `authentication_failed`, `oauth_org_not_allowed`, `account_on_hold`, `billing_error`, `invalid_request`, `model_not_found`, `server_error`, `max_output_tokens`, `cloud_credential_error`, `unknown`                                               |
| `InstructionsLoaded`                                                                                                                              | load reason                                                                                               | `session_start`, `nested_traversal`, `path_glob_match`, `include`, `compact`                                                                                                                                                                                                   |
| `UserPromptExpansion`                                                                                                                             | command name                                                                                              | your skill or command names                                                                                                                                                                                                                                                    |
| `Elicitation`                                                                                                                                     | MCP server name                                                                                           | your configured MCP server names                                                                                                                                                                                                                                               |
| `ElicitationResult`                                                                                                                               | MCP server name                                                                                           | same values as `Elicitation`                                                                                                                                                                                                                                                   |
| `UserPromptSubmit`, `PostToolBatch`, `Stop`, `TeammateIdle`, `TaskCreated`, `TaskCompleted`, `WorktreeCreate`, `WorktreeRemove`, `MessageDisplay` | no matcher support                                                                                        | always fires on every occurrence                                                                                                                                                                                                                                               |

Matching `StopFailure` on `cloud_credential_error` requires Claude Code v2.1.267 or later, the first version that reports credential-load failures under that value rather than `server_error` or `unknown`.

For most events, Claude Code evaluates the matcher against a field from the [JSON input](#hook-input-and-output) it sends to your hook on stdin. For tool events, that field is `tool_name`. For `PreModelSwitch` and `PostModelSwitch`, Claude Code evaluates the matcher against the canonical name it derives from `to_model`, as described under [PreModelSwitch](#premodelswitch). Each [hook event](#hook-events) section lists the full set of matcher values and the input schema for that event.

This example runs a linting script only when Claude writes or edits a file:

```json theme={null}
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/lint-check.sh"
          }
        ]
      }
    ]
  }
}
```

If you add a `matcher` field to an event without matcher support, it is silently ignored.

For tool events, you can filter more narrowly by setting the [`if` field](#common-fields) on individual hook handlers. `if` uses [permission rule syntax](https://code.claude.com/docs/en/permissions) to match against the tool name and arguments together, so `"Bash(git *)"` runs when any subcommand of the Bash input matches `git *` and `"Edit(*.ts)"` runs only for TypeScript files.

#### Match MCP tools

[MCP](https://code.claude.com/docs/en/mcp) server tools appear as regular tools in tool events (`PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, `PermissionDenied`), so you can match them the same way you match any other tool name.

MCP tools follow the naming pattern `mcp__<server>__<tool>`, for example:

* `mcp__memory__create_entities`: Memory server's create entities tool
* `mcp__filesystem__read_file`: Filesystem server's read file tool
* `mcp__github__search_repositories`: GitHub server's search tool

To match every tool from a server, append `.*` to the server prefix. The `.*` is required: a matcher like `mcp__memory` or `mcp__brave-search` contains only exact-match characters, so it is compared as an exact string and matches no tool.

* `mcp__memory__.*` matches all tools from the `memory` server
* `mcp__brave-search__.*` matches all tools from a server whose name contains a hyphen
* `mcp__.*__write.*` matches any tool whose name starts with `write` from any server

Hyphens in the exact-match set require Claude Code v2.1.195 or later. On earlier versions a bare hyphenated prefix like `mcp__brave-search` is evaluated as an unanchored regular expression and matches every tool from that server. The `mcp__brave-search__.*` form works on every version.
