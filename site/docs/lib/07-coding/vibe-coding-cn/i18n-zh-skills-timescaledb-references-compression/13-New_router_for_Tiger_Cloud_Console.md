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
pageSha256: "719eb5f16b42991b9e47b944cd8d0dfe2d92e2943a970787dc0ad6541ad2feb3"
contentMode: "local-full"
zh: ""
---

### 🗺️ New router for Tiger Cloud Console

The UI just got snappier and easier to navigate with improved interlinking. For example, click an object in the `Jobs` page to see what hypertable the job is associated with.

## New data import wizard
<Label type="date">September 5, 2025</Label>

To make navigation easier, we’ve introduced a cleaner, more intuitive UI for data import. It highlights the most common and recommended option, PostgreSQL Dump & Restore, while organizing all import options into clear categories, to make navigation easier.

The new categories include:
- **PostgreSQL Dump & Restore**
- **Upload Files**: CSV, Parquet, TXT
- **Real-time Data Replication**: source connectors
- **Migrations & Other Options**

![Data import in Tiger Cloud](https://assets.timescale.com/docs/images/tiger-cloud-console/data-import-wizard-in-tiger-cloud.png)

A new data import component has been added to the overview dashboard, providing a clear view of your imports. This includes quick start, in-progress status, and completed imports:

![Overview dashboard in Tiger Cloud](https://assets.timescale.com/docs/images/tiger-cloud-console/service-dashboard-tiger-cloud.png)

## 🚁 Enhancements to the Postgres source connector
<Label type="date">August 28, 2025</Label>

- **Easy table selection**: You can now sync the complete source schema in one go. Select multiple tables from the
   drop-down menu and start the connector.
- **Sync metadata**: Connectors now display the following detailed metadata:
    - `Initial data copy`: The number of rows copied at any given point in time.
    - `Change data capture`: The replication lag represented in time and data size.
- **Improved UX design**: In-progress syncs with separate sections showing the tables and metadata for
   `initial data copy` and `change data capture`, plus a dedicated tab where you can add more tables to the connector.

![Connectors UX](https://assets.timescale.com/docs/images/tiger-cloud-console/connectors-new-ui.png)

## 🦋 Developer role GA and hypertable transformation in Console
<Label type="date">August 21, 2025</Label>
