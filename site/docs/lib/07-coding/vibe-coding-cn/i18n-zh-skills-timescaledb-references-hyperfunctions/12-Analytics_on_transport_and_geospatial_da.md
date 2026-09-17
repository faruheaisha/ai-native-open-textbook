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
pageSha256: "f8020089b65f19f12c90404669a97b7981a1a9e3b398ab136f1aef80e1bc6320"
contentMode: "local-full"
zh: ""
---

## Analytics on transport and geospatial data

**URL:** llms-txt#analytics-on-transport-and-geospatial-data

**Contents:**
- Prerequisites
- Optimize time-series data in hypertables
- Optimize your data for real-time analytics
- Connect Grafana to Tiger Cloud
- Monitor performance over time
- Optimize revenue potential
  - Set up your data for geospatial queries
  - Visualize the area where you can make the most money

Real-time analytics refers to the process of collecting, analyzing, and interpreting data instantly as it
is generated. This approach enables you track and monitor activity, and make decisions based on real-time
insights on data stored in a Tiger Cloud service.

![Real-time analytics geolocation](https://assets.timescale.com/docs/images/use-case-rta-grafana-heatmap.png)

This page shows you how to integrate [Grafana][grafana-docs] with a Tiger Cloud service and make insights based on visualization
of data optimized for size and speed in the columnstore.

To follow the steps on this page:

* Create a target [Tiger Cloud service][create-service] with the Real-time analytics capability.

You need [your connection details][connection-info]. This procedure also
   works for [self-hosted TimescaleDB][enable-timescaledb].

* Install and run [self-managed Grafana][grafana-self-managed], or sign up for [Grafana Cloud][grafana-cloud].
