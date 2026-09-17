---
title: "Azure Key Vault Secrets (Java)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-security-keyvault-secrets-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-security-keyvault-secrets-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-security-keyvault-secrets-java/SKILL.md"
sourceSha256: "2684f5cb2ee3ee30f225451c6d0d99245b82d95ca10bb8897d3902a0819ebf17"
pageSha256: "2684f5cb2ee3ee30f225451c6d0d99245b82d95ca10bb8897d3902a0819ebf17"
contentMode: "local-full"
zh: ""
---

# Azure Key Vault Secrets (Java)

Securely store and manage secrets like passwords, API keys, and connection strings.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-security-keyvault-secrets</artifactId>
    <version>4.9.0</version>
</dependency>
```

## Client Creation

```java
import com.azure.core.credential.TokenCredential;
import com.azure.identity.AzureIdentityEnvVars;
import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.identity.ManagedIdentityCredentialBuilder;
import com.azure.security.keyvault.secrets.SecretClient;
import com.azure.security.keyvault.secrets.SecretClientBuilder;

// Local dev: DefaultAzureCredential. Production: set AZURE_TOKEN_CREDENTIALS=prod or AZURE_TOKEN_CREDENTIALS=<specific_credential>
TokenCredential credential = new DefaultAzureCredentialBuilder()
    .requireEnvVars(AzureIdentityEnvVars.AZURE_TOKEN_CREDENTIALS)
    .build();
// Or use a specific credential directly in production:
// See https://learn.microsoft.com/java/api/overview/azure/identity-readme?view=azure-java-stable#credential-classes
// TokenCredential credential = new ManagedIdentityCredentialBuilder().build();

// Sync client
SecretClient secretClient = new SecretClientBuilder()
