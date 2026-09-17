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
pageSha256: "da7f4e95798a1ca2b681f947adf982c83cc7c288bc3cf37dc8d0dcbfe00ba69b"
contentMode: "local-full"
zh: ""
---

### Creating a trigger on a distributed hypertable

1.  If your trigger needs to reference another function or object, use
    [`distributed_exec`][distributed_exec] to create the function or object on
    all nodes.
1.  Create the trigger function on the access node. This example creates a dummy
    trigger that raises the notice 'trigger fired':

1.  Create the trigger itself on the access node. This example causes the
    trigger to fire whenever a row is inserted into the hypertable `hyper`. Note
    that you don't need to manually create the trigger on the data nodes. This is
    done automatically for you.

## Avoid processing a trigger multiple times

If you have a statement-level trigger, or a replication factor greater than 1,
the trigger fires multiple times. To avoid repetitive firing, you can set the
trigger function to check which data node it is executing on.

For example, write a trigger function that raises a different notice on the
access node compared to a data node:

===== PAGE: https://docs.tigerdata.com/self-hosted/distributed-hypertables/query/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE OR REPLACE FUNCTION my_trigger_func()
    RETURNS TRIGGER LANGUAGE PLPGSQL AS
    body$
    BEGIN
    RAISE NOTICE 'trigger fired';
    RETURN NEW;
    END
    body$;
```

Example 2 (sql):
```sql
CREATE TRIGGER my_trigger
    AFTER INSERT ON hyper
    FOR EACH ROW
    EXECUTE FUNCTION my_trigger_func();
```

Example 3 (sql):
```sql
CREATE OR REPLACE FUNCTION my_trigger_func()
    RETURNS TRIGGER LANGUAGE PLPGSQL AS
body$
DECLARE
    is_access_node boolean;
BEGIN
    SELECT is_distributed INTO is_access_node
    FROM timescaledb_information.hypertables
    WHERE hypertable_name =
    AND hypertable_schema = ;

    IF is_access_node THEN
       RAISE NOTICE 'trigger fired on the access node';
    ELSE
       RAISE NOTICE 'trigger fired on a data node';
    END IF;

    RETURN NEW;
END
body$;
```

---

## remove_columnstore_policy()

**URL:** llms-txt#remove_columnstore_policy()

**Contents:**
- Samples
- Arguments

Remove a columnstore policy from a hypertable or continuous aggregate.

To restart automatic chunk migration to the columnstore, you need to call
[add_columnstore_policy][add_columnstore_policy] again.

Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0)

You see the columnstore policies in the [informational views][informational-views].

- **Remove the columnstore policy from the `cpu` table**:

- **Remove the columnstore policy from the `cpu_weekly` continuous aggregate**:

| Name | Type | Default | Required | Description |
|--|--|--|--|-|
|`hypertable`|REGCLASS|-|✔| Name of the hypertable or continuous aggregate to remove the policy from|
| `if_exists` | BOOLEAN | `false` |✖| Set to `true` so this job fails with a warning rather than an error if a columnstore policy does not exist on `hypertable` |

===== PAGE: https://docs.tigerdata.com/api/hypercore/chunk_columnstore_settings/ =====

**Examples:**

Example 1 (unknown):
```unknown
- **Remove the columnstore policy from the `cpu_weekly` continuous aggregate**:
```

---

## Slow tiering of chunks

**URL:** llms-txt#slow-tiering-of-chunks

Chunks are tiered asynchronously. Chunks are selected to be tiered to the object storage tier one at a time ordered by their enqueue time.

To see the chunks waiting to be tiered query the `timescaledb_osm.chunks_queued_for_tiering` view

Processing all the chunks in the queue may take considerable time if a large quantity of data is being migrated to the object storage tier.

===== PAGE: https://docs.tigerdata.com/self-hosted/index/ =====

**Examples:**

Example 1 (sql):
```sql
select count(*) from timescaledb_osm.chunks_queued_for_tiering
```

---

## set_number_partitions()

**URL:** llms-txt#set_number_partitions()

**Contents:**
- Required arguments
- Optional arguments
- Sample usage

[Multi-node support is sunsetted][multi-node-deprecation].

TimescaleDB v2.13 is the last release that includes multi-node support for Postgres
versions 13, 14, and 15.

Sets the number of partitions (slices) of a space dimension on a
hypertable. The new partitioning only affects new chunks.

## Required arguments

| Name | Type | Description |
| --- | --- | --- |
| `hypertable`| REGCLASS | Hypertable to update the number of partitions for.|
| `number_partitions` | INTEGER  | The new number of partitions for the dimension. Must be greater than 0 and less than 32,768. |

## Optional arguments

| Name | Type | Description |
| --- | --- | --- |
| `dimension_name` | REGCLASS | The name of the space dimension to set the number of partitions for. |

The `dimension_name` needs to be explicitly specified only if the
hypertable has more than one space dimension. An error is thrown
otherwise.

For a table with a single space dimension:

For a table with more than one space dimension:

===== PAGE: https://docs.tigerdata.com/api/distributed-hypertables/add_data_node/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT set_number_partitions('conditions', 2);
```

Example 2 (sql):
```sql
SELECT set_number_partitions('conditions', 2, 'device_id');
```

---

## Information views

**URL:** llms-txt#information-views

TimescaleDB makes complex database features like partitioning and data retention
easy to use with our comprehensive APIs. TimescaleDB works hard to provide
detailed information about the state of your data, hypertables, chunks, and any
jobs or policies you have in place.

These views provide the data and statistics you need to keep track of your
database.

===== PAGE: https://docs.tigerdata.com/api/configuration/ =====

---

## Real-time aggregates

**URL:** llms-txt#real-time-aggregates

**Contents:**
- Use real-time aggregates
- Real-time aggregates and refreshing historical data

Rapidly growing data means you need more control over what to aggregate and how to aggregate it. With this in mind, Tiger Data equips you with tools for more fine-tuned data analysis.

By default, continuous aggregates do not include the most recent data chunk from the
underlying hypertable. Real-time aggregates, however, use the aggregated data **and** add the
most recent raw data to it. This provides accurate and up-to-date results, without
needing to aggregate data as it is being written.

In TimescaleDB v2.13 and later, real-time aggregates are **DISABLED** by default. In earlier versions, real-time aggregates are **ENABLED** by default; when you create a continuous aggregate, queries to that view include the results from the most recent raw data.

For more detail on the comparison between continuous and real-time aggregates,
see our [real-time aggregate blog post][blog-rtaggs].

## Use real-time aggregates

You can enable and disable real-time aggregation by setting the
`materialized_only` parameter when you create or alter the view.

1.  Enable real-time aggregation for an existing continuous aggregate:

1.  Disable real-time aggregation:

## Real-time aggregates and refreshing historical data

Real-time aggregates automatically add the most recent data when you query your
continuous aggregate. In other words, they include data _more recent than_ your
last materialized bucket.

If you add new _historical_ data to an already-materialized bucket, it won't be
reflected in a real-time aggregate. You should wait for the next scheduled
refresh, or manually refresh by calling `refresh_continuous_aggregate`. You can
think of real-time aggregates as being eventually consistent for historical
data.

For more information, see the [troubleshooting section][troubleshooting].

===== PAGE: https://docs.tigerdata.com/use-timescale/continuous-aggregates/create-a-continuous-aggregate/ =====

**Examples:**

Example 1 (sql):
```sql
ALTER MATERIALIZED VIEW table_name set (timescaledb.materialized_only = false);
```

Example 2 (sql):
```sql
ALTER MATERIALIZED VIEW table_name set (timescaledb.materialized_only = true);
```

---

## detach_tablespace()

**URL:** llms-txt#detach_tablespace()

**Contents:**
- Samples
- Required arguments
- Optional arguments

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

Detach the tablespace `disk1` from the hypertable `conditions`:

Detach the tablespace `disk1` from all hypertables that the current
user has permissions for:

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

**Examples:**

Example 1 (sql):
```sql
SELECT detach_tablespace('disk1', 'conditions');
SELECT detach_tablespace('disk2', 'conditions', if_attached => true);
```

Example 2 (sql):
```sql
SELECT detach_tablespace('disk1');
```

---

## About tablespaces

**URL:** llms-txt#about-tablespaces

**Contents:**
- How hypertable chunks are assigned tablespaces

Tablespaces are used to determine the physical location of the tables and
indexes in your database. In most cases, you want to use faster storage to store
data that is accessed frequently, and slower storage for data that is accessed
less often.

Hypertables consist of a number of chunks, and each chunk can be located in a
specific tablespace. This allows you to grow your hypertables across many disks.
When you create a new chunk, a tablespace is automatically selected to store the
chunk's data.

You can attach and detach tablespaces on a hypertable. When a disk runs
out of space, you can [detach][detach_tablespace] the full tablespace from the
hypertable, and than [attach][attach_tablespace] a tablespace associated with a
new disk. To see the tablespaces for you hypertable, use the
[`show_tablespaces`][show_tablespaces]
command.

## How hypertable chunks are assigned tablespaces

A hypertable can be partitioned in multiple dimensions, but only one of the
dimensions is used to determine the tablespace assigned to a particular
hypertable chunk. If a hypertable has one or more hash-partitioned, or space,
dimensions, it uses the first hash-partitioned dimension. Otherwise, it uses the
first time dimension.

This strategy ensures that hash-partitioned hypertables have chunks co-located
according to hash partition, as long as the list of tablespaces attached to the
hypertable remains the same. Modulo calculation is used to pick a tablespace, so
there can be more partitions than tablespaces. For example, if there are two
tablespaces, partition number three uses the first tablespace.

Hypertables that are only time-partitioned add new partitions continuously, and
therefore have chunks assigned to tablespaces in a way similar to round-robin.

It is possible to attach more tablespaces than there are partitions for the
hypertable. In this case, some tablespaces remain unused until others are detached
or additional partitions are added. This is especially true for hash-partitioned
tables.

===== PAGE: https://docs.tigerdata.com/use-timescale/schema-management/about-schemas/ =====

---

## Altering and updating table schemas

**URL:** llms-txt#altering-and-updating-table-schemas

To modify the schema of an existing hypertable, you can use the `ALTER TABLE`
command. When you change the hypertable schema, the changes are also propagated
to each underlying chunk.

While you can change the schema of an existing hypertable, you cannot change
the schema of a continuous aggregate. For continuous aggregates, the only
permissible changes are renaming a view, setting a schema, changing the owner,
and adjusting other parameters.

For example, to add a new column called `address` to a table called `distributors`:

This creates the new column, with all existing entries recording `NULL` for the
new column.

Changing the schema can, in some cases, consume a lot of resources. This is
especially true if it requires underlying data to be rewritten. If you want to
check your schema change before you apply it, you can use a `CHECK` constraint,
like this:

This scans the table to verify that existing rows meet the constraint, but does
not require a table rewrite.

For more information, see the
[Postgres ALTER TABLE documentation][postgres-alter-table].

===== PAGE: https://docs.tigerdata.com/use-timescale/schema-management/about-constraints/ =====

**Examples:**

Example 1 (sql):
```sql
ALTER TABLE distributors
  ADD COLUMN address varchar(30);
```

Example 2 (sql):
```sql
ALTER TABLE distributors
  ADD CONSTRAINT zipchk
  CHECK (char_length(zipcode) = 5);
```

---

## detach_tablespaces()

**URL:** llms-txt#detach_tablespaces()

**Contents:**
- Samples
- Required arguments

Detach all tablespaces from a hypertable. After issuing this command
on a hypertable, it no longer has any tablespaces attached to
it. New chunks are instead placed in the database's default
tablespace.

Detach all tablespaces from the hypertable `conditions`:

## Required arguments

|Name|Type|Description|
|---|---|---|
| `hypertable` | REGCLASS | Hypertable to detach a the tablespace from.|

===== PAGE: https://docs.tigerdata.com/api/hypertable/create_hypertable/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT detach_tablespaces('conditions');
```

---

## hypertable_size()

**URL:** llms-txt#hypertable_size()

**Contents:**
- Samples
- Required arguments
- Returns

Get the total disk space used by a hypertable or continuous aggregate,
that is, the sum of the size for the table itself including chunks,
any indexes on the table, and any toast tables. The size is reported
in bytes. This is equivalent to computing the sum of `total_bytes`
column from the output of `hypertable_detailed_size` function.

When a continuous aggregate name is provided, the function
transparently looks up the backing hypertable and returns its statistics
instead.

For more information about using hypertables, including chunk size partitioning,
see the [hypertable section][hypertable-docs].

Get the size information for a hypertable.

Get the size information for all hypertables.

Get the size information for a continuous aggregate.

## Required arguments

|Name|Type|Description|
|-|-|-|
|`hypertable`|REGCLASS|Hypertable or continuous aggregate to show size of.|

|Name|Type|Description|
|-|-|-|
|hypertable_size|BIGINT|Total disk space used by the specified hypertable, including all indexes and TOAST data|

`NULL` is returned if the function is executed on a non-hypertable relation.

===== PAGE: https://docs.tigerdata.com/api/continuous-aggregates/alter_policies/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT hypertable_size('devices');

 hypertable_size
-----------------
           73728
```

Example 2 (sql):
```sql
SELECT hypertable_name, hypertable_size(format('%I.%I', hypertable_schema, hypertable_name)::regclass)
  FROM timescaledb_information.hypertables;
```

Example 3 (sql):
```sql
SELECT hypertable_size('device_stats_15m');

 hypertable_size
-----------------
           73728
```
