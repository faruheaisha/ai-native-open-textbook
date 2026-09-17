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
pageSha256: "db64d0364eed11f4274586854afe4b34257a71f891932003e6348024c32487bb"
contentMode: "local-full"
zh: ""
---

## Real-time analytics with Tiger Cloud and Grafana

**URL:** llms-txt#real-time-analytics-with-tiger-cloud-and-grafana

**Contents:**
- Prerequisites
- Optimize time-series data in hypertables
- Optimize your data for real-time analytics
- Write fast analytical queries
- Connect Grafana to Tiger Cloud
- Visualize energy consumption

Energy providers understand that customers tend to lose patience when there is not enough power for them
to complete day-to-day activities. Task one is keeping the lights on. If you are transitioning to renewable energy,
it helps to know when you need to produce energy so you can choose a suitable energy source.

Real-time analytics refers to the process of collecting, analyzing, and interpreting data instantly as it is generated.
This approach enables you to track and monitor activity, make the decisions based on real-time insights on data stored in
a Tiger Cloud service and keep those lights on.

[Grafana][grafana-docs] is a popular data visualization tool that enables you to create customizable dashboards
and effectively monitor your systems and applications.

![Grafana real-time analytics](https://assets.timescale.com/docs/images/use-case-rta-grafana-timescale-energy-cagg.png)

This page shows you how to integrate Grafana with a Tiger Cloud service and make insights based on visualization of
data optimized for size and speed in the columnstore.

To follow the steps on this page:

* Create a target [Tiger Cloud service][create-service] with the Real-time analytics capability.

You need [your connection details][connection-info]. This procedure also
   works for [self-hosted TimescaleDB][enable-timescaledb].

* Install and run [self-managed Grafana][grafana-self-managed], or sign up for [Grafana Cloud][grafana-cloud].
