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
pageSha256: "7e328e10a0d7925ea3f503c32a20fe1c01fcda91854d983fbf561183b440a368"
contentMode: "local-full"
zh: ""
---

## Tool Input/Output Types

Documentation of input/output schemas for all built-in Claude Code tools. While the Python SDK doesn't export these as types, they represent the structure of tool inputs and outputs in messages.

### Agent

**Tool name:** `Agent`. The previous name `Task` is still accepted as an alias, and the `tools` list in the init [`SystemMessage`](#systemmessage) reports this tool as `Task` for backward compatibility.

**Input:**

```python theme={null}
{
    "description": str,  # A short (3-5 word) description of the task
    "prompt": str,  # The task for the agent to perform
    "subagent_type": str | None,  # The type of specialized agent to use
    "model": "sonnet" | "opus" | "haiku" | "fable" | None,  # Model override for this agent
    "run_in_background": bool | None,  # Agents run in the background by default; set to False to run synchronously
    "name": str | None,  # Name for the spawned agent
    "team_name": str | None,  # Deprecated; ignored
    "mode": "acceptEdits" | "auto" | "bypassPermissions" | "default" | "dontAsk" | "plan" | None,  # Deprecated; ignored. The subagent inheritance rules decide a subagent's permission mode
    "isolation": "worktree" | "remote" | None,  # Isolation mode for the agent's changes
}
```

Launches a new agent to handle complex, multi-step tasks autonomously.

**Output (status: `"completed"`):**

```python theme={null}
{
    "status": "completed",
    "agentId": str,  # ID of the agent that ran
    "agentType": str | None,  # The subagent type that handled the task
    "content": [  # Result content blocks
        {
            "type": "text",
            "text": str,
            "citations": list | None,
        }
    ],
    "resolvedModel": str | None,  # Model the subagent started on
    "modelsUsed": list[str] | None,  # Models used in order, with consecutive repeats collapsed
    "totalToolUseCount": int,  # Number of tool calls the agent made
    "totalDurationMs": int,  # Execution duration in milliseconds
    "totalTokens": int,  # Token count from the final API request, not the whole run
    "usage": {  # Token usage statistics
        "input_tokens": int,
        "output_tokens": int,
        "cache_creation_input_tokens": int | None,
        "cache_read_input_tokens": int | None,
        "server_tool_use": {"web_search_requests": int, "web_fetch_requests": int} | None,
        "service_tier": str | None,
        "cache_creation": {"ephemeral_1h_input_tokens": int, "ephemeral_5m_input_tokens": int} | None,
        "inference_geo": str | None,
        "speed": str | None,
        "iterations": Any | None,
        "output_tokens_details": {"thinking_tokens": int | None} | None,
    },
    "toolStats": {  # Aggregate tool activity for the run
        "readCount": int,
        "searchCount": int,
        "bashCount": int,
        "editFileCount": int,
        "linesAdded": int,
        "linesRemoved": int,
        "otherToolCount": int,
        "frameCount": int | None,
    } | None,
    "prompt": str,  # The prompt the agent ran
    "worktreePath": str | None,  # Present when Claude Code kept the subagent's worktree
    "worktreeBranch": str | None,  # Present when Claude Code created that worktree with git
}
```

**Output (status: `"async_launched"`):**

```python theme={null}
{
    "status": "async_launched",
    "isAsync": bool | None,  # True on background launches
    "agentId": str,  # ID of the launched agent
    "description": str,  # The task description
    "resolvedModel": str | None,  # Model in use at the backgrounding transition
    "modelsUsed": list[str] | None,  # Models used before backgrounding, in order, with consecutive repeats collapsed
    "prompt": str,  # The prompt the agent runs
    "outputFile": str,  # File path where the agent's output is written
    "canReadOutputFile": bool | None,  # Whether the output file can be read directly
}
```

**Output (status: `"remote_launched"`):**

```python theme={null}
{
    "status": "remote_launched",
    "taskId": str,  # ID of the remote task
    "sessionUrl": str,  # Link to the remote cloud session
    "description": str,  # The task description
    "prompt": str,  # The prompt the agent runs
    "outputFile": str,  # File path where the agent's output is written
}
```

Returns the result from the subagent. The output is discriminated on the `status` field: `"completed"` for finished tasks, `"async_launched"` for background tasks, and `"remote_launched"` for tasks Claude Code dispatched to a remote cloud session, where `sessionUrl` links to that session and `taskId` identifies it. If Claude Code [kept the subagent's isolated worktree](https://code.claude.com/docs/en/worktrees#isolate-subagents-with-worktrees), `worktreePath` on the `completed` variant is where to find it, and `worktreeBranch` is its branch when Claude Code created the worktree with git.

On the `completed` variant, `resolvedModel` names the model the subagent started on, which can differ from the requested `model` input when [`availableModels`](https://code.claude.com/docs/en/model-config#restrict-model-selection) or another override applies. This field requires Claude Code v2.1.174 or later. On the `async_launched` variant, `resolvedModel` names the model in use when the agent moved to the background, so a swap that happened before backgrounding is reflected there. The `modelsUsed` field on both variants lists the models used in order, with consecutive repeats collapsed; it's set only when the model was swapped mid-run. `modelsUsed` and the backgrounding-time `resolvedModel` behavior require Claude Code v2.1.212 or later.

Claude Code fills `usage` and `totalTokens` from the subagent's final API request, not from the whole run. When present, `thinking_tokens` under `output_tokens_details` in `usage` is the number of that request's output tokens that were thinking tokens. The `output_tokens_details` key requires Python SDK v0.2.136 or later, which bundles Claude Code v2.1.228.

### AskUserQuestion

**Tool name:** `AskUserQuestion`

Asks the user clarifying questions during execution. See [Handle approvals and user input](https://code.claude.com/docs/en/agent-sdk/user-input#handle-clarifying-questions) for usage details.

**Input:**

```python theme={null}
{
    "questions": [  # Questions to ask the user (1-4 questions)
        {
            "question": str,  # The complete question to ask the user
            "header": str,  # Very short label displayed as a chip/tag (max 12 chars)
            "options": [  # The available choices (2-4 options)
                {
                    "label": str,  # Display text for this option (1-5 words)
                    "description": str,  # Explanation of what this option means
                    "preview": str | None,  # Preview content rendered when the option is focused
                }
            ],
            "multiSelect": bool,  # Set to true to allow multiple selections
        }
    ],
    "answers": dict[str, str] | None,
    # User answers populated by the permission system. Multi-select
    # answers are a comma-joined string of the selected labels; a
    # list of labels is accepted on input and coerced to that form
    "annotations": dict[str, dict] | None,
    # Per-question annotations from the user, keyed by question text.
    # Each value can carry "preview" (the selected option's preview
    # content) and "notes" (free-text notes on the selection)
    "metadata": dict | None,  # Analytics metadata, such as {"source": "remember"}; not displayed to the user
}
```

**Output:**

```python theme={null}
{
    "questions": [  # The questions that were asked
        {
            "question": str,
            "header": str,
            "options": [{"label": str, "description": str, "preview": str | None}],
            "multiSelect": bool,
        }
    ],
    "answers": dict[str, str],  # Maps question text to answer string
    # Multi-select answers are comma-separated
    "response": str | None,
    # Freeform reply typed instead of answering the questions; when set,
    # Claude receives "The user responded: ..." in place of the answer list
    "annotations": dict[str, dict] | None,  # Per-question "preview" and "notes" from the user's selections
    "afkTimeoutMs": int | None,  # Set when the dialog auto-resolved after this many milliseconds of user inactivity; absent when the user answered
}
```

### Bash

**Tool name:** `Bash`

**Input:**

```python theme={null}
{
    "command": str,  # The command to execute
    "timeout": int | None,  # Optional timeout in milliseconds (max 600000; higher values are clamped to the max)
    "description": str | None,  # Clear, concise description (5-10 words)
    "run_in_background": bool | None,  # Set to true to run in background
}
```

**Output:**

```python theme={null}
{
    "stdout": str,  # The command's output; stdout and stderr arrive merged into this one interleaved stream
    "stderr": str,  # Notices the tool itself adds, not the command's stderr
    "interrupted": bool,  # Whether the command was interrupted
    "isImage": bool | None,  # Whether stdout contains image data
    "backgroundTaskId": str | None,  # ID of the background task if command is running in background
}
```

### Monitor

**Tool name:** `Monitor`

Runs a background source and delivers each event to Claude so it can react without polling: `command` runs a script and emits one event per stdout line, and `ws` opens a WebSocket and emits one event per text frame. Provide exactly one of `command` or `ws`.

When Monitor runs a command, it follows the same permission rules as Bash; a WebSocket watch prompts for approval separately. The `ws` source requires Claude Code v2.1.195 or later. See the [Monitor tool reference](https://code.claude.com/docs/en/tools-reference#monitor-tool) for behavior and provider availability.

**Input:**

```python theme={null}
{
    "command": str | None,  # Shell script; each stdout line is an event, exit ends the watch
    "ws": dict | None,  # WebSocket source: {"url": str, "protocols": list[str] | None}; each text frame is an event
    "description": str,  # Short description shown in notifications
    "timeout_ms": int | None,  # Kill after this deadline (default 300000, max 3600000)
    "persistent": bool | None,  # Run for the lifetime of the session; stop with TaskStop
}
```

**Output:**

```python theme={null}
{
    "taskId": str,  # ID of the background monitor task
    "timeoutMs": int,  # Timeout deadline in milliseconds (0 when persistent)
    "persistent": bool | None,  # True when running until TaskStop or session end
}
```

### Edit

**Tool name:** `Edit`

**Input:**

```python theme={null}
{
    "file_path": str,  # The absolute path to the file to modify
    "old_string": str,  # The text to replace
    "new_string": str,  # The text to replace it with
    "replace_all": bool | None,  # Replace all occurrences (default False)
}
```

**Output:**

```python theme={null}
{
    "message": str,  # Confirmation message
    "replacements": int,  # Number of replacements made
    "file_path": str,  # File path that was edited
}
```

### Read

**Tool name:** `Read`

**Input:**

```python theme={null}
{
    "file_path": str,  # The absolute path to the file to read
    "offset": int | None,  # The line number to start reading from
    "limit": int | None,  # The number of lines to read
}
```

**Output (Text files):**

```python theme={null}
{
    "content": str,  # File contents with line numbers
    "total_lines": int,  # Total number of lines in file
    "lines_returned": int,  # Lines actually returned
}
```

**Output (Images):**

```python theme={null}
{
    "image": str,  # Base64 encoded image data
    "mime_type": str,  # Image MIME type
    "file_size": int,  # File size in bytes
}
```

### Write

**Tool name:** `Write`

**Input:**

```python theme={null}
{
    "file_path": str,  # The absolute path to the file to write
    "content": str,  # The content to write to the file
}
```

**Output:**

```python theme={null}
{
    "message": str,  # Success message
    "bytes_written": int,  # Number of bytes written
    "file_path": str,  # File path that was written
}
```

### Glob

**Tool name:** `Glob`

**Input:**

```python theme={null}
{
    "pattern": str,  # The glob pattern to match files against
    "path": str | None,  # The directory to search in (defaults to cwd)
}
```

**Output:**

```python theme={null}
{
    "matches": list[str],  # Array of matching file paths
    "count": int,  # Number of matches found
    "search_path": str,  # Search directory used
}
```

### Grep

**Tool name:** `Grep`

**Input:**

```python theme={null}
{
    "pattern": str,  # The regular expression pattern
    "path": str | None,  # File or directory to search in
    "glob": str | None,  # Glob pattern to filter files
    "type": str | None,  # File type to search
    "output_mode": str | None,  # "content", "files_with_matches", or "count"
    "-i": bool | None,  # Case insensitive search
    "-n": bool | None,  # Show line numbers
    "-B": int | None,  # Lines to show before each match
    "-A": int | None,  # Lines to show after each match
    "-C": int | None,  # Lines to show before and after
    "head_limit": int | None,  # Limit output to first N lines/entries
    "multiline": bool | None,  # Enable multiline mode
}
```

**Output (content mode):**

```python theme={null}
{
    "matches": [
        {
            "file": str,
            "line_number": int | None,
            "line": str,
            "before_context": list[str] | None,
            "after_context": list[str] | None,
        }
    ],
    "total_matches": int,
}
```

**Output (files\_with\_matches mode):**

```python theme={null}
{
    "files": list[str],  # Files containing matches
    "count": int,  # Number of files with matches
}
```

### NotebookEdit

**Tool name:** `NotebookEdit`

**Input:**

```python theme={null}
{
    "notebook_path": str,  # Absolute path to the Jupyter notebook
    "cell_id": str | None,  # The ID of the cell to edit
    "new_source": str,  # The new source for the cell
    "cell_type": "code" | "markdown" | None,  # The type of the cell
    "edit_mode": "replace" | "insert" | "delete" | None,  # Edit operation type
}
```

**Output:**

```python theme={null}
{
    "message": str,  # Success message
    "edit_type": "replaced" | "inserted" | "deleted",  # Type of edit performed
    "cell_id": str | None,  # Cell ID that was affected
    "total_cells": int,  # Total cells in notebook after edit
}
```

### WebFetch

**Tool name:** `WebFetch`

**Input:**

```python theme={null}
{
    "url": str,  # The URL to fetch content from
    "prompt": str,  # The prompt to run on the fetched content
}
```

**Output:**

```python theme={null}
{
    "bytes": int,  # Size of the fetched content in bytes
    "code": int,  # HTTP response code
    "codeText": str,  # HTTP response code text
    "result": str,  # Processed result from applying the prompt to the content
    "durationMs": int,  # Time to fetch and process the content, in milliseconds
    "url": str,  # URL that was fetched
}
```

### WebSearch

**Tool name:** `WebSearch`

**Input:**

```python theme={null}
{
    "query": str,  # The search query to use
    "allowed_domains": list[str] | None,  # Only include results from these domains
    "blocked_domains": list[str] | None,  # Never include results from these domains
}
```

**Output:**

```python theme={null}
{
    "query": str,  # The search query
    "results": list[str | {"tool_use_id": str, "content": list[{"title": str, "url": str}]}],
    "durationSeconds": float,  # Search duration in seconds
}
```

### TodoWrite

**Tool name:** `TodoWrite`

  The following tools are available by default only on Claude 3.x models, Opus 4 through 4.7, Sonnet 4 through 4.6, and Haiku 4.5. On every other model, including model IDs Claude Code doesn't recognize, they aren't available unless you opt in:

  * `TodoWrite`
  * `TaskCreate`
  * `TaskGet`
  * `TaskUpdate`
  * `TaskList`

  Wherever the tools are available, Claude Code provides the four Task tools, or `TodoWrite` instead when you set `CLAUDE_CODE_ENABLE_TASKS=0`.

  This default set applies in Claude Code v2.1.268 and later, which the TypeScript Agent SDK bundles from v0.3.268.

  See [Model availability](https://code.claude.com/docs/en/agent-sdk/todo-tracking#model-availability) to opt in.

**Input:**

```python theme={null}
{
    "todos": [
        {
            "content": str,  # The task description
            "status": "pending" | "in_progress" | "completed",  # Task status
            "activeForm": str,  # Active form of the description
        }
    ]
}
```

**Output:**

```python theme={null}
{
    "message": str,  # Success message
    "stats": {"total": int, "pending": int, "in_progress": int, "completed": int},
}
```

### TaskCreate

**Tool name:** `TaskCreate`

**Input:**

```python theme={null}
{
    "subject": str,  # Short task title
    "description": str,  # Detailed task body
    "activeForm": str | None,  # Present-tense label shown while in progress
    "metadata": dict | None,  # Arbitrary caller metadata
}
```

**Output:**

```python theme={null}
{
    "task": {"id": str, "subject": str},  # Created task with assigned ID
}
```

### TaskUpdate

**Tool name:** `TaskUpdate`

**Input:**

```python theme={null}
{
    "taskId": str,  # ID of the task to patch
    "status": Literal["pending", "in_progress", "completed", "deleted"] | None,
    "subject": str | None,
    "description": str | None,
    "activeForm": str | None,
    "addBlocks": list[str] | None,  # Task IDs this task now blocks
    "addBlockedBy": list[str] | None,  # Task IDs that now block this task
    "owner": str | None,
    "metadata": dict | None,
}
```

**Output:**

```python theme={null}
{
    "success": bool,
    "taskId": str,
    "updatedFields": list[str],  # Names of fields that changed
    "error": str | None,
    "statusChange": {"from": str, "to": str} | None,
}
```

### TaskGet

**Tool name:** `TaskGet`

**Input:**

```python theme={null}
{
    "taskId": str,  # ID of the task to read
}
```

**Output:**

```python theme={null}
{
    "task": {
        "id": str,
        "subject": str,
        "description": str,
        "status": Literal["pending", "in_progress", "completed"],
        "blocks": list[str],
        "blockedBy": list[str],
    } | None,  # None when the ID is not found
}
```

### TaskList

**Tool name:** `TaskList`

**Input:**

```python theme={null}
{}
```

**Output:**

```python theme={null}
{
    "tasks": [
        {
            "id": str,
            "subject": str,
            "status": Literal["pending", "in_progress", "completed"],
            "owner": str | None,
            "blockedBy": list[str],
        }
    ],
}
```

### TaskOutput

**Tool name:** `TaskOutput`. The previous name `BashOutput` is still accepted as an alias.

&lt;Note>`TaskOutput` is deprecated; prefer `Read` on the task's output file path. The schemas below remain valid for hooks and permission handlers that encounter the tool.&lt;/Note>

**Input:**

```python theme={null}
{
    "task_id": str,  # The task ID to get output from
    "block": bool,  # Whether to wait for completion (default True)
    "timeout": int,  # Max wait time in ms (default 30000)
}
```

**Output:**

```python theme={null}
{
    "retrieval_status": "success" | "timeout" | "not_ready",  # Whether the output was retrieved
    "task": dict | None,  # Task details: task_id, task_type, status, description, output, plus type-specific fields such as exitCode
}
```

### TaskStop

**Tool name:** `TaskStop`. The previous names `KillShell` and `KillBash` are still accepted as aliases.

**Input:**

```python theme={null}
{
    "task_id": str | None,  # The ID of the background task to stop
    "shell_id": str | None,  # Deprecated: use task_id instead
}
```

**Output:**

```python theme={null}
{
    "message": str,  # Status message about the operation
    "task_id": str,  # The ID of the task that was stopped
    "task_type": str,  # The type of the task that was stopped
    "command": str | None,  # The command or description of the stopped task
}
```

### ExitPlanMode

**Tool name:** `ExitPlanMode`

**Input:**

```python theme={null}
{
    "plan": str  # The plan to run by the user for approval
}
```

**Output:**

```python theme={null}
{
    "message": str,  # Confirmation message
    "approved": bool | None,  # Whether user approved the plan
}
```

### ListMcpResources

**Tool name:** `ListMcpResourcesTool`

**Input:**

```python theme={null}
{
    "server": str | None  # Optional server name to filter resources by
}
```

**Output:**

```python theme={null}
{
    "resources": [
        {
            "uri": str,
            "name": str,
            "description": str | None,
            "mimeType": str | None,
            "server": str,
        }
    ],
    "total": int,
}
```

### ReadMcpResource

**Tool name:** `ReadMcpResourceTool`

**Input:**

```python theme={null}
{
    "server": str,  # The MCP server name
    "uri": str,  # The resource URI to read
}
```

**Output:**

```python theme={null}
{
    "contents": [
        {"uri": str, "mimeType": str | None, "text": str | None, "blob": str | None}
    ],
    "server": str,
}
```
