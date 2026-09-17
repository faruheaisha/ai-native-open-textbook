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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/compression.md"
sourceRel: "i18n/zh/skills/timescaledb/references/compression.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/compression.md"
sourceSha256: "488dd1571052c58332a963deed8b1dbd3633dc2724e884eef2085c4098409ec7"
pageSha256: "c4c5e08aa63ac672f57f3f731a8494018079434fbeb539f01d2cb0f96517a4bf"
contentMode: "local-full"
zh: ""
---

### Job errors and individual job pages

Each job now has an individual page in Timescale Console, and displays additional details about job errors. You use
this information to debug failing jobs.

To see the job information page, in [Timescale Console][console], select the service to check, then click `Jobs` > job ID to investigate.

![Log success in Timescale Console](https://assets.timescale.com/docs/images/changelog-job-success-page.png)

- Unsuccessful jobs with errors:

![Log errors in Timescale Console](https://assets.timescale.com/docs/images/changelog-job-error-page.png)

## 🤩 In-Console Livesync for Postgres
<Label type="date">March 21, 2025</Label>

You can now set up an active data ingestion pipeline with livesync for Postgres in Timescale Console. This tool enables you to replicate your source database tables into Timescale's hypertables indefinitely. Yes, you heard that right—keep livesync running for as long as you need, ensuring that your existing source Postgres tables stay in sync with Timescale Cloud. Read more about setting up and using [Livesync for Postgres](https://docs.timescale.com/migrate/latest/livesync-for-postgresql/).

![Livesync in Timescale Console](https://assets.timescale.com/docs/images/timescale-cloud-livesync-tile.png)

![Set up Timescale Livesync](https://assets.timescale.com/docs/images/set-up-timescale-cloud-livesync.png)

![Select tables for Livesync](https://assets.timescale.com/docs/images/select-tables-for-timescale-cloud-livesync.png)

![Timescale Livesync running](https://assets.timescale.com/docs/images/livesync-view-status.png)

## 💾 16K dimensions on pgvectorscale plus new pgai Vectorizer support
<Label type="date">March 14, 2025</Label>
