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
pageSha256: "4e22c69d5b24cc76669121023f3d7579644396c8bfaab20d5fb6c86240464f79"
contentMode: "local-full"
zh: ""
---

## 🔥 Bitmart - Hummingbot

**URL:** https://hummingbot.org/exchanges/bitmart/

**Contents:**
- 🔥 Bitmart
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
  - Generate API Keys¶
  - Add Keys to Hummingbot¶
- 🔀 Spot Connector¶
  - Order Types¶
  - Paper Trading¶
- 🔀 Perp Connector¶

Bitmart is an exchange partner of Hummingbot Foundation, so when you use Hummingbot to run bots on Bitmart, a portion of your fees goes to support the Foundation and our mission to democratize algo trading with open source software. To help support us, create an account using our Bitmart referral link and enter that account's API keys into Hummingbot and run bots! Thanks for your help! 🙏

Click Settings in the API tab

Create Successfully. The Secret Key will only be displayed once. Please copy and save.

Click Confirm button to exit. Now you can use your new API.

From inside the Hummingbot client, run connect bitmart:

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

Access the Paper Trade version of this connector by running connect bitmart_paper_trade instead of connect bitmart.

If this is not available by default, you can configure Hummingbot to add this paper trade exchange. See Adding Exchanges for more information.

Integration to perpetual futures markets API endpoints

This connector supports the following OrderType constants:

This connector supports the following position modes:

Access the Paper Trade version of this connector by running connect bitmart_paper_trade instead of connect bitmart_perpetual.

If this is not available by default, you can configure Hummingbot to add this paper trade exchange. See Adding Exchanges for more information.

**Examples:**

Example 1 (unknown):
```unknown
Enter your bitmart API key >>>
Enter your bitmart secret key >>>
```

Example 2 (unknown):
```unknown
You are now connected to bitmart
```
