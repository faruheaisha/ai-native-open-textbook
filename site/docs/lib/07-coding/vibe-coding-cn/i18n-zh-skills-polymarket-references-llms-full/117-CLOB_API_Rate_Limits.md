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
pageSha256: "f288c530a4fc0ed9790ac08dd9e445c3b47e54e4fc3c28d3a1fca5d2ca8d37c3"
contentMode: "local-full"
zh: ""
---

## CLOB API Rate Limits

### General CLOB Endpoints

| Endpoint                      | Limit               | Notes                                              |
| ----------------------------- | ------------------- | -------------------------------------------------- |
| CLOB (General)                | 5000 requests / 10s | Throttle requests over the maximum configured rate |
| CLOB GET Balance Allowance    | 125 requests / 10s  | Throttle requests over the maximum configured rate |
| CLOB UPDATE Balance Allowance | 20 requests / 10s   | Throttle requests over the maximum configured rate |

### CLOB Market Data

| Endpoint          | Limit              | Notes                                              |
| ----------------- | ------------------ | -------------------------------------------------- |
| CLOB `/book`      | 200 requests / 10s | Throttle requests over the maximum configured rate |
| CLOB `/books`     | 80 requests / 10s  | Throttle requests over the maximum configured rate |
| CLOB `/price`     | 200 requests / 10s | Throttle requests over the maximum configured rate |
| CLOB `/prices`    | 80 requests / 10s  | Throttle requests over the maximum configured rate |
| CLOB `/midprice`  | 200 requests / 10s | Throttle requests over the maximum configured rate |
| CLOB `/midprices` | 80 requests / 10s  | Throttle requests over the maximum configured rate |

### CLOB Ledger Endpoints

| Endpoint                                                    | Limit              | Notes                                              |
| ----------------------------------------------------------- | ------------------ | -------------------------------------------------- |
| CLOB Ledger (`/trades` `/orders` `/notifications` `/order`) | 300 requests / 10s | Throttle requests over the maximum configured rate |
| CLOB Ledger `/data/orders`                                  | 150 requests / 10s | Throttle requests over the maximum configured rate |
| CLOB Ledger `/data/trades`                                  | 150 requests / 10s | Throttle requests over the maximum configured rate |
| CLOB `/notifications`                                       | 125 requests / 10s | Throttle requests over the maximum configured rate |

### CLOB Markets & Pricing

| Endpoint                | Limit              | Notes                                              |
| ----------------------- | ------------------ | -------------------------------------------------- |
| CLOB Price History      | 100 requests / 10s | Throttle requests over the maximum configured rate |
| CLOB Markets            | 250 requests / 10s | Throttle requests over the maximum configured rate |
| CLOB Market Tick Size   | 50 requests / 10s  | Throttle requests over the maximum configured rate |
| CLOB `markets/0x`       | 50 requests / 10s  | Throttle requests over the maximum configured rate |
| CLOB `/markets` listing | 100 requests / 10s | Throttle requests over the maximum configured rate |

### CLOB Authentication

| Endpoint      | Limit             | Notes                                              |
| ------------- | ----------------- | -------------------------------------------------- |
| CLOB API Keys | 50 requests / 10s | Throttle requests over the maximum configured rate |

### CLOB Trading Endpoints

| Endpoint                            | Limit                              | Notes                                                      |
| ----------------------------------- | ---------------------------------- | ---------------------------------------------------------- |
| CLOB POST `/order`                  | 2400 requests / 10s (240/s)        | BURST - Throttle requests over the maximum configured rate |
| CLOB POST `/order`                  | 24000 requests / 10 minutes (40/s) | Throttle requests over the maximum configured rate         |
| CLOB DELETE `/order`                | 2400 requests / 10s (240/s)        | BURST - Throttle requests over the maximum configured rate |
| CLOB DELETE `/order`                | 24000 requests / 10 minutes (40/s) | Throttle requests over the maximum configured rate         |
| CLOB POST `/orders`                 | 800 requests / 10s (80/s)          | BURST - Throttle requests over the maximum configured rate |
| CLOB POST `/orders`                 | 12000 requests / 10 minutes (20/s) | Throttle requests over the maximum configured rate         |
| CLOB DELETE `/orders`               | 800 requests / 10s (80/s)          | BURST - Throttle requests over the maximum configured rate |
| CLOB DELETE `/orders`               | 12000 requests / 10 minutes (20/s) | Throttle requests over the maximum configured rate         |
| CLOB DELETE `/cancel-all`           | 200 requests / 10s (20/s)          | BURST - Throttle requests over the maximum configured rate |
| CLOB DELETE `/cancel-all`           | 3000 requests / 10 minutes (5/s)   | Throttle requests over the maximum configured rate         |
| CLOB DELETE `/cancel-market-orders` | 800 requests / 10s (80/s)          | BURST - Throttle requests over the maximum configured rate |
| CLOB DELETE `/cancel-market-orders` | 12000 requests / 10 minutes (20/s) | Throttle requests over the maximum configured rate         |
