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
pageSha256: "4f778b682a20e7c43ec288e0a992d0fb33e54354c6545120a5896affffc72693"
contentMode: "local-full"
zh: ""
---

## 🔥 Kucoin - Hummingbot

**URL:** https://hummingbot.org/exchanges/kucoin

**Contents:**
- 🔥 Kucoin
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
  - Generate API Keys¶
  - Add Keys to Hummingbot¶
- 🔀 Spot Connector¶
  - Order Types¶
  - Paper Trading¶
- 🔀 Perp Connector¶

Kucoin is an exchange partner of Hummingbot Foundation, so when you use Hummingbot to run bots on Huobi, a portion of your fees goes to support the Foundation and our mission to democratize algo trading with open source software. To help support us, create an account using our Kucoin referral link and enter that account's API keys into Hummingbot and run bots! Thanks for your help! 🙏

Log in to Kucoin, click the avatar, in the drop-down menu, select API Management > Create API.

A window will pop up where you can choose either API Trading or Link Third-Party Applications.

For API trading, enter the API name and API passphrase.

For linking to a third-party application, first select the name of the third-party app you wish to link. Then, enter the API name and API passphrase, and select API permissions.

For account security purposes, withdrawals are not supported by linking a third-party application, and there is no need to link an IP address. During transactions, the platform will use the configured third-party IP addresses.

During the creation process, pay attention to the relevant prompts and rules on the API creation page. Here are some points for your special attention:

The API passphrase is crucial. It is highly recommended to write it down and store it in a secure location. You will need the API passphrase for verification when using the API. Additionally, do not disclose your API key to prevent any potential loss of assets.

To ensure the security of your funds, API keys that are enabled for spot, margin, or futures trading but not linked to an IP address will be automatically deleted or have their trade permissions disabled after 30 days of inactivity. However, there is no expiration limit for API keys that only have the General permissions.

To enable access to permissions, you must add your IP address to the whitelist.

A security verification will pop up. Enter your trading password, email verification code, and Google verification code.

Click the button to confirm and complete the creation.

From inside the Hummingbot client, run connect kucoin:

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

Access the Paper Trade version of this connector by running connect kucoin_paper_trade instead of connect kucoin.

If this is not available by default, you can configure Hummingbot to add this paper trade exchange. See Adding Exchanges for more information.

Integration to perpetual futures markets API endpoints

This connector supports the following OrderType constants:

This connector supports the following position modes:

This perp exchange offers a paper trading mode: https://www.kucoin.com/support/7909075578521

Afer you create an account and create the API keys, you can enter them by using the connect kucoin_perpetual_testnet command within the Hummingbot client. Once connected, you should be able to use the testnet with the available perpetual strategies / scripts.

Collect historical OHCLV data from this exchange's spot markets

In a Hummingbot script, import CandlesFactory to create the candles that you want: from hummingbot.data_feed.candles_feed.candles_factory import CandlesFactory candles = CandlesFactory.get_candle(connector="kucoin", trading_pair="ETH-USDT", interval="1m", max_records=50)

See candles_example.py for more details.

Candles Feed not available for Perpetual

**Examples:**

Example 1 (unknown):
```unknown
>>> connect kucoin

Enter your kucoin API key >>>
Enter your kucoin secret key >>>
Enter your kucoin passphrase >>>
```

Example 2 (unknown):
```unknown
You are now connected to kucoin
```

Example 3 (python):
```python
from hummingbot.data_feed.candles_feed.candles_factory import CandlesFactory
    candles = CandlesFactory.get_candle(connector="kucoin",
                                        trading_pair="ETH-USDT",
                                        interval="1m", max_records=50)
```
