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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/getting_started.md"
sourceRel: "i18n/zh/skills/hummingbot/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/getting_started.md"
sourceSha256: "aee68b742e5dcbc964624d10833db685d054e63a53b7e60a19dcbb50ba658356"
pageSha256: "fe537b2c81aebffc36c76af764dac0341246aa35fa8b920aa2071b9aa4e5f0a4"
contentMode: "local-full"
zh: ""
---

## Installation Methods Comparison - Hummingbot

**URL:** https://hummingbot.org/installation/install-overview/

**Contents:**
- Installation Methods Comparison¶
- Core Options¶
- When to Choose Which?¶
- FAQ¶

Dashboard + Hummingbot Choose if:

Limitations: - Less low-level control - Requires more system resources

Docker Standalone Choose if:

Limitations: - Can't modify core code - Manual certificate management

Source Installation Choose if:

Limitations: - Complex setup - Dependency conflicts possible

Can I run multiple methods together? Yes - Dashboard can manage Docker instances while you run separate source installations.

Which is most resource-efficient? Docker standalone (no GUI overhead), followed by Source.

How to switch versions? - Dashboard: Automatic through UI - Docker: Edit image: tag - Source: git checkout tags
