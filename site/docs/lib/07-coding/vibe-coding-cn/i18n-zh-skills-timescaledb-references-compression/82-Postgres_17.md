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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/compression.md"
sourceRel: "i18n/zh/skills/timescaledb/references/compression.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/compression.md"
sourceSha256: "488dd1571052c58332a963deed8b1dbd3633dc2724e884eef2085c4098409ec7"
pageSha256: "a384e289de0d178b4672d311a082e39e21645e61efc63e0c52c70bc9e2c149eb"
contentMode: "local-full"
zh: ""
---

### Postgres 17
All new Timescale Cloud services now come with Postgres 17.2, the latest version. Upgrades to Postgres 17 for services running on prior versions will be available in January.
Postgres 17 adds new capabilities and improvements to Timescale like:
* **System-wide Performance Improvements**. Significant performance boosts, particularly in high-concurrency workloads. Enhancements in the I/O layer, including improved Write-Ahead Log (WAL) processing, can result in up to a 2x increase in write throughput under heavy loads.
* **Enhanced JSON Support**. The new JSON_TABLE allows developers to convert JSON data directly into relational tables, simplifying the integration of JSON and SQL. The release also adds new SQL/JSON constructors and query functions, offering powerful tools to manipulate and query JSON data within a traditional relational schema.
* **More Flexible MERGE Operations**. The MERGE command now includes a RETURNING clause, making it easier to track and work with modified data. You can now also update views using MERGE, unlocking new use cases for complex queries and data manipulation.
