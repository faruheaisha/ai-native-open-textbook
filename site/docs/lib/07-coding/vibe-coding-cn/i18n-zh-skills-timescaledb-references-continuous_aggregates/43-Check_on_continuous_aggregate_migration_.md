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
pageSha256: "1b876e128caf59977a66bd8f26f64d951ffc0ef06cc82e3982f2e90161db38ad"
contentMode: "local-full"
zh: ""
---

## Check on continuous aggregate migration status

To check the progress of the continuous aggregate migration, query the migration
planning table:

### Permissions error when migrating a continuous aggregate

You might get a permissions error when migrating a continuous aggregate from old
to new format using `cagg_migrate`. The user performing the migration must have
the following permissions:

*   Select, insert, and update permissions on the tables
    `_timescale_catalog.continuous_agg_migrate_plan` and
    `_timescale_catalog.continuous_agg_migrate_plan_step`
*   Usage permissions on the sequence
    `_timescaledb_catalog.continuous_agg_migrate_plan_step_step_id_seq`

To solve the problem, change to a user capable of granting permissions, and
grant the following permissions to the user performing the migration:

===== PAGE: https://docs.tigerdata.com/use-timescale/continuous-aggregates/compression-on-continuous-aggregates/ =====

**Examples:**

Example 1 (sql):
```sql
CALL cagg_migrate('<CONTINUOUS_AGGREGATE_NAME>');
```

Example 2 (sql):
```sql
SELECT * FROM _timescaledb_catalog.continuous_agg_migrate_plan_step;
```

Example 3 (sql):
```sql
GRANT SELECT, INSERT, UPDATE ON TABLE _timescaledb_catalog.continuous_agg_migrate_plan TO <USER>;
GRANT SELECT, INSERT, UPDATE ON TABLE _timescaledb_catalog.continuous_agg_migrate_plan_step TO <USER>;
GRANT USAGE ON SEQUENCE _timescaledb_catalog.continuous_agg_migrate_plan_step_step_id_seq TO <USER>;
```
