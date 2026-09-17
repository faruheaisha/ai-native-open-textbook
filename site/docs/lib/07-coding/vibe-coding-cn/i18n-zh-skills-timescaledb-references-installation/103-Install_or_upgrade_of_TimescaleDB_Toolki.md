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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/installation.md"
sourceRel: "i18n/zh/skills/timescaledb/references/installation.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/installation.md"
sourceSha256: "4a7b57ccaa9a9f7e4c22cc7a4a1dcd5ddf03b101b4f1914bcb18219176632044"
pageSha256: "5ac51a166371e64796f29b647cd5e520141ff1c74de95b3da61d6d4c4f6ac4c4"
contentMode: "local-full"
zh: ""
---

## Install or upgrade of TimescaleDB Toolkit fails

**URL:** llms-txt#install-or-upgrade-of-timescaledb-toolkit-fails

**Contents:**
  - Troubleshooting TimescaleDB Toolkit setup

In some cases, when you create the TimescaleDB Toolkit extension, or upgrade it
with the `ALTER EXTENSION timescaledb_toolkit UPDATE` command, it might fail
with the above error.

This occurs if the list of available extensions does not include the version you
are trying to upgrade to, and it can occur if the package was not installed
correctly in the first place. To correct the problem, install the upgrade
package, restart Postgres, verify the version, and then attempt the update
again.

### Troubleshooting TimescaleDB Toolkit setup

1.  If you're installing Toolkit from a package, check your package manager's
    local repository list. Make sure the TimescaleDB repository is available and
    contains Toolkit. For instructions on adding the TimescaleDB repository, see
    the installation guides:
    *   [Linux installation guide][linux-install]
1.  Update your local repository list with `apt update` or `yum update`.
1.  Restart your Postgres service.
1.  Check that the right version of Toolkit is among your available extensions:

The result should look like this:

1.  Retry `CREATE EXTENSION` or `ALTER EXTENSION`.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/pg_dump-permission-denied/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT * FROM pg_available_extensions
      WHERE name = 'timescaledb_toolkit';
```

Example 2 (bash):
```bash
-[ RECORD 1 ]-----+--------------------------------------------------------------------------------------
    name              | timescaledb_toolkit
    default_version   | 1.6.0
    installed_version | 1.6.0
    comment           | Library of analytical hyperfunctions, time-series pipelining, and other SQL utilities
```
