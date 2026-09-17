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
pageSha256: "3e2bd1894a4d3b451d30ade246df9b3fdadcdd42a8dff2a4b26cc5662117f24a"
contentMode: "local-full"
zh: ""
---

## Index - Hummingbot

**URL:** https://hummingbot.org/exchanges/hashkey/

**Contents:**
- Index
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
  - Generate API Keys¶
  - Add Keys to Hummingbot¶
- 🔀 Spot Connector¶
  - Order Types¶
  - Paper Trading¶
- 🔀 Perp Connector¶

Hummingbot Foundation has a fee share partnership with Hashkey Global. When you use our software to trade on Hashkey Global, a custom API header tells Hashkey Global that the trade was executed using Hummingbot, so they share a portion of your fees with us, at no cost to you. To support us, just enter your API keys into Hummingbot and run bots! Thanks for your support! 🙏

Log in to your Hashkey Global account or Sign Up for a Hashkey Global account.

Click on your account icon at the top right corner of the screen, and select API Management from the drop-down menu.

Navigate to the API Management tab and click on Create API.

Input API Note Name", and select API Permissions" for your key, and enter the IP Access Restriction.

Click Confirm and enter your authentication on the sub-window.

Copy the API key and secret, and save them somewhere safe.

Log in to the third-party application and link the saved API.

From inside the Hummingbot client, run connect hashkey:

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

Access the Paper Trade version of this connector by running connect hashkey_paper_trade instead of connect hashkey.

If this is not available by default, you can configure Hummingbot to add this paper trade exchange. See Adding Exchanges for more information.

Integration to perpetual futures markets API endpoints

This connector supports the following OrderType constants:

This connector supports the following position modes:

Access the Paper Trade version of this connector by running connect hashkey_perpetual_paper_trade instead of connect hashkey_perpetual.

If this is not available by default, you can configure Hummingbot to add this paper trade exchange. See Adding Exchanges for more information.

**Examples:**

Example 1 (unknown):
```unknown
Enter your Hashkey Global api >>>
Enter your Hashkey Global secret >>>
```

Example 2 (unknown):
```unknown
You are now connected to hashkey
```
