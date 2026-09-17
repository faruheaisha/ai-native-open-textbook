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
pageSha256: "12351ff00709d37c08a2c2612da17f718ad99587c6456630f79687df76025b6e"
contentMode: "local-full"
zh: ""
---

## Strategies & Snippets - Hummingbot

**URL:** https://hummingbot.org/gateway/strategies

**Contents:**
- Strategies & Snippets
- Available Scripts and Strategies¶
- Code Snippets¶
  - Data Feed¶
  - Connect Market¶
  - Get Price¶
  - Get Balance¶
  - Place Order¶
  - Get LP Position Info¶
  - Add Liquidity¶

Gateway enables sophisticated trading strategies on decentralized exchanges through Hummingbot. This page lists available Gateway-compatible strategies/scripts along with commonly used code snippets.

The following table lists Gateway-compatible scripts and strategies available in the Hummingbot repository. All links point to the development branch where the latest versions are maintained.

The following code snippets demonstrate common Gateway operations in Hummingbot scripts and strategies.

**Examples:**

Example 1 (unknown):
```unknown
amm_data_feed = AmmGatewayDataFeed(
            connector="jupiter/router",
            trading_pairs={"SOL-USDC","JUP-USDC"}
            order_amount_in_base=Decimal("1.0")
        )
```

Example 2 (python):
```python
@classmethod
def init_markets(cls):
        cls.markets = {"jupiter/router": {"SOL-USDC"}}

def __init__(self, connectors: Dict[str, ConnectorBase]):
        super().__init__(connectors)
```

Example 3 (unknown):
```unknown
current_price = await self.connectors["jupiter/router"].get_quote_price(
                    trading_pair="SOL-USDC",
                    is_buy=True,
                    amount=Decimal("1.0"),
                )
```

Example 4 (unknown):
```unknown
connector = self.connectors["jupiter/router"]
await connector.update_balances(on_interval=False)
balance = connector.get_balance("SOL")
```
