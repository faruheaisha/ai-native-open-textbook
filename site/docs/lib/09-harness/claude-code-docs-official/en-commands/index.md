---
title: "Commands"
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
pageSha256: "6ebf84a68a41b64bb51a0c492b4497f38540b6b00fc9b199a7058df1a8ecd281"
contentMode: "local-full"
zh: ""
---

# Commands

> Complete reference for commands available in Claude Code, including built-in commands and bundled skills.

Commands control Claude Code from inside a session. They provide a quick way to switch models, manage permissions, clear context, run a workflow, and more.

Type `/` to see the commands available to you, or type `/` followed by letters to filter. [How the command menu matches what you type](#how-the-command-menu-matches-what-you-type) covers highlighting, typos, and the few commands Claude Code hides from the menu until you type their full name.

A command is only recognized at the start of your message. Text that follows the command name becomes its arguments. As of v2.1.199, [skills](https://code.claude.com/docs/en/skills#pass-arguments-to-skills) are the exception: a skill invocation followed by more skills, such as `/skill-a /skill-b do XYZ`, loads every skill named at the start and passes the trailing text to each as arguments. Up to six skills can be chained.

If you send a command while Claude is responding, Claude Code queues it and runs it after the current turn finishes. Claude Code runs some commands immediately without interrupting the response, such as `/status`, `/tasks`, and `/usage`. In [fullscreen rendering](https://code.claude.com/docs/en/fullscreen), Claude Code also opens dialog commands such as `/theme` and `/help` immediately. Before v2.1.234, Claude Code queued those dialogs until the turn finished.

## 本篇目录

- [Commands across a typical workflow](https://code.claude.com/docs)
- [All commands](https://code.claude.com/docs)
- [How the command menu matches what you type](https://code.claude.com/docs)
- [MCP prompts](https://code.claude.com/docs)
- [See also](https://code.claude.com/docs)
