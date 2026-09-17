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
pageSha256: "aa83979eceef553be24ca53bd16b4fce950df44a6ee3f6346664cb4e1e28cfe9"
contentMode: "local-full"
zh: ""
---

## Building CLOB Connectors - Hummingbot

**URL:** https://hummingbot.org/developers/connectors

**Contents:**
- Building CLOB Connectors
- Exchange API Requirements¶
- Building Connectors¶
- Spot Connectors¶
- Perp Connectors¶
- Contributing Connectors¶
- Additional Resources¶

The information below are for developers building spot and perp connectors that integrate directly into the Hummingbot client. For information on developing gateway connectors that use Gateway, see Building Gateway Connectors.

See Exchange API Requirements for what the exchange API requirements needed to support the latest Hummingbot spot and perp connector standards.

To gain a deeper understanding for how Hummingbot connectors work, we recommend reading the following engineering posts from Hummingbot's original technical founder:

The following pages offer more details on various components and classes of a connector:

Spot connectors provide WebSocket and REST-based integrations to spot order book-based markets offered by an exchange, which may be centralized (CEX) or decentralized (DEX). Each connector is a folder in the hummingbot/connector/exchange folder.

Perp connectors provide WebSocket and REST-based integrations to perpetual futures order book-based markets offered by an exchange, which may be centralized (CEX) or decentralized (DEX). Each connector is a folder in the hummingbot/connector/derivative folder. By convention, these connector names end in _perpetual.

Introducing an exchange connector into the Hummingbot code base requires a mutual commitment from both the Hummingbot Foundation team and the contributing developers to maintaining a high standard of code quality and software reliability.

We encourage and welcome new connector contributions from the community, subject to the guidelines and expectations outlined below.

Here is an overview of the process to get a new connector merged into the codebase:

For questions, please visit the #developer-chat channel on our Discord.
