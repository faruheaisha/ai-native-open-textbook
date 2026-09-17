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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/other.md"
sourceRel: "i18n/zh/skills/timescaledb/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/other.md"
sourceSha256: "b53764abbdaf16beaf22420ad0a62ac75d41058fb99968403f1bbd067870709e"
pageSha256: "a30608113f571c9fbebcfcc110f7fa6d6f572aee0b2839f9d906cb3fbc4637d5"
contentMode: "local-full"
zh: ""
---

#### What if my service is within a vpc?

If your Tiger Cloud service runs inside a VPC, do one of the following to enable access for the PopSQL desktop app:

- Use PopSQL's [bridge connector][bridge-connector].
- Use an SSH tunnel: when you configure the connection in PopSQL, under `Advanced Options` enable `Connect over SSH`.
- Add PopSQL's static IPs (`23.20.131.72, 54.211.234.135`) to your allowlist.
