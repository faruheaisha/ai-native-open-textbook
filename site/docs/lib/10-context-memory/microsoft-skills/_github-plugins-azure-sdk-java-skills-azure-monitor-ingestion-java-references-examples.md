---
title: "Azure Monitor Ingestion SDK for Java - Examples"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-monitor-ingestion-java/references/examples.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-monitor-ingestion-java/references/examples.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-monitor-ingestion-java/references/examples.md"
sourceSha256: "930e5cfa1a13c14d17f1f46c6812b2143c4bed0194141909416a72c17bae8fd2"
pageSha256: "930e5cfa1a13c14d17f1f46c6812b2143c4bed0194141909416a72c17bae8fd2"
contentMode: "local-full"
zh: ""
---

# Azure Monitor Ingestion SDK for Java - Examples

Comprehensive code examples for the Azure Monitor Ingestion SDK for Java.

## Table of Contents
- [Maven Dependency](#maven-dependency)
- [Client Creation](#client-creation)
- [Uploading Logs](#uploading-logs)
- [Batching with Concurrency](#batching-with-concurrency)
- [Error Handling](#error-handling)
- [Async Client Patterns](#async-client-patterns)

## Maven Dependency

```xml

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.azure</groupId>
            <artifactId>azure-sdk-bom</artifactId>
            <version>1.2.29</version>
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
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
    </dependency>
</dependencies>

<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-monitor-ingestion</artifactId>
    <version>1.2.14</version>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>1.15.3</version>
</dependency>
```

## Client Creation

### Synchronous Client

```java
import com.azure.identity.DefaultAzureCredential;
import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.monitor.ingestion.LogsIngestionClient;
import com.azure.monitor.ingestion.LogsIngestionClientBuilder;

DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

LogsIngestionClient client = new LogsIngestionClientBuilder()
