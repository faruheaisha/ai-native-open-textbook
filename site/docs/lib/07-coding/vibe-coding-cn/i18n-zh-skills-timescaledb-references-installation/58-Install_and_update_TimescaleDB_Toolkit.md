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
pageSha256: "d604c0295d92d9fc47fd232117d7bd4c8cf7d045a6fb5a9110b6ee220c7cc5e0"
contentMode: "local-full"
zh: ""
---

## Install and update TimescaleDB Toolkit

**URL:** llms-txt#install-and-update-timescaledb-toolkit

**Contents:**
- Prerequisites
- Install TimescaleDB Toolkit
- Update TimescaleDB Toolkit
- Prerequisites
- Install TimescaleDB Toolkit
- Update TimescaleDB Toolkit
- Prerequisites
- Install TimescaleDB Toolkit
- Update TimescaleDB Toolkit
- Prerequisites

Some hyperfunctions are included by default in TimescaleDB. For additional
hyperfunctions, you need to install the TimescaleDB Toolkit Postgres
extension.

If you're using [Tiger Cloud][cloud], the TimescaleDB Toolkit is already installed. If you're hosting the TimescaleDB extension on your self-hosted database, you can install Toolkit by:

*   Using the TimescaleDB high-availability Docker image
*   Using a package manager such as `yum`, `apt`, or `brew` on platforms where
    pre-built binaries are available
*   Building from source. For more information, see the [Toolkit developer documentation][toolkit-gh-docs]

To follow this procedure:

- [Install TimescaleDB][debian-install].
- Add the TimescaleDB repository and the GPG key.
