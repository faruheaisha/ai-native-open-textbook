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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/llms-full.md"
sourceRel: "i18n/zh/skills/coingecko/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/llms-full.md"
sourceSha256: "a3cd0a16407a7e6b85ceb3cc714181ec1aecb3fdb5043afd1a82ec9cfdea8ec8"
pageSha256: "b26aceecb1a1d96b846fc4085e05cad828dab815ffa6b530b465b1fc3596995e"
contentMode: "local-full"
zh: ""
---

## Tips:

### Un-subscribe to stop streaming OnchainOHLCV data

**Input Example:** Unsubscribe for 1 specific pool data:

  ```json JSON theme={null}
  {"command":"message","identifier":"{\"channel\":\"OnchainOHLCV\"}","data":"{\"network_id:pool_addresses\":[\"eth:0xc7bbec68d12a0d1830360f8ec58fa599ba1b0e9b\"],\"interval\":\"1m\",\"token\":\"base\",\"action\":\"unset_pools\"}"}
  ```

**Output Example**:

  ```json JSON theme={null}
  {
    "code":2000,
    "message":"Unsubscription is successful for eth:0xc7bbec68d12a0d1830360f8ec58fa599ba1b0e9b:1m:base"
  }
  ```

**Input Example:** Unsubscribe from OnchainOHLCV channel and all pools data:

  ```json JSON theme={null}
  {"command":"unsubscribe","identifier":"{\"channel\":\"OnchainOHLCV\"}"}
  ```

**Output Example**:

  ```json JSON theme={null}
  {
    "code":2000,
    "message":"Unsubscription is successful for all pools"
  }
  ```
