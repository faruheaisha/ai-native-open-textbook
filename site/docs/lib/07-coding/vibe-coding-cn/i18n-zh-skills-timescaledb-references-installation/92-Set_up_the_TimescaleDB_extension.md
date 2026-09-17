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
pageSha256: "51f91dca280d643a9e8c209cf66917faadbb9c4aafd1195c6adb4782ac042a14"
contentMode: "local-full"
zh: ""
---

## Set up the TimescaleDB extension

When you have Postgres and TimescaleDB installed, connect to your instance and
set up the TimescaleDB extension.

1.  On your instance, at the command prompt, connect to the Postgres
    instance as the `postgres` superuser:

1.  At the prompt, create an empty database. For example, to create a database
    called `tsdb`:

1.  Connect to the database you created:

1.  Add the TimescaleDB extension:

You can check that the TimescaleDB extension is installed by using the `\dx`
command at the command prompt. It looks like this:

What next? [Try the key features offered by Tiger Data][try-timescale-features], see the [tutorials][tutorials],
interact with the data in your Tiger Cloud service using [your favorite programming language][connect-with-code], integrate
your Tiger Cloud service with a range of [third-party tools][integrations], plain old [Use Tiger Data products][use-timescale], or dive
into the [API reference][use-the-api].

===== PAGE: https://docs.tigerdata.com/self-hosted/install/installation-macos/ =====

**Examples:**

Example 1 (bash):
```bash
sudo -u postgres psql
```

Example 2 (sql):
```sql
CREATE database tsdb;
```

Example 3 (sql):
```sql
\c tsdb
```

Example 4 (sql):
```sql
CREATE EXTENSION IF NOT EXISTS timescaledb;
```
