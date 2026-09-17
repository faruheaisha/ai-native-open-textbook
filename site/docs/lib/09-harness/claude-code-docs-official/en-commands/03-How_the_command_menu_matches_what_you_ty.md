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
pageSha256: "8dd5842c3e2b622e713c376a00dd5f36f90f71188f661b515dc64976271aaaf5"
contentMode: "local-full"
zh: ""
---

## How the command menu matches what you type

Claude Code filters the `/` menu as you type. Each bullet below covers one thing you might notice while filtering:

* **Highlighting**: Claude Code highlights the top suggestion only when the letters after the `/` match a command's name or alias, from the start of the name or from a word within it, ignoring the `:`, `_`, and `-` separators. Typing `/adddir` highlights `/add-dir`, and typing `/new` highlights `/clear` through its alias. Press `Enter` to run the highlighted suggestion. These highlighting rules require Claude Code v2.1.236 or later.
* **After a typo**: Claude Code highlights nothing. The close matches stay listed, and you can pick one with `Tab` or the arrow keys, but `Enter` submits your text as typed and reports [Unknown command](https://code.claude.com/docs/en/errors#unknown-command).
* **Commands that aren't available to you**: Claude Code leaves them out of the menu. When nothing matches, Claude Code shows `No commands match "/name"`. Most unavailable commands return [Unknown command](https://code.claude.com/docs/en/errors#unknown-command) when you submit them; a few, such as [`/schedule` on a Console API key](https://code.claude.com/docs/en/routines#schedule-returns-unknown-command), answer with their own availability message instead. Some commands also answer with a message of their own when your organization's policy disables them.
* **Hidden commands**: Claude Code keeps a few available commands, such as `/heapdump`, out of the menu by design. A partial name never brings a hidden command into the menu: if the partial matches nothing visible, Claude Code shows the same no-match message. Claude Code lists the command only once you've typed its full name, and submitting the full name runs it.
