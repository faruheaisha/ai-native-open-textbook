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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hyperfunctions.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceSha256: "05b6221af2cc12adc9bdb276b06af82863fd7bcdfe4a673a0ed0f7f1a69d2184"
pageSha256: "f32a6146d2b60758d0c011fda9fbeae57a3fd45c621a5d8e6392678978392200"
contentMode: "local-full"
zh: ""
---

## Run an approximate percentage query

In this procedure, we use an example table called `response_times` that contains
information about how long a server takes to respond to API calls.

### Running an approximate percentage query

1.  At the `psql` prompt, create a continuous aggregate that computes the
    daily aggregates:

1.  Re-aggregate the aggregate to get the last 30 days, and look for the
    ninety-fifth percentile:

1.  You can also create an alert:

For more information about percentile approximation API calls, see the
[hyperfunction API documentation][hyperfunctions-api-approx-percentile].

===== PAGE: https://docs.tigerdata.com/use-timescale/hyperfunctions/index/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE MATERIALIZED VIEW response_times_daily
    WITH (timescaledb.continuous)
    AS SELECT
      time_bucket('1 day'::interval, ts) as bucket,
      percentile_agg(response_time_ms)
    FROM response_times
    GROUP BY 1;
```

Example 2 (sql):
```sql
SELECT approx_percentile(0.95, percentile_agg) as threshold
    FROM response_times_daily
    WHERE bucket >= time_bucket('1 day'::interval, now() - '30 days'::interval);
```

Example 3 (sql):
```sql
WITH t as (SELECT approx_percentile(0.95, percentile_agg(percentile_agg)) as threshold
    FROM response_times_daily
    WHERE bucket >= time_bucket('1 day'::interval, now() - '30 days'::interval))

    SELECT count(*)
    FROM response_times
    WHERE ts > now()- '1 minute'::interval
    AND response_time_ms > (SELECT threshold FROM t);
```
