---
title: "Cloudflare API Integration"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/api/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/api/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/api/README.md"
sourceSha256: "7e5a0b6c299554eb58914d25a0fe98e016229d1c664cc9703e170e89b696a0a5"
pageSha256: "7e5a0b6c299554eb58914d25a0fe98e016229d1c664cc9703e170e89b696a0a5"
contentMode: "local-full"
zh: ""
---

# Cloudflare API Integration

Guide for working with Cloudflare's REST API - authentication, SDK usage, common patterns, and troubleshooting.

## Quick Decision Tree

```
How are you calling the Cloudflare API?
├─ From Workers runtime → Use bindings, not REST API (see ../bindings/)
├─ Server-side (Node/Python/Go) → Official SDK (see api.md)
├─ CLI/scripts → Wrangler or curl (see configuration.md)
├─ Infrastructure-as-code → See ../pulumi/ or ../terraform/
└─ One-off requests → curl examples (see api.md)
```

## SDK Selection

| Language | Package | Best For | Default Retries |
|----------|---------|----------|-----------------|
| TypeScript | `cloudflare` | Node.js, Bun, Next.js, Workers | 2 |
| Python | `cloudflare` | FastAPI, Django, scripts | 2 |
| Go | `cloudflare-go/v4` | CLI tools, microservices | 10 |

All SDKs are Stainless-generated from OpenAPI spec (consistent APIs).

## Authentication Methods

| Method | Security | Use Case | Scope |
|--------|----------|----------|-------|
| **API Token** ✓ | Scoped, rotatable | Production | Per-zone or account |
| API Key + Email | Full account access | Legacy only | Everything |
| User Service Key | Limited | Origin CA certs only | Origin CA |

**Always use API tokens** for new projects.

## Rate Limits

| Limit | Value |
|-------|-------|
| Per user/token | 1200 requests / 5 minutes |
| Per IP | 200 requests / second |
| GraphQL | 320 / 5 minutes (cost-based) |

## Reading Order

| Task | Files to Read |
|------|---------------|
| Initialize SDK client | api.md |
| Configure auth/timeout/retry | configuration.md |
| Find usage patterns | patterns.md |
| Debug errors/rate limits | gotchas.md |
| Product-specific APIs | ../workers/, ../r2/, ../kv/, etc. |

## In This Reference

- **[api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-api-api)** - SDK client initialization, pagination, error handling, examples
- **[configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-api-configuration)** - Environment variables, SDK config, Wrangler setup
- **[patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-api-patterns)** - Real-world patterns, batch operations, workflows
- **[gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-api-gotchas)** - Rate limits, SDK-specific issues, troubleshooting

## See Also

- [Cloudflare API Docs](https://developers.cloudflare.com/api/)
- [Bindings Reference](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-bindings) - Workers runtime bindings (preferred over REST API)
- [Wrangler Reference](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-wrangler) - CLI tool for Cloudflare development
