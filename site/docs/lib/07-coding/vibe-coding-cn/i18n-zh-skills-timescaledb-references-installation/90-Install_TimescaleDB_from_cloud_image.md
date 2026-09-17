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
pageSha256: "f4204c67389a28e021a1d082baa0871311c75efde6b4633ded9cc5f6e26b16de"
contentMode: "local-full"
zh: ""
---

## Install TimescaleDB from cloud image

**URL:** llms-txt#install-timescaledb-from-cloud-image

**Contents:**
- Installing TimescaleDB from a pre-build cloud image
- Set up the TimescaleDB extension
- Where to next

You can install TimescaleDB on a cloud hosting provider,
from a pre-built, publicly available machine image. These instructions show you
how to use a pre-built Amazon machine image (AMI), on Amazon Web Services (AWS).

The currently available pre-built cloud image is:

*   Ubuntu 20.04 Amazon EBS-backed AMI

The TimescaleDB AMI uses Elastic Block Store (EBS) attached volumes. This allows
you to store image snapshots, dynamic IOPS configuration, and provides some
protection of your data if the EC2 instance goes down. Choose an EC2 instance
type that is optimized for EBS attached volumes. For information on choosing the
right EBS optimized EC2 instance type, see the AWS
[instance configuration documentation][aws-instance-config].

This section shows how to use the AMI from within the AWS EC2 dashboard.
However, you can also use the AMI to build an instance using tools like
Cloudformation, Terraform, the AWS CLI, or any other AWS deployment tool that
supports public AMIs.
