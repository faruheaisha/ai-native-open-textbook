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
pageSha256: "4b1d6281bec1e62b6fb2194652c94fdc5d309330b4b0d23368747fb3a22b49ba"
contentMode: "local-full"
zh: ""
---

## Can't access file "timescaledb" after installation

**URL:** llms-txt#can't-access-file-"timescaledb"-after-installation

If your Postgres logs have this error preventing it from starting up,
you should double check that the TimescaleDB files have been installed
to the correct location. Our installation methods use `pg_config` to
get Postgres's location. However if you have multiple versions of
Postgres installed on the same machine, the location `pg_config`
points to may not be for the version you expect. To check which
version TimescaleDB used:

If that is the correct version, double check that the installation path is
the one you'd expect. For example, for Postgres 11.0 installed via
Homebrew on macOS it should be `/usr/local/Cellar/postgresql/11.0/bin`:

If either of those steps is not the version you are expecting, you need
to either (a) uninstall the incorrect version of Postgres if you can or
(b) update your `PATH` environmental variable to have the correct
path of `pg_config` listed first, that is, by prepending the full path:

Then, reinstall TimescaleDB and it should find the correct installation
path.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/self-hosted/update-error-third-party-tool/ =====

**Examples:**

Example 1 (bash):
```bash
$ pg_config --version
PostgreSQL 12.3
```

Example 2 (bash):
```bash
$ pg_config --bindir
/usr/local/Cellar/postgresql/11.0/bin
```

Example 3 (bash):
```bash
export PATH = /usr/local/Cellar/postgresql/11.0/bin:$PATH
```
