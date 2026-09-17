---
title: "Workers Gotchas"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/workers/gotchas.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/workers/gotchas.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/workers/gotchas.md"
sourceSha256: "f9430e9fe0462c5749fb6478f5d29eea18838d71bcb73366c9479ff865dc597f"
pageSha256: "f9430e9fe0462c5749fb6478f5d29eea18838d71bcb73366c9479ff865dc597f"
contentMode: "local-full"
zh: ""
---

# Workers Gotchas

## Common Errors

### "Too much CPU time used"

**Cause:** Worker exceeded CPU time limit (10ms standard, 30ms unbound)  
**Solution:** Use `ctx.waitUntil()` for background work, offload heavy compute to Durable Objects, or consider Workers AI for ML workloads

### "Module-Level State Lost"

**Cause:** Workers are stateless between requests; module-level variables reset unpredictably  
**Solution:** Use KV, D1, or Durable Objects for persistent state; don't rely on module-level variables

### "Body has already been used"

**Cause:** Attempting to read response body twice (bodies are streams)  
**Solution:** Clone response before reading: `response.clone()` or read once and create new Response with the text

### "Node.js module not found"

**Cause:** Node.js built-ins not available by default  
**Solution:** Use Workers APIs (e.g., R2 for file storage) or enable Node.js compat with `"compatibility_flags": ["nodejs_compat_v2"]`

### "Cannot fetch in global scope"

**Cause:** Attempting to use fetch during module initialization  
**Solution:** Move fetch calls inside handler functions (fetch, scheduled, etc.) where they're allowed

### "Subrequest depth limit exceeded"

**Cause:** Too many nested subrequests creating deep call chain  
**Solution:** Flatten request chain or use service bindings for direct Worker-to-Worker communication

### "D1 read-after-write inconsistency"

**Cause:** D1 is eventually consistent; reads may not reflect recent writes  
**Solution:** Use D1 Sessions (2024+) to guarantee read-after-write consistency within a session:

```typescript
const session = env.DB.withSession();
await session.prepare('INSERT INTO users (name) VALUES (?)').bind('Alice').run();
const user = await session.prepare('SELECT * FROM users WHERE name = ?').bind('Alice').first(); // Guaranteed to see Alice
```

**When to use sessions:** Write → Read patterns, transactions requiring consistency

### "wrangler types not generating TypeScript definitions"

**Cause:** Type generation not configured or outdated  
**Solution:** Run `npx wrangler types` after changing bindings in wrangler.jsonc:

```bash
npx wrangler types  # Generates .wrangler/types/runtime.d.ts
```

Add to `tsconfig.json`: `"include": [".wrangler/types/**/*.ts"]`

Then import: `import type \{ Env \} from './.wrangler/types/runtime';`

### "Durable Object RPC errors with deprecated fetch pattern"

**Cause:** Using old `stub.fetch()` pattern instead of RPC (2024+)  
**Solution:** Export methods directly, call via RPC:

```typescript
// ❌ Old fetch pattern
export class MyDO {
  async fetch(request: Request) {
    const { method } = await request.json();
    if (method === 'increment') return new Response(String(await this.increment()));
  }
  async increment() { return ++this.value; }
}
const stub = env.DO.get(id);
const res = await stub.fetch('http://x', { method: 'POST', body: JSON.stringify({ method: 'increment' }) });

// ✅ RPC pattern (type-safe, no serialization overhead)
export class MyDO {
  async increment() { return ++this.value; }
}
const stub = env.DO.get(id);
const count = await stub.increment(); // Direct method call
```

### "WebSocket connection closes unexpectedly"

**Cause:** Worker reaches CPU limit while maintaining WebSocket connection  
**Solution:** Use WebSocket hibernation (2024+) to offload idle connections:

```typescript
export class WebSocketDO {
  async webSocketMessage(ws: WebSocket, message: string) {
    // Handle message
  }
  async webSocketClose(ws: WebSocket, code: number) {
    // Cleanup
  }
}
```

Hibernation automatically suspends inactive connections, wakes on events

### "Framework middleware not working with Workers"

**Cause:** Framework expects Node.js primitives (e.g., Express uses Node streams)  
**Solution:** Use Workers-native frameworks (Hono, itty-router, Worktop) or adapt middleware:

```typescript
// ✅ Hono (Workers-native)
import { Hono } from 'hono';
const app = new Hono();
app.use('*', async (c, next) => { /* middleware */ await next(); });
```

See [frameworks.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-frameworks) for full patterns

## Limits

| Limit | Value | Notes |
|-------|-------|-------|
| Request size | 100 MB | Maximum incoming request size |
| Response size | Unlimited | Supports streaming |
| CPU time (standard) | 10ms | Standard Workers |
| CPU time (unbound) | 30ms | Unbound Workers |
| Subrequests | 1000 | Per request |
| KV reads | 1000 | Per request |
| KV write size | 25 MB | Maximum per write |
| Environment size | 5 MB | Total size of env bindings |

## See Also

- [Patterns](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-patterns) - Best practices
- [API](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-api) - Runtime APIs
- [Configuration](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-configuration) - Setup
- [Frameworks](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-frameworks) - Hono, routing, validation
