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
pageSha256: "2922e4f4eeba9715deb24b8e5798f93f561128b4275f21e04e80fb92decc38e3"
contentMode: "local-full"
zh: ""
---

## Launch/Exit Hummingbot - Hummingbot

**URL:** https://hummingbot.org/client/launch-exit

**Contents:**
- Launch and Exit Hummingbot¶
- Launch via Docker¶
- Launch from source¶
- Exit Hummingbot¶

This page contains information on launching and exiting the application, assuming Hummingbot is installed already on your machine.

Check the list of running Docker containers

Take note of the container name and use the following command to attach to it using the command below -

If no containers are running, follow the steps below to create a Hummingbot instance.

Make sure the hummingbot conda environment is enabled.

In the hummingbot parent directory, run this command to launch the application:

As of version 1.19.0, use ./start command to launch hummingbot from source. Read more

Running the exit command cancels all outstanding orders and exit the Hummingbot interface. In case of errors, the command exit -f will force the application to close.

If you're running Hummingbot installed via binary, exiting Hummingbot by clicking the close window icon will leave your active orders open in the exchange.

You can also press the keyboard shortcut CTRL + C twice to exit.

**Examples:**

Example 1 (unknown):
```unknown
docker ps -a
```

Example 2 (unknown):
```unknown
docker attach [container_name]
```

Example 3 (unknown):
```unknown
git clone https://github.com/hummingbot/hummingbot
cd hummingbot
docker compose up -d
```

Example 4 (unknown):
```unknown
conda activate hummingbot
```
