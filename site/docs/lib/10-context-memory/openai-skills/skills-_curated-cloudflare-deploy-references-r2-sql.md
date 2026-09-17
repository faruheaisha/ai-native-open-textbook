---
title: "Cloudflare R2 SQL Skill Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/r2-sql/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/r2-sql/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/r2-sql/README.md"
sourceSha256: "2e131d74778370969ae905ccc904adee9e4d7ff8abfe7269ebee0a8beda90f36"
pageSha256: "2e131d74778370969ae905ccc904adee9e4d7ff8abfe7269ebee0a8beda90f36"
contentMode: "local-full"
zh: ""
---

# Cloudflare R2 SQL Skill Reference

Expert guidance for Cloudflare R2 SQL - serverless distributed query engine for Apache Iceberg tables.

## Reading Order

**New to R2 SQL?** Start here:
1. Read "What is R2 SQL?" and "When to Use" below
2. [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-sql-configuration) - Enable catalog, create tokens
3. [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-sql-patterns) - Wrangler CLI and integration examples
4. [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-sql-api) - SQL syntax and query reference
5. [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-sql-gotchas) - Limitations and troubleshooting

**Quick reference?** Jump to:
- [Run a query via Wrangler](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-sql-patterns#wrangler-cli-query)
- [SQL syntax reference](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-sql-api#sql-syntax)
- [ORDER BY limitations](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2-sql-gotchas#order-by-limitations)

## What is R2 SQL?

R2 SQL is Cloudflare's **serverless distributed analytics query engine** for querying Apache Iceberg tables in R2 Data Catalog. Features:

- **Serverless** - No clusters to manage, no infrastructure
- **Distributed** - Leverages Cloudflare's global network for parallel execution
- **SQL interface** - Familiar SQL syntax for analytics queries
- **Zero egress fees** - Query from any cloud/region without data transfer costs
- **Open beta** - Free during beta (standard R2 storage costs apply)

### What is Apache Iceberg?

Open table format for large-scale analytics datasets in object storage:
- **ACID transactions** - Safe concurrent reads/writes
- **Metadata optimization** - Fast queries without full table scans
- **Schema evolution** - Add/rename/drop columns without rewrites
- **Partitioning** - Organize data for efficient pruning

## When to Use

**Use R2 SQL for:**
- **Log analytics** - Query application/system logs with WHERE filters and aggregations
- **BI dashboards** - Generate reports from large analytical datasets
- **Fraud detection** - Analyze transaction patterns with GROUP BY/HAVING
- **Multi-cloud analytics** - Query data from any cloud without egress fees
- **Ad-hoc exploration** - Run SQL queries on Iceberg tables via Wrangler CLI

**Don't use R2 SQL for:**
- **Workers/Pages runtime** - R2 SQL has no Workers binding, use HTTP API from external systems
- **Real-time queries (<100ms)** - Optimized for analytical batch queries, not OLTP
- **Complex joins/CTEs** - Limited SQL feature set (no JOINs, subqueries, CTEs currently)
- **Small datasets (<1GB)** - Setup overhead not justified

## Decision Tree: Need to Query R2 Data?

```
Do you need to query structured data in R2?
├─ YES, data is in Iceberg tables
│  ├─ Need SQL interface? → Use R2 SQL (this reference)
│  ├─ Need Python API? → See r2-data-catalog reference (PyIceberg)
│  └─ Need other engine? → See r2-data-catalog reference (Spark, Trino, etc.)
│
├─ YES, but not in Iceberg format
│  ├─ Streaming data? → Use Pipelines to write to Data Catalog, then R2 SQL
│  └─ Static files? → Use PyIceberg to create Iceberg tables, then R2 SQL
│
└─ NO, just need object storage → Use R2 reference (not R2 SQL)
```

## Architecture Overview

**Query Planner:**
- Top-down metadata investigation with multi-layer pruning
- Partition-level, column-level, and row-group pruning
- Streaming pipeline - execution starts before planning completes
- Early termination with LIMIT - stops when result complete

**Query Execution:**
- Coordinator distributes work to workers across Cloudflare network
- Workers run Apache DataFusion for parallel query execution
- Parquet column pruning - reads only required columns
- Ranged reads from R2 for efficiency

**Aggregation Strategies:**
- Scatter-gather - simple aggregations (SUM, COUNT, AVG)
- Shuffling - ORDER BY/HAVING on aggregates via hash partitioning

## Quick Start

```bash
# 1. Enable R2 Data Catalog on bucket
npx wrangler r2 bucket catalog enable my-bucket

# 2. Create API token (Admin Read & Write)
# Dashboard: R2 → Manage API tokens → Create API token

# 3. Set environment variable
