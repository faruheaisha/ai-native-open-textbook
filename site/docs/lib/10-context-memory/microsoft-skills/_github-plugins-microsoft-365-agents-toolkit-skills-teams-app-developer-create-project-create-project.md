---
title: "Create Project"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/create-project/create-project.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/create-project/create-project.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/create-project/create-project.md"
sourceSha256: "ee6d690b4183c076c7adfdddf85a3ec8ae5b59c13dfb2c64f79ea7ec8fdc9c34"
pageSha256: "ee6d690b4183c076c7adfdddf85a3ec8ae5b59c13dfb2c64f79ea7ec8fdc9c34"
contentMode: "local-full"
zh: ""
---

# Create Project

Scaffold a new Microsoft 365 agent or Teams app from an ATK template.

## Template Selection Guide

| User Wants | Capability |
|------------|------------|
| Extend M365 Copilot with custom instructions | `declarative-agent` |
| Declarative Agent with new API | `declarative-agent-action` |
| Declarative Agent with new API (Bearer Token) | `declarative-agent-action-bearer` |
| Declarative Agent with new API (OAuth) | `declarative-agent-action-oauth` |
| Declarative Agent with existing OpenAPI spec | `declarative-agent-action-from-existing-api` |
| Connect MCP Server to Copilot | `declarative-agent-with-action-from-mcp` |
| Declarative Agent with Copilot Connector | `declarative-agent-with-graph-connector` |
| Declarative Agent for MetaOS | `declarative-agent-meta-os-new-project` |
| Declarative Agent from TypeSpec | `declarative-agent-typespec` |
| Agent with custom LLM (Azure OpenAI, etc.) | `basic-custom-engine-agent` |
| Weather forecast agent | `weather-agent` |
| Agent using Azure AI Foundry | `foundry-agent-to-m365` |
| Teams chatbot with AI | `teams-agent` |
| Teams bot with RAG/knowledge base | `teams-agent-rag-customize` |
| Teams Agent with Azure AI Search | `teams-agent-rag-azure-ai-search` |
| Teams Agent with Custom API | `teams-agent-rag-custom-api` |
| Teams Collaborator Agent | `teams-collaborator-agent` |
| Simple Teams echo bot | `bot` |
| Teams tab app | `tab` |
| Teams message extension | `message-extension` |
| Copilot Connector | `copilot-connector` |

See [../toolkit/templates.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-teams-app-developer-toolkit-templates) for the complete template catalog with language support and descriptions.

## Creating Projects

Create templates in the current directory with one generic flow:

```bash
# 1) Scaffold into a temporary parent folder
