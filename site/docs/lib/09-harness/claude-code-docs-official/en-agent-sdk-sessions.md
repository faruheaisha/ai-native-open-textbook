---
title: "Work with sessions"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-sdk/sessions.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/sessions.md"
sourceSha256: "f0bc3b89f2dacc9c9d45bcd3d35333744eca350e0dd5e190b1eea4772cc3c088"
pageSha256: "f0bc3b89f2dacc9c9d45bcd3d35333744eca350e0dd5e190b1eea4772cc3c088"
contentMode: "local-full"
zh: ""
---

# Work with sessions

> How sessions persist agent conversation history, and when to use continue, resume, and fork to return to a prior run.

A session is the conversation history the SDK accumulates while your agent works. It contains your prompt, every tool call the agent made, every tool result, and every response. The SDK writes it to disk automatically so you can return to it later.

Returning to a session means the agent has full context from before: files it already read, analysis it already performed, decisions it already made. You can ask a follow-up question, recover from an interruption, or branch off to try a different approach.

  Sessions persist the **conversation**, not the filesystem. To snapshot and revert file changes the agent made, use [file checkpointing](https://code.claude.com/docs/en/agent-sdk/file-checkpointing).

This guide covers how to pick the right approach for your app, the SDK interfaces that track sessions automatically, how to capture session IDs and use `resume` and `fork` manually, and what to know about resuming sessions across hosts.

## Choose an approach

How much session handling you need depends on your application's shape. Session management comes into play when you send multiple prompts that should share context. Within a single `query()` call, the agent already takes as many turns as it needs, and permission prompts and `AskUserQuestion` are [handled in-loop](https://code.claude.com/docs/en/agent-sdk/user-input) (they don't end the call).

| What you're building                                    | What to use                                                                                                                                                                                                                                                                    |
| :------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One-shot task: single prompt, no follow-up              | Nothing extra. One `query()` call handles it.                                                                                                                                                                                                                                  |
| Multi-turn chat in one process                          | [`ClaudeSDKClient` (Python) or `continue: true` (TypeScript)](#automatic-session-management). The SDK tracks the session for you with no ID handling.                                                                                                                          |
| Pick up where you left off after a process restart      | `continue_conversation=True` (Python) / `continue: true` (TypeScript). Resumes the most recent session in the directory, no ID needed.                                                                                                                                         |
| Resume a specific past session (not the most recent)    | Capture the session ID and pass it to `resume`.                                                                                                                                                                                                                                |
| Try an alternative approach without losing the original | Fork the session.                                                                                                                                                                                                                                                              |
| Stateless task, don't want anything written to disk     | Set [`persistSession: false`](https://code.claude.com/docs/en/agent-sdk/typescript#options) (TypeScript only). The session exists only in memory for the duration of the call. In Python, set [`CLAUDE_CODE_SKIP_PROMPT_HISTORY`](https://code.claude.com/docs/en/env-vars) in the `env` option to suppress transcript writes instead. |

### Continue, resume, and fork

Continue, resume, and fork are option fields you set on `query()` ([`ClaudeAgentOptions`](https://code.claude.com/docs/en/agent-sdk/python#claudeagentoptions) in Python, [`Options`](https://code.claude.com/docs/en/agent-sdk/typescript#options) in TypeScript).

**Continue** and **resume** both pick up an existing session and add to it. The difference is how they find that session:

* **Continue** finds the most recent session in the current directory. You don't track anything. Works well when your app runs one conversation at a time.
* **Resume** takes a specific session ID. You track the ID. Required when you have multiple sessions (for example, one per user in a multi-user app) or want to return to one that isn't the most recent.

**Fork** is different: it creates a new session that starts with a copy of the original's history. The original stays unchanged. Use fork to try a different direction while keeping the option to go back.

## Automatic session management

Both SDKs offer an interface that tracks session state for you across calls, so you don't pass IDs around manually. Use these for multi-turn conversations within a single process.

### Python: `ClaudeSDKClient`

[`ClaudeSDKClient`](https://code.claude.com/docs/en/agent-sdk/python#claudesdkclient) handles session IDs internally. Each call to `client.query()` automatically continues the same session. Call [`client.receive_response()`](https://code.claude.com/docs/en/agent-sdk/python#claudesdkclient) to iterate over the messages for the current query. Use the client as an async context manager so connection setup and teardown are handled for you, or call `connect()` and `disconnect()` manually.

This example runs two queries against the same `client`. The first asks the agent to analyze a module; the second asks it to refactor that module. Because both calls go through the same client instance, the second query has full context from the first without any explicit `resume` or session ID:

```python Python theme={null}
import asyncio
from claude_agent_sdk import (
    ClaudeSDKClient,
    ClaudeAgentOptions,
    AssistantMessage,
    ResultMessage,
    TextBlock,
)

def print_response(message):
    """Print only the human-readable parts of a message."""
    if isinstance(message, AssistantMessage):
        for block in message.content:
            if isinstance(block, TextBlock):
                print(block.text)
    elif isinstance(message, ResultMessage):
        cost = (
            f"${message.total_cost_usd:.4f}"
            if message.total_cost_usd is not None
            else "N/A"
        )
        print(f"[done: {message.subtype}, cost: {cost}]")

async def main():
    options = ClaudeAgentOptions(
        allowed_tools=["Read", "Edit", "Glob", "Grep"],
    )

    async with ClaudeSDKClient(options=options) as client:
        # First query: client captures the session ID internally
        await client.query("Analyze the auth module")
        async for message in client.receive_response():
            print_response(message)

        # Second query: automatically continues the same session
        await client.query("Now refactor it to use JWT")
        async for message in client.receive_response():
            print_response(message)

asyncio.run(main())
```

Each query prints the agent's text response followed by a status line from the result message, such as `[done: success, cost: $0.0042]`.

See the [Python SDK reference](https://code.claude.com/docs/en/agent-sdk/python#choosing-between-query-and-claudesdkclient) for details on when to use `ClaudeSDKClient` vs the standalone `query()` function.

### TypeScript: `continue: true`

The TypeScript SDK doesn't have a session-holding client object like Python's `ClaudeSDKClient`. Instead, pass `continue: true` on each subsequent `query()` call and the SDK picks up the most recent session in the current directory. No ID tracking required.

This example makes two separate `query()` calls. The first creates a fresh session; the second sets `continue: true`, which tells the SDK to find and resume the most recent session on disk. The agent has full context from the first call:

```typescript TypeScript theme={null}
import { query } from "@anthropic-ai/claude-agent-sdk";

// First query: creates a new session
try {
  for await (const message of query({
    prompt: "Analyze the auth module",
    options: { allowedTools: ["Read", "Glob", "Grep"] }
  })) {
    if (message.type === "result" && message.subtype === "success") {
      console.log(message.result);
    }
  }
} catch (error) {
  // A single-shot query() throws after yielding an error result,
  // so the follow-up query below still runs.
  console.error(`Session ended with an error: ${error}`);
}

// Second query: continue: true resumes the most recent session
for await (const message of query({
  prompt: "Now refactor it to use JWT",
  options: {
    continue: true,
    allowedTools: ["Read", "Edit", "Write", "Glob", "Grep"]
  }
})) {
  if (message.type === "result" && message.subtype === "success") {
    console.log(message.result);
  }
}
```

  The experimental [V2 session API](https://code.claude.com/docs/en/agent-sdk/typescript-v2-preview), which provided `createSession()` with a `send` / `stream` pattern, was removed in TypeScript Agent SDK 0.3.142. Use the `query()` function and the session options described on this page instead.

## Use session options with `query()`

### Capture the session ID

Resume and fork require a session ID. Read it from the `session_id` field on the result message ([`ResultMessage`](https://code.claude.com/docs/en/agent-sdk/python#resultmessage) in Python, [`SDKResultMessage`](https://code.claude.com/docs/en/agent-sdk/typescript#sdkresultmessage) in TypeScript), which is present on every result regardless of success or error. In TypeScript the ID is also available earlier as a direct field on the init `SystemMessage`; in Python it's nested inside `SystemMessage.data`.

  ```python Python theme={null}
  import asyncio
  from claude_agent_sdk import query, ClaudeAgentOptions, ResultMessage

  async def main():
      session_id = None

      try:
          async for message in query(
              prompt="Analyze the auth module and suggest improvements",
              options=ClaudeAgentOptions(
                  allowed_tools=["Read", "Glob", "Grep"],
              ),
          ):
              if isinstance(message, ResultMessage):
                  session_id = message.session_id
                  if message.subtype == "success":
                      print(message.result)
      except Exception as error:
          # A single-shot query() raises after yielding an error result. If the
          # failure was an error result, the loop above already captured session_id;
          # connection or process failures yield no result message, so session_id stays None.
          print(f"Session ended with an error: {error}")

      print(f"Session ID: {session_id}")
      return session_id

  session_id = asyncio.run(main())
  ```

  ```typescript TypeScript theme={null}
  import { query } from "@anthropic-ai/claude-agent-sdk";

  let sessionId: string | undefined;

  try {
    for await (const message of query({
      prompt: "Analyze the auth module and suggest improvements",
      options: { allowedTools: ["Read", "Glob", "Grep"] }
    })) {
      if (message.type === "result") {
        sessionId = message.session_id;
        if (message.subtype === "success") {
          console.log(message.result);
        }
      }
    }
  } catch (error) {
    // A single-shot query() throws after yielding an error result. If the
    // failure was an error result, the loop above already captured sessionId;
    // connection or process failures yield no result message, so sessionId stays undefined.
    console.error(`Session ended with an error: ${error}`);
  }

  console.log(`Session ID: ${sessionId}`);
  ```

When the query completes, the script prints the agent's response followed by a line such as `Session ID: 5b3f2c1a-8d4e-4f6b-9a7c-2e1d0f9b8a6c`. In the next sections, you pass this ID to `resume`.

### Resume by ID

Pass a session ID to `resume` to return to that specific session. The agent picks up with full context from wherever the session left off. Common reasons to resume:

* **Follow up on a completed task.** The agent already analyzed something; now you want it to act on that analysis without re-reading files.
* **Recover from a limit.** The first run ended with `error_max_turns` or `error_max_budget_usd` (see [Handle the result](https://code.claude.com/docs/en/agent-sdk/agent-loop#handle-the-result)); resume with a higher limit. In a single-shot `query()` call the SDK raises after yielding that error result, so catch the error before resuming.
* **Restart your process.** You captured the ID before shutdown and want to restore the conversation.

This example resumes the session from [Capture the session ID](#capture-the-session-id) with a follow-up prompt. Because you're resuming, the agent already has the prior analysis in context:

  ```python Python theme={null}
  import asyncio
  from claude_agent_sdk import query, ClaudeAgentOptions, ResultMessage

  session_id = "..."  # The ID you captured in the previous example

  async def main():
      # Earlier session analyzed the code; now build on that analysis
      async for message in query(
          prompt="Now implement the refactoring you suggested",
          options=ClaudeAgentOptions(
              resume=session_id,
              allowed_tools=["Read", "Edit", "Write", "Glob", "Grep"],
          ),
      ):
          if isinstance(message, ResultMessage) and message.subtype == "success":
              print(message.result)

  asyncio.run(main())
  ```

  ```typescript TypeScript theme={null}
  import { query } from "@anthropic-ai/claude-agent-sdk";

  const sessionId = "..."; // The ID you captured in the previous example

  // Earlier session analyzed the code; now build on that analysis
  for await (const message of query({
    prompt: "Now implement the refactoring you suggested",
    options: {
      resume: sessionId,
      allowedTools: ["Read", "Edit", "Write", "Glob", "Grep"]
    }
  })) {
    if (message.type === "result" && message.subtype === "success") {
      console.log(message.result);
    }
  }
  ```

You should see a response that builds on the earlier analysis instead of starting fresh. That confirms the agent resumed the session with its prior context intact.
