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
sourceRel: "en/permission-modes.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/permission-modes.md"
sourceSha256: "6b8fc8344f52131aab75fcba4eafee2853287d6d2cc3398dde09f46b4d52a2ff"
pageSha256: "e540ec5fbc960895c43c7367835e3740d9c386db13193c1c836217b141a49eac"
contentMode: "local-full"
zh: ""
---

## Auto-approve file edits with acceptEdits mode

`acceptEdits` mode lets Claude create and edit files in your working directory without prompting. The status bar shows `⏵⏵ accept edits on` while this mode is active.

In addition to file edits, `acceptEdits` mode auto-approves common filesystem Bash commands: `mkdir`, `touch`, `rm`, `rmdir`, `mv`, `cp`, and `sed`. These commands are also auto-approved when prefixed with safe environment variables such as `LANG=C` or `NO_COLOR=1`, or process wrappers such as `timeout`, `nice`, or `nohup`. Like file edits, auto-approval applies only to paths inside your working directory or `additionalDirectories`. Paths outside that scope, writes to [protected paths](#protected-paths), `rm` and `rmdir` removals targeting a [critical path](#critical-paths), and all other Bash commands except the [built-in read-only set](https://code.claude.com/docs/en/permissions#read-only-commands) still prompt.

When the [PowerShell tool](https://code.claude.com/docs/en/tools-reference#powershell-tool) is enabled, `acceptEdits` mode also auto-approves `Set-Content`, `Add-Content`, `Clear-Content`, and `Remove-Item` on in-scope paths, along with their common aliases. The same scope and protected-path rules apply, and `Remove-Item` gets [its own check](#remove-item-in-powershell). A positional argument that contains a quote character, such as the apostrophe in `Set-Content .\notes.txt "It's done"`, still prompts even on in-scope paths, because Claude Code can't statically validate an argument whose quoted and unquoted readings differ. Pass the content through a named parameter such as `-Value` to avoid the prompt.

Use `acceptEdits` when you want to review changes in your editor or via `git diff` after the fact rather than approving each edit inline.

Press `Shift+Tab` once from Manual mode to enter it, or start with it directly:

```bash theme={null}
claude --permission-mode acceptEdits
```
