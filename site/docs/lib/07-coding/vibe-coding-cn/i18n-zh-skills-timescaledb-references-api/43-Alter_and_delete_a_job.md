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
pageSha256: "bc5456593eb5f954cc87245c468e0be31e7240b88b1c492cb3107d4177016019"
contentMode: "local-full"
zh: ""
---

## Alter and delete a job

Alter an existing job with [`alter_job`][api-alter_job]. You can change both the config and the schedule on which the job runs.

1. **Change a job's config**

To replace the entire JSON config for a job, call `alter_job` with a new `config` object. For example, replace the JSON config for a job with ID `1000`:

1. **Turn off job scheduling**

To turn off automatic scheduling of a job, call `alter_job` and set `scheduled`to `false`. You can still run the job manually with `run_job`. For example, turn off the scheduling for a job with ID `1000`:

1. **Re-enable automatic scheduling of a job**

To re-enable automatic scheduling of a job, call `alter_job` and set `scheduled` to `true`. For example, re-enable scheduling for a job with ID `1000`:

1. **Delete a job with [`delete_job`][api-delete_job]**

For example, to delete a job with ID `1000`:

===== PAGE: https://docs.tigerdata.com/use-timescale/hyperfunctions/function-pipelines/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE FUNCTION <function_name> (job_id INT DEFAULT NULL, config JSONB DEFAULT NULL)
    RETURNS VOID
	DECLARE
		<declaration>;
	BEGIN
		<function_body>;
	END;
	$<variable_name>$ LANGUAGE <language>;
```

Example 2 (sql):
```sql
CREATE FUNCTION reindex_mytable(job_id INT DEFAULT NULL, config JSONB DEFAULT NULL)
    RETURNS VOID
    AS $$
    BEGIN
       REINDEX TABLE mytable;
    END;
    $$ LANGUAGE plpgsql;
```

Example 3 (sql):
```sql
select reindex_mytable();
```

Example 4 (sql):
```sql
reindex_mytable
    -----------------

    (1 row)
```
