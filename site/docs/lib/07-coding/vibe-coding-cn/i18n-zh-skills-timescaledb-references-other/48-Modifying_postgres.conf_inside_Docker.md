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
pageSha256: "650c76ccdd4ea513b800fa194835b1faf95e2b0e2ac80ace063ae0ee83c22de1"
contentMode: "local-full"
zh: ""
---

#### Modifying postgres.conf inside Docker

1.  Open a shell in Docker to change the configuration on a running
    container.

1.  Edit and then save the config file, modifying the setting for the desired
    configuration parameter (for example, `max_wal_size`).

1.  Restart the container so the config gets reloaded.

1.  Test to see if the change worked.
