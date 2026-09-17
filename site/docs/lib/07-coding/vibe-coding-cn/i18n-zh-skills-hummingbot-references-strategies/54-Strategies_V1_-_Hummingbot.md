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
pageSha256: "5ee9b21d313e48de01a0a6006389dd7548d1b1a15f8b795336d065e98beb1100"
contentMode: "local-full"
zh: ""
---

## Strategies V1 - Hummingbot

**URL:** https://hummingbot.org/v1-strategies

**Contents:**
- Strategies V1
- What are V1 Strategies?¶
- List of V1 Strategies¶
- Contributing Strategies¶

Since the Foundation is focused on building out the Strategy V2 framework which offers greater customization and extensibility, we are no longer actively maintaining the V1 strategy templates below.

V1 Strategies are templates for an algorithmic trading strategy that users can configure, extend, and run. The trading strategy itself is a continual process that monitors trading pairs on one or more exchanges in order to make trading decisions.

Strategies separate trading logic, open source code that defines how the strategy behaves, versus parameters, user-defined variables like spread and order amount that control how the strategy is deployed against live market conditions. Strategy parameters are stored in a local config file that is not exposed externally.

Strategies utilize the standardized trading interfaces exposed by exchange and protocol connectors, enabling developers to write code that can be used across many exchanges. Each V1 strategy is a sub-folder in the /hummingbot/strategy folder.

Strategies have passed the Minimum Voting Power Threshold in the latest Poll and are included in each monthly release. They are not maintained by Hummingbot Foundation but may be maintained by a community member.

We encourage users to create and extend strategies for their own purposes, and if they so desire, share them with the community.

Developers may submit strategies for review. Please note the Contribution Guidelines. For developers interested to create or customize their own strategies, please see Building V1 Strategies.

---

## 

**URL:** https://hummingbot.org/v2-strategies/diagrams/21.png
