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
pageSha256: "20e188dd0056dd09a00102c3579ce9ad505fcc511964b259608b20f653d02d1e"
contentMode: "local-full"
zh: ""
---

## Bybit - Hummingbot

**URL:** https://hummingbot.org/exchanges/bybit/

**Contents:**
- Bybit
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
  - Generate API Keys¶
  - Add Keys to Hummingbot¶
- 🔀 Spot Connector¶
  - Order Types¶
  - Paper Trading¶
- 🔀 Perp Connector¶

Hummingbot Foundation has a fee share partnership with Bybit. When you use our software to trade on Bybit, a custom API header tells Bybit that the trade was executed using Hummingbot, so they share a portion of your fees with us, at no cost to you. To support us, just enter your API keys into Hummingbot and run bots! Thanks for your support! 🙏

Log in to your Bybit account or Sign Up for a Bybit account.

Click on your account icon at the top right corner of the screen, and select API from the drop-down menu.

Navigate to the API Management tab and click on Create New Key.

Select System-generated API Keys.

Select API Transaction, and name the API key.

Set the permissions for the API key (e.g., account information, order placement, position information) and click on Submit

Copy the API key and secret, and save them somewhere safe.

Log in to the third-party application and link the saved API.

From inside the Hummingbot client, run connect bybit:

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

Access the Paper Trade version of this connector by running connect bybit_paper_trade instead of connect bybit.

If this is not available by default, you can configure Hummingbot to add this paper trade exchange. See Adding Exchanges for more information.

Integration to perpetual futures markets API endpoints

This connector supports the following OrderType constants:

This connector supports the following position modes:

This perp exchange offers a paper trading mode: https://testnet.bybit.com/en-US/trade/spot/BTC/USDT

Afer you create an account and create the API keys, you can enter them by using the connect bybit_perpetual_testnet command within the Hummingbot client. Once connected, you should be able to use the testnet with the available perpetual strategies / scripts.

**Examples:**

Example 1 (unknown):
```unknown
Enter your bybit API key >>>
Enter your bybit secret key >>>
```

Example 2 (unknown):
```unknown
You are now connected to bybit
```

---

## 

**URL:** https://hummingbot.org/academy-content/using-binance-with-hummingbot/binance-api2.png
