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
pageSha256: "6cbac3b9fb8164a4f099a7baf89369d5c28e489e40514908be467eebce7a745b"
contentMode: "local-full"
zh: ""
---

## timescaledb_pre_restore()

Perform the required operations so that you can restore the database using `pg_restore`. Specifically, this sets the `timescaledb.restoring` GUC to `on` and stops any background workers which could have been performing tasks.

The background workers are stopped until the [timescaledb_post_restore()](#timescaledb_post_restore) function is run, after the restore operation is complete.

For more information, see [Migrate using pg_dump and pg_restore].

After using `timescaledb_pre_restore()`, you need to run [`timescaledb_post_restore()`](#timescaledb_post_restore) before you can use the database normally.

Prepare to restore the database:

===== PAGE: https://docs.tigerdata.com/api/api-tag-overview/ =====

**Examples:**

Example 1 (bash):
```bash
psql [your connect flags] -d your_timescale_db < dump_meta_data.sql > dumpfile.txt
```

Example 2 (sql):
```sql
SELECT get_telemetry_report();
```

Example 3 (sql):
```sql
SELECT timescaledb_post_restore();
```

Example 4 (sql):
```sql
SELECT timescaledb_pre_restore();
```
