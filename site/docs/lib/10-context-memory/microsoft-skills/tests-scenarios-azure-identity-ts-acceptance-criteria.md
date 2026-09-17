---
title: "Azure Identity SDK for TypeScript Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-identity-ts/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-identity-ts/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-identity-ts/acceptance-criteria.md"
sourceSha256: "0e6961bc7d9c89cc6e4bd1974aab8440e4a7fbc282fde5d2ab841e12c1399603"
pageSha256: "0e6961bc7d9c89cc6e4bd1974aab8440e4a7fbc282fde5d2ab841e12c1399603"
contentMode: "local-full"
zh: ""
---

# Azure Identity SDK for TypeScript Acceptance Criteria

**SDK**: `@azure/identity`
**Repository**: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
**Commit**: `main`
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Import Patterns

### 1.1 ✅ CORRECT: ESM Imports

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { 
  ManagedIdentityCredential,
  ClientSecretCredential,
  InteractiveBrowserCredential,
  ChainedTokenCredential,
  AzureCliCredential,
  DeviceCodeCredential,
} from "@azure/identity";
```

### 1.2 ✅ CORRECT: Type Imports

```typescript
import type { TokenCredential, AccessToken, GetTokenOptions } from "@azure/core-auth";
```

### 1.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: CommonJS require

```typescript
// WRONG - Use ESM imports
const { DefaultAzureCredential } = require("@azure/identity");
```

#### ❌ INCORRECT: Wrong package name

```typescript
// WRONG - Package name is @azure/identity, not azure-identity
import { DefaultAzureCredential } from "azure-identity";
```

---

## 2. DefaultAzureCredential

### 2.1 ✅ CORRECT: Basic DefaultAzureCredential

```typescript
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential();

// Use with any Azure SDK client
import { BlobServiceClient } from "@azure/storage-blob";
const blobClient = new BlobServiceClient(
  "https://<account>.blob.core.windows.net",
  credential
);
```

### 2.2 ✅ CORRECT: Get Token Directly

```typescript
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential();
const token = await credential.getToken("https://management.azure.com/.default");
console.log(token.expiresOnTimestamp);
```

### 2.3 ✅ CORRECT: DefaultAzureCredential with Options

```typescript
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential({
