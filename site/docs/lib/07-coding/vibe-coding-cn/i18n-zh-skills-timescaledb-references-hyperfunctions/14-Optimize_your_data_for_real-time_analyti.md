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
pageSha256: "560f14d980bd302a1ddab2325cb405e2b4626e6262b3ef5a895edbebd626e9de"
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
   You can also connect to your serviceusing [psql][connect-using-psql].

1. **Add a policy to convert chunks to the columnstore at a specific time interval**

For example, convert data older than 8 days old to the columstore:
   
   See [add_columnstore_policy][add_columnstore_policy].

The data you imported for this tutorial is from 2016, it was already added to the columnstore by default. However,
   you get the idea. To see the space savings in action, follow [Try the key Tiger Data features][try-timescale-features].

Just to hit this one home, by converting cooling data to the columnstore, you have increased the speed of your analytical
queries by a factor of 10, and reduced storage by up to 90%.
