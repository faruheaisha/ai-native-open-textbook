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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "a838b3ae03f38187a6729cfb98a3fb1866f466a7a38b51563d75034d55bf0423"
contentMode: "local-full"
zh: ""
---

#### by_hash()

The main purpose of hash partitioning is to enable parallelization across multiple disks within the same time interval.
Every distinct item in hash partitioning is hashed to one of *N* buckets. By default, TimescaleDB uses flexible range
intervals to manage chunk sizes.

### Parallelizing disk I/O

You use Parallel I/O in the following scenarios:

- Two or more concurrent queries should be able to read from different disks in parallel.
- A single query should be able to use query parallelization to read from multiple disks in parallel.

For the following options:

- **RAID**: use a RAID setup across multiple physical disks, and expose a single logical disk to the hypertable.
  That is, using a single tablespace.

  Best practice is to use RAID when possible, as you do not need to manually manage tablespaces
  in the database.

- **Multiple tablespaces**: for each physical disk, add a separate tablespace to the database. TimescaleDB allows you to
  add multiple tablespaces to a *single* hypertable. However, although under the hood, a hypertable's
  chunks are spread across the tablespaces associated with that hypertable.

  When using multiple tablespaces, a best practice is to also add a second hash-partitioned dimension to your hypertable
  and to have at least one hash partition per disk. While a single time dimension would also work, it would mean that
  the first chunk is written to one tablespace, the second to another, and so on, and thus would parallelize only if a
  query's time range exceeds a single chunk.

When adding a hash partitioned dimension, set the number of partitions to a multiple of number of disks. For example,
the number of partitions P=N*Pd where N is the number of disks and Pd is the number of partitions per
disk. This enables you to add more disks later and move partitions to the new disk from other disks.

TimescaleDB does *not* benefit from a very large number of hash
partitions, such as the number of unique items you expect in partition
field.  A very large number of hash partitions leads both to poorer
per-partition load balancing (the mapping of items to partitions using
hashing), as well as much increased planning latency for some types of
queries.

##### Samples

```sql
CREATE TABLE conditions (
   "time"      TIMESTAMPTZ       NOT NULL,
   location    TEXT              NOT NULL,
   device      TEXT              NOT NULL,
   temperature DOUBLE PRECISION  NULL,
   humidity    DOUBLE PRECISION  NULL
) WITH (
   tsdb.hypertable,
   tsdb.partition_column='time',
   tsdb.chunk_interval='1 day'
);

SELECT add_dimension('conditions', by_hash('location', 2));
```

##### Arguments

| Name | Type     | Default | Required | Description                                              |
|-|----------|---------|-|----------------------------------------------------------|
|`column_name`| `NAME`   | -       |✔| Name of column to partition on.                          |
|`partition_func`| `REGPROC` | -       |✖| The function to use to calcule the partition of a value. |
|`number_partitions`|`ANYELEMENT` | - |✔| Number of hash partitions to use for `partitioning_column`. Must be greater than 0. |
