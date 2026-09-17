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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "96d5ffee1d62ac3a0e68cd0daa17e1bb49eb72b3e3ef9dbd845098d6f5a420cc"
contentMode: "local-full"
zh: ""
---

## All function pipeline elements

This table lists all function pipeline elements in alphabetical order:

|Element|Category|Output|
|-|-|-|
|`abs()`|Unary Mathematical|`timevector` pipeline|
|`add(val DOUBLE PRECISION)`|Binary Mathematical|`timevector` pipeline|
|`average()`|Aggregate Finalizer|DOUBLE PRECISION|
|`cbrt()`|Unary Mathematical| `timevector` pipeline|
|`ceil()`|Unary Mathematical| `timevector` pipeline|
|`counter_agg()`|Aggregate Finalizer| `CounterAgg`|
|`delta()`|Compound|`timevector` pipeline|
|`div`|Binary Mathematical|`timevector` pipeline|
|`fill_to`|Compound|`timevector` pipeline|
|`filter`|Lambda|`timevector` pipeline|
|`floor`|Unary Mathematical|`timevector` pipeline|
|`hyperloglog`|Aggregate Finalizer|HyperLogLog|
|`ln`|Unary Mathematical|`timevector` pipeline|
|`log10`|Unary Mathematical|`timevector` pipeline|
|`logn`|Binary Mathematical|`timevector` pipeline|
|`lttb`|Compound|`timevector` pipeline|
|`map`|Lambda|`timevector` pipeline|
|`materialize`|Output|`timevector` pipeline|
|`mod`|Binary Mathematical|`timevector` pipeline|
|`mul`|Binary Mathematical|`timevector` pipeline|
|`num_vals`|Aggregate Finalizer|BIGINT|
|`power`|Binary Mathematical|`timevector` pipeline|
|`round`|Unary Mathematical|`timevector` pipeline|
|`sign`|Unary Mathematical|`timevector` pipeline|
|`sort`|Compound|`timevector` pipeline|
|`sqrt`|Unary Mathematical|`timevector` pipeline|
|`stats_agg`|Aggregate Finalizer|StatsSummary1D|
|`sub`|Binary Mathematical|`timevector` pipeline|
|`sum`|Aggregate Finalizer|`timevector` pipeline|
|`trunc`|Unary Mathematical|`timevector` pipeline|
|`unnest`|Output|`TABLE (time TIMESTAMPTZ, value DOUBLE PRECISION)`|

===== PAGE: https://docs.tigerdata.com/use-timescale/hyperfunctions/time-weighted-averages/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT device id,
sum(abs_delta) as volatility
FROM (
 SELECT device_id,
abs(val - lag(val) OVER last_day) as abs_delta
FROM measurements
WHERE ts >= now()-'1 day'::interval) calc_delta
GROUP BY device_id;
```

Example 2 (sql):
```sql
SELECT device_id,
    toolkit_experimental.timevector(ts, val)
        -> toolkit_experimental.sort()
        -> toolkit_experimental.delta()
        -> toolkit_experimental.abs()
        -> toolkit_experimental.sum() as volatility
FROM measurements
WHERE ts >= now()-'1 day'::interval
GROUP BY device_id;
```

Example 3 (sql):
```sql
SELECT device_id,
 toolkit_experimental.timevector(ts, val)
FROM measurements
WHERE ts >= now() - '1 day'::interval
GROUP BY device_id;
```

Example 4 (sql):
```sql
SELECT device_id,
  toolkit_experimental.timevector(ts, val)
        -> toolkit_experimental.sort()
        -> toolkit_experimental.delta()
        -> toolkit_experimental.abs()
        -> toolkit_experimental.sum() as volatility
FROM measurements
WHERE ts >= now() - '1 day'::interval
GROUP BY device_id;
```
