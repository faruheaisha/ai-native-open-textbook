---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "fde1c1673497ee6c2cb47ea7244bd454d0c3023c33b17f231f03c51460fcc4bd"
contentMode: "local-full"
zh: ""
---

#### pgvector ivfflat query-time parameters

You can also set a parameter to control the accuracy vs. query speed tradeoff at query time. The parameter is called `ivfflat.probes`. This parameter specifies the number of clusters searched during a query. It is recommended to set this parameter to `sqrt(lists)` where lists is the parameter used above during index creation. Higher values improve query accuracy while making the query slower.

You can set the value by running:

```sql
SET ivfflat.probes = 100;
```

Before executing the query, note the [SET command](https://www.postgresql.org/docs/current/sql-set.html) applies to the entire session (database connection) from the point of execution. You can use a transaction-local variant using `LOCAL`:

```sql
BEGIN;
SET LOCAL ivfflat.probes = 100;
SELECT * FROM document_embedding ORDER BY embedding <=> $1 LIMIT 10
COMMIT;
```
