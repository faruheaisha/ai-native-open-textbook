---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/agents.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/agents.md"
sourceSha256: "2701c99a56aa4313e4c59f6eb788100b1488b7b05d3135e992270e808de5849c"
pageSha256: "115ecd11a3ca21dd3abf53cb0fabc2d8a742cac6cc4ac5975a4f949562e470c9"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents User Location

- `BetaManagedAgentsUserLocation object`

  Approximate user location for search result localization.

  - `type: "approximate"`

    Location precision. Only "approximate" is supported.

  - `city: optional string or null`

    City name.

    minLength: 1, maxLength: 255

  - `country: optional string or null`

    Two-letter ISO 3166-1 country code, uppercase.

  - `region: optional string or null`

    Region or state name.

    minLength: 1, maxLength: 255

  - `timezone: optional string or null`

    IANA timezone identifier, e.g. "America/Los_Angeles".

    minLength: 1, maxLength: 255
