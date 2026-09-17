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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hyperfunctions.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceSha256: "05b6221af2cc12adc9bdb276b06af82863fd7bcdfe4a673a0ed0f7f1a69d2184"
pageSha256: "9bce209221fb961e2f5e7ff0eeb1d8b3a06a519b6729bcba916d84a93a565fe3"
contentMode: "local-full"
zh: ""
---

## Optimize your data for real-time analytics

When TimescaleDB converts a chunk to the columnstore, it automatically creates a different schema for your
data. TimescaleDB creates and uses custom indexes to incorporate the `segmentby` and `orderby` parameters when
you write to and read from the columstore.

To increase the speed of your analytical queries by a factor of 10 and reduce storage costs by up to 90%, convert data
to the columnstore:

1. **Connect to your Tiger Cloud service**

In [Tiger Cloud Console][services-portal] open an [SQL editor][in-console-editors]. The in-Console editors display the query speed.
   You can also connect to your service using [psql][connect-using-psql].

1. **Add a policy to convert chunks to the columnstore at a specific time interval**

For example, 60 days after the data was added to the table:
   
   See [add_columnstore_policy][add_columnstore_policy].

1. **Faster analytical queries on data in the columnstore**

Now run the analytical query again:
   
   On this amount of data, this analytical query on data in the columnstore takes about 250ms.

Just to hit this one home, by converting cooling data to the columnstore, you have increased the speed of your analytical
queries by a factor of 10, and reduced storage by up to 90%.
