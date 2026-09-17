---
title: "Workerd Runtime"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/workerd/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/workerd/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/workerd/README.md"
sourceSha256: "daed9e582eff91b2c29dc77701c7c18a3d92fde0dc6883b2913df26094c0c597"
pageSha256: "daed9e582eff91b2c29dc77701c7c18a3d92fde0dc6883b2913df26094c0c597"
contentMode: "local-full"
zh: ""
---

# Workerd Runtime

V8-based JS/Wasm runtime powering Cloudflare Workers. Use as app server, dev tool, or HTTP proxy.

## ⚠️ IMPORTANT SECURITY NOTICE
**workerd is NOT a hardened sandbox.** Do not run untrusted code. It's designed for deploying YOUR code locally/self-hosted, not multi-tenant SaaS. Cloudflare production adds security layers not present in open-source workerd.

## Decision Tree: When to Use What

**95% of users:** Use Wrangler
- Local development: `wrangler dev` (uses workerd internally)
- Deployment: `wrangler deploy` (deploys to Cloudflare)
- Types: `wrangler types` (generates TypeScript types)

**Use raw workerd directly only if:**
- Self-hosting Workers runtime in production
- Embedding runtime in C++ application
- Custom tooling/testing infrastructure
- Debugging workerd-specific behavior

**Never use workerd for:**
- Running untrusted/user-submitted code
- Multi-tenant isolation (not hardened)
- Production without additional security layers

## Key Features
- **Standards-based**: Fetch API, Web Crypto, Streams, WebSocket
- **Nanoservices**: Service bindings with local call performance
- **Capability security**: Explicit bindings prevent SSRF
- **Backwards compatible**: Version = max compat date supported

## Architecture
```
Config (workerd.capnp)
├── Services (workers/endpoints)
├── Sockets (HTTP/HTTPS listeners)
└── Extensions (global capabilities)
```

## Quick Start
```bash
workerd serve config.capnp
workerd compile config.capnp myConfig -o binary
workerd test config.capnp
```

## Platform Support & Beta Status

| Platform | Status | Notes |
|----------|--------|-------|
| Linux (x64) | Stable | Primary platform |
| macOS (x64/ARM) | Stable | Full support |
| Windows | Beta | Use WSL2 for best results |
| Linux (ARM64) | Experimental | Limited testing |

workerd is in **active development**. Breaking changes possible. Pin versions in production.

## Core Concepts
- **Service**: Named endpoint (worker/network/disk/external)
- **Binding**: Capability-based resource access (KV/DO/R2/services)
- **Compatibility date**: Feature gate (always set!)
- **Modules**: ES modules (recommended) or service worker syntax

## Reading Order (Progressive Disclosure)

**Start here:**
1. This README (overview, decision tree)
2. [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workerd-patterns) - Common workflows, framework examples

**When you need details:**
3. [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workerd-configuration) - Config format, services, bindings
4. [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workerd-api) - Runtime APIs, TypeScript types
5. [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workerd-gotchas) - Common errors, debugging

## Related References
- [workers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers) - Workers runtime API documentation
- [miniflare](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-miniflare) - Testing tool built on workerd
- [wrangler](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-wrangler) - CLI that uses workerd for local dev
