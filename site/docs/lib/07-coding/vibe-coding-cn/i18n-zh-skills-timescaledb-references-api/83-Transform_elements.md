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
pageSha256: "dd6dd543520b2030259d40c5b773c1ef8fc8dd4ca13b535f644d437b138ecd55"
contentMode: "local-full"
zh: ""
---

## Transform elements

Transform elements take a `timevector`, and produce a `timevector`.

### Vectorized math functions

Vectorized math function elements modify each `value` inside the `timevector`
with the specified mathematical function. They are applied point-by-point and
they produce a one-to-one mapping from the input to output `timevector`. Each
point in the input has a corresponding point in the output, with its `value`
transformed by the mathematical function specified.

Elements are always applied left to right, so the order of operations is not
taken into account even in the presence of explicit parentheses. This means for
a `timevector` row `('2020-01-01 00:00:00+00', 20.0)`, this pipeline works:

And this pipeline works in the same way:

Both of these examples produce `('2020-01-01 00:00:00+00', 31.0)`.

If multiple arithmetic operations are needed and precedence is important,
consider using a [Lambda](#lambda-elements) instead.

### Unary mathematical functions

Unary mathematical function elements apply the corresponding mathematical
function to each datapoint in the `timevector`, leaving the timestamp and
ordering the same. The available elements are:

|Element|Description|
|-|-|
|`abs()`|Computes the absolute value of each value|
|`cbrt()`|Computes the cube root of each value|
|`ceil()`|Computes the first integer greater than or equal to each value|
|`floor()`|Computes the first integer less than or equal to each value|
|`ln()`|Computes the natural logarithm of each value|
|`log10()`|Computes the base 10 logarithm of each value|
|`round()`|Computes the closest integer to each value|
|`sign()`|Computes +/-1 for each positive/negative value|
|`sqrt()`|Computes the square root for each value|
|`trunc()`|Computes only the integer portion of each value|

Even if an element logically computes an integer, `timevectors` only deal with
double precision floating point values, so the computed value is the
floating point representation of the integer. For example:

The output for this example:

### Binary mathematical functions

Binary mathematical function elements run the corresponding mathematical function
on the `value` in each point in the `timevector`, using the supplied number as
the second argument of the function. The available elements are:

|Element|Description|
|-|-|
|`add(N)`|Computes each value plus `N`|
|`div(N)`|Computes each value divided by `N`|
|`logn(N)`|Computes the logarithm base `N` of each value|
|`mod(N)`|Computes the remainder when each number is divided by `N`|
|`mul(N)`|Computes each value multiplied by `N`|
|`power(N)`|Computes each value taken to the `N` power|
|`sub(N)`|Computes each value less `N`|

These elements calculate `vector -> power(2)` by squaring all of the `values`,
and `vector -> logn(3)` gives the log-base-3 of each `value`. For example:

The output for this example:

### Compound transforms

Mathematical transforms are applied only to the `value` in each
point in a `timevector` and always produce one-to-one output `timevectors`.
Compound transforms can involve both the `time` and `value` parts of the points
in the `timevector`, and they are not necessarily one-to-one. One or more points
in the input can be used to produce zero or more points in the output. So, where
mathematical transforms always produce `timevectors` of the same length,
compound transforms can produce larger or smaller `timevectors` as an output.

#### Delta transforms

A `delta()` transform calculates the difference between consecutive `values` in
the `timevector`. The first point in the `timevector` is omitted as there is no
previous value and it cannot have a `delta()`. Data should be sorted using the
`sort()` element before passing into `delta()`. For example:

The output for this example:

The first row of the output is missing, as there is no way to compute a delta
without a previous value.

#### Fill method transform

The `fill_to()` transform ensures that there is a point at least every
`interval`, if there is not a point, it fills in the point using the method
provided. The `timevector` must be sorted before calling `fill_to()`. The
available fill methods are:

|fill_method|description|
|-|-|
|LOCF|Last object carried forward, fill with last known value prior to the hole|
|Interpolate|Fill the hole using a collinear point with the first known value on either side|
|Linear|This is an alias for interpolate|
|Nearest|Fill with the matching value from the closer of the points preceding or following the hole|

The output for this example:

#### Largest triangle three buckets (LTTB) transform

The largest triangle three buckets (LTTB) transform uses the LTTB graphical
downsampling algorithm to downsample a `timevector` to the specified resolution
while maintaining visual acuity.

The `sort()` transform sorts the `timevector` by time, in ascending order. This
transform is ignored if the `timevector` is already sorted. For example:

The output for this example:

The Lambda element functions use the Toolkit's experimental Lambda syntax to transform
a `timevector`. A Lambda is an expression that is applied to the elements of a `timevector`.
It is written as a string, usually `$$`-quoted, containing the expression to run.
For example:

A Lambda expression can be constructed using these components:

*   **Variable declarations** such as `let $foo = 3; $foo * $foo`. Variable
    declarations end with a semicolon. All Lambdas must end with an
    expression, this does not have a semicolon. Multiple variable declarations
    can follow one another, for example:
    `let $foo = 3; let $bar = $foo * $foo; $bar * 10`
*   **Variable names** such as `$foo`. They must start with a `$` symbol. The
    variables `$time` and `$value` are reserved; they refer to the time and
    value of the point in the vector the Lambda expression is being called on.
*   **Function calls** such as `abs($foo)`. Most mathematical functions are
    supported.
*   **Binary operations** containing the arithmetic binary operators `and`,
    `or`, `=`, `!=`, `<`, `<=`, `>`, `>=`, `^`, `*`, `/`, `+`, and `-` are
    supported.
*   **Interval literals** are expressed with a trailing `i`. For example,
    `'1 day'i`. Except for the trailing `i`, these follow the Postgres
    `INTERVAL` input format.
*   **Time literals** such as `'2021-01-02 03:00:00't` expressed with a
    trailing `t`. Except for the trailing `t` these follow the Postgres
    `TIMESTAMPTZ` input format.
*   **Number literals** such as `42`, `0.0`, `-7`, or `1e2`.

Lambdas follow a grammar that is roughly equivalent to EBNF. For example:

The `map()` Lambda maps each element of the `timevector`. This Lambda must
return either a `DOUBLE PRECISION`, where only the values of each point in the
`timevector` is altered, or a `(TIMESTAMPTZ, DOUBLE PRECISION)`, where both the
times and values are changed. An example of the `map()` Lambda with a
`DOUBLE PRECISION` return:

The output for this example:

An example of the `map()` Lambda with a `(TIMESTAMPTZ, DOUBLE PRECISION)`
return:

The output for this example:

The `filter()` Lambda filters a `timevector` based on a Lambda expression that
returns `true` for every point that should stay in the `timevector` timeseries,
and `false` for every point that should be removed. For example:

The output for this example:
