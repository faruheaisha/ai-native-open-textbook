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
pageSha256: "27bd79015c9c03730fc2b6eb30ecb45164ac6891858673fd196c02572902983e"
contentMode: "local-full"
zh: ""
---

## Edit the Postgres configuration file inside Docker

You can start the Dockert container, and then use a text editor to edit the
Postgres configuration file directly. The configuration file requires one
parameter per line. Blank lines are ignored, and you can use a `#` symbol at the
beginning of a line to denote a comment.

### Editing the Postgres configuration file inside Docker

1.  Start your Docker instance:

1.  Open the configuration file in `Vi` editor or your preferred text editor.

1.  Restart the container to reload the configuration:
