---
title: "Key Vault Keys — .NET SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-security-keyvault-keys-dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-security-keyvault-keys-dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-security-keyvault-keys-dotnet.md"
sourceSha256: "fb5051f172d728a48e751365d20bd2c381a5c39167056aa3fc83f00f60a88064"
pageSha256: "fb5051f172d728a48e751365d20bd2c381a5c39167056aa3fc83f00f60a88064"
contentMode: "local-full"
zh: ""
---

# Key Vault Keys — .NET SDK Quick Reference

> Condensed from **azure-security-keyvault-keys-dotnet**. Full patterns
> (crypto operations, key rotation, backup/restore, HSM, KeyResolver)
> in the **azure-security-keyvault-keys-dotnet** plugin skill if installed.

## Install
dotnet add package Azure.Security.KeyVault.Keys
dotnet add package Azure.Identity

## Quick Start
```csharp
using Azure.Security.KeyVault.Keys;
using Azure.Identity;
var client = new KeyClient(new Uri("https://<vault>.vault.azure.net"), new DefaultAzureCredential());
```

## Best Practices
- Use DefaultAzureCredential for **local development only**. In production, use ManagedIdentityCredential — see [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/auth-best-practices.md)
- Enable soft-delete — protect against accidental deletion
- Use HSM-backed keys — set `HardwareProtected = true` for sensitive keys
- Implement key rotation — use automatic rotation policies
- Limit key operations — only enable required KeyOperations
- Set expiration dates — always set ExpiresOn for keys
- Use specific versions — pin to versions in production
- Cache CryptographyClient — reuse for multiple operations
