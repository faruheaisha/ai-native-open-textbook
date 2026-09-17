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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/references/llms-full.md"
sourceRel: "i18n/zh/skills/polymarket/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/polymarket/references/llms-full.md"
sourceSha256: "f2977ee42f8298e33bc8c8a0ee646bdd5f4e91e39de2641b8e15138a3174bd62"
pageSha256: "24de203bf323051d2823cc921b3a529d9bc015f884437be8df0a0cd66f4cc663"
contentMode: "local-full"
zh: ""
---

## Overview

The Polymarket Real-Time Data Socket (RTDS) is a WebSocket-based streaming service that provides real-time updates for various Polymarket data streams. The service allows clients to subscribe to multiple data feeds simultaneously and receive live updates as events occur on the platform.

&lt;Note>Polymarket provides a Typescript client for interacting with this streaming service. [Download and view it's documentation here](https://github.com/Polymarket/real-time-data-client)&lt;/Note>

### Connection Details

* **WebSocket URL**: `wss://ws-live-data.polymarket.com`
* **Protocol**: WebSocket
* **Data Format**: JSON

### Authentication

The RTDS supports two types of authentication depending on the subscription type:

1. **CLOB Authentication**: Required for certain trading-related subscriptions
   * `key`: API key
   * `secret`: API secret
   * `passphrase`: API passphrase

2. **Gamma Authentication**: Required for user-specific data
   * `address`: User wallet address

### Connection Management

The WebSocket connection supports:

* **Dynamic Subscriptions**: Without disconnecting from the socket users can add, remove and modify topics and filters they are subscribed to.
* **Ping/Pong**: You should send PING messages (every 5 seconds ideally) to maintain connection
