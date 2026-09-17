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
pageSha256: "6f652fc3527c0caffaf20a5090d517ae0d5647a4856be450013e6c4c7259773c"
contentMode: "local-full"
zh: ""
---

## Uninstalling TimescaleDB using MacPorts

1.  At the `psql` prompt, remove the TimescaleDB extension:

1.  At the command prompt, remove `timescaledb` from `shared_preload_libraries`
    in the `postgresql.conf` configuration file:

1.  Save the changes to the `postgresql.conf` file.

1.  Restart Postgres:

1.  Check that the TimescaleDB extension is uninstalled by using the `\dx`
    command at the `psql` prompt. Output is similar to:

1.  Uninstall TimescaleDB and the related dependencies:

===== PAGE: https://docs.tigerdata.com/self-hosted/upgrades/about-upgrades/ =====

**Examples:**

Example 1 (sql):
```sql
DROP EXTENSION timescaledb;
```

Example 2 (bash):
```bash
nano /opt/homebrew/var/postgresql@14/postgresql.conf
    shared_preload_libraries = ''
```

Example 3 (bash):
```bash
brew services restart postgresql
```

Example 4 (sql):
```sql
tsdb-# \dx
                                          List of installed extensions
        Name     | Version |   Schema   |                            Description
    -------------+---------+------------+-------------------------------------------------------------------
     plpgsql     | 1.0     | pg_catalog | PL/pgSQL procedural language
    (1 row)
```
