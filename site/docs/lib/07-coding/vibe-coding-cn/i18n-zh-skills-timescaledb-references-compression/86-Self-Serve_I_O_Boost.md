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
pageSha256: "3417a51f15b685415d7ca7efb44df6e45e738a40f93e0bc913c0af466b262892"
contentMode: "local-full"
zh: ""
---

### Self-Serve I/O Boost 📈

I/O Boost is an add-on for customers on Scale or Enterprise tiers that maximizes the I/O capacity of EBS storage to 16,000 IOPS and 1,000 MBps throughput per service. To enable I/O Boost, navigate to `Services` > `Operations` in Timescale Console. A simple toggle allows you to enable the feature, with pricing clearly displayed at $0.41/hour per node.

![Timescale I/O Boost](https://assets.timescale.com/docs/images/timescale-i-o-boost.png)

See all the jobs associated with your service through a new `Jobs` tab. You can see the type of job, its status (`Running`, `Paused`, and others), and a detailed history of the last 100 runs, including success rates and runtime statistics.

![Timescale Console Jobs tab](https://assets.timescale.com/docs/images/timescale-console-jobs-tab.png)

![Timescale Console Jobs tab expanded](https://assets.timescale.com/docs/images/timescale-console-jobs-expanded.png)

## 🛝 New service creation flow
<Label type="date">December 6, 2024</Label>

- **AI and Vector:** the UI now lets you choose an option for creating AI and Vector-ready services right from the start. You no longer need to add the pgai, pgvector, and pgvectorscale extensions manually. You can combine this with time-series capabilities as well!

![Create Timescale Cloud service](https://assets.timescale.com/docs/images/create-timescale-service.png)

- **Compute size recommendations:** new (and old) users were sometimes unsure about what compute size to use for their workload.  We now offer compute size recommendations based on how much data you plan to have in your service.

![Service compute recommendation](https://assets.timescale.com/docs/images/timescale-service-compute-size.png)

- **More information about configuration options:** we've made it clearer what each configuration option does, so that you can make more informed choices about how you want your service to be set up.

## 🗝️ IP Allow Lists!
<Label type="date">November 21, 2024</Label>

IP Allow Lists let you specify a list of IP addresses that have access to your Timescale Cloud services and block any others. IP Allow Lists are a
lightweight but effective solution for customers concerned with security and compliance. They enable
you to prevent unauthorized connections without the need for a [Virtual Private Cloud (VPC)](https://docs.timescale.com/use-timescale/latest/security/vpc/).

To get started, in [Timescale Console](https://console.cloud.timescale.com/), select a service, then click
**Operations** > **Security** >  **IP Allow List**, then create an IP Allow List.

![IP Allow lists](https://assets.timescale.com/docs/images/IP-Allow-lists.png)

For more information, [see our docs](https://docs.timescale.com/use-timescale/latest/security/ip-allow-list/).

## 🤩 SQL Assistant, TimescaleDB v2.17, HIPAA compliance, and better logging
<Label type="date">November 14, 2024</Label>
