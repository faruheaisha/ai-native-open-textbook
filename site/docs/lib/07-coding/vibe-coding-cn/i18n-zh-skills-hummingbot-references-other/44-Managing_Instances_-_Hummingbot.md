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
pageSha256: "8100ed3a775e764ffc154b7cd40af3c339b147ae8cb57963a3d8693b977a18e5"
contentMode: "local-full"
zh: ""
---

## Managing Instances - Hummingbot

**URL:** https://hummingbot.org/dashboard/instances/

**Contents:**
- Managing Instances¶
- Local Instances¶
- Stopping an Instance¶
- Restarting an Instance¶

The Instances page in the Hummingbot Dashboard is designed to monitor and manage your active trading bot instances. It provides a real-time overview of the performance and status of each running instance, offering valuable metrics and logs to help you keep track of your bots’ activities.

Instance Information: Displays details about the currently running instance, including the instance name and the time it started.

If you need to manually connect to the Docker container in the terminal, you can copy the full instance name in the top left corner and then in the terminal do docker attach [instance name]

A table listing all active controllers (trading strategies) within the instance. Each row in the table provides detailed information about a specific controller, including:

If an instance was stopped using the STOP button, the instance will move from the Active Controllers section to the Stopped Controllers section.

Check the box next to the instance you want to resume and then click the START button
