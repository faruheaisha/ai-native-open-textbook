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
pageSha256: "a0bf9aef3aaaf83d76445e4cb2bb4dab37f5fcfdebca2a604e9ff69f17c3278a"
contentMode: "local-full"
zh: ""
---

### 🔥 Ship TimescaleDB metrics to Prometheus

We’re excited to release the Prometheus Exporter for Timescale Cloud, making it easy to ship TimescaleDB metrics to your Prometheus instance.
With the Prometheus Exporter, you can:

- Export TimescaleDB metrics like CPU, memory, and storage
- Visualize usage trends with your own Grafana dashboards
- Set alerts for high CPU load, low memory, or storage nearing capacity

To get started, create a Prometheus Exporter in the Timescale Console, attach it to your service, and configure Prometheus to scrape from the exposed URL. Metrics are secured with basic auth.
Available on Scale and Enterprise plans. [Learn more here](https://docs.timescale.com/use-timescale/latest/metrics-logging/metrics-to-prometheus/).

![Prometheus export user interface](https://assets.timescale.com/docs/images/timescale-create-prometheus-exporter.png)
