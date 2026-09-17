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
pageSha256: "79ab880d4b9b8bd5cc3ee731e0b3c963ee8a2645a34441a98245efc9a4c374be"
contentMode: "local-full"
zh: ""
---

## PostgreSQL: Documentation: 18: 2.4. Populating a Table With Rows

**URL:** https://www.postgresql.org/docs/current/tutorial-populate.html

**Contents:**
- 2.4. Populating a Table With Rows #

The INSERT statement is used to populate a table with rows:

Note that all data types use rather obvious input formats. Constants that are not simple numeric values usually must be surrounded by single quotes ('), as in the example. The date type is actually quite flexible in what it accepts, but for this tutorial we will stick to the unambiguous format shown here.

The point type requires a coordinate pair as input, as shown here:

The syntax used so far requires you to remember the order of the columns. An alternative syntax allows you to list the columns explicitly:

You can list the columns in a different order if you wish or even omit some columns, e.g., if the precipitation is unknown:

Many developers consider explicitly listing the columns better style than relying on the order implicitly.

Please enter all the commands shown above so you have some data to work with in the following sections.

You could also have used COPY to load large amounts of data from flat-text files. This is usually faster because the COPY command is optimized for this application while allowing less flexibility than INSERT. An example would be:

where the file name for the source file must be available on the machine running the backend process, not the client, since the backend process reads the file directly. The data inserted above into the weather table could also be inserted from a file containing (values are separated by a tab character):

You can read more about the COPY command in COPY.

**Examples:**

Example 1 (unknown):
```unknown
INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');
```

Example 2 (unknown):
```unknown
INSERT INTO cities VALUES ('San Francisco', '(-194.0, 53.0)');
```

Example 3 (unknown):
```unknown
INSERT INTO weather (city, temp_lo, temp_hi, prcp, date)
    VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');
```

Example 4 (unknown):
```unknown
INSERT INTO weather (date, city, temp_hi, temp_lo)
    VALUES ('1994-11-29', 'Hayward', 54, 37);
```
