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
pageSha256: "190d3a9e412cde945816c5b13b81934231391f180709114caa3a81672279c741"
contentMode: "local-full"
zh: ""
---

## PostgreSQL: Documentation: 18: 2.1. Introduction

**URL:** https://www.postgresql.org/docs/current/tutorial-sql-intro.html

**Contents:**
- 2.1. Introduction #

This chapter provides an overview of how to use SQL to perform simple operations. This tutorial is only intended to give you an introduction and is in no way a complete tutorial on SQL. Numerous books have been written on SQL, including [melt93] and [date97]. You should be aware that some PostgreSQL language features are extensions to the standard.

In the examples that follow, we assume that you have created a database named mydb, as described in the previous chapter, and have been able to start psql.

Examples in this manual can also be found in the PostgreSQL source distribution in the directory src/tutorial/. (Binary distributions of PostgreSQL might not provide those files.) To use those files, first change to that directory and run make:

This creates the scripts and compiles the C files containing user-defined functions and types. Then, to start the tutorial, do the following:

The \i command reads in commands from the specified file. psql's -s option puts you in single step mode which pauses before sending each statement to the server. The commands used in this section are in the file basics.sql.

**Examples:**

Example 1 (unknown):
```unknown
$ cd .../src/tutorial
$ make
```

Example 2 (javascript):
```javascript
$ psql -s mydb

...

mydb=> \i basics.sql
```
