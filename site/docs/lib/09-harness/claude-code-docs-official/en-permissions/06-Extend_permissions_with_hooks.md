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
sourceRel: "en/permissions.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/permissions.md"
sourceSha256: "6cc02236c28e33b38f1977f95d5c1b3c8805c0ad97cb377866cd1de1c5cb8cbc"
pageSha256: "4a52de4d52f789110116dcfb92b2229fc70332b8c14b4f000529b5ea0caf8fd5"
contentMode: "local-full"
zh: ""
---

## Extend permissions with hooks

[Claude Code hooks](https://code.claude.com/docs/en/hooks-guide) let you register custom shell commands that evaluate permissions at runtime. When Claude Code makes a tool call, PreToolUse hooks run before the permission prompt, for every tool except [`EndConversation`](https://code.claude.com/docs/en/tools-reference#endconversation-tool-behavior). The hook output can deny the tool call, force a prompt, or skip the prompt to let the call proceed.

Hook decisions don't bypass permission rules. Claude Code evaluates deny and ask rules regardless of what a PreToolUse hook returns: a matching deny rule blocks the call, and a matching ask rule still prompts even when the hook returned `"allow"` or `"ask"`. This preserves the deny-first precedence described in [Manage permissions](#manage-permissions), including deny rules set in managed settings.

MCP tools marked [`requiresUserInteraction`](https://code.claude.com/docs/en/mcp#require-approval-for-a-specific-tool) also still prompt when a hook returns `"allow"`, as do connector tools [your organization set to `ask`](https://code.claude.com/docs/en/mcp#organization-controls-on-connector-tools) in sessions where that setting reaches Claude Code.

A blocking hook also takes precedence over allow rules. A hook that exits with code 2 stops the tool call before permission rules are evaluated, so the block applies even when an allow rule would otherwise let the call proceed. To run all Bash commands without prompts except for a few you want blocked, add `"Bash"` to your allow list and register a PreToolUse hook that rejects those specific commands. See [Block edits to protected files](https://code.claude.com/docs/en/hooks-guide#block-edits-to-protected-files) for a hook script you can adapt.
