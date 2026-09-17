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
pageSha256: "ec974552d105b2a28f144bf09c59c66939f54b288c1ba4733ef904a9a11f8f5d"
contentMode: "local-full"
zh: ""
---

## Optional arguments

|Name|Type| Description                                                                                                                                                                                                            |
|-|-|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `force` | BOOLEAN | Force refresh every bucket in the time range between `window_start` and `window_end`, even when the bucket has already been refreshed. This can be very expensive when a lot of data is refreshed. Default is `FALSE`. |
| `refresh_newest_first` | BOOLEAN | Set to `FALSE` to refresh the oldest data first. Default is `TRUE`.                                                                                                                                                    |

===== PAGE: https://docs.tigerdata.com/api/continuous-aggregates/remove_policies/ =====

**Examples:**

Example 1 (sql):
```sql
CALL refresh_continuous_aggregate('conditions', '2020-01-01', '2020-02-01');
```

Example 2 (sql):
```sql
DO
$$
DECLARE
  refresh_interval INTERVAL = '12h'::INTERVAL;
  start_timestamp TIMESTAMPTZ = '2020-01-01T00:00:00Z';
  end_timestamp TIMESTAMPTZ = start_timestamp + refresh_interval;
BEGIN
  WHILE start_timestamp < '2020-02-01T00:00:00Z' LOOP
    CALL refresh_continuous_aggregate('conditions', start_timestamp, end_timestamp);
    COMMIT;
    RAISE NOTICE 'finished with timestamp %', end_timestamp;
    start_timestamp = end_timestamp;
    end_timestamp = end_timestamp + refresh_interval;
  END LOOP;
END
$$;
```

Example 3 (sql):
```sql
CALL refresh_continuous_aggregate('conditions', '2020-01-01', '2020-02-01', force => TRUE);
```
