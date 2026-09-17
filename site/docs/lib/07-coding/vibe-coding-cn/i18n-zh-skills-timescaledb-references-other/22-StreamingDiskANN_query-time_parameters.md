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
pageSha256: "f578f4e51859da2c4a6ef34e2c52cb7a7206b8ed1cc5ba98adb7e138db203d5c"
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

Note the [SET command](https://www.postgresql.org/docs/current/sql-set.html) applies to the entire session (database connection) from the point of execution. You can use a transaction-local variant using `LOCAL` which will
be reset after the end of the transaction:
