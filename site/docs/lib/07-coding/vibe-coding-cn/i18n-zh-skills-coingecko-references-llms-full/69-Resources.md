---
title: "Useful Links"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/llms-full.md"
sourceRel: "i18n/zh/skills/coingecko/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/llms-full.md"
sourceSha256: "a3cd0a16407a7e6b85ceb3cc714181ec1aecb3fdb5043afd1a82ec9cfdea8ec8"
pageSha256: "d3a328e7a5d60b7ab07b461225445766bd327cfbcfacf0f868758dfafaab0c70"
contentMode: "local-full"
zh: ""
---

# Useful Links
Source: https://docs.coingecko.com/docs/useful-links

Some of the useful links to help you navigate while using the CoinGecko API

#### Pricing Page and Top FAQs

* [https://www.coingecko.com/en/api/pricing#general](https://www.coingecko.com/en/api/pricing#general)

#### CoinGecko API Status

* [https://status.coingecko.com/](https://status.coingecko.com/)

#### CoinGecko API ID List

* [Google Sheets](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU)

#### [Pro Swagger JSON (OAS)](https://docs.coingecko.com/reference/endpoint-overview)

* CoinGecko Pro API — [coingecko-pro.json](https://raw.githubusercontent.com/coingecko/coingecko-api-oas/refs/heads/main/coingecko-pro.json)
* GeckoTerminal Onchain API (Pro) — [onchain-pro.json](https://raw.githubusercontent.com/coingecko/coingecko-api-oas/refs/heads/main/onchain-pro.json)

#### [Public/Demo Swagger JSON (OAS)](https://docs.coingecko.com/v3.0.1/reference/endpoint-overview)

* CoinGecko Public/Demo API — [coingecko-demo.json](https://raw.githubusercontent.com/coingecko/coingecko-api-oas/refs/heads/main/coingecko-demo.json)
* GeckoTerminal Onchain API (Demo) — [onchain-demo.json](https://raw.githubusercontent.com/coingecko/coingecko-api-oas/refs/heads/main/onchain-demo.json)

#### Subscribe CoinGecko API newsletter update

* [https://newsletter.coingecko.com/landing/api\_updates\_subscribe](https://newsletter.coingecko.com/landing/api_updates_subscribe)

#### CoinGecko Methodologies (Price, Volume, Trust Score, etc.)

* [https://www.coingecko.com/en/methodology](https://www.coingecko.com/en/methodology)

#### Using `llms.txt` for AI use cases

* [/llms-full.txt](https://docs.coingecko.com/llms-full.txt)

#### Attributing CoinGecko Brand

* [https://brand.coingecko.com/resources/attribution-guide](https://brand.coingecko.com/resources/attribution-guide)

# Introduction
Source: https://docs.coingecko.com/index

Started in 2014, CoinGecko is the world's largest independent crypto data aggregator that is integrated with more than 1,000 crypto exchanges and lists more than 18,000 coins across 600+ categories. CoinGecko API offers the most comprehensive and reliable crypto market data through RESTful JSON endpoints.

CoinGecko API now serves **onchain DEX data** across 250+ blockchain networks, 1,700+ decentralized exchanges (DEXes), and 15M+ tokens, powered by GeckoTerminal.

Thousands of forward-thinking projects, Web3 developers, researchers, institutions, and enterprises use our API to obtain **price feeds, market data, metadata, and historical data of crypto assets, NFTs, and exchanges**.

Here are some of the **common use cases** for clients who use CoinGecko API:

* Crypto Exchanges (CEX, DEX), Trading Apps
* Wallets (Hot, Cold)
* Data Aggregator, Crypto Screener, Analytics Dashboard
* AI Agents, DeFAI Apps
* Block Explorer, Portfolio Tracker
* DeFi Protocols, NFT Marketplaces, Digital Bank
* Backtesting Trading Strategy
* Accounting, Tax, Audit, HR Payroll
* Research & Analysis: Media, Institution, Academic, VC, Financial
* Oracles, Bots, Payments, E-commerce

🔥 New: [WebSocket API](https://docs.coingecko.com/websocket)

    &lt;img src="https://mintcdn.com/coingecko/VlaOc2UnIs8mj72v/images/wss-banner-1.png?fit=max&auto=format&n=VlaOc2UnIs8mj72v&q=85&s=bd74fb20a26084018272eb6b63010804" noZoom data-og-width="2400" width="2400" data-og-height="470" height="470" data-path="images/wss-banner-1.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/VlaOc2UnIs8mj72v/images/wss-banner-1.png?w=280&fit=max&auto=format&n=VlaOc2UnIs8mj72v&q=85&s=bc17e03ee25137fbcc1eaac0733e6781 280w, https://mintcdn.com/coingecko/VlaOc2UnIs8mj72v/images/wss-banner-1.png?w=560&fit=max&auto=format&n=VlaOc2UnIs8mj72v&q=85&s=d8439f50c69e11ba595b6c07d97eb65c 560w, https://mintcdn.com/coingecko/VlaOc2UnIs8mj72v/images/wss-banner-1.png?w=840&fit=max&auto=format&n=VlaOc2UnIs8mj72v&q=85&s=8c232633716268ced5b171e3e38acbf5 840w, https://mintcdn.com/coingecko/VlaOc2UnIs8mj72v/images/wss-banner-1.png?w=1100&fit=max&auto=format&n=VlaOc2UnIs8mj72v&q=85&s=3ac0be8afcc3e9fba5b4c4a961c5cda7 1100w, https://mintcdn.com/coingecko/VlaOc2UnIs8mj72v/images/wss-banner-1.png?w=1650&fit=max&auto=format&n=VlaOc2UnIs8mj72v&q=85&s=b8e71e426137d6f26642360aa8f1c347 1650w, https://mintcdn.com/coingecko/VlaOc2UnIs8mj72v/images/wss-banner-1.png?w=2500&fit=max&auto=format&n=VlaOc2UnIs8mj72v&q=85&s=eb7699818b518264b9c3c65c5ec5a633 2500w" />

With WebSocket, you can now stream ultra-low latency, real-time prices, trades, and OHLCV chart data. <br />
Subscribe to our [paid API plan](https://www.coingecko.com/en/api/pricing) (Analyst plan & above) to access WebSocket and REST API data delivery methods.

<br />

    Start by creating your CoinGecko API key

    Bring CoinGecko data to your AI apps

export const FooterFix = () => \{
  React.useEffect(() => \{
    const paginationElement = document.getElementById('pagination');
    if (paginationElement) paginationElement.remove();

    const footerElement = document.getElementById('footer');
    if (footerElement) footerElement.style.marginTop = '-40px';

    const feedbackToolbarClass = document.querySelector('.feedback-toolbar');
    if (feedbackToolbarClass) feedbackToolbarClass.style.paddingBottom = '0px';
  \}, []);

  return null;
\};

# 💼 API Usage
Source: https://docs.coingecko.com/reference/api-usage

reference/api-reference/coingecko-pro.json get /key
This endpoint allows you to **monitor your account's API usage, including rate limits, monthly total credits, remaining credits, and more**

  ### Note

  For a more comprehensive overview of your API usage, please log in to [https://www.coingecko.com/en/developers/dashboard](https://www.coingecko.com/en/developers/dashboard).

# Asset Platforms List (ID Map)
Source: https://docs.coingecko.com/reference/asset-platforms-list

reference/api-reference/coingecko-pro.json get /asset_platforms
This endpoint allows you to **query all the asset platforms on CoinGecko**

  ### Tips

  * You may use this endpoint to query the list of asset platforms for other endpoints that contain params like `id` or`ids`(asset platforms).
  * You may include NFT at the `filter` params to get the list of NFT-support asset platforms on CoinGecko.

# Authentication (Pro API)
Source: https://docs.coingecko.com/reference/authentication

Authentication method for CoinGecko Pro API (Paid plan subscribers with Pro-API keys)

  ### **Notes**

  * Pro API Key is only available for [CoinGecko API paid plan](https://www.coingecko.com/en/api/pricing) subscribers, the root URL for CoinGecko Pro API must be `https://pro-api.coingecko.com/api/v3/`.
  * You are recommended to store the API key securely in your own backend and use a proxy to insert the key into the request URL.
  * It's highly recommended to use the Headers method when making API requests for better security. Using query string parameters can risk exposing your API key.
