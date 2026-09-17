---
title: "Azure Tables SDK for Java"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-data-tables-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-data-tables-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-data-tables-java/SKILL.md"
sourceSha256: "257cca211f25374b4cfa2662c667659cbe54e9422656b990aad623aa242d8782"
pageSha256: "257cca211f25374b4cfa2662c667659cbe54e9422656b990aad623aa242d8782"
contentMode: "local-full"
zh: ""
---

# Azure Tables SDK for Java

Build table storage applications using the Azure Tables SDK for Java. Works with both Azure Table Storage and Cosmos DB Table API.

## Installation

```xml
<dependency>
  <groupId>com.azure</groupId>
  <artifactId>azure-data-tables</artifactId>
  <version>12.6.0-beta.1</version>
</dependency>
```

## Client Creation

### With Connection String

```java
import com.azure.data.tables.TableServiceClient;
import com.azure.data.tables.TableServiceClientBuilder;
import com.azure.data.tables.TableClient;

TableServiceClient serviceClient = new TableServiceClientBuilder()
