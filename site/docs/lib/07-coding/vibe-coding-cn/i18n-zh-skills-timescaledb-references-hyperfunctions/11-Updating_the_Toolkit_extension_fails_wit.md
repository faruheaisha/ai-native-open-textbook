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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hyperfunctions.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceSha256: "05b6221af2cc12adc9bdb276b06af82863fd7bcdfe4a673a0ed0f7f1a69d2184"
pageSha256: "0e8f54bf0134029136ab272fe7293aa7da5104a126b42673ab07be5cfa9db907"
contentMode: "local-full"
zh: ""
---

## Updating the Toolkit extension fails with an error saying `no update path`

In some cases, when you create the extension, or use the `ALTER EXTENSION timescaledb_toolkit UPDATE` command to
update the Toolkit extension, it might fail with an error like this:

This occurs if the list of available extensions does not include the version you
are trying to upgrade to, and it can occur if the package was not installed
correctly in the first place. To correct the problem, install the upgrade
package, restart Postgres, verify the version, and then attempt the update
again.

#### Troubleshooting Toolkit setup

1.  If you're installing Toolkit from a package, check your package manager's
    local repository list. Make sure the TimescaleDB repository is available and
    contains Toolkit. For instructions on adding the TimescaleDB repository, see
    the installation guides:
    *   [Debian/Ubuntu installation guide][deb-install]
    *   [RHEL/CentOS installation guide][rhel-install]
1.  Update your local repository list with `apt update` or `yum update`.
1.  Restart your Postgres service.
1.  Check that the right version of Toolkit is among your available extensions:

The result should look like this:

1.  Retry `CREATE EXTENSION` or `ALTER EXTENSION`.

===== PAGE: https://docs.tigerdata.com/use-timescale/hyperfunctions/time-weighted-average/ =====

**Examples:**

Example 1 (sql):
```sql
ERROR:  extension "timescaledb_toolkit" has no update path from version "1.2" to version "1.3"
```

Example 2 (sql):
```sql
SELECT * FROM pg_available_extensions
      WHERE name = 'timescaledb_toolkit';
```

Example 3 (unknown):
```unknown
-[ RECORD 1 ]-----+--------------------------------------------------------------------------------------
    name              | timescaledb_toolkit
    default_version   | 1.6.0
    installed_version | 1.6.0
    comment           | Library of analytical hyperfunctions, time-series pipelining, and other SQL utilities
```
