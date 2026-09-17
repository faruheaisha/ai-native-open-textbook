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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "0e8f3d6f6ad398644f3e6d82db4ef7063bab0fd053ee6a275cc9b4b0f9ae1cb0"
contentMode: "local-full"
zh: ""
---

## trim_to()

**URL:** llms-txt#trim_to()

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/heartbeat_agg/intro/ =====

Given a series of timestamped heartbeats and a liveness interval, determine the
overall liveness of a system. This aggregate can be used to report total uptime
or downtime as well as report the time ranges where the system was live or dead.

It's also possible to combine multiple heartbeat aggregates to determine the
overall health of a service. For example, the heartbeat aggregates from a
primary and standby server could be combined to see if there was ever a window
where both machines were down at the same time.

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/heartbeat_agg/dead_ranges/ =====
