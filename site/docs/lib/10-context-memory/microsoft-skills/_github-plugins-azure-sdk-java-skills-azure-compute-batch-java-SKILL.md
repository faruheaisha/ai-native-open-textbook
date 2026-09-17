---
title: "Azure Batch SDK for Java"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-compute-batch-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-compute-batch-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-compute-batch-java/SKILL.md"
sourceSha256: "a64ad3c273875782b51595a54968d108eaa7081dd7007bf3c3cb05040aaf7456"
pageSha256: "a64ad3c273875782b51595a54968d108eaa7081dd7007bf3c3cb05040aaf7456"
contentMode: "local-full"
zh: ""
---

# Azure Batch SDK for Java

Client library for running large-scale parallel and high-performance computing (HPC) batch jobs in Azure.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-compute-batch</artifactId>
    <version>1.0.0-beta.5</version>
</dependency>
```

## Prerequisites

- Azure Batch account
- Pool configured with compute nodes
- Azure subscription

## Environment Variables

```bash
AZURE_BATCH_ENDPOINT=https://<account>.<region>.batch.azure.com  # Required for all auth methods
