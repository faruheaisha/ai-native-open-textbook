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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/installation.md"
sourceRel: "i18n/zh/skills/timescaledb/references/installation.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/installation.md"
sourceSha256: "4a7b57ccaa9a9f7e4c22cc7a4a1dcd5ddf03b101b4f1914bcb18219176632044"
pageSha256: "57e9061fb7fc8308e67433beca0034573cde8f69114b81559253f9081846c2ed"
contentMode: "local-full"
zh: ""
---

## Supported platforms

You can deploy TimescaleDB on the following systems:

| Operation system              | Version                          |
|-------------------------------|----------------------------------|
| macOS                         | From 10.15 Catalina to 14 Sonoma |

For the latest functionality, install MacOS 14 Sonoma.

What next? [Try the key features offered by Tiger Data][try-timescale-features], see the [tutorials][tutorials],
interact with the data in your Tiger Cloud service using [your favorite programming language][connect-with-code], integrate
your Tiger Cloud service with a range of [third-party tools][integrations], plain old [Use Tiger Data products][use-timescale], or dive
into the [API reference][use-the-api].

===== PAGE: https://docs.tigerdata.com/self-hosted/install/installation-kubernetes/ =====

**Examples:**

Example 1 (bash):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Example 2 (bash):
```bash
brew tap timescale/tap
```

Example 3 (bash):
```bash
brew install timescaledb libpq
```

Example 4 (bash):
```bash
brew link --force libpq
```
