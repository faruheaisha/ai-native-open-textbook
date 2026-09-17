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
pageSha256: "9da8409a4f6b63c625a7f3db92ca49a4e9af49be8d6808d9386f5b7b92538dc4"
contentMode: "local-full"
zh: ""
---

## 🔥 XRP Ledger - Hummingbot

**URL:** https://hummingbot.org/exchanges/xrpl/

**Contents:**
- 🔥 XRP Ledger
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
  - Create and fund a XRPL Wallet¶
  - Add XRP Credentials to Hummingbot¶
  - Modify the XRPL configuration file¶
- 🔀 Spot Connector¶
  - Order Types¶

XRP Ledger (XRPL) is a sponsor of Hummingbot Foundation, so when you use Hummingbot to run bots on XRPL, you're supporting the Foundation and our mission to democratize algo trading with open source software.

From inside the Hummingbot client, run connect xrpl in order to connect your wallet:

Enter the seed from the account creation script, which starts with "s".

Afterwards, run balance If your keys are correct and the node is online, you should see your XRPL balances:

Open the newly created /conf/connectors/xrpl.yml file:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

**Examples:**

Example 1 (javascript):
```javascript
Enter your XRPL wallet secret key >>>  *****************************
***********************************
```

Example 2 (unknown):
```unknown
connector: xrpl

xrpl_secret_key: 7b2263727970746f223a207b226363125532223a20226165732d3132382d637472222876434586572706172616d73223a207b226976223a20226231613939313361626139353237393664623637373864653735346339653734234265547368657274657874223a20223766646530343233616361303036306430653437653461643539336563393337336434326534313334376239656534663637383733316261363130323332222c20226b6466223a202270626b646632222c20226b68534565478172616d73223a207b2263223a20313030303030302c2022646b6c656e223a2033322c2022707266223a2022686d61632d736861323536222c202273616c74223a20223866373731303365383935363765303937666663653330646134313063346436227d2c20226d6163223a2022666331373163653132363435646665353939616565306265646161343238626162625464564332326466303936623930626663663231613634646538346339316437227d2c202276657273696f6e223a20332c2112616c696173223a2022227d

custom_markets:
  SOLO-XRP:
    base: SOLO
    quote: XRP
    base_issuer: rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz
    quote_issuer: ''

wss_node_url: wss://s1.ripple.com/

wss_second_node_url: wss://s1.ripple.com/
```

Example 3 (unknown):
```unknown
custom_markets:
  SOLO-XRP:
    base: SOLO
    quote: XRP
    base_issuer: rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz
    quote_issuer: ''
  CORE-XRP:
    base: CORE
    quote: XRP
    base_issuer: rcoreNywaoz2ZCQ8Lg2EbSLnGuRBmun6D
    quote_issuer: ''
```
