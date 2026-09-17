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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/connectors.md"
sourceRel: "i18n/zh/skills/hummingbot/references/connectors.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/connectors.md"
sourceSha256: "16ff6b5efa43a0629074cd926d8e11b244d1cda26f6f4eee157acd5d0c75f303"
pageSha256: "86c84738af1f9ea53f5a6832fc5a6616162d71cd94067b2626cb3b4bd9c81c1e"
contentMode: "local-full"
zh: ""
---

## 🔥 Gate.io - Hummingbot

**URL:** https://hummingbot.org/exchanges/gate-io/

**Contents:**
- 🔥 Gate.io
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
  - Generate API Keys¶
  - Add Keys to Hummingbot¶
- 🔀 Spot Connector¶
  - Order Types¶
  - Paper Trading¶
- 🔀 Perp Connector¶

Gate.io is an exchange partner of Hummingbot Foundation, so when you use Hummingbot to run bots on Gate.io, a portion of your fees goes to support the Foundation and our mission to democratize algo trading with open source software. To help support us, create an account using our Gate.io referral link and enter that account's API keys into Hummingbot and run bots! Thanks for your help! 🙏

Go to Gate.io Log in or create a new account at https://www.gate.io/.

Open the API Management page Hover over the profile icon on the top right corner and go to the API Management page:

Click on the Create API Key button

Add IP whitelist (optional) Enable Bind IP and input the IP addresses, separated by a comma. You'll need to find the public IP address of the machine you are running Hummingbot If you don't want to whitelist your IP then select Later instead but the API keys you create will only be valid for 90 days.

Choose API v4 Key and a Classic Account type

Select Permissions Please select the following permissions and then click on the Submit button.

Carefully read the Risk Reminder, tick both paragraphs, and click I Accept

Enter Fund Password, choose 2FA Authentication method and enter its code

Copy your API keys and store them somewhere safe.

Now, you have created API keys for your Gate.io exchange!

From inside the Hummingbot client, run connect gate_io:

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

Access the Paper Trade version of this connector by running connect gate_io_paper_trade instead of connect gate_io.

If this is not available by default, you can configure Hummingbot to add this paper trade exchange. See Adding Exchanges for more information.

Integration to perpetual futures markets API endpoints

This connector supports the following OrderType constants:

This connector supports the following position modes:

This perp exchange offers a paper trading mode: https://www.gate.io/testnet/futures_trade/USDT/BTC_USDT

Users can use the perpetual testnet by clicking on the link above - however the testnet does not currently work with Hummingbot

Collect historical OHCLV data from this exchange's spot markets

In a Hummingbot script, import CandlesFactory to create the candles that you want: from hummingbot.data_feed.candles_feed.candles_factory import CandlesFactory candles = CandlesFactory.get_candle(connector="gate_io", trading_pair="ETH-USDT", interval="1m", max_records=50)

See candles_example.py for more details.

Collect historical OHCLV data from this exchange's perp markets

In a Hummingbot script, import CandlesFactory to create the candles that you want: from hummingbot.data_feed.candles_feed.candles_factory import CandlesFactory candles = CandlesFactory.get_candle(connector="gate_io_perpetual", trading_pair=trading_pair, interval="3m", max_records=50)

See candles_example.py for more details.

**Examples:**

Example 1 (unknown):
```unknown
>>> connect gate_io

Enter your gate_io API key >>>
Enter your gate_io secret key >>>
```

Example 2 (unknown):
```unknown
You are now connected to gate_io
```

Example 3 (python):
```python
from hummingbot.data_feed.candles_feed.candles_factory import CandlesFactory
    candles = CandlesFactory.get_candle(connector="gate_io",
                                        trading_pair="ETH-USDT",
                                        interval="1m", max_records=50)
```

Example 4 (python):
```python
from hummingbot.data_feed.candles_feed.candles_factory import CandlesFactory
    candles = CandlesFactory.get_candle(connector="gate_io_perpetual",
                                        trading_pair=trading_pair,
                                        interval="3m", max_records=50)
```
