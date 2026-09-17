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
pageSha256: "7f19923d0407b803f14901b76ec26261427b19ba6fcf4df54370bc58942cfbf4"
contentMode: "local-full"
zh: ""
---

## Install and configure TimescaleDB on Postgres

This section shows you how to install the latest version of Postgres and
TimescaleDB on a supported platform using source supplied by Tiger Data.

1. **Install the latest Postgres source**

1.  At the command prompt, clone the TimescaleDB GitHub repository:

1.  Change into the cloned directory:

1.  Checkout the latest release. You can find the latest release tag on
        our [Releases page][gh-releases]:

This command produces an error that you are now in `detached head` state. It
        is expected behavior, and it occurs because you have checked out a tag, and
        not a branch. Continue with the steps in this procedure as normal.

1.  **Build the source**

1.  Bootstrap the build system:

For installation on Microsoft Windows, you might need to add the `pg_config`
        and `cmake` file locations to your path. In the Windows Search tool, search
        for `system environment variables`. The path for `pg_config` should be
        `C:\Program Files\PostgreSQL\<version>\bin`. The path for `cmake` is within
        the Visual Studio directory.

1.  Build the extension:

1.  **Install TimescaleDB**

1. **Configure Postgres**

If you have more than one version of Postgres installed, TimescaleDB can only
    be associated with one of them. The TimescaleDB build scripts use `pg_config` to
    find out where Postgres stores its extension files, so you can use `pg_config`
    to find out which Postgres installation TimescaleDB is using.

1.  Locate the `postgresql.conf` configuration file:

1.  Open the `postgresql.conf` file and update `shared_preload_libraries` to:

If you use other preloaded libraries, make sure they are comma separated.

1.  Tune your Postgres instance for TimescaleDB

This script is included with the `timescaledb-tools` package when you install TimescaleDB.
        For more information, see [configuration][config].

1.  Restart the Postgres instance:

1. **Set the user password**

1.  Log in to Postgres as `postgres`

You are in the psql shell.

1. Set the password for `postgres`

When you have set the password, type `\q` to exit psql.
