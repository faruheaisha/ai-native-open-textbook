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
pageSha256: "428aa8530c930fcdff39b358e8dbc2f13122ea2aea1b53a4a67480ed9818cb38"
contentMode: "local-full"
zh: ""
---

## Install and configure TimescaleDB on Postgres

This section shows you how to install the latest version of Postgres and
TimescaleDB on a [supported platform](#supported-platforms) using the packages supplied by Tiger Data.

If you have previously installed Postgres without a package manager, you may encounter errors
following these install instructions. Best practice is to fully remove any existing Postgres
installations before you begin.

To keep your current Postgres installation, [Install from source][install-from-source].

1. **Install the latest Postgres packages**

1.  **Run the Postgres package setup script**

1.  **Add the TimescaleDB package**

1.  **Install the TimescaleDB GPG key**

1.  **Update your local repository list**

1.  **Install TimescaleDB**

To install a specific TimescaleDB [release][releases-page], set the version. For example:

`sudo apt-get install timescaledb-2-postgresql-14='2.6.0*' timescaledb-2-loader-postgresql-14='2.6.0*'`

Older versions of TimescaleDB may not support all the OS versions listed on this page.

1.  **Tune your Postgres instance for TimescaleDB**

By default, this script is included with the `timescaledb-tools` package when you install TimescaleDB. Use the prompts to tune your development or production environment. For more information on manual configuration, see [Configuration][config]. If you have an issue, run `sudo apt install timescaledb-tools`.

1.  **Restart Postgres**

1.  **Log in to Postgres as `postgres`**

You are in the psql shell.

1. **Set the password for `postgres`**

When you have set the password, type `\q` to exit psql.

1. **Install the latest Postgres packages**

1.  **Run the Postgres package setup script**

1.  **Install the TimescaleDB GPG key**

For Ubuntu 21.10 and earlier use the following command:

`wget --quiet -O - https://packagecloud.io/timescale/timescaledb/gpgkey | sudo apt-key add -`

1.  **Update your local repository list**

1.  **Install TimescaleDB**

To install a specific TimescaleDB [release][releases-page], set the version. For example:

`sudo apt-get install timescaledb-2-postgresql-14='2.6.0*' timescaledb-2-loader-postgresql-14='2.6.0*'`

Older versions of TimescaleDB may not support all the OS versions listed on this page.

1.  **Tune your Postgres instance for TimescaleDB**

By default, this script is included with the `timescaledb-tools` package when you install TimescaleDB. Use the prompts to tune your development or production environment. For more information on manual configuration, see [Configuration][config]. If you have an issue, run `sudo apt install timescaledb-tools`.

1.  **Restart Postgres**

1.  **Log in to Postgres as `postgres`**

You are in the psql shell.

1. **Set the password for `postgres`**

When you have set the password, type `\q` to exit psql.

1. **Install the latest Postgres packages**

1.  **Add the TimescaleDB repository**

1.  **Update your local repository list**

1.  **Install TimescaleDB**

To avoid errors, **do not** install TimescaleDB Apache 2 Edition and TimescaleDB Community Edition at the same time.

On Red Hat Enterprise Linux 8 and later, disable the built-in Postgres module:

`sudo dnf -qy module disable postgresql`

1.  **Initialize the Postgres instance**

1.  **Tune your Postgres instance for TimescaleDB**

This script is included with the `timescaledb-tools` package when you install TimescaleDB.
    For more information, see [configuration][config].

1.  **Enable and start Postgres**

1.  **Log in to Postgres as `postgres`**

You are now in the psql shell.

1. **Set the password for `postgres`**

When you have set the password, type `\q` to exit psql.

1. **Install the latest Postgres packages**

1.  **Add the TimescaleDB repository**

1.  **Update your local repository list**

1.  **Install TimescaleDB**

To avoid errors, **do not** install TimescaleDB Apache 2 Edition and TimescaleDB Community Edition at the same time.

On Red Hat Enterprise Linux 8 and later, disable the built-in Postgres module:

`sudo dnf -qy module disable postgresql`

1.  **Initialize the Postgres instance**

1.  **Tune your Postgres instance for TimescaleDB**

This script is included with the `timescaledb-tools` package when you install TimescaleDB.
    For more information, see [configuration][config].

1.  **Enable and start Postgres**

1.  **Log in to Postgres as `postgres`**

You are now in the psql shell.

1. **Set the password for `postgres`**

When you have set the password, type `\q` to exit psql.

Tiger Data supports Rocky Linux 8 and 9 on amd64 only.

1.  **Update your local repository list**

1. **Install the latest Postgres packages**

1.  **Add the TimescaleDB repository**

1.  **Disable the built-in PostgreSQL module**

This is for Rocky Linux 9 only.

1.  **Install TimescaleDB**

To avoid errors, **do not** install TimescaleDB Apache 2 Edition and TimescaleDB Community Edition at the same time.

1.  **Initialize the Postgres instance**

1.  **Tune your Postgres instance for TimescaleDB**

This script is included with the `timescaledb-tools` package when you install TimescaleDB.
    For more information, see [configuration][config].

1.  **Enable and start Postgres**

1.  **Log in to Postgres as `postgres`**

You are now in the psql shell.

1. **Set the password for `postgres`**

When you have set the password, type `\q` to exit psql.

ArchLinux packages are built by the community.

1.  **Install the latest Postgres and TimescaleDB packages**

1.  **Initalize your Postgres instance**

1.  **Tune your Postgres instance for TimescaleDB**

This script is included with the `timescaledb-tools` package when you install TimescaleDB. For more information, see [configuration][config].

1.  **Enable and start Postgres**

1.  **Log in to Postgres as `postgres`**

You are in the psql shell.

1. **Set the password for `postgres`**

When you have set the password, type `\q` to exit psql.

Job jobbed, you have installed Postgres and TimescaleDB.
