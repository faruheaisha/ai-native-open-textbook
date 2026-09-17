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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/compression.md"
sourceRel: "i18n/zh/skills/timescaledb/references/compression.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/compression.md"
sourceSha256: "488dd1571052c58332a963deed8b1dbd3633dc2724e884eef2085c4098409ec7"
pageSha256: "97c006d2be3fb3bdab5e94d318b79cec6c190b397ff0a5751224369442155b9e"
contentMode: "local-full"
zh: ""
---

### Agent Mode for PopSQL

Introducing Agent Mode, a new feature in Timescale Console SQL Assistant. SQL Assistant lets you query your database using natural language. However, if you ran into errors, you have to approve the implementation of the Assistant's suggestions.

With Agent Mode on, SQL Assistant automatically adjusts and executes your query without intervention. It runs, diagnoses, and fixes any errors that it runs into until you get your desired results.

Below you can see SQL Assistant run into an error, identify the resolution, execute the fixed query, display results, and even change the title of the query:

![Timescale SQL Assistant Agent Mode](https://assets.timescale.com/docs/images/timescale-sql-assistant-agent-mode.gif)

To use Agent Mode, make sure you have SQL Assistant enabled, then click on the model selector dropdown, and tick the `Agent Mode` checkbox.
