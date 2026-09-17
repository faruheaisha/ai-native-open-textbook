---
title: "Cloudflare Pages Functions"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/pages-functions/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/pages-functions/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/pages-functions/README.md"
sourceSha256: "19474e50d4c3c5fda0184f62df8302aef0ba8a09999fc3111d8cb979aa280fd7"
pageSha256: "19474e50d4c3c5fda0184f62df8302aef0ba8a09999fc3111d8cb979aa280fd7"
contentMode: "local-full"
zh: ""
---

# Cloudflare Pages Functions

Serverless functions on Cloudflare Pages using Workers runtime. Full-stack dev with file-based routing.

## Quick Navigation

**Need to...**
| Task | Go to |
|------|-------|
| Set up TypeScript types | [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions-configuration) - TypeScript Setup |
| Configure bindings (KV, D1, R2) | [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions-configuration) - wrangler.jsonc |
| Access request/env/params | [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions-api) - EventContext |
| Add middleware or auth | [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions-patterns) - Middleware, Auth |
| Background tasks (waitUntil) | [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions-patterns) - Background Tasks |
| Debug errors or check limits | [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions-gotchas) - Common Errors, Limits |

## Decision Tree: Is This Pages Functions?

```
Need serverless backend? 
├─ Yes, for a static site → Pages Functions
├─ Yes, standalone API → Workers
└─ Just static hosting → Pages (no functions)

Have existing Worker?
├─ Complex routing logic → Use _worker.js (Advanced Mode)
└─ Simple routes → Migrate to /functions (File-Based)

Framework-based?
├─ Next.js/SvelteKit/Remix → Uses _worker.js automatically
└─ Vanilla/HTML/React SPA → Use /functions
```

## File-Based Routing

```
/functions
  ├── index.js              → /
  ├── api.js                → /api
  ├── users/
  │   ├── index.js          → /users/
  │   ├── [user].js         → /users/:user
  │   └── [[catchall]].js   → /users/*
  └── _middleware.js        → runs on all routes
```

**Rules:**
- `index.js` → directory root
- Trailing slash optional
- Specific routes precede catch-alls
- Falls back to static if no match

## Dynamic Routes

**Single segment** `[param]` → string:
```js
// /functions/users/[user].js
export function onRequest(context) {
  return new Response(`Hello ${context.params.user}`);
}
// Matches: /users/nevi
```

**Multi-segment** `[[param]]` → array:
```js
// /functions/users/[[catchall]].js
export function onRequest(context) {
  return new Response(JSON.stringify(context.params.catchall));
}
// Matches: /users/nevi/foobar → ["nevi", "foobar"]
```

## Key Features

- **Method handlers:** `onRequestGet`, `onRequestPost`, etc.
- **Middleware:** `_middleware.js` for cross-cutting concerns
- **Bindings:** KV, D1, R2, Durable Objects, Workers AI, Service bindings
- **TypeScript:** Full type support via `wrangler types` command
- **Advanced mode:** Use `_worker.js` for custom routing logic

## Reading Order

**New to Pages Functions?** Start here:
1. [README.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions) - Overview, routing, decision tree (you are here)
2. [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions-configuration) - TypeScript setup, wrangler.jsonc, bindings
3. [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions-api) - EventContext, handlers, bindings reference
4. [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions-patterns) - Middleware, auth, CORS, rate limiting, caching
5. [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions-gotchas) - Common errors, debugging, limits

**Quick reference lookup:**
- Bindings table → [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions-api)
- Error diagnosis → [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions-gotchas)
- TypeScript setup → [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages-functions-configuration)

## See Also
- [pages](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-pages) - Pages platform overview and static site deployment
- [workers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers) - Workers runtime API reference
- [d1](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-d1) - D1 database integration with Pages Functions
