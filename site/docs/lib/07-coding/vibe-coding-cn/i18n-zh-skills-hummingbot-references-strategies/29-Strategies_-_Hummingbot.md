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
pageSha256: "e5acbcc550015d503151c16e80d277938ce8406113f427ee623703c53eae2812"
contentMode: "local-full"
zh: ""
---

## Strategies - Hummingbot

**URL:** https://hummingbot.org/strategies

**Contents:**
- Strategies
- What is a Hummingbot Strategy?¶
- Strategies V2¶
- Strategies V1¶
- Learn Algo Trading and Market Making¶

Like a computer program, an algorithmic trading strategy is a set of automated processes that executes repeatedly:

A Hummingbot strategy loads market data directly from centralized and decentralized exchanges, adaptable to the unique features of each trading venue's WebSocket/REST APIs and nodes.

Each clock tick, a strategy loads real-time order book snapshots, user balances, order status and other real-time data from trading pairs on these venues and executes the logic defined in the strategy, parametrized by a pre-defined user configuration.

To run a strategy, a user selects a strategy template, defines its input parameters in a Config File, and starts it with the start command in the Hummingbot client or via the command line with Strategy Autostart.

Starting in 2023, Hummingbot Foundation began to iteratively introduce a new framework, called Strategy V2. The new framework allows you to build powerful, dynamic strategies using Lego-like components. To learn more, check out Architecture.

There are two current ways that Hummingbot strategies can be defined:

Scripts: A simple Python file that contains all strategy logic. We recommend starting with a script if you want a simple way to prototype your strategy.

Controllers: Strategy logic is abstracted into a Controller, which may use Executors and other components for greater modularization. Controllers can be backtested and deployed using Dashboard, and a single loader Script may deploy and manage multiple Controller configurations.

Controllers are designed to add another layer of abstraction and circumvent the limit of Hummingbot to only run one strategy per bot instance. You can think of that as the most powerful and advanced setup that Hummingbot currently provides.

This table may help you decide whether to use a Script or Controller for your strategy:

When it launched in 2019, Hummingbot pioneered the concept of configurable templates for algo trading strategies, such as market making strategies based on the Avellaneda & Stoikov paper.

Initially, these strategies were confined to individual bots, complicating the management and scaling across various scenarios, and they lacked the capability to use historical market data, which forced traders to rely solely on real-time data. Furthermore, technical barriers, such as a deep prerequisite knowledge of foundational classes and Cython, hindered easy access to market data, while limited backtesting tools restricted evaluations against historical data.

Users can access these strategy templates at the Strategies V1 page.

To gain a deeper understanding of Hummingbot strategies along with access to the latest Hummingbot framework updates, check out Botcamp, the official training and certification for Hummingbot.

Operated by the people behind Hummingbot Foundation, Botcamp offers bootcamps and courses that teach you how to design and deploy advanced algo trading and market making strategies using Hummingbot's Strategy V2 framework.
