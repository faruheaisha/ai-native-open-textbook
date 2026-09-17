---
title: "R2 SQL Gotchas"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/r2-sql/gotchas.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/r2-sql/gotchas.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/r2-sql/gotchas.md"
sourceSha256: "9bc7ec882f2b04bdcf1c374b7e5ede67f47e7097b10d61c8b085aa4b35135efd"
pageSha256: "9bc7ec882f2b04bdcf1c374b7e5ede67f47e7097b10d61c8b085aa4b35135efd"
contentMode: "local-full"
zh: ""
---

# R2 SQL Gotchas

Limitations, troubleshooting, and common pitfalls for R2 SQL.

## Critical Limitations

### No Workers Binding

**Cannot call R2 SQL from Workers/Pages code** - no binding exists.

```typescript
// ❌ This doesn't exist
export default {
  async fetch(request, env) {
    const result = await env.R2_SQL.query("SELECT * FROM table");  // Not possible
    return Response.json(result);
  }
};
```

**Solutions:**
- HTTP API from external systems (not Workers)
- PyIceberg/Spark via r2-data-catalog REST API
- For Workers, use D1 or external databases

### ORDER BY Limitations

Can only order by:
1. **Partition key columns** - Always supported
2. **Aggregation functions** - Supported via shuffle strategy

**Cannot order by** regular non-partition columns.

```sql
-- ✅ Valid: ORDER BY partition key
SELECT * FROM logs.requests ORDER BY timestamp DESC LIMIT 100;

-- ✅ Valid: ORDER BY aggregation
SELECT region, SUM(amount) FROM sales.transactions
GROUP BY region ORDER BY SUM(amount) DESC;

-- ❌ Invalid: ORDER BY non-partition column
SELECT * FROM logs.requests ORDER BY user_id;

-- ❌ Invalid: ORDER BY alias (must repeat function)
SELECT region, SUM(amount) as total FROM sales.transactions
GROUP BY region ORDER BY total;  -- Use ORDER BY SUM(amount)
```

Check partition spec: `DESCRIBE namespace.table_name`

## SQL Feature Limitations

| Feature | Supported | Notes |
|---------|-----------|-------|
| SELECT, WHERE, GROUP BY, HAVING | ✅ | Standard support |
| COUNT, SUM, AVG, MIN, MAX | ✅ | Standard aggregations |
| ORDER BY partition/aggregation | ✅ | See above |
| LIMIT | ✅ | Max 10,000 |
| Column aliases | ❌ | No AS alias |
| Expressions in SELECT | ❌ | No col1 + col2 |
| ORDER BY non-partition | ❌ | Fails at runtime |
| JOINs, subqueries, CTEs | ❌ | Denormalize at write time |
| Window functions, UNION | ❌ | Use external engines |
| INSERT/UPDATE/DELETE | ❌ | Use PyIceberg/Pipelines |
| Nested columns, arrays, JSON | ❌ | Flatten at write time |

**Workarounds:**
- No JOINs: Denormalize data or use Spark/PyIceberg
- No subqueries: Split into multiple queries
- No aliases: Accept generated names, transform in app

## Common Errors

### "Column not found"
**Cause:** Typo, column doesn't exist, or case mismatch  
**Solution:** `DESCRIBE namespace.table_name` to check schema

### "Type mismatch"
```sql
-- ❌ Wrong types
WHERE status = '200'              -- string instead of integer
WHERE timestamp > '2025-01-01'    -- missing time/timezone

-- ✅ Correct types
WHERE status = 200
WHERE timestamp > '2025-01-01T00:00:00Z'
```

### "ORDER BY column not in partition key"
**Cause:** Ordering by non-partition column  
**Solution:** Use partition key, aggregation, or remove ORDER BY. Check: `DESCRIBE table`

### "Token authentication failed"
```bash
# Check/set token
echo $WRANGLER_R2_SQL_AUTH_TOKEN
