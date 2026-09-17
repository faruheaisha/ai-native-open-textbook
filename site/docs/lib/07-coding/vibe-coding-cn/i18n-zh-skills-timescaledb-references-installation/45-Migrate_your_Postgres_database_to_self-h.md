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
pageSha256: "9947323382867a8ba645b92e49ee19c19569d28024bc5c1e5781fd142fa56018"
contentMode: "local-full"
zh: ""
---

## Migrate your Postgres database to self-hosted TimescaleDB

**URL:** llms-txt#migrate-your-postgres-database-to-self-hosted-timescaledb

**Contents:**
- Choose a migration method
- Migrate an active database

You can migrate your existing Postgres database to self-hosted TimescaleDB.

There are several methods for migrating your data:

*   If the database you want to migrate is smaller than 100&nbsp;GB,
    [migrate your entire database at once][migrate-entire]:
    This method directly transfers all data and schemas, including
    Timescale-specific features. Your hypertables, continuous aggregates, and
    policies are automatically available in the new self-hosted TimescaleDB instance.
*   For databases larger than 100GB,
    [migrate your schema and data separately][migrate-separately]: With this
    method, you migrate your tables one by one for easier failure recovery. If
    migration fails mid-way, you can restart from the failure point rather than
    from the beginning. However, Timescale-specific features won't be
    automatically migrated. Follow the instructions to restore your hypertables,
    continuous aggregates, and policies.
*   If you need to move data from Postgres tables into hypertables within an
    existing self-hosted TimescaleDB instance,
    [migrate within the same database][migrate-same-db]: This method assumes that
    you have TimescaleDB set up in the same database instance as your existing table.
*   If you have data in an InfluxDB database,
    [migrate using Outflux][outflux]:
    Outflux pipes exported data directly to your self-hosted TimescaleDB instance, and manages schema
    discovery, validation, and creation. Outflux works with earlier versions of
    InfluxDB. It does not work with InfluxDB version 2 and later.
