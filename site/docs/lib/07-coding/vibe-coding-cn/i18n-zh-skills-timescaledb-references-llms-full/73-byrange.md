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
pageSha256: "340ea200000d7cebb3fc2b191aae6b5e023704e29ef785b0fe2d4768043953a5"
contentMode: "local-full"
zh: ""
---

#### by_range()

Create a by-range dimension builder. You can partition `by_range` on it's own.

##### Samples

- Partition on time using `CREATE TABLE`

   The simplest usage is to partition on a time column:

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
   ```

   If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

   This is the default partition, you do not need to add it explicitly.

- Extract time from a non-time column using `create_hypertable`

   If you have a table with a non-time column containing the time, such as
   a JSON column, add a partition function to extract the time:

   ```sql
   CREATE TABLE my_table (
      metric_id serial not null,
      data jsonb,
   );

   CREATE FUNCTION get_time(jsonb) RETURNS timestamptz AS $$
     SELECT ($1->>'time')::timestamptz
   $$ LANGUAGE sql IMMUTABLE;

   SELECT create_hypertable('my_table', by_range('data', '1 day', 'get_time'));
   ```

##### Arguments

| Name | Type     | Default | Required | Description                                                                                                                 |
|-|----------|---------|-|-|
|`column_name`| `NAME`   | -       |✔|Name of column to partition on.|
|`partition_func`| `REGPROC` | -       |✖|The function to use for calculating the partition of a value.|
|`partition_interval`|`ANYELEMENT` | - |✖|Interval to partition column on.|

If the column to be partitioned is a:

- `TIMESTAMP`, `TIMESTAMPTZ`, or `DATE`: specify `partition_interval` either as an `INTERVAL` type
  or an integer value in *microseconds*.

- Another integer type: specify `partition_interval` as an integer that reflects the column's
  underlying semantics. For example, if this column is in UNIX time, specify `partition_interval` in milliseconds.

The partition type and default value depending on column type is:<a id="partition-types" href=""></a>

| Column Type                  | Partition Type   | Default value |
|------------------------------|------------------|---------------|
| `TIMESTAMP WITHOUT TIMEZONE` | INTERVAL/INTEGER | 1 week        |
| `TIMESTAMP WITH TIMEZONE`    | INTERVAL/INTEGER | 1 week        |
| `DATE`                       | INTERVAL/INTEGER | 1 week        |
| `SMALLINT`                   | SMALLINT         | 10000         |
| `INT`                        | INT              | 100000        |
| `BIGINT`                     | BIGINT           | 1000000       |
