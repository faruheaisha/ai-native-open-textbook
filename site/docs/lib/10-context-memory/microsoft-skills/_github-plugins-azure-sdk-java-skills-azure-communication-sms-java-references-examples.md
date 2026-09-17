---
title: "Azure Communication SMS Java SDK - Examples"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-communication-sms-java/references/examples.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-communication-sms-java/references/examples.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-communication-sms-java/references/examples.md"
sourceSha256: "d9220c4787229b1a53d016991f3326eed2575949980fc01e5056de87025e0318"
pageSha256: "d9220c4787229b1a53d016991f3326eed2575949980fc01e5056de87025e0318"
contentMode: "local-full"
zh: ""
---

# Azure Communication SMS Java SDK - Examples

Comprehensive code examples for the Azure Communication Services SMS SDK for Java.

## Table of Contents
- [Maven Dependency](#maven-dependency)
- [Client Creation](#client-creation)
- [Send Single SMS](#send-single-sms)
- [Send Bulk SMS](#send-bulk-sms)
- [Delivery Reports](#delivery-reports)
- [Async Operations](#async-operations)
- [Error Handling](#error-handling)
- [Complete Application Example](#complete-application-example)

## Maven Dependency

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-sms</artifactId>
    <version>1.2.0</version>
</dependency>
```

## Client Creation

### With DefaultAzureCredential (Recommended)

```java
import com.azure.communication.sms.SmsClient;
import com.azure.communication.sms.SmsClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;

SmsClient smsClient = new SmsClientBuilder()
    .endpoint("https://<resource>.communication.azure.com")
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildClient();
```

### With Connection String

```java
SmsClient smsClient = new SmsClientBuilder()
    .connectionString(System.getenv("AZURE_COMMUNICATION_CONNECTION_STRING"))
    .buildClient();
```

### With AzureKeyCredential

```java
import com.azure.core.credential.AzureKeyCredential;

SmsClient smsClient = new SmsClientBuilder()
    .endpoint("https://<resource>.communication.azure.com")
