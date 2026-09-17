---
title: "Key Vault Keys — Java SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-security-keyvault-keys-java.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-security-keyvault-keys-java.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-security-keyvault-keys-java.md"
sourceSha256: "3f6582cb928e399b79ed2a52e0ba0543cb039895175d640c91c4a6965095b541"
pageSha256: "3f6582cb928e399b79ed2a52e0ba0543cb039895175d640c91c4a6965095b541"
contentMode: "local-full"
zh: ""
---

# Key Vault Keys — Java SDK Quick Reference

> Condensed from **azure-security-keyvault-keys-java**. Full patterns
> (crypto operations, HSM keys, key rotation, backup/restore, import)
> in the **azure-security-keyvault-keys-java** plugin skill if installed.

## Install
```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-security-keyvault-keys</artifactId>
    <version>4.9.0</version>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
</dependency>
```

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/auth-best-practices.md) for production patterns.

```java
import com.azure.security.keyvault.keys.KeyClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;
var keyClient = new KeyClientBuilder()
    .vaultUrl("https://<vault>.vault.azure.net")
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildClient();
```

## Best Practices
- Use HSM keys for production — set `setHardwareProtected(true)` for sensitive keys
- Enable soft delete — protects against accidental deletion
- Key rotation — set up automatic rotation policies
- Least privilege — use separate keys for different operations
- Local crypto when possible — use CryptographyClient with local key material to reduce round-trips
