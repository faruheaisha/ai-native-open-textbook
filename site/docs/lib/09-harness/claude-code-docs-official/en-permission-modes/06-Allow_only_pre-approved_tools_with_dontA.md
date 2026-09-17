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
pageSha256: "35e02807bba3a50a894dd40f0096c794b302c6c913c414134d5c855d44dbf172"
contentMode: "local-full"
zh: ""
---

## Allow only pre-approved tools with dontAsk mode

If you set `dontAsk` mode, Claude Code auto-denies every tool call that would otherwise prompt you. Claude runs only actions matching your `permissions.allow` rules, [read-only Bash commands](https://code.claude.com/docs/en/permissions#read-only-commands), and calls approved by a [PreToolUse hook](https://code.claude.com/docs/en/permissions#extend-permissions-with-hooks). Use this mode for CI pipelines or restricted environments where you pre-define exactly what Claude may do; the session never waits for input. The status bar shows `⏵⏵ don't ask on` while this mode is active.

Claude Code denies calls matching your explicit [`ask` rules](https://code.claude.com/docs/en/permissions#manage-permissions) rather than prompting. It also denies the built-in `AskUserQuestion` tool even if your allow rules match it, and does the same to connector tools [your organization set to `ask`](https://code.claude.com/docs/en/mcp#organization-controls-on-connector-tools) in sessions where that setting reaches Claude Code. It denies MCP tools marked [`_meta["anthropic/requiresUserInteraction"]`](https://code.claude.com/docs/en/mcp#require-approval-for-a-specific-tool) the same way, because their approval card needs an answer this mode never collects; this requires Claude Code v2.1.199 or later.

`rm` and `rmdir` removals targeting a [critical path](#critical-paths), such as `rm -rf /` and `rm -rf ~`, are denied even when an allow rule matches them or a `PreToolUse` hook allows them.

Cloud sessions on [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) ignore `defaultMode: "dontAsk"`; see [bypassPermissions](#skip-all-checks-with-bypasspermissions-mode) for details.

Set it at startup with the flag:

```bash theme={null}
claude --permission-mode dontAsk
```
