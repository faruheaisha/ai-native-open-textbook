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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/compression.md"
sourceRel: "i18n/zh/skills/timescaledb/references/compression.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/compression.md"
sourceSha256: "488dd1571052c58332a963deed8b1dbd3633dc2724e884eef2085c4098409ec7"
pageSha256: "4b0b68b5cb3af08e01b2e4948880d935f4b35723c92220a8c8b07983be5a7de1"
contentMode: "local-full"
zh: ""
---

### Enabling compression

1.  At the `psql` prompt, alter the table:

1.  Add a compression policy to compress chunks that are older than seven days:

For more information, see the API reference for
[`ALTER TABLE (compression)`][alter-table-compression] and
[`add_compression_policy`][add_compression_policy].

## View current compression policy

To view the compression policy that you've set:

For more information, see the API reference for [`timescaledb_information.jobs`][timescaledb_information-jobs].

## Pause compression policy

To disable a compression policy temporarily, find the corresponding job ID and then call `alter_job` to pause it:

## Remove compression policy

To remove a compression policy, use `remove_compression_policy`:

For more information, see the API reference for
[`remove_compression_policy`][remove_compression_policy].

## Disable compression

You can disable compression entirely on individual hypertables. This command
works only if you don't currently have any compressed chunks:

If your hypertable contains compressed chunks, you need to
[decompress each chunk][decompress-chunks] individually before you can turn off
compression.

===== PAGE: https://docs.tigerdata.com/use-timescale/compression/modify-compressed-data/ =====

**Examples:**

Example 1 (sql):
```sql
ALTER TABLE example SET (
      timescaledb.compress,
      timescaledb.compress_segmentby = 'device_id'
    );
```

Example 2 (sql):
```sql
SELECT add_compression_policy('example', INTERVAL '7 days');
```

Example 3 (sql):
```sql
SELECT * FROM timescaledb_information.jobs
  WHERE proc_name='policy_compression';
```

Example 4 (sql):
```sql
SELECT * FROM timescaledb_information.jobs where proc_name = 'policy_compression' AND relname = 'example'
```

---

## Compress your data using hypercore

**URL:** llms-txt#compress-your-data-using-hypercore

**Contents:**
- Optimize your data in the columnstore
- Take advantage of query speedups

Over time you end up with a lot of data. Since this data is mostly immutable, you can compress it
to save space and avoid incurring additional cost.

TimescaleDB is built for handling event-oriented data such as time-series and fast analytical queries, it comes with support
of [hypercore][hypercore] featuring the columnstore.

[Hypercore][hypercore] enables you to store the data in a vastly more efficient format allowing
up to 90x compression ratio compared to a normal Postgres table. However, this is highly dependent
on the data and configuration.

[Hypercore][hypercore] is implemented natively in Postgres and does not require special storage
formats. When you convert your data from the rowstore to the columnstore, TimescaleDB uses
Postgres features to transform the data into columnar format. The use of a columnar format allows a better
compression ratio since similar data is stored adjacently. For more details on the columnar format,
see [hypercore][hypercore].

A beneficial side effect of compressing data is that certain queries are significantly faster, since
less data has to be read into memory.

## Optimize your data in the columnstore

To compress the data in the `transactions` table, do the following:

1. Connect to your Tiger Cloud service

In [Tiger Cloud Console][services-portal] open an [SQL editor][in-console-editors]. The in-Console editors display the query speed.
   You can also connect to your service using [psql][connect-using-psql].

1. Convert data to the columnstore:

You can do this either automatically or manually:
   - [Automatically convert chunks][add_columnstore_policy] in the hypertable to the columnstore at a specific time interval:

- [Manually convert all chunks][convert_to_columnstore] in the hypertable to the columnstore:

## Take advantage of query speedups

Previously, data in the columnstore was segmented by the `block_id` column value.
This means fetching data by filtering or grouping on that column is
more efficient. Ordering is set to time descending. This means that when you run queries
which try to order data in the same way, you see performance benefits.

1. Connect to your Tiger Cloud service

In [Tiger Cloud Console][services-portal] open an [SQL editor][in-console-editors]. The in-Console editors display the query speed.

1. Run the following query:

Performance speedup is of two orders of magnitude, around 15 ms when compressed in the columnstore and
   1 second when decompressed in the rowstore.

===== PAGE: https://docs.tigerdata.com/tutorials/blockchain-query/blockchain-dataset/ =====

**Examples:**

Example 1 (sql):
```sql
CALL add_columnstore_policy('transactions', after => INTERVAL '1d');
```

Example 2 (sql):
```sql
DO $$
       DECLARE
          chunk_name TEXT;
       BEGIN
          FOR chunk_name IN (SELECT c FROM show_chunks('transactions') c)
          LOOP
             RAISE NOTICE 'Converting chunk: %', chunk_name; -- Optional: To see progress
             CALL convert_to_columnstore(chunk_name);
          END LOOP;
          RAISE NOTICE 'Conversion to columnar storage complete for all chunks.'; -- Optional: Completion message
       END$$;
```

Example 3 (sql):
```sql
WITH recent_blocks AS (
    SELECT block_id FROM transactions
    WHERE is_coinbase IS TRUE
    ORDER BY time DESC
    LIMIT 5
   )
   SELECT
    t.block_id, count(*) AS transaction_count,
    SUM(weight) AS block_weight,
    SUM(output_total_usd) AS block_value_usd
   FROM transactions t
   INNER JOIN recent_blocks b ON b.block_id = t.block_id
   WHERE is_coinbase IS NOT TRUE
   GROUP BY t.block_id;
```

---

## ALTER TABLE (Compression)

**URL:** llms-txt#alter-table-(compression)

**Contents:**
- Samples
- Required arguments
- Optional arguments
- Parameters

Old API since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Replaced by <a href="https://docs.tigerdata.com/api/latest/hypercore/alter_table/">ALTER TABLE (Hypercore)</a>.

'ALTER TABLE' statement is used to turn on compression and set compression
options.

By itself, this `ALTER` statement alone does not compress a hypertable. To do so, either create a
compression policy using the [add_compression_policy][add_compression_policy] function or manually
compress a specific hypertable chunk using the [compress_chunk][compress_chunk] function.

Configure a hypertable that ingests device data to use compression. Here, if the hypertable
is often queried about a specific device or set of devices, the compression should be
segmented using the `device_id` for greater performance.

You can also specify compressed chunk interval without changing other
compression settings:

To disable the previously set option, set the interval to 0:

## Required arguments

|Name|Type|Description|
|-|-|-|
|`timescaledb.compress`|BOOLEAN|Enable or disable compression|

## Optional arguments

|Name|Type| Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|-|-|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`timescaledb.compress_orderby`|TEXT| Order used by compression, specified in the same way as the ORDER BY clause in a SELECT query. The default is the descending order of the hypertable's time column.                                                                                                                                                                                                                                                                                                                                             |
|`timescaledb.compress_segmentby`|TEXT| Column list on which to key the compressed segments. An identifier representing the source of the data such as `device_id` or `tags_id` is usually a good candidate. The default is no `segment by` columns.                                                                                                                                                                                                                                                                                                    |
|`timescaledb.compress_chunk_time_interval`|TEXT| EXPERIMENTAL: Set compressed chunk time interval used to roll chunks into. This parameter compresses every chunk, and then irreversibly merges it into a previous adjacent chunk if possible, to reduce the total number of chunks in the hypertable. Note that chunks will not be split up during decompression. It should be set to a multiple of the current chunk interval. This option can be changed independently of other compression settings and does not require the `timescaledb.compress` argument. |

|Name|Type|Description|
|-|-|-|
|`table_name`|TEXT|Hypertable that supports compression|
|`column_name`|TEXT|Column used to order by or segment by|
|`interval`|TEXT|Time interval used to roll compressed chunks into|

===== PAGE: https://docs.tigerdata.com/api/compression/hypertable_compression_stats/ =====

**Examples:**

Example 1 (unknown):
```unknown
## Samples

Configure a hypertable that ingests device data to use compression. Here, if the hypertable
is often queried about a specific device or set of devices, the compression should be
segmented using the `device_id` for greater performance.
```

Example 2 (unknown):
```unknown
You can also specify compressed chunk interval without changing other
compression settings:
```

Example 3 (unknown):
```unknown
To disable the previously set option, set the interval to 0:
```

---

## FAQ and troubleshooting

**URL:** llms-txt#faq-and-troubleshooting

**Contents:**
- Unsupported in live migration
- Where can I find logs for processes running during live migration?
- Source and target databases have different TimescaleDB versions
- Why does live migration log "no tuple identifier" warning?
- Set REPLICA IDENTITY on Postgres partitioned tables
- Can I use read/failover replicas as source database for live migration?
- Can I use live migration with a Postgres connection pooler like PgBouncer?
- Can I use Tiger Cloud instance as source for live migration?
- How can I exclude a schema/table from being replicated in live migration?
- Large migrations blocked

## Unsupported in live migration

Live migration tooling is currently experimental. You may run into the following shortcomings:

- Live migration does not yet support mutable columnstore compression (`INSERT`, `UPDATE`,
  `DELETE` on data in the columnstore).
- By default, numeric fields containing `NaN`/`+Inf`/`-Inf` values are not
  correctly replicated, and will be converted to `NULL`. A workaround is available, but is not enabled by default.

Should you run into any problems, please open a support request before losing
any time debugging issues.
You can open a support request directly from [Tiger Cloud Console][support-link],
or by email to [support@tigerdata.com](mailto:support@tigerdata.com).

## Where can I find logs for processes running during live migration?

Live migration involves several background processes to manage different stages of
the migration. The logs of these processes can be helpful for troubleshooting
unexpected behavior. You can find these logs in the `<volume_mount>/logs` directory.

## Source and target databases have different TimescaleDB versions

When you migrate a [self-hosted][self hosted] or [Managed Service for TimescaleDB (MST)][mst]
database to Tiger Cloud, the source database and the destination
[Tiger Cloud service][timescale-service] must run the same version of TimescaleDB.

Before you start [live migration][live migration]:

1. Check the version of TimescaleDB running on the source database and the
   target Tiger Cloud service:

1. If the version of TimescaleDB on the source database is lower than your Tiger Cloud service, either:
    - **Downgrade**: reinstall an older version of TimescaleDB on your Tiger Cloud service that matches the source database:

1. Connect to your Tiger Cloud service and check the versions of TimescaleDB available:

2. If an available TimescaleDB release matches your source database:

1. Uninstall TimescaleDB from your Tiger Cloud service:

1. Reinstall the correct version of TimescaleDB:

You may need to reconnect to your Tiger Cloud service using `psql -X` when you're creating the TimescaleDB extension.

- **Upgrade**: for self-hosted databases, [upgrade TimescaleDB][self hosted upgrade] to match your Tiger Cloud service.

## Why does live migration log "no tuple identifier" warning?

Live migration logs a warning `WARNING: no tuple identifier for UPDATE in table`
when it cannot determine which specific rows should be updated after receiving an
`UPDATE` statement from the source database during replication. This occurs when tables
in the source database that receive `UPDATE` statements lack either a `PRIMARY KEY` or
a `REPLICA IDENTITY` setting. For live migration to successfully replicate `UPDATE` and
`DELETE` statements, tables must have either a `PRIMARY KEY` or `REPLICA IDENTITY` set
as a prerequisite.

## Set REPLICA IDENTITY on Postgres partitioned tables

If your Postgres tables use native partitioning, setting `REPLICA IDENTITY` on the
root (parent) table will not automatically apply it to the partitioned child tables.
You must manually set `REPLICA IDENTITY` on each partitioned child table.

## Can I use read/failover replicas as source database for live migration?

Live migration does not support replication from read or failover replicas. You must
provide a connection string that points directly to your source database for
live migration.

## Can I use live migration with a Postgres connection pooler like PgBouncer?

Live migration does not support connection poolers. You must provide a
connection string that points directly to your source and target databases
for live migration to work smoothly.

## Can I use Tiger Cloud instance as source for live migration?

No, Tiger Cloud cannot be used as a source database for live migration.

## How can I exclude a schema/table from being replicated in live migration?

At present, live migration does not allow for excluding schemas or tables from
replication, but this feature is expected to be added in future releases.
However, a workaround is available for skipping table data using the `--skip-table-data` flag.
For more information, please refer to the help text under the `migrate` subcommand.

## Large migrations blocked

Tiger Cloud automatically manages the underlying disk volume. Due to
platform limitations, it is only possible to resize the disk once every six
hours. Depending on the rate at which you're able to copy data, you may be
affected by this restriction. Affected instances are unable to accept new data
and error with: `FATAL: terminating connection due to administrator command`.

If you intend on migrating more than 400&nbspGB of data to Tiger Cloud, open a
support request requesting the required storage to be pre-allocated in your
Tiger Cloud service.

You can open a support request directly from [Tiger Cloud Console][support-link],
or by email to [support@tigerdata.com](mailto:support@tigerdata.com).

When `pg_dump` starts, it takes an `ACCESS SHARE` lock on all tables which it
dumps. This ensures that tables aren't dropped before `pg_dump` is able to drop
them. A side effect of this is that any query which tries to take an
`ACCESS EXCLUSIVE` lock on a table is be blocked by the `ACCESS SHARE` lock.

A number of Tiger Cloud-internal processes require taking `ACCESS EXCLUSIVE`
locks to ensure consistency of the data. The following is a non-exhaustive list
of potentially affected operations:

- converting a chunk into the columnstore/rowstore and back
- continuous aggregate refresh (before 2.12)
- create hypertable with foreign keys, truncate hypertable
- enable hypercore on a hypertable
- drop chunks

The most likely impact of the above is that background jobs for retention
policies, columnstore compression policies, and continuous aggregate refresh policies are
blocked for the duration of the `pg_dump` command. This may have unintended
consequences for your database performance.

## Dumping with concurrency

When using the `pg_dump` directory format, it is possible to use concurrency to
use multiple connections to the source database to dump data. This speeds up
the dump process. Due to the fact that there are multiple connections, it is
possible for `pg_dump` to end up in a deadlock situation. When it detects a
deadlock it aborts the dump.

In principle, any query which takes an `ACCESS EXCLUSIVE` lock on a table
causes such a deadlock. As mentioned above, some common operations which take
an `ACCESS EXCLUSIVE` lock are:
- retention policies
- columnstore compression policies
- continuous aggregate refresh policies

If you would like to use concurrency nonetheless, turn off all background jobs
in the source database before running `pg_dump`, and turn them on once the dump
is complete. If the dump procedure takes longer than the continuous aggregate
refresh policy's window, you must manually refresh the continuous aggregate in
the correct time range. For more information, consult the
[refresh policies documentation].

To turn off the jobs:

## Restoring with concurrency

If the directory format is used for `pg_dump` and `pg_restore`, concurrency can be
employed to speed up the process. Unfortunately, loading the tables in the
`timescaledb_catalog` schema concurrently causes errors. Furthermore, the
`tsdbadmin` user does not have sufficient privileges to turn off triggers in
this schema. To get around this limitation, load this schema serially, and then
load the rest of the database concurrently.

## Ownership of background jobs

The `_timescaledb_config.bgw_jobs` table is used to manage background jobs.
This includes custom jobs, columnstore compression policies, retention
policies, and continuous aggregate refresh policies. On Tiger Cloud, this table
has a trigger which ensures that no database user can create or modify jobs
owned by another database user. This trigger can provide an obstacle for migrations.

If the `--no-owner` flag is used with `pg_dump` and `pg_restore`, all
objects in the target database are owned by the user that ran
`pg_restore`, likely `tsdbadmin`.

If all the background jobs in the source database were owned by a user of the
same name as the user running the restore (again likely `tsdbadmin`), then
loading the `_timescaledb_config.bgw_jobs` table should work.

If the background jobs in the source were owned by the `postgres` user, they
are be automatically changed to be owned by the `tsdbadmin` user. In this case,
one just needs to verify that the jobs do not make use of privileges that the
`tsdbadmin` user does not possess.

If background jobs are owned by one or more users other than the user
employed in restoring, then there could be issues. To work around this
issue, do not dump this table with `pg_dump`. Provide either
`--exclude-table-data='_timescaledb_config.bgw_job'` or
`--exclude-table='_timescaledb_config.bgw_job'` to `pg_dump` to skip
this table.  Then, use `psql` and the `COPY` command to dump and
restore this table with modified values for the `owner` column.

Once the table has been loaded and the restore completed, you may then use SQL
to adjust the ownership of the jobs and/or the associated stored procedures and
functions as you wish.

## Extension availability

There are a vast number of Postgres extensions available in the wild.
Tiger Cloud supports many of the most popular extensions, but not all extensions.
Before migrating, check that the extensions you are using are supported on
Tiger Cloud. Consult the [list of supported extensions].

## TimescaleDB extension in the public schema

When self-hosting, the TimescaleDB extension may be installed in an arbitrary
schema. Tiger Cloud only supports installing the TimescaleDB extension in the
`public` schema. How to go about resolving this depends heavily on the
particular details of the source schema and the migration approach chosen.

Tiger Cloud does not support using custom tablespaces. Providing the
`--no-tablespaces` flag to `pg_dump` and `pg_restore` when
dumping/restoring the schema results in all objects being in the
default tablespace as desired.

## Only one database per instance

While Postgres clusters can contain many databases, Tiger Cloud services are
limited to a single database. When migrating a cluster with multiple databases
to Tiger Cloud, one can either migrate each source database to a separate
Tiger Cloud service or "merge" source databases to target schemas.

## Superuser privileges

The `tsdbadmin` database user is the most powerful available on Tiger Cloud, but it
is not a true superuser. Review your application for use of superuser privileged
operations and mitigate before migrating.

## Migrate partial continuous aggregates

In order to improve the performance and compatibility of continuous aggregates, TimescaleDB
v2.7 replaces _partial_ continuous aggregates with _finalized_ continuous aggregates.

To test your database for partial continuous aggregates, run the following query:

If you have partial continuous aggregates in your database, [migrate them][migrate]
from partial to finalized before you migrate your database.

If you accidentally migrate partial continuous aggregates across Postgres
versions, you see the following error when you query any continuous aggregates:

===== PAGE: https://docs.tigerdata.com/ai/mcp-server/ =====

**Examples:**

Example 1 (sql):
```sql
select extversion from pg_extension where extname = 'timescaledb';
```

Example 2 (sql):
```sql
SELECT version FROM pg_available_extension_versions WHERE name = 'timescaledb' ORDER BY 1 DESC;
```

Example 3 (sql):
```sql
DROP EXTENSION timescaledb;
```

Example 4 (sql):
```sql
CREATE EXTENSION timescaledb VERSION '<version>';
```

---

## Energy consumption data tutorial - set up compression

**URL:** llms-txt#energy-consumption-data-tutorial---set-up-compression

**Contents:**
- Compression setup
- Add a compression policy
- Taking advantage of query speedups

You have now seen how to create a hypertable for your energy consumption
dataset and query it. When ingesting a dataset like this
is seldom necessary to update old data and over time the amount of
data in the tables grows. Over time you end up with a lot of data and
since this is mostly immutable you can compress it to save space and
avoid incurring additional cost.

It is possible to use disk-oriented compression like the support
offered by ZFS and Btrfs but since TimescaleDB is build for handling
event-oriented data (such as time-series) it comes with support for
compressing data in hypertables.

TimescaleDB compression allows you to store the data in a vastly more
efficient format allowing up to 20x compression ratio compared to a
normal Postgres table, but this is of course highly dependent on the
data and configuration.

TimescaleDB compression is implemented natively in Postgres and does
not require special storage formats. Instead it relies on features of
Postgres to transform the data into columnar format before
compression. The use of a columnar format allows better compression
ratio since similar data is stored adjacently. For more details on how
the compression format looks, you can look at the [compression
design][compression-design] section.

A beneficial side-effect of compressing data is that certain queries
are significantly faster since less data has to be read into
memory.

1.  Connect to the Tiger Cloud service that contains the energy
    dataset using, for example `psql`.
1.  Enable compression on the table and pick suitable segment-by and
    order-by column using the `ALTER TABLE` command:

Depending on the choice if segment-by and order-by column you can
    get very different performance and compression ratio. To learn
    more about how to pick the correct columns, see
    [here][segment-by-columns].
1.  You can manually compress all the chunks of the hypertable using
    `compress_chunk` in this manner:
    
    You can also [automate compression][automatic-compression] by
    adding a [compression policy][add_compression_policy] which will
    be covered below.

1.  Now that you have compressed the table you can compare the size of
    the dataset before and after compression:

This shows a significant improvement in data usage:

## Add a compression policy

To avoid running the compression step each time you have some data to
compress you can set up a compression policy. The compression policy
allows you to compress data that is older than a particular age, for
example, to compress all chunks that are older than 8 days:

Compression policies run on a regular schedule, by default once every
day, which means that you might have up to 9 days of uncompressed data
with the setting above.

You can find more information on compression policies in the
[add_compression_policy][add_compression_policy] section.

## Taking advantage of query speedups

Previously, compression was set up to be segmented by `type_id` column value.
This means fetching data by filtering or grouping on that column will be
more efficient. Ordering is also set to `created` descending so if you run queries
which try to order data with that ordering, you should see performance benefits.

For instance, if you run the query example from previous section:

You should see a decent performance difference when the dataset is compressed and
when is decompressed. Try it yourself by running the previous query, decompressing
the dataset and running it again while timing the execution time. You can enable
timing query times in psql by running:

To decompress the whole dataset, run:

On an example setup, speedup performance observed was an order of magnitude,
30 ms when compressed vs 360 ms when decompressed.

Try it yourself and see what you get!

===== PAGE: https://docs.tigerdata.com/tutorials/financial-ingest-real-time/financial-ingest-dataset/ =====

**Examples:**

Example 1 (sql):
```sql
ALTER TABLE metrics
    SET (
        timescaledb.compress,
        timescaledb.compress_segmentby='type_id',
        timescaledb.compress_orderby='created DESC'
    );
```

Example 2 (sql):
```sql
SELECT compress_chunk(c) from show_chunks('metrics') c;
```

Example 3 (sql):
```sql
SELECT
        pg_size_pretty(before_compression_total_bytes) as before,
        pg_size_pretty(after_compression_total_bytes) as after
     FROM hypertable_compression_stats('metrics');
```

Example 4 (sql):
```sql
before | after
    --------+-------
     180 MB | 16 MB
    (1 row)
```

---

## Tuple decompression limit exceeded by operation

**URL:** llms-txt#tuple-decompression-limit-exceeded-by-operation

When inserting, updating, or deleting tuples from chunks in the columnstore, it might be necessary to convert tuples to the rowstore. This happens either when you are updating existing tuples or have constraints that need to be verified during insert time. If you happen to trigger a lot of rowstore conversion with a single command, you may end up running out of storage space. For this reason, a limit has been put in place on the number of tuples you can decompress into the rowstore for a single command.

The limit can be increased or turned off (set to 0) like so:

===== PAGE: https://docs.tigerdata.com/_troubleshooting/caggs-queries-fail/ =====

**Examples:**

Example 1 (sql):
```sql
-- set limit to a milion tuples
SET timescaledb.max_tuples_decompressed_per_dml_transaction TO 1000000;
-- disable limit by setting to 0
SET timescaledb.max_tuples_decompressed_per_dml_transaction TO 0;
```

---

## Schema modifications

**URL:** llms-txt#schema-modifications

**Contents:**
- Add a nullable column
- Add a column with a default value and a NOT NULL constraint
- Rename a column
- Drop a column

You can modify the schema of compressed hypertables in recent versions of
TimescaleDB.

|Schema modification|Before TimescaleDB&nbsp;2.1|TimescaleDB&nbsp;2.1 to 2.5|TimescaleDB&nbsp;2.6 and above|
|-|-|-|-|
|Add a nullable column|❌|✅|✅|
|Add a column with a default value and a `NOT NULL` constraint|❌|❌|✅|
|Rename a column|❌|✅|✅|
|Drop a column|❌|❌|✅|
|Change the data type of a column|❌|❌|❌|

To perform operations that aren't supported on compressed hypertables, first
[decompress][decompression] the table.

## Add a nullable column

To add a nullable column:

Note that adding constraints to the new column is not supported before
TimescaleDB v2.6.

## Add a column with a default value and a NOT NULL constraint

To add a column with a default value and a not-null constraint:

You can drop a column from a compressed hypertable, if the column is not an
`orderby` or `segmentby` column. To drop a column:

===== PAGE: https://docs.tigerdata.com/use-timescale/compression/decompress-chunks/ =====

**Examples:**

Example 1 (sql):
```sql
ALTER TABLE <hypertable> ADD COLUMN <column_name> <datatype>;
```

Example 2 (sql):
```sql
ALTER TABLE conditions ADD COLUMN device_id integer;
```

Example 3 (sql):
```sql
ALTER TABLE <hypertable> ADD COLUMN <column_name> <datatype>
    NOT NULL DEFAULT <default_value>;
```

Example 4 (sql):
```sql
ALTER TABLE conditions ADD COLUMN device_id integer
    NOT NULL DEFAULT 1;
```

---

## Compression

**URL:** llms-txt#compression

**Contents:**
- Restrictions

Old API since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Replaced by <a href="https://docs.timescale.com/api/latest/hypercore/">Hypercore</a>.

Compression functionality is included in Hypercore.

Before you set up compression, you need to
[configure the hypertable for compression][configure-compression] and then
[set up a compression policy][add_compression_policy].

Before you set up compression for the first time, read
the compression
[blog post](https://www.tigerdata.com/blog/building-columnar-compression-in-a-row-oriented-database)
and
[documentation](https://docs.tigerdata.com/use-timescale/latest/compression/).

You can also [compress chunks manually][compress_chunk], instead of using an
automated compression policy to compress chunks as they age.

Compressed chunks have the following limitations:

*   `ROW LEVEL SECURITY` is not supported on compressed chunks.
*   Creation of unique constraints on compressed chunks is not supported. You
    can add them by disabling compression on the hypertable and re-enabling
    after constraint creation.

In general, compressing a hypertable imposes some limitations on the types
of data modifications that you can perform on data inside a compressed chunk.

This table shows changes to the compression feature, added in different versions
of TimescaleDB:

|TimescaleDB version|Supported data modifications on compressed chunks|
|-|-|
|1.5 - 2.0|Data and schema modifications are not supported.|
|2.1 - 2.2|Schema may be modified on compressed hypertables. Data modification not supported.|
|2.3|Schema modifications and basic insert of new data is allowed. Deleting, updating and some advanced insert statements are not supported.|
|2.11|Deleting, updating and advanced insert statements are supported.|

In TimescaleDB 2.1&nbsp;and later, you can modify the schema of hypertables that
have compressed chunks. Specifically, you can add columns to and rename existing
columns of compressed hypertables.

In TimescaleDB v2.3 and later, you can insert data into compressed chunks
and to enable compression policies on distributed hypertables.

In TimescaleDB v2.11 and later, you can update and delete compressed data.
You can also use advanced insert statements like `ON CONFLICT` and `RETURNING`.

===== PAGE: https://docs.tigerdata.com/api/distributed-hypertables/ =====
