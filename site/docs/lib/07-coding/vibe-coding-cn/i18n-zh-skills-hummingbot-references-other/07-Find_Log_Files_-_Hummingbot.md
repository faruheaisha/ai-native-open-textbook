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
pageSha256: "69b56d96c81dfdd4d10b00144b4b844babc2db320ea54d09eb6dbbc15105cc21"
contentMode: "local-full"
zh: ""
---

## Find Log Files - Hummingbot

**URL:** https://hummingbot.org/client/log-files

**Contents:**
- Log Files¶
  - Viewing log configurations¶
  - Viewing individual log files¶
  - Log file management¶

As Hummingbot is an in-progress and open-access software, logs are stored locally in your computer each time an instance is run. While the bot is active, record of status updates, results of specified checks and behaviors, as well as error tracing is encoded in the log files.

The way that log files are structured is contained within conf/hummingbot_logs.yml. For now, we request that users leave the log settings at the defaults. This makes it easier for the Hummingbot team to trace bugs and other problems that users face when logs are submitted.

For users who wish to locate and submit log files, generally they are located in the /logs folder. Specific path or location may vary depending on the environment and how Hummingbot was installed.

A separate log file will now be generated daily. When a new log file is created, if there are more than 7 files, the oldest ones will be deleted in order to limit disk storage usage. The log rotation feature was added in Hummingbot version 0.17.0.

If you are looking for support in handling errors or have questions about behavior reported in logs, you can find ways of contacting the team or community in our support section.
