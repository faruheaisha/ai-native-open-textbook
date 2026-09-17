---
title: "Vectorize Configuration"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/vectorize/configuration.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/vectorize/configuration.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/vectorize/configuration.md"
sourceSha256: "057eaef43f53e8bd71699ca17a3d296eb0c165ce1c1a304d71dea53ee9ab0908"
pageSha256: "057eaef43f53e8bd71699ca17a3d296eb0c165ce1c1a304d71dea53ee9ab0908"
contentMode: "local-full"
zh: ""
---

# Vectorize Configuration

## Create Index

```bash
npx wrangler vectorize create my-index --dimensions=768 --metric=cosine
```

**⚠️ Dimensions and metric are immutable** - cannot change after creation.

## Worker Binding

```jsonc
// wrangler.jsonc
{
  "vectorize": [
    { "binding": "VECTORIZE", "index_name": "my-index" }
  ]
}
```

```typescript
interface Env {
  VECTORIZE: Vectorize;
}
```

## Metadata Indexes

**Must create BEFORE inserting vectors** - existing vectors not retroactively indexed.

```bash
wrangler vectorize create-metadata-index my-index --property-name=category --type=string
wrangler vectorize create-metadata-index my-index --property-name=price --type=number
```

| Type | Use For |
|------|---------|
| `string` | Categories, tags (first 64 bytes indexed) |
| `number` | Prices, timestamps |
| `boolean` | Flags |

## CLI Commands

```bash
# Index management
wrangler vectorize list
