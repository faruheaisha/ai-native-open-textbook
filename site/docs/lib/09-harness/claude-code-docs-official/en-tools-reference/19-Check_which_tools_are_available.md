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
sourceRel: "en/tools-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/tools-reference.md"
sourceSha256: "f928a98a3f2e69421eeadeb064439c827340f4b19a28c7ad920c2a0e60b142f9"
pageSha256: "0abd8b33b33dfdd7412cda42bfb6a5fc03bbcc60d0d10a2fa68044ab04bc72be"
contentMode: "local-full"
zh: ""
---

## Check which tools are available

Your exact tool set depends on your provider, platform, and settings. To check what's loaded in a running session, ask Claude directly:

```text theme={null}
What tools do you have access to?
```

Claude gives a conversational summary. For exact MCP tool names, run `/mcp`.

  The [advisor tool](https://code.claude.com/docs/en/advisor) is a [server tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool) that the API runs, rather than a tool that Claude Code implements. It has no name you can reference in permission rules or hook matchers.
