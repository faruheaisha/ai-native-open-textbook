---
title: "Cloudflare R2 Data Catalog Skill Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/r2-data-catalog/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/r2-data-catalog/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/r2-data-catalog/README.md"
sourceSha256: "e1c0c6bfbdba3cfd2e9ab4d051cc88f947d8656e89d8912b998bfd7fcb80b762"
pageSha256: "e1c0c6bfbdba3cfd2e9ab4d051cc88f947d8656e89d8912b998bfd7fcb80b762"
contentMode: "local-full"
zh: ""
---

# Cloudflare R2 Data Catalog Skill Reference

Expert guidance for Cloudflare R2 Data Catalog - Apache Iceberg catalog built into R2 buckets.

## Reading Order

**New to R2 Data Catalog?** Start here:
1. Read "What is R2 Data Catalog?" and "When to Use" below
2. [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-data-catalog-configuration) - Enable catalog, create tokens
3. [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-data-catalog-patterns) - PyIceberg setup and common patterns
4. [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-data-catalog-api) - REST API reference as needed
5. [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-data-catalog-gotchas) - Troubleshooting when issues arise

**Quick reference?** Jump to:
- [Enable catalog on bucket](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-data-catalog-configuration#enable-catalog-on-bucket)
- [PyIceberg connection pattern](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-data-catalog-patterns#pyiceberg-connection-pattern)
- [Permission errors](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-data-catalog-gotchas#permission-errors)

## What is R2 Data Catalog?

R2 Data Catalog is a **managed Apache Iceberg REST catalog** built directly into R2 buckets. It provides:

- **Apache Iceberg tables** - ACID transactions, schema evolution, time-travel queries
- **Zero-egress costs** - Query from any cloud/region without data transfer fees
- **Standard REST API** - Works with Spark, PyIceberg, Snowflake, Trino, DuckDB
- **No infrastructure** - Fully managed, no catalog servers to run
- **Public beta** - Available to all R2 subscribers, no extra cost beyond R2 storage

### What is Apache Iceberg?

Open table format for analytics datasets in object storage. Features:
- **ACID transactions** - Safe concurrent reads/writes
- **Metadata optimization** - Fast queries without full scans
- **Schema evolution** - Add/rename/delete columns without rewrites
- **Time-travel** - Query historical snapshots
- **Partitioning** - Organize data for efficient queries

## When to Use

**Use R2 Data Catalog for:**
- **Log analytics** - Store and query application/system logs
- **Data lakes/warehouses** - Analytical datasets queried by multiple engines
- **BI pipelines** - Aggregate data for dashboards and reports
- **Multi-cloud analytics** - Share data across clouds without egress fees
- **Time-series data** - Event streams, metrics, sensor data

**Don't use for:**
- **Transactional workloads** - Use D1 or external database instead
- **Sub-second latency** - Iceberg optimized for batch/analytical queries
- **Small datasets (<1GB)** - Setup overhead not worth it
- **Unstructured data** - Store files directly in R2, not as Iceberg tables

## Architecture

```
┌─────────────────────────────────────────────────┐
│  Query Engines                                  │
│  (PyIceberg, Spark, Trino, Snowflake, DuckDB)  │
└────────────────┬────────────────────────────────┘
                 │
                 │ REST API (OAuth2 token)
                 ▼
┌─────────────────────────────────────────────────┐
│  R2 Data Catalog (Managed Iceberg REST Catalog)│
│  • Namespace/table metadata                     │
│  • Transaction coordination                     │
│  • Snapshot management                          │
└────────────────┬────────────────────────────────┘
                 │
                 │ Vended credentials
                 ▼
┌─────────────────────────────────────────────────┐
│  R2 Bucket Storage                              │
│  • Parquet data files                           │
│  • Metadata files                               │
│  • Manifest files                               │
└─────────────────────────────────────────────────┘
```

**Key concepts:**
