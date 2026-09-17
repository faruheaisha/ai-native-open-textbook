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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "8b5c1bbc66fc5dd5969b30103473ba32eb0fdf258d8575aff897b1b1c8811d8c"
contentMode: "local-full"
zh: ""
---

## Function pipelines

**URL:** llms-txt#function-pipelines

**Contents:**
- Anatomy of a function pipeline
  - Timevectors
  - Custom operator
  - Pipeline elements
- Transform elements
  - Vectorized math functions
  - Unary mathematical functions
  - Binary mathematical functions
  - Compound transforms
  - Lambda elements

Function pipelines are an experimental feature, designed to radically improve
how you write queries to analyze data in Postgres and SQL. They work by
applying principles from functional programming and popular tools like Python
Pandas, and PromQL.

Experimental features could have bugs. They might not be backwards compatible,
and could be removed in future releases. Use these features at your own risk, and
do not use any experimental features in production.

The `timevector()` function materializes all its data points in
memory. This means that if you use it on a very large dataset,
it runs out of memory. Do not use the `timevector` function
on a large dataset, or in production.

SQL is the best language for data analysis, but it is not perfect, and at times
it can be difficult to construct the query you want. For example, this query
gets data from the last day from the measurements table, sorts the data by the
time column, calculates the delta between the values, takes the absolute value
of the delta, and then takes the sum of the result of the previous steps:

You can express the same query with a function pipeline like this:

Function pipelines are completely SQL compliant, meaning that any tool that
speaks SQL is able to support data analysis using function pipelines.
