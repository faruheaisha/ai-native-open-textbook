---
title: "BYO OAuth2 — Azure-hosted MCP starter (build your own MCP on Functions)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-custom-oauth-azure-starter.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-custom-oauth-azure-starter.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-custom-oauth-azure-starter.md"
sourceSha256: "07d981d3e12cd1ea7955514e8b369a9a1301f00d654779aefe02ad9fa37b8c95"
pageSha256: "07d981d3e12cd1ea7955514e8b369a9a1301f00d654779aefe02ad9fa37b8c95"
contentMode: "local-full"
zh: ""
---

# BYO OAuth2 — Azure-hosted MCP starter (build your own MCP on Functions)

Companion to [tool-mcp-custom-oauth.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-references-tool-mcp-custom-oauth). Use this when you want to **build** the MCP server yourself on Azure Functions (rather than register an OAuth app against a third-party MCP). Deploying the sample template creates the Function App **and** its Entra app registration, so four of the five BYO OAuth2 connection inputs come straight from its outputs — you only add a client secret.

Run the steps in order. They set env vars (`FUNC`, `RG`, `APPID`, `IDURI`, `TENANT`) that later steps reuse. Then return to [tool-mcp-custom-oauth.md § A. Imperative CLI](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-references-tool-mcp-custom-oauth#a-imperative-cli) with the inputs.

**Step 1 — Scaffold and provision the Function App + Entra app.**

```bash
azd init --template remote-mcp-functions-python -e mcpserver-python
