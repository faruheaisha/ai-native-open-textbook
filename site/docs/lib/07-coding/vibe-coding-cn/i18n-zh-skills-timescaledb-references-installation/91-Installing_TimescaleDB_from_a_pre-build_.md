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
pageSha256: "da9bebc1d4becff6528ab8b1521380829bc2461b82fe6d0f38be5c39d2c5af9c"
contentMode: "local-full"
zh: ""
---

## Installing TimescaleDB from a pre-build cloud image

1.  Make sure you have an [Amazon Web Services account][aws-signup], and are
    signed in to [your EC2 dashboard][aws-dashboard].
1.  Navigate to `Images → AMIs`.
1.  In the search bar, change the search to `Public images` and type _Timescale_
    search term to find all available TimescaleDB images.
1.  Select the image you want to use, and click `Launch instance from image`.
    &lt;img class="main-content__illustration"
    width=\{1375\} height=\{944\}
    src="https://assets.timescale.com/docs/images/aws_launch_ami.webp"
    alt="Launch an AMI in AWS EC2"/>

After you have completed the installation, connect to your instance and
configure your database. For information about connecting to the instance, see
the AWS [accessing instance documentation][aws-connect]. The easiest way to
configure your database is to run the `timescaledb-tune` script, which is included
with the `timescaledb-tools` package. For more information, see the
[configuration][config] section.

After running the `timescaledb-tune` script, you need to restart the Postgres
service for the configuration changes to take effect. To restart the service,
run `sudo systemctl restart postgresql.service`.
