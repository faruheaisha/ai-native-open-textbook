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
sourceRel: "en/env-vars.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/env-vars.md"
sourceSha256: "9b1792540478648e4ff9cdd48c6e17a321d70a401812c1fc557b74c9080a7b5f"
pageSha256: "7b0953ebcef1566f3273f56769693b200c92137956500ad784984c3ad2346beb"
contentMode: "local-full"
zh: ""
---

## Features that need feature-flag fetching

Claude Code turns some features on through feature flags it fetches from Anthropic. Claude Code skips that fetch in these sessions:

* A session where you set `DISABLE_GROWTHBOOK`, `DISABLE_TELEMETRY`, `DO_NOT_TRACK`, or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`; each variable's row in the [variables table](#variables) says which values turn fetching off
* A session on a [third-party provider](https://code.claude.com/docs/en/third-party-integrations), such as Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, or Microsoft Foundry, unless a host platform that embeds Claude Code sets `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST`
* A [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway) session

With fetching off, you can't:

* [Start sessions in auto mode by default](https://code.claude.com/docs/en/permission-modes#which-mode-a-session-starts-in) on Pro, Max, and Team plans
* Have the VS Code extension [read settings files for the starting permission mode](https://code.claude.com/docs/en/permission-modes#switch-permission-modes)
* Run [`/auto-mode-setup`](https://code.claude.com/docs/en/auto-mode-config#generate-environment-entries) to draft `autoMode.environment` entries
* Use [Remote Control](https://code.claude.com/docs/en/remote-control#requirements)
* [Message sessions beyond this machine](https://code.claude.com/docs/en/cross-session-messaging#message-sessions-on-other-machines); messaging between sessions on this machine works with fetching off
* Run [`claude import` or the `/import` command](https://code.claude.com/docs/en/cli-reference#cli-commands)
* Run [`/skill-doctor`](https://code.claude.com/docs/en/skills#find-unused-skills) or open its report in the `/plugin` **Stats** tab
* Use [the advisor tool](https://code.claude.com/docs/en/advisor#requirements)
* Read or reply to [comments on an artifact](https://code.claude.com/docs/en/artifacts#collect-comments-on-an-artifact)
* Get the [v2 MCP client runtime](https://code.claude.com/docs/en/mcp#mcp-client-runtimes) and its protocol probe without setting `MCP_SDK_GENERATION` and `MCP_PROTOCOL_NEGOTIATION`; Claude Code uses the v1 runtime unless you set `MCP_SDK_GENERATION=v2`, and skips the probe unless you set `MCP_PROTOCOL_NEGOTIATION=auto`
* Get the [PowerShell tool](https://code.claude.com/docs/en/tools-reference#powershell-tool) by default for claude.ai and Console accounts on Windows with Git Bash installed; Claude Code routes shell commands through Git Bash unless you set `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`. On Windows without Git Bash, the tool stays on
* Get [Claude-drafted feedback](https://code.claude.com/docs/en/tools-reference#sendfeedback-tool-behavior), which Claude Code turns on through a fetched flag
* Have Claude Code [exclude MCP tools whose input schema the API would reject](https://code.claude.com/docs/en/mcp#tools-with-invalid-input-schemas); it sends the schema anyway, and a request that includes it fails with [a 400 error naming the tool by its position](https://code.claude.com/docs/en/errors#tool-input-schema-is-invalid)

### First session after an install or upgrade

In your first session after you install Claude Code, or upgrade to a version that adds a feature, a [flag-gated feature](#features-that-need-feature-flag-fetching) can be missing, and the session can start in Manual mode on a plan that otherwise starts in auto mode. Claude Code fetches the flags during that session, so both are there in your next session.

After a fresh install, in a non-interactive session such as `claude -p`, the Agent SDK, or the VS Code extension, Claude Code can still pick the flags up before it [chooses the starting permission mode](https://code.claude.com/docs/en/permission-modes#which-mode-a-session-starts-in).
