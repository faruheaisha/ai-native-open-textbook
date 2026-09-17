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
pageSha256: "6754eb2d84e3a1e577603cf9484b5bb9fc7c6a0d3448ad8a2635a398536719bf"
contentMode: "local-full"
zh: ""
---

## Enable compression on continuous aggregates

You can enable and disable compression on continuous aggregates by setting the
`compress` parameter when you alter the view.

### Enabling and disabling compression on continuous aggregates

1.  For an existing continuous aggregate, at the `psql` prompt, enable
    compression:

1.  Disable compression:

Disabling compression on a continuous aggregate fails if there are compressed
chunks associated with the continuous aggregate. In this case, you need to
decompress the chunks, and then drop any compression policy on the continuous
aggregate, before you disable compression. For more detailed information, see
the [decompress chunks][decompress-chunks] section:
