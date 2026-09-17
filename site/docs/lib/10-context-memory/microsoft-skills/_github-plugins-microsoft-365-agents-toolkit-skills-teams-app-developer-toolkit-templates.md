---
title: "Agent Templates Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/toolkit/templates.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/toolkit/templates.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/toolkit/templates.md"
sourceSha256: "91bc13d0103f064cd912390b72b72443e9be9dc0728189b7901281e4a9b67196"
pageSha256: "91bc13d0103f064cd912390b72b72443e9be9dc0728189b7901281e4a9b67196"
contentMode: "local-full"
zh: ""
---

# Agent Templates Reference

## Contents
- CLI Capabilities (all atk new -c options)
- Declarative Agents (creating, options)
- Custom Engine Agents (creating, languages)
- Teams Agents (creating, languages)
- Other Templates (bot, tab, message extension)
- Best Practices (language matching)
- Template Selection Guide

## CLI Capabilities (atk new -c)

Use `atk new -c <capability>` to create projects. Available capabilities:

| Capability | Description |
|------------|-------------|
| `declarative-agent` | Declarative Agent |
| `declarative-agent-action` | Declarative Agent with Action from Scratch |
| `declarative-agent-action-bearer` | Declarative Agent with Action from Scratch (Bearer Token) |
| `declarative-agent-action-oauth` | Declarative Agent with Action from Scratch (OAuth) |
| `declarative-agent-action-from-existing-api` | Declarative Agent with Action from Existing API |
| `declarative-agent-with-action-from-mcp` | Declarative Agent with Action from MCP Server |
| `declarative-agent-with-graph-connector` | Declarative Agent with Copilot Connector |
| `declarative-agent-meta-os-new-project` | Declarative Agent for MetaOS (New Project) |
| `declarative-agent-meta-os-upgrade-project` | Declarative Agent for MetaOS (Upgrade Project) |
| `declarative-agent-typespec` | Declarative Agent from TypeSpec |
| `basic-custom-engine-agent` | Basic Custom Engine Agent |
| `weather-agent` | Weather Agent |
| `foundry-agent-to-m365` | Foundry Agent to M365 |
| `copilot-connector` | Copilot Connector |
| `teams-agent` | General Teams Agent |
| `teams-agent-rag-customize` | Teams Agent with Data from Customized Source |
| `teams-agent-rag-azure-ai-search` | Teams Agent with Data from Azure AI Search |
| `teams-agent-rag-custom-api` | Teams Agent with Data from Custom API using OpenAPI Spec |
| `teams-collaborator-agent` | Teams Collaborator Agent |
| `tab` | Tab |
| `bot` | Simple Bot |
| `message-extension` | Message Extension |
| `office-addin-outlook-taskpane` | Outlook Task Pane Add-in |
| `office-addin-wxpo-taskpane` | Office Task Pane Add-in |
| `office-addin-excel-cfshortcut` | Excel Custom Functions |
| `office-addin-config` | Office Add-in Common Configuration |

## Declarative Agents (Copilot Extensions)

### Creating a Declarative Agent

```bash
# Basic declarative agent (no backend service needed)
atk new -c declarative-agent -n myagent -i false

# Declarative agent with new API plugin (creates backend)
atk new -c declarative-agent-action -l typescript -n myagent -i false

# Declarative agent with existing OpenAPI spec (requires -a and -o with operation IDs)
# First inspect the OpenAPI spec to find operation IDs, then pass them:
