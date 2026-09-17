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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/other.md"
sourceRel: "i18n/zh/skills/timescaledb/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/other.md"
sourceSha256: "b53764abbdaf16beaf22420ad0a62ac75d41058fb99968403f1bbd067870709e"
pageSha256: "0df153670be2d5bb541b106ba544bb9e9857584a838e8a11fd1e2ae0b8487f9e"
contentMode: "local-full"
zh: ""
---

#### pgvector HNSW query-time parameters

You can also set a parameter to control the accuracy vs. query speed trade-off at query time. The parameter is called `hnsw.ef_search`. This parameter specifies the size of the dynamic candidate list used during search. Defaults to 40. Higher values improve query accuracy while making the query slower.

You can set the value by running:

Before executing the query, note the [SET command](https://www.postgresql.org/docs/current/sql-set.html) applies to the entire session (database connection) from the point of execution. You can use a transaction-local variant using `LOCAL`:
