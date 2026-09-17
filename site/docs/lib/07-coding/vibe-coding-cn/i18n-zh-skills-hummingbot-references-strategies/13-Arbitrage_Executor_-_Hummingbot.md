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
pageSha256: "cc5113484235e87d4ef19eddbb539e1e20ec5b23d2448eb061c54a4062ad0499"
contentMode: "local-full"
zh: ""
---

## Arbitrage Executor - Hummingbot

**URL:** https://hummingbot.org/v2-strategies/executors/arbitrage-executor/

**Contents:**
- Arbitrage Executor
  - Workflow¶
  - Sample Script¶

ArbitrageExecutor: Specialized in controlling profitability between two markets, such as between centralized exchanges (CEX) and decentralized exchanges (DEX), optimizing for arbitrage opportunities.

The ArbitrageExecutor class is a specialized component within Hummingbot designed for capitalizing on price discrepancies between different markets or exchanges by automating the process of simultaneously executes buy and sell orders on two distinct markets, aiming to exploit arbitrage opportunities for profit.

Upon initialization, the ArbitrageExecutor performs the following actions:

Below, we show code snippets from the Arbitrage with Smart Component script, which provides an example of how to use the ArbitrageExecutor.

You can define the two markets to arbitrage, the order amount, and the arbitrage profitability threshold.

The create_arbitrage_executor method is responsible for creating a new ArbitrageExecutor. First, it checks available balances on the buying and selling exchanges to ensure there's enough capital to execute the arbitrage. If so, it creates ArbitrageExecutor instances based on the settings above.

**Examples:**

Example 1 (unknown):
```unknown
class ArbitrageWithSmartComponent(ScriptStrategyBase):
    # Parameters
    exchange_pair_1 = ExchangePair(exchange="binance", trading_pair="MATIC-USDT")
    exchange_pair_2 = ExchangePair(exchange="uniswap_polygon_mainnet", trading_pair="WMATIC-USDT")
    order_amount = Decimal("50")  # in base asset
    min_profitability = Decimal("0.004")
```

Example 2 (python):
```python
def create_arbitrage_executor(self, buying_exchange_pair: ExchangePair, selling_exchange_pair: ExchangePair):
    ...
    arbitrage_config = ArbitrageConfig(
        buying_market=buying_exchange_pair,
        selling_market=selling_exchange_pair,
        order_amount=self.order_amount,
        min_profitability=self.min_profitability,
    )
```
