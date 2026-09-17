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
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/workers-for-platforms/configuration.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/workers-for-platforms/configuration.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/workers-for-platforms/configuration.md"
sourceSha256: "21e9034f5b014589e05e98eb5fa368e1c4fe4f287215c4b8f38ce12b95fd588a"
pageSha256: "21e9034f5b014589e05e98eb5fa368e1c4fe4f287215c4b8f38ce12b95fd588a"
contentMode: "local-full"
zh: ""
---

# Configuration

## Dispatch Namespace Binding

### wrangler.jsonc
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "dispatch_namespaces": [{
    "binding": "DISPATCHER",
    "namespace": "production"
  }]
}
```

## Worker Isolation Mode

Workers in a namespace run in **untrusted mode** by default for security:
- No access to `request.cf` object
- Isolated cache per Worker (no shared cache)
- `caches.default` disabled

### Enable Trusted Mode

For internal platforms where you control all code:

```bash
curl -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$NAMESPACE" \
  -H "Authorization: Bearer $API_TOKEN" \
  -d '{"name": "'$NAMESPACE'", "trusted_workers": true}'
```

**Caveats:**
- Workers share cache within namespace (use cache key prefixes: `customer-${id}:${key\}`)
- `request.cf` object accessible
- Redeploy existing Workers after enabling trusted mode

**When to use:** Internal platforms, A/B testing platforms, need geolocation data

### With Outbound Worker
```jsonc
{
  "dispatch_namespaces": [{
    "binding": "DISPATCHER",
    "namespace": "production",
    "outbound": {
      "service": "outbound-worker",
      "parameters": ["customer_context"]
    }
  }]
}
```

## Wrangler Commands

```bash
wrangler dispatch-namespace list
wrangler dispatch-namespace get production
wrangler dispatch-namespace create production
wrangler dispatch-namespace delete staging
wrangler dispatch-namespace rename old new
```

## Custom Limits

Set CPU time and subrequest limits per invocation:

```typescript
const userWorker = env.DISPATCHER.get(
  workerName,
  {},
  {
    limits: { 
      cpuMs: 10,        // Max CPU ms
      subRequests: 5    // Max fetch() calls
    }
  }
);
```

Handle limit violations:
```typescript
try {
  return await userWorker.fetch(request);
} catch (e) {
  if (e.message.includes("CPU time limit")) {
    return new Response("CPU limit exceeded", { status: 429 });
  }
  throw e;
}
```

## Static Assets

Deploy HTML/CSS/images with Workers. See [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-for-platforms-api#static-assets) for upload process.

### Wrangler
```jsonc
{
  "name": "customer-site",
  "main": "./src/index.js",
  "assets": {
    "directory": "./public",
    "binding": "ASSETS"
  }
}
```

```bash
npx wrangler deploy --name customer-site --dispatch-namespace production
```

### Dashboard Deployment

Alternative to CLI:

1. Upload Worker file in dashboard
2. Add `--dispatch-namespace` flag: `wrangler deploy --dispatch-namespace production`
3. Or configure in wrangler.jsonc under `dispatch_namespaces`

See [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-for-platforms-api) for programmatic deployment via REST API or SDK.

## Tags

Organize/search Workers (max 8/script):

```bash
# Set tags
curl -X PUT ".../tags" -d '["customer-123", "pro", "production"]'

# Filter by tag
curl ".../scripts?tags=production%3Ayes"

# Delete by tag
curl -X DELETE ".../scripts?tags=customer-123%3Ayes"
```

Common patterns: `customer-123`, `free|pro|enterprise`, `production|staging`

## Bindings

**Supported binding types:** 29 total including KV, D1, R2, Durable Objects, Analytics Engine, Service, Assets, Queue, Vectorize, Hyperdrive, Workflow, AI, Browser, and more.

Add via API metadata (see [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-for-platforms-api#deploy-with-bindings)):
```json
{
  "bindings": [
    {"type": "kv_namespace", "name": "USER_KV", "namespace_id": "..."},
    {"type": "r2_bucket", "name": "STORAGE", "bucket_name": "..."},
    {"type": "d1", "name": "DB", "id": "..."}
  ]
}
```

Preserve existing bindings:
```json
{
  "bindings": [{"type": "r2_bucket", "name": "STORAGE", "bucket_name": "new"}],
  "keep_bindings": ["kv_namespace", "d1"]  // Preserves existing bindings of these types
}
```

For complete binding type reference, see [bindings](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-bindings) documentation

See [README.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-for-platforms), [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-for-platforms-api), [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-for-platforms-patterns), [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-for-platforms-gotchas)
