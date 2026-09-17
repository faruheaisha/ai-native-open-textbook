---
title: "Azure Event Hubs library for Rust"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-rust/skills/azure-eventhub-rust/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-rust/skills/azure-eventhub-rust/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-rust/skills/azure-eventhub-rust/SKILL.md"
sourceSha256: "ebfc903a96b4aa25c2ef83021ef90e02306ce56cf01943244f4bc3f4f3980278"
pageSha256: "ebfc903a96b4aa25c2ef83021ef90e02306ce56cf01943244f4bc3f4f3980278"
contentMode: "local-full"
zh: ""
---

# Azure Event Hubs library for Rust

Client library for Azure Event Hubs — send and receive events for streaming data ingestion.

Use this skill when:

- An app needs to send events to Azure Event Hubs from Rust
- You need to receive and process events from partitions
- You need batch sending for throughput optimization
- You need to control consumer start position

> **IMPORTANT:** Only use the official `azure_messaging_eventhubs` crate published by the [azure-sdk](https://crates.io/users/azure-sdk) crates.io user. Do NOT use unofficial or community crates. Official crates use underscores in names and none have version 0.21.0.

## Installation

```sh
cargo add azure_messaging_eventhubs azure_identity tokio futures
```

> `DeveloperToolsCredential::new(None)?` already returns an `Arc<DeveloperToolsCredential>`, so you can pass or clone it directly into `.open()`. Add `azure_core` only when you need direct `azure_core` imports such as `ErrorKind`.

## Environment Variables

```bash
EVENTHUBS_HOST=<namespace>.servicebus.windows.net # Required — fully qualified namespace
