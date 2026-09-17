---
title: "Azure Identity library for .NET"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-identity-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-identity-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-identity-dotnet/SKILL.md"
sourceSha256: "34946fe159707d9ba75e040b654d89a2bede4b408945e476f4f88432dbc0cbfb"
pageSha256: "34946fe159707d9ba75e040b654d89a2bede4b408945e476f4f88432dbc0cbfb"
contentMode: "local-full"
zh: ""
---

# Azure Identity library for .NET

Authentication library for Azure SDK clients using Microsoft Entra ID.

## Installation

```bash
dotnet add package Azure.Identity

# For ASP.NET Core integration
dotnet add package Microsoft.Extensions.Azure

# For brokered authentication and Visual Studio Code credential support
dotnet add package Azure.Identity.Broker
```

## Environment Variables

### Service Principal with Secret

```bash
