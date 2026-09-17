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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/connectors.md"
sourceRel: "i18n/zh/skills/hummingbot/references/connectors.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/connectors.md"
sourceSha256: "16ff6b5efa43a0629074cd926d8e11b244d1cda26f6f4eee157acd5d0c75f303"
pageSha256: "01704cd3194b864c946910f676bd07f0dea08b94955348a820a4d11d43bb48f8"
contentMode: "local-full"
zh: ""
---

## 🔥 dYdX - Hummingbot

**URL:** https://hummingbot.org/exchanges/dydx/

**Contents:**
- 🔥 dYdX
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- ⚙️ Install Instructions¶
  - Docker¶
  - Source¶
- 🔑 How to Connect to dYdX (v4)¶
  - Generate API Keys¶
  - Add Keys to Hummingbot¶
- 🔀 Perp Connector¶

dYdX is a sponsor of Hummingbot Foundation, so when you use Hummingbot to run bots on dYdX, you're supporting the Foundation and our mission to democratize algo trading with open source software.

At the moment there are some issues with dependencies and installing dydx can be a bit trickier due to some software conflicts. We've created these simple instructions to get you up and running quickly using either Docker or Source.

Open your docker-compose.yml file. This file is usually located in your Hummingbot project directory.

Update the image line. Find the line that starts with image: under the hummingbot service. Change it to the following, depending on whether you are trying to run the latest or development branch.

For latest stable version:

For development version:

After cloning the Hummingbot repo, use the --dydx flag when running the install command

See below for the full commands:

Open the dYdX exchange platform and connect your wallet (e.g., MetaMask or another supported wallet). This will allow you to interact with the exchange and manage your funds.

Once your wallet is connected, deposit USDC into your dYdX account. USDC is required for trading on the platform.

Access Your Wallet Connection:

In the top right corner of the dYdX interface, locate and click on your wallet icon or address. This will open the wallet connection settings.

Copy Your dYdX Chain Address:

At the top of the wallet connection settings window, you’ll find your dYdX Chain Address. Copy this address and keep it secure for future reference.

Export Your Secret Phrase:

You will need the following to connect Hummingbot to dydx_v4_perpetual:

From inside the Hummingbot client, run connect dydx_v4_perpetual in Hummingbot in order to connect your wallet:

Integration to perpetual futures markets API endpoints

This connector supports the following OrderType constants:

This connector supports the following position modes:

This exchange offers a staging (testnet) mode: https://v4.testnet.dydx.exchange/

While users can trade on testnet using the link above, it is not currently supported in Hummingbot.

**Examples:**

Example 1 (unknown):
```unknown
image: hummingbot/hummingbot:latest_dydx
```

Example 2 (unknown):
```unknown
image: hummingbot/hummingbot:development_dydx
```

Example 3 (unknown):
```unknown
./install --dydx
```

Example 4 (unknown):
```unknown
git clone https://github.com/hummingbot/hummingbot.git
cd hummingbot
./install --dydx
conda activate hummingbot
./compile
```
