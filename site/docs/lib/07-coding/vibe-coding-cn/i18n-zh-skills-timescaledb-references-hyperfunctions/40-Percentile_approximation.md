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
pageSha256: "e7b7778e8e64c41c218a837c564426f4fb4ae760d330fd7001a0930de5f592b8"
contentMode: "local-full"
zh: ""
---

## Percentile approximation

**URL:** llms-txt#percentile-approximation

In general, percentiles are useful for understanding the distribution of data.
The fiftieth percentile is the point at which half of your data is greater and
half is lesser. The tenth percentile is the point at which 90% of the data is
greater, and 10% is lesser. The ninety-ninth percentile is the point at which 1%
is greater, and 99% is lesser.

The fiftieth percentile, or median, is often a more useful measure than the average,
especially when your data contains outliers. Outliers can dramatically change
the average, but do not affect the median as much. For example, if you have
three rooms in your house and two of them are 40℉ (4℃) and one is 130℉ (54℃),
the average room temperature is 70℉ (21℃), which doesn't tell you much. However,
the fiftieth percentile temperature is 40℉ (4℃), which tells you that at least half
your rooms are at refrigerator temperatures (also, you should probably get your
heating checked!)

Percentiles are sometimes avoided because calculating them requires more CPU and
memory than an average or other aggregate measures. This is because an exact
computation of the percentile needs the full dataset as an ordered list.
TimescaleDB uses approximation algorithms to calculate a percentile without
requiring all of the data. This also makes them more compatible with continuous
aggregates. By default, TimescaleDB uses `uddsketch`, but you can also choose to
use `tdigest`. For more information about these algorithms, see the
[advanced aggregation methods][advanced-agg] documentation.

Technically, a percentile divides a group into 100 equally sized pieces, while a
quantile divides a group into an arbitrary number of pieces. Because we don't
always use exactly 100 buckets, "quantile" is the more technically correct term
in this case. However, we use the word "percentile" because it's a more common
word for this type of function.

*   For more information about how percentile approximation works, read our
    [percentile approximation blog][blog-percentile-approx].
*   For more information about percentile approximation API calls, see the
    [hyperfunction API documentation][hyperfunctions-api-approx-percentile].

===== PAGE: https://docs.tigerdata.com/use-timescale/hyperfunctions/advanced-agg/ =====
