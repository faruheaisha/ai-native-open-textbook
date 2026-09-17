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
pageSha256: "6d88ebfc6b7a809b68180c95dbcb6dd7410427b33826d53123365ab2d13c7bfb"
contentMode: "local-full"
zh: ""
---

## TWAP Executor - Hummingbot

**URL:** https://hummingbot.org/v2-strategies/executors/twapexecutor/

**Contents:**
- TWAP Executor
  - Key Components:¶
  - Key Functions:¶
  - Example Script¶
  - Conclusion:¶

The TWAPExecutor is an implementation of a Time-Weighted Average Price (TWAP) execution strategy within the Hummingbot trading framework. This strategy is used to execute trades over a specified time horizon to minimize the market impact by breaking up a large order into smaller orders and executing them at regular intervals. Below is an overview of the key components and functionalities of the TWAPExecutor class:

Class Inheritance and Initialization: The TWAPExecutor class inherits from ExecutorBase, indicating it's a specialized form of executor with additional logic for TWAP strategy execution. It initializes with a strategy, configuration, update interval, and maximum retries.

Logging: Utilizes Hummingbot's logging mechanism for logging information, warnings, and errors.

Configuration and Validation: Takes a TWAPExecutorConfig object as configuration, which defines the parameters for the TWAP strategy such as the connector to use, trading pair, number of orders, order interval, and order amount. It also validates if the order amount meets the minimum requirement of the trading pair.

Order Plan Creation: Generates a plan for when orders should be placed (create_order_plan) based on the configuration, mapping timestamps to None initially, which later gets replaced with actual TrackedOrder objects.

Order Execution and Management:

Validates sufficient balance before placing orders.

Control Task: An asynchronous control task (control_task) that evaluates conditions for creating, refreshing, and completing orders, as well as retrying failed orders.

Performance Metrics: Calculates performance metrics such as filled amount, trade PnL (profit and loss), average executed price, cumulative fees, and net PnL.

create_order_plan: Generates a schedule for when orders should be executed.

validate_sufficient_balance: Ensures there is enough balance to execute the planned orders.

control_task: Asynchronously evaluates various conditions to manage order execution lifecycle.

create_order: Creates a new order based on the current state of the order plan and execution parameters.

process_order_created_event, process_order_failed_event, process_order_completed_event: Event handlers for order lifecycle events.

Performance Metrics Methods: Includes methods to calculate and retrieve performance metrics related to the execution of the TWAP strategy.

The v2_twap_multiple_pairs.py example script defining the TWAPMultiplePairs strategy class shows how to use the TWAPExecutor within a broader Hummingbot strategy context, specifically for executing TWAP (Time-Weighted Average Price) trades across multiple trading pairs simultaneously. This script illustrates the setup and orchestration required to utilize the TWAPExecutor functionality within a strategy that can be deployed in Hummingbot.

Inherits from StrategyV2ConfigBase, indicating it's a complex strategy capable of handling multiple trading pairs and executors.

Initializes with a dictionary of connectors and the strategy-specific configuration (TWAPMultiplePairsConfig).

Defines configuration parameters for executing TWAP orders, including details for multiple trading pairs, position mode, and TWAP executor configurations (twap_configs).

Utilizes a validator to parse and validate the TWAP configurations from a string format into TWAPExecutorConfig objects, ensuring each configuration adheres to expected parameters such as connector name, trading pair, trade side, leverage, total amount in quote currency, total duration, order interval, and execution mode (e.g., MAKER or TAKER).

The TWAPExecutor class is designed to execute orders following a TWAP strategy, aiming to reduce market impact by distributing the execution of a large order across multiple smaller orders over time. It involves complex logic for scheduling orders, managing their lifecycle, and calculating execution performance, making it a sophisticated component within the Hummingbot trading bot framework for algorithmic trading strategies.

**Examples:**

Example 1 (unknown):
```unknown
class TWAPMultiplePairsConfig(StrategyV2ConfigBase):
    script_file_name: str = Field(default_factory=lambda: os.path.basename(__file__))
    candles_config: List[CandlesConfig] = []
    controllers_config: List[str] = []
    markets: Dict[str, Set[str]] = {}
    position_mode: PositionMode = Field(
        default="HEDGE",
        client_data=ClientFieldData(
            prompt=lambda mi: "Enter the position mode (HEDGE/ONEWAY): ",
            prompt_on_new=True
        ))
    twap_configs: List[TWAPExecutorConfig] = Field(
        default="binance,WLD-USDT,BUY,1,100,60,15,TAKER",
        client_data=ClientFieldData(
            prompt=lambda mi: "Enter the TWAP configurations (e.g. connector,trading_pair,side,leverage,total_amount_quote,total_duration,order_interval,mode:same_for_other_config): ",
            prompt_on_new=True))
```

---

## 

**URL:** https://hummingbot.org/v2-strategies/diagrams/20.png
