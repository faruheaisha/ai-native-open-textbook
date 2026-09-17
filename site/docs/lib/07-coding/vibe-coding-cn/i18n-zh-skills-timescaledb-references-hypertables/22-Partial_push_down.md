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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hypertables.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hypertables.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hypertables.md"
sourceSha256: "2b1f8e46c900f47b6a11c8e246b0d222b1dd95793bf063ebaafd0fb65c96841c"
pageSha256: "c0199921ab81ae3d3a76cd2fb4ac57021bd0aa6b953f67c556bcabb514d3c0b9"
contentMode: "local-full"
zh: ""
---

### Partial push down

In the partial push-down method, the access node offloads most of the
computation to the data nodes. It receives partial results from the data nodes
and calculates a final aggregate by combining the partials.

For example, say that you want to calculate the `max` temperature across all
locations. Each data node computes a local maximum, and the access node computes
the final result by computing the maximum of all the local maximums:
