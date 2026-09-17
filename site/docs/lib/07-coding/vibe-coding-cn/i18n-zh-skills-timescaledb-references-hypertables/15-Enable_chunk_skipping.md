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
pageSha256: "8d6739e19a38dab7ec4e3ee620d0e9b610bb35e697cfd8ea2ec54be684b81f78"
contentMode: "local-full"
zh: ""
---

### Enable chunk skipping

To enable chunk skipping on a column, call `enable_chunk_skipping` on a `hypertable` for a `column_name`. For example,
the following query enables chunk skipping on the `order_id` column in the `orders` table:

For more details on how to implement chunk skipping, see the [API Reference][api-reference].

## Analyze your hypertables

You can use the Postgres `ANALYZE` command to query all chunks in your
hypertable. The statistics collected by the `ANALYZE` command are used by the
Postgres planner to create the best query plan. For more information about the
`ANALYZE` command, see the [Postgres documentation][pg-analyze].

===== PAGE: https://docs.tigerdata.com/use-timescale/extensions/pgvector/ =====

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
      tsdb.partition_column='time',
      tsdb.chunk_interval='1 day'
   );
```

Example 2 (sql):
```sql
SELECT *
     FROM timescaledb_information.dimensions
     WHERE hypertable_name = 'conditions';
```

Example 3 (sql):
```sql
hypertable_schema | hypertable_name | dimension_number | column_name |       column_type        | dimension_type | time_interval | integer_interval | integer_now_func | num_partitions
   -------------------+-----------------+------------------+-------------+--------------------------+----------------+---------------+------------------+------------------+----------------
    public           | metrics          |                1 | recorded    | timestamp with time zone | Time           | 1 day         |                  |                  |
```

Example 4 (sql):
```sql
SELECT set_chunk_time_interval('conditions', INTERVAL '24 hours');
```

---

## recompress_chunk()

**URL:** llms-txt#recompress_chunk()

**Contents:**
- Samples
- Required arguments
- Optional arguments
- Troubleshooting

Old API since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Replaced by <a href="https://docs.tigerdata.com/api/latest/hypercore/convert_to_columnstore/">convert_to_columnstore()</a>.

Recompresses a compressed chunk that had more data inserted after compression.

You can also recompress chunks by
[running the job associated with your compression policy][run-job].
`recompress_chunk` gives you more fine-grained control by
allowing you to target a specific chunk.

`recompress_chunk` is deprecated since TimescaleDB v2.14 and will be removed in the future.
The procedure is now a wrapper which calls [`compress_chunk`](https://docs.tigerdata.com/api/latest/compression/compress_chunk/)
instead of it.

`recompress_chunk` is implemented as an SQL procedure and not a function. Call
the procedure with `CALL`. Don't use a `SELECT` statement.

`recompress_chunk` only works on chunks that have previously been compressed. To compress a
chunk for the first time, use [`compress_chunk`](https://docs.tigerdata.com/api/latest/compression/compress_chunk/).

Recompress the chunk `timescaledb_internal._hyper_1_2_chunk`:

## Required arguments

|Name|Type|Description|
|-|-|-|
|`chunk`|`REGCLASS`|The chunk to be recompressed. Must include the schema, for example `_timescaledb_internal`, if it is not in the search path.|

## Optional arguments

|Name|Type|Description|
|-|-|-|
|`if_not_compressed`|`BOOLEAN`|If `true`, prints a notice instead of erroring if the chunk is already compressed. Defaults to `false`.|

In TimescaleDB 2.6.0 and above, `recompress_chunk` is implemented as a procedure.
Previously, it was implemented as a function. If you are upgrading to
TimescaleDB 2.6.0 or above, the`recompress_chunk`
function could cause an error. For example, trying to run `SELECT
recompress_chunk(i.show_chunks, true) FROM...` gives the following error:

To fix the error, use `CALL` instead of `SELECT`. You might also need to write a
procedure to replace the full functionality in your `SELECT` statement. For
example:

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/saturating_add_pos/ =====

**Examples:**

Example 1 (sql):
```sql
recompress_chunk(
    chunk REGCLASS,
    if_not_compressed BOOLEAN = false
)
```

Example 2 (sql):
```sql
CALL recompress_chunk('_timescaledb_internal._hyper_1_2_chunk');
```

Example 3 (sql):
```sql
ERROR:  recompress_chunk(regclass, boolean) is a procedure
```

Example 4 (sql):
```sql
DO $$
DECLARE chunk regclass;
BEGIN
  FOR chunk IN SELECT format('%I.%I', chunk_schema, chunk_name)::regclass
  FROM timescaledb_information.chunks
  WHERE is_compressed = true
  LOOP
    RAISE NOTICE 'Recompressing %', chunk::text;
    CALL recompress_chunk(chunk, true);
  END LOOP;
END
$$;
```

---

## add_dimension()

**URL:** llms-txt#add_dimension()

**Contents:**
- Samples
  - Parallelizing queries across multiple data nodes
  - Parallelizing disk I/O on a single node
- Required arguments
- Optional arguments
- Returns

This interface is deprecated since [TimescaleDB v2.13.0][rn-2130].

For information about the supported hypertable interface, see [add_dimension()][add-dimension].

Add an additional partitioning dimension to a TimescaleDB hypertable.
The column selected as the dimension can either use interval
partitioning (for example, for a second time partition) or hash partitioning.

The `add_dimension` command can only be executed after a table has been
converted to a hypertable (via `create_hypertable`), but must similarly
be run only on an empty hypertable.

**Space partitions**: Using space partitions is highly recommended
for [distributed hypertables][distributed-hypertables] to achieve
efficient scale-out performance. For [regular hypertables][regular-hypertables]
that exist only on a single node, additional partitioning can be used
for specialized use cases and not recommended for most users.

Space partitions use hashing: Every distinct item is hashed to one of
*N* buckets. Remember that we are already using (flexible) time
intervals to manage chunk sizes; the main purpose of space
partitioning is to enable parallelization across multiple
data nodes (in the case of distributed hypertables) or
across multiple disks within the same time interval
(in the case of single-node deployments).

First convert table `conditions` to hypertable with just time
partitioning on column `time`, then add an additional partition key on `location` with four partitions:

Convert table `conditions` to hypertable with time partitioning on `time` and
space partitioning (2 partitions) on `location`, then add two additional dimensions.

Now in a multi-node example for distributed hypertables with a cluster
of one access node and two data nodes, configure the access node for
access to the two data nodes. Then, convert table `conditions` to
a distributed hypertable with just time partitioning on column `time`,
and finally add a space partitioning dimension on `location`
with two partitions (as the number of the attached data nodes).
