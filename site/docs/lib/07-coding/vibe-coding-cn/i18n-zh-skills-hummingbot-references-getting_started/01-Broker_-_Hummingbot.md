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
pageSha256: "7c8511c4cfa5c35dafd7e4fa13bc8d7a53999d6ad532871fdabd8ab149dc5ac9"
contentMode: "local-full"
zh: ""
---

## Broker - Hummingbot

**URL:** https://hummingbot.org/installation/orchestration

**Contents:**
- Broker
- Phase I¶
- Phase II¶
- Future phases¶

Hummingbot's brokers module allows for remote control and monitoring of multi-bot environments in a distributed context , so that bots can "live" on different machines and infrastructures (e.g. having a bot local and another bot on AWS).

To achieve this approach, there is an MQTT layer for bots to connect remotely to message brokers, as a single point of reference, using asynchronous bidirectional communication channels (push/pull). In this architecture, bots can be considered as clients to the overall environment. Bot scaling is seamless and does not require any further setup, anyone can connect any number of bots the a message broker (e.g. RabbitMQ, EMQX etc) without any other dependencies.

See the following repos for more information:

Watch the February 2023 community call that contains a demo of this feature:

Thanks to klpanagi and TheHolyRoger for your work! 🙏

In this Phase, an event and data layer will be integrated into the Hummingbot codebase to support receiving and handling remote events via the message broker (MQTT), such as the case of TradingView signals.

An MQTTEventListener will be developed and integrated into the hummingbot codebase, which will provide configuration for setting the URIs of the events to listen on. Upon receiving an event, a handling callback provided by the user/developer will be executed by the MQTTEventListener, so that users operate/develop their strategy based on the input event.

See this Notion doc for an overview of the project. This is an ongoing project funded by Proposal HIP-20.
