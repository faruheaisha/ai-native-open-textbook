---
title: "Azure Cache for Redis Recipe — REFERENCE ONLY"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/redis/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/redis/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/redis/README.md"
sourceSha256: "2cb7b0364d6afcb40f89e46aca5d6bb4417cea8f6696e2f07013c880c1881e9d"
pageSha256: "2cb7b0364d6afcb40f89e46aca5d6bb4417cea8f6696e2f07013c880c1881e9d"
contentMode: "local-full"
zh: ""
---

# Azure Cache for Redis Recipe — REFERENCE ONLY

Adds Azure Cache for Redis integration to an App Service base template.

## Overview

This recipe composes with a Web API or Web App base template to add distributed caching with Azure Cache for Redis. Uses managed identity for passwordless access.

## Integration Type

| Aspect | Value |
|--------|-------|
| **Service** | Azure Cache for Redis |
| **Auth** | Managed identity (Entra ID access policy) |
| **SKU** | Basic C0 (dev) / Standard C1+ (production) |
| **Protocol** | Redis 6.0+ with TLS |
| **Local Auth** | Disabled — Entra ID only |

## Composition Steps
