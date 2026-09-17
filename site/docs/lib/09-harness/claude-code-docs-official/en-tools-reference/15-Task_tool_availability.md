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
sourceRel: "en/tools-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/tools-reference.md"
sourceSha256: "f928a98a3f2e69421eeadeb064439c827340f4b19a28c7ad920c2a0e60b142f9"
pageSha256: "ff89f66ca473d3bfc9a6768757ec168d8335bf90704d2b2d8162fd8d81a04c0a"
contentMode: "local-full"
zh: ""
---

## Task tool availability

The task-tracking tools, `TaskCreate`, `TaskGet`, `TaskUpdate`, `TaskList`, and `TodoWrite`, are available by default only on Claude 3.x models, Opus 4 through 4.7, Sonnet 4 through 4.6, and Haiku 4.5. Wherever the tools are available, you get the four Task tools, or `TodoWrite` instead when you set [`CLAUDE_CODE_ENABLE_TASKS=0`](https://code.claude.com/docs/en/env-vars).

On every other model, Claude Code leaves the tools out unless you opt in. The same applies to a model ID Claude Code doesn't recognize, such as a custom model name served through an [LLM gateway](https://code.claude.com/docs/en/llm-gateway). On newer models, Claude keeps track of multi-step work without a written checklist, and the tools' definitions and reminders take up context. Without the tools, Claude adds nothing to the [task list](https://code.claude.com/docs/en/interactive-mode#task-list) while it works.

If you'd like to use these tools on a model that doesn't have them by default, do one of the following:

* Export [`CLAUDE_CODE_ENABLE_TODO_TOOLS=1`](https://code.claude.com/docs/en/env-vars) before you start Claude Code, for example `CLAUDE_CODE_ENABLE_TODO_TOOLS=1 claude`. Claude Code then provides the same tools on every model and every provider
* Name one of the tools in [`--allowedTools`](https://code.claude.com/docs/en/cli-reference#cli-flags), for example `claude --allowedTools TaskCreate`
* List the tools in [`--tools`](https://code.claude.com/docs/en/cli-reference#cli-flags), which restricts the session's built-in tools to the ones it names. Include the tools you want alongside the other built-in tools you use
* In the Agent SDK, the [`allowedTools` and `tools` options](https://code.claude.com/docs/en/agent-sdk/todo-tracking#model-availability) work the same way as the two flags

In [background sessions](https://code.claude.com/docs/en/agent-view) and in [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), Claude Code provides the same tools on every model, listed or not.

Claude Code gives a subagent the tools only when your session has them, even when the subagent runs a different model. An in-process [agent team](https://code.claude.com/docs/en/agent-teams) teammate follows your session the same way, while a teammate in its own [split pane](https://code.claude.com/docs/en/agent-teams#choose-a-display-mode) runs as a separate Claude Code process, so its own model decides. Without the Task tools, an agent coordinates with its team through messages instead of the [shared task list](https://code.claude.com/docs/en/agent-teams#assign-and-claim-tasks).

The default set described here applies in Claude Code v2.1.268 and later.
