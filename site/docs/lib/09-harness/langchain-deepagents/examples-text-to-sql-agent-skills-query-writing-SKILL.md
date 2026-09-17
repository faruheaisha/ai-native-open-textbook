---
title: "Query Writing Skill"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/text-to-sql-agent/skills/query-writing/SKILL.md"
sourceRel: "examples/text-to-sql-agent/skills/query-writing/SKILL.md"
rawUrl: "/raw/09-harness/langchain-deepagents/examples/text-to-sql-agent/skills/query-writing/SKILL.md"
sourceSha256: "b88865cfc75c164d71ee55f93aad674f73450347808ee1f0c1de6225bf19ca38"
pageSha256: "b88865cfc75c164d71ee55f93aad674f73450347808ee1f0c1de6225bf19ca38"
contentMode: "local-full"
zh: ""
---

# Query Writing Skill

## Workflow for Simple Queries

For straightforward questions about a single table:

1. **Identify the table** - Which table has the data?
2. **Get the schema** - Use `sql_db_schema` to see columns
3. **Write the query** - SELECT relevant columns with WHERE/LIMIT/ORDER BY
4. **Execute** - Run with `sql_db_query`
5. **Format answer** - Present results clearly

## Workflow for Complex Queries

For questions requiring multiple tables:

### 1. Plan Your Approach
**Use `write_todos` to break down the task:**
- Identify all tables needed
- Map relationships (foreign keys)
- Plan JOIN structure
- Determine aggregations

### 2. Examine Schemas
Use `sql_db_schema` for EACH table to find join columns and needed fields.

### 3. Construct Query
- SELECT - Columns and aggregates
- FROM/JOIN - Connect tables on FK = PK
- WHERE - Filters before aggregation
- GROUP BY - All non-aggregate columns
- ORDER BY - Sort meaningfully
- LIMIT - Default 5 rows

### 4. Validate and Execute
Check all JOINs have conditions, GROUP BY is correct, then run query.

## Example: Revenue by Country
```sql
SELECT
    c.Country,
    ROUND(SUM(i.Total), 2) as TotalRevenue
FROM Invoice i
INNER JOIN Customer c ON i.CustomerId = c.CustomerId
GROUP BY c.Country
ORDER BY TotalRevenue DESC
LIMIT 5;
```

## Error Recovery

If a query fails or returns unexpected results:
1. **Empty results** — Verify column names and WHERE conditions against the schema; check for case sensitivity or NULL values
2. **Syntax error** — Re-examine JOINs, GROUP BY completeness, and alias references
3. **Timeout** — Add stricter WHERE filters or LIMIT to reduce result set, then refine

## Quality Guidelines

- Query only relevant columns (not SELECT *)
- Always apply LIMIT (5 default)
- Use table aliases for clarity
- For complex queries: use write_todos to plan
- Never use DML statements (INSERT, UPDATE, DELETE, DROP)
