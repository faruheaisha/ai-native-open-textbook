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
pageSha256: "7d2e3f4953dc707c7249148ad467a2b2df0a6da612d13842ee726290ba4b5595"
contentMode: "local-full"
zh: ""
---

### PreModelSwitch

Runs before Claude Code applies a model switch that you or a client requested. Use it to block a switch, require confirmation, or show what the switch will cost before it happens.

PreModelSwitch requires Claude Code v2.1.251 or later. Claude Code runs it for these requests:

* `/model <name>` and the `/model` picker
* The `Option+P` or `Alt+P` model picker
* The Model setting in `/config`
* Turning on [fast mode](https://code.claude.com/docs/en/fast-mode) when that changes the session's model
* A `set_model` request, or a model change in an `apply_flag_settings` request, from an [Agent SDK](https://code.claude.com/docs/en/agent-sdk/typescript#query-object) host or [Remote Control](https://code.claude.com/docs/en/remote-control)

Claude Code doesn't run PreModelSwitch hooks for switches it makes on its own, such as an [automatic model fallback](https://code.claude.com/docs/en/model-config#automatic-model-fallback) or restoring the model when you resume a session. Those changes reach [PostModelSwitch](#postmodelswitch) only.

Claude Code compares the matcher against the canonical name of the model the session is switching to, ignoring any `[1m]` suffix. An alias such as `opus`, a dated model ID, and a provider-specific ID such as an Amazon Bedrock model ID all match the one canonical name they resolve to, so `claude-opus-5` covers every spelling of Opus 5.

When Claude Code can't determine a canonical name for the target, for example a custom model ID that only your [LLM gateway](https://code.claude.com/docs/en/llm-gateway) knows, it runs every PreModelSwitch hook regardless of matcher. A hook that blocks should therefore check `to_model` from its input rather than rely on the matcher alone.

Write the matcher as an exact name, a `|`-separated list such as `claude-opus-4-6|claude-opus-5`, or a regular expression such as `.*opus.*`. This example uses an exact-name matcher and also checks `to_model` from the hook input, so it refuses a switch to Opus 4.6 by exiting with code 2 and lets any other target through:

    The command checks `to_model` with `jq`:

    ```json theme=\{null\}
    \{
      "hooks": \{
        "PreModelSwitch": [
          \{
            "matcher": "claude-opus-4-6",
            "hooks": [
              \{
                "type": "command",
                "command": "jq -e '.to_model | test(\"opus-4-6\")' > /dev/null && \{ echo 'Opus 4.6 is retired for this project. Use a newer model.' >&2; exit 2; \}; exit 0"
              \}
            ]
          \}
        ]
      \}
    \}
    ```

    Register a command hook that runs a script through PowerShell:

    ```json theme=\{null\}
    \{
      "hooks": \{
        "PreModelSwitch": [
          \{
            "matcher": "claude-opus-4-6",
            "hooks": [
              \{
                "type": "command",
                "command": "powershell.exe",
                "args": [
                  "-NoProfile",
                  "-ExecutionPolicy",
                  "Bypass",
                  "-File",
                  "${CLAUDE_PROJECT_DIR}/.claude/hooks/block-opus-46.ps1"
                ]
              }
            ]
          }
        ]
      }
    }
    ```

    Save this script to `.claude/hooks/block-opus-46.ps1` in your project:

    ```powershell theme={null}
    $hookInput = [Console]::In.ReadToEnd() | ConvertFrom-Json
    if ($hookInput.to_model -match 'opus-4-6') \{
      [Console]:https://code.claude.com/docs 4.6 is retired for this project. Use a newer model.')
      exit 2
    \}
    exit 0
    ```

To confirm the hook works, run `/model claude-opus-4-6` from a session running a different model. Claude Code keeps the current model and reports that a PreModelSwitch hook blocked the switch, with your message as the reason.

#### PreModelSwitch input

In addition to the [common input fields](#common-input-fields), PreModelSwitch hooks receive the fields in this table. The last five describe what re-sending the conversation to the new model costs, so a hook can show that figure before the switch happens.

| Field                       | Type             | Description                                                                                                                                                                                                                                                                              |
| :-------------------------- | :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from_model`                | string           | Model ID the switch changes from                                                                                                                                                                                                                                                         |
| `to_model`                  | string           | Model ID the switch changes to. The matcher compares against this model's canonical name                                                                                                                                                                                                 |
| `requested_model`           | string or `null` | The model the request named: an alias such as `opus`, a full model ID, or `null` when the request was for the default model                                                                                                                                                              |
| `source`                    | string           | Where the request came from: `"command"` for `/model <name>`, the Model setting in `/config`, or turning on fast mode; `"picker"` for a model picker; `"sdk"` for a `set_model` request, or a model change in an `apply_flag_settings` request, from an Agent SDK host or Remote Control |
| `context_tokens`            | number           | Tokens the next request re-sends as its prompt: the input, cache read, cache creation, and output tokens of the last response in the main conversation, combined. `0` before the first response                                                                                          |
| `prompt_cache_warm`         | boolean          | Whether the current model's prompt cache is likely still warm, meaning the switch forfeits it                                                                                                                                                                                            |
| `cache_ttl`                 | string           | [Prompt cache lifetime](https://code.claude.com/docs/en/prompt-caching#cache-lifetime) Claude Code requests for this session: `"5m"` or `"1h"`                                                                                                                                                                       |
| `estimated_cache_write_usd` | number           | Estimated cost in US dollars of writing `context_tokens` to the prompt cache on `to_model` at the `cache_ttl` rate, excluding the next response. The server may not need to re-cache the whole context, so treat it as an estimate                                                       |
| `pricing`                   | string           | How Claude Code priced `estimated_cache_write_usd`: `"configured"` at your organization's own rates when it has configured them, `"catalog"` at list price, or `"default"` when `to_model` has no known price and Claude Code assumed a default rate                                     |

This example shows the input for `/model opus` in a session running Sonnet 5:

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "cwd": "/Users/...",
  "hook_event_name": "PreModelSwitch",
  "from_model": "claude-sonnet-5",
  "to_model": "claude-opus-5",
  "requested_model": "opus",
  "source": "command",
  "context_tokens": 182340,
  "prompt_cache_warm": true,
  "cache_ttl": "5m",
  "estimated_cache_write_usd": 1.1396,
  "pricing": "catalog"
}
```

#### PreModelSwitch decision control

`PreModelSwitch` hooks can cancel the switch, ask the user to confirm it, or let it proceed. Exit code 2 or a top-level `decision: "block"` cancels the switch.

For finer control, return `permissionDecision` and `permissionDecisionReason` in a `hookSpecificOutput` object, as on [PreToolUse](#pretooluse-decision-control). `PreModelSwitch` accepts `"allow"`, `"deny"`, and `"ask"`. It doesn't accept `"defer"`, `updatedInput`, or `additionalContext`. The table below describes both fields:

| Field                      | Description                                                                                                                                                                                                |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `permissionDecision`       | `"allow"` proceeds and skips the [confirmation Claude Code shows while the prompt cache is warm](https://code.claude.com/docs/en/prompt-caching#switching-models). `"deny"` cancels the switch. `"ask"` prompts the user to confirm it |
| `permissionDecisionReason` | For `"deny"`, shown to the user as the reason the switch was blocked, or returned as the error for a `set_model` request. For `"ask"`, shown in the confirmation prompt. Ignored for `"allow"`             |

Only `/model` in an interactive session can show the `"ask"` prompt. On every other surface, including non-interactive mode with the `-p` flag, `/config`, and `set_model` requests, Claude Code treats `"ask"` as a refusal.

This example asks the user to confirm and quotes the token count from `context_tokens`:

```json theme={null}
{
  "hookSpecificOutput": {
    "hookEventName": "PreModelSwitch",
    "permissionDecision": "ask",
    "permissionDecisionReason": "Switching now re-sends about 180k tokens to the new model. Continue?"
  }
}
```

When multiple PreModelSwitch hooks return different decisions, precedence is `deny` > `ask` > `allow`.

Claude Code shows the user any `systemMessage` your hook returns regardless of the decision, so a cost-report hook can return `\{"systemMessage": "..."\}` and exit 0.

A PreModelSwitch hook that doesn't respond before its timeout blocks the switch. On [PreToolUse](#timeouts), by contrast, a timed-out command hook lets the tool call continue. The default timeout for this event is 30 seconds. `PreModelSwitch` runs `command`, `http`, and `mcp_tool` hooks only, so the `prompt` and `agent` defaults don't apply.

A hook that exits with a code other than 0 or 2 and prints no JSON decision doesn't block: Claude Code shows its stderr and applies the switch, as described under [Other exit codes](#other-exit-codes).
