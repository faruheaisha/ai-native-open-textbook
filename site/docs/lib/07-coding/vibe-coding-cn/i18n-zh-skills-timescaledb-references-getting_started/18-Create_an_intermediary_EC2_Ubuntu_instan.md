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
pageSha256: "ffad1a4b2bbac536677fcafa177bb27cb3834c8f6a44a5e2f5724b7ba6875cf6"
contentMode: "local-full"
zh: ""
---

## Create an intermediary EC2 Ubuntu instance
1. In [https://console.aws.amazon.com/rds/home#databases:][databases],
   select the RDS/Aurora Postgres instance to migrate.
1. Click `Actions` > `Set up EC2 connection`.
   Press `Create EC2 instance` and use the following settings:
    - **AMI**: Ubuntu Server.
    - **Key pair**: use an existing pair or create a new one that you will use to access the intermediary machine.
    - **VPC**: by default, this is the same as the database instance.
    - **Configure Storage**: adjust the volume to at least the size of RDS/Aurora Postgres instance you are migrating from.
    You can reduce the space used by your data on Tiger Cloud using [Hypercore][hypercore].
1. Click `Lauch instance`. AWS creates your EC2 instance, then click `Connect to instance` > `SSH client`.
   Follow the instructions to create the connection to your intermediary EC2 instance.
