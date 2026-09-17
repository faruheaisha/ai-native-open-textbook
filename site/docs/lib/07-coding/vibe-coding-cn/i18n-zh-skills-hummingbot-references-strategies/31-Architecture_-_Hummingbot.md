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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/strategies.md"
sourceRel: "i18n/zh/skills/hummingbot/references/strategies.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/strategies.md"
sourceSha256: "a9ba87eb4e73a53320c54672ff37d6a98bbd94e8e45e53c860c73e4e1c853574"
pageSha256: "318911097d8d899525dccf206cf6180a64843e2a8dbce0b4c2e005f0eccb8235"
contentMode: "local-full"
zh: ""
---

## Architecture - Hummingbot

**URL:** https://hummingbot.org/v2-strategies

**Contents:**
- Architecture
- Components¶
- Inheritance¶
- Strategy Guides¶

The most important components to understand are:

One important information before we delve into the details of each strategy type and when to use which is to understand that they are all built on top of each other.

If we have a quick look together at the inheritance hierarchy this becomes obvious:

Please make sure to keep the inheritance structure in mind as this helps you a lot in learning how to code your own custom strategies.

Check out Walkthrough - Script and Walkthrough - Controller to learn how to create strategies.
