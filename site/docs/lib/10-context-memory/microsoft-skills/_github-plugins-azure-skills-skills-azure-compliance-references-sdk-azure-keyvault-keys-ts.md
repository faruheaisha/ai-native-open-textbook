---
title: "Key Vault Keys — TypeScript SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-keys-ts.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-keys-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-keys-ts.md"
sourceSha256: "fc843c39d6f2f80c0af8e18ae75f12b1fdf7ff8848f4c87dfc50a2e8f90cb507"
pageSha256: "fc843c39d6f2f80c0af8e18ae75f12b1fdf7ff8848f4c87dfc50a2e8f90cb507"
contentMode: "local-full"
zh: ""
---

# Key Vault Keys — TypeScript SDK Quick Reference

> Condensed from **azure-keyvault-keys-ts**. Full patterns (crypto operations,
> key rotation policies, backup/restore, CryptographyClient)
> in the **azure-keyvault-keys-ts** plugin skill if installed.

## Install
npm install @azure/keyvault-keys @azure/identity

## Quick Start
```typescript
import { KeyClient } from "@azure/keyvault-keys";
import { DefaultAzureCredential } from "@azure/identity";
const keyClient = new KeyClient(`https://${vaultName}.vault.azure.net`, new DefaultAzureCredential());
```

## Best Practices
- Use DefaultAzureCredential for **local development only**. In production, use ManagedIdentityCredential — see [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/auth-best-practices.md)
- Enable soft-delete — required for production vaults
- Set expiration dates on keys
- Use key rotation policies — automate key rotation
- Limit key operations — only grant needed operations (encrypt, sign, etc.)
- Browser not supported — this SDK is Node.js only
