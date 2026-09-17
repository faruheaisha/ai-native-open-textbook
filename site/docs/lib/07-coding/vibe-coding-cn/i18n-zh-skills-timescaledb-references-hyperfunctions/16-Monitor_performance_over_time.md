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
pageSha256: "53947397fd54108bb09407de746491a60209adffe5251f4ddcd769524969053a"
contentMode: "local-full"
zh: ""
---

## Monitor performance over time

A Grafana dashboard represents a view into the performance of a system, and each dashboard consists of one or
more panels, which represent information about a specific metric related to that system.

To visually monitor the volume of taxi rides over time:

1. **Create the dashboard**

1. On the `Dashboards` page, click `New` and select `New dashboard`.

1. Click `Add visualization`.
   1. Select the data source that connects to your Tiger Cloud service.
       The `Time series` visualization is chosen by default.
      ![Grafana create dashboard](https://assets.timescale.com/docs/images/use-case-rta-grafana-timescale-configure-dashboard.png)
   1. In the `Queries` section, select `Code`, then select `Time series` in `Format`.
   1. Select the data range for your visualization:
      the data set is from 2016. Click the date range above the panel and set:
      - From: 
      - To:

1. **Combine TimescaleDB and Grafana functionality to analyze your data**

Combine a TimescaleDB [time_bucket][use-time-buckets], with the Grafana `_timefilter()` function to set the
   `pickup_datetime` column as the filtering range for your visualizations.
   
   This query groups the results by day and orders them by time.

![Grafana real-time analytics](https://assets.timescale.com/docs/images/use-case-rta-grafana-timescale-final-dashboard.png)

1. **Click `Save dashboard`**
