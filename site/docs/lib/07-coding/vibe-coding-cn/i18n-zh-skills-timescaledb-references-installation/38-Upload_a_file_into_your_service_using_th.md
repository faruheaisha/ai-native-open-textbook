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
pageSha256: "21bff462ecf23f98905396036ce7e4e5c3ea5aa1a5bc299b5f8b39fea18e618f"
contentMode: "local-full"
zh: ""
---

## Upload a file into your service using the terminal

**URL:** llms-txt#upload-a-file-into-your-service-using-the-terminal

**Contents:**
- Prerequisites
- Import data into your service
- Prerequisites
- Import data into your service
- Prerequisites
- Import data into your service

This page shows you how to upload CSV, MySQL, and Parquet files from a source machine into your service using the terminal.

The CSV file format is widely used for data migration. This page shows you how to import data into your Tiger Cloud service from a CSV file using the terminal.

To follow the procedure on this page you need to:

* Create a [target Tiger Cloud service][create-service].

This procedure also works for [self-hosted TimescaleDB][enable-timescaledb].

- Install [Go](https://go.dev/doc/install) v1.13 or later

- Install [timescaledb-parallel-copy][install-parallel-copy]

[timescaledb-parallel-copy][parallel importer] improves performance for large datasets by parallelizing the import
  process. It also preserves row order and uses a round-robin approach to optimize memory management and disk operations.

To verify your installation, run `timescaledb-parallel-copy --version`.

- Ensure that the time column in the CSV file uses the `TIMESTAMPZ` data type.

For faster data transfer, best practice is that your target service and the system
running the data import are in the same region.
