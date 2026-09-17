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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "c7266d2ef935b6d3a361f73abd245401f2918eb959fc433163a2134ced4183c8"
contentMode: "local-full"
zh: ""
---

#### Sort transform

The `sort()` transform sorts the `timevector` by time, in ascending order. This
transform is ignored if the `timevector` is already sorted. For example:

```sql
SELECT (
    toolkit_experimental.timevector(time, value)
    -> toolkit_experimental.sort()
    -> toolkit_experimental.unnest()).*
FROM (VALUES (TimestampTZ '2021-01-06 UTC',   0.0 ),
             (            '2021-01-01 UTC',  25.0 ),
             (            '2021-01-02 UTC',   0.10),
             (            '2021-01-04 UTC', -10.0 ),
             (            '2021-01-05 UTC',   3.3 )
     ) as v(time, value);
```

The output for this example:

```sql
          time          | value
------------------------+-------
 2021-01-01 00:00:00+00 |    25
 2021-01-02 00:00:00+00 |   0.1
 2021-01-04 00:00:00+00 |   -10
 2021-01-05 00:00:00+00 |   3.3
 2021-01-06 00:00:00+00 |     0
(5 rows)
```

### Lambda elements

The Lambda element functions use the Toolkit's experimental Lambda syntax to transform
a `timevector`. A Lambda is an expression that is applied to the elements of a `timevector`.
It is written as a string, usually `$$`-quoted, containing the expression to run.
For example:

```sql
$$
 let $is_relevant = $time > '2021-01-01't and $time < '2021-10-14't;
 let $is_significant = abs(round($value)) >= 0;
 $is_relevant and $is_significant
$$
```

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

```ebnf
Expr     = ('let' Variable '=' Tuple ';')* Tuple
Tuple    = Binops (',' Binops)*
Binops   = Unaryops (Binop Unaryops)*
UnaryOps = ('-' | 'not') UnaryOps | Term
Term     = Variable | Time | Interval | Number | Function | '(' Expr ')'
Function = FunctionName '(' (Binops ',')* ')'
Variable = ? described above ?
Time     = ? described above ?
Interval = ? described above ?
Number   = ? described above ?
```
