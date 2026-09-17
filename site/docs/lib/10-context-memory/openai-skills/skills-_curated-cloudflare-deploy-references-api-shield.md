---
title: "Cloudflare API Shield Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/api-shield/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/api-shield/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/api-shield/README.md"
sourceSha256: "a032c7160b70c9a200e982bc457acd746760c2960e25b7554dfb315da98f71dc"
pageSha256: "a032c7160b70c9a200e982bc457acd746760c2960e25b7554dfb315da98f71dc"
contentMode: "local-full"
zh: ""
---

# Cloudflare API Shield Reference

Expert guidance for API Shield - comprehensive API security suite for discovery, protection, and monitoring.

## Reading Order

| Task | Files to Read |
|------|---------------|
| Initial setup | README → configuration.md |
| Implement JWT validation | configuration.md → api.md |
| Add schema validation | configuration.md → patterns.md |
| Detect API attacks | patterns.md → api.md |
| Debug issues | gotchas.md |

## Feature Selection

What protection do you need?

```
├─ Validate request/response structure → Schema Validation 2.0 (configuration.md)
├─ Verify auth tokens → JWT Validation (configuration.md)
├─ Client certificates → mTLS (configuration.md)
├─ Detect BOLA attacks → BOLA Detection (patterns.md)
├─ Track auth coverage → Auth Posture (patterns.md)
├─ Stop volumetric abuse → Abuse Detection (patterns.md)
└─ Discover shadow APIs → API Discovery (api.md)
```

## In This Reference

- **[configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-api-shield-configuration)** - Setup, session identifiers, rules, token/mTLS configs
- **[api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-api-shield-api)** - Endpoint management, discovery, validation APIs, GraphQL operations
- **[patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-api-shield-patterns)** - Common patterns, progressive rollout, OWASP mappings, workflows
- **[gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-api-shield-gotchas)** - Troubleshooting, false positives, performance, best practices

## Quick Start

API Shield: Enterprise-grade API security (Discovery, Schema Validation 2.0, JWT, mTLS, BOLA Detection, Auth Posture). Available as Enterprise add-on with preview access.

## See Also

- [API Shield Docs](https://developers.cloudflare.com/api-shield/)
- [API Reference](https://developers.cloudflare.com/api/resources/api_gateway/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
