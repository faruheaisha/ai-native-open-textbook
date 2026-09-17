---
title: "Azure Web PubSub SDK for Java"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-messaging-webpubsub-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-messaging-webpubsub-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-messaging-webpubsub-java/SKILL.md"
sourceSha256: "9bb62a43834be7a0095dc995fa5f703329114aa47f9ccdebe227a8a8c48bd374"
pageSha256: "9bb62a43834be7a0095dc995fa5f703329114aa47f9ccdebe227a8a8c48bd374"
contentMode: "local-full"
zh: ""
---

# Azure Web PubSub SDK for Java

Build real-time web applications using the Azure Web PubSub SDK for Java.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-messaging-webpubsub</artifactId>
    <version>1.5.0</version>
</dependency>
```

## Client Creation

### With Connection String

```java
import com.azure.messaging.webpubsub.WebPubSubServiceClient;
import com.azure.messaging.webpubsub.WebPubSubServiceClientBuilder;

WebPubSubServiceClient client = new WebPubSubServiceClientBuilder()
