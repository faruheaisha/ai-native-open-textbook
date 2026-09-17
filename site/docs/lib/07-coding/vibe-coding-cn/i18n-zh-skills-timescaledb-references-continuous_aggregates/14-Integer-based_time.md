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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
sourceRel: "i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
sourceSha256: "2fc13047cc1286afec41d05f8c09c0c452219a02da65b4ba1b4a06c4663c93ed"
pageSha256: "aa8229d8c0e1fcae393e00feaeceac9fc49afbad59eb94614095702265ff843f"
contentMode: "local-full"
zh: ""
---

## Integer-based time

Date and time is usually expressed as year-month-day and hours:minutes:seconds.
Most TimescaleDB databases use a [date/time-type][postgres-date-time] column to
express the date and time. However, in some cases, you might need to convert
these common time and date formats to a format that uses an integer. The most
common integer time is Unix epoch time, which is the number of seconds since the
Unix epoch of 1970-01-01, but other types of integer-based time formats are
possible.

These examples use a hypertable called `devices` that contains CPU and disk
usage information. The devices measure time using the Unix epoch.

To create a hypertable that uses an integer-based column as time, you need to
provide the chunk time interval. In this case, each chunk is 10 minutes.

1.  At the `psql` prompt, create a hypertable and define the integer-based time column and chunk time interval:

If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

To define a continuous aggregate on a hypertable that uses integer-based time,
you need to have a function to get the current time in the correct format, and
set it for the hypertable. You can do this with the
[`set_integer_now_func`][api-set-integer-now-func]
function. It can be defined as a regular Postgres function, but needs to be
[`STABLE`][pg-func-stable],
take no arguments, and return an integer value of the same type as the time
column in the table. When you have set up the time-handling, you can create the
continuous aggregate.

1.  At the `psql` prompt, set up a function to convert the time to the Unix epoch:

1.  Create the continuous aggregate for the `devices` table:

1.  Insert some rows into the table:

This command uses the `tablefunc` extension to generate a normal
    distribution, and uses the `row_number` function to turn it into a
    cumulative sequence.
1.  Check that the view contains the correct data:

===== PAGE: https://docs.tigerdata.com/use-timescale/continuous-aggregates/materialized-hypertables/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE MATERIALIZED VIEW device_summary
    WITH (timescaledb.continuous)
    AS
    SELECT
      time_bucket('1 hour', observation_time) AS bucket,
      min(observation_time AT TIME ZONE 'EST') AS min_time,
      device_id,
      avg(metric) AS metric_avg,
      max(metric) - min(metric) AS metric_spread
    FROM
      device_readings
    GROUP BY bucket, device_id;
```

Example 2 (sql):
```sql
SELECT min_time::timestamp FROM device_summary;
```

Example 3 (sql):
```sql
CREATE TABLE devices(
      time BIGINT,        -- Time in minutes since epoch
      cpu_usage INTEGER,  -- Total CPU usage
      disk_usage INTEGER, -- Total disk usage
      PRIMARY KEY (time)
    ) WITH (
      tsdb.hypertable,
      tsdb.partition_column='time',
      tsdb.chunk_interval='10'
    );
```

Example 4 (sql):
```sql
CREATE FUNCTION current_epoch() RETURNS BIGINT
    LANGUAGE SQL STABLE AS $$
    SELECT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::bigint;$$;

     SELECT set_integer_now_func('devices', 'current_epoch');
```
