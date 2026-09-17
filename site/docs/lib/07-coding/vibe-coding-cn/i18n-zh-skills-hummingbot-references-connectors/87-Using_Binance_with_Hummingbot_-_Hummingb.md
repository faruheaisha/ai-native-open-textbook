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
pageSha256: "f7d86f20067ac9cef1559d35d5bbc30f3c783628d0672c039dac41049b5df0dd"
contentMode: "local-full"
zh: ""
---

## Using Binance with Hummingbot - Hummingbot

**URL:** https://hummingbot.org/academy-content/using-binance-with-hummingbot/

**Contents:**
- Using Binance with Hummingbot¶
- Introduction¶
- Generate API Keys¶
- Add Keys to Hummingbot¶

Binance is the world’s largest crypto exchange by trading volume, with $76 billion daily trading volume on Binance exchange as of August 2022, and 90 million customers worldwide.

This section provides a step-by-step guide that helps you use Hummingbot with Binance, starting with generating exchange API keys and adding them to Hummingbot. All information is sourced from the exchange website and other content.

Before you start, please make sure you complete your Binance account verification. Binance allows API key creation only for accounts that have completed their Basic and Intermediate Verification. If you haven't completed both of your account's Basic and Intermediate verification procedures, kindly go back to Binance and complete it. Once your account is verified, you will be able to complete the steps.

Log in to your Binance account. Click on your Profile icon, and then on the right-hand sidebar, click API Management

Click Create API. Please note that before creating an API Key, you need to:

Verify your request with 2FA devices.

Your API Key has now been created. Save your API Key and Secret Key securely. If you lose your Secret Key, you'll need to delete this API Key and create a new one.

Under API restrictions, ensure you select:

Enable Spot & Margin Trading if trading on Spot markets.

Enable Futures if trading Perpetuals.

Under IP access restrictions, you have two options:

Unrestricted - not recommended

Restrict access to trusted IPs only (Recommended) - enter the public IP address of the machine Hummingbot is running on

From inside the Hummingbot client, run connect binance:

If connection is successful:

**Examples:**

Example 1 (unknown):
```unknown
>>> connect binance

Enter your binance API key >>>
Enter your binance secret key >>>
```

Example 2 (unknown):
```unknown
You are now connected to binance
```

---

## 

**URL:** https://hummingbot.org/academy-content/using-binance-with-hummingbot/binance-api4.png
