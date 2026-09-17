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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/references/learn.md"
sourceRel: "i18n/zh/skills/polymarket/references/learn.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/polymarket/references/learn.md"
sourceSha256: "7c4ec0ea55ae27ce367a9d1986e4f0bc407b2b03ed70d46936adcee4ea22bde2"
pageSha256: "baa3c381bf74c3f4205373cd83f35c870a9874bc8b5aa36071aa25decf06632f"
contentMode: "local-full"
zh: ""
---

## How Are Prices Calculated?

**URL:** llms-txt#how-are-prices-calculated?

**Contents:**
- Initial Price
- Future Price
  - Prices = Probabilities

Source: https://docs.polymarket.com/polymarket-learn/trading/how-are-prices-calculated

The prices probabilities displayed on Polymarket are the midpoint of the bid-ask spread in the orderbook.

* When a market is created, there are initially zero shares and no pre-defined prices or odds.

* Market makers (a fancy term for traders placing limit orders) interested in buying YES or NO shares can place [Limit Orders](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/trading/limit-orders/README.md) at the price they're willing to pay

* When offers for the YES and NO side equal \$1.00, the order is "matched" and that \$1.00 is converted into 1 YES and 1 NO share, each going to their respective buyers.

For example, if you place a limit order at \$0.60 for YES, that order is matched when someone places a NO order at \$0.40. *This becomes the initial market price.*

&lt;Important>Polymarket is not a "bookie" and does not set prices / odds. Prices are set by what Polymarket users are currently willling to buy/sell shares at. All trades are peer-to-peer.&lt;/Important>

The prices displayed on Polymarket are the midpoint of the bid-ask spread in the orderbook — unless that spread is over \$0.10, in which case the last traded price is used.

Like the stock market, prices on Polymarket are a function of realtime supply & demand.

### Prices = Probabilities

In the market below, the probability of 37% is the midpoint between the 34¢ bid and 40¢ ask. If the bid-ask spread is wider than 10¢, the probability is shown as the last traded price.

  &lt;img className="block w-full h-auto dark:hidden" style=&#123;&#123; maxWidth: '100%', height: 'auto' &#125;&#125; noZoom src="https://polymarket-upload.s3.us-east-2.amazonaws.com/how_are_prices_calculated.png" />

&lt;Note>You may not be able to buy shares at the displayed probability / price because there is a bid-ask spread. In the above example, a trader wanting to buy shares would pay 40¢ for up to 4,200 shares, after which the price would rise to 43¢.&lt;/Note>
