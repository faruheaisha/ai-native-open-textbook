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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hyperfunctions.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceSha256: "05b6221af2cc12adc9bdb276b06af82863fd7bcdfe4a673a0ed0f7f1a69d2184"
pageSha256: "18a5dbfc61f68dd016cbceb248455a8b0e99ffe1736c7cbe2bee26962c898d7a"
contentMode: "local-full"
zh: ""
---

## Available hyperfunctions

Here is a list of all the hyperfunctions provided by TimescaleDB. Hyperfunctions
with a tick in the `Toolkit` column require an installation of TimescaleDB Toolkit for self-hosted deployments. Hyperfunctions
with a tick in the `Experimental` column are still under development.

Experimental features could have bugs. They might not be backwards compatible,
and could be removed in future releases. Use these features at your own risk, and
do not use any experimental features in production.

When you upgrade the `timescaledb` extension, the experimental schema is removed
by default. To use experimental features after an upgrade, you need to add the
experimental schema again.

&lt;HyperfunctionTable
    includeExperimental
/>

For more information about each of the API calls listed in this table, see the
[hyperfunction API documentation][api-hyperfunctions].
