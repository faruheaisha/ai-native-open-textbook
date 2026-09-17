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
sourceRel: "en/interactive-mode.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/interactive-mode.md"
sourceSha256: "a43f4a145320ecff8da141c321f3220246884acb226285095ad0ff123ceb2b60"
pageSha256: "cd20ec2bf7a8ba84070f8f2ee0e67cde6e1fe1c679f9b0e7ce981dc551e9b6df"
contentMode: "local-full"
zh: ""
---

## Task list

The task list is Claude's to-do checklist: items Claude created to plan multi-step work, with indicators showing what's pending, in progress, or complete. It's separate from the background-task view. To see running shells and subagents, use [`/tasks`](https://code.claude.com/docs/en/commands) instead.

The list fills only in sessions that have the task-tracking tools, which Claude Code provides by default on [Claude 3.x models, Opus 4 through 4.7, Sonnet 4 through 4.6, and Haiku 4.5](https://code.claude.com/docs/en/tools-reference#task-tool-availability). On any other model, including a model ID Claude Code doesn't recognize, the list stays empty unless you opt in with `CLAUDE_CODE_ENABLE_TODO_TOOLS=1` or one of the other ways under [Task tool availability](https://code.claude.com/docs/en/tools-reference#task-tool-availability). When the session has the tools, the task list works as follows:

* Press `Ctrl+T` to toggle the task list view. The display shows up to five tasks at a time. When Claude hasn't created any checklist items yet, the toggle has no visible effect because there's nothing to display
* If you leave the list expanded, Claude Code restores the expanded view the next time you launch into a session that still has tasks, such as with `--resume` or `--continue`. When the task list is empty, Claude Code starts it collapsed
* To see all tasks or clear them, ask Claude directly: "show me all tasks" or "clear all tasks"
* Tasks persist across context compactions, helping Claude stay organized on larger projects
* To share a task list across sessions, set `CLAUDE_CODE_TASK_LIST_ID` to use a named directory in `~/.claude/tasks/`: `CLAUDE_CODE_TASK_LIST_ID=my-project claude`
