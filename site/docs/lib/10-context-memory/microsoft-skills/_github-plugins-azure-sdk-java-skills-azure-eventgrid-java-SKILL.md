---
title: "Azure Event Grid SDK for Java"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-eventgrid-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-eventgrid-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-eventgrid-java/SKILL.md"
sourceSha256: "55f7bee669c8c15e804990b6a5c8a31a8063db0c22e594cba802f4c0e274e792"
pageSha256: "55f7bee669c8c15e804990b6a5c8a31a8063db0c22e594cba802f4c0e274e792"
contentMode: "local-full"
zh: ""
---

# Azure Event Grid SDK for Java

Build event-driven applications using the Azure Event Grid SDK for Java.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-messaging-eventgrid</artifactId>
    <version>4.27.0</version>
</dependency>
```

## Client Creation

### EventGridPublisherClient

```java
import com.azure.messaging.eventgrid.EventGridPublisherClient;
import com.azure.messaging.eventgrid.EventGridPublisherClientBuilder;
import com.azure.core.credential.AzureKeyCredential;

// With API Key
EventGridPublisherClient<EventGridEvent> client = new EventGridPublisherClientBuilder()
