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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceRel: "i18n/zh/skills/timescaledb/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceSha256: "d89ee1583c1ea9641e14a8f176f27150301b48061cbde17049ed1e459820f0d5"
pageSha256: "80a7a8fb26e604a3a3a0c03e4b4c47a036ca7171adfbc4102cb43832a05aa383"
contentMode: "local-full"
zh: ""
---

## Test the connection between your RDS and EC2 instances
1. In [https://console.aws.amazon.com/rds/home#databases:](https://console.aws.amazon.com/rds/home#databases:),
    select the RDS instance to migrate.
1. On your intermediary EC2 instance, use the values of `Endpoint`, `Port`, `Master username`, and `DB name`
   to create the postgres connectivity string to the `SOURCE` variable.

<img class="main-content__illustration"
   src="https://assets.timescale.com/docs/images/migrate/migrate-source-rds-instance.svg"
   alt="Record endpoint, port, VPC details"/>

The value of `Master password` was supplied when this Postgres RDS instance was created.

1. Test your connection:
   
   You are connected to your RDS instance from your intermediary EC2 instance.

===== PAGE: https://docs.tigerdata.com/_partials/_migrate_live_setup_connection_strings/ =====

These variables hold the connection information for the source database and target Tiger Cloud service.
In Terminal on your migration machine, set the following:

You find the connection information for your Tiger Cloud service in the configuration file you
downloaded when you created the service.

Avoid using connection strings that route through connection poolers like PgBouncer or similar tools. This tool requires a direct connection to the database to function properly.

===== PAGE: https://docs.tigerdata.com/_partials/_psql-installation-windows/ =====
