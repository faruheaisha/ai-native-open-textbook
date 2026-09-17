---
title: "Agent Framework Azure Hosted Agents"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/agent-framework-azure-ai-py/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/agent-framework-azure-ai-py/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/agent-framework-azure-ai-py/SKILL.md"
sourceSha256: "d79a8fefd6753474846e72b926437d7bbcddef5cd3f4fb89fb7c03f38ac4434e"
pageSha256: "d79a8fefd6753474846e72b926437d7bbcddef5cd3f4fb89fb7c03f38ac4434e"
contentMode: "local-full"
zh: ""
---

# Agent Framework Azure Hosted Agents

Build persistent agents on Azure AI Foundry using the Microsoft Agent Framework Python SDK.

## Architecture

```
User Query → AzureAIAgentsProvider → Azure AI Agent Service (Persistent)
                    ↓
              Agent.run() / Agent.run_stream()
                    ↓
              Tools: Functions | Hosted (Code/Search/Web) | MCP
                    ↓
              AgentThread (conversation persistence)
```

## Installation

```bash
# Full framework (recommended)
pip install agent-framework --pre

# Or Azure-specific package only
pip install agent-framework-azure-ai --pre
```

## Environment Variables

```bash
