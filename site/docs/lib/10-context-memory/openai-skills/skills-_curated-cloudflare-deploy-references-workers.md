---
title: "Cloudflare Workers"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/workers/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/workers/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/workers/README.md"
sourceSha256: "4e00df1c6d64cd393c909430769c183b7027b4fe1db0c2dbb31090987baff14c"
pageSha256: "4e00df1c6d64cd393c909430769c183b7027b4fe1db0c2dbb31090987baff14c"
contentMode: "local-full"
zh: ""
---

# Cloudflare Workers

Expert guidance for building, deploying, and optimizing Cloudflare Workers applications.

## Overview

Cloudflare Workers run on V8 isolates (NOT containers/VMs):
- Extremely fast cold starts (< 1ms)
- Global deployment across 300+ locations
- Web standards compliant (fetch, URL, Headers, Request, Response)
- Support JS/TS, Python, Rust, and WebAssembly

**Key principle**: Workers use web platform APIs wherever possible for portability.

## Module Worker Pattern (Recommended)

```typescript
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return new Response('Hello World!');
  },
};
```

**Handler parameters**:
- `request`: Incoming HTTP request (standard Request object)
- `env`: Environment bindings (KV, D1, R2, secrets, vars)
- `ctx`: Execution context (`waitUntil`, `passThroughOnException`)

## Essential Commands

```bash
npx wrangler dev                    # Local dev
npx wrangler dev --remote           # Remote dev (actual resources)
npx wrangler deploy                 # Production
npx wrangler deploy --env staging   # Specific environment
npx wrangler tail                   # Stream logs
npx wrangler secret put API_KEY     # Set secret
```

## When to Use Workers

- API endpoints at the edge
- Request/response transformation
- Authentication/authorization layers
- Static asset optimization
- A/B testing and feature flags
- Rate limiting and security
- Proxy/routing logic
- WebSocket applications

## Quick Start

```bash
npm create cloudflare@latest my-worker -- --type hello-world
cd my-worker
npx wrangler dev
```

## Handler Signatures

```typescript
// HTTP requests
async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>

// Cron triggers
async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void>

// Queue consumer
async queue(batch: MessageBatch, env: Env, ctx: ExecutionContext): Promise<void>

// Tail consumer
async tail(events: TraceItem[], env: Env, ctx: ExecutionContext): Promise<void>
```

## Resources

**Docs**: https://developers.cloudflare.com/workers/  
**Examples**: https://developers.cloudflare.com/workers/examples/  
**Runtime APIs**: https://developers.cloudflare.com/workers/runtime-apis/

## In This Reference

- [Configuration](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-configuration) - wrangler.jsonc setup, bindings, environments
- [API](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-api) - Runtime APIs, bindings, execution context
- [Patterns](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-patterns) - Common workflows, testing, optimization
- [Frameworks](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-frameworks) - Hono, routing, validation
- [Gotchas](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-gotchas) - Common issues, limits, troubleshooting

## Reading Order

| Task | Start With | Then Read |
|------|------------|-----------|
| First Worker | README → Configuration → API | Patterns |
| Add framework | Frameworks | Configuration (bindings) |
| Add storage/bindings | Configuration → API (binding usage) | See Also links |
| Debug issues | Gotchas | API (specific binding docs) |
| Production optimization | Patterns | API (caching, streaming) |
| Type safety | Configuration (TypeScript) | Frameworks (Hono typing) |

## See Also

- [KV](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-kv) - Key-value storage
- [D1](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-d1) - SQL database
- [R2](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2) - Object storage
- [Durable Objects](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-durable-objects) - Stateful coordination
- [Queues](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues) - Message queues
- [Wrangler](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-wrangler) - CLI tool reference
