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
pageSha256: "b1674fd284740923aedb1679451cb9dbb0cbb0008ea25acc6ae5346aedf3dbf1"
contentMode: "local-full"
zh: ""
---

## Execute queries on TimescaleDB

1.  Define the SQL query you'd like to run on the database. This example
    combines time-series and relational data. It returns the average values for
    every 15 minute interval for sensors with specific type and location.

1.  Execute the query with the prepared statement and read out the result set for
   all `a`-type sensors located on the `floor`:

If the command is successful, you'll see output like this:

Now that you're able to connect, read, and write to a TimescaleDB instance from
your Java application, and generate the scaffolding necessary to build a new
application from an existing TimescaleDB instance, be sure to check out these
advanced TimescaleDB tutorials:

*   [Continuous Aggregates][continuous-aggregates]
*   [Migrate Your own Data][migrate]
