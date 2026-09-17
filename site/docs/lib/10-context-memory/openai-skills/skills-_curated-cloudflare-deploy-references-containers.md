---
title: "Cloudflare Containers Skill Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/containers/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/containers/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/containers/README.md"
sourceSha256: "84ac21e42da260e8a2a5cbf677b455a7a06e0585dcd56be49895c014a26ae998"
pageSha256: "84ac21e42da260e8a2a5cbf677b455a7a06e0585dcd56be49895c014a26ae998"
contentMode: "local-full"
zh: ""
---

# Cloudflare Containers Skill Reference

**APPLIES TO: Cloudflare Containers ONLY - NOT general Cloudflare Workers**

Use when working with Cloudflare Containers: deploying containerized apps on Workers platform, configuring container-enabled Durable Objects, managing container lifecycle, or implementing stateful/stateless container patterns.

## Beta Status

⚠️ Containers is currently in **beta**. API may change without notice. No SLA guarantees. Custom instance types added Jan 2026.

## Core Concepts

**Container as Durable Object:** Each container is a Durable Object with persistent identity. Accessed via `getByName(id)` or `getRandom()`.

**Image deployment:** Images pre-fetched globally. Deployments use rolling strategy (not instant like Workers).

**Lifecycle:** cold start (2-3s) → running → `sleepAfter` timeout → stopped. No autoscaling - manual load balancing via `getRandom()`.

**Persistent identity, ephemeral disk:** Container ID persists, but disk resets on stop. Use Durable Object storage for persistence.

## Quick Start

```typescript
import { Container } from "@cloudflare/containers";

export class MyContainer extends Container {
  defaultPort = 8080;
  sleepAfter = "30m";
}

export default {
  async fetch(request: Request, env: Env) {
    const container = env.MY_CONTAINER.getByName("instance-1");
    await container.startAndWaitForPorts();
    return container.fetch(request);
  }
};
```

## Reading Order

| Task | Files |
|------|-------|
| Setup new container project | README → configuration.md |
| Implement container logic | README → api.md → patterns.md |
| Choose routing pattern | patterns.md (routing section) |
| Debug issues | gotchas.md |
| Production hardening | gotchas.md → patterns.md (lifecycle) |

## Routing Decision Tree

**How should requests reach containers?**

- **Same user/session → same container:** Use `getByName(sessionId)` for session affinity
- **Stateless, spread load:** Use `getRandom()` for load balancing
- **Job per container:** Use `getByName(jobId)` + explicit lifecycle management
- **Single global instance:** Use `getByName("singleton")`

## When to Use Containers vs Workers

**Use Containers when:**
- Need stateful, long-lived processes (sessions, WebSockets, games)
- Running existing containerized apps (Node.js, Python, custom binaries)
- Need filesystem access or specific system dependencies
- Per-user/session isolation with dedicated compute

**Use Workers when:**
- Stateless HTTP handlers
- Sub-millisecond cold starts required
- Auto-scaling to zero critical
- Simple request/response patterns

## In This Reference

- **[configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-containers-configuration)** - Wrangler config, instance types, Container class properties, environment variables, account limits
- **[api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-containers-api)** - Container class API, startup methods, communication (HTTP/TCP/WebSocket), routing helpers, lifecycle hooks, scheduling, state inspection
- **[patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-containers-patterns)** - Routing patterns (session affinity, load balancing, singleton), WebSocket forwarding, graceful shutdown, Workflow/Queue integration
- **[gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-containers-gotchas)** - Critical gotchas (WebSocket, startup methods), common errors with solutions, specific limits, beta caveats

## See Also

- [Durable Objects](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-durable-objects) - Containers extend Durable Objects
- [Workflows](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workflows) - Orchestrate container operations
- [Queues](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues) - Trigger containers from queue messages
- [Cloudflare Docs](https://developers.cloudflare.com/containers/)
