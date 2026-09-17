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
pageSha256: "2f75a96f5824f6c159f75676cefa2ce9114cebb836934f1545630877b0b85057"
contentMode: "local-full"
zh: ""
---

### SQL Assistant improvements

We made a few improvements to SQL Assistant:

**Dedicated SQL Assistant threads** 🧵

Each query, notebook, and dashboard now gets its own conversation thread, keeping your chats organized.

![Dedicated threads](https://assets.timescale.com/docs/images/timescale-cloud-sql-assistant-threads.gif)

**Delete messages** ❌

Made a typo? Asked the wrong question? You can now delete individual messages from your thread to keep the conversation clean and relevant.

![Delete messages in SQL Assistant threads](https://assets.timescale.com/docs/images/timescale-cloud-sql-assistant-delete-messages.png)

**Support for OpenAI `o3-mini` ⚡**

We’ve added support for OpenAI’s latest `o3-mini` model, bringing faster response times and improved reasoning for SQL queries.

![SQL Assistant o3 mini](https://assets.timescale.com/docs/images/timescale-cloud-sql-assistant-o3-mini.png)

## 🌐 IP Allowlists in Data Mode and PopSQL

<Label type="date">January 31, 2025</Label>

For enhanced network security, you can now also create IP allowlists in the Timescale Console data mode and PopSQL. Similarly to the [ops mode IP allowlists][ops-mode-allow-list], this feature grants access to your data only to certain IP addresses. For example, you might require your employees to use a VPN and add your VPN static egress IP to the allowlist.

This feature is available in:

- [Timescale Console][console] data mode, for all pricing tiers
- [PopSQL web][popsql-web]
- [PopSQL desktop][popsql-desktop]

Enable this feature in PopSQL/Timescale Console data mode > `Project` > `Settings` > `IP Allowlist`:

![Timescale Console data mode IP allowlist](https://assets.timescale.com/docs/images/timescale-data-mode-ip-allowlist.png)

## 🤖 pgai Extension and Python Library Updates
<Label type="date">January 24, 2025</Label>
