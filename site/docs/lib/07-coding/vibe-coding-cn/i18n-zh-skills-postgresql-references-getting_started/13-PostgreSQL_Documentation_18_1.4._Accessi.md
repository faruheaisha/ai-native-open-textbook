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
pageSha256: "613bf0df53a341eb9e435737b0ae8a23191f852ec2586bcb0073581058672634"
contentMode: "local-full"
zh: ""
---

## PostgreSQL: Documentation: 18: 1.4. Accessing a Database

**URL:** https://www.postgresql.org/docs/current/tutorial-accessdb.html

**Contents:**
- 1.4. Accessing a Database #

Once you have created a database, you can access it by:

Running the PostgreSQL interactive terminal program, called psql, which allows you to interactively enter, edit, and execute SQL commands.

Using an existing graphical frontend tool like pgAdmin or an office suite with ODBC or JDBC support to create and manipulate a database. These possibilities are not covered in this tutorial.

Writing a custom application, using one of the several available language bindings. These possibilities are discussed further in Part IV.

You probably want to start up psql to try the examples in this tutorial. It can be activated for the mydb database by typing the command:

If you do not supply the database name then it will default to your user account name. You already discovered this scheme in the previous section using createdb.

In psql, you will be greeted with the following message:

The last line could also be:

That would mean you are a database superuser, which is most likely the case if you installed the PostgreSQL instance yourself. Being a superuser means that you are not subject to access controls. For the purposes of this tutorial that is not important.

If you encounter problems starting psql then go back to the previous section. The diagnostics of createdb and psql are similar, and if the former worked the latter should work as well.

The last line printed out by psql is the prompt, and it indicates that psql is listening to you and that you can type SQL queries into a work space maintained by psql. Try out these commands:

The psql program has a number of internal commands that are not SQL commands. They begin with the backslash character, “\”. For example, you can get help on the syntax of various PostgreSQL SQL commands by typing:

To get out of psql, type:

and psql will quit and return you to your command shell. (For more internal commands, type \? at the psql prompt.) The full capabilities of psql are documented in psql. In this tutorial we will not use these features explicitly, but you can use them yourself when it is helpful.

**Examples:**

Example 1 (unknown):
```unknown
$ psql mydb
```

Example 2 (javascript):
```javascript
psql (18.0)
Type "help" for help.

mydb=>
```

Example 3 (javascript):
```javascript
mydb=> SELECT version();
                                         version
-------------------------------------------------------------------​-----------------------
 PostgreSQL 18.0 on x86_64-pc-linux-gnu, compiled by gcc (Debian 4.9.2-10) 4.9.2, 64-bit
(1 row)

mydb=> SELECT current_date;
    date
------------
 2016-01-07
(1 row)

mydb=> SELECT 2 + 2;
 ?column?
----------
        4
(1 row)
```
