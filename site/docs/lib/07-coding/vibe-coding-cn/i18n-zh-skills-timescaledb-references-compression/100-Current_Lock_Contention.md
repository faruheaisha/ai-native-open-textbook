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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/compression.md"
sourceRel: "i18n/zh/skills/timescaledb/references/compression.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/compression.md"
sourceSha256: "488dd1571052c58332a963deed8b1dbd3633dc2724e884eef2085c4098409ec7"
pageSha256: "04d8189fab9816b17cfa948f496d78b73382cbb6e65a01a26f80358a252d564f"
contentMode: "local-full"
zh: ""
---

### 🔐 Current Lock Contention

In Timescale Console, we offer the SQL editor so you can directly querying your service. As a new improvement,  **if a query is waiting on locks and can't complete execution**, Timescale Console now displays the current lock contention in the results section .

![View console services](https://assets.timescale.com/docs/images/current-lock-contention.png)

## CIDR & VPC Updates

<Label type="date">October 3, 2024</Label>

Timescale now supports multiple CIDRs on the customer VPC. Customers who want to take advantage of multiple CIDRs will need to recreate their peering.

## 🤝 New modes in Timescale Console: Ops and Data mode, and Console based Parquet File Import

<Label type="date">September 19, 2024</Label>

We've been listening to your feedback and noticed that Timescale Console users have diverse needs. Some of you are focused on operational tasks like adding replicas or changing parameters, while others are diving deep into data analysis to gather insights.

**To better serve you, we've introduced new modes to the Timescale Console UI—tailoring the experience based on what you're trying to accomplish.**

Ops mode is where you can manage your services, add replicas, configure compression, change parameters, and so on.

Data mode is the full PopSQL experience: write queries with autocomplete, visualize data with charts and dashboards, schedule queries and dashboards to create alerts or recurring reports, share queries and dashboards, and more.

Try it today and let us know what you think!

![Timescale Console Ops and Data mode](https://assets.timescale.com/docs/images/ops-data-mode.gif)

## Console based Parquet File Import

Now users can upload from Parquet to Timescale Cloud by uploading the file from their local file system. For files larger than 250 MB, or if you want to do it yourself, follow the three-step process to upload Parquet files to Timescale.

![Upload from Parquet to Timescale Cloud](https://assets.timescale.com/docs/images/upload_parquet.gif)
