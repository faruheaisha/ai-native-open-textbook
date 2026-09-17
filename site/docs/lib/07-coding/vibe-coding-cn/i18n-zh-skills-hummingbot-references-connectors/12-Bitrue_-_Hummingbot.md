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
pageSha256: "cd34fe6ede37f59504465f0a17b48e1cffaa51e64f97d484615b87ed8eac492e"
contentMode: "local-full"
zh: ""
---

## Bitrue - Hummingbot

**URL:** https://hummingbot.org/exchanges/bitrue/

**Contents:**
- Bitrue
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
  - Generate API Keys¶
  - Add Keys to Hummingbot¶
- 🔀 Spot Connector¶
  - Order Types¶
  - Paper Trading¶

Login to your Bitrue account on your computer.

Hover on your profile icon and click API from the dropdown menu

Click Get API key and Create a API name ( ex. Hummingbot_Bitrue), click Create API key button

Pass the authentication part and click Confirm

Go to your email Inbox and verify New API Creation by following the link in the email

Write somewhere your API key and Secret and give Not Limited to any IP access restriction and click Save Settings

Copy/paste your API Key and API Secret

From inside the Hummingbot client, run connect bitrue:

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

Access the Paper Trade version of this connector by running connect bitrue_paper_trade instead of connect bitrue.

If this is not available by default, you can configure Hummingbot to add this paper trade exchange. See Adding Exchanges for more information.

**Examples:**

Example 1 (unknown):
```unknown
Enter your bitrue API key >>>
Enter your bitrue secret key >>>
```

Example 2 (unknown):
```unknown
You are now connected to bitrue
```
