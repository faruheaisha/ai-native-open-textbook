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
sourceRel: "en/errors.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/errors.md"
sourceSha256: "b8944f28bfea74456c2960ba67f375c1d39afd34fb474e956bea3d64744e6604"
pageSha256: "85e993e92b93a0af9b5866e64556e5e2da608108532d4ad4c1b8ba7f091a7875"
contentMode: "local-full"
zh: ""
---

## Report an error

For errors from components this page doesn't cover, see the relevant guide:

* MCP server failed to connect or authenticate: [MCP](https://code.claude.com/docs/en/mcp)
* Hook script failed or blocked a tool: [Debug hooks](https://code.claude.com/docs/en/hooks#debug-hooks)
* Permission denied or filesystem errors during install: [Troubleshoot installation and login](https://code.claude.com/docs/en/troubleshoot-install)

If an error is not listed here or the suggested fix does not help:

* Run `/feedback` inside Claude Code to send the transcript and a description to Anthropic. The command also offers to open a prefilled GitHub issue. Sending to Anthropic requires [authentication](https://code.claude.com/docs/en/authentication). On Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, and other third-party providers, or when no Anthropic credentials are configured, `/feedback` saves a local archive you can send to your Anthropic account representative instead.
* Run `claude doctor` from your shell for a read-only diagnostic of your installation, or run the `/doctor` checkup inside Claude Code to find and fix setup problems
* Check [status.claude.com](https://status.claude.com) for active incidents
* Search [existing issues](https://github.com/anthropics/claude-code/issues) on GitHub
