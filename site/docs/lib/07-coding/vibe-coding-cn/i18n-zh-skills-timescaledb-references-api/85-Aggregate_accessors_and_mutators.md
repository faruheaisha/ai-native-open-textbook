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
pageSha256: "62f7bba53e2201ba0b30dcc8abfc83b0e5bf329b614ebc44a07a5403231fa433"
contentMode: "local-full"
zh: ""
---

## Aggregate accessors and mutators

Aggregate accessors and mutators work in function pipelines in the same way as
they do in other aggregates. You can use them to get a value from the aggregate
part of a function pipeline. For example:

When you use them in a pipeline instead of standard function accessors and
mutators, they can make the syntax clearer by getting rid of nested functions.
For example, the nested syntax looks like this:

Using a function pipeline with the `->` operator instead looks like this:

### Counter aggregates

Counter aggregates handle resetting counters. Counters are a common type of
metric in application performance monitoring and metrics. All values have resets
accounted for. These elements must have a `CounterSummary` to their left when
used in a pipeline, from a `counter_agg()` aggregate or pipeline element. The
available counter aggregate functions are:

|Element|Description|
|-|-|
|`counter_zero_time()`|The time at which the counter value is predicted to have been zero based on the least squares fit of the points input to the `CounterSummary`(x intercept)|
|`corr()`|The correlation coefficient of the least squares fit line of the adjusted counter value|
|`delta()`|Computes the last - first value of the counter|
|`extrapolated_delta(method)`|Computes the delta extrapolated using the provided method to bounds of range. Bounds must have been provided in the aggregate or a `with_bounds` call.|
|`idelta_left()`/`idelta_right()`|Computes the instantaneous difference between the second and first points (left) or last and next-to-last points (right)|
|`intercept()`|The y-intercept of the least squares fit line of the adjusted counter value|
|`irate_left()`/`irate_right()`|Computes the instantaneous rate of change between the second and first points (left) or last and next-to-last points (right)|
|`num_changes()`|Number of times the counter changed values|
|`num_elements()`|Number of items - any with the exact same time have been counted only once|
|`num_changes()`|Number of times the counter reset|
|`slope()`|The slope of the least squares fit line of the adjusted counter value|
|`with_bounds(range)`|Applies bounds using the `range` (a `TSTZRANGE`) to the `CounterSummary` if they weren't provided in the aggregation step|

### Percentile approximation

Percentile approximation aggregate accessors are used to approximate
percentiles. Currently, only accessors are implemented for `percentile_agg` and
`uddsketch` based aggregates. We have not yet implemented the pipeline aggregate
for percentile approximation with `tdigest`.

|Element|Description|
|---|---|
|`approx_percentile(p)`| The approximate value at percentile `p` |
|`approx_percentile_rank(v)`|The approximate percentile a value `v` would fall in|
|`error()`|The maximum relative error guaranteed by the approximation|
|`mean()`| The exact average of the input values.|
|`num_vals()`| The number of input values|

### Statistical aggregates

Statistical aggregate accessors add support for common statistical aggregates.
These allow you to compute and `rollup()` common statistical aggregates like
`average` and `stddev`, more advanced aggregates like `skewness`, and
two-dimensional aggregates like `slope` and `covariance`.  Because there are
both single-dimensional and two-dimensional versions of these, the accessors can
have multiple forms. For example, `average()` calculates the average on a
single-dimension aggregate, while `average_y()` and `average_x()` calculate the
average on each of two dimensions. The available statistical aggregates are:

|Element|Description|
|-|-|
|`average()/average_y()/average_x()`|The average of the values|
|`corr()`|The correlation coefficient of the least squares fit line|
|`covariance(method)`|The covariance of the values using either `population` or `sample` method|
| `determination_coeff()`|The determination coefficient (or R squared) of the values|
|`kurtosis(method)/kurtosis_y(method)/kurtosis_x(method)`|The kurtosis (fourth moment) of the values using either the `population` or `sample` method|
|`intercept()`|The intercept of the least squares fit line|
|`num_vals()`|The number of values seen|
|`skewness(method)/skewness_y(method)/skewness_x(method)`|The skewness (third moment) of the values using either the `population` or `sample` method|
|`slope()`|The slope of the least squares fit line|
|`stddev(method)/stddev_y(method)/stddev_x(method)`|The standard deviation of the values using either the `population` or `sample` method|
|`sum()`|The sum of the values|
|`variance(method)/variance_y(method)/variance_x(method)`|The variance of the values using either the `population` or `sample` method|
|`x_intercept()`|The x intercept of the least squares fit line|

### Time-weighted averages aggregates

The `average()` accessor can be called on the output of a `time_weight()`. For
example:

### Approximate count distinct aggregates

This is an approximation for distinct counts. The `distinct_count()` accessor
can be called on the output of a `hyperloglog()`. For example:
