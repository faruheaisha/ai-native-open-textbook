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
pageSha256: "c0e968f62e0b025c7752cc8523f7485b09c63c732e42ff11627632936f68191a"
contentMode: "local-full"
zh: ""
---

## WSS Overview

**URL:** llms-txt#wss-overview

**Contents:**
- Overview
- Subscription

Source: https://docs.polymarket.com/developers/CLOB/websocket/wss-overview

Overview and general information about the Polymarket Websocket

The Polymarket CLOB API provides websocket (wss) channels through which clients can get pushed updates. These endpoints allow clients to maintain almost real-time views of their orders, their trades and markets in general. There are two available channels `user` and `market`.

To subscribe send a message including the following authentication and intent information upon opening the connection.

| Field       | Type      | Description                                                                 |
| ----------- | --------- | --------------------------------------------------------------------------- |
| auth        | Auth      | see next page for auth information                                          |
| markets     | string\[] | array of markets (condition IDs) to receive events for (for `user` channel) |
| assets\_ids | string\[] | array of asset ids (token IDs) to receive events for (for `market` channel) |
| type        | string    | id of channel to subscribe to (USER or MARKET)                              |

Where the `auth` field is of type `Auth` which has the form described in the WSS Authentication section below.
