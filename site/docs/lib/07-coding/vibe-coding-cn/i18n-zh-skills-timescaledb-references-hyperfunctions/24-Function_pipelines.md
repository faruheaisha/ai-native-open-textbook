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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hyperfunctions.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceSha256: "05b6221af2cc12adc9bdb276b06af82863fd7bcdfe4a673a0ed0f7f1a69d2184"
pageSha256: "860f74739bfb38c139105b712513ee1ae385aa1fe0d955b9064eb0e1cedf4665"
contentMode: "local-full"
zh: ""
---

## Function pipelines

Function pipelines are an experimental feature, designed to radically improve
the developer ergonomics of analyzing data in Postgres and SQL, by applying
principles from functional programming and popular tools like Python's Pandas,
and PromQL.

SQL is the best language for data analysis, but it is not perfect, and at times
can get quite unwieldy. For example, this query gets data from the last day from
the measurements table, sorts the data by the time column, calculates the delta
between the values, takes the absolute value of the delta, and then takes the
sum of the result of the previous steps:

You can express the same query with a function pipeline like this:

Function pipelines are completely SQL compliant, meaning that any tool that
speaks SQL is able to support data analysis using function pipelines.

For more information about how function pipelines work, read our
[blog post][blog-function-pipelines].
