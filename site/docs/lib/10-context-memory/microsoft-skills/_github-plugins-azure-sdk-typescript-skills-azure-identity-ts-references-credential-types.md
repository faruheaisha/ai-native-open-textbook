---
title: "Credential Types Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-identity-ts/references/credential-types.md"
sourceRel: ".github/plugins/azure-sdk-typescript/skills/azure-identity-ts/references/credential-types.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-typescript/skills/azure-identity-ts/references/credential-types.md"
sourceSha256: "88a305a18093f1a825b378251b6ab74cb556fdb8086c6691eadef0c4d7655a2e"
pageSha256: "88a305a18093f1a825b378251b6ab74cb556fdb8086c6691eadef0c4d7655a2e"
contentMode: "local-full"
zh: ""
---

# Credential Types Reference

Azure Identity credential types for authenticating to Azure services using the @azure/identity TypeScript SDK.

## Overview

The Azure Identity library provides various credential classes for different authentication scenarios. Choose the right credential based on your environment and security requirements.

## Credential Selection Guide

| Scenario | Recommended Credential |
|----------|------------------------|
| Production (any environment) | `DefaultAzureCredential` |
| Azure VM/App Service | `ManagedIdentityCredential` |
| Service Principal (secret) | `ClientSecretCredential` |
| Service Principal (cert) | `ClientCertificateCredential` |
| Local development | `AzureCliCredential` or `AzureDeveloperCliCredential` |
| Browser application | `InteractiveBrowserCredential` |
| CI/CD pipeline | `ClientSecretCredential` or `WorkloadIdentityCredential` |
| Kubernetes (AKS) | `WorkloadIdentityCredential` |

## DefaultAzureCredential (Recommended)

The most versatile credential - automatically tries multiple authentication methods.

```typescript
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential();

// Works in all environments - dev and production
import { BlobServiceClient } from "@azure/storage-blob";
const blobClient = new BlobServiceClient(
  "https://myaccount.blob.core.windows.net",
  credential
);
```

See [DefaultAzureCredential overview](https://aka.ms/azsdk/js/identity/credential-chains#defaultazurecredential-overview) for the current credential chain order and defaults.

### Customizing DefaultAzureCredential

```typescript
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential({
  // Exclude specific credentials
  excludeAzureCliCredential: true,
  excludeAzurePowerShellCredential: true,
  
  // For user-assigned managed identity
