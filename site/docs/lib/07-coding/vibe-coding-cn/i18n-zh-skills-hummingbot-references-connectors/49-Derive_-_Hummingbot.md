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
pageSha256: "c81679467839e4f3cb6b9273da8338d1e8dd96eda3d25f4ebb076b27e69fefe0"
contentMode: "local-full"
zh: ""
---

## 🔥 Derive - Hummingbot

**URL:** https://hummingbot.org/exchanges/derive/

**Contents:**
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 About Rate Limits¶
- Rate Limits¶
- Matching, Non-Matching, and Custom Requests¶
  - Custom Rate-Limited Requests¶
- REST¶
- 🔑 How to Connect¶
  - Generate API Keys¶
  - Add Keys to Hummingbot¶

Derive is a sponsor of Hummingbot Foundation, so when you use Hummingbot to run bots on Derive, you're supporting the Foundation and our mission to democratize algo trading with open source software. To help support us, create an account using our Derive referral link. Thanks for your help! 🙏

The system enforces rate limits using a fixed window algorithm, replenishing the request allowance every 5 seconds to maintain system stability. Market makers can access higher rate limits upon request by contacting the support team.

Derive Rate Limit: https://docs.derive.xyz/reference/rate-limits

The below rate limits have been implemented to safeguard our system. Rate limiters use a "fixed window" algorithm to discretely refill the request allowance every 5 seconds.

Market makers are eligible for higher rate limits. To apply for increased rates, please contact our support team.

Note: Burst requests for both REST and WebSockets are refreshed every 5 seconds. For example, a trader can send 5× matching requests in a single burst but must wait 5 seconds before any further requests can be sent.

The below requests are counted as matching and per-instrument matching requests:

All requests outside of the above are counted as non-matching.

All non-matching requests over the REST API are rate limited per IP at a flat 10 TPS with a 5x burst.

If the limit is crossed, a 429 Too Many Requests response is returned.

Register your session KEY (i.e your public address e.g metamask)

Input a Name and your public address

Click Register button to exit. Now you can use your new Session Key.

From inside the Hummingbot client, run connect derive:

Input a Derive address as Derive Wallet address

Input your Subaccount ID

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

Access the Paper Trade version of this connector by running connect derive_paper_trade instead of connect derive.

If this is not available by default, you can configure Hummingbot to add this paper trade exchange. See Adding Exchanges for more information.

Integration to perpetual futures markets API endpoints

From inside the Hummingbot client, run connect derive_perpetual:

Input a Derive address as DerivePerpetual Wallet address

Input your Subaccount ID

If connection is successful:

This connector supports the following OrderType constants:

This connector supports the following position modes:

This perp exchange offers a paper trading mode: https://testnet.derive.xyz

Afer you create an account and create the API keys, you can enter them by using the connect derive_perpetual_testnet command within the Hummingbot client. Once connected, you should be able to use the testnet with the available perpetual strategies / scripts.

Derive Leverage: https://docs.derive.xyz/reference/private-get_positions#:~:text=leverage

**Examples:**

Example 1 (javascript):
```javascript
>>> connect derive

Enter Your Derive Wallet address >>>

Enter your wallet private key >>>

Enter your Subaccount ID >>>

Enter your Derive Account Type (trader/market_maker) >>>
```

Example 2 (unknown):
```unknown
You are now connected to derive
```

Example 3 (javascript):
```javascript
>>> connect derive_perpetual

Enter Your DerivePerpetual Wallet address >>>
Enter your wallet private key >>>
Enter your Subaccount ID >>>
Enter your Derive Account Type (trader/market_maker) >>>
```

Example 4 (unknown):
```unknown
You are now connected to derive_perpetual
```
