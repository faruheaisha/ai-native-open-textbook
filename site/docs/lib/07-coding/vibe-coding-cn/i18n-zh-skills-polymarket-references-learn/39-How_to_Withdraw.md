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
pageSha256: "a881cf7dd1da6099d4cd1e4dd7526dd681f4a4229e53dcbb09bdacce242f4f1d"
contentMode: "local-full"
zh: ""
---

## How to Withdraw

**URL:** llms-txt#how-to-withdraw

Source: https://docs.polymarket.com/polymarket-learn/deposits/how-to-withdraw

How to withdraw your cash balance from Polymarket.

Withdrawing from Polymarket is simple, instant, and free.

  &lt;Steps.Step>
    Go to the Polymarket funds page and click on the **Withdraw** button.
  &lt;/Steps.Step>

&lt;Steps.Step>
    Enter the USDC address you wish to withdraw to. Make sure the address
    supports USDC on the Polygon network. Then, enter the amount you want to
    withdraw.
  &lt;/Steps.Step>

&lt;Steps.Step>
    Click **Withdraw**. Your funds will be transferred instantly.
  &lt;/Steps.Step>

<iframe width="560" height="315" src="https://www.youtube.com/embed/fAXn0LCPTgA?si=JsYilGM3h0jSNBZa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />

  Note: When withdrawing USDC.e (bridged USDC) is swapped through the [Uniswap v3 pool](https://polygonscan.com/address/0xd36ec33c8bed5a9f7b6630855f1533455b98a418)
  for USDC (native) (the UI enforces less than 10bp difference in output
  amount). At times, this pool may be exhausted and for extremely large deposits
  there might not be enough liquidity. If you are having withdraw issues, try
  breaking your withdraw into smaller amounts or waiting for the pool to be
  rebalanced. Additionally, you can select to withdraw USDC.e directly which
  does not require any Uniswap liquidity; just be aware that some exchanges no
  longer allow USDC.e to be deposited directly.
