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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/other.md"
sourceRel: "i18n/zh/skills/hummingbot/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/other.md"
sourceSha256: "7bd57673fc3df5b901db36ae3eac6be136526e8e2dbb141702c9a6ebc26b607a"
pageSha256: "70893cf505744246df30feadd4167cdd0cb37f59a0a11ef8f3d9ef960c6b2f1e"
contentMode: "local-full"
zh: ""
---

## Reporting - Hummingbot

**URL:** https://hummingbot.org/reporting/

**Contents:**
- Reporting
- Reported Volumes Dashboard¶
- What the Reported Volumes Dashboard Shows¶
  - Exchange Connector Usage¶
  - Version Insights¶
  - Interactive Filters¶
- Data Transparency¶
  - What Data Is Collected¶
  - Privacy Protection¶
  - Data Usage Policy¶

Hummingbot Foundation maintains a public, real-time dashboard that provides transparent insights into Hummingbot usage across all exchanges. This data is essential for exchanges to track their integration success and understand community adoption.

View Live Dashboard →

The Reported Volumes dashboard provides comprehensive, real-time metrics including:

You can customize the view using several controls:

Hummingbot instances automatically report the following anonymized metrics every 15 minutes:

Users who prefer not to participate in data reporting can disable it:

Set to anonymized_metrics_disabled to opt out of all data collection.

The entire data collection process is open source and auditable:

The Reported Volumes dashboard represents Hummingbot's commitment to transparency and community-driven development. By providing open access to usage metrics, we enable data-driven decisions that benefit the entire ecosystem.

**Examples:**

Example 1 (unknown):
```unknown
config anonymized_metrics_mode
```
