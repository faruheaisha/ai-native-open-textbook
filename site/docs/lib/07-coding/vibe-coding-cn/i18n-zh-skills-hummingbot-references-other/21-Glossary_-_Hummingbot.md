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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/other.md"
sourceRel: "i18n/zh/skills/hummingbot/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/other.md"
sourceSha256: "7bd57673fc3df5b901db36ae3eac6be136526e8e2dbb141702c9a6ebc26b607a"
pageSha256: "d8e6d905e92fe81ae17dbbea8738fafa9d7fd7ed023a7084e7610c55f9c24989"
contentMode: "local-full"
zh: ""
---

## Glossary - Hummingbot

**URL:** https://hummingbot.org/glossary/

**Contents:**
- Glossary¶
- Base asset¶
- Bollinger Bands¶
- Centralized exchange (“CEX”)¶
- Decentralized exchange (“DEX”)¶
- MACD¶
- Maker¶
- Maker order¶
- Order book¶
- Quote asset¶

When you start diving into the Hummingbot ecosystem, you'll probably encounter some unfamiliar terms and phrases along the way. To help you on your journey, we've defined some of the most common trading vocabularies here in this handy cheat sheet.

The asset in a trading pair whose quantity is fixed as a single unit in a price quote. For example, in a price quotation of ETH/DAI 100, ETH is the base asset and 100 is the amount of DAI exchangeable for each unit of ETH.In Hummingbot, the first token in a trading pair is always the base asset. See quote asset for more info.

Bollinger Bands (BB) are a widely popular technical analysis instrument created by John Bollinger in the early 1980’s. Bollinger Bands consist of a band of three lines which are plotted in relation to security prices. The line in the middle is usually a Simple Moving Average (SMA) based on a certain historical window length.

The SMA then serves as a base for the Upper and Lower Bands, which are used as a way to measure volatility by observing the relationship between the Bands and price. Typically the Upper and Lower Bands are set a number of standard deviations away from the SMA (The Middle Line).

Parameters used in V2 Strategies:

An exchange which is operated by a central authority. In addition to order matching and broadcasting, the centralized exchange keeps custody of users’ assets.

An exchange which operates in a decentralized way, using smart contracts to facilitate the transacting in and settling of assets. Generally, one distinguishing feature of a decentralized exchange is that participants keep custody of their own assets in their own wallets; the DEX facilitates the direct wallet-to-wallet settlement between counterparties in a transaction.

MACD (Mean Average Convergence Divergence) is an extremely popular indicator used in technical analysis. MACD can be used to identify aspects of a security's overall trend. Most notably these aspects are momentum, as well as trend direction and duration. What makes MACD so informative is that it is actually the combination of two different types of indicators. First, MACD employs two Moving Averages of varying lengths (which are lagging indicators) to identify trend direction and duration. Then, MACD takes the difference in values between those two Moving Averages (MACD Line) and an EMA of those Moving Averages (Signal Line) and plots that difference between the two lines as a histogram which oscillates above and below a center Zero Line. The histogram is used as a good indication of a security's momentum.

To fully understand the MACD indicator, it is first necessary to break down each of the indicator's components.

The three major components of MACD

Parameters used in V2 Strategies:

A party that places maker orders, and in doing so, provides liquidity to the market.

A “limit order”; which is an order to buy or sell an asset at a specified price and quantity. Executing this order is not guaranteed; the order is only filled if there is a taker that accepts the price and quantity and transacts.

A list of currently available (maker) orders on an exchange, showing all of the current buyer and seller interest in an asset.

The asset in a asset pair whose quantity varies and whose quantity is denoted by the numerical figure of the price quote. For example, in a price quotation of ETH/DAI 100, DAI is the quote currency and 100 units of DAI are referenced in this exchange.In Hummingbot, the second token in a trading pair is always the quote asset. See base asset for more info.

A party that places taker orders, which execute immediately and fill a maker order.

A “market order”; an order to buy or sell a specified quantity of an asset which is filled immediately at the best available price(s) available on the exchange.

The average of best bid and best ask price in the orderbook.

In cross exchange strategy, is the net cost of the other side of your limit order i.e., the cost of you making a taker order.For example on your taker market, if you can buy 25 tokens for say a net price of $100 (other market makers have limit sell orders at a net price of 100 for all 25, e.g. 7.5 @ $99, 10 @ $100, 7.5 @ $101), then on your maker side, you would place a limit sell order for 25 @ $101 (assume 1% min profitability). If someone fills your sell order (you sell at $101), you immediately try to hedge by buying on the taker side at $100.

---

## 

**URL:** https://hummingbot.org/dashboard/credentials-6.png

---

## 

**URL:** https://hummingbot.org/dashboard/instance-1.png
