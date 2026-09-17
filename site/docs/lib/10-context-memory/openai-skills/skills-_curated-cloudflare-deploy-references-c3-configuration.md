---
title: "C3 Generated Configuration"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/c3/configuration.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/c3/configuration.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/c3/configuration.md"
sourceSha256: "01e7f90dfbfce4d20a86a41b3ca882dab74d0b540ea07952da2f4ff1c6b6626c"
pageSha256: "01e7f90dfbfce4d20a86a41b3ca882dab74d0b540ea07952da2f4ff1c6b6626c"
contentMode: "local-full"
zh: ""
---

# C3 Generated Configuration

## Output Structure

```
my-app/
├── src/index.ts          # Worker entry point
├── wrangler.jsonc        # Cloudflare config
├── package.json          # Scripts
├── tsconfig.json
└── .gitignore
```

## wrangler.jsonc

```jsonc
{
  "$schema": "https://raw.githubusercontent.com/cloudflare/workers-sdk/main/packages/wrangler/config-schema.json",
  "name": "my-app",
  "main": "src/index.ts",
  "compatibility_date": "2026-01-27"
}
```

## Binding Placeholders

C3 generates **placeholder IDs** that must be replaced before deploy:

```jsonc
{
  "kv_namespaces": [{ "binding": "MY_KV", "id": "placeholder_kv_id" }],
  "d1_databases": [{ "binding": "DB", "database_id": "00000000-..." }]
}
```

**Replace with real IDs:**
```bash
npx wrangler kv namespace create MY_KV   # Returns real ID
npx wrangler d1 create my-database       # Returns real database_id
```

**Deployment error if not replaced:**
```
Error: Invalid KV namespace ID "placeholder_kv_id"
```

## Scripts

```json
{
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy",
    "cf-typegen": "wrangler types"
  }
}
```

## Type Generation

Run after adding bindings:
```bash
npm run cf-typegen
```

Generates `.wrangler/types/runtime.d.ts`:
```typescript
interface Env {
  MY_KV: KVNamespace;
  DB: D1Database;
}
```

## Post-Creation Checklist

1. Review `wrangler.jsonc` - check name, compatibility_date
2. Replace placeholder binding IDs with real resource IDs
3. Run `npm run cf-typegen`
4. Test: `npm run dev`
5. Deploy: `npm run deploy`
6. Add secrets: `npx wrangler secret put SECRET_NAME`
