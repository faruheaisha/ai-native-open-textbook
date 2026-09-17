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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "65df6a3070ff4f751f4fe86174ad9f2d2f448e25d8f7685055bafa4281cc8a6f"
contentMode: "local-full"
zh: ""
---

## uuid_version()

**URL:** llms-txt#uuid_version()

**Contents:**
- Samples
- Arguments

Extract the version number from a UUID object:

![UUIDv7](https://assets.timescale.com/docs/images/uuidv7-structure.svg)

Returns something like:

| Name | Type             | Default | Required | Description                                        |
|-|------------------|-|----------|----------------------------------------------------|
|`uuid`|UUID| - | ✔ | The UUID object to extract the version number from |

===== PAGE: https://docs.tigerdata.com/api/uuid-functions/generate_uuidv7/ =====

**Examples:**

Example 1 (sql):
```sql
postgres=# SELECT uuid_version('019913ce-f124-7835-96c7-a2df691caa98');
```

Example 2 (terminaloutput):
```terminaloutput
uuid_version
--------------
            7
```
