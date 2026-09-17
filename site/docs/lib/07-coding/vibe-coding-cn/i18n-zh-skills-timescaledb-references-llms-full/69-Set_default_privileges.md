---
title: "About multi-node"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "bddb7340f0a8f71faa1d155d393cc393ee1d8c94c96dbfcb52f8573621b0a17b"
contentMode: "local-full"
zh: ""
---

# About multi-node

[Multi-node support is sunsetted][multi-node-deprecation].

TimescaleDB v2.13 is the last release that includes multi-node support for Postgres
versions 13, 14, and 15.

If you have a larger petabyte-scale workload, you might need more than
one TimescaleDB instance. TimescaleDB multi-node allows you to run and
manage a cluster of databases, which can give you faster data ingest,
and more responsive and efficient queries for large workloads.

In some cases, your queries could be slower in a multi-node cluster due to the
extra network communication between the various nodes. Queries perform the best
when the query processing is distributed among the nodes and the result set is
small relative to the queried dataset. It is important that you understand
multi-node architecture before you begin, and plan your database according to
your specific requirements.

## Multi-node architecture

Multi-node TimescaleDB allows you to tie several databases together into a
logical distributed database to combine the processing power of many physical
Postgres instances.

One of the databases exists on an access node and stores
metadata about the other databases. The other databases are
located on data nodes and hold the actual data. In theory, a
Postgres instance can serve as both an access node and a data node
at the same time in different databases. However, it is recommended not to
have mixed setups, because it can be complicated, and server
instances are often provisioned differently depending on the role they
serve.

For self-hosted installations, create a server that can act as an
access node, then use that access node to create data nodes on other
servers.

When you have configured multi-node TimescaleDB, the access node coordinates
the placement and access of data chunks on the data nodes. In most
cases, it is recommend that you use multidimensional partitioning to
distribute data across chunks in both time and space dimensions. The
figure in this section shows how an access node (AN) partitions data in the same
time interval across multiple data nodes (DN1, DN2, and DN3).

&lt;img class="main-content__illustration"
width=\{1375\} height=\{944\}
src="https://assets.timescale.com/docs/images/multi-node-arch.webp"
alt="Diagram showing how multi-node access and data nodes interact"/>

A database user connects to the access node to issue commands and
execute queries, similar to how one connects to a regular single
node TimescaleDB instance. In most cases, connecting directly to the
data nodes is not necessary.

Because TimescaleDB exists as an extension within a specific
database, it is possible to have both distributed and non-distributed
databases on the same access node. It is also possible to
have several distributed databases that use different sets of physical
instances as data nodes. In this section,
however, it is assumed that you have a single
distributed database with a consistent set of data nodes.

## Distributed hypertables

If you use a regular table or hypertable on a distributed database, they are not
automatically distributed. Regular tables and hypertables continue to work as
usual, even when the underlying database is distributed. To enable multi-node
capabilities, you need to explicitly create a distributed hypertable on the
access node to make use of the data nodes. A distributed hypertable is similar
to a regular [hypertable][hypertables], but with the difference that chunks are
distributed across data nodes instead of on local storage. By distributing the
chunks, the processing power of the data nodes is combined to achieve higher
ingest throughput and faster queries. However, the ability to achieve good
performance is highly dependent on how the data is partitioned across the data
nodes.

To achieve good ingest performance, write the data in batches, with each batch
containing data that can be distributed across many data nodes. To achieve good
query performance, spread the query across many nodes and have a result set that
is small relative to the amount of processed data. To achieve this, it is
important to consider an appropriate partitioning method.

### Partitioning methods

Data that is ingested into a distributed hypertable is spread across the data
nodes according to the partitioning method you have chosen. Queries that can be
sent from the access node to multiple data nodes and processed simultaneously
generally run faster than queries that run on a single data node, so it is
important to think about what kind of data you have, and the type of queries you
want to run.

TimescaleDB multi-node currently supports capabilities that make it best suited
for large-volume time-series workloads that are partitioned on `time`, and a
space dimension such as `location`. If you usually run wide queries that
aggregate data across many locations and devices, choose this partitioning
method. For example, a query like this is faster on a database partitioned on
`time,location`, because it spreads the work across all the data nodes in
parallel:

```sql
SELECT time_bucket('1 hour', time) AS hour, location, avg(temperature)
FROM conditions
GROUP BY hour, location
ORDER BY hour, location
LIMIT 100;
```

Partitioning on `time` and a space dimension such as `location`, is also best if
you need faster insert performance. If you partition only on time, and your
inserts are generally occuring in time order, then you are always writing to one
data node at a time. Partitioning on `time` and `location` means your
time-ordered inserts are spread across multiple data nodes, which can lead to
better performance.

If you mostly run deep time queries on a single location, you might see better
performance by partitioning solely on the `time` dimension, or on a space
dimension other than `location`. For example, a query like this is faster on a
database partitioned on `time` only, because the data for a single location is
spread across all the data nodes, rather than being on a single one:

```sql
SELECT time_bucket('1 hour', time) AS hour, avg(temperature)
FROM conditions
WHERE location = 'office_1'
GROUP BY hour
ORDER BY hour
LIMIT 100;
```

### Transactions and consistency model

Transactions that occur on distributed hypertables are atomic, just
like those on regular hypertables. This means that a distributed
transaction that involves multiple data nodes is guaranteed to
either succeed on all nodes or on none of them. This guarantee
is provided by the [two-phase commit protocol][2pc], which
is used to implement distributed transactions in TimescaleDB.

However, the read consistency of a distributed hypertable is different
to a regular hypertable. Because a distributed transaction is a set of
individual transactions across multiple nodes, each node can commit
its local transaction at a slightly different time due to network
transmission delays or other small fluctuations. As a consequence, the
access node cannot guarantee a fully consistent snapshot of the
data across all data nodes. For example, a distributed read
transaction might start when another concurrent write transaction is
in its commit phase and has committed on some data nodes but not
others. The read transaction can therefore use a snapshot on one node
that includes the other transaction's modifications, while the
snapshot on another data node might not include them.

If you need stronger read consistency in a distributed transaction, then you
can use consistent snapshots across all data nodes. However, this
requires a lot of coordination and management, which can negatively effect
performance, and it is therefore not implemented by default for distributed
hypertables.

## Using continuous aggregates in a multi-node environment

If you are using self-hosted TimescaleDB in a multi-node environment, there are some
additional considerations for continuous aggregates.

When you create a continuous aggregate within a multi-node environment, the
continuous aggregate should be created on the access node. While it is possible
to create a continuous aggregate on data nodes, it interferes with the
continuous aggregates on the access node and can cause problems.

When you refresh a continuous aggregate on an access node, it computes a single
window to update the time buckets. This could slow down your query if the actual
number of rows that were updated is small, but widely spread apart. This is
aggravated if the network latency is high if, for example, you have remote data
nodes.

Invalidation logs are on kept on the data nodes, which is designed to limit the
amount of data that needs to be transferred. However, some statements send
invalidations directly to the log, for example, when dropping a chunk or
truncate a hypertable. This action could slow down performance, in comparison to
a local update. Additionally, if you have infrequent refreshes but a lot of
changes to the hypertable, the invalidation logs could get very large, which
could cause performance issues. Make sure you are maintaining your invalidation
log size to avoid this, for example, by refreshing the continuous aggregate
frequently.

For more information about setting up multi-node, see the
[multi-node section][multi-node]

===== PAGE: https://docs.tigerdata.com/self-hosted/multinode-timescaledb/multinode-config/ =====

# Multi-node configuration

[Multi-node support is sunsetted][multi-node-deprecation].

TimescaleDB v2.13 is the last release that includes multi-node support for Postgres
versions 13, 14, and 15.

In addition to the
[regular TimescaleDB configuration][timescaledb-configuration], it is recommended
that you also configure additional settings specific to multi-node operation.

## Update settings

Each of these settings can be configured in the `postgresql.conf` file on the
individual node. The `postgresql.conf` file is usually in the `data` directory,
but you can locate the correct path by connecting to the node with `psql` and
giving this command:

```sql
SHOW config_file;
```

After you have modified the `postgresql.conf` file, reload the configuration to
see your changes:

```bash
pg_ctl reload
```

### `max_prepared_transactions`

If not already set, ensure that `max_prepared_transactions` is a non-zero value
on all data nodes is set to `150` as a starting point.

### `enable_partitionwise_aggregate`

On the access node, set the `enable_partitionwise_aggregate` parameter to `on`.
This ensures that queries are pushed down to the data nodes, and improves query
performance.

### `jit`

On the access node, set `jit` to `off`. Currently, JIT does not work well with
distributed queries. However, you can enable JIT on the data nodes successfully.

### `statement_timeout`

On the data nodes, disable `statement_timeout`. If you need to enable this,
enable and configure it on the access node only. This setting is disabled by
default in Postgres, but can be useful if your specific environment is suited.

### `wal_level`

On the data nodes, set the `wal_level` to `logical` or higher to
[move][move_chunk] or [copy][copy_chunk] chunks between data nodes. If you
are moving many chunks in parallel, consider increasing `max_wal_senders` and
`max_replication_slots` as well.

### Transaction isolation level

For consistency, if the transaction isolation level is set to `READ COMMITTED`
it is automatically upgraded to `REPEATABLE READ` whenever a distributed
operation occurs. If the isolation level is `SERIALIZABLE`, it is not changed.

===== PAGE: https://docs.tigerdata.com/self-hosted/multinode-timescaledb/multinode-maintenance/ =====

# Multi-node maintenance tasks

[Multi-node support is sunsetted][multi-node-deprecation].

TimescaleDB v2.13 is the last release that includes multi-node support for Postgres
versions 13, 14, and 15.

Various maintenance activities need to be carried out for effective
upkeep of the distributed multi-node setup. You can use `cron` or
another scheduling system outside the database to run these below
maintenance jobs on a regular schedule if you prefer. Also make sure
that the jobs are scheduled separately for each database that contains
distributed hypertables.

## Maintaining distributed transactions

A distributed transaction runs across multiple data nodes, and can remain in a
non-completed state if a data node reboots or experiences temporary issues. The
access node keeps a log of distributed transactions so that nodes that haven't
completed their part of the distributed transaction can complete it later when
they become available. This transaction log requires regular cleanup to remove
transactions that have completed, and complete those that haven't.
We highly recommended that you configure the access node to run a maintenance
job that regularly cleans up any unfinished distributed transactions. For example:

= 2.12">

```sql
CREATE OR REPLACE PROCEDURE data_node_maintenance(job_id int, config jsonb)
LANGUAGE SQL AS
$$
    SELECT _timescaledb_functions.remote_txn_heal_data_node(fs.oid)
    FROM pg_foreign_server fs, pg_foreign_data_wrapper fdw
    WHERE fs.srvfdw = fdw.oid
    AND fdw.fdwname = 'timescaledb_fdw';
$$;

SELECT add_job('data_node_maintenance', '5m');
```

```sql
CREATE OR REPLACE PROCEDURE data_node_maintenance(job_id int, config jsonb)
LANGUAGE SQL AS
$$
    SELECT _timescaledb_internal.remote_txn_heal_data_node(fs.oid)
    FROM pg_foreign_server fs, pg_foreign_data_wrapper fdw
    WHERE fs.srvfdw = fdw.oid
    AND fdw.fdwname = 'timescaledb_fdw';
$$;

SELECT add_job('data_node_maintenance', '5m');
```

## Statistics for distributed hypertables

On distributed hypertables, the table statistics need to be kept updated.
This allows you to efficiently plan your queries. Because of the nature of
distributed hypertables, you can't use the `auto-vacuum` tool to gather
statistics. Instead, you can explicitly ANALYZE the distributed hypertable
periodically using a maintenance job, like this:

```sql
CREATE OR REPLACE PROCEDURE distributed_hypertables_analyze(job_id int, config jsonb)
LANGUAGE plpgsql AS
$$
DECLARE r record;
BEGIN
FOR r IN SELECT hypertable_schema, hypertable_name
              FROM timescaledb_information.hypertables
              WHERE is_distributed ORDER BY 1, 2
LOOP
EXECUTE format('ANALYZE %I.%I', r.hypertable_schema, r.hypertable_name);
END LOOP;
END
$$;

SELECT add_job('distributed_hypertables_analyze', '12h');
```

You can merge the jobs in this example into a single maintenance job
if you prefer. However, analyzing distributed hypertables should be
done less frequently than remote transaction healing activity. This
is because the former could analyze a large number of remote chunks
everytime and can be expensive if called too frequently.

===== PAGE: https://docs.tigerdata.com/self-hosted/migration/migrate-influxdb/ =====

# Migrate data to TimescaleDB from InfluxDB

You can migrate data to TimescaleDB from InfluxDB using the Outflux tool.
[Outflux][outflux] is an open source tool built by Tiger Data for fast, seamless
migrations. It pipes exported data directly to self-hosted TimescaleDB, and manages schema
discovery, validation, and creation.

Outflux works with earlier versions of InfluxDB. It does not work with InfluxDB
version 2 and later.

## Prerequisites

Before you start, make sure you have:

*   A running instance of InfluxDB and a means to connect to it.
*   An [self-hosted TimescaleDB instance][install] and a means to connect to it.
*   Data in your InfluxDB instance.

## Procedures

To import data from Outflux, follow these procedures:

1.  [Install Outflux][install-outflux]
1.  [Discover, validate, and transfer schema][discover-validate-and-transfer-schema] to self-hosted TimescaleDB (optional)
1.  [Migrate data to Timescale][migrate-data-to-timescale]

## Install Outflux

Install Outflux from the GitHub repository. There are builds for Linux, Windows,
and MacOS.

1.  Go to the [releases section][outflux-releases] of the Outflux repository.
1.  Download the latest compressed tarball for your platform.
1.  Extract it to a preferred location.

If you prefer to build Outflux from source, see the [Outflux README][outflux-readme] for
instructions.

To get help with Outflux, run `./outflux --help` from the directory
where you installed it.

## Discover, validate, and transfer schema

Outflux can:

*   Discover the schema of an InfluxDB measurement
*   Validate whether a table exists that can hold the transferred data
*   Create a new table to satisfy the schema requirements if no valid table
    exists

Outflux's `migrate` command does schema transfer and data migration in one step.
For more information, see the [migrate][migrate-data-to-timescale] section.
Use this section if you want to validate and transfer your schema independently
of data migration.

To transfer your schema from InfluxDB to Timescale, run `outflux
schema-transfer`:

```bash
outflux schema-transfer <DATABASE_NAME> <INFLUX_MEASUREMENT_NAME> \
--input-server=http://localhost:8086 \
--output-conn="dbname=tsdb user=tsdbadmin"
```

To transfer all measurements from the database, leave out the measurement name
argument.

This example uses the `postgres` user and database to connect to the self-hosted TimescaleDB instance. For other connection options and configuration, see the [Outflux
Github repo][outflux-gitbuh].

### Schema transfer options

Outflux's `schema-transfer` can use 1 of 4 schema strategies:

*   `ValidateOnly`: checks that self-hosted TimescaleDB is installed and that the specified
    database has a properly partitioned hypertable with the correct columns, but
    doesn't perform modifications
*   `CreateIfMissing`: runs the same checks as `ValidateOnly`, and creates and
    properly partitions any missing hypertables
*   `DropAndCreate`: drops any existing table with the same name as the
    measurement, and creates a new hypertable and partitions it properly
*   `DropCascadeAndCreate`: performs the same action as `DropAndCreate`, and
    also executes a cascade table drop if there is an existing table with the
    same name as the measurement

You can specify your schema strategy by passing a value to the
`--schema-strategy` option in the `schema-transfer` command. The default
strategy is `CreateIfMissing`.

By default, each tag and field in InfluxDB is treated as a separate column in
your TimescaleDB tables. To transfer tags and fields as a single JSONB column,
use the flag `--tags-as-json`.

## Migrate data to TimescaleDB

Transfer your schema and migrate your data all at once with the `migrate`
command.

For example, run:

```bash
outflux migrate <DATABASE_NAME> <INFLUX_MEASUREMENT_NAME> \
--input-server=http://localhost:8086 \
--output-conn="dbname=tsdb user=tsdbadmin"
```

The schema strategy and connection options are the same as for
`schema-transfer`. For more information, see
[Discover, validate, and transfer schema][discover-validate-and-transfer-schema].

In addition, `outflux migrate` also takes the following flags:

*   `--limit`: Pass a number, `N`, to `--limit` to export only the first `N`
    rows, ordered by time.
*   `--from` and `to`: Pass a timestamp to `--from` or `--to` to specify a time
    window of data to migrate.
*   `chunk-size`: Changes the size of data chunks transferred. Data is pulled
    from the InfluxDB server in chunks of default size 15 000.
*   `batch-size`: Changes the number of rows in an insertion batch. Data is
    inserted into a self-hosted TimescaleDB database in batches that are 8000 rows by default.

For more flags, see the [Github documentation for `outflux
migrate`][outflux-migrate]. Alternatively, see the command line help:

```bash
outflux migrate --help
```

===== PAGE: https://docs.tigerdata.com/self-hosted/migration/entire-database/ =====

# Migrate the entire database at once

Migrate smaller databases by dumping and restoring the entire database at once.
This method works best on databases smaller than 100 GB. For larger
databases, consider [migrating your schema and data
separately][migrate-separately].

Depending on your database size and network speed, migration can take a very
long time. You can continue reading from your source database during this time,
though performance could be slower. To avoid this problem, fork your database
and migrate your data from the fork. If you write to tables in your source
database during the migration, the new writes might not be transferred to
Timescale. To avoid this problem, see [Live migration][live-migration].

## Prerequisites

Before you begin, check that you have:

*   Installed the Postgres [`pg_dump`][pg_dump] and [`pg_restore`][pg_restore]
    utilities.
*   Installed a client for connecting to Postgres. These instructions use
    [`psql`][psql], but any client works.
*   Created a new empty database in your self-hosted TimescaleDB instance. For more information, see
    [Install TimescaleDB][install-selfhosted-timescale]. Provision
    your database with enough space for all your data.
*   Checked that any other Postgres extensions you use are compatible with
    Timescale. For more information, see the [list of compatible
    extensions][extensions]. Install your other Postgres extensions.
*   Checked that you're running the same major version of Postgres on both
    your target and source databases. For information about upgrading
    Postgres on your source database, see the
    [upgrade instructions for self-hosted TimescaleDB][upgrading-postgresql-self-hosted].
*   Checked that you're running the same major version of TimescaleDB on both
    your target and source databases. For more information, see
    [upgrade self-hosted TimescaleDB][upgrading-timescaledb].

To speed up migration, compress your data into the columnstore. You can compress any chunks where
data is not currently inserted, updated, or deleted. When you finish the
migration, you can decompress chunks back to the rowstore as needed for normal operation. For more
information about the rowstore and columnstore compression, see [hypercore][compression].

### Migrating the entire database at once

1.  Dump all the data from your source database into a `dump.bak` file, using your
    source database connection details. If you are prompted for a password, use
    your source database credentials:

    ```bash
    pg_dump -U &lt;SOURCE_DB_USERNAME> -W \
    -h &lt;SOURCE_DB_HOST> -p &lt;SOURCE_DB_PORT> -Fc -v \
    -f dump.bak &lt;SOURCE_DB_NAME>
    ```

1.  Connect to your self-hosted TimescaleDB instance using your connection details:

    ```bash
    psql “postgres://&lt;USERNAME>:&lt;PASSWORD>@&lt;HOST>:&lt;PORT>/&lt;DATABASE>?sslmode=require”
    ```

1.  Prepare your self-hosted TimescaleDB instance for data restoration by using
    [`timescaledb_pre_restore`][timescaledb_pre_restore] to stop background
    workers:

    ```sql
    SELECT timescaledb_pre_restore();
    ```

1.  At the command prompt, restore the dumped data from the `dump.bak` file into
    your self-hosted TimescaleDB instance, using your connection details. To avoid permissions errors, include the `--no-owner` flag:

    ```bash
    pg_restore -U tsdbadmin -W \
    -h &lt;CLOUD_HOST> -p &lt;CLOUD_PORT> --no-owner \
    -Fc -v -d tsdb dump.bak
    ```

1.  At the `psql` prompt, return your self-hosted TimescaleDB instance to normal
    operations by using the
    [`timescaledb_post_restore`][timescaledb_post_restore] command:

    ```sql
    SELECT timescaledb_post_restore();
    ```

1.  Update your table statistics by running [`ANALYZE`][analyze] on your entire
    dataset:

    ```sql
    ANALYZE;
    ```

===== PAGE: https://docs.tigerdata.com/self-hosted/migration/schema-then-data/ =====

# Migrate schema and data separately

Migrate larger databases by migrating your schema first, then migrating the
data. This method copies each table or chunk separately, which allows you to
restart midway if one copy operation fails.

For smaller databases, it may be more convenient to migrate your entire database
at once. For more information, see the section on
[choosing a migration method][migration].

This method does not retain continuous aggregates calculated using
already-deleted data. For example, if you delete raw data after a month but
retain downsampled data in a continuous aggregate for a year, the continuous
aggregate loses any data older than a month upon migration. If you must keep
continuous aggregates calculated using deleted data, migrate your entire
database at once. For more information, see the section on
[choosing a migration method][migration].

The procedure to migrate your database requires these steps:

*   [Migrate schema pre-data](#migrate-schema-pre-data)
*   [Restore hypertables in Timescale](#restore-hypertables-in-timescale)
*   [Copy data from the source database](#copy-data-from-the-source-database)
*   [Restore data into Timescale](#restore-data-into-timescale)
*   [Migrate schema post-data](#migrate-schema-post-data)
*   [Recreate continuous aggregates](#recreate-continuous-aggregates) (optional)
*   [Recreate policies](#recreate-policies) (optional)
*   [Update table statistics](#update-table-statistics)

Depending on your database size and network speed, steps that involve copying
data can take a very long time. You can continue reading from your source
database during this time, though performance could be slower. To avoid this
problem, fork your database and migrate your data from the fork. If you write to
the tables in your source database during the migration, the new writes might
not be transferred to Timescale. To avoid this problem, see the section on
[migrating an active database][migration].

## Prerequisites

Before you begin, check that you have:

*   Installed the Postgres [`pg_dump`][pg_dump] and [`pg_restore`][pg_restore]
    utilities.
*   Installed a client for connecting to Postgres. These instructions use
    [`psql`][psql], but any client works.
*   Created a new empty database in a self-hosted TimescaleDB instance. For more information, see
    the [Install TimescaleDB][install-selfhosted]. Provision
    your database with enough space for all your data.
*   Checked that any other Postgres extensions you use are compatible with
    TimescaleDB. For more information, see the [list of compatible
    extensions][extensions]. Install your other Postgres extensions.
*   Checked that you're running the same major version of Postgres on both your
    self-hosted TimescaleDB instance and your source database. For information about upgrading
    Postgres on your source database, see the [upgrade instructions for
    self-hosted TimescaleDB][upgrading-postgresql-self-hosted] and [Managed
    Service for TimescaleDB][upgrading-postgresql].
*   Checked that you're running the same major version of TimescaleDB on both
    your target and source database. For more information, see
    [upgrading TimescaleDB][upgrading-timescaledb].

## Migrate schema pre-data

Migrate your pre-data from your source database to self-hosted TimescaleDB. This
includes table and schema definitions, as well as information on sequences,
owners, and settings. This doesn't include Timescale-specific schemas.

### Migrating schema pre-data

1.  Dump the schema pre-data from your source database into a `dump_pre_data.bak` file, using
    your source database connection details. Exclude Timescale-specific schemas.
    If you are prompted for a password, use your source database credentials:

    ```bash
    pg_dump -U &lt;SOURCE_DB_USERNAME> -W \
    -h &lt;SOURCE_DB_HOST> -p &lt;SOURCE_DB_PORT> -Fc -v \
    --section=pre-data --exclude-schema="_timescaledb*" \
    -f dump_pre_data.bak &lt;DATABASE_NAME>
    ```

1.  Restore the dumped data from the `dump_pre_data.bak` file into your self-hosted TimescaleDB instance, using your self-hosted TimescaleDB connection details. To avoid permissions errors, include the `--no-owner` flag:

    ```bash
    pg_restore -U tsdbadmin -W \
    -h &lt;HOST> -p &lt;PORT> --no-owner -Fc \
    -v -d tsdb dump_pre_data.bak
    ```

## Restore hypertables in your self-hosted TimescaleDB instance

After pre-data migration, your hypertables from your source database become
regular Postgres tables in Timescale. Recreate your hypertables in your self-hosted TimescaleDB instance to
restore them.

### Restoring hypertables in your self-hosted TimescaleDB instance

1.  Connect to your self-hosted TimescaleDB instance:

    ```sql
    psql "postgres://&lt;USERNAME>:&lt;PASSWORD>@&lt;HOST>:&lt;PORT>/&lt;DATABSE>?sslmode=require"
    ```

1.  Restore the hypertable:

    ```sql
    SELECT create_hypertable(
       '',
	   by_range('&lt;COLUMN_NAME>', INTERVAL '&lt;CHUNK_INTERVAL>')
    );
    ```

The `by_range` dimension builder is an addition to TimescaleDB 2.13.

## Copy data from the source database

After restoring your hypertables, return to your source database to copy your
data, table by table.

### Copying data from your source database

1.  Connect to your source database:

    ```bash
    psql "postgres://&lt;SOURCE_DB_USERNAME>:&lt;SOURCE_DB_PASSWORD>@&lt;SOURCE_DB_HOST>:&lt;SOURCE_DB_PORT>/&lt;SOURCE_DB_NAME>?sslmode=require"
    ```

1.  Dump the data from the first table into a `.csv` file:

    ```sql
    \COPY (SELECT * FROM ) TO .csv CSV
    ```

    Repeat for each table and hypertable you want to migrate.

If your tables are very large, you can migrate each table in multiple pieces.
Split each table by time range, and copy each range individually. For example:

```sql
\COPY (SELECT * FROM  WHERE time > '2021-11-01' AND time < '2011-11-02') TO .csv CSV
```

## Restore data into Timescale

When you have copied your data into `.csv` files, you can restore it to
self-hosted TimescaleDB by copying from the `.csv` files. There are two methods: using
regular Postgres [`COPY`][copy], or using the TimescaleDB
[`timescaledb-parallel-copy`][timescaledb-parallel-copy] function. In tests,
`timescaledb-parallel-copy` is 16% faster. The `timescaledb-parallel-copy` tool
is not included by default. You must install the function.

Because `COPY` decompresses data, any compressed data in your source
database is now stored uncompressed in your `.csv` files. If you
provisioned your self-hosted TimescaleDB storage for your compressed data, the
uncompressed data may take too much storage. To avoid this problem, periodically
recompress your data as you copy it in. For more information on compression, see
the [compression section](https://docs.tigerdata.com/use-timescale/latest/compression/).

### Restoring data into a Tiger Cloud service with timescaledb-parallel-copy

1.  At the command prompt, install `timescaledb-parallel-copy`:

    ```bash
    go get github.com/timescale/timescaledb-parallel-copy/cmd/timescaledb-parallel-copy
    ```

1.  Use `timescaledb-parallel-copy` to import data into
    your Tiger Cloud service. Set `<NUM_WORKERS>` to twice the number of CPUs in your
    database. For example, if you have 4 CPUs, `<NUM_WORKERS>` should be `8`.

    ```bash
    timescaledb-parallel-copy \
    --connection "host=&lt;HOST> \
    user=tsdbadmin password=&lt;PASSWORD> \
    port=&lt;PORT> \
    dbname=tsdb \
    sslmode=require
    " \
    --table  \
    --file &lt;FILE_NAME>.csv \
    --workers &lt;NUM_WORKERS> \
    --reporting-period 30s
    ```

    Repeat for each table and hypertable you want to migrate.

### Restoring data into a Tiger Cloud service with COPY

1.  Connect to your Tiger Cloud service:

    ```sql
    psql "postgres://tsdbadmin:&lt;PASSWORD>@&lt;HOST>:&lt;PORT>/tsdb?sslmode=require"
    ```

1.  Restore the data to your Tiger Cloud service:

    ```sql
    \copy  FROM '.csv' WITH (FORMAT CSV);
    ```

    Repeat for each table and hypertable you want to migrate.

## Migrate schema post-data

When you have migrated your table and hypertable data, migrate your Postgres schema post-data. This includes information about constraints.

### Migrating schema post-data

1.  At the command prompt, dump the schema post-data from your source database
    into a `dump_post_data.dump` file, using your source database connection details. Exclude
    Timescale-specific schemas. If you are prompted for a password, use your
    source database credentials:

    ```bash
    pg_dump -U &lt;SOURCE_DB_USERNAME> -W \
    -h &lt;SOURCE_DB_HOST> -p &lt;SOURCE_DB_PORT> -Fc -v \
    --section=post-data --exclude-schema="_timescaledb*" \
    -f dump_post_data.dump &lt;DATABASE_NAME>
    ```

1.  Restore the dumped schema post-data from the `dump_post_data.dump` file into
    your Tiger Cloud service, using your connection details. To avoid permissions
    errors, include the `--no-owner` flag:

    ```bash
    pg_restore -U tsdbadmin -W \
    -h &lt;HOST> -p &lt;PORT> --no-owner -Fc \
    -v -d tsdb dump_post_data.dump
    ```

### Troubleshooting

If you see these errors during the migration process, you can safely ignore
them. The migration still occurs successfully.

```
pg_restore: error: could not execute query: ERROR:  relation "<relation_name>" already exists
```

```
pg_restore: error: could not execute query: ERROR:  trigger "ts_insert_blocker" for relation "<relation_name>" already exists
```

## Recreate continuous aggregates

Continuous aggregates aren't migrated by default when you transfer your schema
and data separately. You can restore them by recreating the continuous aggregate
definitions and recomputing the results on your Tiger Cloud service. The recomputed
continuous aggregates only aggregate existing data in your Tiger Cloud service. They
don't include deleted raw data.

### Recreating continuous aggregates

1.  Connect to your source database:

    ```bash
    psql "postgres://&lt;SOURCE_DB_USERNAME>:&lt;SOURCE_DB_PASSWORD>@&lt;SOURCE_DB_HOST>:&lt;SOURCE_DB_PORT>/&lt;SOURCE_DB_NAME>?sslmode=require"
    ```

1.  Get a list of your existing continuous aggregate definitions:

    ```sql
    SELECT view_name, view_definition FROM timescaledb_information.continuous_aggregates;
    ```

    This query returns the names and definitions for all your continuous
    aggregates. For example:

    ```sql
    view_name       |                                            view_definition
    ----------------+--------------------------------------------------------------------------------------------------------
    avg_fill_levels |  SELECT round(avg(fill_measurements.fill_level), 2) AS avg_fill_level,                                +
                    |     time_bucket('01:00:00'::interval, fill_measurements."time") AS bucket,                            +
                    |     fill_measurements.sensor_id                                                                       +
                    |     FROM fill_measurements                                                                            +
                    |     GROUP BY (time_bucket('01:00:00'::interval, fill_measurements."time")), fill_measurements.sensor_id;
    (1 row)
    ```

1.  Connect to your Tiger Cloud service:

    ```bash
    psql "postgres://tsdbadmin:&lt;PASSWORD>@&lt;HOST>:&lt;PORT>/tsdb?sslmode=require"
    ```

1.  Recreate each continuous aggregate definition:

    ```sql
    CREATE MATERIALIZED VIEW &lt;VIEW_NAME>
    WITH (timescaledb.continuous) AS
    &lt;VIEW_DEFINITION>
    ```

## Recreate policies

By default, policies aren't migrated when you transfer your schema and data
separately. Recreate them on your Tiger Cloud service.

### Recreating policies

1.  Connect to your source database:

    ```bash
    psql "postgres://&lt;SOURCE_DB_USERNAME>:&lt;SOURCE_DB_PASSWORD>@&lt;SOURCE_DB_HOST>:&lt;SOURCE_DB_PORT>/&lt;SOURCE_DB_NAME>?sslmode=require"
    ```

1.  Get a list of your existing policies. This query returns a list of all your
    policies, including continuous aggregate refresh policies, retention
    policies, compression policies, and reorder policies:

    ```sql
    SELECT application_name, schedule_interval, retry_period,
        config, hypertable_name
        FROM timescaledb_information.jobs WHERE owner = '&lt;SOURCE_DB_USERNAME>';
    ```

1.  Connect to your Tiger Cloud service:

    ```sql
    psql "postgres://tsdbadmin:&lt;PASSWORD>@&lt;HOST>:&lt;PORT>/tsdb?sslmode=require"
    ```

1.  Recreate each policy. For more information about recreating policies, see
    the sections on [continuous-aggregate refresh policies][cagg-policy],
    [retention policies][retention-policy], [Hypercore policies][setup-hypercore], and [reorder policies][reorder-policy].

## Update table statistics

Update your table statistics by running [`ANALYZE`][analyze] on your entire
dataset. Note that this might take some time depending on the size of your
database:

```sql
ANALYZE;
```

### Troubleshooting

If you see errors of the following form when you run `ANALYZE`, you can safely
ignore them:

```
WARNING:  skipping "" --- only superuser can analyze it
```

The skipped tables and indexes correspond to system catalogs that can't be
accessed. Skipping them does not affect statistics on your data.

===== PAGE: https://docs.tigerdata.com/self-hosted/migration/same-db/ =====

# Migrate data to self-hosted TimescaleDB from the same Postgres instance

You can migrate data into a TimescaleDB hypertable from a regular Postgres
table. This method assumes that you have TimescaleDB set up in the same database
instance as your existing table.

## Prerequisites

Before beginning, make sure you have [installed and set up][install] TimescaleDB.

You also need a table with existing data. In this example, the source table is
named `old_table`. Replace the table name with your actual table name. The
example also names the destination table `new_table`, but you might want to use
a more descriptive name.

## Migrate data

Migrate your data into TimescaleDB from within the same database.

## Migrating data

1.  Call [CREATE TABLE][hypertable-create-table] to make a new table based on your existing table.

    You can create your indexes at the same time, so you don't have to recreate them manually. Or you can
    create the table without indexes, which makes data migration faster.

    ```sql
    CREATE TABLE new_table (
        LIKE old_table INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES
    ) WITH (
        tsdb.hypertable,
        tsdb.partition_column='&lt;the name of the time column>'
    );
    ```

    ```sql
    CREATE TABLE new_table (
        LIKE old_table INCLUDING DEFAULTS INCLUDING CONSTRAINTS EXCLUDING INDEXES
    ) WITH (
        tsdb.hypertable,
        tsdb.partition_column='&lt;the name of the time column>'
    );
    ```

    If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

1.  Insert data from the old table to the new table.

    ```sql
    INSERT INTO new_table
      SELECT * FROM old_table;
    ```

1.  If you created your new table without indexes, recreate your indexes now.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/mst/corrupt-index-duplicate/ =====

# Corrupted unique index has duplicated rows

When you try to rebuild index with `REINDEX` it fails because of conflicting
duplicated rows.

To identify conflicting duplicate rows, you need to run a query that counts the
number of rows for each combination of columns included in the index definition.

For example, this `route` table has a `unique_route_index` index defining
unique rows based on the combination of the `source` and `destination` columns:

```sql
CREATE TABLE route(
    source TEXT,
    destination TEXT,
    description TEXT
    );

CREATE UNIQUE INDEX unique_route_index
    ON route (source, destination);
```

If the `unique_route_index` is corrupt, you can find duplicated rows in the
`route` table using this query:

```sql
SELECT
    source,
    destination,
    count
FROM
    (SELECT
        source,
        destination,
        COUNT(*) AS count
    FROM route
    GROUP BY
        source,
        destination) AS foo
WHERE count > 1;
```

The query groups the data by the same `source` and `destination` fields defined
in the index, and filters any entries with more than one occurrence.

Resolve the problematic entries in the rows by manually deleting or merging the
entries until no duplicates exist. After all duplicate entries are removed, you
can use the `REINDEX` command to rebuild the index.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/mst/changing-owner-permission-denied/ =====

# Permission denied when changing ownership of tables and hypertables

You might see this error when using the `ALTER TABLE` command to change the
ownership of tables or hypertables.

This use of `ALTER TABLE` is blocked because the `tsdbadmin` user is not a
superuser.

To change table ownership, use the [`REASSIGN`][sql-reassign] command instead:

```sql
REASSIGN OWNED BY <current_role> TO <desired_role>
```

===== PAGE: https://docs.tigerdata.com/_troubleshooting/mst/transaction-wraparound/ =====

# Postgres transaction ID wraparound

The transaction control mechanism in Postgres assigns a transaction ID to
every row that is modified in the database; these IDs control the visibility of
that row to other concurrent transactions. The transaction ID is a 32-bit number
where two billion IDs are always in the visible past and the remaining IDs are
reserved for future transactions and are not visible to the running transaction.
To avoid a transaction wraparound of old rows, Postgres requires occasional
cleanup and freezing of old rows. This ensures that existing rows are visible
when more transactions are created. You can manually freeze the old rows by
executing `VACUUM FREEZE`. It can also be done automatically using the
`autovacuum` daemon when a configured number of transactions has been created
since the last freeze point.

In Managed Service for TimescaleDB, the transaction limit is set according to
the size of the database, up to 1.5 billion transactions. This ensures 500
million transaction IDs are available before a forced freeze and avoids
churning stable data in existing tables. To check your transaction freeze
limits, you can execute `show autovacuum_freeze_max_age` in your Postgres
instance. When the limit is reached, `autovacuum` starts freezing the old rows.
Some applications do not automatically adjust the configuration when the Postgres
settings change, which can result in unnecessary warnings. For example,
PGHero's default settings alert when 500 million transactions have been created
instead of alerting after 1.5 billion transactions. To avoid this, change the
value of the `transaction_id_danger` setting from 1,500,000,000 to
500,000,000, to receive warnings when the transaction limit reaches 1.5 billion.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/mst/low-disk-memory-cpu/ =====

# Service is running low on disk, memory, or CPU

When your database reaches 90% of your allocated disk, memory, or CPU resources,
an automated message with the text above is sent to your email address.

You can resolve this by logging in to your Managed Service for TimescaleDB
account and increasing your available resources. From the Managed Service for TimescaleDB Dashboard, select the service that you want to increase resources
for. In the `Overview` tab, locate the `Service Plan` section, and click
`Upgrade Plan`. Select the plan that suits your requirements, and click
`Upgrade` to enable the additional resources.

If you run out of resources regularly, you might need to consider using your
resources more efficiently. Consider enabling [Hypercore][setup-hypercore],
using [continuous aggregates][howto-caggs], or
[configuring data retention][howto-dataretention] to reduce the amount of
resources your database uses.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/mst/forgotten-password/ =====

# Reset password

It happens to us all, you want to login to MST Console, and the password is somewhere
next to your keys, wherever they are.

To reset your password:

1. Open [MST Portal][mst-login].
2. Click `Forgot password`.
3. Enter your email address, then click `Reset password`.

A secure reset password link is sent to the email associated with this account. Click the link
and update your password.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/mst/resolving-dns/ =====

# Problem resolving DNS

services require a DNS record. When you launch a
new service the DNS record is created, and it can take some time for the new
name to propagate to DNS servers around the world.

If you move an existing service to a new Cloud provider or region, the service
is rebuilt in the new region in the background. When the service has been
rebuilt in the new region, the DNS records are updated. This could cause a short
interruption to your service while the DNS changes are propagated.

If you are unable to resolve DNS, wait a few minutes and try again.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/upgrade-no-update-path/ =====

# TimescaleDB upgrade fails with no update path

In some cases, when you use the `ALTER EXTENSION timescaledb UPDATE` command to
upgrade, it might fail with the above error.

This occurs if the list of available extensions does not include the version you
are trying to upgrade to, and it can occur if the package was not installed
correctly in the first place. To correct the problem, install the upgrade
package, restart Postgres, verify the version, and then attempt the upgrade
again.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/pg_dump-version-mismatch/ =====

# Versions are mismatched when dumping and restoring a database

 The Postgres `pg_dump` command does not allow you to specify which version of
 the extension to use when backing up. This can create problems if you have a
 more recent version installed. For example, if you create the backup using an
 older version of TimescaleDB, and when you restore it uses the current version,
 without giving you an opportunity to upgrade first.

 You can work around this problem when you are restoring from backup by making
 sure the new Postgres instance has the same extension version as the original
 database before you perform the restore. After the data is restored, you can
 upgrade the version of TimescaleDB.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/upgrade-fails-already-loaded/ =====

# Upgrading fails with an error saying "old version has already been loaded"

When you use the `ALTER EXTENSION timescaledb UPDATE` command to upgrade, this
error might appear.

This occurs if you don't run `ALTER EXTENSION timescaledb UPDATE` command as the
first command after starting a new session using psql or if you use tab
completion when running the command. Tab completion triggers metadata queries in
the background which prevents the alter extension from being the first command.

To correct the problem, execute the ALTER EXTENSION command like this:

```sql
psql -X -c 'ALTER EXTENSION timescaledb UPDATE;'
```

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/migration-errors-perms/ =====

# Errors encountered during a pg_dump migration

The `pg_restore` function tries to apply the TimescaleDB extension when it
copies your schema. This can cause a permissions error. If you already have the
TimescaleDB extension installed, you can safely ignore this.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/pg_restore-errors/ =====

# Errors occur after restoring from file dump

 You might see the errors above when running `pg_restore`. When loading from a
 logical dump make sure that you set `timescaledb.restoring` to true before loading
 the dump.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/install-timescaledb-could-not-access-file/ =====

# Can't access file "timescaledb" after installation

If your Postgres logs have this error preventing it from starting up,
you should double check that the TimescaleDB files have been installed
to the correct location. Our installation methods use `pg_config` to
get Postgres's location. However if you have multiple versions of
Postgres installed on the same machine, the location `pg_config`
points to may not be for the version you expect. To check which
version TimescaleDB used:

```bash
$ pg_config --version
PostgreSQL 12.3
```

If that is the correct version, double check that the installation path is
the one you'd expect. For example, for Postgres 11.0 installed via
Homebrew on macOS it should be `/usr/local/Cellar/postgresql/11.0/bin`:

```bash
$ pg_config --bindir
/usr/local/Cellar/postgresql/11.0/bin
```

If either of those steps is not the version you are expecting, you need
to either (a) uninstall the incorrect version of Postgres if you can or
(b) update your `PATH` environmental variable to have the correct
path of `pg_config` listed first, that is, by prepending the full path:

```bash
export PATH = /usr/local/Cellar/postgresql/11.0/bin:$PATH
```

Then, reinstall TimescaleDB and it should find the correct installation
path.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/update-error-third-party-tool/ =====

# Error updating TimescaleDB when using a third-party Postgres admin tool

The update command `ALTER EXTENSION timescaledb UPDATE` must be the first command
executed upon connection to a database. Some admin tools execute commands before
this, which can disrupt the process. Try manually updating the database with
`psql`. For instructions, see the [updating guide][update].

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/windows-install-library-not-loaded/ =====

# Error loading the timescaledb extension

If you see a message saying that Postgres cannot load the TimescaleDB library `timescaledb-<version>.dll`, start a new psql
session to your self-hosted instance and create the `timescaledb` extension as the first command:

```bash
psql -X -d "postgres://<user>:<password>@<source_host>:<source_port>/<db_name>" -c "CREATE EXTENSION IF NOT EXISTS timescaledb;"
```

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/pg_dump-errors/ =====

# Errors occur when running `pg_dump`

 You might see the errors above when running `pg_dump`. You can safely ignore
 these. Your hypertable data is still accurately copied.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/background-worker-failed-start/ =====

# Failed to start a background worker

You might see this error message in the logs if background workers aren't
properly configured.

To fix this error, make sure that `max_worker_processes`,
`max_parallel_workers`, and `timescaledb.max_background_workers` are properly
set. `timescaledb.max_background_workers` should equal the number of databases
plus the number of concurrent background workers. `max_worker_processes` should
equal the sum of `timescaledb.max_background_workers` and
`max_parallel_workers`.

For more information, see the [worker configuration docs][worker-config].

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/toolkit-cannot-create-upgrade-extension/ =====

# Install or upgrade of TimescaleDB Toolkit fails

In some cases, when you create the TimescaleDB Toolkit extension, or upgrade it
with the `ALTER EXTENSION timescaledb_toolkit UPDATE` command, it might fail
with the above error.

This occurs if the list of available extensions does not include the version you
are trying to upgrade to, and it can occur if the package was not installed
correctly in the first place. To correct the problem, install the upgrade
package, restart Postgres, verify the version, and then attempt the update
again.

### Troubleshooting TimescaleDB Toolkit setup

1.  If you're installing Toolkit from a package, check your package manager's
    local repository list. Make sure the TimescaleDB repository is available and
    contains Toolkit. For instructions on adding the TimescaleDB repository, see
    the installation guides:
    *   [Linux installation guide][linux-install]
1.  Update your local repository list with `apt update` or `yum update`.
1.  Restart your Postgres service.
1.  Check that the right version of Toolkit is among your available extensions:

    ```sql
    SELECT * FROM pg_available_extensions
      WHERE name = 'timescaledb_toolkit';
    ```

    The result should look like this:

    ```bash
    -[ RECORD 1 ]-----+--------------------------------------------------------------------------------------
    name              | timescaledb_toolkit
    default_version   | 1.6.0
    installed_version | 1.6.0
    comment           | Library of analytical hyperfunctions, time-series pipelining, and other SQL utilities
    ```

1.  Retry `CREATE EXTENSION` or `ALTER EXTENSION`.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/pg_dump-permission-denied/ =====

# Permission denied for table `job_errors` when running `pg_dump`

 When the `pg_dump` tool tries to acquire a lock on the `job_errors`
 table, if the user doesn't have the required SELECT permission, it
 results in this error.

To resolve this issue, use a superuser account to grant the necessary
permissions to the user requiring the `pg_dump` tool.
Use this command to grant permissions to `<TEST_USER>`:
```sql
GRANT SELECT ON TABLE _timescaledb_internal.job_errors TO <TEST_USER>;
```

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/update-timescaledb-could-not-access-file/ =====

# Can't access file "timescaledb-VERSION" after update

If the error occurs immediately after updating your version of TimescaleDB and
the file mentioned is from the previous version, it is probably due to an incomplete
update process. Within the greater Postgres server instance, each
database that has TimescaleDB installed needs to be updated with the SQL command
`ALTER EXTENSION timescaledb UPDATE;` while connected to that database. Otherwise,
the database looks for the previous version of the TimescaleDB files.

See [our update docs][update-db] for more info.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/migration-errors/ =====

# Errors encountered during a pg_dump migration

If you see these errors during the migration process, you can safely ignore
them. The migration still occurs successfully.

===== PAGE: https://docs.tigerdata.com/tutorials/financial-tick-data/financial-tick-dataset/ =====

# Analyze financial tick data - Set up the dataset

This tutorial uses a dataset that contains second-by-second trade data for
the most-traded crypto-assets. You optimize this time-series data in a a hypertable called `assets_real_time`.
You also create a separate table of asset symbols in a regular Postgres table named `assets`.

The dataset is updated on a nightly basis and contains data from the last four
weeks, typically around 8 million rows of data. Trades are recorded in
real-time from 180+ cryptocurrency exchanges.

## Prerequisites

To follow the steps on this page:

* Create a target [Tiger Cloud service][create-service] with the Real-time analytics capability.

   You need [your connection details][connection-info]. This procedure also
   works for [self-hosted TimescaleDB][enable-timescaledb].

## Optimize time-series data in a hypertable

Hypertables are Postgres tables in TimescaleDB that automatically partition your time-series data by time. Time-series data represents the way a system, process, or behavior changes over time. Hypertables enable TimescaleDB to work efficiently with time-series data.  Each hypertable is made up of child tables called chunks. Each chunk is assigned a range
of time, and only contains data from that range. When you run a query, TimescaleDB identifies the correct chunk and
runs the query on it, instead of going through the entire table.

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

Because TimescaleDB is 100% Postgres, you can use all the standard Postgres tables, indexes, stored
procedures, and other objects alongside your hypertables. This makes creating and working with hypertables similar
to standard Postgres.

1. **Connect to your Tiger Cloud service**

   In [Tiger Cloud Console][services-portal] open an [SQL editor][in-console-editors]. You can also connect to your service using [psql][connect-using-psql].

1. **Create a hypertable to store the real-time cryptocurrency data**

   Create a [hypertable][hypertables-section] for your time-series data using [CREATE TABLE][hypertable-create-table].
   For [efficient queries][secondary-indexes] on data in the columnstore, remember to `segmentby` the column you will
   use most often to filter your data:

    ```sql
    CREATE TABLE crypto_ticks (
        "time" TIMESTAMPTZ,
        symbol TEXT,
        price DOUBLE PRECISION,
        day_volume NUMERIC
    ) WITH (
       tsdb.hypertable,
       tsdb.partition_column='time',
       tsdb.segmentby='symbol',
       tsdb.orderby='time DESC'
    );
    ```
   If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

## Create a standard Postgres table for relational data

When you have relational data that enhances your time-series data, store that data in
standard Postgres relational tables.

1.  **Add a table to store the asset symbol and name in a relational table**

    ```sql
    CREATE TABLE crypto_assets (
        symbol TEXT UNIQUE,
        "name" TEXT
    );
    ```

You now have two tables within your Tiger Cloud service. A hypertable named `crypto_ticks`, and a normal
Postgres table named `crypto_assets`.

## Load financial data

This tutorial uses real-time cryptocurrency data, also known as tick data, from
[Twelve Data][twelve-data]. To ingest data into the tables that you created, you need to
download the dataset, then upload the data to your Tiger Cloud service.

1. Unzip [crypto_sample.zip](https://assets.timescale.com/docs/downloads/candlestick/crypto_sample.zip) to a `<local folder>`.

   This test dataset contains second-by-second trade data for the most-traded crypto-assets
   and a regular table of asset symbols and company names.

   To import up to 100GB of data directly from your current Postgres-based database,
   [migrate with downtime][migrate-with-downtime] using native Postgres tooling. To seamlessly import 100GB-10TB+
   of data, use the [live migration][migrate-live] tooling supplied by Tiger Data. To add data from non-Postgres
   data sources, see [Import and ingest data][data-ingest].

1. In Terminal, navigate to `<local folder>` and connect to your service.
   ```bash
