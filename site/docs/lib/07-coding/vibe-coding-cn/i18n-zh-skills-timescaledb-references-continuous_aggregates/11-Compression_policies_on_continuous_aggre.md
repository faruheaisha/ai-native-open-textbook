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
pageSha256: "ab811a1e3141cecbcc3c6e08fdd5af11ef427b0ec7dee53f7c79d273ca9a1962"
contentMode: "local-full"
zh: ""
---

## Compression policies on continuous aggregates

Before setting up a compression policy on a continuous aggregate, you should set
up a [refresh policy][refresh-policy]. The compression policy interval should be
set so that actively refreshed regions are not compressed. This is to prevent
refresh policies from failing. For example, consider a refresh policy like this:

With this kind of refresh policy, the compression policy needs the
`compress_after` parameter greater than the `start_offset` parameter of the
continuous aggregate policy:

===== PAGE: https://docs.tigerdata.com/use-timescale/compression/manual-compression/ =====

**Examples:**

Example 1 (sql):
```sql
ALTER MATERIALIZED VIEW cagg_name set (timescaledb.compress = true);
```

Example 2 (sql):
```sql
ALTER MATERIALIZED VIEW cagg_name set (timescaledb.compress = false);
```

Example 3 (sql):
```sql
SELECT decompress_chunk(c, true) FROM show_chunks('cagg_name') c;
```

Example 4 (sql):
```sql
SELECT add_continuous_aggregate_policy('cagg_name',
  start_offset => INTERVAL '30 days',
  end_offset => INTERVAL '1 day',
  schedule_interval => INTERVAL '1 hour');
```
