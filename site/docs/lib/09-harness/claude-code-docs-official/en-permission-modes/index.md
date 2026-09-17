---
title: "Choose a permission mode"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/permission-modes.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/permission-modes.md"
sourceSha256: "6b8fc8344f52131aab75fcba4eafee2853287d6d2cc3398dde09f46b4d52a2ff"
pageSha256: "c392a85fbeb585a63892f2b675a8543bbf9e1d772156ae52325a9a76d3719b63"
contentMode: "local-full"
zh: ""
---

# Choose a permission mode

> Control whether Claude asks before acting. Switch permission modes with Shift+Tab in the CLI, the mode indicator in VS Code, or the mode selector in Desktop.

A permission mode sets which actions Claude can take in a session without asking you first. In Manual mode, Claude Code stops and asks you before most actions that edit files, run shell commands, or reach the network. In [auto mode](#eliminate-prompts-with-auto-mode), a second model, the classifier, reviews actions instead of you; [how the classifier evaluates actions](#how-the-classifier-evaluates-actions) lists which actions it reviews and which skip it.

On Pro, Max, and Team plans, the built-in starting permission mode is auto mode. [Which mode a session starts in](#which-mode-a-session-starts-in) covers the surfaces and settings that change the starting permission mode. You can also change a running session's permission mode at any time.

## 本篇目录

- [Available modes](https://code.claude.com/docs)
- [Common setups](https://code.claude.com/docs)
- [Switch permission modes](https://code.claude.com/docs)
- [Auto-approve file edits with acceptEdits mode](https://code.claude.com/docs)
- [Analyze before you edit with plan mode](https://code.claude.com/docs)
- [Allow only pre-approved tools with dontAsk mode](https://code.claude.com/docs)
- [Skip all checks with bypassPermissions mode](https://code.claude.com/docs)
- [Protected paths](https://code.claude.com/docs)
- [Critical paths](https://code.claude.com/docs)
- [See also](https://code.claude.com/docs)
