---
title: "Azure Event Hubs SDK for Java"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-eventhub-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-eventhub-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-eventhub-java/SKILL.md"
sourceSha256: "ef3200235c5e38f311fb6af505f0193166b9b2f99326cea3410c8ecc7f743255"
pageSha256: "ef3200235c5e38f311fb6af505f0193166b9b2f99326cea3410c8ecc7f743255"
contentMode: "local-full"
zh: ""
---

# Azure Event Hubs SDK for Java

Build real-time streaming applications using the Azure Event Hubs SDK for Java.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-messaging-eventhubs</artifactId>
    <version>5.19.0</version>
</dependency>

<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-messaging-eventhubs-checkpointstore-blob</artifactId>
    <version>1.20.0</version>
</dependency>
```

## Client Creation

### EventHubProducerClient

```java
import com.azure.messaging.eventhubs.EventHubProducerClient;
import com.azure.messaging.eventhubs.EventHubClientBuilder;

// With connection string
EventHubProducerClient producer = new EventHubClientBuilder()
