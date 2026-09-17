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
pageSha256: "7eccba53b4a2ced7c1e43633e27a9774ac77b96bf5bad53fa3e3439740722554"
contentMode: "local-full"
zh: ""
---

## Clock Tick Size - Hummingbot

**URL:** https://hummingbot.org/global-configs/clock-tick/

**Contents:**
- Clock tick size¶
- How it works¶
- How to configure Tick Size¶
- More Resources¶

Starting with version 1.8.0, the tick_size is now added as a variable in the ClientConfigMap, this means that you will be able to change the value of the tick size in the conf_client.yml file or by running config tick_size from within Hummingbot.

All the major components of Hummingbot, like the connectors and the strategies inherit from the TimeIterator class. The Clock notifies all the components involved in the strategy by calling the method c_tick() of the time iterators every tick_size.

By default, the tick_size (or how long it takes Hummingbot to loop through a strategy iteration) is currently set to 1 second.

There are two ways to configure the tick size

Due to connector limitations, the tick size cannot be set lower than 0.1 seconds

To check what the current tick_size is, you can run the config command and check the tick_size value under the Global Configurations section

Here's a short video where Foundation developer Federico shows how the tick_size works: https://www.loom.com/share/138d49d3ceb34da9943f114d848dbe77
