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
pageSha256: "548f792acbb410118f3551ac0c95e060b30379b51e898ec0fb756847f700841d"
contentMode: "local-full"
zh: ""
---

### UserPromptSubmit

Runs when the user submits a prompt, before Claude processes it. This allows you
to add additional context based on the prompt/conversation, validate prompts, or
block certain types of prompts.

`UserPromptSubmit` hooks have a default timeout of 30 seconds for `command`, `http`, and `mcp_tool` types, shorter than the 600-second default for those types on most other events. Because this hook runs before every prompt and blocks model processing until it completes, a stuck hook stalls the session. If your hook needs more time, set the `timeout` field in the hook entry.

Apart from a command hook you run with [`async: true`](#run-hooks-in-the-background), a `UserPromptSubmit` command, HTTP, or MCP tool hook that reaches its timeout is canceled and its output, including any `additionalContext`, is discarded. The prompt still reaches Claude without that context. The transcript shows a notice naming the hook, the timeout that fired, and that the output was discarded.

An [Agent SDK callback hook](https://code.claude.com/docs/en/agent-sdk/hooks) on `UserPromptSubmit` that reaches its timeout blocks the prompt with a message naming the hook and the timeout, because a callback there can be acting as a policy gate that must not fail open. The session continues. Before v2.1.208, a callback timeout on that event ended the turn with an execution error.

#### UserPromptSubmit input

In addition to the [common input fields](#common-input-fields), UserPromptSubmit hooks receive the `prompt` field containing the text the user submitted.

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "permission_mode": "default",
  "hook_event_name": "UserPromptSubmit",
  "prompt": "Write a function to calculate the factorial of a number"
}
```

#### UserPromptSubmit decision control

`UserPromptSubmit` hooks can control whether a user prompt is processed and add context. All [JSON output fields](#json-output) are available.

There are two ways to add context to the conversation on exit code 0:

* **Plain text stdout**: Claude Code adds stdout it [treats as plain text](#exit-code-0) to Claude's context
* **JSON with `additionalContext`**: use the JSON format below for more control. The `additionalContext` field is added as context

Neither channel produces a visible transcript entry. Plain stdout and the `additionalContext` value are each injected as a system reminder that starts with the hook's name; Claude reads both. To confirm delivery, check the [debug log](#debug-hooks).

To block a prompt, return a JSON object with `decision` set to `"block"`:

| Field                    | Description                                                                                                            |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `decision`               | `"block"` prevents the prompt from being processed and erases it from context. Omit to allow the prompt to proceed     |
| `reason`                 | Shown to the user when `decision` is `"block"`. Not added to context                                                   |
| `additionalContext`      | String added to Claude's context alongside the submitted prompt. See [Add context for Claude](#add-context-for-claude) |
| `sessionTitle`           | Sets the session title. Use to name sessions automatically based on the prompt content                                 |
| `suppressOriginalPrompt` | If `true` when `decision` is `"block"`, omits the original prompt text from the block message shown to the user        |

A hook that blocks by exiting 2 routes the same way as `reason`: the block message shows the stderr text to the user, and it isn't added to context.

```json theme={null}
{
  "decision": "block",
  "reason": "Explanation for decision",
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "My additional context here",
    "sessionTitle": "My session title"
  }
}
```
