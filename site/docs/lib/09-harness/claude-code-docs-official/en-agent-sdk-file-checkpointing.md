---
title: "Rewind file changes with checkpointing"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-sdk/file-checkpointing.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/file-checkpointing.md"
sourceSha256: "550722eaa3163a65a19b80883583a8abcca552474da36edb8533932be3f77716"
pageSha256: "550722eaa3163a65a19b80883583a8abcca552474da36edb8533932be3f77716"
contentMode: "local-full"
zh: ""
---

# Rewind file changes with checkpointing

> Track file changes during agent sessions and restore files to any previous state

File checkpointing tracks file modifications made through the Write, Edit, and NotebookEdit tools during an agent session, allowing you to rewind files to any previous state. Want to try it out? Jump to the [interactive example](#try-it-out).

With checkpointing, you can:

* **Undo unwanted changes** by restoring files to a known good state
* **Explore alternatives** by restoring to a checkpoint and trying a different approach
* **Recover from errors** when the agent makes incorrect modifications

  Only changes made through the Write, Edit, and NotebookEdit tools are tracked. Changes made through Bash commands (like `echo > file.txt` or `sed -i`) are not captured by the checkpoint system, and neither are edits a [subagent](https://code.claude.com/docs/en/agent-sdk/subagents) applies, except a [skill with `context: fork`](https://code.claude.com/docs/en/skills#run-skills-in-a-subagent) that runs in the foreground.

## How checkpointing works

When you enable file checkpointing, the SDK creates backups of files before modifying them through the Write, Edit, or NotebookEdit tools. User messages in the response stream include a checkpoint UUID that you can use as a restore point.

  File rewinding restores files on disk to a previous state. It does not rewind the conversation itself. The conversation history and context remain intact after calling `rewindFiles()` (TypeScript) or `rewind_files()` (Python).

When you rewind to a checkpoint, Claude Code deletes the files it created and restores the files it modified to their content at that point. Claude Code skips a tracked path that is a symlink, hard link, or other non-regular file. It also skips a tracked file whose parent directory no longer resolves to its checkpoint-time location, or whose backup it can't read safely. [`RewindFilesResult`](https://code.claude.com/docs/en/agent-sdk/typescript#rewindfilesresult) counts every skipped path in its `skippedLinks` field. Skipping requires Claude Code v2.1.216 or later; before v2.1.216, a rewind wrote and deleted through links at tracked paths.

## Implement checkpointing

To use file checkpointing, enable it in your options, capture checkpoint UUIDs from the response stream, then call `rewindFiles()` (TypeScript) or `rewind_files()` (Python) when you need to restore.

The following example shows the complete flow: enable checkpointing, capture the checkpoint UUID and session ID from the response stream, then resume the session later to rewind files. Each step is explained in detail below. The examples in this section use the prompt "Refactor the authentication module". Run them in a project that contains an authentication module, or change the prompt to name files that exist in your project, so you can watch files change and see the rewind restore them.

  ```python Python theme={null}
  import asyncio
  from claude_agent_sdk import (
      ClaudeSDKClient,
      ClaudeAgentOptions,
      UserMessage,
      ResultMessage,
  )

  async def main():
      # Step 1: Enable checkpointing
      options = ClaudeAgentOptions(
          enable_file_checkpointing=True,
          permission_mode="acceptEdits",  # Auto-accept file edits without prompting
          extra_args={
              "replay-user-messages": None
          },  # Required to receive checkpoint UUIDs in the response stream
      )

      checkpoint_id = None
      session_id = None

      # Run the query and capture checkpoint UUID and session ID
      async with ClaudeSDKClient(options) as client:
          await client.query("Refactor the authentication module")

          # Step 2: Capture checkpoint UUID from the first user message
          async for message in client.receive_response():
              if isinstance(message, UserMessage) and message.uuid and not checkpoint_id:
                  checkpoint_id = message.uuid
              if isinstance(message, ResultMessage) and not session_id:
                  session_id = message.session_id

      # Step 3: Later, rewind by resuming the session with an empty prompt
      if checkpoint_id and session_id:
          async with ClaudeSDKClient(
              ClaudeAgentOptions(enable_file_checkpointing=True, resume=session_id)
          ) as client:
              await client.query("")  # Empty prompt to open the connection
              async for message in client.receive_response():
                  await client.rewind_files(checkpoint_id)
                  break
          print(f"Rewound to checkpoint: {checkpoint_id}")

  asyncio.run(main())
  ```

  ```typescript TypeScript theme={null}
  import { query } from "@anthropic-ai/claude-agent-sdk";

  async function main() {
    // Step 1: Enable checkpointing
    const opts = {
      enableFileCheckpointing: true,
      permissionMode: "acceptEdits" as const, // Auto-accept file edits without prompting
      extraArgs: { "replay-user-messages": null } // Required to receive checkpoint UUIDs in the response stream
    };

    const response = query({
      prompt: "Refactor the authentication module",
      options: opts
    });

    let checkpointId: string | undefined;
    let sessionId: string | undefined;

    // Step 2: Capture checkpoint UUID from the first user message
    try {
      for await (const message of response) {
        if (message.type === "user" && message.uuid && !checkpointId) {
          checkpointId = message.uuid;
        }
        if ("session_id" in message && !sessionId) {
          sessionId = message.session_id;
        }
      }
    } catch (error) {
      // A single-shot query() throws after yielding an error result. If the
      // failure was an error result, sessionId and checkpointId were already
      // captured by the loop above; connection or process failures yield no
      // result message.
      console.error(`Session ended with an error: ${error}`);
    }

    // Step 3: Later, rewind by resuming the session with an empty prompt
    if (checkpointId && sessionId) {
      const rewindQuery = query({
        prompt: "", // Empty prompt to open the connection
        options: { ...opts, resume: sessionId }
      });

      for await (const msg of rewindQuery) {
        await rewindQuery.rewindFiles(checkpointId);
        break;
      }
      console.log(`Rewound to checkpoint: ${checkpointId}`);
    }
  }

  main();
  ```

    Configure your SDK options to enable checkpointing and receive checkpoint UUIDs:

    | Option                   | Python                                      | TypeScript                                    | Description                                      |
    | ------------------------ | ------------------------------------------- | --------------------------------------------- | ------------------------------------------------ |
    | Enable checkpointing     | `enable_file_checkpointing=True`            | `enableFileCheckpointing: true`               | Tracks file changes for rewinding                |
    | Receive checkpoint UUIDs | `extra_args=\{"replay-user-messages": None\}` | `extraArgs: \{ 'replay-user-messages': null \}` | Required to get user message UUIDs in the stream |

      ```python Python theme=\{null\}
      options = ClaudeAgentOptions(
          enable_file_checkpointing=True,
          permission_mode="acceptEdits",
          extra_args=\{"replay-user-messages": None\},
      )

      async with ClaudeSDKClient(options) as client:
          await client.query("Refactor the authentication module")
      ```

      ```typescript TypeScript theme=\{null\}
      const response = query(\{
        prompt: "Refactor the authentication module",
        options: \{
          enableFileCheckpointing: true,
          permissionMode: "acceptEdits" as const,
          extraArgs: \{ "replay-user-messages": null \}
        \}
      \});
      ```

    With the `replay-user-messages` option set (shown above), each user message in the response stream has a UUID that serves as a checkpoint.

    For most use cases, capture the first user message UUID (`message.uuid`); rewinding to it restores the tracked files to their original state. To store multiple checkpoints and rewind to intermediate states, see [Multiple restore points](#multiple-restore-points).

    Capturing the session ID (`message.session_id`) is optional; you only need it if you want to rewind later, after the stream completes. If you're calling `rewindFiles()` immediately while still processing messages (as the example in [Checkpoint before risky operations](#checkpoint-before-risky-operations) does), you can skip capturing the session ID.

      ```python Python theme=\{null\}
      checkpoint_id = None
      session_id = None

      async for message in client.receive_response():
          # Capture the first user message UUID as the checkpoint
          if isinstance(message, UserMessage) and message.uuid and checkpoint_id is None:
              checkpoint_id = message.uuid
          # Capture session ID from the result message
          if isinstance(message, ResultMessage):
              session_id = message.session_id
      ```

      ```typescript TypeScript theme=\{null\}
      let checkpointId: string | undefined;
      let sessionId: string | undefined;

      for await (const message of response) \{
        // Capture the first user message UUID as the checkpoint
        if (message.type === "user" && message.uuid && !checkpointId) \{
          checkpointId = message.uuid;
        \}
        // Capture session ID from any message that has it
        if ("session_id" in message) \{
          sessionId = message.session_id;
        \}
      \}
      ```

    To rewind after the stream completes, resume the session with an empty prompt and call `rewind_files()` (Python) or `rewindFiles()` (TypeScript) with your checkpoint UUID. You can also rewind during the stream; see [Checkpoint before risky operations](#checkpoint-before-risky-operations) for that pattern.

      ```python Python theme=\{null\}
      async with ClaudeSDKClient(
          ClaudeAgentOptions(enable_file_checkpointing=True, resume=session_id)
      ) as client:
          await client.query("")  # Empty prompt to open the connection
          async for message in client.receive_response():
              if checkpoint_id:
                  await client.rewind_files(checkpoint_id)
              break
      ```

      ```typescript TypeScript theme=\{null\}
      const rewindQuery = query(\{
        prompt: "", // Empty prompt to open the connection
        options: \{ ...opts, resume: sessionId \}
      \});

      for await (const msg of rewindQuery) \{
        if (checkpointId) \{
          await rewindQuery.rewindFiles(checkpointId);
        \}
        break;
      \}
      ```

    If you capture the session ID and checkpoint ID, you can also rewind from the CLI. This command requires the `claude` executable, which comes from [installing Claude Code](https://code.claude.com/docs/en/setup) and is not installed by the SDK package. The SDK enables checkpointing for you, but when you run `claude -p` directly you must set the `CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING` environment variable:

    ```bash theme=\{null\}
