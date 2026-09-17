---
title: "Azure.ResourceManager.BotService SDK Acceptance Criteria (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-mgmt-botservice-dotnet/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-mgmt-botservice-dotnet/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-mgmt-botservice-dotnet/acceptance-criteria.md"
sourceSha256: "a765fd4116f36a28796f3438bfa29aae2167e0e6e3ffb845acbedb977e6936d9"
pageSha256: "a765fd4116f36a28796f3438bfa29aae2167e0e6e3ffb845acbedb977e6936d9"
contentMode: "local-full"
zh: ""
---

# Azure.ResourceManager.BotService SDK Acceptance Criteria (.NET)

**SDK**: `Azure.ResourceManager.BotService`
**Repository**: https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/botservice/Azure.ResourceManager.BotService
**Package**: https://www.nuget.org/packages/Azure.ResourceManager.BotService
**Purpose**: Skill testing acceptance criteria for validating generated C# code correctness

---

## 1. Correct Using Statements

### 1.1 Core Imports

#### ✅ CORRECT: Basic Client Imports
```csharp
using Azure;
using Azure.Identity;
using Azure.ResourceManager;
using Azure.ResourceManager.BotService;
using Azure.ResourceManager.BotService.Models;
```

### 1.2 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Using non-existent namespaces
```csharp
// WRONG - These don't exist
using Azure.BotService;
using Microsoft.Bot.Builder.Management;
```

---

## 2. Client Creation Patterns

### 2.1 ✅ CORRECT: Create ArmClient
```csharp
var credential = new DefaultAzureCredential();
ArmClient armClient = new ArmClient(credential);
```

---

## 3. Bot Resource Operations

### 3.1 ✅ CORRECT: Create Bot Resource
```csharp
var botData = new BotData(AzureLocation.WestUS2)
{
    Kind = BotServiceKind.Azurebot,
    Sku = new BotServiceSku(BotServiceSkuName.F0),
    Properties = new BotProperties(
        displayName: "MyBot",
        endpoint: new Uri("https://mybot.azurewebsites.net/api/messages"),
