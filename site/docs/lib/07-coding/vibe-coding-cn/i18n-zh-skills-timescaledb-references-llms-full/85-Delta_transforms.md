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
pageSha256: "61c8737675acdea04b8e303b5834d88c917b4207fe76a94cb0078ec9611f0db1"
contentMode: "local-full"
zh: ""
---

#### Delta transforms

A `delta()` transform calculates the difference between consecutive `values` in
the `timevector`. The first point in the `timevector` is omitted as there is no
previous value and it cannot have a `delta()`. Data should be sorted using the
`sort()` element before passing into `delta()`. For example:

```sql
SELECT (
    toolkit_experimental.timevector(time, value)
    -> toolkit_experimental.sort()
    -> toolkit_experimental.delta()
    -> toolkit_experimental.unnest()).*
FROM (VALUES (TimestampTZ '2021-01-06 UTC',   0.0 ),
             (            '2021-01-01 UTC',  25.0 ),
             (            '2021-01-02 UTC',   0.10),
             (            '2021-01-04 UTC', -10.0 ),
             (            '2021-01-05 UTC',   3.3 )
     ) as v(time, value);
```

The output for this example:

```sql
          time          | value
------------------------+-------
 2021-01-02 00:00:00+00 | -24.9
 2021-01-04 00:00:00+00 | -10.1
 2021-01-05 00:00:00+00 |  13.3
 2021-01-06 00:00:00+00 |  -3.3
(4 rows)
```

The first row of the output is missing, as there is no way to compute a delta
without a previous value.
