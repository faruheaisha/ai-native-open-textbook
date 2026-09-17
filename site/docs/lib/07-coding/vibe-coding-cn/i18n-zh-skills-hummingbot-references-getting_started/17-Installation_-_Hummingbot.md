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
pageSha256: "b499becc2de7da5f0d77fda829f37ff08174ceaf983ed146bcaf90db63568618"
contentMode: "local-full"
zh: ""
---

## Installation - Hummingbot

**URL:** https://hummingbot.org/installation/

**Contents:**
- Hummingbot V2 + Dashboard¶
- System Requirements¶
  - Cloud server or local machine¶
  - Docker Compose¶
- Installation Steps¶
- Standalone Hummingbot¶

Hummingbot 2.0 now features a Dashboard GUI, replacing the traditional CLI for a more intuitive experience.

The recommended installation method, especially for new users, is Hummingbot + Dashboard, allowing you to easily create, backtest, and deploy strategies.

Other standalone installation options like Docker and Source are still available.

Hummingbot uses Docker Compose, a tool for defining and running multi-container Docker applications.

Install Docker Desktop from the official Docker website

Desktop Users: Install Docker Desktop from official site

Headless Servers (VPS like AWS EC2 or Digital Ocean): curl -fsSL https://get.docker.com -o get-docker.sh sh get-docker.sh

Always run commands in: Ubuntu Terminal (Start Menu → Ubuntu)

Hummingbot Deploy is a dedicated repo that allows users to quickly deploy Hummingbot using the Dashboard as the front end UI. The compose file spins up containers for the Dashboard, Backend-API as well as the Hummingbot Broker.

The setup script will pull the Docker images defined in repo's docker-compose.yml file and start them as new containers:

After all containers have started, access the Dashboard at http://localhost:8501 in your browser.

If you are using a cloud server or VPS, replace localhost with the IP of your server. You may need to edit the firewall rules to allow inbound connections to the necessary ports.

Install from Source →

See Installation Overview for comparison of different methods.

**Examples:**

Example 1 (unknown):
```unknown
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

Example 2 (unknown):
```unknown
git clone https://github.com/hummingbot/deploy.git
cd deploy
bash setup.sh
```

Example 3 (unknown):
```unknown
[+] Running 7/7
 ✔ Network deploy_emqx-bridge   Created
 ✔ Volume "deploy_emqx-data"    Created
 ✔ Volume "deploy_emqx-log"     Created
 ✔ Volume "deploy_emqx-etc"     Created
 ✔ Container dashboard          Started 
 ✔ Container backend-api        Started 
 ✔ Container hummingbot-broker  Started
```
