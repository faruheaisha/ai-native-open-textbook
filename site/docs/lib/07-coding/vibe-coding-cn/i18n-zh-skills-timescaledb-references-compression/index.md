---
title: "Timescaledb - Compression"
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
pageSha256: "942b5f14c3b4bc744ca74bf133718fb529a7d8cdea1edf7efc167500bf4addc5"
contentMode: "local-full"
zh: ""
---

# Timescaledb - Compression

**Pages:** 19

---

## Inserting or modifying data in the columnstore

**URL:** llms-txt#inserting-or-modifying-data-in-the-columnstore

**Contents:**
- Earlier versions of TimescaleDB (before v2.11.0)

In TimescaleDB [v2.11.0][tsdb-release-2-11-0] and later, you can use the `UPDATE` and `DELETE`
commands to modify existing rows in compressed chunks. This works in a similar
way to `INSERT` operations. To reduce the amount of decompression, TimescaleDB only attempts to decompress data where it is necessary.
However, if there are no qualifiers, or if the qualifiers cannot be used as filters, calls to `UPDATE` and `DELETE` may convert large amounts of data to the rowstore and back to the columnstore.
To avoid large scale conversion, filter on the columns you use to `segementby` and `orderby`. This filters as much data as possible before any data is modified, and reduces the amount of data conversions.

DML operations on the columnstore work if the data you are inserting has
unique constraints. Constraints are preserved during the insert operation.
TimescaleDB uses a Postgres function that decompresses relevant data during the insert
to check if the new data breaks unique checks. This means that any time you insert data
into the columnstore, a small amount of data is decompressed to allow a
speculative insertion, and block any inserts which could violate constraints.

For TimescaleDB [v2.17.0][tsdb-release-2-17-0] and later, delete performance is improved on compressed
hypertables when a large amount of data is affected. When you delete whole segments of
data, filter your deletes by `segmentby` column(s) instead of separate deletes.
This considerably increases performance by skipping the decompression step.
Since TimescaleDB [v2.21.0][tsdb-release-2-21-0] and later, `DELETE` operations on the columnstore
are executed on the batch level, which allows more performant deletion of data of non-segmentby columns
and reduces IO usage.

## Earlier versions of TimescaleDB (before v2.11.0)

This feature requires Postgres 14 or later

From TimescaleDB v2.3.0, you can insert data into compressed chunks with some
limitations. The primary limitation is that you can't insert data with unique
constraints. Additionally, newly inserted data needs to be compressed at the
same time as the data in the chunk, either by a running recompression policy, or
by using `recompress_chunk` manually on the chunk.

In TimescaleDB v2.2.0 and earlier, you cannot insert data into compressed chunks.

===== PAGE: https://docs.tigerdata.com/use-timescale/jobs/create-and-manage-jobs/ =====

---

## timescaledb_information.jobs

**URL:** llms-txt#timescaledb_information.jobs

**Contents:**
- Samples
- Arguments

Shows information about all jobs registered with the automation framework.

Shows a job associated with the refresh policy for continuous aggregates:

Find all jobs related to compression policies (before TimescaleDB v2.20):

Find all jobs related to columnstore policies (TimescaleDB v2.20 and later):

|Name|Type| Description                                                                                                  |
|-|-|--------------------------------------------------------------------------------------------------------------|
|`job_id`|`INTEGER`| The ID of the background job                                                                                |
|`application_name`|`TEXT`| Name of the policy or job                                                                        |
|`schedule_interval`|`INTERVAL`| The interval at which the job runs. Defaults to 24 hours                                                    |
|`max_runtime`|`INTERVAL`| The maximum amount of time the job is allowed to run by the background worker scheduler before it is stopped |
|`max_retries`|`INTEGER`| The number of times the job is retried if it fails                                                          |
|`retry_period`|`INTERVAL`| The amount of time the scheduler waits between retries of the job on failure                                |
|`proc_schema`|`TEXT`| Schema name of the function or procedure executed by the job                                                |
|`proc_name`|`TEXT`| Name of the function or procedure executed by the job                                                       |
|`owner`|`TEXT`| Owner of the job                                                                                            |
|`scheduled`|`BOOLEAN`| Set to `true` to run the job automatically                                                                  |
|`fixed_schedule`|BOOLEAN| Set to `true` for jobs executing at fixed times according to a schedule interval and initial start          |
|`config`|`JSONB`| Configuration passed to the function specified by `proc_name` at execution time                              |
|`next_start`|`TIMESTAMP WITH TIME ZONE`| Next start time for the job, if it is scheduled to run automatically                                        |
|`initial_start`|`TIMESTAMP WITH TIME ZONE`| Time the job is first run and also the time on which execution times are aligned for jobs with fixed schedules |
|`hypertable_schema`|`TEXT`| Schema name of the hypertable. Set to `NULL` for a job                                                      |
|`hypertable_name`|`TEXT`| Table name of the hypertable. Set to `NULL` for a job                                                       |
|`check_schema`|`TEXT`| Schema name of the optional configuration validation function, set when the job is created or updated       |
|`check_name`|`TEXT`| Name of the optional configuration validation function, set when the job is created or updated              |

===== PAGE: https://docs.tigerdata.com/api/informational-views/hypertables/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT * FROM timescaledb_information.jobs;
job_id            | 1001
application_name  | Refresh Continuous Aggregate Policy [1001]
schedule_interval | 01:00:00
max_runtime       | 00:00:00
max_retries       | -1
retry_period      | 01:00:00
proc_schema       | _timescaledb_internal
proc_name         | policy_refresh_continuous_aggregate
owner             | postgres
scheduled         | t
config            | {"start_offset": "20 days", "end_offset": "10
days", "mat_hypertable_id": 2}
next_start        | 2020-10-02 12:38:07.014042-04
hypertable_schema | _timescaledb_internal
hypertable_name   | _materialized_hypertable_2
check_schema      | _timescaledb_internal
check_name       | policy_refresh_continuous_aggregate_check
```

Example 2 (sql):
```sql
SELECT * FROM timescaledb_information.jobs where application_name like 'Compression%';
-[ RECORD 1 ]-----+--------------------------------------------------
job_id            | 1002
application_name  | Compression Policy [1002]
schedule_interval | 15 days 12:00:00
max_runtime       | 00:00:00
max_retries       | -1
retry_period      | 01:00:00
proc_schema       | _timescaledb_internal
proc_name         | policy_compression
owner             | postgres
scheduled         | t
config            | {"hypertable_id": 3, "compress_after": "60 days"}
next_start        | 2020-10-18 01:31:40.493764-04
hypertable_schema | public
hypertable_name   | conditions
check_schema      | _timescaledb_internal
check_name        | policy_compression_check
```

Example 3 (sql):
```sql
SELECT * FROM timescaledb_information.jobs where application_name like 'Columnstore%';
-[ RECORD 1 ]-----+--------------------------------------------------
job_id            | 1002
application_name  | Columnstore Policy [1002]
schedule_interval | 15 days 12:00:00
max_runtime       | 00:00:00
max_retries       | -1
retry_period      | 01:00:00
proc_schema       | _timescaledb_internal
proc_name         | policy_compression
owner             | postgres
scheduled         | t
config            | {"hypertable_id": 3, "compress_after": "60 days"}
next_start        | 2025-10-18 01:31:40.493764-04
hypertable_schema | public
hypertable_name   | conditions
check_schema      | _timescaledb_internal
check_name        | policy_compression_check
```

Example 4 (sql):
```sql
SELECT * FROM timescaledb_information.jobs where application_name like 'User-Define%';
-[ RECORD 1 ]-----+------------------------------
job_id            | 1003
application_name  | User-Defined Action [1003]
schedule_interval | 01:00:00
max_runtime       | 00:00:00
max_retries       | -1
retry_period      | 00:05:00
proc_schema       | public
proc_name         | custom_aggregation_func
owner             | postgres
scheduled         | t
config            | {"type": "function"}
next_start        | 2020-10-02 14:45:33.339885-04
hypertable_schema |
hypertable_name   |
check_schema      | NULL
check_name        | NULL
-[ RECORD 2 ]-----+------------------------------
job_id            | 1004
application_name  | User-Defined Action [1004]
schedule_interval | 01:00:00
max_runtime       | 00:00:00
max_retries       | -1
retry_period      | 00:05:00
proc_schema       | public
proc_name         | custom_retention_func
owner             | postgres
scheduled         | t
config            | {"type": "function"}
next_start        | 2020-10-02 14:45:33.353733-04
hypertable_schema |
hypertable_name   |
check_schema      | NULL
check_name        | NULL
```

---

## Low compression rate

**URL:** llms-txt#low-compression-rate

Low compression rates are often caused by [high cardinality][cardinality-blog] of the segment key. This means that the column you selected for grouping the rows during compression has too many unique values. This makes it impossible to group a lot of rows in a batch. To achieve better compression results, choose a segment key with lower cardinality.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/dropping-chunks-times-out/ =====

---

## Query time-series data tutorial - set up compression

**URL:** llms-txt#query-time-series-data-tutorial---set-up-compression

**Contents:**
- Compression setup
- Add a compression policy
- Taking advantage of query speedups

You have now seen how to create a hypertable for your NYC taxi trip
data and query it. When ingesting a dataset like this
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

1.  Connect to the Tiger Cloud service that contains the
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

Previously, compression was set up to be segmented by `vendor_id` column value.
This means fetching data by filtering or grouping on that column will be
more efficient. Ordering is also set to time descending so if you run queries
which try to order data with that ordering, you should see performance benefits.

For instance, if you run the query example from previous section:

You should see a decent performance difference when the dataset is compressed and
when is decompressed. Try it yourself by running the previous query, decompressing
the dataset and running it again while timing the execution time. You can enable
timing query times in psql by running:

To decompress the whole dataset, run:

On an example setup, speedup performance observed was pretty significant,
700 ms when compressed vs 1,2 sec when decompressed.

Try it yourself and see what you get!

===== PAGE: https://docs.tigerdata.com/tutorials/blockchain-query/blockchain-compress/ =====

**Examples:**

Example 1 (sql):
```sql
ALTER TABLE rides
    SET (
        timescaledb.compress,
        timescaledb.compress_segmentby='vendor_id',
        timescaledb.compress_orderby='pickup_datetime DESC'
    );
```

Example 2 (sql):
```sql
SELECT compress_chunk(c) from show_chunks('rides') c;
```

Example 3 (sql):
```sql
SELECT
        pg_size_pretty(before_compression_total_bytes) as before,
        pg_size_pretty(after_compression_total_bytes) as after
     FROM hypertable_compression_stats('rides');
```

Example 4 (sql):
```sql
before  | after
    ---------+--------
    1741 MB | 603 MB
```

---

## add_policies()

**URL:** llms-txt#add_policies()

**Contents:**
- Samples
- Required arguments
- Optional arguments
- Returns

Add refresh, compression, and data retention policies to a continuous aggregate
in one step. The added compression and retention policies apply to the
continuous aggregate, _not_ to the original hypertable.

Experimental features could have bugs. They might not be backwards compatible,
and could be removed in future releases. Use these features at your own risk, and
do not use any experimental features in production.

`add_policies()` does not allow the `schedule_interval` for the continuous aggregate to be set, instead using a default value of 1 hour.

If you would like to set this add your policies manually (see [`add_continuous_aggregate_policy`][add_continuous_aggregate_policy]).

Given a continuous aggregate named `example_continuous_aggregate`, add three
policies to it:

1.  Regularly refresh the continuous aggregate to materialize data between 1 day
    and 2 days old.
1.  Compress data in the continuous aggregate after 20 days.
1.  Drop data in the continuous aggregate after 1 year.

## Required arguments

|Name|Type|Description|
|-|-|-|
|`relation`|`REGCLASS`|The continuous aggregate that the policies should be applied to|

## Optional arguments

|Name|Type|Description|
|-|-|-|
|`if_not_exists`|`BOOL`|When true, prints a warning instead of erroring if the continuous aggregate doesn't exist. Defaults to false.|
|`refresh_start_offset`|`INTERVAL` or `INTEGER`|The start of the continuous aggregate refresh window, expressed as an offset from the policy run time.|
|`refresh_end_offset`|`INTERVAL` or `INTEGER`|The end of the continuous aggregate refresh window, expressed as an offset from the policy run time. Must be greater than `refresh_start_offset`.|
|`compress_after`|`INTERVAL` or `INTEGER`|Continuous aggregate chunks are compressed if they exclusively contain data older than this interval.|
|`drop_after`|`INTERVAL` or `INTEGER`|Continuous aggregate chunks are dropped if they exclusively contain data older than this interval.|

For arguments that could be either an `INTERVAL` or an `INTEGER`, use an
`INTERVAL` if your time bucket is based on timestamps. Use an `INTEGER` if your
time bucket is based on integers.

Returns `true` if successful.

===== PAGE: https://docs.tigerdata.com/api/continuous-aggregates/create_materialized_view/ =====

**Examples:**

Example 1 (sql):
```sql
timescaledb_experimental.add_policies(
     relation REGCLASS,
     if_not_exists BOOL = false,
     refresh_start_offset "any" = NULL,
     refresh_end_offset "any" = NULL,
     compress_after "any" = NULL,
     drop_after "any" = NULL)
) RETURNS BOOL
```

Example 2 (sql):
```sql
SELECT timescaledb_experimental.add_policies(
    'example_continuous_aggregate',
    refresh_start_offset => '1 day'::interval,
    refresh_end_offset => '2 day'::interval,
    compress_after => '20 days'::interval,
    drop_after => '1 year'::interval
);
```

---

## About writing data

**URL:** llms-txt#about-writing-data

TimescaleDB supports writing data in the same way as Postgres, using `INSERT`,
`UPDATE`, `INSERT ... ON CONFLICT`, and `DELETE`.

TimescaleDB is optimized for running real-time analytics workloads on time-series data. For this reason, hypertables are optimized for
inserts to the most recent time intervals. Inserting data with recent time
values gives
[excellent performance](https://www.timescale.com/blog/postgresql-timescaledb-1000x-faster-queries-90-data-compression-and-much-more).
However, if you need to make frequent updates to older time intervals, you
might see lower write throughput.

===== PAGE: https://docs.tigerdata.com/use-timescale/write-data/upsert/ =====

---

## Decompression

**URL:** llms-txt#decompression

**Contents:**
- Decompress chunks manually
  - Decompress individual chunks
  - Decompress chunks by time
  - Decompress chunks on more precise constraints

Old API since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Replaced by <a href="https://docs.tigerdata.com/api/latest/hypercore/convert_to_rowstore/">`convert_to_rowstore`</a>.

When compressing your data, you can reduce the amount of storage space used. But you should always leave some additional storage
capacity. This gives you the flexibility to decompress chunks when necessary,
for actions such as bulk inserts.

This section describes commands to use for decompressing chunks. You can filter
by time to select the chunks you want to decompress.

## Decompress chunks manually

Before decompressing chunks, stop any compression policy on the hypertable you are decompressing.
The database automatically recompresses your chunks in the next scheduled job.
If you accumulate a large amount of chunks that need to be compressed, the [troubleshooting guide][troubleshooting-oom-chunks] shows how to compress a backlog of chunks.
For more information on how to stop and run compression policies using `alter_job()`, see the [API reference][api-reference-alter-job].

There are several methods for selecting chunks and decompressing them.

## 本篇目录

- [Decompress individual chunks](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/01-Decompress_individual_chunks.md)
- [Decompress chunks by time](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/02-Decompress_chunks_by_time.md)
- [Decompress chunks on more precise constraints](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/03-Decompress_chunks_on_more_precise_constr.md)
- [Delta-of-delta encoding](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/04-Delta-of-delta_encoding.md)
- [Run-length encoding](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/05-Run-length_encoding.md)
- [XOR-based compression](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/06-XOR-based_compression.md)
- [Dictionary compression](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/07-Dictionary_compression.md)
- [Highlighted features](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/08-Highlighted_features.md)
- [🛡️ Phased rollouts for TimescaleDB minor releases](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/09-Phased_rollouts_for_TimescaleDB_minor_re.md)
- [⏰ pgcron extension](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/10-pgcron_extension.md)
- [⚡️ Larger compute options: 48 and 64 CPU](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/11-Larger_compute_options_48_and_64_CPU.md)
- [📋 Backup report for compliance](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/12-Backup_report_for_compliance.md)
- [🗺️ New router for Tiger Cloud Console](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/13-New_router_for_Tiger_Cloud_Console.md)
- [Developer role (GA)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/14-Developer_role_GA.md)
- [Transform a table to a hypertable from the Explorer](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/15-Transform_a_table_to_a_hypertable_from_t.md)
- [Cross-region backups](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/16-Cross-region_backups.md)
- [Standard Postgres instructions for onboarding](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/17-Standard_Postgres_instructions_for_onboa.md)
- [Postgres-only service type](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/18-Postgres-only_service_type.md)
- [GA release of the viewer role in role-based access](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/19-GA_release_of_the_viewer_role_in_role-ba.md)
- [EXPLAIN plans in Insights](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/20-EXPLAIN_plans_in_Insights.md)
- [Chunk index size in Explorer](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/21-Chunk_index_size_in_Explorer.md)
- [🏎️ TimescaleDB v2.21—ingest millions of rows/second and faster columnstore UPSERTs and DELETEs](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/22-TimescaleDB_v2.21_ingest_millions_of_row.md)
- [🔬 Catalog objects available in the Console Explorer](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/23-Catalog_objects_available_in_the_Console.md)
- [✏️ Editable jobs in Console](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/24-Editable_jobs_in_Console.md)
- [📊 Connection history](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/25-Connection_history.md)
- [🔐 New in Public Beta: Read-Only Access through RBAC](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/26-New_in_Public_Beta_Read-Only_Access_thro.md)
- [Updates to instructions for livesync](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/27-Updates_to_instructions_for_livesync.md)
- [New optional argument for addcontinuousaggregatepolicy API](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/28-New_optional_argument_for_addcontinuousa.md)
- [Run multiple statements in SQL editor](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/29-Run_multiple_statements_in_SQL_editor.md)
- [Branch conversations in SQL assistant](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/30-Branch_conversations_in_SQL_assistant.md)
- [Smarter results table](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/31-Smarter_results_table.md)
- [Jobs page improvements](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/32-Jobs_page_improvements.md)
- [Multiple AWS Transit Gateways](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/33-Multiple_AWS_Transit_Gateways.md)
- [Updated service creation flow](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/34-Updated_service_creation_flow.md)
- [Terraform support for Exporters and AWS Transit Gateway](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/35-Terraform_support_for_Exporters_and_AWS_.md)
- [TimescaleDB v2.20.3](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/36-TimescaleDB_v2.20.3.md)
- [Horizontal read scaling with read replica sets](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/37-Horizontal_read_scaling_with_read_replic.md)
- [Faster, smarter results tables in data mode](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/38-Faster_smarter_results_tables_in_data_mo.md)
- [Latest anthropic models added to SQL assistant](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/39-Latest_anthropic_models_added_to_SQL_ass.md)
- [VPC support for passwordless data mode connections](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/40-VPC_support_for_passwordless_data_mode_c.md)
- [Updated top-level navigation - Monitoring tab](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/41-Updated_top-level_navigation_-_Monitorin.md)
- [Monitor active connections](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/42-Monitor_active_connections.md)
- [TimescaleDB v2.20 - query performance and faster data updates](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/43-TimescaleDB_v2.20_-_query_performance_an.md)
- [Postgres 13 and 14 deprecated on Tiger Cloud](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/44-Postgres_13_and_14_deprecated_on_Tiger_C.md)
- [Enhancements to livesync for Postgres](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/45-Enhancements_to_livesync_for_Postgres.md)
- [🚀 Enhanced storage: scale to 64 TB and 32,000 IOPS](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/46-Enhanced_storage_scale_to_64_TB_and_32_0.md)
- [🔥 Ship TimescaleDB metrics to Prometheus](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/47-Ship_TimescaleDB_metrics_to_Prometheus.md)
- [📥 Import text files into Postgres tables](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/48-Import_text_files_into_Postgres_tables.md)
- [Automatic document embeddings from S3](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/49-Automatic_document_embeddings_from_S3.md)
- [Sample dataset for AI testing](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/50-Sample_dataset_for_AI_testing.md)
- [Livesync for S3 (beta)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/51-Livesync_for_S3_beta.md)
- [UX improvements to livesync for Postgres](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/52-UX_improvements_to_livesync_for_Postgres.md)
- [Passwordless data mode connections](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/53-Passwordless_data_mode_connections.md)
- [Embeddings spot checks](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/54-Embeddings_spot_checks.md)
- [TimescaleDB v2.19.3](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/55-TimescaleDB_v2.19.3.md)
- [New OpenAI, Llama, and Gemini models in SQL Assistant](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/56-New_OpenAI_Llama_and_Gemini_models_in_SQ.md)
- [TimescaleDB v2.19—query performance and concurrency improvements](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/57-TimescaleDB_v2.19_query_performance_and_.md)
- [New service overview page](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/58-New_service_overview_page.md)
- [pgvectorscale 0.7.0: faster filtered filtered vector search with filtered indexes](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/59-pgvectorscale_0.7.0_faster_filtered_filt.md)
- [Job errors and individual job pages](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/60-Job_errors_and_individual_job_pages.md)
- [pgvectorscale 0.6 — store up to 16K dimension embeddings](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/61-pgvectorscale_0.6_store_up_to_16K_dimens.md)
- [pgai Vectorizer supports models from AWS Bedrock, Azure AI, Google Vertex via LiteLLM](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/62-pgai_Vectorizer_supports_models_from_AWS.md)
- [Agent Mode for PopSQL](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/63-Agent_Mode_for_PopSQL.md)
- [Improved AWS Marketplace integration for a smoother experience](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/64-Improved_AWS_Marketplace_integration_for.md)
- [Timescale Console recommendations](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/65-Timescale_Console_recommendations.md)
- [Edit VPC and AWS Transit Gateway CIDRs](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/66-Edit_VPC_and_AWS_Transit_Gateway_CIDRs.md)
- [Improved log filtering](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/67-Improved_log_filtering.md)
- [TimescaleDB v2.18.2 on Timescale Cloud](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/68-TimescaleDB_v2.18.2_on_Timescale_Cloud.md)
- [SQL Assistant improvements](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/69-SQL_Assistant_improvements.md)
- [New models and improved UX for SQL Assistant](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/70-New_models_and_improved_UX_for_SQL_Assis.md)
- [Updated and reorganized docs for pgai](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/71-Updated_and_reorganized_docs_for_pgai.md)
- [TimescaleDB v2.18.1](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/72-TimescaleDB_v2.18.1.md)
- [AWS Transit Gateway support is now generally available!](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/73-AWS_Transit_Gateway_support_is_now_gener.md)
- [TimescaleDB v2.18 - dense indexes in the columnstore and query vectorization improvements](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/74-TimescaleDB_v2.18_-_dense_indexes_in_the.md)
- [SQL Assistant improvements](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/75-SQL_Assistant_improvements.md)
- [AI — pgai Postgres extension 0.7.0](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/76-AI_pgai_Postgres_extension_0.7.0.md)
- [AI - pgai python library 0.5.0](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/77-AI_-_pgai_python_library_0.5.0.md)
- [AWS Transit Gateway Support (Early Access)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/78-AWS_Transit_Gateway_Support_Early_Access.md)
- [Welcome India! (Support for a new region: Mumbai)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/79-Welcome_India_Support_for_a_new_region_M.md)
- [Postgres major version upgrades to PG 17](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/80-Postgres_major_version_upgrades_to_PG_17.md)
- [Timescale Cloud available on AWS Marketplace](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/81-Timescale_Cloud_available_on_AWS_Marketp.md)
- [Postgres 17](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/82-Postgres_17.md)
- [Submit feature requests from Timescale Console](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/83-Submit_feature_requests_from_Timescale_C.md)
- [Postgres Livesync (Alpha release)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/84-Postgres_Livesync_Alpha_release.md)
- [In-Console import from S3 (CSV and Parquet files)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/85-In-Console_import_from_S3_CSV_and_Parque.md)
- [Self-Serve I/O Boost 📈](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/86-Self-Serve_I_O_Boost.md)
- [🤖 New AI companion: SQL Assistant](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/87-New_AI_companion_SQL_Assistant.md)
- [🏄 TimescaleDB v2.17 - performance improvements for analytical queries and continuous aggregate refreshes](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/88-TimescaleDB_v2.17_-_performance_improvem.md)
- [Expanded logging within Timescale Console](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/89-Expanded_logging_within_Timescale_Consol.md)
- [Connect to Timescale with your .NET stack](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/90-Connect_to_Timescale_with_your_.NET_stac.md)
- [✅ Last 5 jobs status](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/91-Last_5_jobs_status.md)
- [Pgai Vectorizer: vector embeddings as database indexes (early access)](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/92-Pgai_Vectorizer_vector_embeddings_as_dat.md)
- [Postgres-to-Postgres foreign data wrappers:](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/93-Postgres-to-Postgres_foreign_data_wrappe.md)
- [Faster queries over tiered data](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/94-Faster_queries_over_tiered_data.md)
- [Chunk interval recommendations](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/95-Chunk_interval_recommendations.md)
- [🧙Hypertable creation wizard](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/96-Hypertable_creation_wizard.md)
- [🍭 PopSQL Notebooks](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/97-PopSQL_Notebooks.md)
- [🏗️ Live Migrations v1.0 Release](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/98-Live_Migrations_v1.0_Release.md)
- [🧭 Import Data from MySQL](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/99-Import_Data_from_MySQL.md)
- [🔐 Current Lock Contention](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/100-Current_Lock_Contention.md)
- [SQL editor improvements](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/101-SQL_editor_improvements.md)
- [Multiple HA replicas](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/102-Multiple_HA_replicas.md)
- [Other improvements](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/103-Other_improvements.md)
- [One-click SQL statement execution from Timescale Console](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/104-One-click_SQL_statement_execution_from_T.md)
- [Session support in the SQL editor](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/105-Session_support_in_the_SQL_editor.md)
- [SQL Editor in Timescale Console](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/106-SQL_Editor_in_Timescale_Console.md)
- [Enhanced Data Import Options for Quick Evaluation](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/107-Enhanced_Data_Import_Options_for_Quick_E.md)
- [Improvements to Live migration](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/108-Improvements_to_Live_migration.md)
- [CSV import](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/109-CSV_import.md)
- [Replica lag](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/110-Replica_lag.md)
- [Adjust chunk interval](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/111-Adjust_chunk_interval.md)
- [CloudWatch permissions via role assumption](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/112-CloudWatch_permissions_via_role_assumpti.md)
- [Two-factor authentication (2FA) indicator](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/113-Two-factor_authentication_2FA_indicator.md)
- [Anthropic and Cohere integrations in pgai](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/114-Anthropic_and_Cohere_integrations_in_pga.md)
- [pgvectorscale extension: ARM builds and improved recall for low dimensional vectors](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/115-pgvectorscale_extension_ARM_builds_and_i.md)
- [New plans](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/116-New_plans.md)
- [Improvements to the Timescale Console](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/117-Improvements_to_the_Timescale_Console.md)
- [Live migration release v0.0.24](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/118-Live_migration_release_v0.0.24.md)
- [Enabling compression](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/119-Enabling_compression.md)
