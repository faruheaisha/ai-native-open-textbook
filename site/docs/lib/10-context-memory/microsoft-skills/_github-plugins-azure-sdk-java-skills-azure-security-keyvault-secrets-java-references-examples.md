---
title: "Azure Key Vault Secrets SDK for Java - Examples"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-security-keyvault-secrets-java/references/examples.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-security-keyvault-secrets-java/references/examples.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-security-keyvault-secrets-java/references/examples.md"
sourceSha256: "8ff99554d7d79477be2711659aa142d1a1ae9f66dea8175799174063b3633f64"
pageSha256: "8ff99554d7d79477be2711659aa142d1a1ae9f66dea8175799174063b3633f64"
contentMode: "local-full"
zh: ""
---

# Azure Key Vault Secrets SDK for Java - Examples

Comprehensive code examples for the Azure Key Vault Secrets SDK for Java.

## Table of Contents
- [Maven Dependency](#maven-dependency)
- [Client Creation](#client-creation)
- [Setting Secrets](#setting-secrets)
- [Getting Secrets](#getting-secrets)
- [Listing Secrets](#listing-secrets)
- [Updating Secret Properties](#updating-secret-properties)
- [Deleting and Recovering Secrets](#deleting-and-recovering-secrets)
- [Purging Deleted Secrets](#purging-deleted-secrets)
- [Backup and Restore](#backup-and-restore)
- [Async Client Patterns](#async-client-patterns)
- [Error Handling](#error-handling)

## Maven Dependency

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-security-keyvault-secrets</artifactId>
    <version>4.11.0-beta.1</version>
</dependency>

<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>1.18.2</version>
</dependency>
```

## Client Creation

### Sync SecretClient

```java
import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.security.keyvault.secrets.SecretClient;
import com.azure.security.keyvault.secrets.SecretClientBuilder;

SecretClient secretClient = new SecretClientBuilder()
    .credential(new DefaultAzureCredentialBuilder().build())
