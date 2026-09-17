---
title: "Configure cloud environments"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/cloud-environments.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/cloud-environments.md"
sourceSha256: "29998b3dc2a851eaf60b64058c4be0d382bad76c81ed9bdb2cdcdfd5aca7b178"
pageSha256: "50253784647b386d92ed33b22ed8a7bf2a01a5b2a92973354a18666fbf6c8c0e"
contentMode: "local-full"
zh: ""
---

# Configure cloud environments

> Configure cloud environments for Claude Code cloud sessions: network access levels, environment variables, setup scripts, and environment caching.

  Cloud environments require [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), which is in research preview for Pro, Max, and Team users, and for Enterprise users with [premium seats or Chat + Claude Code seats](https://support.claude.com/en/articles/11845131-use-claude-code-with-your-team-or-enterprise-plan).

Each [cloud session](https://code.claude.com/docs/en/claude-code-on-the-web) runs in a cloud environment. You can configure an environment to allow or deny [network access](#access-levels), [set environment variables](#set-environment-variables) for the session, on Pro and Max plans store [API credentials](#add-api-credentials) that sessions use without seeing them, and run a [setup script](#setup-scripts) before Claude starts working.

The same environments apply wherever you start a cloud session: [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), the terminal with [`claude --cloud`](https://code.claude.com/docs/en/claude-code-on-the-web#from-terminal-to-web), [Claude Tag](https://claude.com/docs/claude-tag/overview), [routines](https://code.claude.com/docs/en/routines), the [Claude mobile app](https://code.claude.com/docs/en/mobile), and the [Desktop app](https://code.claude.com/docs/en/desktop). Each of these surfaces can also route to a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments). [Availability and limitations](https://code.claude.com/docs/en/self-hosted-environments#availability-and-limitations) covers what Claude can't use yet when a Claude Tag session runs in one.

  [Remote Control](https://code.claude.com/docs/en/remote-control) sessions connect the web and mobile interfaces to a session on your own machine, which uses your machine's network and files, not a cloud environment. Claude Tag channel sessions use organization-level environments only, either [shared environments](#organization-shared-environments) or [self-hosted environments](https://code.claude.com/docs/en/self-hosted-environments).

## 本篇目录

- [The Default environment](https://code.claude.com/docs)
- [Configure your environment](https://code.claude.com/docs)
- [Network access](https://code.claude.com/docs)
- [What's available in cloud sessions](https://code.claude.com/docs)
- [Setup scripts](https://code.claude.com/docs)
- [Default allowed domains](https://code.claude.com/docs)
- [Related resources](https://code.claude.com/docs)
