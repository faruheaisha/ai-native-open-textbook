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
pageSha256: "bbbbfcd01489551f50f58c3b1262238e9f1427ef4cbc698cfb4d21de8de26011"
contentMode: "local-full"
zh: ""
---

## Installation & Setup - Hummingbot

**URL:** https://hummingbot.org/gateway/installation/

**Contents:**
- Installation & Setup
- Install with Docker¶
- Install from Source¶
  - Install Prerequisites¶
  - Install and Setup Gateway¶
  - Run Setup Script¶
  - Optional: Generate Certificates¶
- Running Gateway¶
  - Development vs Production Modes¶
  - Development Mode (Default)¶

Hummingbot Gateway is an API/CLI client that exposes standardized REST endpoints to interact with blockchain networks and decentralized exchanges (DEXs). It provides a language-agnostic approach to interacting with these protocols through a unified interface.

There are two main ways to install Gateway:

This assumes that you want to use Gateway alongside Hummingbot to enable DEX trading. The Docker process enables seamless communication between the two services.

1 - Navigate to your Hummingbot directory

2 - Edit docker-compose.yml and uncomment the Gateway-related lines: gateway: restart: always container_name: gateway image: hummingbot/gateway:latest ports: - "15888:15888" volumes: - "./gateway-files/conf:/home/gateway/conf" - "./gateway-files/logs:/home/gateway/logs" - "./certs:/home/gateway/certs" environment: - GATEWAY_PASSPHRASE=admin - DEV=true

3 - Start both services docker compose up -d [+] Running 3/3 ✔ Network hummingbot_default Created 0.0s ✔ Container hummingbot Started 0.2s ✔ Container gateway Started

4 - Attach to Hummingbot docker attach hummingbot

After setting your password, you should see Gateway: 🟢 ONLINE in the upper right corner.

By default, Gateway runs in development mode (DEV=true) which uses HTTP for easier setup. For production environments requiring HTTPS, set DEV=false and ensure certificates are properly configured.

You can install Gateway on a standalone basis and then link it to Hummingbot manually. These instructions assume that you have already installed Hummingbot on the machine where you are installing Gateway, either from source or via Docker. See Installation for how to install Hummingbot.

Install the following dependencies:

The new version of Gateway uses pnpm instead of npm because it efficiently handles dependencies with a disk space-saving approach. Since Gateway imports multiple libraries with redundant dependencies, pnpm creates a single content-addressable storage for all packages, significantly reducing installation size and improving performance.

First, install NodeJS 20+ using the sudo administrator prefix: # For Ubuntu 20+ sudo apt update && sudo apt install -y curl curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - sudo apt install -y nodejs

Afterwards, install pnpm: sudo npm install -g pnpm

Clone the Gateway repo and navigate into the folder: # Clone repository git clone https://github.com/hummingbot/gateway.git cd gateway

Install and build Javascript dependencies defined in package.json: pnpm install pnpm build

The gateway-setup.sh script, located in the root Gateway directory, copies the default Gateway configuration files from /src/templates to /conf/ folder.

Run the script: pnpm run setup

The script will prompt you to select which configurations to update:

For a fresh installation, select all options. The script will preserve any existing wallet configurations and defaultWallet settings.

Certificate generation is optional. By default, Gateway runs in development mode (HTTP) which doesn't require certificates. You only need certificates if you want to run Gateway in production mode (HTTPS).

If you want to enable HTTPS mode for secure communication:

To connect Hummingbot to Gateway running in HTTPS mode, set gateway_use_ssl: true in Hummingbot's conf_client.yml.

Gateway can run in one of two modes:

Development Mode (HTTP) - Default

Production Mode (HTTPS) - Optional

HTTPS is no longer required to connect to Hummingbot. By default, both Gateway and Hummingbot are configured to use HTTP for easier setup. You can change the gateway_use_ssl setting in Hummingbot's conf_client.yml to switch between HTTP and HTTPS modes.

For development mode (HTTP), which is now the default and works with Hummingbot: pnpm start --passphrase=&lt;PASSPHRASE> --dev

Or simply: pnpm start --passphrase=&lt;PASSPHRASE>

The passphrase is required for endpoints that handle wallet operations.

If the server has started successfully, you should see: bigint: Failed to load bindings, pure JS will be used (try npm run rebuild?) ╔██████╗ █████╗ ████████╗███████╗██╗ ██╗ █████╗ ██╗ ██╗ ██╔════╝ ██╔══██╗╚══██╔══╝██╔════╝██║ ██║██╔══██╗╚██╗ ██╔╝ ██║ ███╗███████║ ██║ █████╗ ██║ █╗ ██║███████║ ╚████╔╝ ██║ ██║██╔══██║ ██║ ██╔══╝ ██║███╗██║██╔══██║ ╚██╔╝ ╚██████╔╝██║ ██║ ██║ ███████╗╚███╔███╔╝██║ ██║ ██║ ╚═════╝ ╚═╝ ╚═╝ ╚═╝ ╚══════╝ ╚══╝╚══╝ ╚═╝ ╚═╝ ╚═╝ 2025-04-04 10:09:59 | info | ⚡️ Gateway version 2.8.0 starting at http://localhost:15888 2025-04-04 10:09:59 | info | Checking for processes using port 15888... 2025-04-04 10:09:59 | info | No process found using port 15888 2025-04-04 10:09:59 | info | 🔴 Running in development mode with (unsafe!) HTTP endpoints 2025-04-04 10:09:59 | info | Read token file from conf/lists/solana.json, content length: 619791 2025-04-04 10:09:59 | info | Parsed token count: 3859 2025-04-04 10:09:59 | info | Loaded 3859 tokens for mainnet-beta 2025-04-04 10:09:59 | info | 📓 Documentation available at http://localhost:15888/docs

For production mode (HTTPS), which requires SSL certificates:

If the server has started successfully, you should see: bigint: Failed to load bindings, pure JS will be used (try npm run rebuild?) ╔██████╗ █████╗ ████████╗███████╗██╗ ██╗ █████╗ ██╗ ██╗ ██╔════╝ ██╔══██╗╚══██╔══╝██╔════╝██║ ██║██╔══██╗╚██╗ ██╔╝ ██║ ███╗███████║ ██║ █████╗ ██║ █╗ ██║███████║ ╚████╔╝ ██║ ██║██╔══██║ ██║ ██╔══╝ ██║███╗██║██╔══██║ ╚██╔╝ ╚██████╔╝██║ ██║ ██║ ███████╗╚███╔███╔╝██║ ██║ ██║ ╚═════╝ ╚═╝ ╚═╝ ╚═╝ ╚══════╝ ╚══╝╚══╝ ╚═╝ ╚═╝ ╚═╝ 2025-04-04 10:12:32 | info | ⚡️ Gateway version 2.8.0 starting at https://localhost:15888 2025-04-04 10:12:32 | info | Checking for processes using port 15888... 2025-04-04 10:12:32 | info | No process found using port 15888 2025-04-04 10:12:32 | info | 🟢 Running in secured mode with behind HTTPS endpoints 2025-04-04 10:12:33 | info | Read token file from conf/lists/solana.json, content length: 619791 2025-04-04 10:12:33 | info | Parsed token count: 3859 2025-04-04 10:12:33 | info | Loaded 3859 tokens for mainnet-beta 2025-04-04 10:12:33 | info | 📓 Documentation available at https://localhost:15888/docs

Once Gateway is running, go back to your Hummingbot client or restart it if you have exited. In the upper right corner, you should see GATEWAY: 🟢 ONLINE if your Hummingbot client is successfully connected to Gateway.

If you see GATEWAY: OFFLINE, check that:

Gateway provides interactive API documentation through Swagger UI when running in development mode. This interface allows you to:

To access the Swagger documentation:

Each endpoint in the documentation displays detailed information (method, path, description, parameters, request/response examples) and allows you to test API calls directly by filling in parameters and viewing the server's response.

The documentation is automatically generated from the Gateway route files, ensuring it's always up to date with the latest API changes.

**Examples:**

Example 1 (unknown):
```unknown
gateway:
   restart: always
   container_name: gateway
   image: hummingbot/gateway:latest
   ports:
     - "15888:15888"
   volumes:
     - "./gateway-files/conf:/home/gateway/conf"
     - "./gateway-files/logs:/home/gateway/logs"
     - "./certs:/home/gateway/certs"
   environment:
     - GATEWAY_PASSPHRASE=admin
     - DEV=true
```

Example 2 (unknown):
```unknown
docker compose up -d

[+] Running 3/3
 ✔ Network hummingbot_default  Created                                                                                                                                              0.0s 
 ✔ Container hummingbot        Started                                                                                                                                              0.2s 
 ✔ Container gateway           Started
```

Example 3 (unknown):
```unknown
docker attach hummingbot
```

Example 4 (unknown):
```unknown
# For Ubuntu 20+
sudo apt update && sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```
