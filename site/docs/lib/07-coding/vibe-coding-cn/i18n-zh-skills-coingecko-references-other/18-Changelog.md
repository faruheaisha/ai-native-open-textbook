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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/other.md"
sourceRel: "i18n/zh/skills/coingecko/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/other.md"
sourceSha256: "0475f27bdec749a3923243511fa9995a6b979ed924a086b9b9a02c5e9a1741a5"
pageSha256: "b5e6f71c3be554c43ec7e90019fa7ce7bb910e4808f66895bd8d795ccb911237"
contentMode: "local-full"
zh: ""
---

## Changelog

**URL:** llms-txt#changelog

Source: https://docs.coingecko.com/changelog

Product updates and announcements

export const GreenSeparator = () => (
  &lt;div style=&#123;&#123;
    height: '4px',
    background: 'linear-gradient(to right, transparent, #4BCC00, transparent)',
    margin: '20px 0 60px 0',
    border: 'none'
  &#125;&#125; />
);

  ## Websocket is now supported for Self-serve API subscribers

🗓️ **October 23, 2025**

### CoinGecko Websocket (Beta) is now available for [paid plan](https://www.coingecko.com/en/api/pricing) customers (Analyst plan & above)!

For Analyst, Lite, Pro, and Pro+ self-serve customers, you are now eligible to access the following Websocket features, and stream real-time data by utilising your monthly API plan credits:

* Max connections: 10 concurrent socket connections
  * Max subscriptions: 100 token or pool data subscription per channel, per socket
  * Channel Access: [all 4 channels](https://docs.coingecko.com/websocket#channel-%26-data-support)
  * Credit charge: **0.1** credit per response returned, deducting from monthly API plan credits

Please visit [Websocket](https://docs.coingecko.com/websocket) for full details, and test out Websocket data streaming. We will gradually improve the Websocket and expand the feature limits. Please share your feedback and suggestion via this [**survey form**](https://forms.gle/gNE1Txc9FCV55s7ZA), or email soonaik\@coingecko\[dot]com .

### Notice: Temporary Disruption on MagicEden data for NFT Endpoints

Due to recent updates to MagicEden's API, we are updating our integration. During this period, endpoints for NFT data may be temporarily unavailable or return incomplete information.
