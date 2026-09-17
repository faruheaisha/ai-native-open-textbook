---
title: "Create custom subagents"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/sub-agents.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/sub-agents.md"
sourceSha256: "73532b0b6accc67223319be1b24adec1e3b41a9d96a580770694ce718437d2bc"
pageSha256: "652a6c966e5bf7bbc4fb161cc5a29056f4000a7de955fb398ad311ba72b5bc4b"
contentMode: "local-full"
zh: ""
---

# Create custom subagents

> Create and use specialized AI subagents in Claude Code for task-specific workflows and improved context management.

Subagents are specialized AI assistants that handle specific types of tasks. Use one when a side task would flood your main conversation with search results, logs, or file contents you won't reference again: the subagent does that work in its own context and returns only the summary. Define a custom subagent when you keep spawning the same kind of worker with the same instructions.

Each subagent runs in its own context window with a custom system prompt, specific tool access, and independent permissions. When Claude encounters a task that matches a subagent's description, it delegates to that subagent, which works independently and returns results. To see the context savings in practice, the [context window visualization](https://code.claude.com/docs/en/context-window) walks through a session where a subagent handles research in its own separate window.

  Subagents work within a single session. To run many independent sessions in parallel and monitor them from one place, see [background agents](https://code.claude.com/docs/en/agent-view). For separate sessions that pass messages to each other, see [cross-session messaging](https://code.claude.com/docs/en/cross-session-messaging). For a coordinated team of sessions Claude spawns and supervises, see [agent teams](https://code.claude.com/docs/en/agent-teams).

Subagents help you:

* **Preserve context** by keeping exploration and implementation out of your main conversation
* **Enforce constraints** by limiting which tools a subagent can use
* **Reuse configurations** across projects with user-level subagents
* **Specialize behavior** with focused system prompts for specific domains
* **Control costs** by routing tasks to faster, cheaper models like Haiku

Claude uses each subagent's description to decide when to delegate tasks. When you create a subagent, write a clear description so Claude knows when to use it.

Those descriptions take up context, so keep them short. When the combined descriptions of your subagents, except the built-in ones, exceed 15,000 tokens, Claude Code shows a [warning at startup with the total token count](https://code.claude.com/docs/en/errors#agent-descriptions-are-over-the-15000-token-limit). Trim the `description` fields of your subagents, and move detail into each subagent's system prompt, which only loads when that subagent runs.

## 本篇目录

- [Built-in subagents](https://code.claude.com/docs)
- [Quickstart: create your first subagent](https://code.claude.com/docs)
- [Configure subagents](https://code.claude.com/docs)
- [Work with subagents](https://code.claude.com/docs)
- [Fork the current conversation](https://code.claude.com/docs)
- [Example subagents](https://code.claude.com/docs)
- [Next steps](https://code.claude.com/docs)
