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
pageSha256: "24904fb1ab6fdc3f9a55b13d81c816a393ddb6d10ae2db032583b5c2559ef588"
contentMode: "local-full"
zh: ""
---

### PreToolUse

Runs after Claude creates tool parameters and before processing the tool call. Matches on any tool name except `EndConversation`: built-in tools such as `Bash`, `PowerShell`, `Edit`, `Write`, `Read`, `Glob`, `Grep`, `Agent`, `Workflow`, `WebFetch`, `WebSearch`, `AskUserQuestion`, and `ExitPlanMode`, and any [MCP tool names](#match-mcp-tools).

To run a hook when a specific file changes on disk, whatever wrote it, use [FileChanged](#filechanged) instead of matching file-editing tools by name. Unlike PreToolUse, Claude Code runs FileChanged hooks after the change, and they have no decision control, so they can't block the write.

  PreToolUse runs only when Claude calls a tool. Files you [reference with `@` in your prompt](https://code.claude.com/docs/en/common-workflows#reference-files-and-directories) are added without any tool call: Claude Code inserts their contents while building the prompt, so no PreToolUse hook fires for them, including hooks matching `Read`. To block specific paths from `@` references, use a [`Read` deny rule](https://code.claude.com/docs/en/permissions#read-and-edit) instead.

  PreToolUse also doesn't fire for [`EndConversation`](https://code.claude.com/docs/en/tools-reference#endconversation-tool-behavior).

Use [PreToolUse decision control](#pretooluse-decision-control) to allow, deny, ask, or defer the tool call.

An [Agent SDK callback hook](https://code.claude.com/docs/en/agent-sdk/hooks) on `PreToolUse` that exceeds its timeout blocks the tool call, and Claude receives an error result naming the timeout. An explicit deny returned by another hook still takes precedence.

#### PreToolUse input

In addition to the [common input fields](#common-input-fields), PreToolUse hooks receive `tool_name`, `tool_input`, and `tool_use_id`.

For the file tools `Write`, `Edit`, and `Read`, `tool_input.file_path` is always absolute:

* Claude Code expands `~` and relative paths before hooks run, so a hook that matches on paths can't be bypassed via `~` or a relative spelling of the same path
* On Windows, the path arrives with backslash separators, even when your hook runs under Git Bash where `$PWD` looks like `/c/project`
* A comparison written with forward slashes, such as a `/src/` check, never matches a backslash path, and the tool call proceeds as if the hook had nothing to block
* Normalize separators before comparing: `FILE_PATH="${FILE_PATH//\\//\}"` in Bash, or `file_path.replace("\\", "/")` in Python, then match a path segment such as `/src/` rather than anchoring with `^`, since the path is absolute

A `Write` call on Windows delivers:

```json theme={null}
{
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "C:\\project\\src\\index.ts",
    "content": "..."
  },
  ...
}
```

The `tool_input` fields depend on the tool:

##### Bash

Executes shell commands.

| Field               | Type    | Example            | Description                                                                                                                                          |
| :------------------ | :------ | :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `command`           | string  | `"npm test"`       | The shell command to execute                                                                                                                         |
| `description`       | string  | `"Run test suite"` | Optional description of what the command does                                                                                                        |
| `timeout`           | number  | `120000`           | Optional timeout in milliseconds. Values above the [maximum](https://code.claude.com/docs/en/tools-reference#bash-tool-behavior) are reduced to the maximum rather than rejected |
| `run_in_background` | boolean | `false`            | Whether to run the command in background                                                                                                             |

&lt;a id="powershell" />

##### PowerShell

Executes PowerShell commands. See the [PowerShell tool](https://code.claude.com/docs/en/tools-reference#powershell-tool) for availability by platform.

The fields match the Bash tool, with the command string in `command`:

| Field               | Type    | Example                    | Description                                   |
| :------------------ | :------ | :------------------------- | :-------------------------------------------- |
| `command`           | string  | `"Get-ChildItem -Recurse"` | The PowerShell command to execute             |
| `description`       | string  | `"List files recursively"` | Optional description of what the command does |
| `timeout`           | number  | `120000`                   | Optional timeout in milliseconds              |
| `run_in_background` | boolean | `false`                    | Whether to run the command in background      |

Match `Bash|PowerShell` in hooks that inspect shell commands, so they cover both tools:

* On Windows, wherever the PowerShell tool is enabled, Claude treats PowerShell as the primary shell and routes shell commands through it.
* On Windows without Git Bash, the tool is enabled automatically and Claude Code doesn't register the Bash tool at all.
* A hook that matches only `Bash` never fires there.

##### Write

Creates or overwrites a file.

| Field       | Type   | Example               | Description                        |
| :---------- | :----- | :-------------------- | :--------------------------------- |
| `file_path` | string | `"/path/to/file.txt"` | Absolute path to the file to write |
| `content`   | string | `"file content"`      | Content to write to the file       |

##### Edit

Replaces a string in an existing file.

| Field         | Type    | Example               | Description                        |
| :------------ | :------ | :-------------------- | :--------------------------------- |
| `file_path`   | string  | `"/path/to/file.txt"` | Absolute path to the file to edit  |
| `old_string`  | string  | `"original text"`     | Text to find and replace           |
| `new_string`  | string  | `"replacement text"`  | Replacement text                   |
| `replace_all` | boolean | `false`               | Whether to replace all occurrences |

##### Read

Reads file contents.

| Field       | Type   | Example               | Description                                |
| :---------- | :----- | :-------------------- | :----------------------------------------- |
| `file_path` | string | `"/path/to/file.txt"` | Absolute path to the file to read          |
| `offset`    | number | `10`                  | Optional line number to start reading from |
| `limit`     | number | `50`                  | Optional number of lines to read           |

##### Glob

Finds files matching a glob pattern.

| Field     | Type   | Example          | Description                                                            |
| :-------- | :----- | :--------------- | :--------------------------------------------------------------------- |
| `pattern` | string | `"**/*.ts"`      | Glob pattern to match files against                                    |
| `path`    | string | `"/path/to/dir"` | Optional directory to search in. Defaults to current working directory |

##### Grep

Searches file contents with regular expressions.

| Field         | Type    | Example          | Description                                                                           |
| :------------ | :------ | :--------------- | :------------------------------------------------------------------------------------ |
| `pattern`     | string  | `"TODO.*fix"`    | Regular expression pattern to search for                                              |
| `path`        | string  | `"/path/to/dir"` | Optional file or directory to search in                                               |
| `glob`        | string  | `"*.ts"`         | Optional glob pattern to filter files                                                 |
| `output_mode` | string  | `"content"`      | `"content"`, `"files_with_matches"`, or `"count"`. Defaults to `"files_with_matches"` |
| `-i`          | boolean | `true`           | Case insensitive search                                                               |
| `multiline`   | boolean | `false`          | Enable multiline matching                                                             |

##### WebFetch

Fetches and processes web content.

| Field    | Type   | Example                       | Description                          |
| :------- | :----- | :---------------------------- | :----------------------------------- |
| `url`    | string | `"https://example.com/api"`   | URL to fetch content from            |
| `prompt` | string | `"Extract the API endpoints"` | Prompt to run on the fetched content |

##### WebSearch

Searches the web.

| Field             | Type   | Example                        | Description                                       |
| :---------------- | :----- | :----------------------------- | :------------------------------------------------ |
| `query`           | string | `"react hooks best practices"` | Search query                                      |
| `allowed_domains` | array  | `["docs.example.com"]`         | Optional: only include results from these domains |
| `blocked_domains` | array  | `["spam.example.com"]`         | Optional: exclude results from these domains      |

##### Agent

Spawns a [subagent](https://code.claude.com/docs/en/sub-agents).

| Field           | Type   | Example                    | Description                                  |
| :-------------- | :----- | :------------------------- | :------------------------------------------- |
| `prompt`        | string | `"Find all API endpoints"` | The task for the agent to perform            |
| `description`   | string | `"Find API endpoints"`     | Short description of the task                |
| `subagent_type` | string | `"Explore"`                | Type of specialized agent to use             |
| `model`         | string | `"sonnet"`                 | Optional model alias to override the default |

When a foreground Agent call completes, your [PostToolUse hook](#posttooluse) receives the subagent's final text and run telemetry in `tool_response`. Read these fields to inspect the run; for token and cost rollups across subagents, use the [token and cost counters](https://code.claude.com/docs/en/monitoring-usage#token-counter) filtered to `query_source` `"subagent"`, since `totalTokens` and `usage` cover the final request only:

| Field               | Type   | Example                                               | Description                                                                                                                                                                                                         |
| :------------------ | :----- | :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `status`            | string | `"completed"`                                         | `"completed"` for foreground subagents, `"async_launched"` for background subagents. As of v2.1.198, subagents run in the background by default, so an omitted `run_in_background` also produces `"async_launched"` |
| `agentId`           | string | `"a4d2c8f1e0b3a297"`                                  | Identifier for the subagent run                                                                                                                                                                                     |
| `content`           | array  | `[\{"type": "text", "text": "Found 12 endpoints..."\}]` | The subagent's final text blocks                                                                                                                                                                                    |
| `resolvedModel`     | string | `"claude-sonnet-4-5"`                                 | Model the subagent started on, which may differ from the requested model. Requires Claude Code v2.1.174 or later                                                                                                    |
| `modelsUsed`        | array  | `["claude-sonnet-4-5", "claude-haiku-4-5"]`           | Models used in order, with consecutive repeats collapsed; set only when the model was swapped mid-run. Requires Claude Code v2.1.212 or later                                                                       |
| `totalTokens`       | number | `12450`                                               | Token count from the subagent's final API request: input, output, and cache tokens combined. This isn't a total across the whole run                                                                                |
| `totalDurationMs`   | number | `48211`                                               | Wall-clock duration of the subagent run                                                                                                                                                                             |
| `totalToolUseCount` | number | `7`                                                   | Count of tool calls the subagent made                                                                                                                                                                               |
| `usage`             | object | `\{"input_tokens": 8320, ...\}`                         | Per-type token breakdown of the final API request: `input_tokens`, `output_tokens`, `cache_creation_input_tokens`, `cache_read_input_tokens`                                                                        |

For background subagents, the tool returns when the task moves to the background, so `tool_response` carries no usage fields: a background launch returns immediately, and a foreground task that Claude Code backgrounds mid-run returns at that transition. It has `status: "async_launched"`, `agentId`, `description`, `prompt`, `outputFile`, and `resolvedModel`.

On a `completed` response, `resolvedModel` names the model the subagent started on, which can differ from the `model` value in `tool_input`, such as when `availableModels` or another override applies. It requires Claude Code v2.1.174 or later. On an `async_launched` response, `resolvedModel` names the model in use when the agent moved to the background, so a swap that happened before backgrounding is reflected there. `modelsUsed` and the backgrounding-time `resolvedModel` behavior require Claude Code v2.1.212 or later.

&lt;a id="askuserquestion" />

##### AskUserQuestion

Asks the user one to four multiple-choice questions.

| Field       | Type   | Example                                                                                                            | Description                                                                                                                                                                                     |
| :---------- | :----- | :----------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `questions` | array  | `[\{"question": "Which framework?", "header": "Framework", "options": [\{"label": "React"\}], "multiSelect": false\}]` | Questions to present, each with a `question` string, short `header`, `options` array, and optional `multiSelect` flag                                                                           |
| `answers`   | object | `\{"Which framework?": "React"\}`                                                                                    | Optional. Maps question text to the selected option label. Multi-select answers join labels with commas. Claude doesn't set this field; supply it via `updatedInput` to answer programmatically |

##### ExitPlanMode

Presents a plan and asks the user to approve it before Claude leaves [plan mode](https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode). Claude writes the plan to a file on disk before calling the tool, so the literal `tool_input` from the model is typically empty. Claude Code injects the plan content and file path before passing the input to hooks.

| Field            | Type   | Example                                     | Description                                                                                                                                           |
| :--------------- | :----- | :------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plan`           | string | `"## Refactor auth\n1. Extract..."`         | Plan content in Markdown. Injected from the plan file on disk                                                                                         |
| `planFilePath`   | string | `"/Users/.../plans/refactor-auth.md"`       | Path to the plan file. Injected                                                                                                                       |
| `allowedPrompts` | array  | `[\{"tool": "Bash", "prompt": "run tests"\}]` | Deprecated. Claude Code accepts the field but ignores it. Before v2.1.205, it carried prompt-based permissions Claude requested to implement the plan |

In `PostToolUse`, `tool_response` is an object with `plan` and `filePath` fields holding the approved plan, plus internal status flags. Read `tool_response.plan` for the plan content rather than re-reading the file from disk.

#### PreToolUse decision control

`PreToolUse` hooks can control whether a tool call proceeds. Unlike other hooks that use a top-level `decision` field, PreToolUse returns its decision inside a `hookSpecificOutput` object. This gives it richer control: four outcomes (allow, deny, ask, or defer) plus the ability to modify tool input before execution.

| Field                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `permissionDecision`       | `"allow"` skips the permission prompt, except for the [actions no mode auto-approves](https://code.claude.com/docs/en/permission-modes#actions-no-mode-auto-approves) and for `AskUserQuestion` and `ExitPlanMode`, which need [`updatedInput` paired with it](#allow-with-updatedinput). `"deny"` prevents the tool call. `"ask"` prompts the user to confirm. `"defer"` exits gracefully so the tool can be resumed later. [Deny and ask rules](https://code.claude.com/docs/en/permissions#manage-permissions) are still evaluated regardless of what the hook returns |
| `permissionDecisionReason` | For `"allow"` and `"ask"`, shown to the user but not Claude. For `"deny"`, shown to Claude. For `"defer"`, ignored                                                                                                                                                                                                                                                                                                                                                                                                |
| `updatedInput`             | Modifies the tool's input parameters before execution. Replaces the entire input object, so include unchanged fields alongside modified ones. Claude Code evaluates permission rules and a Bash command's [auto-background eligibility](https://code.claude.com/docs/en/tools-reference#background-commands) against the input your hook returns, not the input Claude sent. Combine with `"allow"` to auto-approve, or `"ask"` to show the modified input to the user. For `"defer"`, ignored                                                |
| `additionalContext`        | String added to Claude's context alongside the tool result. Ignored when `permissionDecision` is `"defer"`. See [Add context for Claude](#add-context-for-claude)                                                                                                                                                                                                                                                                                                                                                 |

When multiple PreToolUse hooks return different decisions, precedence is `deny` > `defer` > `ask` > `allow`.

A hook that blocks by exiting 2 routes the same way as `"deny"`: Claude sees the stderr message as the denial reason.

When a hook returns `"ask"`, the permission prompt displayed to the user includes a label identifying where the hook came from: `[settings]` for a hook from any settings file or from agent frontmatter, `[plugin:<name>]` for a plugin's hook, or `[skill]` for a hook from skill frontmatter. This helps users understand which configuration source is requesting confirmation.

A hook's `"ask"` also forces a permission prompt in [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode): the classifier can still deny the tool call, but it can't approve the call silently. Before v2.1.211, the classifier could approve a Bash command running outside the [sandbox](https://code.claude.com/docs/en/sandboxing) without showing the prompt the hook requested; the classifier still applied its own safety rules to that command, and a hook `"deny"` was always honored.

```json theme={null}
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "permissionDecisionReason": "My reason here",
    "updatedInput": {
      "field_to_modify": "new value"
    },
    "additionalContext": "Current environment: production. Proceed with caution."
  }
}
```

&lt;span id="allow-with-updatedinput" />

In [non-interactive mode](https://code.claude.com/docs/en/headless) with the `-p` flag, Claude Code offers `AskUserQuestion` and `ExitPlanMode` only when the run has a [permission host](https://code.claude.com/docs/en/headless#turn-off-permission-prompts-in-unattended-runs) to receive the prompt, such as an Agent SDK `canUseTool` callback. These tools require user interaction. Returning `permissionDecision: "allow"` together with `updatedInput` satisfies that requirement: the hook reads the tool's input from stdin, collects the answer through your own UI, and returns it in `updatedInput` so the tool runs without prompting. Returning `"allow"` alone is not sufficient for these tools. For `AskUserQuestion`, echo back the original `questions` array and add an [`answers`](#askuserquestion) object mapping each question's text to the chosen answer.

As of v2.1.199, an MCP tool whose server marks it with [`_meta["anthropic/requiresUserInteraction"]`](https://code.claude.com/docs/en/mcp#require-approval-for-a-specific-tool) is stricter: a hook can't skip its approval prompt with `"allow"`, with or without `updatedInput`, because Claude Code can't confirm the hook collected the interaction the tool needs.

  PreToolUse previously used top-level `decision` and `reason` fields, but these are deprecated for this event. Use `hookSpecificOutput.permissionDecision` and `hookSpecificOutput.permissionDecisionReason` instead. The deprecated values `"approve"` and `"block"` map to `"allow"` and `"deny"` respectively. Other events like PostToolUse and Stop continue to use top-level `decision` and `reason` as their current format.

#### Defer a tool call for later

`"defer"` is for integrations that run `claude -p` as a subprocess and read its JSON output, such as an Agent SDK app or a custom UI built on top of Claude Code. It lets that calling process pause Claude at a tool call, collect input through its own interface, and resume where it left off. Claude Code honors this value only in [non-interactive mode](https://code.claude.com/docs/en/headless) with the `-p` flag. In interactive sessions it logs a warning and ignores the hook result.

The `AskUserQuestion` tool is the typical case: Claude wants to ask the user something, but there is no terminal to answer in. A `-p` run offers `AskUserQuestion` only when it has a [permission host](https://code.claude.com/docs/en/headless#turn-off-permission-prompts-in-unattended-runs), such as an MCP tool you pass with `--permission-prompt-tool`, so start the run with one. The round trip works like this:

1. Claude calls `AskUserQuestion`. The `PreToolUse` hook fires.
2. The hook returns `permissionDecision: "defer"`. The tool doesn't execute. The process exits with `stop_reason: "tool_deferred"` and the pending tool call preserved in the transcript.
3. The calling process reads `deferred_tool_use` from the SDK result, surfaces the question in its own UI, and waits for an answer.
