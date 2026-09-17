---
title: "Cloudflare Email Routing Skill Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/email-routing/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/email-routing/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/email-routing/README.md"
sourceSha256: "4e28709e319f3912008a2887f9f3d62bdaa98ad9e52cc5ae139b8d220e825479"
pageSha256: "4e28709e319f3912008a2887f9f3d62bdaa98ad9e52cc5ae139b8d220e825479"
contentMode: "local-full"
zh: ""
---

# Cloudflare Email Routing Skill Reference

## Overview

Cloudflare Email Routing enables custom email addresses for your domain that route to verified destination addresses. It's free, privacy-focused (no storage/access), and includes Email Workers for programmatic email processing.

**Available to all Cloudflare customers using Cloudflare as authoritative nameserver.**

## Quick Start

```typescript
// Basic email handler
export default {
  async email(message, env, ctx) {
    // CRITICAL: Must consume stream before response
    const parser = new PostalMime.default();
    const email = await parser.parse(await message.raw.arrayBuffer());
    
    // Process email
    console.log(`From: ${message.from}, Subject: ${email.subject}`);
    
    // Forward or reject
    await message.forward("verified@destination.com");
  }
} satisfies ExportedHandler<Env>;
```

## Reading Order

**Start here based on your goal:**

1. **New to Email Routing?** → [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-email-routing-configuration) → [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-email-routing-patterns)
2. **Adding Workers?** → [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-email-routing-api) § Worker Runtime API → [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-email-routing-patterns)
3. **Sending emails?** → [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-email-routing-api) § SendEmail Binding
4. **Managing via API?** → [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-email-routing-api) § REST API Operations
5. **Debugging issues?** → [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-email-routing-gotchas)

## Decision Tree

```
Need to receive emails?
├─ Simple forwarding only? → Dashboard rules (configuration.md)
├─ Complex logic/filtering? → Email Workers (api.md + patterns.md)
└─ Parse attachments/body? → postal-mime library (patterns.md § Parse Email)

Need to send emails?
├─ From Worker? → SendEmail binding (api.md § SendEmail)
└─ From external app? → Use external SMTP/API service

Having issues?
├─ Email not arriving? → gotchas.md § Mail Authentication
├─ Worker crashing? → gotchas.md § Stream Consumption
└─ Forward failing? → gotchas.md § Destination Verification
```

## Key Concepts

**Routing Rules**: Pattern-based forwarding configured via Dashboard/API. Simple but limited.

**Email Workers**: Custom TypeScript handlers with full email access. Handles complex logic, parsing, storage, rejection.

**SendEmail Binding**: Outbound email API for Workers. Transactional email only (no marketing/bulk).

**ForwardableEmailMessage**: Runtime interface for incoming emails. Provides headers, raw stream, forward/reject methods.

## In This Reference

- **[configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-email-routing-configuration)** - Setup, deployment, wrangler config
- **[api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-email-routing-api)** - REST API + Worker runtime API + types
- **[patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-email-routing-patterns)** - Common patterns with working examples
- **[gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-email-routing-gotchas)** - Critical pitfalls, troubleshooting, limits

## Architecture

```
Internet → MX Records → Cloudflare Email Routing
                            ├─ Routing Rules (dashboard)
                            └─ Email Worker (your code)
                                ├─ Forward to destination
                                ├─ Reject with reason
                                ├─ Store in R2/KV/D1
                                └─ Send outbound (SendEmail)
```

## See Also

- [Cloudflare Docs: Email Routing](https://developers.cloudflare.com/email-routing/)
- [Cloudflare Docs: Email Workers](https://developers.cloudflare.com/email-routing/email-workers/)
- [postal-mime npm package](https://www.npmjs.com/package/postal-mime)
