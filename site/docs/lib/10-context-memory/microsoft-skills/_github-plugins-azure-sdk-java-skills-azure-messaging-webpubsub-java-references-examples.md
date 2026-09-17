---
title: "Azure Web PubSub Java SDK - Examples"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-messaging-webpubsub-java/references/examples.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-messaging-webpubsub-java/references/examples.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-messaging-webpubsub-java/references/examples.md"
sourceSha256: "19ee9954df37cdfeec7a20820de82994fa76f662940695fa29436e42c7fdfce6"
pageSha256: "19ee9954df37cdfeec7a20820de82994fa76f662940695fa29436e42c7fdfce6"
contentMode: "local-full"
zh: ""
---

# Azure Web PubSub Java SDK - Examples

Comprehensive code examples for the Azure Web PubSub SDK for Java.

## Table of Contents
- [Maven Dependency](#maven-dependency)
- [Client Creation](#client-creation)
- [Send Messages](#send-messages)
- [Group Management](#group-management)
- [Connection Management](#connection-management)
- [Client Access Tokens](#client-access-tokens)
- [Permissions](#permissions)
- [Async Operations](#async-operations)
- [Complete Application Example](#complete-application-example)

## Maven Dependency

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
    .connectionString(System.getenv("WEB_PUBSUB_CONNECTION_STRING"))
    .hub("chat")
    .buildClient();
```

### With DefaultAzureCredential

```java
import com.azure.identity.DefaultAzureCredentialBuilder;

WebPubSubServiceClient client = new WebPubSubServiceClientBuilder()
    .credential(new DefaultAzureCredentialBuilder().build())
    .endpoint(System.getenv("WEB_PUBSUB_ENDPOINT"))
    .hub("chat")
    .buildClient();
```

### With Access Key

```java
import com.azure.core.credential.AzureKeyCredential;

WebPubSubServiceClient client = new WebPubSubServiceClientBuilder()
