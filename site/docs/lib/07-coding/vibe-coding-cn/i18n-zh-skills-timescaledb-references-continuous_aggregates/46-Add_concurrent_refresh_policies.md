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
pageSha256: "c73d2c842be049f3b22b88d9038aab92c478beb688e0a3baae04fae396590e2a"
contentMode: "local-full"
zh: ""
---

## Add concurrent refresh policies

You can add concurrent refresh policies on each continuous aggregate, as long as their
start and end offsets don't overlap. For example, to backfill data into older chunks you
set up one policy that refreshes recent data, and another that refreshes backfilled data.

The first policy in this example is keeps the continuous aggregate up to date with data that was
inserted in the past day. Any data that was inserted or updated for previous days is refreshed by
the second policy.

1. Connect to your Tiger Cloud service.

In [Tiger Cloud Console][services-portal] open an [SQL editor][in-console-editors]. You can also connect to your service using [psql][connect-using-psql].

1. Create a new policy on `conditions_summary_daily`
    to refresh the continuous aggregate with recently inserted data which runs
    hourly:

2.  At the `psql` prompt, create a concurrent policy on
    `conditions_summary_daily` to refresh the continuous aggregate with
    backfilled data:
