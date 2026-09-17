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
pageSha256: "29b99879dd183e7691d7869e0d640083b17c005ddf860e2c6c5acd01d435f78a"
contentMode: "local-full"
zh: ""
---

## Create a relational table

In this section, you create a table called `sensors` which holds the ID, type,
and location of your fictional sensors. Additionally, you create a hypertable
called `sensor_data` which holds the measurements of those sensors. The
measurements contain the time, sensor_id, temperature reading, and CPU
percentage of the sensors.

1.  Compose a string which contains the SQL statement to create a relational
    table. This example creates a table called `sensors`, with columns `id`,
    `type` and `location`:

1.  Create a statement, execute the query you created in the previous step, and
    check that the table was created successfully:
