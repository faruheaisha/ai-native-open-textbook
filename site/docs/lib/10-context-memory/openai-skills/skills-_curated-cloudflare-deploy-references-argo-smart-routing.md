---
title: "Cloudflare Argo Smart Routing Skill Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/argo-smart-routing/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/argo-smart-routing/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/argo-smart-routing/README.md"
sourceSha256: "405ab3a8878c32c95e12fb1c769f6cf79a597def8898b5e291d347a04c3e9052"
pageSha256: "405ab3a8878c32c95e12fb1c769f6cf79a597def8898b5e291d347a04c3e9052"
contentMode: "local-full"
zh: ""
---

# Cloudflare Argo Smart Routing Skill Reference

## Overview

Cloudflare Argo Smart Routing is a performance optimization service that detects real-time network issues and routes web traffic across the most efficient network path. It continuously monitors network conditions and intelligently routes traffic through the fastest, most reliable routes in Cloudflare's network.

**Note on Smart Shield:** Argo Smart Routing is being integrated into Cloudflare's Smart Shield product for enhanced DDoS protection and performance. Existing Argo customers maintain full functionality with gradual migration to Smart Shield features.

## Quick Start

### Enable via cURL
```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/{zone_id}/argo/smart_routing" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value": "on"}'
```

### Enable via TypeScript SDK
```typescript
import Cloudflare from 'cloudflare';

const client = new Cloudflare({ apiToken: process.env.CLOUDFLARE_API_TOKEN });

const result = await client.argo.smartRouting.edit({
  zone_id: 'your-zone-id',
  value: 'on',
});

console.log(`Argo enabled: ${result.value}`);
```

## Core Concepts

### What It Does
- **Intelligent routing**: Detects congestion, outages, packet loss in real-time
- **Global optimization**: Routes across 300+ Cloudflare data centers
- **Automatic failover**: Switches paths when issues detected (typically <1s)
- **Works with existing setup**: No origin changes required

### Billing Model
- Usage-based: Charged per GB of traffic (excluding DDoS/WAF mitigated traffic)
- Requires billing configuration before enabling
- Available on Enterprise+ plans (check zone eligibility)

### When to Use
- **High-traffic production sites** with global user base
- **Latency-sensitive applications** (APIs, real-time services)
- **Sites behind Cloudflare proxy** (orange-clouded DNS records)
- **Combined with Tiered Cache** for maximum performance gains

### When NOT to Use
- Development/staging environments (cost control)
- Low-traffic sites (<1TB/month) where cost may exceed benefit
- Sites with primarily single-region traffic

## Should I Enable Argo?

| Your Situation | Recommendation |
|----------------|----------------|
| Global production app, >1TB/month traffic | ✅ Enable - likely ROI positive |
| Enterprise plan, latency-critical APIs | ✅ Enable - performance matters |
| Regional site, <100GB/month traffic | ⚠️ Evaluate - cost may not justify |
| Development/staging environment | ❌ Disable - use in production only |
| Not yet configured billing | ❌ Configure billing first |

## Reading Order by Task

| Your Goal | Start With | Then Read |
|-----------|------------|-----------|
| Enable Argo for first time | Quick Start above → [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-configuration) | [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-gotchas) |
| Use TypeScript/Python SDK | [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-api) | [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-patterns) |
| Terraform/IaC setup | [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-configuration) | - |
| Enable for Spectrum TCP app | [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-patterns) → Spectrum section | [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-api) |
| Troubleshoot enablement issue | [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-gotchas) | [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-api) |
| Manage billing/usage | [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-patterns) → Billing section | [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-gotchas) |

## In This Reference

- **[api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-api)** - API endpoints, SDK methods, error handling, Python/TypeScript examples
- **[configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-configuration)** - Terraform setup, environment config, billing configuration
- **[patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-patterns)** - Tiered Cache integration, Spectrum TCP apps, billing management, validation patterns
- **[gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-argo-smart-routing-gotchas)** - Common errors, permission issues, limits, best practices

## See Also

- [Cloudflare Argo Smart Routing Docs](https://developers.cloudflare.com/argo-smart-routing/)
- [Cloudflare Smart Shield](https://developers.cloudflare.com/smart-shield/)
- [Spectrum Documentation](https://developers.cloudflare.com/spectrum/)
- [Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/)
