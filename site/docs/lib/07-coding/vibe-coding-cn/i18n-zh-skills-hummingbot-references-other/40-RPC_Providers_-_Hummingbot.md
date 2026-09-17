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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/other.md"
sourceRel: "i18n/zh/skills/hummingbot/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/other.md"
sourceSha256: "7bd57673fc3df5b901db36ae3eac6be136526e8e2dbb141702c9a6ebc26b607a"
pageSha256: "4daac8830709f9d6b2256bb7e693491606801748e6242171e8ffae75437d97b8"
contentMode: "local-full"
zh: ""
---

## RPC Providers - Hummingbot

**URL:** https://hummingbot.org/gateway/rpc

**Contents:**
- RPC Providers
- Overview¶
- Setup¶
- Supported Providers¶
  - Helius¶
  - Infura¶
- Troubleshooting¶
    - Provider Not Connecting¶
    - Rate Limiting¶

Starting with v2.9.0, deep integrations with leading RPC providers like Helius and Infura are available to optimize speed and reduce latency for DEX trading.

The RPC provider controls your bot's connection to the blockchain network, which is crucial in DEX trading because it directly impacts the speed, reliability, and security of your transactions. A robust node connection ensures:

When you set up Gateway initially, the standard nodeURL for each network uses default public RPC endpoints.

By adding an API key from a RPC provider (as shown below), you will override the default nodeURL for each supported network, ensuring more reliable and performant blockchain connectivity. This step is essential for optimal DEX trading performance.

Run gateway ping to check your current network and node connection:

Helius is a leading Solana validator and infrastructure provider, offering fast, reliable, and scalable RPC endpoints and other services.

Helius Supported Networks:

Adding Helius API Keys:

Create a free account at Helius to get your API key

Run gateway config helius update and add the API key. Alternatively, modify the file conf/rpc/helius.yml and restart Gateway.

Run gateway config solana update and change rpcProvider from url to helius. Alternatively, modify the file conf/chains/solana.yml and restart Gateway.

Adjust these settings in your conf/rpc/helius.yml file as needed for your deployment.

Infura, a division of Metamask, is a leading RPC provider for EVM-based networks.

Infura Supported Networks:

Adding Infura API Key:

Create a free account at Infura to get your API key

Run gateway config infura update and add the API key. Alternatively, modify the file conf/rpc/infura.yml and restart Gateway.

Run gateway config ethereum update and change rpcProvider from url to infura. Alternatively, modify the file conf/chains/ethereum.yml and restart Gateway.

Infura Configuration:

Adjust these settings in your conf/rpc/infura.yml file as needed for your deployment.

**Examples:**

Example 1 (unknown):
```unknown
>>> gateway ping

Gateway service is online.
Testing network status for 2 chains... 

ethereum (mainnet):
