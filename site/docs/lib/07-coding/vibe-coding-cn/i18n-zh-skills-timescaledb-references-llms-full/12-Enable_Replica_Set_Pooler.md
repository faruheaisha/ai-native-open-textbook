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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "d9fbfb99eed9259133669c9308f3c80993096c607129cee80c60c8d0b15d3f66"
contentMode: "local-full"
zh: ""
---

#### Enable Replica Set Pooler

```http
POST /projects/{project_id}/services/{service_id}/replicaSets/{replica_set_id}/enablePooler
```

Activate the connection pooler for a read replica set.

**Response:** `200 OK`
```json
{
  "message": "Connection pooler enabled successfully"
}
```
