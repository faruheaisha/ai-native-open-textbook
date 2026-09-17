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
pageSha256: "46ef83ff0841d75f21c4344ea60c6ee621e73c4f34ebacc4fa4edad75396e264"
contentMode: "local-full"
zh: ""
---

### Selecting chunks to compress

1.  At the psql prompt, select all chunks in the table `example` that are older
    than three days:

1.  This returns a list of chunks. Take note of the chunks' names:

||show_chunks|
    |---|---|
    |1|_timescaledb_internal_hyper_1_2_chunk|
    |2|_timescaledb_internal_hyper_1_3_chunk|

When you are happy with the list of chunks, you can use the chunk names to
manually compress each one.
