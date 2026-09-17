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
pageSha256: "a2c9a05cc8b39314addabe30d9c5a5261da2dedbbd0722b5f1c4f0ba2c0c6a15"
contentMode: "local-full"
zh: ""
---

## Continuous aggregate watermark is in the future

**URL:** llms-txt#continuous-aggregate-watermark-is-in-the-future

**Contents:**
  - Creating a new continuous aggregate with an explicit refresh window

Continuous aggregates use a watermark to indicate which time buckets have
already been materialized. When you query a continuous aggregate, your query
returns materialized data from before the watermark. It returns real-time,
non-materialized data from after the watermark.

In certain cases, the watermark might be in the future. If this happens, all
buckets, including the most recent bucket, are materialized and below the
watermark. No real-time data is returned.

This might happen if you refresh your continuous aggregate over the time window
`<START_TIME>, NULL`, which materializes all recent data. It might also happen
if you create a continuous aggregate using the `WITH DATA` option. This also
implicitly refreshes your continuous aggregate with a window of `NULL, NULL`.

To fix this, create a new continuous aggregate using the `WITH NO DATA` option.
Then use a policy to refresh this continuous aggregate over an explicit time
window.

### Creating a new continuous aggregate with an explicit refresh window

1.  Create a continuous aggregate using the `WITH NO DATA` option:

1.  Refresh the continuous aggregate using a policy with an explicit
    `end_offset`. For example:

1.  Check your new continuous aggregate's watermark to make sure it is in the
    past, not the future.

Get the ID for the materialization hypertable that contains the actual
    continuous aggregate data:

1.  Use the returned ID to query for the watermark's timestamp:

For TimescaleDB >= 2.12:

For TimescaleDB < 2.12:

If you choose to delete your old continuous aggregate after creating a new one,
beware of historical data loss. If your old continuous aggregate contained data
that you dropped from your original hypertable, for example through a data
retention policy, the dropped data is not included in your new continuous
aggregate.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/scheduled-jobs-stop-running/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE MATERIALIZED VIEW <continuous_aggregate_name>
        WITH (timescaledb.continuous)
        AS SELECT time_bucket('<interval>', <partition_column>),
        <other_columns_to_select>,
        ...
        FROM <hypertable>
        GROUP BY bucket,
        WITH NO DATA;
```

Example 2 (sql):
```sql
SELECT add_continuous_aggregate_policy('<continuous_aggregate_name>',
        start_offset => INTERVAL '30 day',
        end_offset => INTERVAL '1 hour',
        schedule_interval => INTERVAL '1 hour');
```

Example 3 (sql):
```sql
SELECT id FROM _timescaledb_catalog.hypertable
        WHERE table_name=(
            SELECT materialization_hypertable_name
                FROM timescaledb_information.continuous_aggregates
                WHERE view_name='<continuous_aggregate_name>'
        );
```

Example 4 (sql):
```sql
SELECT COALESCE(
        _timescaledb_functions.to_timestamp(_timescaledb_functions.cagg_watermark(<ID>)),
        '-infinity'::timestamp with time zone
    );
```
