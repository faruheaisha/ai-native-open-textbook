---
title: "Azure Storage Blob Java SDK - Examples"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-storage-blob-java/references/examples.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-storage-blob-java/references/examples.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-storage-blob-java/references/examples.md"
sourceSha256: "b48214ea380b105c265f75a26fce6d5034329ea78bfe200e07cd0dd34d55b205"
pageSha256: "b48214ea380b105c265f75a26fce6d5034329ea78bfe200e07cd0dd34d55b205"
contentMode: "local-full"
zh: ""
---

# Azure Storage Blob Java SDK - Examples

Comprehensive code examples for the Azure Storage Blob SDK for Java.

## Table of Contents

- [Maven Dependency](#maven-dependency)
- [Client Creation](#client-creation)
- [Container Operations](#container-operations)
- [Upload Blobs](#upload-blobs)
- [Download Blobs](#download-blobs)
- [List Blobs](#list-blobs)
- [SAS Token Generation](#sas-token-generation)
- [Error Handling](#error-handling)

---

## Maven Dependency

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-storage-blob</artifactId>
    <version>12.33.0</version>
</dependency>
```

Or use the BOM:

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
        <artifactId>azure-storage-blob</artifactId>
    </dependency>
</dependencies>
```

---

## Client Creation

### Using Shared Key Credential

```java
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.storage.common.StorageSharedKeyCredential;

StorageSharedKeyCredential credential = new StorageSharedKeyCredential(accountName, accountKey);

String endpoint = String.format("https://%s.blob.core.windows.net", accountName);
BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
    .endpoint(endpoint)
    .credential(credential)
    .buildClient();
```

### Using SAS Token

```java
// Separate endpoint and SAS token
BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
