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
sourceRel: "en/agent-sdk/python.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/python.md"
sourceSha256: "f49fb09963fda69499dc97a835a8db4970f3cd3070dff7f68ae6b644bd544987"
pageSha256: "6d965a71b9ef5e854fe948322c7ba19d5754f5e8f23acf919cb6599c99b2b297"
contentMode: "local-full"
zh: ""
---

## Error Types

The types below define what your code catches. For entries keyed to the error messages these types raise, with the cause and fix for each, see [Troubleshooting](https://code.claude.com/docs/en/agent-sdk/troubleshooting).

### `ClaudeSDKError`

Base exception class for all SDK errors.

```python theme={null}
class ClaudeSDKError(Exception):
    """Base error for Claude SDK."""
```

When a single-shot `query()` ends with an error result, for example a turn-limit error, the SDK raises a [`ResultError`](#resulterror) after yielding the final result message. Python Agent SDK versions before 0.2.140 raised a plain `Exception` that wasn't a `ClaudeSDKError` subclass.

### `CLINotFoundError`

Raised when Claude Code CLI is not installed or not found.

```python theme={null}
class CLINotFoundError(CLIConnectionError):
    def __init__(
        self, message: str = "Claude Code not found", cli_path: str | None = None
    ):
        """
        Args:
            message: Error message (default: "Claude Code not found")
            cli_path: Optional path to the CLI that was not found
        """
```

### `CLIConnectionError`

Raised when connection to Claude Code fails.

```python theme={null}
class CLIConnectionError(ClaudeSDKError):
    """Failed to connect to Claude Code."""
```

### `ProcessError`

Raised when the Claude Code process fails.

```python theme={null}
class ProcessError(ClaudeSDKError):
    def __init__(
        self, message: str, exit_code: int | None = None, stderr: str | None = None
    ):
        self.exit_code = exit_code
        self.stderr = stderr
```

### `ResultError`

Raised after the final [`ResultMessage`](#resultmessage) when the Claude Code process exits because the run ended with an error result, such as a turn-limit error or an API error. `ResultError` subclasses `ProcessError`, so an existing `except ProcessError` handler also catches it. Its attributes carry the fields of that result message, so you can branch on why the run failed without parsing the message text. Requires Python Agent SDK 0.2.140 or later.

```python theme={null}
class ResultError(ProcessError):
    subtype: str | None  # "error_max_turns", "error_during_execution", ...; "success" when the run ended on a failed request
    errors: list[str]  # an empty list when the result message reported none
    result: str | None
    api_error_status: int | None
    terminal_reason: str | None  # "max_turns", "api_error", ...; check this before subtype
    session_id: str | None
    data: dict[str, Any]  # the raw result message payload
```

To tell failures apart, check `terminal_reason` before `subtype`. When the final request fails, such as on an API error, Claude Code reports `subtype` `"success"` with the cause in `terminal_reason`, for example `"api_error"`; when a limit you set ends the run, such as `max_turns` or `max_budget_usd`, it reports an `error_*` subtype.

### `CLIJSONDecodeError`

Raised when JSON parsing fails.

```python theme={null}
class CLIJSONDecodeError(ClaudeSDKError):
    def __init__(self, line: str, original_error: Exception):
        """
        Args:
            line: The line that failed to parse
            original_error: The original JSON decode exception
        """
        self.line = line
        self.original_error = original_error
```
