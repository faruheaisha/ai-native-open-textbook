---
title: "Azure Key Vault Keys SDK for Java - Examples"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-security-keyvault-keys-java/references/examples.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-security-keyvault-keys-java/references/examples.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-security-keyvault-keys-java/references/examples.md"
sourceSha256: "67b854b920a436f18813391844bc50099a27988235f332d066925cab63331b22"
pageSha256: "67b854b920a436f18813391844bc50099a27988235f332d066925cab63331b22"
contentMode: "local-full"
zh: ""
---

# Azure Key Vault Keys SDK for Java - Examples

Comprehensive code examples for the Azure Key Vault Keys SDK for Java.

## Table of Contents
- [Maven Dependency](#maven-dependency)
- [Client Creation](#client-creation)
- [Creating Keys](#creating-keys)
- [Getting and Listing Keys](#getting-and-listing-keys)
- [Updating Key Properties](#updating-key-properties)
- [Deleting and Recovering Keys](#deleting-and-recovering-keys)
- [Key Rotation](#key-rotation)
- [Cryptographic Operations](#cryptographic-operations)
- [Async Client Patterns](#async-client-patterns)
- [Error Handling](#error-handling)

## Maven Dependency

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-security-keyvault-keys</artifactId>
    <version>4.9.0</version>
</dependency>

<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>1.14.0</version>
</dependency>
```

## Client Creation

### Sync KeyClient

```java
import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.security.keyvault.keys.KeyClient;
import com.azure.security.keyvault.keys.KeyClientBuilder;

KeyClient keyClient = new KeyClientBuilder()
