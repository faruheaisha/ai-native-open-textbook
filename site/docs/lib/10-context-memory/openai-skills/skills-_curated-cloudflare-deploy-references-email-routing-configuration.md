---
title: "Email Routing Configuration"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/email-routing/configuration.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/email-routing/configuration.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/email-routing/configuration.md"
sourceSha256: "a9a45e84286ffce8b67cd6a50e72a3a0f169f4414280fd94e5f33f9e9ac4ecd1"
pageSha256: "a9a45e84286ffce8b67cd6a50e72a3a0f169f4414280fd94e5f33f9e9ac4ecd1"
contentMode: "local-full"
zh: ""
---

# Email Routing Configuration

## Wrangler Configuration

### Basic Email Worker

```jsonc
// wrangler.jsonc
{
  "name": "email-worker",
  "main": "src/index.ts",
  "compatibility_date": "2025-01-01",
  "send_email": [{ "name": "EMAIL" }]
}
```

```typescript
// src/index.ts
export default {
  async email(message, env, ctx) {
    await message.forward("destination@example.com");
  }
} satisfies ExportedHandler;
```

### With Storage Bindings

```jsonc
{
  "name": "email-processor",
  "send_email": [{ "name": "EMAIL" }],
  "kv_namespaces": [{ "binding": "KV", "id": "abc123" }],
  "r2_buckets": [{ "binding": "R2", "bucket_name": "emails" }],
  "d1_databases": [{ "binding": "DB", "database_id": "def456" }]
}
```

```typescript
interface Env {
  EMAIL: SendEmail;
  KV: KVNamespace;
  R2: R2Bucket;
  DB: D1Database;
}
```

## Local Development

```bash
npx wrangler dev

# Test with curl
curl -X POST 'http://localhost:8787/__email' \
  --header 'content-type: message/rfc822' \
  --data 'From: test@example.com
To: you@yourdomain.com
Subject: Test

Body'
```

## Deployment

```bash
npx wrangler deploy
```

**Connect to Email Routing:**

Dashboard: Email > Email Routing > [domain] > Settings > Email Workers > Select worker

API:
```bash
curl -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/settings" \
  -H "Authorization: Bearer $API_TOKEN" \
  -d '{"enabled": true, "worker": "email-worker"}'
```

## DNS (Auto-Created)

```dns
yourdomain.com. IN MX 1 isaac.mx.cloudflare.net.
yourdomain.com. IN MX 2 linda.mx.cloudflare.net.
yourdomain.com. IN MX 3 amir.mx.cloudflare.net.
yourdomain.com. IN TXT "v=spf1 include:_spf.mx.cloudflare.net ~all"
```

## Secrets & Variables

```bash
# Secrets (encrypted)
npx wrangler secret put API_KEY

# Variables (plain)
# wrangler.jsonc
{ "vars": { "THRESHOLD": "5.0" } }
```

```typescript
interface Env {
  API_KEY: string;
  THRESHOLD: string;
}
```

## TypeScript Setup

```bash
npm install --save-dev @cloudflare/workers-types
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022"],
    "types": ["@cloudflare/workers-types"],
    "moduleResolution": "bundler",
    "strict": true
  }
}
```

```typescript
import type { ForwardableEmailMessage } from "@cloudflare/workers-types";

export default {
  async email(message: ForwardableEmailMessage, env: Env, ctx: ExecutionContext): Promise<void> {
    await message.forward("dest@example.com");
  }
} satisfies ExportedHandler<Env>;
```

## Dependencies

```bash
npm install postal-mime
```

```typescript
import PostalMime from 'postal-mime';

export default {
  async email(message, env, ctx) {
    const parser = new PostalMime();
    const email = await parser.parse(await message.raw.arrayBuffer());
    console.log(email.subject);
    await message.forward("inbox@corp.com");
  }
} satisfies ExportedHandler;
```

## Multi-Environment

```bash
# wrangler.dev.jsonc
{ "name": "worker-dev", "vars": { "ENV": "dev" } }

# wrangler.prod.jsonc
{ "name": "worker-prod", "vars": { "ENV": "prod" } }

npx wrangler deploy --config wrangler.dev.jsonc
npx wrangler deploy --config wrangler.prod.jsonc
```

## CI/CD (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```
