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
pageSha256: "6c97194a26f86a0242cb87caf7a463bf9d48d5b69cc70a59b6c310c674899031"
contentMode: "local-full"
zh: ""
---

#### Fill method transform

The `fill_to()` transform ensures that there is a point at least every
`interval`, if there is not a point, it fills in the point using the method
provided. The `timevector` must be sorted before calling `fill_to()`. The
available fill methods are:

|fill_method|description|
|-|-|
|LOCF|Last object carried forward, fill with last known value prior to the hole|
|Interpolate|Fill the hole using a collinear point with the first known value on either side|
|Linear|This is an alias for interpolate|
|Nearest|Fill with the matching value from the closer of the points preceding or following the hole|

For example:

```sql
SELECT (
    toolkit_experimental.timevector(time, value)
    -> toolkit_experimental.sort()
    -> toolkit_experimental.fill_to('1 day', 'LOCF')
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
 2021-01-01 00:00:00+00 |    25
 2021-01-02 00:00:00+00 |   0.1
 2021-01-03 00:00:00+00 |   0.1
 2021-01-04 00:00:00+00 |   -10
 2021-01-05 00:00:00+00 |   3.3
 2021-01-06 00:00:00+00 |     0
(6 rows)
```
