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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "0fd3f13127b3eac8d1302fc7c1e448b722230417b8a50561db73776010effe8d"
contentMode: "local-full"
zh: ""
---

## Experimental (TimescaleDB Experimental Schema) Experimental

This tag indicates that the function is included in the TimescaleDB experimental
schema. Do not use experimental functions in production. Experimental features
could include bugs, and are likely to change in future versions. The
experimental schema is used by TimescaleDB to develop new features more quickly.
If experimental functions are successful, they can move out of the experimental
schema and go into production use.

When you upgrade the `timescaledb` extension, the experimental schema is removed
by default. To use experimental features after an upgrade, you need to add the
experimental schema again.

For more information about the experimental
schema, [read the Tiger Data blog post][experimental-blog].

This tag indicates that the function is included in the TimescaleDB Toolkit extension.
Toolkit functions are available under TimescaleDB Community Edition.
For installation instructions, [see the installation guide][toolkit-install].
