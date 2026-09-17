---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md"
sourceSha256: "f98aa130a7974b2edf98f8c3babe806ab140d5cdd3933a506f5211335b431c5f"
pageSha256: "56af9d0fa558357b6ffc6566825c88ae22d6d64e1dfcb2a65e701a768e9faa16"
contentMode: "local-full"
zh: ""
---

## Tool use

### Tool usage

Claude's latest models are trained for precise instruction following and benefit from explicit direction to use specific tools. If you say "can you suggest some changes," Claude will sometimes provide suggestions rather than implementing them, even if making changes might be what you intended. To learn how to define tools and troubleshoot tool triggering, see [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview).

For Claude to take action, be more explicit:

  **Less effective (Claude will only suggest):**

  ```text wrap
  Can you suggest some changes to improve this function?
  ```

  **More effective (Claude will make the changes):**

  ```text wrap
  Change this function to improve its performance.
  ```

  Or:

  ```text wrap
  Make these edits to the authentication flow.
  ```

To make Claude more proactive about taking action by default, you can add this to your system prompt:

```text Sample prompt for proactive action wrap
<default_to_action>
By default, implement changes rather than only suggesting them. If the user's intent is
unclear, infer the most useful likely action and proceed, using tools to discover any
missing details instead of guessing. Try to infer the user's intent about whether a tool
call (e.g., file edit or read) is intended or not, and act accordingly.
</default_to_action>
```

On the other hand, if you want the model to be more hesitant by default, less prone to jumping straight into implementations, and only take action if requested, you can steer this behavior with a prompt like the following:

```text Sample prompt for conservative action wrap
<do_not_act_before_instructions>
Do not jump into implementation or change files unless clearly instructed to make
changes. When the user's intent is ambiguous, default to providing information, doing
research, and providing recommendations rather than taking action. Only proceed with
edits, modifications, or implementations when the user explicitly requests them.
</do_not_act_before_instructions>
```

Claude Opus 4.5 and Claude Opus 4.6 are also more responsive to the system prompt than previous models. If your prompts were designed to reduce undertriggering on tools or skills, these models may now overtrigger. The fix is to dial back any aggressive language. Where you might have said "CRITICAL: You MUST use this tool when...", you can use more normal prompting like "Use this tool when...".

### Optimize parallel tool calling

Claude's latest models run independent tool calls in parallel. These models will:

* Run multiple speculative searches during research
* Read several files at once to build context faster
* Run bash commands in parallel (which can even bottleneck system performance)

This behavior is steerable. While the model has a high success rate in parallel tool calling without prompting, you can boost this to \~100% or adjust the aggression level:

```text Sample prompt for maximum parallel efficiency wrap
<use_parallel_tool_calls>
If you intend to call multiple tools and there are no dependencies between the tool
calls, make all of the independent tool calls in parallel. Prioritize calling tools
simultaneously whenever the actions can be done in parallel rather than sequentially.
For example, when reading 3 files, run 3 tool calls in parallel to read all 3 files into
context at the same time. Maximize use of parallel tool calls where possible to increase
speed and efficiency. However, if some tool calls depend on previous calls to inform
dependent values like the parameters, do NOT call these tools in parallel and instead
call them sequentially. Never use placeholders or guess missing parameters in tool
calls.
</use_parallel_tool_calls>
```

```text Sample prompt to reduce parallel execution wrap
Execute operations sequentially with brief pauses between each step to ensure stability.
```

On Claude Fable 5.1 in long agent loops, send the parallel-calls instruction as a turn-scoped system message after each round of tool results. See [Batch independent tool calls in agent loops](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1#batch-independent-tool-calls-in-agent-loops).
