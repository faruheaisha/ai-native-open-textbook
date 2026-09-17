---
title: "Key Vault Secrets — Java SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-security-keyvault-secrets-java.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-security-keyvault-secrets-java.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-security-keyvault-secrets-java.md"
sourceSha256: "692aed42d62a19492b9b85717b9133a6e9e24f1d4684c1a796218a1c7b59e8af"
pageSha256: "692aed42d62a19492b9b85717b9133a6e9e24f1d4684c1a796218a1c7b59e8af"
contentMode: "local-full"
zh: ""
---

# Key Vault Secrets — Java SDK Quick Reference

> Condensed from **azure-security-keyvault-secrets-java**. Full patterns
> (async client, secret rotation, backup/restore, config loader)
> in the **azure-security-keyvault-secrets-java** plugin skill if installed.

## Install
```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-security-keyvault-secrets</artifactId>
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
import com.azure.security.keyvault.secrets.SecretClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;
var secretClient = new SecretClientBuilder()
    .vaultUrl("https://<vault>.vault.azure.net")
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildClient();
```

## Best Practices
- Enable soft delete — protects against accidental deletion
- Use tags — tag secrets with environment, service, owner
- Set expiration — use `setExpiresOn()` for credentials that should rotate
- Content type — set contentType to indicate format (e.g., application/json)
- Version management — don't delete old versions immediately during rotation
- Access logging — enable diagnostic logging on Key Vault
- Least privilege — use separate vaults for different environments
