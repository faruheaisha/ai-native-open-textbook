---
title: "Key Vault Secrets — TypeScript SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-secrets-ts.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-secrets-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-secrets-ts.md"
sourceSha256: "1245bf5652e351813290fee3e6d244b16aeba20f7c91ac62163a39743c4edccf"
pageSha256: "1245bf5652e351813290fee3e6d244b16aeba20f7c91ac62163a39743c4edccf"
contentMode: "local-full"
zh: ""
---

# Key Vault Secrets — TypeScript SDK Quick Reference

> Condensed from **azure-keyvault-secrets-ts**. Full patterns (key rotation,
> cryptographic operations, backup/restore, wrap/unwrap)
> in the **azure-keyvault-secrets-ts** plugin skill if installed.

## Install
npm install @azure/keyvault-secrets @azure/identity

## Quick Start
```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
const client = new SecretClient("https://<vault>.vault.azure.net", new DefaultAzureCredential());
```

## Best Practices
- Use DefaultAzureCredential for **local development only**. In production, use ManagedIdentityCredential — see [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/auth-best-practices.md)
- Enable soft-delete — required for production vaults
- Set expiration dates on both keys and secrets
- Use key rotation policies — automate key rotation
- Limit key operations — only grant needed operations (encrypt, sign, etc.)
- Browser not supported — these SDKs are Node.js only
