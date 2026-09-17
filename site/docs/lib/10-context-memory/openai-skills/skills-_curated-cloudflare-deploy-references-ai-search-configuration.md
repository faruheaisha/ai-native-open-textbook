---
title: "AI Search Configuration"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/ai-search/configuration.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/ai-search/configuration.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/ai-search/configuration.md"
sourceSha256: "59af92d0c3b196bea13ac72e18b42db528721f8971c7d335b27951b77aa4ddb0"
pageSha256: "59af92d0c3b196bea13ac72e18b42db528721f8971c7d335b27951b77aa4ddb0"
contentMode: "local-full"
zh: ""
---

# AI Search Configuration

## Worker Setup

```jsonc
// wrangler.jsonc
{
  "ai": { "binding": "AI" }
}
```

```typescript
interface Env {
  AI: Ai;
}

const answer = await env.AI.autorag("my-instance").aiSearch({
  query: "How do I configure caching?",
  model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast"
});
```

## Data Sources

### R2 Bucket

Dashboard: AI Search → Create Instance → Select R2 bucket

**Supported formats:** `.md`, `.txt`, `.html`, `.pdf`, `.doc`, `.docx`, `.csv`, `.json`

**Auto-indexed metadata:** `filename`, `folder`, `timestamp`

### Website Crawler

Requirements:
- Domain on Cloudflare
- `sitemap.xml` at root
- Bot protection must allow `CloudflareAISearch` user agent

## Path Filtering (R2)

```
docs/**/*.md          # All .md in docs/ recursively
**/*.draft.md         # Exclude (use in exclude patterns)
```

## Indexing

- **Automatic:** Every 6 hours
- **Force Sync:** Dashboard button (30s rate limit between syncs)
- **Pause:** Settings → Pause Indexing (existing index remains searchable)

## Service API Token

Dashboard: AI Search → Instance → Use AI Search → API → Create Token

Permissions:
- **Read** - search operations
- **Edit** - instance management

Store securely:
```bash
wrangler secret put AI_SEARCH_TOKEN
```

## Multi-Environment

```toml
# wrangler.toml
[env.production.vars]
AI_SEARCH_INSTANCE = "prod-docs"

[env.staging.vars]
AI_SEARCH_INSTANCE = "staging-docs"
```

```typescript
const answer = await env.AI.autorag(env.AI_SEARCH_INSTANCE).aiSearch({ query });
```

## Monitoring

```typescript
const instances = await env.AI.autorag("_").listInstances();
console.log(instances.find(i => i.name === "docs"));
```

Dashboard shows: files indexed, status, last index time, storage usage.
