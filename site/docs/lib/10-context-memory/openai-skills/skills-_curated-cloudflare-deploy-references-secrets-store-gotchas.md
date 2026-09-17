---
title: "Gotchas"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/secrets-store/gotchas.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/secrets-store/gotchas.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/secrets-store/gotchas.md"
sourceSha256: "572d2d0464d24d66c4720b52c57f6a3234335cfb2fd18308bba876b72229a296"
pageSha256: "572d2d0464d24d66c4720b52c57f6a3234335cfb2fd18308bba876b72229a296"
contentMode: "local-full"
zh: ""
---

# Gotchas

## Common Errors

### ".get() Throws on Error"

**Cause:** Assuming `.get()` returns null on failure instead of throwing  
**Solution:** Always wrap `.get()` calls in try/catch blocks to handle errors gracefully

```typescript
try {
  const key = await env.API_KEY.get();
} catch (error) {
  return new Response("Configuration error", { status: 500 });
}
```

### "Logging Secret Values"

**Cause:** Accidentally logging secret values in console or error messages  
**Solution:** Only log metadata (e.g., "Retrieved API_KEY") never the actual secret value

### "Module-Level Secret Access"

**Cause:** Attempting to access secrets during module initialization before env is available  
**Solution:** Cache secrets in request scope only, not at module level

### "Secret not found in store"

**Cause:** Secret name doesn't exist, case mismatch, missing workers scope, or incorrect store_id
