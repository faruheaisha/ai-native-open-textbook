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
pageSha256: "75b3dd16c30415c3e436f86158ad0ea8197873befa542c41858bd8d1798a3acc"
contentMode: "local-full"
zh: ""
---

#### Map Lambda

The `map()` Lambda maps each element of the `timevector`. This Lambda must
return either a `DOUBLE PRECISION`, where only the values of each point in the
`timevector` is altered, or a `(TIMESTAMPTZ, DOUBLE PRECISION)`, where both the
times and values are changed. An example of the `map()` Lambda with a
`DOUBLE PRECISION` return:

```sql
SELECT (
   toolkit_experimental.timevector(time, value)
   -> toolkit_experimental.map($$ $value + 1 $$)
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
 2021-01-06 00:00:00+00 |     1
 2021-01-01 00:00:00+00 |    26
 2021-01-02 00:00:00+00 |   1.1
 2021-01-04 00:00:00+00 |    -9
 2021-01-05 00:00:00+00 |   4.3
(5 rows)
```

An example of the `map()` Lambda with a `(TIMESTAMPTZ, DOUBLE PRECISION)`
return:

```sql
SELECT (
   toolkit_experimental.timevector(time, value)
   -> toolkit_experimental.map($$ ($time + '1day'i, $value * 2) $$)
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
 2021-01-07 00:00:00+00 |     0
 2021-01-02 00:00:00+00 |    50
 2021-01-03 00:00:00+00 |   0.2
 2021-01-05 00:00:00+00 |   -20
 2021-01-06 00:00:00+00 |   6.6
(5 rows)
```
