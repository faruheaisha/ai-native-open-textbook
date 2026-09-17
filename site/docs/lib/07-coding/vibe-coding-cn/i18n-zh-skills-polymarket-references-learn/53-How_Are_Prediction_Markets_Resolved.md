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
pageSha256: "000667d15b284bc9fc144f67d4fea2c642ac0179291ec00e339ba32d56742d65"
contentMode: "local-full"
zh: ""
---

## How Are Prediction Markets Resolved?

**URL:** llms-txt#how-are-prediction-markets-resolved?

**Contents:**
- Overview
  - To propose a market resolution
  - To dispute a proposed resolution

Source: https://docs.polymarket.com/polymarket-learn/markets/how-are-markets-resolved

Markets are resolved by the UMA Optimistic Oracle, a smart-contract based optimistic oracle.

* When the result of a market becomes clear, the market can be “resolved,” or permanently finalized.

* Markets are resolved according to the market's pre-defined rules, which can be found under market's the order book.

* When a market is resolved, holders of winning shares receive \$1 per share, losing shares become worthless, and trading of shares is no longer possible.

* To resolve a market, an outcome must first be “proposed,” which involves putting up a bond in USDC.e which will be forfeited if the proposal is unsuccessful.

* If the proposal is validated as accurate, the proposer will receive a reward for your proposal.

  If you propose a market too early, or are unsuccessful in your proposal, you will lose all of your \$750 bond. Do not propose a resolution unless you understand the process and are confident in your view.

### To propose a market resolution

  &lt;Steps.Step>
    Navigate to the market you want to propose and click Resolution > Propose Resolution.

&lt;Note>You will be taken to the corresponding UMA oracle page for the market, which shows the bond required and reward for successful proposal.&lt;/Note>
  &lt;/Steps.Step>

&lt;Steps.Step>
    Ensure that you have enough USDC.e in your wallet on Polygon to supply the bond (usually \$750)
  &lt;/Steps.Step>

&lt;Steps.Step>
    Select the outcome you would like to propose from the drop-down menu.
  &lt;/Steps.Step>

&lt;Steps.Step>
    Connect your wallet and submit the transaction. It will now enter the UMA Oracle’s verification queue.
  &lt;/Steps.Step>

Once in the verification process, UMA will review the transaction to ensure it was proposed correctly. If approved, you will receive your bond amount back in your wallet plus the reward. If not approved, it will enter Uma’s dispute resolution process, which is described in detail here.

### To dispute a proposed resolution

Once a market is proposed for resolution it goes into a challenge period of 2 hours.

If you do not agree with a proposed resolution, you can [dispute the outcome](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/markets/dispute/README.md).
