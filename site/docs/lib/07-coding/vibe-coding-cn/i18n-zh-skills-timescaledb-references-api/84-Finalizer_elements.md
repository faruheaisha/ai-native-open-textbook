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
pageSha256: "6de2c2b52651043ff35d4546a4b2d511a8deb23d98dc993b0e4ce8287e4891d5"
contentMode: "local-full"
zh: ""
---

## Finalizer elements

Finalizer elements complete the function pipeline, and output a value or an
aggregate.

You can finalize a pipeline with a `timevector`  output element. These are used
at the end of a pipeline to return a `timevector`. This can be useful if you
need to use them in another pipeline later on. The two types of output are:

*   `unnest()`, which returns a set of `(TimestampTZ, DOUBLE PRECISION)` pairs.
*   `materialize()`, which forces the pipeline to materialize a `timevector`.
    This blocks any optimizations that lazily materialize a `timevector`.

### Aggregate output elements

These elements take a `timevector` and run the corresponding aggregate over it
to produce a result.. The possible elements are:

*   `average()`
*   `integral()`
*   `counter_agg()`
*   `hyperloglog()`
*   `stats_agg()`
*   `sum()`
*   `num_vals()`

An example of an aggregate output using `num_vals()`:

The output for this example:

An example of an aggregate output using `stats_agg()`:

The output for this example:
