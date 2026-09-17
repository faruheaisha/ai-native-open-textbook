---
title: "Azure Data Tables SDK for Java - Examples"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-data-tables-java/references/examples.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-data-tables-java/references/examples.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-data-tables-java/references/examples.md"
sourceSha256: "f58b252000b23aea4fc8fa6031d81c7931dd91cc1b0c8cbb48ec4e9645dbeee2"
pageSha256: "f58b252000b23aea4fc8fa6031d81c7931dd91cc1b0c8cbb48ec4e9645dbeee2"
contentMode: "local-full"
zh: ""
---

# Azure Data Tables SDK for Java - Examples

Comprehensive code examples for the Azure Data Tables SDK for Java.

## Table of Contents
- [Maven Dependency](#maven-dependency)
- [Client Creation](#client-creation)
- [Creating Tables](#creating-tables)
- [CRUD Operations on Entities](#crud-operations-on-entities)
- [Querying Entities](#querying-entities)
- [Batch/Transactional Operations](#batchtransactional-operations)
- [Async Client Patterns](#async-client-patterns)
- [Error Handling](#error-handling)

## Maven Dependency

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-data-tables</artifactId>
    <version>12.6.0-beta.1</version>
</dependency>

<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>1.18.2</version>
</dependency>
```

## Client Creation

### TableServiceClient with DefaultAzureCredential

```java
import com.azure.core.credential.TokenCredential;
import com.azure.data.tables.TableServiceClient;
import com.azure.data.tables.TableServiceClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;

TokenCredential tokenCredential = new DefaultAzureCredentialBuilder().build();
TableServiceClient tableServiceClient = new TableServiceClientBuilder()
