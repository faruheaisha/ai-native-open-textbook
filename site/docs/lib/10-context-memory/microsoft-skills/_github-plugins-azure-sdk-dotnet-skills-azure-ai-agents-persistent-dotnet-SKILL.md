---
title: "Azure.AI.Agents.Persistent (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-ai-agents-persistent-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-ai-agents-persistent-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-ai-agents-persistent-dotnet/SKILL.md"
sourceSha256: "108f198e45b9cd7029768e149f0cd58b0ef5b58efd66ce61c0b2698f69860c26"
pageSha256: "108f198e45b9cd7029768e149f0cd58b0ef5b58efd66ce61c0b2698f69860c26"
contentMode: "local-full"
zh: ""
---

# Azure.AI.Agents.Persistent (.NET)

Low-level SDK for creating and managing persistent AI agents with threads, messages, runs, and tools.

## Installation

```bash
dotnet add package Azure.AI.Agents.Persistent --prerelease
dotnet add package Azure.Identity
```

**Current Versions**: Stable v1.1.0, Preview v1.2.0-beta.8

## Environment Variables

```bash
PROJECT_ENDPOINT=https://<resource>.services.ai.azure.com/api/projects/<project>  # Required: Azure AI project endpoint
MODEL_DEPLOYMENT_NAME=gpt-4o-mini  # Required: model deployment name
