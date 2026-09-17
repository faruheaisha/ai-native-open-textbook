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
pageSha256: "55e597118f953ff797c734336975c2c363ee0212dd29f3b5a08c0fdb75dbd3a0"
contentMode: "local-full"
zh: ""
---

### MessageDisplay

Runs while an assistant message streams to the screen. Claude Code displays the message in increments: each time a batch of newly completed lines is ready to render, the hook runs once with those lines and Claude Code renders the hook's replacement text in their place. A long message produces several calls; a short message may produce only one.

Use MessageDisplay to:

* strip markdown for a minimal display
* transform the text an Agent SDK application shows its users
* redact API keys or internal hostnames from Claude's responses

Claude Code holds each batch until your hook returns, so keep the hook fast. If the hook fails or times out, Claude Code displays the original text. The default timeout for this event is 10 seconds; if your hook needs more time, set the `timeout` field in the hook entry.

MessageDisplay is display-only: the replacement text changes only what is rendered on screen. The transcript and what Claude sees keep the original text, so Claude never sees the replacement, and verbose mode shows the original. The hook receives assistant message text only, so tool results and the text you type render unchanged.

MessageDisplay doesn't support matchers and fires for every assistant message that streams text; messages with no text, such as tool-call-only responses, don't trigger it.

In non-interactive runs, including Agent SDK queries and `claude -p`, MessageDisplay runs once per assistant message instead of once per batch of lines. The single call arrives after the message completes and carries the full message text: `index` is `0`, `final` is `true`, and `delta` holds the entire message. A hook that collects the `delta` text for each message receives the same total text in both modes.

#### MessageDisplay input

In addition to the [common input fields](#common-input-fields), MessageDisplay hooks receive identifiers for the turn and message, the position of this call within the message, and the new text in `delta`. Batch boundaries depend on how the text streams, so use `index` and `final` to track progress through a message rather than expecting lines to be grouped a particular way.

| Field        | Description                                                                                                                                                                                                                                                                                                                                                                                       |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `turn_id`    | UUID of the current turn                                                                                                                                                                                                                                                                                                                                                                          |
| `message_id` | UUID of the assistant message being displayed. Stable across every batch of the same message. This is not the API `msg_…` id, so it can't be correlated with transcript message ids                                                                                                                                                                                                               |
| `index`      | Zero-based index of this batch within the message                                                                                                                                                                                                                                                                                                                                                 |
| `final`      | `true` on the message's last batch. Each message has exactly one final batch                                                                                                                                                                                                                                                                                                                      |
| `delta`      | The newly completed lines since the prior batch, terminating newlines included. Always whole lines, except the final batch which may end mid-line. In interactive runs, the final batch's delta is empty when the message ends on a newline, so treat `final`, not a non-empty delta, as the end-of-message signal. In Agent SDK and `claude -p` runs, the single call carries the entire message |

```json theme={null}
{
  "session_id": "abc123",
  "transcript_path": "/Users/.../.claude/projects/.../transcript.jsonl",
  "cwd": "/Users/my-project",
  "hook_event_name": "MessageDisplay",
  "turn_id": "0c9e6a2f-7d41-4f4e-9a15-3f4f7c2b8d10",
  "message_id": "5b2a9c8e-1f63-4d8a-b7c4-9e0d2a6f1c3b",
  "index": 0,
  "final": false,
  "delta": "Here is the plan:\n"
}
```

#### MessageDisplay output

In addition to the [JSON output fields](#json-output) available to all hooks, MessageDisplay hooks can return `displayContent` to replace the delta on screen:

| Field            | Description                                                           |
| :--------------- | :-------------------------------------------------------------------- |
| `displayContent` | Text displayed in place of the delta. Omit it to display the original |

MessageDisplay hooks have no decision control. They can't block the message or change what is stored in the transcript or sent to Claude. Claude Code acts on `displayContent` from their JSON output and discards `systemMessage` and `continue`.

This example strips markdown formatting from Claude's responses for a plain-text display. The script reads each batch from stdin, removes bold markers and inline code backticks from `delta`, and returns the result as `displayContent`.

    Register a command hook for the event in your settings file:

    ```json theme=\{null\}
    \{
      "hooks": \{
        "MessageDisplay": [
          \{
            "hooks": [
              \{
                "type": "command",
                "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/plain-display.sh",
                "args": []
              }
            ]
          }
        ]
      }
    }
    ```

    Save this script to `.claude/hooks/plain-display.sh` in your project and make it executable with `chmod +x`:

    ```bash theme={null}
    #!/bin/bash
    jq '{hookSpecificOutput: {hookEventName: "MessageDisplay", displayContent: (.delta | gsub("\\*\\*"; "") | gsub("`"; ""))}}'
    ```

    Register a command hook that runs the script through PowerShell:

    ```json theme={null}
    {
      "hooks": {
        "MessageDisplay": [
          {
            "hooks": [
              {
                "type": "command",
                "command": "powershell.exe",
                "args": [
                  "-NoProfile",
                  "-ExecutionPolicy",
                  "Bypass",
                  "-File",
                  "${CLAUDE_PROJECT_DIR\}/.claude/hooks/plain-display.ps1"
                ]
              \}
            ]
          \}
        ]
      \}
    \}
    ```

    The `-NoProfile` flag skips loading your PowerShell profile so the hook starts fast, and `-ExecutionPolicy Bypass` lets PowerShell run the local script file.

    Save this script to `.claude/hooks/plain-display.ps1` in your project:

    ```powershell theme=\{null\}
    $batch = [Console]::In.ReadToEnd() | ConvertFrom-Json
    $text = $batch.delta -replace '\*\*', '' -replace '`', ''
    @{
      hookSpecificOutput = @{
        hookEventName = "MessageDisplay"
        displayContent = $text
      \}
    \} | ConvertTo-Json
    ```

Batches with no markdown pass through unchanged. If the script fails, for example because `jq` is missing, Claude Code displays the original text and notes the failure only in [debug output](#debug-hooks), not in the session.
