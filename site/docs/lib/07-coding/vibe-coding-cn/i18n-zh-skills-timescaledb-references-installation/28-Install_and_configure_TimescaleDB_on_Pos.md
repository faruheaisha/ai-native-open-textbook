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
pageSha256: "f17fe0654f7cc1c96b930594b96cb00e5dca0ab82ede5d5df77a9155f2c5f512"
contentMode: "local-full"
zh: ""
---

## Install and configure TimescaleDB on Postgres

This section shows you how to install the latest version of Postgres and
TimescaleDB on a [supported platform](#supported-platforms) using the packages supplied by Tiger Data.

1.  Install Homebrew, if you don't already have it:

For more information about Homebrew, including installation instructions,
    see the [Homebrew documentation][homebrew].
1.  At the command prompt, add the TimescaleDB Homebrew tap:

1.  Install TimescaleDB and psql:

1.  Update your path to include psql.

On Intel chips, the symbolic link is added to `/usr/local/bin`. On Apple
    Silicon, the symbolic link is added to `/opt/homebrew/bin`.

1.  Run the `timescaledb-tune` script to configure your database:

1.  Change to the directory where the setup script is located. It is typically,
   located at `/opt/homebrew/Cellar/timescaledb/<VERSION>/bin/`, where
   `<VERSION>` is the version of `timescaledb` that you installed:

1.  Run the setup script to complete installation.

1.  **Log in to Postgres as `postgres`**

You are in the psql shell.

1. **Set the password for `postgres`**

When you have set the password, type `\q` to exit psql.

1.  Install MacPorts by downloading and running the package installer.

For more information about MacPorts, including installation instructions,
    see the [MacPorts documentation][macports].
1.  Install TimescaleDB and psql:

To view the files installed, run:

MacPorts does not install the `timescaledb-tools` package or run the `timescaledb-tune`
    script. For more information about tuning your database, see the [TimescaleDB tuning tool][timescale-tuner].

1.  **Log in to Postgres as `postgres`**

You are in the psql shell.

1. **Set the password for `postgres`**

When you have set the password, type `\q` to exit psql.
