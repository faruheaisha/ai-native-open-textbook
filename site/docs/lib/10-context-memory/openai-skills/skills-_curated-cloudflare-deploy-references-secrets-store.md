---
title: "Cloudflare Secrets Store"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/secrets-store/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/secrets-store/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/secrets-store/README.md"
sourceSha256: "82c078e9d71d9bd28b2f23535f086e74bec7adad08e3cb6c289326a4a6e14550"
pageSha256: "82c078e9d71d9bd28b2f23535f086e74bec7adad08e3cb6c289326a4a6e14550"
contentMode: "local-full"
zh: ""
---

# Cloudflare Secrets Store

Account-level encrypted secret management for Workers and AI Gateway.

## Overview

**Secrets Store**: Centralized, account-level secrets, reusable across Workers
**Worker Secrets**: Per-Worker secrets (`wrangler secret put`)

### Architecture

- **Store**: Container (1/account in beta)
- **Secret**: String ≤1024 bytes
- **Scopes**: Permission boundaries controlling access
  - `workers`: For Workers runtime access
  - `ai-gateway`: For AI Gateway access
  - Secrets must have correct scope for binding to work
- **Bindings**: Connect secrets via `env` object

**Regional Availability**: Global except China Network (unavailable)

### Access Control

- **Super Admin**: Full access
- **Admin**: Create/edit/delete secrets, view metadata
- **Deployer**: View metadata + bindings
- **Reporter**: View metadata only

API Token permissions: `Account Secrets Store Edit/Read`

### Limits (Beta)

- 100 secrets/account
- 1 store/account
- 1024 bytes max/secret
- Production secrets count toward limit

## When to Use

**Use Secrets Store when:**
- Multiple Workers share same credential
- Centralized management needed
- Compliance requires audit trail
- Team collaboration on secrets

**Use Worker Secrets when:**
- Secret unique to one Worker
- Simple single-Worker project
- No cross-Worker sharing needed

## In This Reference

### Reading Order by Task

| Task | Start Here | Then Read |
|------|------------|-----------|
| Quick overview | README.md | - |
| First-time setup | README.md → configuration.md | api.md |
| Add secret to Worker | configuration.md | api.md |
| Implement access pattern | api.md | patterns.md |
| Debug errors | gotchas.md | api.md |
| Secret rotation | patterns.md | configuration.md |
| Best practices | gotchas.md | patterns.md |

### Files

- [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-secrets-store-configuration) - Wrangler commands, binding config
- [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-secrets-store-api) - Binding API, get/put/delete operations
- [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-secrets-store-patterns) - Rotation, encryption, access control
- [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-secrets-store-gotchas) - Security issues, limits, best practices

## See Also
- [workers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers) - Worker bindings integration
- [wrangler](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-wrangler) - CLI secret management commands
