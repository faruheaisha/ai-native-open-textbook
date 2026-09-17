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
pageSha256: "cfc1b868145513f9488c414c9b1fd88da9ce8b15f55f0ef6cfac1e7068286aa4"
contentMode: "local-full"
zh: ""
---

## Migrate from self-hosted TimescaleDB to Managed Service for TimescaleDB

**URL:** llms-txt#migrate-from-self-hosted-timescaledb-to-managed-service-for-timescaledb

**Contents:**
- Prerequisites
- Migrate your data to a service
- Troubleshooting

You can migrate your data from self-hosted TimescaleDB to Managed Service for TimescaleDB and automate most of the common operational tasks.

Each service has a database named `defaultdb`, and a default user account named `tsdbadmin`. You use
MST Console to create additional users and databases using the `Users` and `Databases` tabs.

You can switch between different plan sizes in Managed Service for TimescaleDB.
However, during the migration process, choose a plan size that has the same
storage size or slightly larger than the currently allocated plan. This allows
you to limit the downtime during the migration process and have sufficient compute and storage resources.

Depending on your database size and network speed, migration can take a very
long time. During this time, any new writes that happen during the migration
process are not included. To prevent data loss, turn off all the
writes to the source self-hosted TimescaleDB database before you start migration.

Before migrating for production, do a cold run without turning off writes to the source self-hosted TimescaleDB database.
This gives you an estimate of the time the migration process takes, and helps you to practice migrating without causing
downtime to your customers.

If you prefer the features of Tiger Cloud, you can easily [migrate your data][migrate-live] from an service
to a Tiger Cloud service.

Before you migrate your data, do the following:

* Set up the migration machine:

You run the migration commands on the migration machine. It must have enough disk space to hold the dump file.
   * Install the Postgres [`pg_dump`][pg_dump] and [`pg_restore`][pg_restore] utilities on a migration machine.

* Install a client to connect to self-hosted TimescaleDB and Managed Service for TimescaleDB.

These instructions use [`psql`][psql], but any client works.

*  Create a target service:

For more information, see the [Install Managed Service for TimescaleDB][install-mst]. Provision your target service with enough
    space for all your data.

*  On the source self-hosted TimescaleDB and the target service, ensure that you are running:
   *  The same major version of Postgres.

For information, see [upgrade Postgres][upgrading-postgresql-self-hosted].

*  The same major version of TimescaleDB

For more information, see [Upgrade TimescaleDB to a major version][upgrading-timescaledb].
