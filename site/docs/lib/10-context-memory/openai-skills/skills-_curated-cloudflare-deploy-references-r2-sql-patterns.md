---
title: "R2 SQL Patterns"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/r2-sql/patterns.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/r2-sql/patterns.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/r2-sql/patterns.md"
sourceSha256: "bc836b21abaac340720968be103d607b9ee70e81c55505af02d849a8fd62a4c2"
pageSha256: "bc836b21abaac340720968be103d607b9ee70e81c55505af02d849a8fd62a4c2"
contentMode: "local-full"
zh: ""
---

# R2 SQL Patterns

Common patterns, use cases, and integration examples for R2 SQL.

## Wrangler CLI Query

```bash
# Basic query
npx wrangler r2 sql query "my-bucket" "SELECT * FROM default.logs LIMIT 10"

# Multi-line query
npx wrangler r2 sql query "my-bucket" "
  SELECT status, COUNT(*), AVG(response_time)
  FROM logs.http_requests
  WHERE timestamp >= '2025-01-01T00:00:00Z'
  GROUP BY status
  ORDER BY COUNT(*) DESC
  LIMIT 100
"

# Use environment variable
export R2_SQL_WAREHOUSE="my-bucket"
npx wrangler r2 sql query "$R2_SQL_WAREHOUSE" "SELECT * FROM default.logs"
```

## HTTP API Query

For programmatic access from external systems (not Workers - see gotchas.md).

```bash
curl -X POST https://api.cloudflare.com/client/v4/accounts/{account_id}/r2/sql/query \
