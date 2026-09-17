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
pageSha256: "3b8aafe391a3a4dab19a37ac1693ad647f6138e0b031414a78d493efe02fdd30"
contentMode: "local-full"
zh: ""
---

## Complete code samples

This section contains complete code samples.

### Complete code sample

### Execute more complex queries

===== PAGE: https://docs.tigerdata.com/_partials/_migrate_self_postgres_implement_migration_path/ =====

You cannot upgrade TimescaleDB and Postgres at the same time. You upgrade each product in
the following steps:

1. **Upgrade TimescaleDB**

1. **If your migration path dictates it, upgrade Postgres**

Follow the procedure in [Upgrade Postgres][upgrade-pg]. The version of TimescaleDB installed
   in your Postgres deployment must be the same before and after the Postgres upgrade.

1. **If your migration path dictates it, upgrade TimescaleDB again**

1. **Check that you have upgraded to the correct version of TimescaleDB**

Postgres returns something like:

===== PAGE: https://docs.tigerdata.com/_partials/_migrate_dual_write_validate_production_load/ =====

Now that dual-writes have been in place for a while, the target database should
be holding up to production write traffic. Now would be the right time to
determine if the target database can serve all production traffic (both reads
_and_ writes). How exactly this is done is application-specific and up to you
to determine.

===== PAGE: https://docs.tigerdata.com/_partials/_prereqs-cloud-no-connection/ =====

To follow the steps on this page:

* Create a target [Tiger Cloud service][create-service] with real-time analytics enabled.

===== PAGE: https://docs.tigerdata.com/_partials/_migrate_import_prerequisites/ =====

Best practice is to use an [Ubuntu EC2 instance][create-ec2-instance] hosted in the same region as your
Tiger Cloud service as a migration machine. That is, the machine you run the commands on to move your
data from your source database to your target Tiger Cloud service.

Before you migrate your data:

- Create a target [Tiger Cloud service][created-a-database-service-in-timescale].

Each Tiger Cloud service has a single database that supports the
  [most popular extensions][all-available-extensions]. Tiger Cloud services do not support tablespaces,
  and there is no superuser associated with a service.
  Best practice is to create a Tiger Cloud service with at least 8 CPUs for a smoother experience. A higher-spec instance
  can significantly reduce the overall migration window.

- To ensure that maintenance does not run during the process, [adjust the maintenance window][adjust-maintenance-window].

===== PAGE: https://docs.tigerdata.com/_partials/_hypercore-intro-short/ =====

[Hypercore][hypercore] is the hybrid row-columnar storage engine in TimescaleDB used by hypertables. Traditional
databases force a trade-off between fast inserts (row-based storage) and efficient analytics
(columnar storage). Hypercore eliminates this trade-off, allowing real-time analytics without sacrificing
transactional capabilities.

Hypercore dynamically stores data in the most efficient format for its lifecycle:

* **Row-based storage for recent data**: the most recent chunk (and possibly more) is always stored in the rowstore,
   ensuring fast inserts, updates, and low-latency single record queries. Additionally, row-based storage is used as a
   writethrough for inserts and updates to columnar storage.
* **Columnar storage for analytical performance**: chunks are automatically compressed into the columnstore, optimizing
   storage efficiency and accelerating analytical queries.

Unlike traditional columnar databases, hypercore allows data to be inserted or modified at any stage, making it a
flexible solution for both high-ingest transactional workloads and real-time analytics—within a single database.

===== PAGE: https://docs.tigerdata.com/_partials/_caggs-intro/ =====

In modern applications, data usually grows very quickly. This means that aggregating
it into useful summaries can become very slow. If you are collecting data very frequently, you might want to aggregate your
data into minutes or hours instead. For example, if an IoT device takes
temperature readings every second, you might want to find the average temperature
for each hour. Every time you run this query, the database needs to scan the
entire table and recalculate the average. TimescaleDB makes aggregating data lightning fast, accurate, and easy with continuous aggregates.

![Reduced data calls with continuous aggregates](https://assets.timescale.com/docs/images/continuous-aggregate.png)

Continuous aggregates in TimescaleDB are a kind of hypertable that is refreshed automatically
in the background as new data is added, or old data is modified. Changes to your
dataset are tracked, and the hypertable behind the continuous aggregate is
automatically updated in the background.

Continuous aggregates have a much lower maintenance burden than regular Postgres materialized
views, because the whole view is not created from scratch on each refresh. This
means that you can get on with working your data instead of maintaining your
database.

Because continuous aggregates are based on hypertables, you can query them in exactly the same way as your other tables. This includes continuous aggregates in the rowstore, compressed into the [columnstore][hypercore],
or [tiered to object storage][data-tiering]. You can even create [continuous aggregates on top of your continuous aggregates][hierarchical-caggs], for an even more fine-tuned aggregation.

[Real-time aggregation][real-time-aggregation] enables you to combine pre-aggregated data from the materialized view with the most recent raw data. This gives you up-to-date results on every query. In TimescaleDB v2.13 and later, real-time aggregates are **DISABLED** by default. In earlier versions, real-time aggregates are **ENABLED** by default; when you create a continuous aggregate, queries to that view include the results from the most recent raw data.

===== PAGE: https://docs.tigerdata.com/_partials/_kubernetes-prereqs/ =====

- Install [self-managed Kubernetes][kubernetes-install] or sign up for a Kubernetes [Turnkey Cloud Solution][kubernetes-managed].
- Install [kubectl][kubectl] for command-line interaction with your cluster.

===== PAGE: https://docs.tigerdata.com/_partials/_high-availability-setup/ =====

1.  In [Tiger Cloud Console][cloud-login], select the service to enable replication for.
1.  Click `Operations`, then select `High availability`.
1.  Choose your replication strategy, then click `Change configuration`.

![Tiger Cloud service replicas](https://assets.timescale.com/docs/images/tiger-cloud-console/tiger-console-ha-replicas.png)

1. In `Change high availability configuration`, click `Change config`.

===== PAGE: https://docs.tigerdata.com/_partials/_vpc-limitations/ =====

* You **can attach**:
  * Up to 50 Customer VPCs to a Peering VPC.
  * A Tiger Cloud service to a single Peering VPC at a time.
   The service and the Peering VPC must be in the same AWS region. However, you can peer a Customer VPC and a Peering VPC that are in different regions.
  * Multiple Tiger Cloud services to the same Peering VPC.
* You **cannot attach** a Tiger Cloud service to multiple Peering VPCs at the same time.

The number of Peering VPCs you can create in your project depends on your [pricing plan][pricing-plans].
  If you need another Peering VPC, either contact [support@tigerdata.com](mailto:support@tigerdata.com) or change your pricing plan in [Tiger Cloud Console][console-login].

===== PAGE: https://docs.tigerdata.com/_partials/_integration-apache-kafka-install/ =====

1. **Extract the Kafka binaries to a local folder**

From now on, the folder where you extracted the Kafka binaries is called `<KAFKA_HOME>`.

1. **Configure and run Apache Kafka**

Use the `-daemon` flag to run this process in the background.

1. **Create Kafka topics**

In another Terminal window, navigate to &lt;KAFKA_HOME>, then call `kafka-topics.sh` and create the following topics:
   - `accounts`: publishes JSON messages that are consumed by the timescale-sink connector and inserted into your Tiger Cloud service.
   - `deadletter`: stores messages that cause errors and that Kafka Connect workers cannot process.

1. **Test that your topics are working correctly**
   1. Run `kafka-console-producer` to send messages to the `accounts` topic:
      
   1. Send some events. For example, type the following:
      
   1. In another Terminal window, navigate to &lt;KAFKA_HOME>, then run `kafka-console-consumer` to consume the events you just sent:
      
      You see

===== PAGE: https://docs.tigerdata.com/_partials/_migrate_live_tune_source_database_awsrds/ =====

Updating parameters on a Postgres instance will cause an outage. Choose a time that will cause the least issues to tune this database.

1. **Update the DB instance parameter group for your source database**

1. In [https://console.aws.amazon.com/rds/home#databases:][databases],
      select the RDS instance to migrate.

1. Click `Configuration`, scroll down and note the `DB instance parameter group`, then click `Parameter groups`

<img class="main-content__illustration"
      src="https://assets.timescale.com/docs/images/migrate/awsrds-parameter-groups.png"
      alt="Create security rule to enable RDS EC2 connection"/>

1. Click `Create parameter group`, fill in the form with the following values, then click `Create`.
      - **Parameter group name** - whatever suits your fancy.
      - **Description** - knock yourself out with this one.
      - **Engine type** - `PostgreSQL`
      - **Parameter group family** - the same as `DB instance parameter group` in your `Configuration`.
   1. In `Parameter groups`, select the parameter group you created, then click `Edit`.
   1. Update the following parameters, then click `Save changes`.
      - `rds.logical_replication` set to `1`: record the information needed for logical decoding.
      - `wal_sender_timeout` set to `0`: disable the timeout for the sender process.

1. In RDS, navigate back to your [databases][databases], select the RDS instance to migrate, and click `Modify`.

1. Scroll down to `Database options`, select your new parameter group, and click `Continue`.
   1. Click `Apply immediately` or choose a maintenance window, then click `Modify DB instance`.

Changing parameters will cause an outage. Wait for the database instance to reboot before continuing.
   1. Verify that the settings are live in your database.

1. **Enable replication `DELETE` and`UPDATE` operations**

Replica identity assists data replication by identifying the rows being modified. Your options are that
   each table and hypertable in the source database should either have:
- **A primary key**: data replication defaults to the primary key of the table being replicated.
  Nothing to do.
- **A viable unique index**: each table has a unique, non-partial, non-deferrable index that includes only columns
  marked as `NOT NULL`. If a UNIQUE index does not exist, create one to assist the migration. You can delete if after
  migration.

For each table, set `REPLICA IDENTITY` to the viable unique index:

- **No primary key or viable unique index**: use brute force.

For each table, set `REPLICA IDENTITY` to `FULL`:
  
  For each `UPDATE` or `DELETE` statement, Postgres reads the whole table to find all matching rows. This results
  in significantly slower replication. If you are expecting a large number of `UPDATE` or `DELETE` operations on the table,
  best practice is to not use `FULL`.

===== PAGE: https://docs.tigerdata.com/_partials/_foreign-data-wrappers/ =====

You use Postgres foreign data wrappers (FDWs) to query external data sources from a Tiger Cloud service. These external data sources can be one of the following:

- Other Tiger Cloud services
- Postgres databases outside of Tiger Cloud

If you are using VPC peering, you can create FDWs in your Customer VPC to query a service in your Tiger Cloud project. However, you can't create FDWs in your Tiger Cloud services to query a data source in your Customer VPC. This is because Tiger Cloud VPC peering uses AWS PrivateLink for increased security. See [VPC peering documentation][vpc-peering] for additional details.

Postgres FDWs are particularly useful if you manage multiple Tiger Cloud services with different capabilities, and need to seamlessly access and merge regular and time-series data.

To follow the steps on this page:

* Create a target [Tiger Cloud service][create-service] with the Real-time analytics capability.

You need [your connection details][connection-info]. This procedure also
   works for [self-hosted TimescaleDB][enable-timescaledb].
