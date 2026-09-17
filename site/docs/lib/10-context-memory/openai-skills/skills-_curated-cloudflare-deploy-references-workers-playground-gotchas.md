---
title: "Workers Playground Gotchas"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/workers-playground/gotchas.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/workers-playground/gotchas.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/workers-playground/gotchas.md"
sourceSha256: "85e262f98373f1631dcef3f44a57b6d9e30f8e930e013dc8667fa5993bb6dfae"
pageSha256: "85e262f98373f1631dcef3f44a57b6d9e30f8e930e013dc8667fa5993bb6dfae"
contentMode: "local-full"
zh: ""
---

# Workers Playground Gotchas

## Platform Limitations

| Limitation | Impact | Workaround |
|------------|--------|------------|
| Safari broken | Preview fails | Use Chrome/Firefox/Edge |
| TypeScript unsupported | TS syntax errors | Write plain JS or use JSDoc |
| No bindings | `env` always `\{\}` | Mock data or use external APIs |
| No env vars | Can't access secrets | Hardcode for testing |

## Common Runtime Errors

### "Response body already read"

```javascript
// ❌ Body consumed twice
const body = await request.text();
await fetch(url, { body: request.body }); // Error!

// ✅ Clone first
const clone = request.clone();
const body = await request.text();
await fetch(url, { body: clone.body });
```

### "Worker exceeded CPU time"

**Limit:** 10ms (free), 50ms (paid)

```javascript
// ✅ Move slow work to background
ctx.waitUntil(fetch('https://analytics.example.com', {...}));
return new Response('OK'); // Return immediately
```

### "Too many subrequests"

**Limit:** 50 (free), 1000 (paid)

```javascript
// ❌ 100 individual fetches
// ✅ Batch into single API call
await fetch('https://api.example.com/batch', {
  body: JSON.stringify({ ids: [...] })
});
```

## Best Practices

```javascript
// Clone before caching
await cache.put(request, response.clone());
return response;

// Validate input early
if (request.method !== 'POST') return new Response('', { status: 405 });

// Handle errors
try { ... } catch (e) {
  return Response.json({ error: e.message }, { status: 500 });
}
```

## Limits

| Resource | Free | Paid |
|----------|------|------|
| CPU time | 10ms | 50ms |
| Memory | 128 MB | 128 MB |
| Subrequests | 50 | 1000 |

## Browser Support

| Browser | Status |
|---------|--------|
| Chrome | ✅ Recommended |
| Firefox | ✅ Works |
| Edge | ✅ Works |
| Safari | ❌ Broken |

## Debugging

```javascript
console.log('URL:', request.url); // View in browser DevTools Console
```

**Note:** `console.log` works in playground. For production, use Logpush or Tail Workers.
