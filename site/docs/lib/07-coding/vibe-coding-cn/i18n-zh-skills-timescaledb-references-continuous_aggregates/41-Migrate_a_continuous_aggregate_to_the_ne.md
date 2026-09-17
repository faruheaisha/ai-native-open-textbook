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
pageSha256: "e9abfc093d34c06f50953838d8d4c36b428b56dc2f018f84b08eed0b543d2793"
contentMode: "local-full"
zh: ""
---

## Migrate a continuous aggregate to the new form

**URL:** llms-txt#migrate-a-continuous-aggregate-to-the-new-form

**Contents:**
- Configure continuous aggregate migration
- Check on continuous aggregate migration status
- Troubleshooting
  - Permissions error when migrating a continuous aggregate

In TimescaleDB v2.7 and later, continuous aggregates use a new format that
improves performance and makes them compatible with more SQL queries. Continuous
aggregates created in older versions of TimescaleDB, or created in a new version
with the option `timescaledb.finalized` set to `false`, use the old format.

To migrate a continuous aggregate from the old format to the new format, you can
use this procedure. It automatically copies over your data and policies. You can
continue to use the continuous aggregate while the migration is happening.

Connect to your database and run:

There are known issues with `cagg_migrate()` in version 2.8.0.
Upgrade to version 2.8.1 or later before using it.
