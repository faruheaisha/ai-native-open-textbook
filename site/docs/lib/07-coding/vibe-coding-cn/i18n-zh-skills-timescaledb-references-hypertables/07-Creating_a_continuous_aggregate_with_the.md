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
pageSha256: "6d199e2a612fd6d75218f16d249215c74ecbd661c051aaf6f4b4d5d800aed83c"
contentMode: "local-full"
zh: ""
---

### Creating a continuous aggregate with the WITH NO DATA option

1.  At the `psql` prompt, create the view:

1.  Manually refresh the view:

## Create a continuous aggregate with a JOIN

In TimescaleDB V2.10 and later, with Postgres v12 or later, you can
create a continuous aggregate with a query that also includes a `JOIN`. For
example:

For more information about creating a continuous aggregate with a `JOIN`,
including some additional restrictions, see the
[about continuous aggregates section](https://docs.tigerdata.com/use-timescale/latest/continuous-aggregates/about-continuous-aggregates/#continuous-aggregates-with-a-join-clause).

## Query continuous aggregates

When you have created a continuous aggregate and set a refresh policy, you can
query the view with a `SELECT` query. You can only specify a single hypertable
in the `FROM` clause. Including more hypertables, tables, views, or subqueries
in your `SELECT` query is not supported. Additionally, make sure that the
hypertable you are querying does not have
[row-level-security policies][postgres-rls]
enabled.
