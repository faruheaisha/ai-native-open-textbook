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
pageSha256: "8dace5c4c186cb20e529d8107e47ef7b596eb9fd50ccdb4864ecc8c354e21ff6"
contentMode: "local-full"
zh: ""
---

## TimescaleDB tuning tool

**URL:** llms-txt#timescaledb-tuning-tool

To help make configuring TimescaleDB a little easier, you can use the [`timescaledb-tune`][tstune]
tool. This tool handles setting the most common parameters to good values based
on your system. It accounts for memory, CPU, and Postgres version.
`timescaledb-tune` is packaged with the TimescaleDB binary releases as a
dependency, so if you installed TimescaleDB from a binary release (including
Docker), you should already have access to the tool. Alternatively, you can use
the `go install` command to install it:

The `timescaledb-tune` tool reads your system's `postgresql.conf` file and
offers interactive suggestions for your settings. Here is an example of the tool
running:

When you have answered the questions, the changes are written to your
`postgresql.conf` and take effect when you next restart.

If you are starting on a fresh instance and don't want to approve each group of
changes, you can automatically accept and append the suggestions to the end of
your `postgresql.conf` by using some additional flags when you run the tool:

===== PAGE: https://docs.tigerdata.com/self-hosted/configuration/postgres-config/ =====

**Examples:**

Example 1 (bash):
```bash
go install github.com/timescale/timescaledb-tune/cmd/timescaledb-tune@latest
```

Example 2 (bash):
```bash
Using postgresql.conf at this path:
/usr/local/var/postgres/postgresql.conf

Is this correct? [(y)es/(n)o]: y
Writing backup to:
/var/folders/cr/example/T/timescaledb_tune.backup202101071520

shared_preload_libraries needs to be updated
Current:
#shared_preload_libraries = 'timescaledb'
Recommended:
shared_preload_libraries = 'timescaledb'
Is this okay? [(y)es/(n)o]: y
success: shared_preload_libraries will be updated

Tune memory/parallelism/WAL and other settings? [(y)es/(n)o]: y
Recommendations based on 8.00 GB of available memory and 4 CPUs for PostgreSQL 12

Memory settings recommendations
Current:
shared_buffers = 128MB
#effective_cache_size = 4GB
#maintenance_work_mem = 64MB
#work_mem = 4MB
Recommended:
shared_buffers = 2GB
effective_cache_size = 6GB
maintenance_work_mem = 1GB
work_mem = 26214kB
Is this okay? [(y)es/(s)kip/(q)uit]:
```

Example 3 (bash):
```bash
timescaledb-tune --quiet --yes --dry-run >> /path/to/postgresql.conf
```
