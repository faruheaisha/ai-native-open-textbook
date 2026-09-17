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
pageSha256: "9d2f736a9a3ecf5f3ddbe868e9beb8846fa75e1ca6a5e53fdd4dfeccc4be9a47"
contentMode: "local-full"
zh: ""
---

### Creating a distributed hypertable

1.  On the access node of your multi-node cluster, create a standard
    [Postgres table][postgres-createtable]:

1.  Convert the table to a distributed hypertable. Specify the name of the table
    you want to convert, the column that holds its time values, and a
    space-partitioning parameter.

===== PAGE: https://docs.tigerdata.com/self-hosted/distributed-hypertables/foreign-keys/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE TABLE conditions (
      time        TIMESTAMPTZ       NOT NULL,
      location    TEXT              NOT NULL,
      temperature DOUBLE PRECISION  NULL,
      humidity    DOUBLE PRECISION  NULL
    );
```

Example 2 (sql):
```sql
SELECT create_distributed_hypertable('conditions', 'time', 'location');
```

---

## show_chunks()

**URL:** llms-txt#show_chunks()

**Contents:**
- Samples
- Required arguments
- Optional arguments

Get list of chunks associated with a hypertable.

Function accepts the following required and optional arguments. These arguments
have the same semantics as the `drop_chunks` [function][drop_chunks].

Get list of all chunks associated with a table:

Get all chunks from hypertable `conditions` older than 3 months:

Get all chunks from hypertable `conditions` created before 3 months:

Get all chunks from hypertable `conditions` created in the last 1 month:

Get all chunks from hypertable `conditions` before 2017:

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

**Examples:**

Example 1 (sql):
```sql
SELECT show_chunks('conditions');
```

Example 2 (sql):
```sql
SELECT show_chunks('conditions', older_than => INTERVAL '3 months');
```

Example 3 (sql):
```sql
SELECT show_chunks('conditions', created_before => INTERVAL '3 months');
```

Example 4 (sql):
```sql
SELECT show_chunks('conditions', created_after => INTERVAL '1 month');
```

---

## Optimize time-series data in hypertables

**URL:** llms-txt#optimize-time-series-data-in-hypertables

**Contents:**
- Prerequisites
- Create a hypertable
- Speed up data ingestion
- Optimize cooling data in the columnstore
- Alter a hypertable
  - Add a column to a hypertable
  - Rename a hypertable
- Drop a hypertable

Hypertables are designed for real-time analytics, they are Postgres tables that automatically partition your data by
time. Typically, you partition hypertables on columns that hold time values.
[Best practice is to use `timestamptz`][timestamps-best-practice] column type. However, you can also partition on
`date`, `integer`, `timestamp` and [UUIDv7][uuidv7_functions] types.

To follow the steps on this page:

* Create a target [Tiger Cloud service][create-service] with the Real-time analytics capability.

You need [your connection details][connection-info]. This procedure also
   works for [self-hosted TimescaleDB][enable-timescaledb].

## Create a hypertable

Create a [hypertable][hypertables-section] for your time-series data using [CREATE TABLE][hypertable-create-table].
For [efficient queries][secondary-indexes] on data in the columnstore, remember to `segmentby` the column you will use
most often to filter your data:

If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

To convert an existing table with data in it, call `create_hypertable` on that table with
[`migrate_data` to `true`][api-create-hypertable-arguments]. However, if you have a lot of data, this may take a long time.

## Speed up data ingestion

When you set `timescaledb.enable_direct_compress_copy` your data gets compressed in memory during ingestion with `COPY` statements.
By writing the compressed batches immediately in the columnstore, the IO footprint is significantly lower.
Also, the [columnstore policy][add_columnstore_policy] you set is less important, `INSERT` already produces compressed chunks.

Please note that this feature is a **tech preview** and not production-ready.
Using this feature could lead to regressed query performance and/or storage ratio, if the ingested batches are not
correctly ordered or are of too high cardinality.

To enable in-memory data compression during ingestion:

**Important facts**
- High cardinality use cases do not produce good batches and lead to degreaded query performance.
- The columnstore is optimized to store 1000 records per batch, which is the optimal format for ingestion per segment by.
- WAL records are written for the compressed batches rather than the individual tuples.
- Currently only `COPY` is support, `INSERT` will eventually follow.
- Best results are achieved for batch ingestion with 1000 records or more, upper boundary is 10.000 records.
- Continous Aggregates are **not** supported at the moment.

## Optimize cooling data in the columnstore

As the data cools and becomes more suited for analytics, [add a columnstore policy][add_columnstore_policy] so your data
is automatically converted to the columnstore after a specific time interval. This columnar format enables fast
scanning and aggregation, optimizing performance for analytical workloads while also saving significant storage space.
In the columnstore conversion, hypertable chunks are compressed by up to 98%, and organized for efficient,
large-scale queries. This columnar format enables fast scanning and aggregation, optimizing performance for analytical
workloads.

To optimize your data, add a columnstore policy:

You can also manually [convert chunks][convert_to_columnstore] in a hypertable to the columnstore.

## Alter a hypertable

You can alter a hypertable, for example to add a column, by using the Postgres
[`ALTER TABLE`][postgres-altertable] command. This works for both regular and
distributed hypertables.
