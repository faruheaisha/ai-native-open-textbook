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
pageSha256: "195ae7ebd1302477785d840ed0125de33a0ab933e6739a50a43adc824b8695c0"
contentMode: "local-full"
zh: ""
---

## Cube - Hummingbot

**URL:** https://hummingbot.org/exchanges/cube/

**Contents:**
- Cube
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
  - Generate API Keys¶
  - Add Keys to Hummingbot¶
- 🔀 Spot Connector¶
  - Order Types¶
- 🔮 Rate Orcale¶

Go to Cube Exchange and log in or create a new account.

Open the API Key page by clicking over the profile icon on the top right corner and go to the Setting/API page at https://www.cube.exchange/settings/api.

Click on the Add another API button

Choose your account, select WRITE permission and click Create API Key

Copy your API keys and store them somewhere safe.

Go to Subaccounts page and copy your Subaccount ID number. You will need this to connect to Hummingbot.

Now, you have created API keys for your Cube Exchange!

From inside the Hummingbot client, run connect cube:

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

The connector comes with its own rate oracle implementation. You can use it by using the folllowing command:

Make sure to set global token name to USDC as USDC is the main quote token for trading on Cube Exchange

**Examples:**

Example 1 (unknown):
```unknown
>>> connect cube

Enter your Cube Exchange API key >>>
Enter your Cube Exchange secret key >>>
Enter your Cube Exchange Subaccount ID >>>
Enter your Cube environment (live or staging) >>>
```

Example 2 (unknown):
```unknown
You are now connected to cube
```

Example 3 (unknown):
```unknown
config rate_oracle_source cube
```

Example 4 (unknown):
```unknown
config global_token.global_token_name USDC
```
