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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/other.md"
sourceRel: "i18n/zh/skills/timescaledb/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/other.md"
sourceSha256: "b53764abbdaf16beaf22420ad0a62ac75d41058fb99968403f1bbd067870709e"
pageSha256: "93c4bd91dc94c7e2fdf5dcf512279575706841a1da032847ef720453ae3e72b9"
contentMode: "local-full"
zh: ""
---

#### Narrow table format example

Working with narrow table data structures presents a few challenges. In the IoT world one concern is that
many data analysis approaches - including machine learning as well as more traditional data analysis -
require that your data is resampled and synchronized to a common time basis. Fortunately, TimescaleDB provides
you with [hyperfunctions][hyperfunctions] and other tools to help you work with this data.

An example of a narrow table format is:

| ts                      | sensor_id | value |
|-------------------------|-----------|-------|
| 2024-10-31 11:17:30.000 | 1007      | 23.45 |

Typically you would couple this with a sensor table:

| sensor_id | sensor_name  | units                    |
|-----------|--------------|--------------------------|
| 1007      | temperature  | degreesC                 |
| 1012      | heat_mode    | on/off                   |
| 1013      | cooling_mode | on/off                   |
| 1041      | occupancy    | number of people in room |

A medium table retains the generic structure but adds columns of various types so that you can
use the same table to store float, int, bool, or even JSON (jsonb) data:

| ts                      | sensor_id | d     | i    | b    | t    | j    |
|-------------------------|-----------|-------|------|------|------|------|
| 2024-10-31 11:17:30.000 | 1007      | 23.45 | null | null | null | null |
| 2024-10-31 11:17:47.000 | 1012      | null  | null | TRUE | null | null |
| 2024-10-31 11:18:01.000 | 1041      | null  | 4    | null | null | null |

To remove all-null entries, use an optional constraint such as:
