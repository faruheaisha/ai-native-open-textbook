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
pageSha256: "4ea9ea95572068266a62ea9a68c0b305f3631ac5e198e1875ee29a138ad907bb"
contentMode: "local-full"
zh: ""
---

## Executors - Hummingbot

**URL:** https://hummingbot.org/v2-strategies/executors/

**Contents:**
- Executors
- Types of Executors¶
- Benefits of Executors¶
- Executor Orchestrator¶
  - Key Features and Operations¶

Executors in Hummingbot are self-managing components that handle the execution of orders according to predefined conditions set by Controllers, which, in turn, utilize data from the MarketDataProvider (Candles, Orderbook, Trades). Executors are tasked with managing the state of orders — initiating, refreshing, and canceling orders, as well as halting their own operation when certain conditions are met.

The ExecutorOrchestrator serves as a utility class that enables trading strategies to dynamically create, stop, and manage executors, which are specialized units responsible for executing trading activities such as placing and managing orders.

Initialization: The ExecutorOrchestrator is initialized with a reference to the trading strategy (strategy) and an update interval (executors_update_interval). This setup allows it to periodically update and manage executors based on the strategy's requirements.

Executor Management: It maintains a dictionary of executors, where each executor is associated with a controller ID. This structure facilitates the organization and retrieval of executors for management purposes.

Action Execution: The orchestrator can execute various actions (ExecutorAction) such as creating, stopping, and storing executors. Actions are processed either individually or in batches, allowing for flexible execution management.

Creating Executors: Based on the CreateExecutorAction, it can instantiate different types of executors (e.g., PositionExecutor, DCAExecutor, ArbitrageExecutor) with specific configurations. This allows strategies to deploy diverse trading tactics dynamically.

Stopping Executors: Using the StopExecutorAction, it can gracefully stop executors, ensuring that any ongoing operations are properly concluded before termination.

Storing Executors: The StoreExecutorAction enables the orchestrator to store executor data, facilitating persistence and analysis of executor performance over time.

Performance Reporting: The orchestrator can generate detailed performance reports for individual controllers or globally across all controllers. These reports include metrics such as realized and unrealized P&L (Profit and Loss), trading volume, and the distribution of close types, providing insights into the effectiveness of the trading strategy and its executors.
