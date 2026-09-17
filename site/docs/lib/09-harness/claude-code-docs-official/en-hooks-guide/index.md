---
title: "Automate actions with hooks"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/hooks-guide.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks-guide.md"
sourceSha256: "b5632cf6b8c78f04797a91ed590ed7718f6af17cc923a856cbad3b3a2f7138a8"
pageSha256: "5fff649cac6972fd905afb70118606b2693fa69a44f3b7b619b0f6ad1736f7ea"
contentMode: "local-full"
zh: ""
---

# Automate actions with hooks

> Run shell commands automatically when Claude Code edits files, finishes tasks, or needs input. Format code, send notifications, validate commands, and enforce project rules.

Hooks are user-defined shell commands. Claude Code runs them at specific points in its lifecycle, which gives you deterministic control: certain actions always happen rather than relying on the LLM to choose to run them. Use hooks to enforce project rules, automate repetitive tasks, and integrate Claude Code with your existing tools.

For decisions that require judgment rather than deterministic rules, you can also use [prompt-based hooks](#prompt-based-hooks) or [agent-based hooks](#agent-based-hooks) that use a Claude model to evaluate conditions.

For other ways to extend Claude Code, see [skills](https://code.claude.com/docs/en/skills) for giving Claude additional instructions and executable commands, [subagents](https://code.claude.com/docs/en/sub-agents) for running tasks in isolated contexts, and [plugins](https://code.claude.com/docs/en/plugins) for packaging extensions to share across projects.

  This guide covers common use cases and how to get started. For full event schemas, JSON input/output formats, and advanced features like async hooks and MCP tool hooks, see the [Hooks reference](https://code.claude.com/docs/en/hooks).

## 本篇目录

- [Set up your first hook](https://code.claude.com/docs)
- [What you can automate](https://code.claude.com/docs)
- [How hooks work](https://code.claude.com/docs)
- [Prompt-based hooks](https://code.claude.com/docs)
- [Agent-based hooks](https://code.claude.com/docs)
- [HTTP hooks](https://code.claude.com/docs)
- [Limitations and troubleshooting](https://code.claude.com/docs)
- [Learn more](https://code.claude.com/docs)
