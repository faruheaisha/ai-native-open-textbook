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
sourceRel: "en/commands.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/commands.md"
sourceSha256: "427c727590e91f7f06fc5bf233af574ef24ddc9bfd20a7d6df65ece628434a9b"
pageSha256: "00083919e283ed47aca903a648055cd4fa18577aed129b2ca7e6714da44be06b"
contentMode: "local-full"
zh: ""
---

## Commands across a typical workflow

Most commands are useful at a specific point in a session, from setting up a project to shipping a change.

**First session in a repo.** Run `/init` to generate a starter `CLAUDE.md`, then `/memory` to refine it. Use `/mcp` to set up any servers the project needs, ask Claude to create any [subagents](https://code.claude.com/docs/en/sub-agents) you want, and run `/permissions` to set your approval rules.

**During a task.** `/plan` switches into plan mode before a large change. `/model` and `/effort` adjust which model you're using and how much reasoning it applies. When the conversation gets long, `/context` shows what's filling the window and `/compact` summarizes it to free space. Use `/btw` for a side question that shouldn't add to the conversation history.

**Run work in parallel.** Claude delegates side tasks to [subagents](https://code.claude.com/docs/en/sub-agents), and `/tasks` lists the current session's background work, including subagents that have finished. `/background` detaches the whole session to keep running as a [background agent](https://code.claude.com/docs/en/agent-view) and frees your terminal. For a large change that spans the codebase, `/batch` decomposes it into independent units and runs each in its own [worktree](https://code.claude.com/docs/en/worktrees). See [Run agents in parallel](https://code.claude.com/docs/en/agents) for how these approaches relate.

**Before you ship.** `/diff` shows what changed. `/code-review` checks the current diff for correctness bugs and cleanups and can apply the findings with `--fix`; pass a PR number, such as `/code-review high 1234`, to review a pull request instead. `/review` is an alias. `/code-review ultra` runs a multi-agent review in the cloud. `/security-review` checks the diff for security vulnerabilities.

**Between sessions.** `/clear` starts fresh on a new task while keeping project memory. `/resume` returns to an earlier conversation, `/branch` branches the current one to try a different direction, and `/fork` copies it into a new [background session](https://code.claude.com/docs/en/agent-view). `/teleport` pulls a web session into this terminal, and `/remote-control` lets you continue this local session from another device.

**When something is wrong.** `/rewind` rolls code and conversation back to a checkpoint, or summarizes part of the conversation. `/doctor` runs a setup checkup that diagnoses installation and configuration issues and can fix them, `/debug` diagnoses runtime issues, and `/feedback` reports a bug with session context attached.
