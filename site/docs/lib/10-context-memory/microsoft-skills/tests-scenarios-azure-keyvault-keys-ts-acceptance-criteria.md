---
title: "Acceptance Criteria: azure-keyvault-keys-ts"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-keyvault-keys-ts/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-keyvault-keys-ts/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-keyvault-keys-ts/acceptance-criteria.md"
sourceSha256: "a280ef2949d1f92d78480fc286940277ac63e87e56d9f241e7ea83d918df1d49"
pageSha256: "a280ef2949d1f92d78480fc286940277ac63e87e56d9f241e7ea83d918df1d49"
contentMode: "local-full"
zh: ""
---

# Acceptance Criteria: azure-keyvault-keys-ts

## Overview

This document defines the acceptance criteria for code generated using the `@azure/keyvault-keys` SDK for TypeScript/JavaScript.

**Package:** `@azure/keyvault-keys`  
**Repository:** https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-keys

---

## 1. Import Statements

### ✅ MUST

```typescript
// ESM imports
import { KeyClient, CryptographyClient } from "@azure/keyvault-keys";
import { DefaultAzureCredential } from "@azure/identity";
```

### ❌ MUST NOT

```typescript
// CommonJS require (deprecated pattern)
const { KeyClient } = require("@azure/keyvault-keys");

// Old SDK imports
import { KeyVaultClient } from "azure-keyvault";
```

---

## 2. Client Instantiation

### ✅ MUST

```typescript
// Use DefaultAzureCredential for production
const credential = new DefaultAzureCredential();
const vaultName = "<YOUR KEYVAULT NAME>";
const url = `https://${vaultName}.vault.azure.net`;

const client = new KeyClient(url, credential);
```

### ✅ MAY (for testing only)

```typescript
import { AzureKeyCredential } from "@azure/core-auth";

// API key only for specific scenarios, prefer DefaultAzureCredential
