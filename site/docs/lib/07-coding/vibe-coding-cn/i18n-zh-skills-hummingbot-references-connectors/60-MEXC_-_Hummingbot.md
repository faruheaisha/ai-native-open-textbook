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
pageSha256: "0b74e207d4722f04f598af6dc8453bddecd2e57abc2e71a74530ea84b398e1d3"
contentMode: "local-full"
zh: ""
---

## MEXC - Hummingbot

**URL:** https://hummingbot.org/exchanges/mexc/

**Contents:**
- MEXC
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
  - Generate API Keys¶
  - Add Keys to Hummingbot¶
- 🔀 Spot Connector¶
  - Order Types¶
  - Paper Trading¶

Hummingbot Foundation has a fee share partnership with MEXC. When you use our software to trade on MEXC, a custom API header tells MEXC that the trade was executed using Hummingbot, so they share a portion of your fees with us, at no cost to you. To support us, just enter your API keys into Hummingbot and run bots! Thanks for your support! 🙏

Log into your MEXC account and click on "API" located under the user centre icon

Tick all boxes on the next page except for the Withdraw section (Hummingbot doesn't support withdraw at the moment) name your API KEY and click on create

Add your phone number and validate it

Complete the security verification with your email and your phone number

Your API is now created. Please keep your Secret Key secure. It will not be shown again. If you forget your Secret Key, you will need to delete the API and create a new one.

Please note that not all trading pairs are available for trading by the MEXC API. For a list of trading pairs that are available please check this link - https://www.mexc.com/user/openapi

From inside the Hummingbot client, run connect mexc:

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

Access the Paper Trade version of this connector by running connect mexc_paper_trade instead of connect mexc.

If this is not available by default, you can configure Hummingbot to add this paper trade exchange. See Adding Exchanges for more information. ```

**Examples:**

Example 1 (unknown):
```unknown
Enter your mexc API key >>>
Enter your mexc secret key >>>
```

Example 2 (unknown):
```unknown
You are now connected to mexc
```
