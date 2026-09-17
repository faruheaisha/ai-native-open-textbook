---
title: "R2 SQL Configuration"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/r2-sql/configuration.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/r2-sql/configuration.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/r2-sql/configuration.md"
sourceSha256: "c7f20114aad49340e78cf493404fecbe53a8c835b428f3c52900f37c82ba83da"
pageSha256: "c7f20114aad49340e78cf493404fecbe53a8c835b428f3c52900f37c82ba83da"
contentMode: "local-full"
zh: ""
---

# R2 SQL Configuration

Setup and configuration for R2 SQL queries.

## Prerequisites

- R2 bucket with Data Catalog enabled
- API token with R2 permissions
- Wrangler CLI installed (for CLI queries)

## Enable R2 Data Catalog

R2 SQL queries Apache Iceberg tables in R2 Data Catalog. Must enable catalog on bucket first.

### Via Wrangler CLI

```bash
