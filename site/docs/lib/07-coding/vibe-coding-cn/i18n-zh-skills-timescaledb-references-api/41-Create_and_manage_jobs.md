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
pageSha256: "21baf9b6e35d308551cc1363115eb7cf7ef1dcc369f61106c4e3b5ecd2f60c18"
contentMode: "local-full"
zh: ""
---

## Create and manage jobs

**URL:** llms-txt#create-and-manage-jobs

**Contents:**
- Prerequisites
- Create a job
- Test and debug a job
- Alter and delete a job

Jobs in TimescaleDB are custom functions or procedures that run on a schedule that you define. This page explains how to create, test, alter, and delete a job.

To follow the procedure on this page you need to:

* Create a [target Tiger Cloud service][create-service].

This procedure also works for [self-hosted TimescaleDB][enable-timescaledb].

To create a job, create a [function][postgres-createfunction] or [procedure][postgres-createprocedure] that you want your database to execute, then set it up to run on a schedule.

1. **Define a function or procedure in the language of your choice**

Wrap it in a `CREATE` statement:

For example, to create a function that reindexes a table within your database:

`job_id` and `config` are required arguments in the function signature. This returns `CREATE FUNCTION` to indicate that the function has successfully been created.

1. **Call the function to validate**

The result looks like this:

1. **Register your job with [`add_job`][api-add_job]**

Pass the name of your job, the schedule you want it to run on, and the content of your config. For the `config` value, if you don't need any special configuration parameters, set to `NULL`. For example, to run the `reindex_mytable` function every hour:

The call returns a `job_id` and stores it along with `config` in the TimescaleDB catalog.

The job runs on the schedule you set. You can also run it manually with [`run_job`][api-run_job] passing `job_id`. When the job runs, `job_id` and `config` are passed as arguments.

1. **Validate the job**

List all currently registered jobs with [`timescaledb_information.jobs`][api-timescaledb_information-jobs]:

The result looks like this:
