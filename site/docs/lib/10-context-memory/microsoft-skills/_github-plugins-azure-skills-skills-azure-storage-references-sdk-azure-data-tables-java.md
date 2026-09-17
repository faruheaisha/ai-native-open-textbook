---
title: "Tables — Java SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-data-tables-java.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-data-tables-java.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-data-tables-java.md"
sourceSha256: "b70a8bc0fa7d587aec8ec9485bd68577d9685640dcce77d337ff039d9879c24b"
pageSha256: "b70a8bc0fa7d587aec8ec9485bd68577d9685640dcce77d337ff039d9879c24b"
contentMode: "local-full"
zh: ""
---

# Tables — Java SDK Quick Reference

> Condensed from **azure-data-tables-java**. Full patterns (typed entities,
> batch transactions, OData filters, Cosmos DB Table API)
> in the **azure-data-tables-java** plugin skill if installed.

## Install
```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-data-tables</artifactId>
    <version>12.6.0-beta.1</version>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
</dependency>
```

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/auth-best-practices.md) for production patterns.

```java
import com.azure.data.tables.TableServiceClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;
var serviceClient = new TableServiceClientBuilder()
