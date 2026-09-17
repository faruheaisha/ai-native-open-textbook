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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
sourceRel: "i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
sourceSha256: "2fc13047cc1286afec41d05f8c09c0c452219a02da65b4ba1b4a06c4663c93ed"
pageSha256: "301dd1fa2cea66f8a2ca2c14be5d8d9eae3daa1910c01cc3e20043e420ca6f78"
contentMode: "local-full"
zh: ""
---

## About data retention with continuous aggregates

**URL:** llms-txt#about-data-retention-with-continuous-aggregates

**Contents:**
- Data retention on a continuous aggregate itself

You can downsample your data by combining a data retention policy with
[continuous aggregates][continuous_aggregates]. If you set your refresh policies
correctly, you can delete old data from a hypertable without deleting it from
any continuous aggregates. This lets you save on raw data storage while keeping
summarized data for historical analysis.

To keep your aggregates while dropping raw data, you must be careful about
refreshing your aggregates. You can delete raw data from the underlying table
without deleting data from continuous aggregates, so long as you don't refresh
the aggregate over the deleted data. When you refresh a continuous aggregate,
TimescaleDB updates the aggregate based on changes in the raw data for the
refresh window. If it sees that the raw data was deleted, it also deletes the
aggregate data. To prevent this, make sure that the aggregate's refresh window
doesn't overlap with any deleted data. For more information, see the following
example.

As an example, say that you add a continuous aggregate to a `conditions`
hypertable that stores device temperatures:

This creates a `conditions_summary_daily` aggregate which stores the daily
temperature per device. The aggregate refreshes every day. Every time it
refreshes, it updates with any data changes from 7 days ago to 1 day ago.

You should **not** set a 24-hour retention policy on the `conditions`
hypertable. If you do, chunks older than 1 day are dropped. Then the aggregate
refreshes based on data changes. Since the data change was to delete data older
than 1 day, the aggregate also deletes the data. You end up with no data in the
`conditions_summary_daily` table.

To fix this, set a longer retention policy, for example 30 days:

Now, chunks older than 30 days are dropped. But when the aggregate refreshes, it
doesn't look for changes older than 30 days. It only looks for changes between 7
days and 1 day ago. The raw hypertable still contains data for that time period.
So your aggregate retains the data.
