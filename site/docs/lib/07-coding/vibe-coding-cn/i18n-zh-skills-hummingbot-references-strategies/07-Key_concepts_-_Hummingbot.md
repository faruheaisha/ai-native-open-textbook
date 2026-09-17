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
pageSha256: "cb0651fda4e1c3263ae101c41e49976b13403ac64399330ca54827a4e72a0753"
contentMode: "local-full"
zh: ""
---

## Key concepts - Hummingbot

**URL:** https://hummingbot.org/developers/strategies/key-concepts

**Contents:**
- Key concepts
- Strategy folder¶
- StrategyBase class¶
- Market class¶
- Configuration¶
  - Important commands¶
  - Exposing new strategy to Hummingbot client¶
  - Setting question prompts for strategy parameters¶

Each strategy is contained in its own folder, with the strategy name as the folder name:

All strategies extend the StrategyBase class. This class allows extraction of logic that would be repetitively written in all strategies otherwise.

The base class also contains methods that are meant to be freshly implemented when new strategies are created.

To assist in the development of custom strategies, there are many overridable functions that respond to various events detected by EventListeners.

The ExchangeBase class contains overridable functions that can help get basic information about an exchange that a strategy is operating on, which can include the balance, prices, and order books for any particular asset traded on the exchange.

Additionally, this strategy leverages the OrderTracker listener object, in order to check if buy/sell orders have been filled or completed, the user has enough balance to place certain orders, and if there are any order cancellations. The HummingbotLogger object is also used to log the specific events when they occur.

Important commands on Hummingbot client:

The strategy name is made known to the client automatically in hummingbot/client/settings.py under STRATEGIES variable. There should also be a template file that contains config variables and its documentation in the hummingbot/templates directory. The naming convention for this yml file is conf_\{strategy name\}_TEMPLATE.

Strategy parameters can be set in the config_map file. Each parameter (represented as dictionary key) is mapped to a ConfigVar type where developer can specify the name of the parameter, prompts that will be provided to the user, and validator that will check the values entered.

---

## 

**URL:** https://hummingbot.org/v2-strategies/diagrams/16.png
