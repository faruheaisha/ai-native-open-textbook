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
pageSha256: "7cab4d670756b9c7327e14148ce7e535fcb017e6fd9ddc993cdd204f86fed6e5"
contentMode: "local-full"
zh: ""
---

## Setup secure connectivity between your RDS and EC2 instances
1. In [https://console.aws.amazon.com/rds/home#databases:](https://console.aws.amazon.com/rds/home#databases:),
    select the RDS instance to migrate.
1. Scroll down to `Security group rules (1)` and select the `EC2 Security Group - Inbound` group. The
   `Security Groups (1)` window opens. Click the `Security group ID`, then click `Edit inbound rules`

<img class="main-content__illustration"
   src="https://assets.timescale.com/docs/images/migrate/rds-add-security-rule-to-ec2-instance.svg"
   alt="Create security group rule to enable RDS EC2 connection"/>

1. On your intermediary EC2 instance, get your local IP address:
   
   Bear with me on this one, you need this IP address to enable access to your RDS instance,
1. In `Edit inbound rules`, click `Add rule`, then create a `PostgreSQL`, `TCP` rule granting access
   to the local IP address for your EC2 instance (told you :-)). Then click `Save rules`.

<img class="main-content__illustration"
   src="https://assets.timescale.com/docs/images/migrate/rds-add-inbound-rule-for-ec2-instance.png"
   alt="Create security rule to enable RDS EC2 connection"/>
