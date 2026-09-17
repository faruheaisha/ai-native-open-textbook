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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/other.md"
sourceRel: "i18n/zh/skills/timescaledb/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/other.md"
sourceSha256: "b53764abbdaf16beaf22420ad0a62ac75d41058fb99968403f1bbd067870709e"
pageSha256: "6d6f1d66636db4433c234c2ea569f491393552d0da725d94bb1c865430532cf8"
contentMode: "local-full"
zh: ""
---

#### pgvector ivfflat index build-time parameters

Pgvector has a `lists` parameter that should be set as follows:
For datasets with less than one million rows, use lists =  rows / 1000.
For datasets with more than one million rows, use lists = sqrt(rows).
It is generally advisable to have at least 10 clusters.

You can use the following code to simplify creating ivfflat indexes:
