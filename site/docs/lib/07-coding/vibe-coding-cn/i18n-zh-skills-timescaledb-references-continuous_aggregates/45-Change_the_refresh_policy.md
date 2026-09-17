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
pageSha256: "3cfb08a18317e40b5164b64bdcf9c144b0c427dc39944dba5b0eec4e82cfaf86"
contentMode: "local-full"
zh: ""
---

## Change the refresh policy

Continuous aggregates require a policy for automatic refreshing. You can adjust
this to suit different use cases. For example, you can have the continuous
aggregate and the hypertable stay in sync, even when data is removed from the
hypertable. Alternatively, you could keep source data in the continuous aggregate even after
it is removed from the hypertable.

You can change the way your continuous aggregate is refreshed by calling
`add_continuous_aggregate_policy`.

Among others, `add_continuous_aggregate_policy` takes the following arguments:

*   `start_offset`: the start of the refresh window relative to when the policy
    runs
*   `end_offset`: the end of the refresh window relative to when the policy runs
*   `schedule_interval`: the refresh interval in minutes or hours. Defaults to
    24 hours.

- If you set the `start_offset` or `end_offset` to `NULL`, the range is open-ended and extends to the beginning or end of time.
- If you set `end_offset` within the current time bucket, this bucket is excluded from materialization. This is done for the following reasons:

- The current bucket is incomplete and can't be refreshed.
  - The current bucket gets a lot of writes in the timestamp order, and its aggregate becomes outdated very quickly. Excluding it improves performance.

To include the latest raw data in queries, enable [real-time aggregation][future-watermark].

See the [API reference][api-reference] for the full list of required and optional arguments and use examples.

The policy in the following example ensures that all data in the continuous aggregate is up to date with the hypertable, except for data written within the last hour of wall-clock time. The policy also does not refresh the last time bucket of the continuous aggregate.

Since the policy in this example runs once every hour (`schedule_interval`) while also excluding data within the most recent hour (`end_offset`), it takes up to 2 hours for data written to the hypertable to be reflected in the continuous aggregate. Backfills, which are usually outside the most recent hour of data, will be visible after up to 1 hour depending on when the policy last ran when the data was written.

Because it has an open-ended `start_offset` parameter, any data that is removed
from the table, for example with a `DELETE` or with `drop_chunks`, is also removed
from the continuous aggregate view. This means that the continuous aggregate
always reflects the data in the underlying hypertable.

To changing a refresh policy to use a `NULL` `start_offset`:

1. **Connect to your Tiger Cloud service**

In [Tiger Cloud Console][services-portal] open an [SQL editor][in-console-editors]. You can also connect to your service using [psql][connect-using-psql].

1. Create a new policy on `conditions_summary_hourly` that keeps the continuous aggregate up to date, and runs every hour:

If you want to keep data in the continuous aggregate even if it is removed from
the underlying hypertable, you can set the `start_offset` to match the
[data retention policy][sec-data-retention] on the source hypertable. For example,
if you have a retention policy that removes data older than one month, set
`start_offset` to one month or less. This sets your policy so that it does not
refresh the dropped data.

1. Connect to your Tiger Cloud service.

In [Tiger Cloud Console][services-portal] open an [SQL editor][in-console-editors]. You can also connect to your service using [psql][connect-using-psql].

1. Create a new policy on `conditions_summary_hourly`
    that keeps data removed from the hypertable in the continuous aggregate, and
    runs every hour:

It is important to consider your data retention policies when you're setting up
continuous aggregate policies. If the continuous aggregate policy window covers
data that is removed by the data retention policy, the data will be removed when
the aggregates for those buckets are refreshed. For example, if you have a data
retention policy that removes all data older than two weeks, the continuous
aggregate policy will only have data for the last two weeks.
