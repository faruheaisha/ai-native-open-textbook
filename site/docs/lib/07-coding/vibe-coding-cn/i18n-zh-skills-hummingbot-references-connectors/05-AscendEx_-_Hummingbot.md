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
pageSha256: "86b5fd1505381684b5ce3d05a38a7d5ddc7bd1a81d7aa5ab3b14f77e87969ca1"
contentMode: "local-full"
zh: ""
---

## AscendEx - Hummingbot

**URL:** https://hummingbot.org/exchanges/ascendex

**Contents:**
- AscendEx
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
  - Generate API Keys¶
  - Notes:¶
  - Add Keys to Hummingbot¶
- 🔀 Spot Connector¶
  - Order Types¶
  - Paper Trading¶

Hummingbot Foundation has a fee share partnership with Ascendex. When you use our software to trade on Ascendex, a custom API header tells Ascendex that the trade was executed using Hummingbot, so they share a portion of your fees with us, at no cost to you. To support us, create an account using our Ascendex referral link and enter that account's API keys into Hummingbot and run bots! Thanks for your support! 🙏

Log in to your AscendEX account using your PC and visit profile icon – [API Setting].

Click [New API Key] in the upper right corner of the page.

Create a name for the new API key and set up API permissions and IP address restrictions. Complete a three-step verification by entering your phone, email, and Google verification code. Click [Generate API Key] to complete the process.

A pop-up containing both public and private API keys will appear on your screen. Please keep a copy of both keys, as they will only be viewable to you during this stage of the setup. For account security, never share your API keys. In the case of a lost or forgotten API key, it is advised to delete the old API and create new keys immediately.

After creating an API key, you can Edit or Delete your API keys under the Action tab.

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

Access the Paper Trade version of this connector by running connect ascendex_paper_trade instead of connect ascendex.

If this is not available by default, you can configure Hummingbot to add this paper trade exchange. See Adding Exchanges for more information.

Collect historical OHCLV data from this exchange's spot markets

In a Hummingbot script, import CandlesFactory to create the candles that you want: from hummingbot.data_feed.candles_feed.candles_factory import CandlesFactory candles = CandlesFactory.get_candle(connector="ascendex", trading_pair="ETH-USDT", interval="1m", max_records=50)

See candles_example.py for more details.

**Examples:**

Example 1 (unknown):
```unknown
>>> connect ascend_ex

Enter your ascend_ex API key >>>
Enter your ascend_ex secret key >>>
```

Example 2 (unknown):
```unknown
You are now connected to ascend_ex
```

Example 3 (python):
```python
from hummingbot.data_feed.candles_feed.candles_factory import CandlesFactory
    candles = CandlesFactory.get_candle(connector="ascendex",
                                        trading_pair="ETH-USDT",
                                        interval="1m", max_records=50)
```
