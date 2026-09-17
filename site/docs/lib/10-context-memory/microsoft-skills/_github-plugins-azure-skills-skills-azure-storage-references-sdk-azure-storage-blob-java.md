---
title: "Blob Storage — Java SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-blob-java.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-blob-java.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-blob-java.md"
sourceSha256: "f4e2a5ab810cfddd2c3c681814feaa216dc5059161e3c37326fee6910c2a82d0"
pageSha256: "f4e2a5ab810cfddd2c3c681814feaa216dc5059161e3c37326fee6910c2a82d0"
contentMode: "local-full"
zh: ""
---

# Blob Storage — Java SDK Quick Reference

> Condensed from **azure-storage-blob-java**. Full patterns (SAS tokens,
> streaming, lease management, parallel uploads, proxy config)
> in the **azure-storage-blob-java** plugin skill if installed.

## Install
```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-storage-blob</artifactId>
    <version>12.33.0</version>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
</dependency>
```

## Quick Start
```java
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;
var serviceClient = new BlobServiceClientBuilder()
