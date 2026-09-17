---
title: "Azure Key Vault Keys (Java)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-security-keyvault-keys-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-security-keyvault-keys-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-security-keyvault-keys-java/SKILL.md"
sourceSha256: "ad00eabdfbfbf51ee4b58d53a5444e44be2725a6d4c2603d88de1c04816ea5b4"
pageSha256: "ad00eabdfbfbf51ee4b58d53a5444e44be2725a6d4c2603d88de1c04816ea5b4"
contentMode: "local-full"
zh: ""
---

# Azure Key Vault Keys (Java)

Manage cryptographic keys and perform cryptographic operations in Azure Key Vault and Managed HSM.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-security-keyvault-keys</artifactId>
    <version>4.9.0</version>
</dependency>
```

## Client Creation

```java
import com.azure.core.credential.TokenCredential;
import com.azure.identity.AzureIdentityEnvVars;
import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.identity.ManagedIdentityCredentialBuilder;
import com.azure.security.keyvault.keys.KeyClient;
import com.azure.security.keyvault.keys.KeyClientBuilder;
import com.azure.security.keyvault.keys.cryptography.CryptographyClient;
import com.azure.security.keyvault.keys.cryptography.CryptographyClientBuilder;

// Local dev: DefaultAzureCredential. Production: set AZURE_TOKEN_CREDENTIALS=prod or AZURE_TOKEN_CREDENTIALS=<specific_credential>
TokenCredential credential = new DefaultAzureCredentialBuilder()
    .requireEnvVars(AzureIdentityEnvVars.AZURE_TOKEN_CREDENTIALS)
    .build();
// Or use a specific credential directly in production:
// See https://learn.microsoft.com/java/api/overview/azure/identity-readme?view=azure-java-stable#credential-classes
// TokenCredential credential = new ManagedIdentityCredentialBuilder().build();

// Key management client
KeyClient keyClient = new KeyClientBuilder()
