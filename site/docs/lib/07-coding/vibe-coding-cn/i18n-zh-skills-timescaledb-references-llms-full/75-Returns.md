---
title: "movechunk()"
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
pageSha256: "9679ba842c81217a2c5f3bccb595367fb672e4df0c8508a6af99c031d14d3103"
contentMode: "local-full"
zh: ""
---

# move_chunk()

TimescaleDB allows you to move data and indexes to different tablespaces. This
allows you to move data to more cost-effective storage as it ages.

The `move_chunk` function acts like a combination of the
[Postgres CLUSTER command][postgres-cluster] and
[Postgres ALTER TABLE...SET TABLESPACE][postgres-altertable] commands. Unlike
these Postgres commands, however, the `move_chunk` function uses lower lock
levels so that the chunk and hypertable are able to be read for most of the
process. This comes at a cost of slightly higher disk usage during the
operation. For a more detailed discussion of this capability, see the
documentation on [managing storage with tablespaces][manage-storage].

You must be logged in as a super user, such as the `postgres` user,
to use the `move_chunk()` call.

## Samples

``` sql
SELECT move_chunk(
  chunk => '_timescaledb_internal._hyper_1_4_chunk',
  destination_tablespace => 'tablespace_2',
  index_destination_tablespace => 'tablespace_3',
  reorder_index => 'conditions_device_id_time_idx',
  verbose => TRUE
);
```

## Required arguments

|Name|Type|Description|
|-|-|-|
|`chunk`|REGCLASS|Name of chunk to be moved|
|`destination_tablespace`|NAME|Target tablespace for chunk being moved|
|`index_destination_tablespace`|NAME|Target tablespace for index associated with the chunk you are moving|

## Optional arguments

|Name|Type|Description|
|-|-|-|
|`reorder_index`|REGCLASS|The name of the index (on either the hypertable or chunk) to order by|
|`verbose`|BOOLEAN|Setting to true displays messages about the progress of the move_chunk command. Defaults to false.|

===== PAGE: https://docs.tigerdata.com/api/hypertable/hypertable_index_size/ =====

# hypertable_index_size()

Get the disk space used by an index on a hypertable, including the
disk space needed to provide the index on all chunks. The size is
reported in bytes.

For more information about using hypertables, including chunk size partitioning,
see the [hypertable section][hypertable-docs].

## Samples

Get size of a specific index on a hypertable.

```sql
\d conditions_table
                     Table "public.conditions_table"
 Column |           Type           | Collation | Nullable | Default
--------+--------------------------+-----------+----------+---------
 time   | timestamp with time zone |           | not null |
 device | integer                  |           |          |
 volume | integer                  |           |          |
Indexes:
    "second_index" btree ("time")
    "test_table_time_idx" btree ("time" DESC)
    "third_index" btree ("time")

SELECT hypertable_index_size('second_index');

 hypertable_index_size
-----------------------
                163840

SELECT pg_size_pretty(hypertable_index_size('second_index'));

 pg_size_pretty
----------------
 160 kB

```

## Required arguments

|Name|Type|Description|
|-|-|-|
|`index_name`|REGCLASS|Name of the index on a hypertable|

## Returns

|Column|Type|Description|
|-|-|-|
|hypertable_index_size|BIGINT|Returns the disk space used by the index|

NULL is returned if the function is executed on a non-hypertable relation.

===== PAGE: https://docs.tigerdata.com/api/hypertable/enable_chunk_skipping/ =====

# enable_chunk_skipping()

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

## Samples

In this sample, you create the `conditions` hypertable with partitioning on the `time` column. You then specify and
enable additional columns to track ranges for.

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

If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

## Arguments

| Name        | Type             | Default | Required | Description                            |
|-------------|------------------|---------|-|----------------------------------------|
|`column_name`| `TEXT`        | -       | ✔ | Column to track range statistics for |
|`hypertable`| `REGCLASS`        | -       | ✔ | Hypertable that the column belongs to  |
|`if_not_exists`| `BOOLEAN`        | `false` | ✖ | Set to `true` so that a notice is sent when ranges are not being tracked for a column. By default, an error is thrown |

## Returns

|Column|Type|Description|
|-|-|-|
|`column_stats_id`|INTEGER|ID of the entry in the TimescaleDB internal catalog|
|`enabled`|BOOLEAN|Returns `true` when tracking is enabled, `if_not_exists` is `true`, and when a new entry is not added|

===== PAGE: https://docs.tigerdata.com/api/hypertable/detach_tablespace/ =====

# detach_tablespace()

Detach a tablespace from one or more hypertables. This _only_ means
that _new_ chunks are not placed on the detached tablespace. This
is useful, for instance, when a tablespace is running low on disk
space and one would like to prevent new chunks from being created in
the tablespace. The detached tablespace itself and any existing chunks
with data on it remains unchanged and continue to work as
before, including being available for queries. Note that newly
inserted data rows may still be inserted into an existing chunk on the
detached tablespace since existing data is not cleared from a detached
tablespace. A detached tablespace can be reattached if desired to once
again be considered for chunk placement.

## Samples

Detach the tablespace `disk1` from the hypertable `conditions`:

```sql
SELECT detach_tablespace('disk1', 'conditions');
SELECT detach_tablespace('disk2', 'conditions', if_attached => true);
```

Detach the tablespace `disk1` from all hypertables that the current
user has permissions for:

```sql
SELECT detach_tablespace('disk1');
```

## Required arguments

|Name|Type|Description|
|---|---|---|
| `tablespace` | TEXT | Tablespace to detach.|

When giving only the tablespace name as argument, the given tablespace
is detached from all hypertables that the current role has the
appropriate permissions for. Therefore, without proper permissions,
the tablespace may still receive new chunks after this command
is issued.

## Optional arguments

|Name|Type|Description|
|---|---|---|
| `hypertable` | REGCLASS | Hypertable to detach a the tablespace from.|
| `if_attached` | BOOLEAN | Set to true to avoid throwing an error if the tablespace is not attached to the given table. A notice is issued instead. Defaults to false. |

When specifying a specific hypertable, the tablespace is only
detached from the given hypertable and thus may remain attached to
other hypertables.

===== PAGE: https://docs.tigerdata.com/api/hypertable/chunks_detailed_size/ =====

# chunks_detailed_size()

Get information about the disk space used by the chunks belonging to a
hypertable, returning size information for each chunk table, any
indexes on the chunk, any toast tables, and the total size associated
with the chunk. All sizes are reported in bytes.

If the function is executed on a distributed hypertable, it returns
disk space usage information as a separate row per node. The access
node is not included since it doesn't have any local chunk data.

Additional metadata associated with a chunk can be accessed
via the `timescaledb_information.chunks` view.

## Samples

```sql
SELECT * FROM chunks_detailed_size('dist_table')
  ORDER BY chunk_name, node_name;

     chunk_schema      |      chunk_name       | table_bytes | index_bytes | toast_bytes | total_bytes |       node_name
-----------------------+-----------------------+-------------+-------------+-------------+-------------+-----------------------
 _timescaledb_internal | _dist_hyper_1_1_chunk |        8192 |       32768 |           0 |       40960 | data_node_1
 _timescaledb_internal | _dist_hyper_1_2_chunk |        8192 |       32768 |           0 |       40960 | data_node_2
 _timescaledb_internal | _dist_hyper_1_3_chunk |        8192 |       32768 |           0 |       40960 | data_node_3
```

## Required arguments

|Name|Type|Description|
|---|---|---|
| `hypertable` | REGCLASS | Name of the hypertable |

## Returns

|Column|Type|Description|
|---|---|---|
|chunk_schema| TEXT | Schema name of the chunk |
|chunk_name| TEXT | Name of the chunk|
|table_bytes|BIGINT | Disk space used by the chunk table|
|index_bytes|BIGINT | Disk space used by indexes|
|toast_bytes|BIGINT | Disk space of toast tables|
|total_bytes|BIGINT | Total disk space used by the chunk, including all indexes and TOAST data|
|node_name| TEXT | Node for which size is reported, applicable only to distributed hypertables|

If executed on a relation that is not a hypertable, the function
returns `NULL`.

===== PAGE: https://docs.tigerdata.com/api/hypertable/create_hypertable_old/ =====

# create_hypertable()

This page describes the hypertable API supported prior to TimescaleDB v2.13. Best practice is to use the new
[`create_hypertable`][api-create-hypertable] interface.

Creates a TimescaleDB hypertable from a Postgres table (replacing the latter),
partitioned on time and with the option to partition on one or more other
columns. The Postgres table cannot be an already partitioned table
(declarative partitioning or inheritance). In case of a non-empty table, it is
possible to migrate the data during hypertable creation using the `migrate_data`
option, although this might take a long time and has certain limitations when
the table contains foreign key constraints (see below).

After creation, all actions, such as `ALTER TABLE`, `SELECT`, etc., still work
on the resulting hypertable.

For more information about using hypertables, including chunk size partitioning,
see the [hypertable section][hypertable-docs].

## Samples

Convert table `conditions` to hypertable with just time partitioning on column `time`:

```sql
SELECT create_hypertable('conditions', 'time');
```

Convert table `conditions` to hypertable, setting `chunk_time_interval` to 24 hours.

```sql
SELECT create_hypertable('conditions', 'time', chunk_time_interval => 86400000000);
SELECT create_hypertable('conditions', 'time', chunk_time_interval => INTERVAL '1 day');
```

Convert table `conditions` to hypertable. Do not raise a warning
if `conditions` is already a hypertable:

```sql
SELECT create_hypertable('conditions', 'time', if_not_exists => TRUE);
```

Time partition table `measurements` on a composite column type `report` using a
time partitioning function. Requires an immutable function that can convert the
column value into a supported column value:

```sql
CREATE TYPE report AS (reported timestamp with time zone, contents jsonb);

CREATE FUNCTION report_reported(report)
  RETURNS timestamptz
  LANGUAGE SQL
  IMMUTABLE AS
  'SELECT $1.reported';

SELECT create_hypertable('measurements', 'report', time_partitioning_func => 'report_reported');
```

Time partition table `events`, on a column type `jsonb` (`event`), which has
a top level key (`started`) containing an ISO 8601 formatted timestamp:

```sql
CREATE FUNCTION event_started(jsonb)
  RETURNS timestamptz
  LANGUAGE SQL
  IMMUTABLE AS
  $func$SELECT ($1->>'started')::timestamptz$func$;

SELECT create_hypertable('events', 'event', time_partitioning_func => 'event_started');
```

## Required arguments

|Name|Type|Description|
|-|-|-|
|`relation`|REGCLASS|Identifier of table to convert to hypertable.|
|`time_column_name`|REGCLASS| Name of the column containing time values as well as the primary column to partition by.|

## Optional arguments

|Name|Type|Description|
|-|-|-|
|`partitioning_column`|REGCLASS|Name of an additional column to partition by. If provided, the `number_partitions` argument must also be provided.|
|`number_partitions`|INTEGER|Number of [hash partitions][hash-partitions] to use for `partitioning_column`. Must be > 0.|
|`chunk_time_interval`|INTERVAL|Event time that each chunk covers. Must be > 0. Default is 7 days.|
|`create_default_indexes`|BOOLEAN|Whether to create default indexes on time/partitioning columns. Default is TRUE.|
|`if_not_exists`|BOOLEAN|Whether to print warning if table already converted to hypertable or raise exception. Default is FALSE.|
|`partitioning_func`|REGCLASS|The function to use for calculating a value's partition.|
|`associated_schema_name`|REGCLASS|Name of the schema for internal hypertable tables. Default is `_timescaledb_internal`.|
|`associated_table_prefix`|TEXT|Prefix for internal hypertable chunk names. Default is `_hyper`.|
|`migrate_data`|BOOLEAN|Set to TRUE to migrate any existing data from the `relation` table to chunks in the new hypertable. A non-empty table generates an error without this option. Large tables may take significant time to migrate. Defaults to FALSE.|
|`time_partitioning_func`|REGCLASS| Function to convert incompatible primary time column values to compatible ones. The function must be `IMMUTABLE`.|
|`replication_factor`|INTEGER|Replication factor to use with distributed hypertable. If not provided, value is determined by the `timescaledb.hypertable_replication_factor_default` GUC. |
|`data_nodes`|ARRAY|This is the set of data nodes that are used for this table if it is distributed. This has no impact on non-distributed hypertables. If no data nodes are specified, a distributed hypertable uses all data nodes known by this instance.|
|`distributed`|BOOLEAN|Set to TRUE to create distributed hypertable. If not provided, value is determined by the `timescaledb.hypertable_distributed_default` GUC. When creating a distributed hypertable, consider using [`create_distributed_hypertable`][create_distributed_hypertable] in place of `create_hypertable`. Default is NULL. |

## Returns

|Column|Type|Description|
|-|-|-|
|`hypertable_id`|INTEGER|ID of the hypertable in TimescaleDB.|
|`schema_name`|TEXT|Schema name of the table converted to hypertable.|
|`table_name`|TEXT|Table name of the table converted to hypertable.|
|`created`|BOOLEAN|TRUE if the hypertable was created, FALSE when `if_not_exists` is true and no hypertable was created.|

If you use `SELECT * FROM create_hypertable(...)` you get the return value
formatted as a table with column headings.

The use of the `migrate_data` argument to convert a non-empty table can
lock the table for a significant amount of time, depending on how much data is
in the table. It can also run into deadlock if foreign key constraints exist to
other tables.

When converting a normal SQL table to a hypertable, pay attention to how you handle
constraints. A hypertable can contain foreign keys to normal SQL table columns,
but the reverse is not allowed. UNIQUE and PRIMARY constraints must include the
partitioning key.

The deadlock is likely to happen when concurrent transactions simultaneously try
to insert data into tables that are referenced in the foreign key constraints
and into the converting table itself. The deadlock can be prevented by manually
obtaining `SHARE ROW EXCLUSIVE` lock on the referenced tables before calling
`create_hypertable` in the same transaction, see
[Postgres documentation](https://www.postgresql.org/docs/current/sql-lock.html)
for the syntax.

## Units

The `time` column supports the following data types:

|Description|Types|
|-|-|
|Timestamp| TIMESTAMP, TIMESTAMPTZ|
|Date|DATE|
|Integer|SMALLINT, INT, BIGINT|

The type flexibility of the 'time' column allows the use of non-time-based
values as the primary chunk partitioning column, as long as those values can
increment.

For incompatible data types (for example, `jsonb`) you can specify a function to
the `time_partitioning_func` argument which can extract a compatible data type.

The units of `chunk_time_interval` should be set as follows:

*   For time columns having timestamp or DATE types, the `chunk_time_interval`
    should be specified either as an `interval` type or an integral value in
    *microseconds*.
*   For integer types, the `chunk_time_interval` **must** be set explicitly, as
    the database does not otherwise understand the semantics of what each
    integer value represents (a second, millisecond, nanosecond, etc.). So if
    your time column is the number of milliseconds since the UNIX epoch, and you
    wish to have each chunk cover 1 day, you should specify
    `chunk_time_interval => 86400000`.

In case of hash partitioning (in other words, if `number_partitions` is greater
than zero), it is possible to optionally specify a custom partitioning function.
If no custom partitioning function is specified, the default partitioning
function is used. The default partitioning function calls Postgres's internal
hash function for the given type, if one exists. Thus, a custom partitioning
function can be used for value types that do not have a native Postgres hash
function. A partitioning function should take a single `anyelement` type
argument and return a positive `integer` hash value. Note that this hash value
is *not* a partition ID, but rather the inserted value's position in the
dimension's key space, which is then divided across the partitions.

The time column in `create_hypertable` must be defined as `NOT NULL`. If this is
not already specified on table creation, `create_hypertable` automatically adds
this constraint on the table when it is executed.

===== PAGE: https://docs.tigerdata.com/api/hypertable/set_chunk_time_interval/ =====

# set_chunk_time_interval()

Sets the `chunk_time_interval` on a hypertable. The new interval is used
when new chunks are created, and time intervals on existing chunks are
not changed.

## Samples

For a TIMESTAMP column, set `chunk_time_interval` to 24 hours:

```sql
SELECT set_chunk_time_interval('conditions', INTERVAL '24 hours');
SELECT set_chunk_time_interval('conditions', 86400000000);
```

For a time column expressed as the number of milliseconds since the
UNIX epoch, set `chunk_time_interval` to 24 hours:

```sql
SELECT set_chunk_time_interval('conditions', 86400000);
```

## Arguments

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

# show_tablespaces()

Show the tablespaces attached to a hypertable.

## Samples

```sql
SELECT * FROM show_tablespaces('conditions');

 show_tablespaces
------------------
 disk1
 disk2
```

## Required arguments

|Name|Type|Description|
|---|---|---|
| `hypertable` | REGCLASS | Hypertable to show attached tablespaces for.|

===== PAGE: https://docs.tigerdata.com/api/hypertable/disable_chunk_skipping/ =====

# disable_chunk_skipping()

Disable range tracking for a specific column in a hypertable **in the columnstore**.

## Samples

In this sample, you convert the `conditions` table to a hypertable with
partitioning on the `time` column. You then specify and enable additional
columns to track ranges for. You then disable range tracking:

```sql
SELECT create_hypertable('conditions', 'time');
SELECT enable_chunk_skipping('conditions', 'device_id');
SELECT disable_chunk_skipping('conditions', 'device_id');
```

 Best practice is to enable range tracking on columns which are correlated to the
 partitioning column. In other words, enable tracking on secondary columns that are
 referenced in the `WHERE` clauses in your queries.
 Use this API to disable range tracking on columns when the query patterns don't
 use this secondary column anymore.

## Required arguments

|Name|Type|Description|
|-|-|-|
|`hypertable`|REGCLASS|Hypertable that the column belongs to|
|`column_name`|TEXT|Column to disable tracking range statistics for|

## Optional arguments

|Name|Type|Description|
|-|-|-|
|`if_not_exists`|BOOLEAN|Set to `true` so that a notice is sent when ranges are not being tracked for a column. By default, an error is thrown|

## Returns

|Column|Type|Description|
|-|-|-|
|`hypertable_id`|INTEGER|ID of the hypertable in TimescaleDB.|
|`column_name`|TEXT|Name of the column range tracking is disabled for|
|`disabled`|BOOLEAN|Returns `true` when tracking is disabled. `false` when `if_not_exists` is `true` and the entry was
not removed|

To `disable_chunk_skipping()`, you must have first called [enable_chunk_skipping][enable_chunk_skipping]
and enabled range tracking on a column in the hypertable.

===== PAGE: https://docs.tigerdata.com/api/hypertable/remove_reorder_policy/ =====

# remove_reorder_policy()

Remove a policy to reorder a particular hypertable.

## Samples

```sql
SELECT remove_reorder_policy('conditions', if_exists => true);
```

removes the existing reorder policy for the `conditions` table if it exists.

## Required arguments

|Name|Type|Description|
|---|---|---|
| `hypertable` | REGCLASS | Name of the hypertable from which to remove the policy. |

## Optional arguments

|Name|Type|Description|
|---|---|---|
| `if_exists` | BOOLEAN |  Set to true to avoid throwing an error if the reorder_policy does not exist. A notice is issued instead. Defaults to false. |

===== PAGE: https://docs.tigerdata.com/api/hypertable/reorder_chunk/ =====

# reorder_chunk()

Reorder a single chunk's heap to follow the order of an index. This function
acts similarly to the [Postgres CLUSTER command][postgres-cluster] , however
it uses lower lock levels so that, unlike with the CLUSTER command,  the chunk
and hypertable are able to be read for most of the process. It does use a bit
more disk space during the operation.

This command can be particularly useful when data is often queried in an order
different from that in which it was originally inserted. For example, data is
commonly inserted into a hypertable in loose time order (for example, many devices
concurrently sending their current state), but one might typically query the
hypertable about a _specific_ device. In such cases, reordering a chunk using an
index on `(device_id, time)` can lead to significant performance improvement for
these types of queries.

One can call this function directly on individual chunks of a hypertable, but
using [add_reorder_policy][add_reorder_policy] is often much more convenient.

## Samples

Reorder a chunk on an index:

```sql
SELECT reorder_chunk('_timescaledb_internal._hyper_1_10_chunk', '_timescaledb_internal.conditions_device_id_time_idx');
```

## Required arguments

|Name|Type|Description|
|---|---|---|
| `chunk` | REGCLASS | Name of the chunk to reorder. |

## Optional arguments

|Name|Type|Description|
|---|---|---|
| `index` | REGCLASS | The name of the index (on either the hypertable or chunk) to order by.|
| `verbose` | BOOLEAN | Setting to true displays messages about the progress of the reorder command. Defaults to false.|

## Returns

This function returns void.

===== PAGE: https://docs.tigerdata.com/api/hypertable/add_reorder_policy/ =====

# add_reorder_policy()

Create a policy to reorder the rows of a hypertable's chunks on a specific index. The policy reorders the rows for all chunks except the two most recent ones, because these are still getting writes. By default, the policy runs every 24 hours. To change the schedule, call [alter_job][alter_job] and adjust `schedule_interval`.

You can have only one reorder policy on each hypertable.

For manual reordering of individual chunks, see [reorder_chunk][reorder_chunk].

When a chunk's rows have been reordered by a policy, they are not reordered
by subsequent runs of the same policy. If you write significant amounts of data into older chunks that have
already been reordered, re-run [reorder_chunk][reorder_chunk] on them. If you have changed a lot of older chunks, it is better to drop and recreate the policy.

## Samples

```sql
SELECT add_reorder_policy('conditions', 'conditions_device_id_time_idx');
```

Creates a policy to reorder chunks by the existing `(device_id, time)` index every 24 hours.
This applies to all chunks except the two most recent ones.

## Required arguments

|Name|Type| Description                                                  |
|-|-|--------------------------------------------------------------|
|`hypertable`|REGCLASS| Hypertable to create the policy for                          |
|`index_name`|TEXT| Existing hypertable index by which to order the rows on disk |

## Optional arguments

|Name|Type| Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|-|-|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`if_not_exists`|BOOLEAN| Set to `true` to avoid an error if the `reorder_policy` already exists. A notice is issued instead. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|`initial_start`|TIMESTAMPTZ| Controls when the policy first runs and how its future run schedule is calculated. <ul><li>If omitted or set to <code>NULL</code> (default): <ul><li>The first run is scheduled at <code>now()</code> + <code>schedule_interval</code> (defaults to 24 hours).</li><li>The next run is scheduled at one full <code>schedule_interval</code> after the end of the previous run.</li></ul></li><li>If set: <ul><li>The first run is at the specified time.</li><li>The next run is scheduled as <code>initial_start</code> + <code>schedule_interval</code> regardless of when the previous run ends.</li></ul></li></ul> |
|`timezone`|TEXT| A valid time zone. If `initial_start` is also specified, subsequent runs of the reorder policy are aligned on its initial start. However, daylight savings time (DST) changes might shift this alignment. Set to a valid time zone if this is an issue you want to mitigate. If omitted, UTC bucketing is performed. Defaults to `NULL`.                                                                                                                                                                                                                                                                                |

## Returns

|Column|Type|Description|
|-|-|-|
|`job_id`|INTEGER|TimescaleDB background job ID created to implement this policy|

===== PAGE: https://docs.tigerdata.com/api/hypertable/hypertable_detailed_size/ =====

# hypertable_detailed_size()

# hypertable_detailed_size()

Get detailed information about disk space used by a hypertable or
continuous aggregate, returning size information for the table
itself, any indexes on the table, any toast tables, and the total
size of all. All sizes are reported in bytes. If the function is
executed on a distributed hypertable, it returns size information
as a separate row per node, including the access node.

When a continuous aggregate name is provided, the function
transparently looks up the backing hypertable and returns its statistics
instead.

For more information about using hypertables, including chunk size partitioning,
see the [hypertable section][hypertable-docs].

## Samples

Get the size information for a hypertable.

```sql
-- disttable is a distributed hypertable --
SELECT * FROM hypertable_detailed_size('disttable') ORDER BY node_name;

 table_bytes | index_bytes | toast_bytes | total_bytes |  node_name
-------------+-------------+-------------+-------------+-------------
       16384 |       40960 |           0 |       57344 | data_node_1
        8192 |       24576 |           0 |       32768 | data_node_2
           0 |        8192 |           0 |        8192 |

```

The access node is listed without a user-given node name. Normally,
the access node holds no data, but still maintains, for example, index
information that occupies a small amount of disk space.

## Required arguments

|Name|Type|Description|
|---|---|---|
| `hypertable` | REGCLASS | Hypertable or continuous aggregate to show detailed size of. |

## Returns

|Column|Type|Description|
|-|-|-|
|table_bytes|BIGINT|Disk space used by main_table (like `pg_relation_size(main_table)`)|
|index_bytes|BIGINT|Disk space used by indexes|
|toast_bytes|BIGINT|Disk space of toast tables|
|total_bytes|BIGINT|Total disk space used by the specified table, including all indexes and TOAST data|
|node_name|TEXT|For distributed hypertables, this is the user-given name of the node for which the size is reported. `NULL` is returned for the access node and non-distributed hypertables.|

If executed on a relation that is not a hypertable, the function
returns `NULL`.

===== PAGE: https://docs.tigerdata.com/api/hypertable/show_chunks/ =====

# show_chunks()

Get list of chunks associated with a hypertable.

Function accepts the following required and optional arguments. These arguments
have the same semantics as the `drop_chunks` [function][drop_chunks].

## Samples

Get list of all chunks associated with a table:

```sql
SELECT show_chunks('conditions');
```

Get all chunks from hypertable `conditions` older than 3 months:

```sql
SELECT show_chunks('conditions', older_than => INTERVAL '3 months');
```

Get all chunks from hypertable `conditions` created before 3 months:

```sql
SELECT show_chunks('conditions', created_before => INTERVAL '3 months');
```

Get all chunks from hypertable `conditions` created in the last 1 month:

```sql
SELECT show_chunks('conditions', created_after => INTERVAL '1 month');
```

Get all chunks from hypertable `conditions` before 2017:

```sql
SELECT show_chunks('conditions', older_than => DATE '2017-01-01');
```

## Required arguments

|Name|Type|Description|
|-|-|-|
|`relation`|REGCLASS|Hypertable or continuous aggregate from which to select chunks.|

## Optional arguments

|Name|Type|Description|
|-|-|-|
|`older_than`|ANY|Specification of cut-off point where any chunks older than this timestamp should be shown.|
|`newer_than`|ANY|Specification of cut-off point where any chunks newer than this timestamp should be shown.|
|`created_before`|ANY|Specification of cut-off point where any chunks created before this timestamp should be shown.|
|`created_after`|ANY|Specification of cut-off point where any chunks created after this timestamp should be shown.|

The `older_than` and `newer_than` parameters can be specified in two ways:

*   **interval type:** The cut-off point is computed as `now() -
    older_than` and similarly `now() - newer_than`. An error is returned if an
    INTERVAL is supplied and the time column is not one of a TIMESTAMP,
    TIMESTAMPTZ, or DATE.

*   **timestamp, date, or integer type:** The cut-off point is explicitly given
    as a TIMESTAMP / TIMESTAMPTZ / DATE or as a SMALLINT / INT / BIGINT. The
    choice of timestamp or integer must follow the type of the hypertable's time
    column.

The `created_before` and `created_after` parameters can be specified in two ways:

*   **interval type:** The cut-off point is computed as `now() -
    created_before` and similarly `now() - created_after`.  This uses
    the chunk creation time for the filtering.

*   **timestamp, date, or integer type:** The cut-off point is
    explicitly given as a `TIMESTAMP` / `TIMESTAMPTZ` / `DATE` or as a
    `SMALLINT` / `INT` / `BIGINT`. The choice of integer value
    must follow the type of the hypertable's partitioning column. Otherwise
    the chunk creation time is used for the filtering.

When both `older_than` and `newer_than` arguments are used, the
function returns the intersection of the resulting two ranges. For
example, specifying `newer_than => 4 months` and `older_than => 3
months` shows all chunks between 3 and 4 months old.
Similarly, specifying `newer_than => '2017-01-01'` and `older_than
=> '2017-02-01'` shows all chunks between '2017-01-01' and
'2017-02-01'. Specifying parameters that do not result in an
overlapping intersection between two ranges results in an error.

When both `created_before` and `created_after` arguments are used, the
function returns the intersection of the resulting two ranges. For
example, specifying `created_after`=> 4 months` and `created_before`=> 3
months` shows all chunks created between 3 and 4 months from now.
Similarly, specifying `created_after`=> '2017-01-01'` and `created_before`
=> '2017-02-01'` shows all chunks created between '2017-01-01' and
'2017-02-01'. Specifying parameters that do not result in an
overlapping intersection between two ranges results in an error.

The `created_before`/`created_after` parameters cannot be used together with
`older_than`/`newer_than`.

===== PAGE: https://docs.tigerdata.com/api/hypertable/merge_chunks/ =====

# merge_chunks()

Merge two or more chunks into one.

The partition boundaries for the new chunk is the union of all partitions of the merged chunks.
The new chunk retains the name, constraints, and triggers of the _first_ chunk in the partition order.

You can only merge chunks that have directly adjacent partitions. It is not possible to merge
chunks that have another chunk, or an empty range between them in any of the partitioning
dimensions.

Chunk merging has the following limitations. You cannot:

* Merge chunks with tiered data
* Read or write from the chunks while they are being merged

## Since2180

Refer to the installation documentation for detailed setup instructions.

## Samples

- Merge two chunks:

   ```sql
   CALL merge_chunks('_timescaledb_internal._hyper_1_1_chunk', '_timescaledb_internal._hyper_1_2_chunk');
   ```

- Merge more than two chunks:

   ```sql
   CALL merge_chunks('{_timescaledb_internal._hyper_1_1_chunk, _timescaledb_internal._hyper_1_2_chunk, _timescaledb_internal._hyper_1_3_chunk}');
   ```

## Arguments

You can merge either two chunks, or an arbitrary number of chunks specified as an array of chunk identifiers.
When you call `merge_chunks`, you must specify either `chunk1` and `chunk2`, or `chunks`. You cannot use both
arguments.

| Name               | Type        | Default | Required | Description                                    |
|--------------------|-------------|--|--|------------------------------------------------|
| `chunk1`, `chunk2` | REGCLASS    | - | ✖ | The two chunk to merge in partition order |
| `chunks`           | REGCLASS[]  |- | ✖ | The array of chunks to merge in partition order |

===== PAGE: https://docs.tigerdata.com/api/hypertable/add_dimension/ =====

# add_dimension()

Add an additional partitioning dimension to a TimescaleDB hypertable. You can only execute this `add_dimension` command
on an empty hypertable. To convert a normal table to a hypertable, call [create hypertable][create_hypertable].

The column you select as the dimension can use either:

- [Interval partitions][range-partition]: for example, for a second range partition.
- [hash partitions][hash-partition]: to enable parallelization across multiple disks.

Best practice is to not use additional dimensions. However, Tiger Cloud transparently provides seamless storage
scaling, both in terms of storage capacity and available storage IOPS/bandwidth.

This page describes the generalized hypertable API introduced in [TimescaleDB v2.13.0][rn-2130].
For information about the deprecated interface, see [add_dimension(), deprecated interface][add-dimension-old].

## Samples

First convert table `conditions` to hypertable with just range
partitioning on column `time`, then add an additional partition key on
`location` with four partitions:

```sql
SELECT create_hypertable('conditions', by_range('time'));
SELECT add_dimension('conditions', by_hash('location', 4));
```

The `by_range` and `by_hash` dimension builders are an addition to TimescaleDB 2.13.

Convert table `conditions` to hypertable with range partitioning on
`time` then add three additional dimensions: one hash partitioning on
`location`, one range partition on `time_received`, and one hash
partitionining on `device_id`.

```sql
SELECT create_hypertable('conditions', by_range('time'));
SELECT add_dimension('conditions', by_hash('location', 2));
SELECT add_dimension('conditions', by_range('time_received', INTERVAL '1 day'));
SELECT add_dimension('conditions', by_hash('device_id', 2));
SELECT add_dimension('conditions', by_hash('device_id', 2), if_not_exists => true);
```

## Arguments

| Name | Type             | Default | Required | Description                                                                                                                                       |
|-|------------------|-|-|---------------------------------------------------------------------------------------------------------------------------------------------------|
|`chunk_time_interval` | INTERVAL         | -       | ✖ | Interval that each chunk covers. Must be > 0.                                                                                                     |
|`dimension` | [DIMENSION_INFO][dimension-info] | -       | ✔ | To create a `_timescaledb_internal.dimension_info` instance to partition a hypertable, you call  [`by_range`][by-range] and [`by_hash`][by-hash]. |
|`hypertable`| REGCLASS         | - | ✔ | The hypertable to add the dimension to.                                                                                                           |
|`if_not_exists` | BOOLEAN          | `false` | ✖ | Set to `true` to print an error if a dimension for the column already exists. By default an exception is raised.                                  |
|`number_partitions` | INTEGER          | -       | ✖ | Number of hash partitions to use on `column_name`. Must be > 0.                                                                                   |
|`partitioning_func` | REGCLASS         | -       | ✖ | The function to use for calculating a value's partition. See [`create_hypertable`][create_hypertable] for more information.                       |

### Dimension info

To create a `_timescaledb_internal.dimension_info` instance, you call [add_dimension][add_dimension]
to an existing hypertable.
