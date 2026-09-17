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
pageSha256: "dca99287133533a1bda18c0952d4309addebed91a2fb53d14e73f8dbadee037a"
contentMode: "local-full"
zh: ""
---

#### Get the last value of every sensor

There are several ways to get the latest value of every sensor. The following examples use the
structure defined in [Narrow table format example][setup-a-narrow-table-format] as a reference:

- [SELECT DISTINCT ON][select-distinct-on]
- [JOIN LATERAL][join-lateral]

##### SELECT DISTINCT ON

If you have a list of sensors, the easy way to get the latest value of every sensor is to use
`SELECT DISTINCT ON`:

```sql
WITH latest_data AS (
    SELECT DISTINCT ON (sensor_id) ts, sensor_id, d
    FROM iot_data
    WHERE d is not null
      AND ts > CURRENT_TIMESTAMP - INTERVAL '1 week'  -- important
    ORDER BY sensor_id, ts DESC
)
SELECT
    sensor_id, sensors.name, ts, d
FROM latest_data
LEFT OUTER JOIN sensors ON latest_data.sensor_id = sensors.id
WHERE latest_data.d is not null
ORDER BY sensor_id, ts; -- Optional, for displaying results ordered by sensor_id
```

The common table expression (CTE) used above is not strictly necessary. However, it is an elegant way to join
to the sensor list to get a sensor name in the output.  If this is not something you care about,
you can leave it out:

```sql
SELECT DISTINCT ON (sensor_id) ts, sensor_id, d
    FROM iot_data
    WHERE d is not null
      AND ts > CURRENT_TIMESTAMP - INTERVAL '1 week'  -- important
    ORDER BY sensor_id, ts DESC
```

It is important to take care when down-selecting this data. In the previous examples,
the time that the query would scan back was limited. However, if there any sensors that have either
not reported in a long time or in the worst case, never reported, this query devolves to a full table scan.
In a database with 1000+ sensors and 41 million rows, an unconstrained query takes over an hour.
