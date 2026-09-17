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
pageSha256: "00ae6e39c2d864d49e724dd6c5755916cc5cfb96cd04568819e4a3b2445ab3c3"
contentMode: "local-full"
zh: ""
---

## Configure the primary database

To configure the primary database, you need a Postgres user with a role that
allows it to initialize streaming replication. This is the user each replica
uses to stream from the primary database.

### Configuring the primary database

1.  On the primary database, as a user with superuser privileges, such as the
    `postgres` user, set the password encryption level to `scram-sha-256`:

1.  Create a new user called `repuser`:

The [scram-sha-256](https://www.postgresql.org/docs/current/sasl-authentication.html#SASL-SCRAM-SHA-256) encryption level is the most secure
password-based authentication available in Postgres. It is only available in Postgres 10 and later.
