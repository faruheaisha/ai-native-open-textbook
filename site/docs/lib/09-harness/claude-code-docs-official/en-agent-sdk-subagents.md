---
title: "Subagents in the SDK"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-sdk/subagents.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/subagents.md"
sourceSha256: "279ffda8a50c4a30333720c7939cef049cf64ea4876e07260d5ddd8e58cd1ed7"
pageSha256: "279ffda8a50c4a30333720c7939cef049cf64ea4876e07260d5ddd8e58cd1ed7"
contentMode: "local-full"
zh: ""
---

# Subagents in the SDK

> Define and invoke subagents to isolate context, run tasks in parallel, and apply specialized instructions in your Claude Agent SDK applications.

Subagents are separate agent instances that your main agent can spawn to handle focused subtasks.
Use them to isolate context, run multiple analyses in parallel, and apply specialized instructions without adding to the main agent's prompt.

## Overview

You can create subagents in three ways:

* **Programmatically**: use the `agents` parameter in your `query()` options. See the [TypeScript](https://code.claude.com/docs/en/agent-sdk/typescript#agentdefinition) and [Python](https://code.claude.com/docs/en/agent-sdk/python#agentdefinition) references
* **Filesystem-based**: define agents as markdown files in `.claude/agents/` directories. See [defining subagents as files](https://code.claude.com/docs/en/sub-agents)
* **Built-in general-purpose**: Claude can invoke the built-in `general-purpose` subagent at any time via the Agent tool without you defining anything

This guide focuses on the programmatic approach, which is recommended for SDK applications.

## Benefits of using subagents

Because subagents are separate agent instances, delegating work to them gives you four benefits:

* **Context isolation**: each subagent runs in its own conversation, which starts fresh unless the subagent is a [fork](https://code.claude.com/docs/en/sub-agents#fork-the-current-conversation). Either way, intermediate tool calls and results stay inside the subagent; only its final message returns to the parent. A `research-assistant` subagent can explore dozens of files without any of that content accumulating in the main conversation. The parent receives a concise summary, not every file the subagent read. See [What subagents inherit](#what-subagents-inherit) for exactly what's in the subagent's context.
* **Parallelization**: multiple subagents can run concurrently, so independent subtasks finish in the time of the slowest one rather than the sum of all of them. During a code review, you can run `style-checker`, `security-scanner`, and `test-coverage` subagents simultaneously instead of sequentially.
* **Specialized instructions and knowledge**: each subagent can have a tailored system prompt with specific expertise, best practices, and constraints. A `database-migration` subagent can have detailed knowledge about SQL best practices, rollback strategies, and data integrity checks that would be unnecessary noise in the main agent's instructions.
* **Tool restrictions**: subagents can be limited to specific tools, reducing the risk of unintended actions. A `doc-reviewer` subagent might only have access to Read and Grep tools, ensuring it can analyze but never accidentally modify your documentation files.

## Create subagents

### Programmatic definition (recommended)

Define subagents directly in your code using the `agents` parameter. Claude invokes subagents through the `Agent` tool.

Most examples on this page print only the final result. To confirm that Claude delegated to a subagent rather than answering directly, see [Detect subagent invocation](#detect-subagent-invocation).

This example creates two subagents: a code reviewer with read-only access and a test runner that can execute commands.

  ```python Python theme={null}
  import asyncio
  from claude_agent_sdk import query, ClaudeAgentOptions, AgentDefinition

  async def main():
      async for message in query(
          prompt="Review the authentication module for security issues",
          options=ClaudeAgentOptions(
              # Auto-approve these tools
              allowed_tools=["Read", "Grep", "Glob", "Agent"],
              agents={
                  "code-reviewer": AgentDefinition(
                      # description tells Claude when to use this subagent
                      description="Expert code review specialist. Use for quality, security, and maintainability reviews.",
                      # prompt defines the subagent's behavior and expertise
                      prompt="""You are a code review specialist with expertise in security, performance, and best practices.

  When reviewing code:
  - Identify security vulnerabilities
  - Check for performance issues
  - Verify adherence to coding standards
  - Suggest specific improvements

  Be thorough but concise in your feedback.""",
                      # tools restricts what the subagent can do (read-only here)
                      tools=["Read", "Grep", "Glob"],
                      # model overrides the default model for this subagent
                      model="sonnet",
                  ),
                  "test-runner": AgentDefinition(
                      description="Runs and analyzes test suites. Use for test execution and coverage analysis.",
                      prompt="""You are a test execution specialist. Run tests and provide clear analysis of results.

  Focus on:
  - Running test commands
  - Analyzing test output
  - Identifying failing tests
  - Suggesting fixes for failures""",
                      # Bash access lets this subagent run test commands
                      tools=["Bash", "Read", "Grep"],
                  ),
              },
          ),
      ):
          if hasattr(message, "result"):
              print(message.result)

  asyncio.run(main())
  ```

  ```typescript TypeScript theme={null}
  import { query } from "@anthropic-ai/claude-agent-sdk";

  for await (const message of query({
    prompt: "Review the authentication module for security issues",
    options: {
      // Auto-approve these tools
      allowedTools: ["Read", "Grep", "Glob", "Agent"],
      agents: {
        "code-reviewer": {
          // description tells Claude when to use this subagent
          description:
            "Expert code review specialist. Use for quality, security, and maintainability reviews.",
          // prompt defines the subagent's behavior and expertise
          prompt: `You are a code review specialist with expertise in security, performance, and best practices.

  When reviewing code:
  - Identify security vulnerabilities
  - Check for performance issues
  - Verify adherence to coding standards
  - Suggest specific improvements

  Be thorough but concise in your feedback.`,
          // tools restricts what the subagent can do (read-only here)
          tools: ["Read", "Grep", "Glob"],
          // model overrides the default model for this subagent
          model: "sonnet"
        },
        "test-runner": {
          description:
            "Runs and analyzes test suites. Use for test execution and coverage analysis.",
          prompt: `You are a test execution specialist. Run tests and provide clear analysis of results.

  Focus on:
  - Running test commands
  - Analyzing test output
  - Identifying failing tests
  - Suggesting fixes for failures`,
          // Bash access lets this subagent run test commands
          tools: ["Bash", "Read", "Grep"]
        }
      }
    }
  })) {
    if ("result" in message) console.log(message.result);
  }
  ```

### AgentDefinition configuration

| Field             | Type                                                        | Required | Description                                                                                                                                                                                                                                                                      |
| :---------------- | :---------------------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `description`     | `string`                                                    | Yes      | Natural language description of when to use this agent                                                                                                                                                                                                                           |
| `prompt`          | `string`                                                    | Yes      | The agent's system prompt defining its role and behavior                                                                                                                                                                                                                         |
| `tools`           | `string[]`                                                  | No       | Array of allowed tool names. If omitted, inherits every [tool available to subagents](https://code.claude.com/docs/en/sub-agents#available-tools)                                                                                                                                                            |
| `disallowedTools` | `string[]`                                                  | No       | Array of tool names to remove from the agent's tool set. MCP server-level patterns are also accepted: `mcp__server` or `mcp__server__*` removes every tool from that server, and `mcp__*` removes every MCP tool from any server                                                 |
| `model`           | `string`                                                    | No       | Model override for this agent. Accepts an alias such as `'fable'`, `'opus'`, `'sonnet'`, `'haiku'`, `'inherit'`, or a full model ID. `'inherit'` uses the main model. When you omit it, Claude Code picks the model in the [subagent model order](https://code.claude.com/docs/en/sub-agents#choose-a-model) |
| `skills`          | `string[]`                                                  | No       | List of skill names to preload into the agent's context at startup. Unlisted skills remain invocable through the Skill tool                                                                                                                                                      |
| `memory`          | `'user' \| 'project' \| 'local'`                            | No       | Memory source for this agent                                                                                                                                                                                                                                                     |
| `mcpServers`      | `(string \| object)[]`                                      | No       | MCP servers available to this agent, by name or inline config                                                                                                                                                                                                                    |
| `initialPrompt`   | `string`                                                    | No       | Auto-submitted as the first user turn when this agent runs as the main thread agent. Ignored when the agent is invoked as a subagent                                                                                                                                             |
| `maxTurns`        | `number`                                                    | No       | Maximum number of agentic turns before the agent stops. When the agent reaches the limit, Claude Code returns its output marked as partial, and you can [resume the agent](#resume-subagents) to continue. The partial marking requires Claude Code v2.1.246 or later            |
| `background`      | `boolean`                                                   | No       | Run this agent as a non-blocking background task when invoked                                                                                                                                                                                                                    |
| `effort`          | `'low' \| 'medium' \| 'high' \| 'xhigh' \| 'max' \| number` | No       | Reasoning effort level for this agent                                                                                                                                                                                                                                            |
| `permissionMode`  | `PermissionMode`                                            | No       | Permission mode for tool execution within this agent. The [subagent inheritance rules](https://code.claude.com/docs/en/agent-sdk/permissions#available-modes) decide when it applies                                                                                                                         |

In the Python SDK, multi-word field names such as `disallowedTools` and `mcpServers` keep their camelCase spelling to match the wire format rather than following Python's snake\_case convention. See the [`AgentDefinition` reference](https://code.claude.com/docs/en/agent-sdk/python#agentdefinition) for details.

Subagents run in the background by default. An Agent tool call that omits the [`run_in_background`](https://code.claude.com/docs/en/sub-agents#run-subagents-in-foreground-or-background) input launches a background subagent, and Claude sets `run_in_background: false` when it needs the result before continuing. Set the `background` field to `true` to force background execution for a specific agent regardless of what Claude requests. Before Claude Code v2.1.198, the background default was rolling out gradually, and an Agent tool call that omitted `run_in_background` could run the subagent synchronously.

Subagents can also spawn subagents of their own. To limit how deep that nesting goes, how many subagents run at once, and how much a query spends, see [Cap subagent depth, concurrency, and spend](#cap-subagent-depth-concurrency-and-spend).

### Filesystem-based definition (alternative)

You can also define subagents as markdown files in `.claude/agents/` directories. See the [Claude Code subagents documentation](https://code.claude.com/docs/en/sub-agents) for details on this approach. Programmatically defined agents take precedence over filesystem-based agents with the same name.

  When Claude calls the Agent tool without a `subagent_type`, it gets the built-in `general-purpose` subagent, which Claude can spawn even when you define no agents of your own. Setting [`CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS=1`](https://code.claude.com/docs/en/env-vars) removes that default, and such a call fails with [`subagent_type is required`](https://code.claude.com/docs/en/errors#subagent-type-is-required).

## What subagents inherit

Unless the subagent is a [fork](https://code.claude.com/docs/en/sub-agents#fork-the-current-conversation), its context window starts fresh, with no parent conversation, but isn't empty. The only content you pass from parent to subagent is the Agent tool's prompt string, so include any file paths, error messages, or decisions the subagent needs directly in that prompt.

A subagent that has the [`SendMessage`](https://code.claude.com/docs/en/tools-reference) tool starts with a list of the other named agents running in the session, so it knows which names it can send messages to. Claude Code adds the list to the subagent's first turn automatically. A [fork](https://code.claude.com/docs/en/sub-agents#fork-the-current-conversation) doesn't get the list because it inherits the parent conversation instead.

A subagent also inherits the main session's extended thinking configuration.

The table below lists what a non-fork subagent's context contains and what it leaves out.

| The subagent receives                                                                                                                 | The subagent doesn't receive                                       |
| :------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------- |
| Its own system prompt (`AgentDefinition.prompt`) and the Agent tool's prompt                                                          | The parent's conversation history or tool results                  |
| Project CLAUDE.md (loaded via [`settingSources`](https://code.claude.com/docs/en/agent-sdk/claude-code-features#control-filesystem-settings-with-settingsources)) | Preloaded skill content, unless listed in `AgentDefinition.skills` |
| Tool definitions (inherited from parent or the subset in `tools`, [filtered for background runs](https://code.claude.com/docs/en/sub-agents#available-tools))     | The parent's system prompt                                         |

  The parent receives the subagent's final message as the Agent tool result, but may summarize it in its own response. To preserve subagent output verbatim in the user-facing response, include an instruction to do so in the prompt or `systemPrompt` option you pass to the main `query()` call.

  In v2.1.210 and later, Claude Code [scans the final message for instruction-shaped patterns](https://code.claude.com/docs/en/sub-agents#subagent-output-scanning) before the parent reads it. The scan treats three kinds of pattern differently:
