---
title: "Azure Identity Java SDK Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-identity-java/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-identity-java/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-identity-java/acceptance-criteria.md"
sourceSha256: "fed132ff2f6b5901ac57e5185e6b3b6ca0c926ac2a0f8c3ccd169ffeb4d588ee"
pageSha256: "fed132ff2f6b5901ac57e5185e6b3b6ca0c926ac2a0f8c3ccd169ffeb4d588ee"
contentMode: "local-full"
zh: ""
---

# Azure Identity Java SDK Acceptance Criteria

**SDK**: `com.azure:azure-identity`
**Repository**: https://github.com/Azure/azure-sdk-for-java
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. DefaultAzureCredential (Recommended)

### ✅ CORRECT: Basic DefaultAzureCredential

```java
import com.azure.identity.DefaultAzureCredential;
import com.azure.identity.DefaultAzureCredentialBuilder;

DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

// Use with any Azure client
BlobServiceClient blobClient = new BlobServiceClientBuilder()
    .endpoint("https://mystorageaccount.blob.core.windows.net")
    .credential(credential)
    .buildClient();

KeyClient keyClient = new KeyClientBuilder()
    .vaultUrl("https://myvault.vault.azure.net")
    .credential(credential)
    .buildClient();
```

### ✅ CORRECT: Configured DefaultAzureCredential

```java
DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    .managedIdentityClientId(System.getenv("AZURE_CLIENT_ID"))  // User-assigned MI
    .tenantId(System.getenv("AZURE_TENANT_ID"))
    .build();
```

### ✅ CORRECT: Excluding Credential Types

```java
DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    .excludeEnvironmentCredential()   // Skip env vars
    .excludeAzureCliCredential()      // Skip Azure CLI
    .excludeAzurePowerShellCredential()
    .build();
```

### ❌ INCORRECT: Using Hardcoded Credentials

```java
// WRONG - use DefaultAzureCredential or environment variables
ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    .tenantId("12345678-1234-1234-1234-123456789012")
    .clientId("87654321-4321-4321-4321-210987654321")
    .clientSecret("mySecretValue123!")  // NEVER hardcode secrets
    .build();
```

---

## 2. ManagedIdentityCredential

### ✅ CORRECT: System-Assigned Managed Identity

```java
import com.azure.identity.ManagedIdentityCredential;
import com.azure.identity.ManagedIdentityCredentialBuilder;

ManagedIdentityCredential credential = new ManagedIdentityCredentialBuilder()
    .build();

CosmosClient cosmosClient = new CosmosClientBuilder()
    .endpoint(System.getenv("COSMOS_ENDPOINT"))
    .credential(credential)
    .buildClient();
```

### ✅ CORRECT: User-Assigned Managed Identity by Client ID

```java
ManagedIdentityCredential credential = new ManagedIdentityCredentialBuilder()
    .clientId(System.getenv("AZURE_CLIENT_ID"))
    .build();
```

### ✅ CORRECT: User-Assigned Managed Identity by Resource ID

```java
ManagedIdentityCredential credential = new ManagedIdentityCredentialBuilder()
