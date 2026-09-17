---
title: "Azure Storage Blob SDK for Java"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-storage-blob-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-storage-blob-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-storage-blob-java/SKILL.md"
sourceSha256: "677a18b27f976c62c8cc3276637319bbb581dc2860750941f7ba3b688e0f9f8a"
pageSha256: "677a18b27f976c62c8cc3276637319bbb581dc2860750941f7ba3b688e0f9f8a"
contentMode: "local-full"
zh: ""
---

# Azure Storage Blob SDK for Java

Build blob storage applications using the Azure Storage Blob SDK for Java.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-storage-blob</artifactId>
    <version>12.33.0</version>
</dependency>
```

## Client Creation

### BlobServiceClient

```java
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;

// With SAS token
BlobServiceClient serviceClient = new BlobServiceClientBuilder()
