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
pageSha256: "b6493ff7941b2593b42bc1f0874a929f0c4239e568003f25332f27b8750a6b3f"
contentMode: "local-full"
zh: ""
---

## Candles - Hummingbot

**URL:** https://hummingbot.org/v2-strategies/candles/

**Contents:**
- Candles
- Supported Exchanges¶
- Key Configuration Parameters¶
- Downloading Candles¶
- Adding Technical Indicators¶
- Multiple Candles¶
- Displaying Candles in status¶
- Logging Candles Periodically¶
  - Additional Key Methods and Properties¶

Candles allow user to compose a trailing window of real-time market data in OHLCV (Open, High, Low, Close, Volume) form from certain supported exchanges.

It combines historical and real-time data to generate and maintain this window, allowing users to create custom technical indicators, leveraging pandas_ta.

See Candles Feed for a list of the currently supported exchanges.

A common practice is to execute bots on decentralized exchanges or smaller exchanges using candles data from other exchanges.

Candles provide a concise way to access historical exchange data. See the download_candles script.

Incorporate technical indicators to candle data for enhanced strategy insights:

For strategies requiring multiple candle intervals or trading pairs, initialize separate instances:

Modify the format_status method to display candlestick data:

To log candle data in the on_tick method:

**Examples:**

Example 1 (python):
```python
def format_status(self) -> str:
    # Ensure market connectors are ready
    if not self.ready_to_trade:
        return "Market connectors are not ready."
    lines = []
    if self.all_candles_ready:
        # Loop through each candle set
        for candles in [self.eth_1w_candles, self.eth_1m_candles, self.eth_1h_candles]:
            candles_df = candles.candles_df
            # Add RSI, BBANDS, and EMA indicators
            candles_df.ta.rsi(length=14, append=True)
            candles_df.ta.bbands(length=20, std=2, append=True)
            candles_df.ta.ema(length=14, offset=None, append=True)
            # Format and display candle data
            lines.extend([f"Candles: {candles.name} | Interval: {candles.interval}"])
            lines.extend(["    " + line for line in candles_df.tail().to_string(index=False).split("\n")])
    else:
        lines.append("  No data collected.")

    return "\n".join(lines)
```

Example 2 (python):
```python
from hummingbot.data_feed.candles_feed.candles_factory import CandlesFactory, CandlesConfig

class InitializingCandlesExample(ScriptStrategyBase):
    # Configure two different sets of candles
    candles_config_1 = CandlesConfig(connector="binance", trading_pair="BTC-USDT", interval="3m")
    candles_config_2 = CandlesConfig(connector="binance_perpetual", trading_pair="ETH-USDT", interval="1m")

    # Initialize candles using the configurations
    candles_1 = CandlesFactory.get_candle(candles_config_1)
    candles_2 = CandlesFactory.get_candle(candles_config_2)
```

Example 3 (python):
```python
def format_status(self) -> str:
    # Check if trading is ready
    if not self.ready_to_trade:
        return "Market connectors are not ready."

    lines = ["\n############################################ Market Data ############################################\n"]
    # Check if the candle data is ready
    if self.eth_1h_candles.is_ready:
        # Format and display the last few candle records
        candles_df = self.eth_1h_candles.candles_df
        candles_df["timestamp"] = pd.to_datetime(candles_df["timestamp"], unit="ms").dt.strftime('%Y-%m-%d %H:%M:%S')
        display_columns = ["timestamp", "open", "high", "low", "close"]
        formatted_df = candles_df[display_columns].tail()
        lines.append("One-hour Candles for ETH-USDT:")
        lines.append(formatted_df.to_string(index=False))
    else:
        lines.append("  One-hour candle data is not ready.")

    return "\n".join(lines)
```

Example 4 (python):
```python
def on_tick(self):
    self.logger().info(self.candles.candles_df)
```
