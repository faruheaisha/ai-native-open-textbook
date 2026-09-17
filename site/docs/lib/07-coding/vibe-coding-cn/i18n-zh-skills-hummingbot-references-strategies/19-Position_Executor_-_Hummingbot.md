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
pageSha256: "d8e0414309a80379172d866026beb04892ffe6f917327366f9847b301601fa66"
contentMode: "local-full"
zh: ""
---

## Position Executor - Hummingbot

**URL:** https://hummingbot.org/v2-strategies/executors/positionexecutor

**Contents:**
- Position Executor
  - Spot vs Perpetual Behavior¶
  - Configuration¶
    - Stop Loss¶
    - Take Profit¶
    - Time Limit¶
    - Trailing Stop¶
  - Execution Flow¶
  - Conclusion¶

PositionExecutor: Manages opening and closing positions of equal amounts, ensuring the portfolio remains balanced ± the position's profit or loss. It's applicable in both perpetual and spot markets, requiring pre-ownership of the asset for spot markets.

The PositionExecutor uses a configuration object, PositionExecutorConfig, to manage an order after it is placed, following the Triple Barrier Method. This configuration sets pre-defined stop loss, take profit, time limit, and trailing stop parameters.

The PositionExecutor class implements the Triple Barrier Method popularized in Martin Prado's famous book Advances in Financial Machine Learning.

The triple barrier method is a structured approach to position management, where three "barriers" determine the outcome of a trade:

Additionally, PositionExecutor also contains a Trailing Stop mechanism, which dynamically adjusts the stop loss level as favorable price movements occur.

The PositionExecutor class is designed to work on both spot and perpetual exchanges, allowing you to write strategies that be used on either type:

The PositionExecutor engages with the market by executing orders based on the PositionConfig. It applies the triple barrier method as follows:

Activated when the price moves against the position beyond a specified threshold.

Triggered when the price reaches a pre-set level that represents a desired profit.

When the time limit is reached, the position will be closed or an opposing trade will be executed.

The trailing stop evaluates the position after a certain time has passed and may close it to avoid market shifts or decay.

Here's a simplified flow of how the PositionExecutor operates in conjunction with the triple barrier method:

The PositionExecutor is a powerful tool within Hummingbot for implementing strategies that require precise entry and exit conditions. By leveraging the triple barrier method, it provides a structured and disciplined approach to trade management, vital for both market making and directional trading strategies.

**Examples:**

Example 1 (unknown):
```unknown
class TripleBarrierConf(BaseModel):
    # Configure the parameters for the position
    stop_loss: Optional[Decimal]
    take_profit: Optional[Decimal]
    time_limit: Optional[int]
    trailing_stop_activation_price_delta: Optional[Decimal]
    trailing_stop_trailing_delta: Optional[Decimal]
    # Configure the parameters for the order
    open_order_type: OrderType = OrderType.LIMIT
    take_profit_order_type: OrderType = OrderType.MARKET
    stop_loss_order_type: OrderType = OrderType.MARKET
    time_limit_order_type: OrderType = OrderType.MARKET
```

Example 2 (unknown):
```unknown
triple_barrier_confs = TripleBarrierConf(
    stop_loss=stop_loss,
    take_profit=take_profit,
    time_limit=time_limit,
    trailing_stop_activation_price_delta=trailing_stop_activation_price_delta,
    trailing_stop_trailing_delta=trailing_stop_trailing_delta,
)
```
