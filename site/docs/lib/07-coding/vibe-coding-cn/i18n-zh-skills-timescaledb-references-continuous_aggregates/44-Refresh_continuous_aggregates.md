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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
sourceRel: "i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
sourceSha256: "2fc13047cc1286afec41d05f8c09c0c452219a02da65b4ba1b4a06c4663c93ed"
pageSha256: "1f1d5e774691a93f2e3afb9c07d37a8c883c9db5c4715720023ed7e5a9b7ddf1"
contentMode: "local-full"
zh: ""
---

## Refresh continuous aggregates

**URL:** llms-txt#refresh-continuous-aggregates

**Contents:**
- Prerequisites
- Change the refresh policy
- Add concurrent refresh policies
- Manually refresh a continuous aggregate

Continuous aggregates can have a range of different refresh policies. In
addition to refreshing the continuous aggregate automatically using a policy,
you can also refresh it manually.

To follow the procedure on this page you need to:

* Create a [target Tiger Cloud service][create-service].

This procedure also works for [self-hosted TimescaleDB][enable-timescaledb].
