---
title: "Azure Event Hubs Java SDK - Examples"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-eventhub-java/references/examples.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-eventhub-java/references/examples.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-eventhub-java/references/examples.md"
sourceSha256: "0d661dcc67e01dbfdc06090e02bf12e3bef80c8c9aae08274a53f5163e649b13"
pageSha256: "0d661dcc67e01dbfdc06090e02bf12e3bef80c8c9aae08274a53f5163e649b13"
contentMode: "local-full"
zh: ""
---

# Azure Event Hubs Java SDK - Examples

Comprehensive code examples for the Azure Event Hubs SDK for Java.

## Table of Contents

- [Maven Dependency](#maven-dependency)
- [EventHubProducerClient](#eventhubproducerclient)
- [EventHubConsumerClient](#eventhubconsumerclient)
- [EventProcessorClient](#eventprocessorclient)
- [Checkpointing Patterns](#checkpointing-patterns)
- [Partition Handling](#partition-handling)

---

## Maven Dependency

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-messaging-eventhubs</artifactId>
    <version>5.21.0</version>
</dependency>

<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>1.18.2</version>
</dependency>

<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-messaging-eventhubs-checkpointstore-blob</artifactId>
    <version>1.21.0</version>
</dependency>
```

---

## EventHubProducerClient

### Basic Producer with Azure Identity

```java
import com.azure.messaging.eventhubs.*;
import com.azure.identity.DefaultAzureCredentialBuilder;

import java.util.Arrays;
import java.util.List;

import static java.nio.charset.StandardCharsets.UTF_8;

public class PublishEventsWithAzureIdentity {
    public static void main(String[] args) {
        List<EventData> telemetryEvents = Arrays.asList(
            new EventData("Roast beef".getBytes(UTF_8)),
            new EventData("Cheese".getBytes(UTF_8)),
            new EventData("Tofu".getBytes(UTF_8)),
            new EventData("Turkey".getBytes(UTF_8)));

        // Create a producer
