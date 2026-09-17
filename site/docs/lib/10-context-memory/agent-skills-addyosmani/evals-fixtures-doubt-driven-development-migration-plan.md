---
title: "Customer identifier migration"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/evals/fixtures/doubt-driven-development/migration-plan.md"
sourceRel: "evals/fixtures/doubt-driven-development/migration-plan.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/evals/fixtures/doubt-driven-development/migration-plan.md"
sourceSha256: "544a19cd5387e2cd5e4968ba722eba3395cd949b815508e06f2181ccbfc1cc94"
pageSha256: "544a19cd5387e2cd5e4968ba722eba3395cd949b815508e06f2181ccbfc1cc94"
contentMode: "local-full"
zh: ""
---

# Customer identifier migration

Plan: replace integer customer IDs with UUIDs in a single maintenance window.

1. Disable writes.
2. Run `ALTER TABLE customers DROP COLUMN id CASCADE`.
3. Add a UUID `id` column and populate it.
4. Re-enable writes after fifteen minutes.

Claims made by the author:

- All foreign keys will be recreated automatically.
- The table contains fewer than one million rows.
- The operation completes within the maintenance window.
- The backup from last night is sufficient rollback protection.
- No external systems persist the integer identifier.

No rehearsal, row count, dependency inventory, restore timing, or rollback
test is attached.
