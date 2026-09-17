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
pageSha256: "c7722499dcbf93376da77f9ccf38a0df6a62c3c802fbcc9e98d136a044cbcd0d"
contentMode: "local-full"
zh: ""
---

## Install and configure TimescaleDB on Postgres

This section shows you how to install the latest version of Postgres and
TimescaleDB on a [supported platform][supported-platforms] using the packages supplied by Tiger Data.

If you have previously installed Postgres without a package manager, you may encounter errors
following these install instructions. Best practice is to full remove any existing Postgres
installations before you begin.

To keep your current Postgres installation, [Install from source][install-from-source].

1. **Install the latest version of Postgres and psql**

1. Download [Postgres][pg-download], then run the installer.

1. In the `Select Components` dialog, check `Command Line Tools`, along with any other components
           you want to install, and click `Next`.

1. Complete the installation wizard.

1. Check that you can run `pg_config`.
        If you cannot run `pg_config` from the command line, in the Windows
        Search tool, enter `system environment variables`.
        The path should be `C:\Program Files\PostgreSQL\<version>\bin`.

1.  **Install TimescaleDB**

1.  Unzip the [TimescaleDB installer][supported-platforms] to `<install_dir>`, that is, your selected directory.

Best practice is to use the latest version.

1. In `<install_dir>\timescaledb`, right-click `setup.exe`, then choose `Run as Administrator`.

1. Complete the installation wizard.

If you see an error like `could not load library "C:/Program Files/PostgreSQL/17/lib/timescaledb-2.17.2.dll": The specified module could not be found.`, use
        [Dependencies][dependencies] to ensure that your system can find the compatible DLLs for this release of TimescaleDB.

1.  **Tune your Postgres instance for TimescaleDB**

Run the `timescaledb-tune` script included in the `timescaledb-tools` package with TimescaleDB. For more
            information, see [configuration][config].

1.  **Log in to Postgres as `postgres`**

You are in the psql shell.

1. **Set the password for `postgres`**

When you have set the password, type `\q` to exit psql.
