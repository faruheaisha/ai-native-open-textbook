---
title: "How to Withdraw"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/references/llms-full.md"
sourceRel: "i18n/zh/skills/polymarket/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/polymarket/references/llms-full.md"
sourceSha256: "f2977ee42f8298e33bc8c8a0ee646bdd5f4e91e39de2641b8e15138a3174bd62"
pageSha256: "cd3d015a7fc8e4f923a6ce29d75176bc5d735def2adee9670e45f2f4451368f9"
contentMode: "local-full"
zh: ""
---

# How to Withdraw
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

# Large Cross Chain Deposits
Source: https://docs.polymarket.com/polymarket-learn/deposits/large-cross-chain-deposits

**For deposits over \$50,000 we recommended to use bridges and ensure minimal fee's (slippage).**
