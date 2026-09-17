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
pageSha256: "dbbaba5f08186f308374f2fc97dfc9cab14710366ed98a62847a05732c1c9c61"
contentMode: "local-full"
zh: ""
---

## Installation - Hummingbot

**URL:** https://hummingbot.org/hummingbot-api/installation/

**Contents:**
- Installation¶
- Prerequisites¶
- Install with Docker (Recommended)¶
  - 2. Run the setup script¶
  - 3. Start the API¶
- Install from Source (for Developers)¶
  - 1. Clone and setup¶
  - 2. Install dependencies¶
  - 3. Start the API in development mode¶

This guide covers all available installation methods for Hummingbot API.

The easiest way to get started with Hummingbot API is using Docker.

The setup script will:

Default credentials if you press Enter: admin / admin

This pulls the required Docker images and runs Hummingbot API using Docker Compose and the configuration defined in the docker-compose.yml file.

The API will be accessible at http://localhost:8000. You can view the interactive Swagger UI documentation at http://localhost:8000/docs.

If you're developing or contributing to Hummingbot API, you can install from source.

This starts the Broker and Postgres DB containers and runs the API using uvicorn with auto-reload enabled for development.

The API will be accessible at http://localhost:8000.

The Hummingbot API Client is a Python library that provides a convenient interface for interacting with the Hummingbot API.

Once installed, you can verify the API is running:

Open your browser and navigate to: - Interactive API docs: http://localhost:8000/docs - Alternative API docs: http://localhost:8000/redoc

The installation creates a .env file with your configuration. You can modify these settings:

If Docker containers fail to start:

If port 8000 is already in use on your system, you can change it by modifying the configuration depending on your setup:

Update the ports mapping in your docker-compose.yml file to use a different external port. For example, to use port 8001 instead:

Edit the ./run.sh script to include the --port flag in the uvicorn command. For example, to run on port 8001:

Make sure the new port you choose is not already in use.

For source installation issues:

After installation, proceed to the Quickstart Guide to learn how to:

**Examples:**

Example 1 (unknown):
```unknown
git clone https://github.com/hummingbot/hummingbot-api
cd hummingbot-api
```

Example 2 (unknown):
```unknown
git clone https://github.com/hummingbot/hummingbot-api
cd hummingbot-api
./setup.sh
```

Example 3 (unknown):
```unknown
make install
```

Example 4 (unknown):
```unknown
./run.sh --dev
```
