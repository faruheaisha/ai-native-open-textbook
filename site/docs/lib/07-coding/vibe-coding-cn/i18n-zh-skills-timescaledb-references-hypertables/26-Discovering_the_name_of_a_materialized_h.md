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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hypertables.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hypertables.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hypertables.md"
sourceSha256: "2b1f8e46c900f47b6a11c8e246b0d222b1dd95793bf063ebaafd0fb65c96841c"
pageSha256: "f33432c02a7a1a430e44ab750b1aed228f318aef8a8b0c62a7cfd28250cf500a"
contentMode: "local-full"
zh: ""
---

### Discovering the name of a materialized hypertable

1.  At the `psql`prompt, query `timescaledb_information.continuous_aggregates`:

1.  Locate the name of the hypertable you want to adjust in the results of the
    query. The results look like this:

===== PAGE: https://docs.tigerdata.com/use-timescale/continuous-aggregates/real-time-aggregates/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT view_name, format('%I.%I', materialization_hypertable_schema,
            materialization_hypertable_name) AS materialization_hypertable
        FROM timescaledb_information.continuous_aggregates;
```

Example 2 (sql):
```sql
view_name         |            materialization_hypertable
    ---------------------------+---------------------------------------------------
    conditions_summary_hourly | _timescaledb_internal._materialized_hypertable_30
    conditions_summary_daily  | _timescaledb_internal._materialized_hypertable_31
    (2 rows)
```

---

## timescaledb_information.hypertable_columnstore_settings

**URL:** llms-txt#timescaledb_information.hypertable_columnstore_settings

**Contents:**
- Samples
- Returns

Retrieve information about the settings for all hypertables in the columnstore.

Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0)

To retrieve information about settings:

- **Show columnstore settings for all hypertables**:

- **Retrieve columnstore settings for a specific hypertable**:

|Name|Type| Description   |
|-|-|-------------------------------------------------------------------------------------------|
|`hypertable`|`REGCLASS`| A hypertable which has the [columnstore enabled][compression_alter-table].|
|`segmentby`|`TEXT`| The list of columns used to segment data. |
|`orderby`|`TEXT`| List of columns used to order the data, along with ordering and NULL ordering information. |
|`compress_interval_length`|`TEXT`| Interval used for [rolling up chunks during compression][rollup-compression]. |
|`index`| `TEXT` | The sparse index details.  |

===== PAGE: https://docs.tigerdata.com/api/hypercore/convert_to_columnstore/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT * FROM timescaledb_information.hypertable_columnstore_settings;
```

Example 2 (sql):
```sql
hypertable               | measurements
   segmentby                |
   orderby                  | "time" DESC
   compress_interval_length |
```

Example 3 (sql):
```sql
SELECT * FROM timescaledb_information.hypertable_columnstore_settings WHERE hypertable::TEXT LIKE 'metrics';
```

Example 4 (sql):
```sql
hypertable               | metrics
   segmentby                | metric_id
   orderby                  | "time"
   compress_interval_length |
```

---

## timescaledb_information.hypertables

**URL:** llms-txt#timescaledb_information.hypertables

**Contents:**
- Samples
- Available columns

Get metadata information about hypertables.

For more information about using hypertables, including chunk size partitioning,
see the [hypertable section][hypertable-docs].

Get information about a hypertable.

|Name|Type| Description                                                       |
|-|-|-------------------------------------------------------------------|
|`hypertable_schema`|TEXT| Schema name of the hypertable                                     |
|`hypertable_name`|TEXT| Table name of the hypertable                                      |
|`owner`|TEXT| Owner of the hypertable                                           |
|`num_dimensions`|SMALLINT| Number of dimensions                                              |
|`num_chunks`|BIGINT| Number of chunks                                                  |
|`compression_enabled`|BOOLEAN| Is compression enabled on the hypertable?                         |
|`is_distributed`|BOOLEAN| Sunsetted since TimescaleDB v2.14.0 Is the hypertable distributed?                  |
|`replication_factor`|SMALLINT| Sunsetted since TimescaleDB v2.14.0 Replication factor for a distributed hypertable |
|`data_nodes`|TEXT| Sunsetted since TimescaleDB v2.14.0 Nodes on which hypertable is distributed        |
|`tablespaces`|TEXT| Tablespaces attached to the hypertable                            |

===== PAGE: https://docs.tigerdata.com/api/informational-views/policies/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE TABLE metrics(time timestamptz, device int, temp float);
SELECT create_hypertable('metrics','time');

SELECT * from timescaledb_information.hypertables WHERE hypertable_name = 'metrics';

-[ RECORD 1 ]-------+--------
hypertable_schema   | public
hypertable_name     | metrics
owner               | sven
num_dimensions      | 1
num_chunks          | 0
compression_enabled | f
tablespaces         | NULL
```

---

## enable_chunk_skipping()

**URL:** llms-txt#enable_chunk_skipping()

**Contents:**
- Samples
- Arguments
- Returns

Early access: TimescaleDB v2.17.1

Enable range statistics for a specific column in a **compressed** hypertable. This tracks a range of values for that column per chunk.
Used for chunk skipping during query optimization and applies only to the chunks created after chunk skipping is enabled.

Best practice is to enable range tracking on columns that are correlated to the
partitioning column. In other words, enable tracking on secondary columns which are
referenced in the `WHERE` clauses in your queries.

TimescaleDB supports min/max range tracking for the `smallint`, `int`,
`bigint`, `serial`, `bigserial`, `date`, `timestamp`, and `timestamptz` data types. The
min/max ranges are calculated when a chunk belonging to
this hypertable is compressed using the [compress_chunk][compress_chunk] function.
The range is stored in start (inclusive) and end (exclusive) form in the
`chunk_column_stats` catalog table.

This way you store the min/max values for such columns in this catalog
table at the per-chunk level. These min/max range values do
not participate in partitioning of the data. These ranges are
used for chunk skipping when the `WHERE` clause of an SQL query specifies
ranges on the column.

A [DROP COLUMN](https://www.postgresql.org/docs/current/sql-altertable.html#SQL-ALTERTABLE-DESC-DROP-COLUMN)
on a column with statistics tracking enabled on it ends up removing all relevant entries
from the catalog table.

A [decompress_chunk][decompress_chunk] invocation on a compressed chunk resets its entries
from the `chunk_column_stats` catalog table since now it's available for DML and the
min/max range values can change on any further data manipulation in the chunk.

By default, this feature is disabled. To enable chunk skipping, set `timescaledb.enable_chunk_skipping = on` in
`postgresql.conf`. When you upgrade from a database instance that uses compression but does not support chunk
skipping, you need to recompress the previously compressed chunks for chunk skipping to work.

In this sample, you create the `conditions` hypertable with partitioning on the `time` column. You then specify and
enable additional columns to track ranges for.

If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

| Name        | Type             | Default | Required | Description                            |
|-------------|------------------|---------|-|----------------------------------------|
|`column_name`| `TEXT`        | -       | ✔ | Column to track range statistics for |
|`hypertable`| `REGCLASS`        | -       | ✔ | Hypertable that the column belongs to  |
|`if_not_exists`| `BOOLEAN`        | `false` | ✖ | Set to `true` so that a notice is sent when ranges are not being tracked for a column. By default, an error is thrown |

|Column|Type|Description|
|-|-|-|
|`column_stats_id`|INTEGER|ID of the entry in the TimescaleDB internal catalog|
|`enabled`|BOOLEAN|Returns `true` when tracking is enabled, `if_not_exists` is `true`, and when a new entry is not added|

===== PAGE: https://docs.tigerdata.com/api/hypertable/detach_tablespace/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE TABLE conditions (
   time        TIMESTAMPTZ       NOT NULL,
   location    TEXT              NOT NULL,
   device      TEXT              NOT NULL,
   temperature DOUBLE PRECISION  NULL,
   humidity    DOUBLE PRECISION  NULL
) WITH (
   tsdb.hypertable,
   tsdb.partition_column='time'
);

SELECT enable_chunk_skipping('conditions', 'device_id');
```

---

## Time buckets

**URL:** llms-txt#time-buckets

Time buckets enable you to aggregate data in [hypertables][create-hypertable] by time interval. For example, you can
group data into 5-minute, 1-hour, and 3-day buckets to calculate summary values.

*   [Learn how time buckets work][about-time-buckets]
*   [Use time buckets][use-time-buckets] to aggregate data

===== PAGE: https://docs.tigerdata.com/use-timescale/schema-management/ =====

---

## Reindex hypertables to fix large indexes

**URL:** llms-txt#reindex-hypertables-to-fix-large-indexes

You might see this error if your hypertable indexes have become very large. To
resolve the problem, reindex your hypertables with this command:

For more information, see the [hypertable documentation][hypertables].

===== PAGE: https://docs.tigerdata.com/_troubleshooting/compression-userperms/ =====

**Examples:**

Example 1 (sql):
```sql
reindex table _timescaledb_internal._hyper_2_1523284_chunk
```

---

## Compress continuous aggregates

**URL:** llms-txt#compress-continuous-aggregates

**Contents:**
- Configure columnstore on continuous aggregates

To save on storage costs, you use hypercore to downsample historical data stored in continuous aggregates. After you
[enable columnstore][compression_continuous-aggregate] on a `MATERIALIZED VIEW`, you set a
[columnstore policy][add_columnstore_policy]. This policy defines the intervals when chunks in a continuous aggregate
are compressed as they are converted from the rowstore to the columnstore.

Columnstore works in the same way on [hypertables and continuous aggregates][hypercore]. When you enable
columnstore with no other options, your data is [segmented by][alter_materialized_view_arguments] the `groupby` columns
in the continuous aggregate, and [ordered by][alter_materialized_view_arguments] the time column. [Real-time aggregation][real-time-aggregates]
is disabled by default.

Since [TimescaleDB v2.20.0](https://github.com/timescale/timescaledb/releases/tag/2.20.0) For the old API, see <a href="https://docs.tigerdata.com/use-timescale/latest/compression/compression-on-continuous-aggregates/">Compress continuous aggregates</a>.

## Configure columnstore on continuous aggregates

For an [existing continuous aggregate][create-cagg]:

1. **Enable columnstore on a continuous aggregate**

To enable the columnstore compression on a continuous aggregate, set `timescaledb.enable_columnstore = true` when you alter the view:

To disable the columnstore compression, set  `timescaledb.enable_columnstore = false`:

1. **Set columnstore policies on the continuous aggregate**

Before you set up a columnstore policy on a continuous aggregate, you first set the [refresh policy][refresh-policy]. To
   prevent refresh policies from failing, you set the columnstore policy interval so that actively
   refreshed regions are not compressed. For example:

1. **Set the refresh policy**

1. **Set the columnstore policy**

For this refresh policy, the `after` parameter must be greater than the value of
      `start_offset` in the refresh policy:

===== PAGE: https://docs.tigerdata.com/use-timescale/continuous-aggregates/create-index/ =====

**Examples:**

Example 1 (sql):
```sql
ALTER MATERIALIZED VIEW <cagg_name> set (timescaledb.enable_columnstore = true);
```

Example 2 (sql):
```sql
SELECT add_continuous_aggregate_policy('<cagg_name>',
        start_offset => INTERVAL '30 days',
        end_offset => INTERVAL '1 day',
        schedule_interval => INTERVAL '1 hour');
```

Example 3 (sql):
```sql
CALL add_columnstore_policy('<cagg_name>', after => INTERVAL '45 days');
```

---

## About time buckets

**URL:** llms-txt#about-time-buckets

**Contents:**
- How time bucketing works
  - Origin
  - Timezones

Time bucketing is essential for real-time analytics. The [`time_bucket`][time_bucket] function enables you to aggregate data in a [hypertable][create-hypertable] into buckets of time. For example, 5 minutes, 1 hour, or 3 days.
It's similar to Postgres's [`date_bin`][date_bin] function, but it gives you more
flexibility in the bucket size and start time.

You can use it to roll up data for analysis or downsampling. For example, you can calculate
5-minute averages for a sensor reading over the last day. You can perform these
rollups as needed, or pre-calculate them in [continuous aggregates][caggs].

This section explains how time bucketing works. For examples of the
`time_bucket` function, see the section on
[Aggregate time-series data with `time_bucket`][use-time-buckets].

## How time bucketing works

Time bucketing groups data into time intervals. With `time_bucket`, the interval
length can be any number of microseconds, milliseconds, seconds, minutes, hours,
days, weeks, months, years, or centuries.

The `time_bucket` function is usually used in combination with `GROUP BY` to
aggregate data. For example, you can calculate the average, maximum, minimum, or
sum of values within a bucket.

&lt;img class="main-content__illustration"
width=\{1375\} height=\{944\}
src="https://assets.timescale.com/docs/images/getting-started/time-bucket.webp"
alt="Diagram showing time-bucket aggregating data into daily buckets, and calculating the daily sum of a value"
/>

The origin determines when time buckets start and end. By default, a time bucket
doesn't start at the earliest timestamp in your data. There is often a more
logical time. For example, you might collect your first data point at `00:37`,
but you probably want your daily buckets to start at midnight. Similarly, you
might collect your first data point on a Wednesday, but you might want your
weekly buckets calculated from Sunday or Monday.

Instead, time is divided into buckets based on intervals from the origin. The
following diagram shows how, using the example of 2-week buckets. The first
possible start date for a bucket is `origin`. The next possible start date for a
bucket is `origin + bucket interval`. If your first timestamp does not fall
exactly on a possible start date, the immediately preceding start date is used
for the beginning of the bucket.

  src="https://assets.timescale.com/docs/images/time-bucket-origin.webp"
  width=\{1375\} height=\{944\}
  class="main-content__illustration"
  alt="Diagram showing how time buckets are calculated from the origin"
/>

For example, say that your data's earliest timestamp is April 24, 2020. If you
bucket by an interval of two weeks, the first bucket doesn't start on April 24,
which is a Friday. It also doesn't start on April 20, which is the immediately
preceding Monday. It starts on April 13, because you can get to April 13, 2020,
by counting in two-week increments from January 3, 2000, which is the default
origin in this case.

For intervals that don't include months or years, the default origin is January
3, 2000. For month, year, or century intervals, the default origin is January 1,
2000. For integer time values, the default origin is 0.

These choices make the time ranges of time buckets more intuitive. Because
January 3, 2000, is a Monday, weekly time buckets start on Monday. This is
compliant with the ISO standard for calculating calendar weeks. Monthly and
yearly time buckets use January 1, 2000, as an origin. This allows them to start
on the first day of the calendar month or year.

If you prefer another origin, you can set it yourself using the [`origin`
parameter][origin]. For example, to start weeks on Sunday, set the origin to
Sunday, January 2, 2000.

The origin time depends on the data type of your time values.

If you use `TIMESTAMP`, by default, bucket start times are aligned with
`00:00:00`. Daily and weekly buckets start at `00:00:00`. Shorter buckets start
at a time that you can get to by counting in bucket increments from `00:00:00`
on the origin date.

If you use `TIMESTAMPTZ`, by default, bucket start times are aligned with
`00:00:00 UTC`. To align time buckets to another timezone, set the `timezone`
parameter.

===== PAGE: https://docs.tigerdata.com/mst/vpc-peering/vpc-peering-gcp/ =====

---

## About constraints

**URL:** llms-txt#about-constraints

Constraints are rules that apply to your database columns. This prevents you
from entering invalid data into your database. When you create, change, or
delete constraints on your hypertables, the constraints are propagated to the
underlying chunks, and to any indexes.

Hypertables support all standard Postgres constraint types. For foreign keys in particular, the following is supported:

- Foreign key constraints from a hypertable referencing a regular table
- Foreign key constraints from a regular table referencing a hypertable

Foreign keys from a hypertable referencing another hypertable **are not supported**.

For example, you can create a table that only allows positive device IDs, and
non-null temperature readings. You can also check that time values for all
devices are unique. To create this table, with the constraints, use this
command:

If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

This example also references values in another `locations` table using a foreign
key constraint.

Time columns used for partitioning must not allow `NULL` values. A
`NOT NULL` constraint is added by default to these columns if it doesn't already exist.

For more information on how to manage constraints, see the
[Postgres docs][postgres-createconstraint].

===== PAGE: https://docs.tigerdata.com/use-timescale/schema-management/about-indexing/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE TABLE conditions (
    time       TIMESTAMPTZ
    temp       FLOAT NOT NULL,
    device_id  INTEGER CHECK (device_id > 0),
    location   INTEGER REFERENCES locations (id),
    PRIMARY KEY(time, device_id)
) WITH (
    tsdb.hypertable,
    tsdb.partition_column='time'
);
```

---

## set_chunk_time_interval()

**URL:** llms-txt#set_chunk_time_interval()

**Contents:**
- Samples
- Arguments

Sets the `chunk_time_interval` on a hypertable. The new interval is used
when new chunks are created, and time intervals on existing chunks are
not changed.

For a TIMESTAMP column, set `chunk_time_interval` to 24 hours:

For a time column expressed as the number of milliseconds since the
UNIX epoch, set `chunk_time_interval` to 24 hours:

| Name        | Type             | Default | Required                                                             | Description                                                                                                                                      |
|-------------|------------------|---------|----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
|`hypertable`|REGCLASS| -       | ✔                                                                    | Hypertable or continuous aggregate to update interval for.                                                                                       |
|`chunk_time_interval`|See note|-       | ✔   | Event time that each new chunk covers.                                                                                                           |
|`dimension_name`|REGCLASS|-       | ✖ | The name of the time dimension to set the number of partitions for. Only use `dimension_name` when your hypertable has multiple time dimensions. |

If you change chunk time interval you may see a chunk that is smaller than the new interval. For example, if you
have two 7-day chunks that cover 14 days, then change `chunk_time_interval` to 3 days, you may end up with a
transition chunk covering one day. This happens because the start and end of the new chunk is calculated based on
dividing the timeline by the `chunk_time_interval` starting at epoch 0. This leads to the following chunks
[0, 3), [3, 6), [6, 9), [9, 12), [12, 15), [15, 18) and so on. The two 7-day chunks covered data up to day 14:
[0, 7), [8, 14), so the 3-day chunk for [12, 15) is reduced to a one day chunk. The following chunk [15, 18) is
created as a full 3 day chunk.

The valid types for the `chunk_time_interval` depend on the type used for the
hypertable `time` column:

|`time` column type|`chunk_time_interval` type|Time unit|
|-|-|-|
|TIMESTAMP|INTERVAL|days, hours, minutes, etc|
||INTEGER or BIGINT|microseconds|
|TIMESTAMPTZ|INTERVAL|days, hours, minutes, etc|
||INTEGER or BIGINT|microseconds|
|DATE|INTERVAL|days, hours, minutes, etc|
||INTEGER or BIGINT|microseconds|
|SMALLINT|SMALLINT|The same time unit as the `time` column|
|INT|INT|The same time unit as the `time` column|
|BIGINT|BIGINT|The same time unit as the `time` column|

For more information, see [hypertable partitioning][hypertable-partitioning].

===== PAGE: https://docs.tigerdata.com/api/hypertable/show_tablespaces/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT set_chunk_time_interval('conditions', INTERVAL '24 hours');
SELECT set_chunk_time_interval('conditions', 86400000000);
```

Example 2 (sql):
```sql
SELECT set_chunk_time_interval('conditions', 86400000);
```

---

## drop_chunks()

**URL:** llms-txt#drop_chunks()

**Contents:**
- Samples
- Required arguments
- Optional arguments

Removes data chunks whose time range falls completely before (or
after) a specified time. Shows a list of the chunks that were
dropped, in the same style as the `show_chunks` [function][show_chunks].

Chunks are constrained by a start and end time and the start time is
always before the end time. A chunk is dropped if its end time is
older than the `older_than` timestamp or, if `newer_than` is given,
its start time is newer than the `newer_than` timestamp.

Note that, because chunks are removed if and only if their time range
falls fully before (or after) the specified timestamp, the remaining
data may still contain timestamps that are before (or after) the
specified one.

Chunks can only be dropped based on their time intervals. They cannot be dropped
based on a hash partition.

Drop all chunks from hypertable `conditions` older than 3 months:

Drop all chunks from hypertable `conditions` created before 3 months:

Drop all chunks more than 3 months in the future from hypertable
`conditions`. This is useful for correcting data ingested with
incorrect clocks:

Drop all chunks from hypertable `conditions` before 2017:

Drop all chunks from hypertable `conditions` before 2017, where time
column is given in milliseconds from the UNIX epoch:

Drop all chunks older than 3 months ago and newer than 4 months ago from hypertable `conditions`:

Drop all chunks created 3 months ago and created 4 months before from  hypertable `conditions`:

Drop all chunks older than 3 months ago across all hypertables:

## Required arguments

|Name|Type|Description|
|-|-|-|
|`relation`|REGCLASS|Hypertable or continuous aggregate from which to drop chunks.|

## Optional arguments

|Name|Type|Description|
|-|-|-|
|`older_than`|ANY|Specification of cut-off point where any chunks older than this timestamp should be removed.|
|`newer_than`|ANY|Specification of cut-off point where any chunks newer than this timestamp should be removed.|
|`verbose`|BOOLEAN|Setting to true displays messages about the progress of the reorder command. Defaults to false.|
|`created_before`|ANY|Specification of cut-off point where any chunks created before this timestamp should be removed.|
|`created_after`|ANY|Specification of cut-off point where any chunks created after this timestamp should be removed.|

The `older_than` and `newer_than` parameters can be specified in two ways:

*   **interval type:** The cut-off point is computed as `now() -
    older_than` and similarly `now() - newer_than`.  An error is
    returned if an INTERVAL is supplied and the time column is not one
    of a `TIMESTAMP`, `TIMESTAMPTZ`, or `DATE`.

*   **timestamp, date, or integer type:** The cut-off point is
    explicitly given as a `TIMESTAMP` / `TIMESTAMPTZ` / `DATE` or as a
    `SMALLINT` / `INT` / `BIGINT`. The choice of timestamp or integer
    must follow the type of the hypertable's time column.

The `created_before` and `created_after` parameters can be specified in two ways:

*   **interval type:** The cut-off point is computed as `now() -
    created_before` and similarly `now() - created_after`.  This uses
    the chunk creation time relative to the current time for the filtering.

*   **timestamp, date, or integer type:** The cut-off point is
    explicitly given as a `TIMESTAMP` / `TIMESTAMPTZ` / `DATE` or as a
    `SMALLINT` / `INT` / `BIGINT`. The choice of integer value
    must follow the type of the hypertable's partitioning column. Otherwise
    the chunk creation time is used for the filtering.

When using just an interval type, the function assumes that
you are removing things _in the past_. If you want to remove data
in the future, for example to delete erroneous entries, use a timestamp.

When both `older_than` and `newer_than` arguments are used, the
function returns the intersection of the resulting two ranges. For
example, specifying `newer_than => 4 months` and `older_than => 3
months` drops all chunks between 3 and 4 months old.
Similarly, specifying `newer_than => '2017-01-01'` and `older_than
=> '2017-02-01'` drops all chunks between '2017-01-01' and
'2017-02-01'. Specifying parameters that do not result in an
overlapping intersection between two ranges results in an error.

When both `created_before` and `created_after` arguments are used, the
function returns the intersection of the resulting two ranges. For
example, specifying `created_after` => 4 months` and `created_before`=> 3
months` drops all chunks created between 3 and 4 months from now.
Similarly, specifying `created_after`=> '2017-01-01'` and `created_before`
=> '2017-02-01'` drops all chunks created between '2017-01-01' and
'2017-02-01'. Specifying parameters that do not result in an
overlapping intersection between two ranges results in an error.

The `created_before`/`created_after` parameters cannot be used together with
`older_than`/`newer_than`.

===== PAGE: https://docs.tigerdata.com/api/hypertable/detach_chunk/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT drop_chunks('conditions', INTERVAL '3 months');
```

Example 2 (sql):
```sql
drop_chunks
----------------------------------------
 _timescaledb_internal._hyper_3_5_chunk
 _timescaledb_internal._hyper_3_6_chunk
 _timescaledb_internal._hyper_3_7_chunk
 _timescaledb_internal._hyper_3_8_chunk
 _timescaledb_internal._hyper_3_9_chunk
(5 rows)
```

Example 3 (sql):
```sql
SELECT drop_chunks('conditions', created_before => now() -  INTERVAL '3 months');
```

Example 4 (sql):
```sql
SELECT drop_chunks('conditions', newer_than => now() + interval '3 months');
```

---

## add_compression_policy()

**URL:** llms-txt#add_compression_policy()

**Contents:**
- Samples
- Required arguments
- Optional arguments

Old API since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Replaced by <a href="https://docs.tigerdata.com/api/latest/hypercore/add_columnstore_policy/">add_columnstore_policy()</a>.

Allows you to set a policy by which the system compresses a chunk
automatically in the background after it reaches a given age.

Compression policies can only be created on hypertables or continuous aggregates
that already have compression enabled. To set `timescaledb.compress` and other
configuration parameters for hypertables, use the
[`ALTER TABLE`][compression_alter-table]
command. To enable compression on continuous aggregates, use the
[`ALTER MATERIALIZED VIEW`][compression_continuous-aggregate]
command. To view the policies that you set or the policies that already exist,
see [informational views][informational-views].

Add a policy to compress chunks older than 60 days on the `cpu` hypertable.

Add a policy to compress chunks created 3 months before on the 'cpu' hypertable.

Note above that when `compress_after` is used then the time data range
present in the partitioning time column is used to select the target
chunks. Whereas, when `compress_created_before` is used then the chunks
which were created 3 months ago are selected.

Add a compress chunks policy to a hypertable with an integer-based time column:

Add a policy to compress chunks of a continuous aggregate called `cpu_weekly`, that are
older than eight weeks:

## Required arguments

|Name|Type|Description|
|-|-|-|
|`hypertable`|REGCLASS|Name of the hypertable or continuous aggregate|
|`compress_after`|INTERVAL or INTEGER|The age after which the policy job compresses chunks. `compress_after` is calculated relative to the current time, so chunks containing data older than `now - \{compress_after\}::interval` are compressed. This argument is mutually exclusive with `compress_created_before`.|
|`compress_created_before`|INTERVAL|Chunks with creation time older than this cut-off point are compressed. The cut-off point is computed as `now() - compress_created_before`. Defaults to `NULL`. Not supported for continuous aggregates yet. This argument is mutually exclusive with `compress_after`. |

The `compress_after` parameter should be specified differently depending
on the type of the time column of the hypertable or continuous aggregate:

*   For hypertables with TIMESTAMP, TIMESTAMPTZ, and DATE time columns: the time
    interval should be an INTERVAL type.
*   For hypertables with integer-based timestamps: the time interval should be
    an integer type (this requires the [integer_now_func][set_integer_now_func]
    to be set).

## Optional arguments

|Name|Type|Description|
|-|-|-|
|`schedule_interval`|INTERVAL|The interval between the finish time of the last execution and the next start. Defaults to 12 hours for hyper tables with a `chunk_interval` >= 1 day and `chunk_interval / 2` for all other hypertables.|
|`initial_start`|TIMESTAMPTZ|Time the policy is first run. Defaults to NULL. If omitted, then the schedule interval is the interval from the finish time of the last execution to the next start. If provided, it serves as the origin with respect to which the next_start is calculated |
|`timezone`|TEXT|A valid time zone. If `initial_start` is also specified, subsequent executions of the compression policy are aligned on its initial start. However, daylight savings time (DST) changes may shift this alignment. Set to a valid time zone if this is an issue you want to mitigate. If omitted, UTC bucketing is performed. Defaults to `NULL`.|
|`if_not_exists`|BOOLEAN|Setting to `true` causes the command to fail with a warning instead of an error if a compression policy already exists on the hypertable. Defaults to false.|

===== PAGE: https://docs.tigerdata.com/api/compression/recompress_chunk/ =====

**Examples:**

Example 1 (unknown):
```unknown
Add a policy to compress chunks created 3 months before on the 'cpu' hypertable.
```

Example 2 (unknown):
```unknown
Note above that when `compress_after` is used then the time data range
present in the partitioning time column is used to select the target
chunks. Whereas, when `compress_created_before` is used then the chunks
which were created 3 months ago are selected.

Add a compress chunks policy to a hypertable with an integer-based time column:
```

Example 3 (unknown):
```unknown
Add a policy to compress chunks of a continuous aggregate called `cpu_weekly`, that are
older than eight weeks:
```

---

## Distributed hypertables

**URL:** llms-txt#distributed-hypertables

[Multi-node support is sunsetted][multi-node-deprecation].

TimescaleDB v2.13 is the last release that includes multi-node support for Postgres
versions 13, 14, and 15.

Distributed hypertables are hypertables that span multiple nodes. With
distributed hypertables, you can scale your data storage across multiple
machines and benefit from parallelized processing for some queries.

Many features of distributed hypertables work the same way as standard
hypertables. To learn how hypertables work in general, see the
[hypertables][hypertables] section.

*   [Learn about distributed hypertables][about-distributed-hypertables] for
    multi-node databases
*   [Create a distributed hypertable][create]
*   [Insert data][insert] into distributed hypertables
*   [Query data][query] in distributed hypertables
*   [Alter and drop][alter-drop] distributed hypertables
*   [Create foreign keys][foreign-keys] on distributed hypertables
*   [Set triggers][triggers] on distributed hypertables

===== PAGE: https://docs.tigerdata.com/mst/about-mst/ =====

---

## Manually drop chunks

**URL:** llms-txt#manually-drop-chunks

**Contents:**
- Drop chunks older than a certain date
- Drop chunks between 2 dates
- Drop chunks in the future

Drop chunks manually by time value. For example, drop chunks containing data
older than 30 days.

Dropping chunks manually is a one-time operation. To automatically drop chunks
as they age, set up a
[data retention policy](https://docs.tigerdata.com/use-timescale/latest/data-retention/create-a-retention-policy/).

## Drop chunks older than a certain date

To drop chunks older than a certain date, use the [`drop_chunks`][drop_chunks]
function. Provide the name of the hypertable to drop chunks from, and a time
interval beyond which to drop chunks.

For example, to drop chunks with data older than 24 hours:

## Drop chunks between 2 dates

You can also drop chunks between 2 dates. For example, drop chunks with data
between 3 and 4 months old.

Supply a second `INTERVAL` argument for the `newer_than` cutoff:

## Drop chunks in the future

You can also drop chunks in the future, for example, to correct data with the
wrong timestamp. To drop all chunks that are more than 3 months in the
future, from a hypertable called `conditions`:

===== PAGE: https://docs.tigerdata.com/use-timescale/data-retention/data-retention-with-continuous-aggregates/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT drop_chunks('conditions', INTERVAL '24 hours');
```

Example 2 (sql):
```sql
SELECT drop_chunks(
  'conditions',
  older_than => INTERVAL '3 months',
  newer_than => INTERVAL '4 months'
)
```

Example 3 (sql):
```sql
SELECT drop_chunks(
  'conditions',
  newer_than => now() + INTERVAL '3 months'
);
```

---

## timescaledb_information.chunks

**URL:** llms-txt#timescaledb_information.chunks

**Contents:**
- Samples
- Available columns

Get metadata about the chunks of hypertables.

This view shows metadata for the chunk's primary time-based dimension.
For information about a hypertable's secondary dimensions,
the [dimensions view][dimensions] should be used instead.

If the chunk's primary dimension is of a time datatype, `range_start` and
`range_end` are set. Otherwise, if the primary dimension type is integer based,
`range_start_integer` and `range_end_integer` are set.

Get information about the chunks of a hypertable.

Dimension builder `by_range` was introduced in TimescaleDB 2.13.
The `chunk_creation_time` metadata was introduced in TimescaleDB 2.13.

|Name|Type|Description|
|---|---|---|
| `hypertable_schema` | TEXT | Schema name of the hypertable |
| `hypertable_name` | TEXT | Table name of the hypertable |
| `chunk_schema` | TEXT | Schema name of the chunk |
| `chunk_name` | TEXT | Name of the chunk |
| `primary_dimension` | TEXT | Name of the column that is the primary dimension|
| `primary_dimension_type` | REGTYPE | Type of the column that is the primary dimension|
| `range_start` | TIMESTAMP WITH TIME ZONE | Start of the range for the chunk's dimension |
| `range_end` | TIMESTAMP WITH TIME ZONE | End of the range for the chunk's dimension |
| `range_start_integer` | BIGINT | Start of the range for the chunk's dimension, if the dimension type is integer based |
| `range_end_integer` | BIGINT | End of the range for the chunk's dimension, if the dimension type is integer based |
| `is_compressed` | BOOLEAN | Is the data in the chunk compressed? <br/><br/> Note that for distributed hypertables, this is the cached compression status of the chunk on the access node. The cached status on the access node and data node is not in sync in some scenarios. For example, if a user compresses or decompresses the chunk on the data node instead of the access node, or sets up compression policies directly on data nodes. <br/><br/> Use `chunk_compression_stats()` function to get real-time compression status for distributed chunks.|
| `chunk_tablespace` | TEXT | Tablespace used by the chunk|
| `data_nodes` | ARRAY | Nodes on which the chunk is replicated. This is applicable only to chunks for distributed hypertables |
| `chunk_creation_time` | TIMESTAMP WITH TIME ZONE | The time when this chunk was created for data addition |

===== PAGE: https://docs.tigerdata.com/api/informational-views/data_nodes/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE TABLESPACE tablespace1 location '/usr/local/pgsql/data1';

CREATE TABLE hyper_int (a_col integer, b_col integer, c integer);
SELECT table_name from create_hypertable('hyper_int', by_range('a_col', 10));
CREATE OR REPLACE FUNCTION integer_now_hyper_int() returns int LANGUAGE SQL STABLE as $$ SELECT coalesce(max(a_col), 0) FROM hyper_int $$;
SELECT set_integer_now_func('hyper_int', 'integer_now_hyper_int');

INSERT INTO hyper_int SELECT generate_series(1,5,1), 10, 50;

SELECT attach_tablespace('tablespace1', 'hyper_int');
INSERT INTO hyper_int VALUES( 25 , 14 , 20), ( 25, 15, 20), (25, 16, 20);

SELECT * FROM timescaledb_information.chunks WHERE hypertable_name = 'hyper_int';

-[ RECORD 1 ]----------+----------------------
hypertable_schema      | public
hypertable_name        | hyper_int
chunk_schema           | _timescaledb_internal
chunk_name             | _hyper_7_10_chunk
primary_dimension      | a_col
primary_dimension_type | integer
range_start            |
range_end              |
range_start_integer    | 0
range_end_integer      | 10
is_compressed          | f
chunk_tablespace       |
data_nodes             |
-[ RECORD 2 ]----------+----------------------
hypertable_schema      | public
hypertable_name        | hyper_int
chunk_schema           | _timescaledb_internal
chunk_name             | _hyper_7_11_chunk
primary_dimension      | a_col
primary_dimension_type | integer
range_start            |
range_end              |
range_start_integer    | 20
range_end_integer      | 30
is_compressed          | f
chunk_tablespace       | tablespace1
data_nodes             |
```

---

## Delete data

**URL:** llms-txt#delete-data

**Contents:**
- Delete data with DELETE command
- Delete data by dropping chunks

You can delete data from a hypertable using a standard
[`DELETE`][postgres-delete] SQL command. If you want to delete old data once it
reaches a certain age, you can also drop entire chunks or set up a data
retention policy.

## Delete data with DELETE command

To delete data from a table, use the syntax `DELETE FROM ...`. In this example,
data is deleted from the table `conditions`, if the row's `temperature` or
`humidity` is below a certain level:

If you delete a lot of data, run
[`VACUUM`](https://www.postgresql.org/docs/current/sql-vacuum.html) or
`VACUUM FULL` to reclaim storage from the deleted or obsolete rows.

## Delete data by dropping chunks

TimescaleDB allows you to delete data by age, by dropping chunks from a
hypertable. You can do so either manually or by data retention policy.

To learn more, see the [data retention section][data-retention].

===== PAGE: https://docs.tigerdata.com/use-timescale/write-data/update/ =====

**Examples:**

Example 1 (sql):
```sql
DELETE FROM conditions WHERE temperature < 35 OR humidity < 60;
```

---

## attach_tablespace()

**URL:** llms-txt#attach_tablespace()

**Contents:**
- Samples
- Required arguments
- Optional arguments

Attach a tablespace to a hypertable and use it to store chunks. A
[tablespace][postgres-tablespaces] is a directory on the filesystem
that allows control over where individual tables and indexes are
stored on the filesystem. A common use case is to create a tablespace
for a particular storage disk, allowing tables to be stored
there. To learn more, see the [Postgres documentation on
tablespaces][postgres-tablespaces].

TimescaleDB can manage a set of tablespaces for each hypertable,
automatically spreading chunks across the set of tablespaces attached
to a hypertable. If a hypertable is hash partitioned, TimescaleDB
tries to place chunks that belong to the same partition in the same
tablespace. Changing the set of tablespaces attached to a hypertable
may also change the placement behavior. A hypertable with no attached
tablespaces has its chunks placed in the database's default
tablespace.

Attach the tablespace `disk1` to the hypertable `conditions`:

## Required arguments

|Name|Type|Description|
|---|---|---|
| `tablespace` | TEXT | Name of the tablespace to attach.|
| `hypertable` | REGCLASS | Hypertable to attach the tablespace to.|

Tablespaces need to be [created][postgres-createtablespace] before
being attached to a hypertable. Once created, tablespaces can be
attached to multiple hypertables simultaneously to share the
underlying disk storage. Associating a regular table with a tablespace
using the `TABLESPACE` option to `CREATE TABLE`, prior to calling
`create_hypertable`, has the same effect as calling
`attach_tablespace` immediately following `create_hypertable`.

## Optional arguments

|Name|Type|Description|
|---|---|---|
| `if_not_attached` | BOOLEAN |Set to true to avoid throwing an error if the tablespace is already attached to the table. A notice is issued instead. Defaults to false. |

===== PAGE: https://docs.tigerdata.com/api/hypertable/hypertable_size/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT attach_tablespace('disk1', 'conditions');
SELECT attach_tablespace('disk2', 'conditions', if_not_attached => true);
```

---

## Use triggers on distributed hypertables

**URL:** llms-txt#use-triggers-on-distributed-hypertables

**Contents:**
- Create a trigger on a distributed hypertable
  - Creating a trigger on a distributed hypertable
- Avoid processing a trigger multiple times

[Multi-node support is sunsetted][multi-node-deprecation].

TimescaleDB v2.13 is the last release that includes multi-node support for Postgres
versions 13, 14, and 15.

Triggers on distributed hypertables work in much the same way as triggers on
standard hypertables, and have the same limitations. But there are some
differences due to the data being distributed across multiple nodes:

*   Row-level triggers fire on the data node where the row is inserted. The
    triggers must fire where the data is stored, because `BEFORE` and `AFTER`
    row triggers need access to the stored data. The chunks on the access node
    do not contain any data, so they have no triggers.
*   Statement-level triggers fire once on each affected node, including the
    access node. For example, if a distributed hypertable includes 3 data nodes,
    inserting 2 rows of data executes a statement-level trigger on the access
    node and either 1 or 2 data nodes, depending on whether the rows go to the
    same or different nodes.
*   A replication factor greater than 1 further causes
    the trigger to fire on multiple nodes. Each replica node fires the trigger.

## Create a trigger on a distributed hypertable

Create a trigger on a distributed hypertable by using [`CREATE
TRIGGER`][create-trigger] as usual. The trigger, and the function it executes,
is automatically created on each data node. If the trigger function references
any other functions or objects, they need to be present on all nodes before you
create the trigger.
