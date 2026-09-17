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
pageSha256: "e220708331f8c2a96dbdb9ef87df65306ae1e3d23bf5827ab641da13da6144b9"
contentMode: "local-full"
zh: ""
---

## timescaledb_information.job_stats

**URL:** llms-txt#timescaledb_information.job_stats

**Contents:**
- Samples
- Available columns

Shows information and statistics about jobs run by the automation framework.
This includes jobs set up for user defined actions and jobs run by policies
created to manage data retention, continuous aggregates, columnstore, and
other automation policies.  (See [policies][actions]).
The statistics include information useful for administering jobs and determining
whether they ought be rescheduled, such as: when and whether the background job
used to implement the policy succeeded and when it is scheduled to run next.

Get job success/failure information for a specific hypertable.

Get information about continuous aggregate policy related statistics

|Name|Type|Description|
|---|---|---|
|`hypertable_schema` | TEXT | Schema name of the hypertable |
|`hypertable_name` | TEXT | Table name of the hypertable |
|`job_id` | INTEGER | The id of the background job created to implement the policy |
|`last_run_started_at`| TIMESTAMP WITH TIME ZONE | Start time of the last job|
|`last_successful_finish`| TIMESTAMP WITH TIME ZONE | Time when the job completed successfully|
|`last_run_status` | TEXT | Whether the last run succeeded or failed |
|`job_status`| TEXT | Status of the job. Valid values are 'Running', 'Scheduled' and 'Paused'|
|`last_run_duration`| INTERVAL | Duration of last run of the job|
|`next_start` | TIMESTAMP WITH TIME ZONE | Start time of the next run |
|`total_runs` | BIGINT | The total number of runs of this job|
|`total_successes` | BIGINT | The total number of times this job succeeded |
|`total_failures` | BIGINT | The total number of times this job failed |

===== PAGE: https://docs.tigerdata.com/api/informational-views/continuous_aggregates/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT job_id, total_runs, total_failures, total_successes
  FROM timescaledb_information.job_stats
  WHERE hypertable_name = 'test_table';

 job_id | total_runs | total_failures | total_successes
--------+------------+----------------+-----------------
   1001 |          1 |              0 |               1
   1004 |          1 |              0 |               1
(2 rows)
```
