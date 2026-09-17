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
pageSha256: "df11fb48815002c452a72d2074379ad1203af78725d61ee83ec089a42903e609"
contentMode: "local-full"
zh: ""
---

### Closed and open dimensions for space partitioning

Space partitioning dimensions can be open or closed. A closed dimension has a
fixed number of partitions, and usually uses some hashing to match values to
partitions. An open dimension does not have a fixed number of partitions, and
usually has each chunk cover a certain range. In most cases the time dimension
is open and the space dimension is closed.

If you use the `create_hypertable` command to create your hypertable, then the
space dimension is open, and there is no way to adjust this. To create a
hypertable with a closed space dimension, create the hypertable with only the
time dimension first. Then use the `add_dimension` command to explicitly add an
open device. If you set the range to `1`, each device has its own chunks. This
can help you work around some limitations of regular space dimensions, and is
especially useful if you want to make some chunks readily available for
exclusion.
