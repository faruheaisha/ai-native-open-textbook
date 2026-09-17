---
title: "Configuration"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/r2-data-catalog/configuration.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/r2-data-catalog/configuration.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/r2-data-catalog/configuration.md"
sourceSha256: "4b6f9ede6a838e6d9f3da9dd06e3a637180ad0ef7e2063eb543eca3ff934c319"
pageSha256: "4b6f9ede6a838e6d9f3da9dd06e3a637180ad0ef7e2063eb543eca3ff934c319"
contentMode: "local-full"
zh: ""
---

# Configuration

How to enable R2 Data Catalog and configure authentication.

## Prerequisites

- Cloudflare account with [R2 subscription](https://developers.cloudflare.com/r2/pricing/)
- R2 bucket created
- Access to Cloudflare dashboard or Wrangler CLI

## Enable Catalog on Bucket

Choose one method:

### Via Wrangler (Recommended)

```bash
npx wrangler r2 bucket catalog enable <BUCKET_NAME>
```

**Output:**
```
✅ Data Catalog enabled for bucket 'my-bucket'
