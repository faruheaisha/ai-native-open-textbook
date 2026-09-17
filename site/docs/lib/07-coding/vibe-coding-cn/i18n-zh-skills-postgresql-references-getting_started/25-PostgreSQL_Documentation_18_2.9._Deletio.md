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
pageSha256: "daab36da63efe429cf21e9e234bf7f2ff18ecd8cfa70195e9a458c4d6eebc924"
contentMode: "local-full"
zh: ""
---

## PostgreSQL: Documentation: 18: 2.9. Deletions

**URL:** https://www.postgresql.org/docs/current/tutorial-delete.html

**Contents:**
- 2.9. Deletions #

Rows can be removed from a table using the DELETE command. Suppose you are no longer interested in the weather of Hayward. Then you can do the following to delete those rows from the table:

All weather records belonging to Hayward are removed.

One should be wary of statements of the form

Without a qualification, DELETE will remove all rows from the given table, leaving it empty. The system will not request confirmation before doing this!

**Examples:**

Example 1 (unknown):
```unknown
DELETE FROM weather WHERE city = 'Hayward';
```

Example 2 (unknown):
```unknown
SELECT * FROM weather;
```

Example 3 (unknown):
```unknown
city      | temp_lo | temp_hi | prcp |    date
---------------+---------+---------+------+------------
 San Francisco |      46 |      50 | 0.25 | 1994-11-27
 San Francisco |      41 |      55 |    0 | 1994-11-29
(2 rows)
```

Example 4 (unknown):
```unknown
DELETE FROM tablename;
```
