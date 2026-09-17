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
pageSha256: "dc67494a3d3c5a598ee6582c7a00f05d31548f42365eb2a01d65dacda40f9b8a"
contentMode: "local-full"
zh: ""
---

## Migrate data to self-hosted TimescaleDB from the same Postgres instance

**URL:** llms-txt#migrate-data-to-self-hosted-timescaledb-from-the-same-postgres-instance

**Contents:**
- Prerequisites
- Migrate data
- Migrating data

You can migrate data into a TimescaleDB hypertable from a regular Postgres
table. This method assumes that you have TimescaleDB set up in the same database
instance as your existing table.

Before beginning, make sure you have [installed and set up][install] TimescaleDB.

You also need a table with existing data. In this example, the source table is
named `old_table`. Replace the table name with your actual table name. The
example also names the destination table `new_table`, but you might want to use
a more descriptive name.

Migrate your data into TimescaleDB from within the same database.

1.  Call [CREATE TABLE][hypertable-create-table] to make a new table based on your existing table.

You can create your indexes at the same time, so you don't have to recreate them manually. Or you can
    create the table without indexes, which makes data migration faster.

If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

1.  Insert data from the old table to the new table.

1.  If you created your new table without indexes, recreate your indexes now.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/mst/corrupt-index-duplicate/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE TABLE new_table (
        LIKE old_table INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES
    ) WITH (
        tsdb.hypertable,
        tsdb.partition_column='<the name of the time column>'
    );
```

Example 2 (sql):
```sql
CREATE TABLE new_table (
        LIKE old_table INCLUDING DEFAULTS INCLUDING CONSTRAINTS EXCLUDING INDEXES
    ) WITH (
        tsdb.hypertable,
        tsdb.partition_column='<the name of the time column>'
    );
```

Example 3 (sql):
```sql
INSERT INTO new_table
      SELECT * FROM old_table;
```
