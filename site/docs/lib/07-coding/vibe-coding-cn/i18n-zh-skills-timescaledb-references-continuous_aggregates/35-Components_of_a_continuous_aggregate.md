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
pageSha256: "cc2c2710060ca3a46d768df62ab887cebca22bcc354fb82db55f7b659c91fd6e"
contentMode: "local-full"
zh: ""
---

## Components of a continuous aggregate

Continuous aggregates consist of:

*   Materialization hypertable to store the aggregated data in
*   Materialization engine to aggregate data from the raw, underlying, table to
    the materialization hypertable
*   Invalidation engine to determine when data needs to be re-materialized, due
    to changes in the data
*   Query engine to access the aggregated data

### Materialization hypertable

Continuous aggregates take raw data from the original hypertable, aggregate it,
and store the aggregated data in a materialization hypertable. When you query
the continuous aggregate view, the aggregated data is returned to you as needed.

Using the same temperature example, the materialization table looks like this:

|day|location|chunk|avg temperature|
|-|-|-|-|
|2021/01/01|New York|1|73|
|2021/01/01|Stockholm|1|70|
|2021/01/02|New York|2||
|2021/01/02|Stockholm|2|69|

The materialization table is stored as a TimescaleDB hypertable, to take
advantage of the scaling and query optimizations that hypertables offer.
Materialization tables contain a column for each group-by clause in the query,
and an `aggregate` column for each aggregate in the query.

For more information, see [materialization hypertables][cagg-mat-hypertables].

### Materialization engine

The materialization engine performs two transactions. The first transaction
blocks all INSERTs, UPDATEs, and DELETEs, determines the time range to
materialize, and updates the invalidation threshold. The second transaction
unblocks other transactions, and materializes the aggregates. The first
transaction is very quick, and most of the work happens during the second
transaction, to ensure that the work does not interfere with other operations.

### Invalidation engine

Any change to the data in a hypertable could potentially invalidate some
materialized rows. The invalidation engine checks to ensure that the system does
not become swamped with invalidations.

Fortunately, time-series data means that nearly all INSERTs and UPDATEs have a
recent timestamp, so the invalidation engine does not materialize all the data,
but to a set point in time called the materialization threshold. This threshold
is set so that the vast majority of INSERTs contain more recent timestamps.
These data points have never been materialized by the continuous aggregate, so
there is no additional work needed to notify the continuous aggregate that they
have been added. When the materializer next runs, it is responsible for
determining how much new data can be materialized without invalidating the
continuous aggregate. It then materializes the more recent data and moves the
materialization threshold forward in time. This ensures that the threshold lags
behind the point-in-time where data changes are common, and that most INSERTs do
not require any extra writes.

When data older than the invalidation threshold is changed, the maximum and
minimum timestamps of the changed rows is logged, and the values are used to
determine which rows in the aggregation table need to be recalculated. This
logging does cause some write load, but because the threshold lags behind the
area of data that is currently changing, the writes are small and rare.

===== PAGE: https://docs.tigerdata.com/use-timescale/continuous-aggregates/time/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE TABLE locations (
  id TEXT PRIMARY KEY,
  name TEXT
);

CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  location_id TEXT,
  name TEXT
);

CREATE TABLE conditions (
  "time" TIMESTAMPTZ,
  device_id INTEGER,
  temperature FLOAT8
) WITH (
  tsdb.hypertable,
  tsdb.partition_column='time'
);
```

Example 2 (sql):
```sql
CREATE MATERIALIZED VIEW conditions_by_day WITH (timescaledb.continuous) AS
    SELECT time_bucket('1 day', time) AS bucket, devices.name, MIN(temperature), MAX(temperature)
    FROM conditions
    JOIN devices ON devices.id = conditions.device_id
    GROUP BY bucket, devices.name
    WITH NO DATA;
```

Example 3 (sql):
```sql
CREATE MATERIALIZED VIEW conditions_by_day WITH (timescaledb.continuous) AS
    SELECT time_bucket('1 day', time) AS bucket, devices.name, MIN(temperature), MAX(temperature)
    FROM conditions
    JOIN devices ON devices.id = conditions.device_id
    WHERE devices.location_id = 'location123'
    GROUP BY bucket, devices.name
    WITH NO DATA;
```

Example 4 (sql):
```sql
CREATE MATERIALIZED VIEW conditions_by_day WITH (timescaledb.continuous) AS
    SELECT time_bucket('1 day', time) AS bucket, devices.name, MIN(temperature), MAX(temperature)
    FROM conditions, devices
    WHERE devices.id = conditions.device_id
    GROUP BY bucket, devices.name
    WITH NO DATA;
```
