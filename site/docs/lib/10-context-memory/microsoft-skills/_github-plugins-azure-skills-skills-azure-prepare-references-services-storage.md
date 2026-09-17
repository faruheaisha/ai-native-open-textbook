---
title: "Azure Storage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/storage/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/storage/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/storage/README.md"
sourceSha256: "ae170b4a5bc4050a9eadaa961d09d3845940a88b5834cc7457565188683c73be"
pageSha256: "ae170b4a5bc4050a9eadaa961d09d3845940a88b5834cc7457565188683c73be"
contentMode: "local-full"
zh: ""
---

# Azure Storage

Scalable cloud storage for blobs, files, queues, and tables.

## When to Use

- Blob storage (files, images, videos)
- File shares (SMB/NFS)
- Queue storage (simple messaging)
- Table storage (NoSQL key-value)
- Static website hosting

## Required Supporting Resources

| Resource | Purpose |
|----------|---------|
| None required | Storage is self-contained |
| Key Vault | Store connection strings |
| Private Endpoint | Secure access (optional) |

## SKU Selection

| SKU | Replication | Use Case |
|-----|-------------|----------|
| Standard_LRS | Local (3 copies) | Dev/test, non-critical |
| Standard_ZRS | Zone-redundant | Production, regional HA |
| Standard_GRS | Geo-redundant | DR requirements |
| Premium_LRS | Premium SSD | High performance |

## Storage Types

| Type | Best For |
|------|----------|
| Blob | Files, images, videos, backups, logs |
| Queue | Simple message queuing, decoupling |
| Table | NoSQL key-value data |
| File Share | Lift-and-shift, SMB/NFS access |

## Access Tiers

| Tier | Use Case |
|------|----------|
| Hot | Frequent access |
| Cool | Infrequent access (30+ days) |
| Archive | Rare access (180+ days) |

## Environment Variables

| Variable | Value |
|----------|-------|
| `AZURE_STORAGE_CONNECTION_STRING` | Connection string (Key Vault) |
| `AZURE_STORAGE_ACCOUNT` | Account name |
| `AZURE_STORAGE_CONTAINER` | Container name |

## References

- [Bicep Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-storage-bicep)
- [Access Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-storage-access)
