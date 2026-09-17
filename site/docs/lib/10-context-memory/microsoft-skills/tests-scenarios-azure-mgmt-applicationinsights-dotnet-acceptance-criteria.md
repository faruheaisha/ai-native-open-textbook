---
title: "Azure.ResourceManager.ApplicationInsights SDK Acceptance Criteria (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-mgmt-applicationinsights-dotnet/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-mgmt-applicationinsights-dotnet/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-mgmt-applicationinsights-dotnet/acceptance-criteria.md"
sourceSha256: "dc43050615025e790bac5a666308fe69449b95d788e77d08b975f3960f0f3112"
pageSha256: "dc43050615025e790bac5a666308fe69449b95d788e77d08b975f3960f0f3112"
contentMode: "local-full"
zh: ""
---

# Azure.ResourceManager.ApplicationInsights SDK Acceptance Criteria (.NET)

**SDK**: `Azure.ResourceManager.ApplicationInsights`
**Repository**: https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/applicationinsights/Azure.ResourceManager.ApplicationInsights
**Package**: https://www.nuget.org/packages/Azure.ResourceManager.ApplicationInsights
**Purpose**: Skill testing acceptance criteria for validating generated C# code correctness

---

## 1. Correct Using Statements

### 1.1 Core Imports

#### ✅ CORRECT: Basic Client Imports
```csharp
using Azure;
using Azure.Identity;
using Azure.ResourceManager;
using Azure.ResourceManager.ApplicationInsights;
using Azure.ResourceManager.ApplicationInsights.Models;
```

### 1.2 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Using non-existent namespaces
```csharp
// WRONG - These don't exist
using Azure.ApplicationInsights;
using Microsoft.ApplicationInsights.Management;
```

---

## 2. Client Creation Patterns

### 2.1 ✅ CORRECT: Create ArmClient
```csharp
ArmClient client = new ArmClient(new DefaultAzureCredential());
```

### 2.2 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Missing credential
```csharp
// WRONG - Must provide credential
ArmClient client = new ArmClient();
```

---

## 3. Application Insights Component Operations

### 3.1 ✅ CORRECT: Create Workspace-based Component (Recommended)
```csharp
ApplicationInsightsComponentCollection components = resourceGroup.GetApplicationInsightsComponents();

ApplicationInsightsComponentData data = new ApplicationInsightsComponentData(
    AzureLocation.EastUS,
    ApplicationInsightsApplicationType.Web)
{
    Kind = "web",
    WorkspaceResourceId = new ResourceIdentifier(
