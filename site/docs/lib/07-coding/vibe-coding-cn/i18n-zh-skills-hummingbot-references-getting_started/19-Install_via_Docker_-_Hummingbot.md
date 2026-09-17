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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/getting_started.md"
sourceRel: "i18n/zh/skills/hummingbot/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/getting_started.md"
sourceSha256: "aee68b742e5dcbc964624d10833db685d054e63a53b7e60a19dcbb50ba658356"
pageSha256: "a38419d552fba2d697b698a44b4572d453a4ae1e51ca0368ff9a5ecc29127721"
contentMode: "local-full"
zh: ""
---

## Install via Docker - Hummingbot

**URL:** https://hummingbot.org/installation/docker/

**Contents:**
- Install via Docker
- Install Docker Compose¶
- Installation (Client Only)¶
  - Clone Hummingbot Repo¶
  - Launch Hummingbot¶
  - Attach to Instance¶
- Dev Branch | Older Versions¶
  - Development Branch¶
  - Previous Versions¶
- Gateway: Required for DEX Trading¶

We recommend installing Hummingbot using Docker if you want the simplest, easiest installation method and don't need to modify the Hummingbot codebase.

Hummingbot uses Docker Compose, a tool for defining and running multi-container Docker applications.

Install Docker Desktop from the official Docker website

Desktop Users: Install Docker Desktop from official site

Headless Servers (VPS like AWS EC2 or Digital Ocean): curl -fsSL https://get.docker.com -o get-docker.sh sh get-docker.sh

Always run commands in: Ubuntu Terminal (Start Menu → Ubuntu)

These instructions help you launch the standalone Hummingbot client.

Open a terminal and run the following commands to clone the Hummingbot Github repo and enter the root folder:

This will start to download the latest Hummingbot image if it's not already on your system.

The -d flag runs Hummingbot in detached mode. Attach to it by running the command:

You should now see the Hummingbot welcome screen:

To get started with Hummingbot, check out the following pages and guides:

If you need to install the development branch or an older version of Hummingbot, follow these steps:

To use the latest development version, browse to the hummingbot folder and open the docker-compose.yml file using any text editor. Look for the image field, and replace latest with development.

To install a specific older version, replace the image field with the desired version. The version tags will follow this format: version-x.x.x For example, to install version 2.0.0, replace the image field with:

Essential for Decentralized Exchanges

Gateway must be installed separately to trade on these supported DEXs: - Uniswap (Ethereum) - PancakeSwap (BNB Chain) - Trader Joe (Avalanche) - dYdX (Starkware) - And 30+ others

Gateway acts as middleware that enables Hummingbot to interact with blockchain-based decentralized exchanges. To set up, follow the instructions in Gateway - Installation to generate certificates and connect Gateway to Hummingbot.

**Examples:**

Example 1 (unknown):
```unknown
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

Example 2 (unknown):
```unknown
git clone https://github.com/hummingbot/hummingbot.git
  cd hummingbot
```

Example 3 (unknown):
```unknown
docker compose up -d
```

Example 4 (unknown):
```unknown
docker attach hummingbot
```
