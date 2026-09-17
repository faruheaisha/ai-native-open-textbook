---
title: "Tunnel API"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/tunnel/api.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/tunnel/api.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/tunnel/api.md"
sourceSha256: "698055870e668a0827b8bbb83d9016b093e22e4a95f4aabeaca7ef2e0d1e099f"
pageSha256: "698055870e668a0827b8bbb83d9016b093e22e4a95f4aabeaca7ef2e0d1e099f"
contentMode: "local-full"
zh: ""
---

# Tunnel API

## Cloudflare API Access

**Base URL**: `https://api.cloudflare.com/client/v4`

**Authentication**:
```bash
Authorization: Bearer ${CF_API_TOKEN}
```

## TypeScript SDK

Install: `npm install cloudflare`

```typescript
import Cloudflare from 'cloudflare';

const cf = new Cloudflare({
  apiToken: process.env.CF_API_TOKEN,
});

const accountId = process.env.CF_ACCOUNT_ID;
```

## Create Tunnel

### cURL
```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/tunnels" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "my-tunnel",
