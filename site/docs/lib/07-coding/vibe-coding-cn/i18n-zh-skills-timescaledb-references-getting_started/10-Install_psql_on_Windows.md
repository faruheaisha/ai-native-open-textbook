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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceRel: "i18n/zh/skills/timescaledb/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceSha256: "d89ee1583c1ea9641e14a8f176f27150301b48061cbde17049ed1e459820f0d5"
pageSha256: "175ffbd19bc3b2d290f2b8f88d544ced38a58ae196a6890ffaff47546acb6590"
contentMode: "local-full"
zh: ""
---

## Install psql on Windows

The `psql` tool is installed by default on Windows systems when you install
Postgres, and this is the most effective way to install the tool. These
instructions use the interactive installer provided by Postgres and
EnterpriseDB.

### Installing psql on Windows

1.  Download and run the Postgres installer from
    [www.enterprisedb.com][windows-installer].
1.  In the `Select Components` dialog, check `Command Line Tools`, along with
    any other components you want to install, and click `Next`.
1.  Complete the installation wizard to install the package.

===== PAGE: https://docs.tigerdata.com/_partials/_migrate_live_run_live_migration/ =====

1. **Pull the live-migration docker image to you migration machine**

To list the available commands, run:
   
   To see the available flags for each command, run `--help` for that command. For example:

1. **Create a snapshot image of your source database in your Tiger Cloud service**

This process checks that you have tuned your source database and target service correctly for replication,
   then creates a snapshot of your data on the migration machine:

Live-migration supplies information about updates you need to make to the source database and target service. For example:

If you have warnings, stop live-migration, make the suggested changes and start again.

1. **Synchronize data between your source database and your Tiger Cloud service**

This command migrates data from the snapshot to your Tiger Cloud service, then streams
    transactions from the source to the target.

If the source Postgres version is 17 or later, you need to pass additional
   flag `-e PGVERSION=17` to the `migrate` command.

After migrating the schema, live-migration prompts you to create hypertables for tables that
   contain time-series data in your Tiger Cloud service. Run `create_hypertable()` to convert these
   table. For more information, see the [Hypertable docs][Hypertable docs].

During this process, you see the migration process:

If `migrate` stops add `--resume` to start from where it left off.

Once the data in your target Tiger Cloud service has almost caught up with the source database,
   you see the following message:

Wait until `replay_lag` is down to a few kilobytes before you move to the next step. Otherwise, data
   replication may not have finished.

1. **Start app downtime**

1. Stop your app writing to the source database, then let the the remaining transactions
      finish to fully sync with the target. You can use tools like the `pg_top` CLI or
      `pg_stat_activity` to view the current transaction on the source database.

1. Stop Live-migration.

Live-migration continues the remaining work. This includes copying
      TimescaleDB metadata, sequences, and run policies. When the migration completes,
      you see the following message:

===== PAGE: https://docs.tigerdata.com/_partials/_experimental/ =====

Experimental features could have bugs. They might not be backwards compatible,
and could be removed in future releases. Use these features at your own risk, and
do not use any experimental features in production.

===== PAGE: https://docs.tigerdata.com/_partials/_compression-intro/ =====

Compressing your time-series data allows you to reduce your chunk size by more
than 90%. This saves on storage costs, and keeps your queries operating at
lightning speed.

When you enable compression, the data in your hypertable is compressed chunk by
chunk. When the chunk is compressed, multiple records are grouped into a single
row. The columns of this row hold an array-like structure that stores all the
data. This means that instead of using lots of rows to store the data, it stores
the same data in a single row. Because a single row takes up less disk space
than many rows, it decreases the amount of disk space required, and can also
speed up your queries.

For example, if you had a table with data that looked a bit like this:

|Timestamp|Device ID|Device Type|CPU|Disk IO|
|-|-|-|-|-|
|12:00:01|A|SSD|70.11|13.4|
|12:00:01|B|HDD|69.70|20.5|
|12:00:02|A|SSD|70.12|13.2|
|12:00:02|B|HDD|69.69|23.4|
|12:00:03|A|SSD|70.14|13.0|
|12:00:03|B|HDD|69.70|25.2|

You can convert this to a single row in array form, like this:

|Timestamp|Device ID|Device Type|CPU|Disk IO|
|-|-|-|-|-|
|[12:00:01, 12:00:01, 12:00:02, 12:00:02, 12:00:03, 12:00:03]|[A, B, A, B, A, B]|[SSD, HDD, SSD, HDD, SSD, HDD]|[70.11, 69.70, 70.12, 69.69, 70.14, 69.70]|[13.4, 20.5, 13.2, 23.4, 13.0, 25.2]|

===== PAGE: https://docs.tigerdata.com/_partials/_prereqs-cloud-only/ =====

To follow the steps on this page:

* Create a target [Tiger Cloud service][create-service] with real-time analytics enabled.

You need your [connection details][connection-info].

===== PAGE: https://docs.tigerdata.com/_partials/_hypercore_manual_workflow/ =====

1. **Stop the jobs that are automatically adding chunks to the columnstore**

Retrieve the list of jobs from the [timescaledb_information.jobs][informational-views] view
   to find the job you need to [alter_job][alter_job].

1. **Convert a chunk to update back to the rowstore**

1. **Update the data in the chunk you added to the rowstore**

Best practice is to structure your [INSERT][insert] statement to include appropriate
   partition key values, such as the timestamp. TimescaleDB adds the data to the correct chunk:

1. **Convert the updated chunks back to the columnstore**

1. **Restart the jobs that are automatically converting chunks to the columnstore**

===== PAGE: https://docs.tigerdata.com/_partials/_migrate_dump_roles_schema_data_mst/ =====

1. **Dump the roles from your source database**

Export your role-based security hierarchy. `<db_name>` has the same value as `<db_name>` in `source`.
   I know, it confuses me as well.

MST does not allow you to export passwords with roles. You assign passwords to these roles
   when you have uploaded them to your Tiger Cloud service.

1. **Remove roles with superuser access**

Tiger Cloud services do not support roles with superuser access. Run the following script
   to remove statements, permissions and clauses that require superuser permissions from `roles.sql`:

1. **Dump the source database schema and data**

The `pg_dump` flags remove superuser access and tablespaces from your data. When you run
   `pgdump`, check the run time, [a long-running `pg_dump` can cause issues][long-running-pgdump].

To dramatically reduce the time taken to dump the source database, using multiple connections. For more information,
   see [dumping with concurrency][dumping-with-concurrency] and [restoring with concurrency][restoring-with-concurrency].

===== PAGE: https://docs.tigerdata.com/_partials/_migrate_live_migrate_data_timescaledb/ =====
