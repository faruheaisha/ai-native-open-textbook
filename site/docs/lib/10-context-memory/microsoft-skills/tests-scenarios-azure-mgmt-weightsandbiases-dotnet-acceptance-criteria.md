---
title: "Azure.ResourceManager.WeightsAndBiases SDK Acceptance Criteria (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-mgmt-weightsandbiases-dotnet/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-mgmt-weightsandbiases-dotnet/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-mgmt-weightsandbiases-dotnet/acceptance-criteria.md"
sourceSha256: "23054d6a3eed7f4987e0e8389594af182fb9a1329ca2ce44d74083f39efef0c7"
pageSha256: "23054d6a3eed7f4987e0e8389594af182fb9a1329ca2ce44d74083f39efef0c7"
contentMode: "local-full"
zh: ""
---

# Azure.ResourceManager.WeightsAndBiases SDK Acceptance Criteria (.NET)

**SDK**: `Azure.ResourceManager.WeightsAndBiases`
**Repository**: https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/weightsandbiases/Azure.ResourceManager.WeightsAndBiases
**Package**: https://www.nuget.org/packages/Azure.ResourceManager.WeightsAndBiases
**Purpose**: Skill testing acceptance criteria for validating generated C# code correctness

---

## 1. Correct Using Statements

### 1.1 Core Imports

#### ✅ CORRECT: Basic Client Imports
```csharp
using Azure;
using Azure.Identity;
using Azure.ResourceManager;
using Azure.ResourceManager.WeightsAndBiases;
using Azure.ResourceManager.WeightsAndBiases.Models;
```

### 1.2 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Using non-existent namespaces
```csharp
// WRONG - These don't exist
using WandB.Azure;
using Azure.WeightsAndBiases;
```

---

## 2. Client Creation Patterns

### 2.1 ✅ CORRECT: Create ArmClient
```csharp
ArmClient client = new ArmClient(new DefaultAzureCredential());
```

---

## 3. Instance Operations

### 3.1 ✅ CORRECT: Create W&B Instance
```csharp
WeightsAndBiasesInstanceCollection instances = resourceGroup.GetWeightsAndBiasesInstances();

WeightsAndBiasesInstanceData data = new WeightsAndBiasesInstanceData(AzureLocation.EastUS)
{
    Properties = new WeightsAndBiasesInstanceProperties
    {
        Marketplace = new WeightsAndBiasesMarketplaceDetails
        {
