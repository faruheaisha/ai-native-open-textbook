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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/installation.md"
sourceRel: "i18n/zh/skills/timescaledb/references/installation.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/installation.md"
sourceSha256: "4a7b57ccaa9a9f7e4c22cc7a4a1dcd5ddf03b101b4f1914bcb18219176632044"
pageSha256: "fa40fe59e37ef51dd19c87c5fb8284f2e0df68554d990e3d13a69f70ebae8400"
contentMode: "local-full"
zh: ""
---

## Export metrics to Prometheus

**URL:** llms-txt#export-metrics-to-prometheus

**Contents:**
- Prerequisites
- Export Tiger Cloud service telemetry to Prometheus

[Prometheus][prometheus] is an open-source monitoring system with a dimensional data model, flexible query language, and a modern alerting approach.

This page shows you how to export your service telemetry to Prometheus:

- For Tiger Cloud, using a dedicated Prometheus exporter in Tiger Cloud Console.
- For self-hosted TimescaleDB, using [Postgres Exporter][postgresql-exporter].

To follow the steps on this page:

- [Download and run Prometheus][install-prometheus].
- For Tiger Cloud:

Create a target [Tiger Cloud service][create-service] with the time-series and analytics capability enabled.
- For self-hosted TimescaleDB:
  - Create a target [self-hosted TimescaleDB][enable-timescaledb] instance. You need your [connection details][connection-info].
  - [Install Postgres Exporter][install-exporter].
  To reduce latency and potential data transfer costs, install Prometheus and Postgres Exporter on a machine in the same AWS region as your Tiger Cloud service.
