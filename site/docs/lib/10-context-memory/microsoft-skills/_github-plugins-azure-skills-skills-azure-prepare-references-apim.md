---
title: "APIM Deployment Guide"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/apim.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/apim.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/apim.md"
sourceSha256: "bd5644658deccf0f422ed1e98d0bccc9ddb8d91d09dc07f90d743bfd00dd3511"
pageSha256: "bd5644658deccf0f422ed1e98d0bccc9ddb8d91d09dc07f90d743bfd00dd3511"
contentMode: "local-full"
zh: ""
---

# APIM Deployment Guide

Deploy Azure API Management (APIM) as part of your Azure infrastructure.

> **For AI Gateway configuration** (policies, backends, semantic caching), use the **azure-aigateway** skill after deployment.

---

## When to Deploy APIM

| Scenario | APIM Tier | Notes |
|----------|-----------|-------|
| AI Gateway for model governance | Standard v2 or Premium v2 | Semantic caching requires v2 SKUs |
| API consolidation | Standard v2 | Single entry point for microservices |
| MCP tool hosting | Standard v2 | Rate limiting and auth for AI tools |
| Development / Testing | Developer | Not for production |
| High-volume production | Premium v2 | Multi-region, higher limits |

---

## Quick Deploy (Azure CLI)

### 1. Create APIM Instance

```bash
az apim create \
