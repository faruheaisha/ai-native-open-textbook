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
pageSha256: "605bd9efd848dce053bfaf46f9f3070e1643020c63b4516dc285f597752ef016"
contentMode: "local-full"
zh: ""
---

#### StreamingDiskANN query-time parameters

You can also set two parameters to control the accuracy vs. query speed trade-off at query time. We suggest adjusting `diskann.query_rescore` to fine-tune accuracy.

| Parameter name   | Description                                                                                                                                                    | Default value |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `diskann.query_search_list_size` | The number of additional candidates considered during the graph search. | 100
| `diskann.query_rescore` | The number of elements rescored (0 to disable rescoring) | 50

You can set the value by using `SET` before executing a query. For example:

```sql
SET diskann.query_rescore = 400;
```

Note the [SET command](https://www.postgresql.org/docs/current/sql-set.html) applies to the entire session (database connection) from the point of execution. You can use a transaction-local variant using `LOCAL` which will
be reset after the end of the transaction:

```sql
BEGIN;
SET LOCAL diskann.query_search_list_size= 10;
SELECT * FROM document_embedding ORDER BY embedding <=> $1 LIMIT 10
COMMIT;
```
