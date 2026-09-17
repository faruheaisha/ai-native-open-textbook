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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/coins.md"
sourceRel: "i18n/zh/skills/coingecko/references/coins.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/coins.md"
sourceSha256: "fb2cd6385ac7d21732c4716db3c685f6c264d3d3a3fe9b8efd0973eb2605d330"
pageSha256: "016638ab02752f63ee056681704fb36fe34140c8c7f480ac0a9e0bff6cc1cc68"
contentMode: "local-full"
zh: ""
---

## Access Real-Time Crypto Data Instantly with CoinGecko WebSockets

In the fast-paced world of cryptocurrency, speed matters. Our official CoinGecko WebSocket API provides a dedicated, persistent connection for real-time data streaming, ensuring you receive critical market updates the moment they happen.

Move beyond traditional polling and embrace the power of instant data delivery for your trading bots, dashboards, and analytical applications.

  CoinGecko Websocket (Beta) is now available for [paid plan ](https://www.coingecko.com/en/api/pricing)customers (Analyst plan & above)!

* For Analyst, Lite, Pro, and Pro+ self-serve customers, you will be eligible to access the following features, and stream real-time data by utilising your monthly API plan credits:
    * Max connections: 10 concurrent socket connections
    * Max subscriptions: 100 token or pool data subscription per channel, per socket
    * Channel Access: all 4 channels
    * Credit charge: 0.1 credit per response returned, deducting from monthly API plan credits

We will gradually improve the Websocket and expand the feature limits. Please share your feedback and suggestion via this [survey form](https://forms.gle/gNE1Txc9FCV55s7ZA), or email soonaik\@coingecko\[dot]com

* For existing **Enterprise plan** clients who wish to unlock higher limits (max connections, max subscriptions, and lower credit charge), please contact your Customer Success Manager.

### Channel & Data Support

| Websocket Channel                                             | Channel Code | Details                                                                                                       |
| ------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| [OnchainSimpleTokenPrice](https://docs.coingecko.com/websocket/onchainsimpletokenprice) | G1           | Subscribe to receive real-time price updates for tokens, as seen on GeckoTerminal.com                         |
| [CGSimplePrice](https://docs.coingecko.com/websocket/cgsimpleprice)                     | C1           | Subscribe to receive real-time price updates for tokens, as seen on CoinGecko.com                             |
| [OnchainTrade](https://docs.coingecko.com/websocket/wss-onchain-trade)                  | G2           | Subscribe to receive real-time transaction updates for pools, as seen on GeckoTerminal.com                    |
| [OnchainOHLCV](https://docs.coingecko.com/websocket/wssonchainohlcv/)                   | G3           | Subscribe to receive real-time OHLCV (Open, High, Low, Close, Volume) for pools, as seen on GeckoTerminal.com |
| (More coming soon!)                                           |              |                                                                                                               |

  ### **Notes**

* **Real-Time Data**: Once subscribed, you will start receiving real-time data updates based on your subscriptions. The received data will be in JSON format and will contain the relevant information for the subscribed event.
  * **Close Connection:** When you're done receiving updates or want to close the WebSocket connection, you can gracefully close the connection.
  * **Security Considerations:** Ensure that you keep your Pro-API key secure and do not expose it publicly in your code or any public repositories.

### Connection Handling

To provide you with the most reliable and efficient experience, please be aware of the following regarding our WebSocket connections:

1. **Connection Liveliness (Ping/Pong Mechanism):**
   * To ensure your connection remains active and healthy, we send a **"ping" signal every 10 seconds**.
   * If we **do not receive a "pong" response from your client within 20 seconds** of sending a ping, we will automatically disconnect the connection.
   * **Action Required (Client-Side)**: Your WebSocket client must be configured to respond to our ping messages with a pong. Most WebSocket libraries handle this automatically, but please verify your implementation to ensure it's sending pong responses. This is critical for maintaining your connection.
2. **Planned Disconnections (Deployments & Reboots):**
   * **Purpose**: From time to time, we will perform system reboots or deploy new versions of our service to implement updates, bug fixes, and improvements. These actions require a graceful restart of our servers.
   * **Impact**: During these periods, your active WebSocket connections might be temporarily disconnected.
   * **Action Required (Client-Side)**: It is essential that your application is designed to automatically attempt to re-establish the WebSocket connection if it detects a disconnection. Implementing an exponential backoff strategy for reconnection attempts is highly recommended to avoid overwhelming our servers during a widespread disconnection event.
