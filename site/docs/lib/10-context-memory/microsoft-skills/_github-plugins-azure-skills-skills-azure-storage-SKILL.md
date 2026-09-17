---
title: "Azure Storage Services"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-storage/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-storage/SKILL.md"
sourceSha256: "a032c55a4414a1aa3ea40245806944b3e497ee094be04f933a049018fbe8da81"
pageSha256: "a032c55a4414a1aa3ea40245806944b3e497ee094be04f933a049018fbe8da81"
contentMode: "local-full"
zh: ""
---

# Azure Storage Services

## Services

| Service | Use When | MCP Tools | CLI |
|---------|----------|-----------|-----|
| Blob Storage | Objects, files, backups, static content | `azure__storage` | `az storage blob` |
| File Shares | SMB file shares, lift-and-shift | - | `az storage file` |
| Queue Storage | Async messaging, task queues | - | `az storage queue` |
| Table Storage | NoSQL key-value (consider Cosmos DB) | - | `az storage table` |
| Data Lake | Big data analytics, hierarchical namespace | - | `az storage fs` |

## MCP Server (Preferred)

When Azure MCP is enabled:

- `azure__storage` with command `storage_account_list` - List storage accounts
- `azure__storage` with command `storage_container_list` - List containers in account
- `azure__storage` with command `storage_blob_list` - List blobs in container
- `azure__storage` with command `storage_blob_get` - Download blob content
- `azure__storage` with command `storage_blob_put` - Upload blob content

**If Azure MCP is not enabled:** Run `/azure:setup` or enable via `/mcp`.

## CLI Fallback

```bash
# List storage accounts
az storage account list --output table

# List containers
az storage container list --account-name ACCOUNT --output table

# List blobs
az storage blob list --account-name ACCOUNT --container-name CONTAINER --output table

# Download blob
az storage blob download --account-name ACCOUNT --container-name CONTAINER --name BLOB --file LOCAL_PATH

# Upload blob
az storage blob upload --account-name ACCOUNT --container-name CONTAINER --name BLOB --file LOCAL_PATH
```

## Storage Account Tiers

| Tier | Use Case | Performance |
|------|----------|-------------|
| Standard | General purpose, backup | Milliseconds |
| Premium | Databases, high IOPS | Sub-millisecond |

## Blob Access Tiers

| Tier | Access Frequency | Cost |
|------|-----------------|------|
| Hot | Frequent | Higher storage, lower access |
| Cool | Infrequent (30+ days) | Lower storage, higher access |
| Cold | Rare (90+ days) | Lower still |
| Archive | Rarely (180+ days) | Lowest storage, rehydration required |

## Redundancy Options

| Type | Durability | Use Case |
|------|------------|----------|
| LRS | 11 nines | Dev/test, recreatable data |
| ZRS | 12 nines | Regional high availability |
| GRS | 16 nines | Disaster recovery |
| GZRS | 16 nines | Best durability |

## Service Details

For deep documentation on specific services:

- Blob storage patterns and lifecycle -> [Blob Storage documentation](https://learn.microsoft.com/azure/storage/blobs/storage-blobs-overview)
- File shares and Azure File Sync -> [Azure Files documentation](https://learn.microsoft.com/azure/storage/files/storage-files-introduction)
- Queue patterns and poison handling -> [Queue Storage documentation](https://learn.microsoft.com/azure/storage/queues/storage-queues-introduction)

## SDK Quick References

For building applications with Azure Storage SDKs, see the condensed guides:

- **Blob Storage**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-storage-references-sdk-azure-storage-blob-py) | [TypeScript](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-storage-references-sdk-azure-storage-blob-ts) | [Java](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-storage-references-sdk-azure-storage-blob-java) | [Rust](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-storage-references-sdk-azure-storage-blob-rust)
- **Queue Storage**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-storage-references-sdk-azure-storage-queue-py) | [TypeScript](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-storage-references-sdk-azure-storage-queue-ts)
- **File Shares**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-storage-references-sdk-azure-storage-file-share-py) | [TypeScript](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-storage-references-sdk-azure-storage-file-share-ts)
- **Data Lake**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-storage-references-sdk-azure-storage-file-datalake-py)
- **Tables**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-storage-references-sdk-azure-data-tables-py) | [Java](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-storage-references-sdk-azure-data-tables-java)

For full package listing across all languages, see [SDK Usage Guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-storage-references-sdk-usage).

## Azure SDKs

For building applications that interact with Azure Storage programmatically, Azure provides SDK packages in multiple languages (.NET, Java, JavaScript, Python, Go, Rust). See [SDK Usage Guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-storage-references-sdk-usage) for package names, installation commands, and quick start examples.
