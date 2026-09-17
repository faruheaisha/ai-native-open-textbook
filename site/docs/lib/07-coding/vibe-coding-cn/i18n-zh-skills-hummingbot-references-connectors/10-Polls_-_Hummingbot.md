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
pageSha256: "1c6de315503f301d9b3df79e505fd36281b4d7b4106b9bebc8f5440c507abd9f"
contentMode: "local-full"
zh: ""
---

## Polls - Hummingbot

**URL:** https://hummingbot.org/governance/polls/

**Contents:**
- Polls
- Poll Parameters¶
  - Connector Polls¶
  - Connector Pots¶
  - Connector Inclusion Threshold¶
- Polls Process¶

The Hummingbot open source codebase contains Connectors to various CEXs, DEXs and blockchain networks where users can execute automated trading strategies. The connected exchanges and networks are constantly changing and upgrading.

Each connector in the codebase requires ongoing maintenance, documentation and testing. The Foundation regularly reviews both new and existing connectors for security issues and breaking changes to ensure that they do not cause issues for other users. Without a way to maintain a high level of connector quality, the Hummingbot codebase may descend into an unusable spaghetti codebase.

Therefore, Polls allow HBOT holders to allocate maintenance bandwidth in the form of HBOT bounties toward the connectors in the codebase, as well as decide which connectors should be included going forward.

Prior to HGP-50, polls ranked connectors into Gold, Silver, and Bronze tiers. Afterwards, Polls allocate HBOT bounties among the connectors based on their pro-rata voting share, subject tor with a maximum allocation cap.

Each quarterly Epoch, HBOT voters vote on which connectors of each type should be included in the codebase, and how much HBOT maintenance bounty allocation should be assigned to each connector.

See Connectors for more information about the types of connectors.

Polls allocate a fixed pool of 3,000,000 HBOT (1,000,000 HBOT per poll) among the top exchanges for each Poll based on their pro-rata voting share. This per-exchange amount would be a public HBOT maintenance bounty allocation which the Foundation uses to fund bounties assigned to community developers for bug fixes and upgrades related to that exchange's Hummingbot connectors.

See the Connector Pots tab in HBOT Tracker for the current allocations for each exchange.

In each Poll, a connector needs to receive at least 400,000 HBOT in aggregate votes. Otherwise, the exchange's connectors will be removed from the Hummingbot codebase in the following monthly release.

During the first week of each quarter, the Foundation will create Hummingbot Governance Proposals in the HBOT Snapshot sub-space for each poll.

Each poll lasts for 14 days, and any Ethereum wallet holding HBOT tokens at poll creation may vote. 1 HBOT token equals 1 vote.

Afterwards, the Foundation will implement the approved changes in the subsequent release.
