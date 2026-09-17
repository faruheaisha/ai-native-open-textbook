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
pageSha256: "ec9c22086935baf5ac7e352e01bd1ff36c582734f2d351817c5236802fff1676"
contentMode: "local-full"
zh: ""
---

## PostgreSQL: Documentation: 18: 2.5. Querying a Table

**URL:** https://www.postgresql.org/docs/current/tutorial-select.html

**Contents:**
- 2.5. Querying a Table #

To retrieve data from a table, the table is queried. An SQL SELECT statement is used to do this. The statement is divided into a select list (the part that lists the columns to be returned), a table list (the part that lists the tables from which to retrieve the data), and an optional qualification (the part that specifies any restrictions). For example, to retrieve all the rows of table weather, type:

Here * is a shorthand for “all columns”. [2] So the same result would be had with:

The output should be:

You can write expressions, not just simple column references, in the select list. For example, you can do:

Notice how the AS clause is used to relabel the output column. (The AS clause is optional.)

A query can be “qualified” by adding a WHERE clause that specifies which rows are wanted. The WHERE clause contains a Boolean (truth value) expression, and only rows for which the Boolean expression is true are returned. The usual Boolean operators (AND, OR, and NOT) are allowed in the qualification. For example, the following retrieves the weather of San Francisco on rainy days:

You can request that the results of a query be returned in sorted order:

In this example, the sort order isn't fully specified, and so you might get the San Francisco rows in either order. But you'd always get the results shown above if you do:

You can request that duplicate rows be removed from the result of a query:

Here again, the result row ordering might vary. You can ensure consistent results by using DISTINCT and ORDER BY together: [3]

[2] While SELECT * is useful for off-the-cuff queries, it is widely considered bad style in production code, since adding a column to the table would change the results.

[3] In some database systems, including older versions of PostgreSQL, the implementation of DISTINCT automatically orders the rows and so ORDER BY is unnecessary. But this is not required by the SQL standard, and current PostgreSQL does not guarantee that DISTINCT causes the rows to be ordered.

**Examples:**

Example 1 (unknown):
```unknown
SELECT * FROM weather;
```

Example 2 (unknown):
```unknown
SELECT city, temp_lo, temp_hi, prcp, date FROM weather;
```

Example 3 (unknown):
```unknown
city      | temp_lo | temp_hi | prcp |    date
---------------+---------+---------+------+------------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27
 San Francisco |      43 |      57 |    0 | 1994-11-29
 Hayward       |      37 |      54 |      | 1994-11-29
(3 rows)
```

Example 4 (unknown):
```unknown
SELECT city, (temp_hi+temp_lo)/2 AS temp_avg, date FROM weather;
```
