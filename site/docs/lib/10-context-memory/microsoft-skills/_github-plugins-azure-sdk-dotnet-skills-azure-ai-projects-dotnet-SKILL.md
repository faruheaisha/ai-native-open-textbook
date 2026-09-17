---
title: "Azure.AI.Projects (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-ai-projects-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-ai-projects-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-ai-projects-dotnet/SKILL.md"
sourceSha256: "c928d09ea1c62c55b4582e53582e3f8a97fa7df84a6102be8e33aba9b1926058"
pageSha256: "c928d09ea1c62c55b4582e53582e3f8a97fa7df84a6102be8e33aba9b1926058"
contentMode: "local-full"
zh: ""
---

# Azure.AI.Projects (.NET)

High-level SDK for Azure AI Foundry project operations including agents, connections, datasets, deployments, evaluations, and indexes.

## Installation

```bash
dotnet add package Azure.AI.Projects
dotnet add package Azure.Identity

# Optional: For versioned agents with OpenAI extensions
dotnet add package Azure.AI.Projects.OpenAI --prerelease

# Optional: For low-level agent operations
dotnet add package Azure.AI.Agents.Persistent --prerelease
```

**Current Versions**: GA v1.1.0, Preview v1.2.0-beta.5

## Environment Variables

```bash
PROJECT_ENDPOINT=https://<resource>.services.ai.azure.com/api/projects/<project>  # Required: Azure AI project endpoint
MODEL_DEPLOYMENT_NAME=gpt-4o-mini  # Required: model deployment name
