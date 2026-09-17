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
pageSha256: "4b6f3a9fbd9e81dfb8ef4384895d9366b1e7e7276922e7828617672f64bf0c4c"
contentMode: "local-full"
zh: ""
---

## Visualize energy consumption

A Grafana dashboard represents a view into the performance of a system, and each dashboard consists of one or
more panels, which represent information about a specific metric related to that system.

To visually monitor the volume of energy consumption over time:

1. **Create the dashboard**

1. On the `Dashboards` page, click `New` and select `New dashboard`.

1. Click `Add visualization`, then select the data source that connects to your Tiger Cloud service and the `Bar chart`
      visualization.

![Grafana create dashboard](https://assets.timescale.com/docs/images/use-case-rta-grafana-timescale-configure-dashboard.png)
   1. In the `Queries` section, select `Code`, then run the following query based on your continuous aggregate:

This query averages the results for households in a specific time zone by hour and orders them by time.
      Because you use a continuous aggregate, this data is always correct in real time.

![Grafana real-time analytics](https://assets.timescale.com/docs/images/use-case-rta-grafana-timescale-energy-cagg.png)

You see that energy consumption is highest in the evening and at breakfast time. You also know that the wind
      drops off in the evening. This data proves that you need to supply a supplementary power source for peak times,
      or plan to store energy during the day for peak times.

1. **Click `Save dashboard`**

You have integrated Grafana with a Tiger Cloud service and made insights based on visualization of your data.

===== PAGE: https://docs.tigerdata.com/tutorials/simulate-iot-sensor-data/ =====

**Examples:**

Example 1 (bash):
```bash
