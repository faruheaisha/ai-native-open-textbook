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
pageSha256: "27c7557ae17d9f80c6a5e8900d33558db4c84eab5ee20ed3e2847fd28188b054"
contentMode: "local-full"
zh: ""
---

## Upcoming Change Notice: Removal of twitter\_followers Data

🗓️ **April 25, 2025**

**`Notice: Upcoming Change to CoinGecko API Endpoints - Removal oftwitter_followers Data`**

**Effective Date: 15 May 2025**

**Affected Endpoints:**

* [Coin Data by ID](https://docs.coingecko.com/reference/coins-id)
  * [Coin Data by Token Address](https://docs.coingecko.com/reference/coins-contract-address)
  * [Coin Historical Data by ID](https://docs.coingecko.com/reference/coins-id-history)

**Details of the Change:**

Please be advised that the `twitter_followers` data point within the `community_data` object will be removed from the above-listed API endpoints, effective 15 May 2025. This change is being implemented due to significant recent changes to the X (formerly Twitter) API, which have fundamentally altered how this specific data can be accessed.

Example of Affected Data Structure:

After the effective date, the `twitter_followers` field will no longer be present in the API responses for these endpoints.

If your applications or integrations currently rely on the `twitter_followers` data from these CoinGecko API endpoints, please make the necessary adjustments to your code before 15 May 2025 to avoid potential errors or data discrepancies.

**`Important Note Regarding Previously Storedtwitter_followers Data:`**

Please be aware that if you have previously stored `twitter_followers` data obtained from the CoinGecko API and archived it within your own systems, you are solely responsible for its continued use and any implications thereof.

We appreciate your understanding as we adapt to changes in third-party platforms to maintain the stability and reliability of our API. If you have any questions or require further clarification, please do not hesitate to contact our support team.

  ## New Endpoint & Multiple Improvements: On-Chain Top Token Holder Address, Security Data, Historical Supply.

🗓️ **March 28, 2025**

### \[Pro-API Exclusive] New Endpoint  - Top Token Holder Address Data

You can now access the top 50 token holder address data for tokens, as seen on GeckoTerminal.com.

By default, this endpoint returns the top 10 holders data, you can also specify the `holders` parameter to retrieve up to top 50 holders data.

**Network supported:**

* EVM: Ethereum, Polygon, BNB, Arbitrum, Optimism, Base
  * Solana
  * Sui
  * TON
  * Ronin

👉 Visit the endpoint reference page - [Top Token Holders by Token Address](https://docs.coingecko.com/reference/top-token-holders-token-address) to learn more and try it out now!

**Note:**  this exclusive endpoint is available for our API [paid plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan & above).

* The holders data is currently in **Beta**, with ongoing improvements to data quality, coverage, and update frequency.
  * For Solana tokens, the maximum number of retrievable top holders data is 40 instead of 50.

**Tips:** You may also use the following endpoints to retrieve **token holders count** and **top holders distribution percentage data**:

* [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  * [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)

### Historical Supply endpoints - Support for Inactive Coins

You may now access historical total and circulating supply data of inactive coins using the following endpoints. To check for list of inactive coins, you may use [Coin List (ID Map)](https://docs.coingecko.com/reference/coins-list) endpoint and flag `status=inactive`.

Note: these endpoints below are exclusive for [Enterprise plan](https://www.coingecko.com/en/api/pricing) customers only.

**Improved endpoints:**

* [Circulating Supply Chart by ID](https://docs.coingecko.com/reference/coins-id-circulating-supply-chart)
  * [Circulating Supply Chart within Time Range by ID](https://docs.coingecko.com/reference/coins-id-circulating-supply-chart-range)
  * [Total Supply Chart by ID](https://docs.coingecko.com/reference/coins-id-total-supply-chart)
  * [Total Supply Chart within time range by ID](https://docs.coingecko.com/reference/coins-id-total-supply-chart-range)

### Onchain Pool Data endpoints - Locked Liquidity

Now support **`locked_liquidity_percentage`** data.

**Improved endpoints:**

* [Specific Pool Data by Pool Address](https://docs.coingecko.com/reference/pool-address)
  * [Multiple Pools Data by Pool Addresses](https://docs.coingecko.com/reference/pools-addresses)

### Onchain Token Info endpoints - GT Score, Mint Authority, Freeze Authority

The following Token Info endpoints now provide more security related information:

* **GeckoTerminal Score Details** - Learn more about GT Score [here](https://support.coingecko.com/hc/en-us/articles/38381394237593-What-is-GT-Score-How-is-GT-Score-calculated).
    * **Pool** - Combination of pool signals such as honeypot risk, buy/sell tax, proxy contract, liquidity amount, and whether the liquidity is locked.
    * **Transaction** - Total number of transactions and trading volume in the last 24 hours.
    * **Creation** - Age of the pool since creation. The longer, the better it is for the score.
    * **Info** - Submitted social info and metadata to the token.
    * **Holders** - Distribution of tokens among unique addresses.
  * **Mint Authority**
  * **Freeze Authority**

**Improved endpoints:**

* [Token Info by Token Address](https://docs.coingecko.com/reference/token-info-contract-address)
  * [Pool Tokens Info by Pool Address](https://docs.coingecko.com/reference/pool-token-info-contract-address)

### Onchain Simple Token Price endpoint - Market Cap to FDV Fallback

The [Onchain Simple Token Price](https://docs.coingecko.com/reference/onchain-simple-price) endpoint now supports fallback option for Market Cap to return FDV value, when the Market Cap value is not available.

* If the token's market cap is not verified by the CoinGecko team, the onchain endpoints will return **null** for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Market Cap can be verified by and sourced from CoinGecko, and the number may be higher than FDV as it may include Market Cap of tokens issued on other blockchain network.

If you require the Market Cap key (`market_cap_usd`) to return FDV value (as seen on GeckoTerminal.com) when Market Cap data is unavailable, please specify this parameter `marketcap_fdv_fallback=true`.
