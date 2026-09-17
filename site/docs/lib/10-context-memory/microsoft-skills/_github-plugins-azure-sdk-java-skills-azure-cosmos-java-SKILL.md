---
title: "Azure Cosmos DB SDK for Java"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-cosmos-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-cosmos-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-cosmos-java/SKILL.md"
sourceSha256: "44598c07681d06e88d7a26ad5a11e18170ea5cf65c1457a2bce5742dad9bbbbf"
pageSha256: "44598c07681d06e88d7a26ad5a11e18170ea5cf65c1457a2bce5742dad9bbbbf"
contentMode: "local-full"
zh: ""
---

# Azure Cosmos DB SDK for Java

Client library for Azure Cosmos DB NoSQL API with global distribution and reactive patterns.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-cosmos</artifactId>
    <version>LATEST</version>
</dependency>
```

Or use Azure SDK BOM:

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.azure</groupId>
            <artifactId>azure-sdk-bom</artifactId>
            <version>{bom_version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-cosmos</artifactId>
    </dependency>
</dependencies>
```

## Environment Variables

```bash
COSMOS_ENDPOINT=https://<account>.documents.azure.com:443/
