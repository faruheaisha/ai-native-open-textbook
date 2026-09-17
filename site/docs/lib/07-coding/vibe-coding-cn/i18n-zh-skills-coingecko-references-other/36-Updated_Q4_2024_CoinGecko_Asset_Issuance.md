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
pageSha256: "ec55509b70296fddf2e7ebc9f250d7fd628d6a8313f16526520c8448523f02d0"
contentMode: "local-full"
zh: ""
---

## \[Updated: Q4 2024] CoinGecko Asset Issuance Standardisation Initiative Updates

🗓️ **December 17, 2024**

As part of our commitment to improving data quality and enhancing the consistency of asset information, we are rolling out an asset standardization initiative at CoinGecko.

**What is asset standardization?**\
  Standardization involves refining how we classify and display assets. By systematically organizing asset listings into more precise categories - such as native, bridged, or wrapped tokens each following specific naming conventions, we aim to eliminate confusion and enhance data reliability.

**What changes should I expect?**\
  The most notable change is that non-native token contracts previously grouped under native asset listings will now be assigned their own distinct pages.

For example, a bridged version of USDT that might have been aggregated under the original, native USDT page, will now be featured on a dedicated page specifically for that bridged variant.

Additionally, there may be varying levels of changes in various aggregated data points of the standardized assets, including trading volume, supply, market cap rankings, etc., due to misplaced contracts being transitioned away from the original page to accurately reflect their true metrics.

**Focus for Q3 2024** **\[Completed ✅]**

* [Wrapped Bitcoin (WBTC)](https://www.coingecko.com/en/coins/wrapped-bitcoin)
  * [Wrapped Ethereum (WETH)](https://www.coingecko.com/en/coins/weth)
  * [Dai (DAI)](https://www.coingecko.com/en/coins/dai)

\*\*For full list of FAQs and updated infomation, please refer [here](https://support.coingecko.com/hc/en-us/articles/35555248857497-CoinGecko-Asset-Issuance-Standardisation-Initiative-Updates-and-FAQ)

### What's New in Q4 2024? 👈

Building on Q3's achievements, we're expanding the scope of Standardization to include four additional Coins this quarter, selected based on their significance and impact on the DeFi ecosystem.

* [Frax (FRAX)](https://www.coingecko.com/en/coins/frax)
  * [Wrapped AVAX (WAVAX)](https://www.coingecko.com/en/coins/wrapped-avax)
  * [Wrapped BNB (WBNB)](https://www.coingecko.com/en/coins/wbnb)
  * [Wrapped stETH (wstETH)](https://www.coingecko.com/en/coins/wrapped-steth)

### Tips and FAQs for API users

#### **1. How does this affect my current API setup?**

The following CoinGecko API endpoints will be impacted, with full details tracked in [this spreadsheet](https://docs.google.com/spreadsheets/d/15FyY1gvUi20LdnlJRly-pXvm5ATNbFbSy06VoI1vVs4/edit?usp=sharing). We encourage you to make the necessary adjustments and enable edit notifications on the Google Sheets, to receive real-time updates when non-native token contracts have been successfully standardized.

* /simple/price
  * /simple/token\_price/id

* /coins/markets
  * /coins/id
  * /coins/id/tickers
  * /coins/id/history
  * /coins/id/market\_chart
  * /coins/id/market\_chart/range
  * /coins/id/ohlc
  * /coins/id/ohlc/range
  * /coins/id/circulating\_supply\_chart
  * /coins/id/circulating\_supply\_chart/range
  * /coins/id/total\_supply\_chart
  * /coins/id/total\_supply\_chart/range

* /coins/id/contract/contract\_address
  * /coins/id/contract/contract\_address/market\_chart
  * /coins/id/contract/contract\_address/market\_chart/range

* /exchanges/id/tickers
  * /exchanges/id/volume\_chart
  * /exchanges/id/volume\_chart/range

#### **2. Do I have to make changes to my API?**

**No changes are necessary** if you do not need data for non-native token contracts that will be separated away from the native tokens.

#### **3. What will happen to the coins that are separated into a new coin page?**

Historical data for new non-native or bridged assets will only be available from the date of asset page creation (i.e. stnadardized). To access historical data prior to the asset standardization, we recommend retrieving data from the original native assets.

#### **4. How do I identify the list of coins that will be separated?**

For a finalised list of token contracts and API IDs that have been separated from its native asset page and listed individually, please refer to this [Google Sheets](https://docs.google.com/spreadsheets/d/15FyY1gvUi20LdnlJRly-pXvm5ATNbFbSy06VoI1vVs4/edit?usp=sharing)

You may also identify the list of bridged coins via API: you may also use [/categories/list endpoint](https://docs.coingecko.com/reference/coins-categories-list) to look for bridged categories such as:

1. bridged-usdc
  2. bridged-wbtc
  3. bridged-weth

Then you may use [/coins/market endpoint](https://docs.coingecko.com/reference/coins-markets) to retrieve the list of coins
