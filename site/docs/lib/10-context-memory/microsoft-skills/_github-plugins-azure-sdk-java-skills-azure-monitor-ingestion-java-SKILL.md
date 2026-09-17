---
title: "Azure Monitor Ingestion SDK for Java"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-monitor-ingestion-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-monitor-ingestion-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-monitor-ingestion-java/SKILL.md"
sourceSha256: "edc52c6adc3d7503cfce4bee6fca0357f98f003b3555b4b2867daace43210f5f"
pageSha256: "edc52c6adc3d7503cfce4bee6fca0357f98f003b3555b4b2867daace43210f5f"
contentMode: "local-full"
zh: ""
---

# Azure Monitor Ingestion SDK for Java

Client library for sending custom logs to Azure Monitor using the Logs Ingestion API via Data Collection Rules.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-monitor-ingestion</artifactId>
    <version>1.2.11</version>
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
        <artifactId>azure-monitor-ingestion</artifactId>
    </dependency>
</dependencies>
```

## Prerequisites

- Data Collection Endpoint (DCE)
- Data Collection Rule (DCR)
- Log Analytics workspace
- Target table (custom or built-in: CommonSecurityLog, SecurityEvents, Syslog, WindowsEvents)

## Environment Variables

```bash
