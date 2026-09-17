---
title: "Cloudflare Snippets Skill Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/snippets/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/snippets/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/snippets/README.md"
sourceSha256: "4f66291949e5fb2a66e49a98b392c2d18057ff36ba74906feae3aeef94f9701f"
pageSha256: "4f66291949e5fb2a66e49a98b392c2d18057ff36ba74906feae3aeef94f9701f"
contentMode: "local-full"
zh: ""
---

# Cloudflare Snippets Skill Reference

## Description
Expert guidance for **Cloudflare Snippets ONLY** - a lightweight JavaScript-based edge logic platform for modifying HTTP requests and responses. Snippets run as part of the Ruleset Engine and are included at no additional cost on paid plans (Pro, Business, Enterprise).

## What Are Snippets?
Snippets are JavaScript functions executed at the edge as part of Cloudflare's Ruleset Engine. Key characteristics:
- **Execution time**: 5ms CPU limit per request
- **Size limit**: 32KB per snippet
- **Runtime**: V8 isolate (subset of Workers APIs)
- **Subrequests**: 2-5 fetch calls depending on plan
- **Cost**: Included with Pro/Business/Enterprise plans

## Snippets vs Workers Decision Matrix

| Factor | Choose Snippets If... | Choose Workers If... |
|--------|----------------------|---------------------|
| **Complexity** | Simple request/response modifications | Complex business logic, routing, middleware |
| **Execution time** | <5ms sufficient | Need >5ms or variable time |
| **Subrequests** | 2-5 fetch calls sufficient | Need >5 subrequests or complex orchestration |
| **Code size** | <32KB sufficient | Need >32KB or npm dependencies |
| **Cost** | Want zero additional cost | Can afford $5/mo + usage |
| **APIs** | Need basic fetch, headers, URL | Need KV, D1, R2, Durable Objects, cron triggers |
| **Deployment** | Need rule-based triggers | Want custom routing logic |

**Rule of thumb**: Use Snippets for modifications, Workers for applications.

## Execution Model
1. Request arrives at Cloudflare edge
2. Ruleset Engine evaluates snippet rules (filter expressions)
3. If rule matches, snippet executes within 5ms limit
4. Modified request/response continues through pipeline
5. Response returned to client

Snippets execute synchronously in the request path - performance is critical.

## Reading Order
1. **[configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-snippets-configuration)** - Start here: setup, deployment methods (Dashboard/API/Terraform)
2. **[api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-snippets-api)** - Core APIs: Request, Response, headers, `request.cf` properties
3. **[patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-snippets-patterns)** - Real-world examples: geo-routing, A/B tests, security headers
4. **[gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-snippets-gotchas)** - Troubleshooting: common errors, performance tips, API limitations

## In This Reference

- **[configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-snippets-configuration)** - Setup, deployment, configuration
- **[api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-snippets-api)** - API endpoints, methods, interfaces
- **[patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-snippets-patterns)** - Common patterns, use cases, examples
- **[gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-snippets-gotchas)** - Troubleshooting, best practices, limitations

## Quick Start
```javascript
// Snippet: Add security headers
export default {
  async fetch(request) {
    const response = await fetch(request);
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("X-Frame-Options", "DENY");
    newResponse.headers.set("X-Content-Type-Options", "nosniff");
    return newResponse;
  }
}
```

Deploy via Dashboard (Rules → Snippets) or API/Terraform. See configuration.md for details.

## See Also

- [Cloudflare Docs](https://developers.cloudflare.com/rules/snippets/)
