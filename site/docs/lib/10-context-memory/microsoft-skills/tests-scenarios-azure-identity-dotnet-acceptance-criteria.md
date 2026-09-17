---
title: "Azure Identity SDK Acceptance Criteria (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-identity-dotnet/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-identity-dotnet/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-identity-dotnet/acceptance-criteria.md"
sourceSha256: "60d371f833d8a4bf3cec2bbd73022fe03a117181c9ab77de3c63703956b95acf"
pageSha256: "60d371f833d8a4bf3cec2bbd73022fe03a117181c9ab77de3c63703956b95acf"
contentMode: "local-full"
zh: ""
---

# Azure Identity SDK Acceptance Criteria (.NET)

**SDK**: `Azure.Identity`
**Repository**: https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/identity/Azure.Identity
**Commit**: `main`
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Using Statements

### 1.1 ✅ CORRECT: Core Identity Imports
```csharp
using Azure.Identity;
using Azure.Core;
```

### 1.2 ✅ CORRECT: With Dependency Injection
```csharp
using Azure.Identity;
using Microsoft.Extensions.Azure;
```

### 1.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Wrong namespace
```csharp
// WRONG - Azure.Identity not Microsoft.Azure.Identity
using Microsoft.Azure.Identity;
```

---

## 2. DefaultAzureCredential

### 2.1 ✅ CORRECT: Basic DefaultAzureCredential
```csharp
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

var credential = new DefaultAzureCredential();
var client = new SecretClient(new Uri("https://myvault.vault.azure.net"), credential);
```

### 2.2 ✅ CORRECT: Customized DefaultAzureCredential
```csharp
using Azure.Identity;

var credential = new DefaultAzureCredential(
    new DefaultAzureCredentialOptions
    {
        ExcludeEnvironmentCredential = true,
        ExcludeManagedIdentityCredential = false,
        ExcludeVisualStudioCredential = false,
        ExcludeAzureCliCredential = false,
        ExcludeInteractiveBrowserCredential = false,
