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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/installation.md"
sourceRel: "i18n/zh/skills/timescaledb/references/installation.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/installation.md"
sourceSha256: "4a7b57ccaa9a9f7e4c22cc7a4a1dcd5ddf03b101b4f1914bcb18219176632044"
pageSha256: "801e4a27a6ea61e2671379094ccff094cc02ff86a02fd87fe7d81dd989ed5ff2"
contentMode: "local-full"
zh: ""
---

## Migrate your data to a service

To move your data from self-hosted TimescaleDB instance to a service, run the following commands from your migration
machine:

1. **Take offline the applications that connect to the source self-hosted TimescaleDB instance**

The duration of migration is proportional to the amount of data stored in your database. By
   disconnecting your app from your database, you avoid possible data loss.

1. **Set your connection strings**

These variables hold the connection information for the source self-hosted TimescaleDB instance and the target service:

1. **Dump the data from your source Tiger Cloud service**

1. **Put your target service in the right state for restoring**

1. **Upload your data to the target service**

The `--jobs`  option specifies the number of CPUs to use to dump and restore the database concurrently.

1. **Return your target service to normal operations**

1.  Connect to your new database and update your table statistics by running
    [`ANALYZE`]   [analyze] on your entire dataset:

To migrate from multiple databases, you repeat this migration procedure one database after another.

If you see the following errors during migration, you can safely ignore them. The migration still runs
successfully.

===== PAGE: https://docs.tigerdata.com/mst/restapi/ =====

**Examples:**

Example 1 (bash):
```bash
export SOURCE="postgres://<user>:<password>@<source host>:<source port>/<db_name>"
   export TARGET="postgres://tsdbadmin:<password>@<host>:<port>/defaultdb?sslmode=require"
```

Example 2 (bash):
```bash
pg_dump -d "source" --no-owner -Fc -v -f dump.bak
```

Example 3 (bash):
```bash
psql -d "target" -c "SELECT timescaledb_pre_restore();"
```

Example 4 (bash):
```bash
pg_restore -d "target" --jobs 4 -Fc dump.bak
```
