---
title: "Azure AI Foundry"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/foundry/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/foundry/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/foundry/README.md"
sourceSha256: "a863a3c55f7d186e848d0eab9a9624ad2961db2223accf609c022c67a0f60b03"
pageSha256: "a863a3c55f7d186e848d0eab9a9624ad2961db2223accf609c022c67a0f60b03"
contentMode: "local-full"
zh: ""
---

# Azure AI Foundry

Azure AI Foundry (formerly Azure OpenAI) for building AI-powered applications with models like GPT-4o, GPT-4, and embeddings.

> **💡 For detailed AI guidance**, invoke the **`microsoft-foundry`** skill. It provides model catalog access, RAG patterns, agent creation, and evaluation workflows.

## When to Use

- Chat and conversational AI applications
- Text generation and completion
- Code generation assistants
- Document analysis and summarization
- Embeddings for search and RAG
- Multi-modal applications (vision + text)

## Service Type in azure.yaml

```yaml
services:
  my-ai-service:
    host: containerapp  # AI services typically deployed via Container Apps
    project: ./src/ai-service
```

## Required Supporting Resources

| Resource | Purpose |
|----------|---------|
| Azure AI Foundry account | Model hosting |
| Model deployment | Specific model (GPT-4o, GPT-4, etc.) |
| Key Vault | Store API keys securely |
| Application Insights | Monitor usage and costs |

## Model Selection

| Model | Best For | Context Window |
|-------|----------|----------------|
| GPT-4o | General purpose, vision, latest | 128K |
| GPT-4 | Complex reasoning | 32K |
| GPT-3.5-Turbo | Cost-effective, simple tasks | 16K |
| text-embedding-ada-002 | Embeddings for RAG/search | 8K |

## References

- [Region Availability](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-foundry-region-availability)
