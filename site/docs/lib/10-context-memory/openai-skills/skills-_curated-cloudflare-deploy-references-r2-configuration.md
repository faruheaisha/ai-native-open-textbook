---
title: "R2 Configuration"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/r2/configuration.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/r2/configuration.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/r2/configuration.md"
sourceSha256: "c2e3bb6047af5ca71e4e539a3dedaf9c62b7d41d4ef7f41c298495e9e9380fd3"
pageSha256: "c2e3bb6047af5ca71e4e539a3dedaf9c62b7d41d4ef7f41c298495e9e9380fd3"
contentMode: "local-full"
zh: ""
---

# R2 Configuration

## Workers Binding

**wrangler.jsonc:**
```jsonc
{
  "r2_buckets": [
    {
      "binding": "MY_BUCKET",
      "bucket_name": "my-bucket-name"
    }
  ]
}
```

## TypeScript Types

```typescript
interface Env { MY_BUCKET: R2Bucket; }

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const object = await env.MY_BUCKET.get('file.txt');
    return new Response(object?.body);
  }
}
```

## S3 SDK Setup

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY
  }
});

await s3.send(new PutObjectCommand({
  Bucket: 'my-bucket',
  Key: 'file.txt',
  Body: data,
  StorageClass: 'STANDARD' // or 'STANDARD_IA'
}));
```

## Location Hints

```bash
wrangler r2 bucket create my-bucket --location=enam

# Hints: wnam, enam, weur, eeur, apac, oc
# Jurisdictions (override hint): --jurisdiction=eu (or fedramp)
```

## CORS Configuration

CORS must be configured via S3 SDK or dashboard (not available in Workers API):

```typescript
import { S3Client, PutBucketCorsCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY
  }
});

await s3.send(new PutBucketCorsCommand({
  Bucket: 'my-bucket',
  CORSConfiguration: {
    CORSRules: [{
      AllowedOrigins: ['https://example.com'],
      AllowedMethods: ['GET', 'PUT', 'HEAD'],
      AllowedHeaders: ['*'],
      ExposeHeaders: ['ETag'],
      MaxAgeSeconds: 3600
    }]
  }
}));
```

## Object Lifecycles

```typescript
import { PutBucketLifecycleConfigurationCommand } from '@aws-sdk/client-s3';

await s3.send(new PutBucketLifecycleConfigurationCommand({
  Bucket: 'my-bucket',
  LifecycleConfiguration: {
    Rules: [
      {
        ID: 'expire-old-logs',
        Status: 'Enabled',
        Prefix: 'logs/',
        Expiration: { Days: 90 }
      },
      {
        ID: 'transition-to-ia',
        Status: 'Enabled',
        Prefix: 'archives/',
        Transitions: [{ Days: 30, StorageClass: 'STANDARD_IA' }]
      }
    ]
  }
}));
```

## API Token Scopes

When creating R2 tokens, set minimal permissions:

| Permission | Use Case |
|------------|----------|
| Object Read | Public serving, downloads |
| Object Write | Uploads only |
| Object Read & Write | Full object operations |
| Admin Read & Write | Bucket management, CORS, lifecycles |

**Best practice:** Separate tokens for Workers (read/write) vs admin tasks (CORS, lifecycles).

## Event Notifications

```jsonc
// wrangler.jsonc
{
  "r2_buckets": [
    {
      "binding": "MY_BUCKET",
      "bucket_name": "my-bucket",
      "event_notifications": [
        {
          "queue": "r2-events",
          "actions": ["PutObject", "DeleteObject", "CompleteMultipartUpload"]
        }
      ]
    }
  ],
  "queues": {
    "producers": [{ "binding": "R2_EVENTS", "queue": "r2-events" }],
    "consumers": [{ "queue": "r2-events", "max_batch_size": 10 }]
  }
}
```

## Bucket Management

```bash
wrangler r2 bucket create my-bucket --location=enam --storage-class=Standard
wrangler r2 bucket list
wrangler r2 bucket info my-bucket
wrangler r2 bucket delete my-bucket  # Must be empty
wrangler r2 bucket update-storage-class my-bucket --storage-class=InfrequentAccess

# Public bucket via dashboard
wrangler r2 bucket domain add my-bucket --domain=files.example.com
```
