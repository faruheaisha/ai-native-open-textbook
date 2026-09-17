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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceRel: "i18n/zh/skills/timescaledb/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceSha256: "d89ee1583c1ea9641e14a8f176f27150301b48061cbde17049ed1e459820f0d5"
pageSha256: "9a2da47754b8a8a87366ea2d1af6bba8a161f6ed58799b52e98f540be46c55cd"
contentMode: "local-full"
zh: ""
---

## Create a hypertable

When you have created the relational table, you can create a hypertable.
Creating tables and indexes, altering tables, inserting data, selecting data,
and most other tasks are executed on the hypertable.

1.  Create a `CREATE TABLE` SQL statement for
    your hypertable. Notice how the hypertable has the compulsory time column:

1.  Create a statement, execute the query you created in the previous step:

The `by_range` and `by_hash` dimension builder is an addition to TimescaleDB 2.13.

1.  Execute the two statements you created, and commit your changes to the
    database:

You can insert data into your hypertables in several different ways. In this
section, you can insert single rows, or insert by batches of rows.

1.  Open a connection to the database, use prepared statements to formulate the
    `INSERT` SQL statement, then execute the statement:

If you want to insert a batch of rows by using a batching mechanism. In this
example, you generate some sample time-series data to insert into the
`sensor_data` hypertable:

1.  Insert batches of rows:

This section covers how to execute queries against your database.
