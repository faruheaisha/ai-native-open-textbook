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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/postgresql/references/getting_started.md"
sourceRel: "i18n/zh/skills/postgresql/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/postgresql/references/getting_started.md"
sourceSha256: "95aeb537e6898c59d5a2c6a293e6fb7b5e8dba332b70a50912fef1b7f208ade6"
pageSha256: "0921a95713e17fbbfcaa631c8475a4beb9f2effa3c14128c1d21785cf3ac9f9c"
contentMode: "local-full"
zh: ""
---

## PostgreSQL: Documentation: 18: 2.7. Aggregate Functions

**URL:** https://www.postgresql.org/docs/current/tutorial-agg.html

**Contents:**
- 2.7. Aggregate Functions #

Like most other relational database products, PostgreSQL supports aggregate functions. An aggregate function computes a single result from multiple input rows. For example, there are aggregates to compute the count, sum, avg (average), max (maximum) and min (minimum) over a set of rows.

As an example, we can find the highest low-temperature reading anywhere with:

If we wanted to know what city (or cities) that reading occurred in, we might try:

but this will not work since the aggregate max cannot be used in the WHERE clause. (This restriction exists because the WHERE clause determines which rows will be included in the aggregate calculation; so obviously it has to be evaluated before aggregate functions are computed.) However, as is often the case the query can be restated to accomplish the desired result, here by using a subquery:

This is OK because the subquery is an independent computation that computes its own aggregate separately from what is happening in the outer query.

Aggregates are also very useful in combination with GROUP BY clauses. For example, we can get the number of readings and the maximum low temperature observed in each city with:

which gives us one output row per city. Each aggregate result is computed over the table rows matching that city. We can filter these grouped rows using HAVING:

which gives us the same results for only the cities that have all temp_lo values below 40. Finally, if we only care about cities whose names begin with “S”, we might do:

The LIKE operator does pattern matching and is explained in Section 9.7.

It is important to understand the interaction between aggregates and SQL's WHERE and HAVING clauses. The fundamental difference between WHERE and HAVING is this: WHERE selects input rows before groups and aggregates are computed (thus, it controls which rows go into the aggregate computation), whereas HAVING selects group rows after groups and aggregates are computed. Thus, the WHERE clause must not contain aggregate functions; it makes no sense to try to use an aggregate to determine which rows will be inputs to the aggregates. On the other hand, the HAVING clause always contains aggregate functions. (Strictly speaking, you are allowed to write a HAVING clause that doesn't use aggregates, but it's seldom useful. The same condition could be used more efficiently at the WHERE stage.)

In the previous example, we can apply the city name restriction in WHERE, since it needs no aggregate. This is more efficient than adding the restriction to HAVING, because we avoid doing the grouping and aggregate calculations for all rows that fail the WHERE check.

Another way to select the rows that go into an aggregate computation is to use FILTER, which is a per-aggregate option:

FILTER is much like WHERE, except that it removes rows only from the input of the particular aggregate function that it is attached to. Here, the count aggregate counts only rows with temp_lo below 45; but the max aggregate is still applied to all rows, so it still finds the reading of 46.

**Examples:**

Example 1 (unknown):
```unknown
SELECT max(temp_lo) FROM weather;
```

Example 2 (unknown):
```unknown
max
-----
  46
(1 row)
```

Example 3 (unknown):
```unknown
SELECT city FROM weather WHERE temp_lo = max(temp_lo);     -- WRONG
```

Example 4 (unknown):
```unknown
SELECT city FROM weather
    WHERE temp_lo = (SELECT max(temp_lo) FROM weather);
```
