---
title: "Microsoft Agent Skills"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cost/cost-optimization/services/redis/azure-cache-for-redis.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cost/cost-optimization/services/redis/azure-cache-for-redis.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cost/cost-optimization/services/redis/azure-cache-for-redis.md"
sourceSha256: "6c5cd1a2379575bfe6ee68c6277c0cf5a08070ec59e71977d07bd2ef1c1e9cf3"
pageSha256: "6c5cd1a2379575bfe6ee68c6277c0cf5a08070ec59e71977d07bd2ef1c1e9cf3"
contentMode: "local-full"
zh: ""
---

# Microsoft Agent Skills

## Azure Redis Cost Optimization

Reference guide for identifying cost savings opportunities in Azure Redis deployments through analysis and targeted scans.

## Subscription Input Options

Accept any of these identifiers to identify subscriptions for analysis:

| Input Type | Example | Use Case |
|------------|---------|----------|
| **Subscription ID** | `a1b2c3d4-...` | Analyze specific subscription |
| **Subscription Name** | `Production-Environment` | User-friendly identifier |
| **Subscription Prefix** | `CacheTeam -` | Analyze all team subscriptions |
| **Tenant ID** | `tenant-guid` | Analyze entire organization |
| **"All my subscriptions"** | (keyword) | Scan all accessible subscriptions |

## Cost Optimization Rules

When analyzing each cache, apply these prioritized rules:

| Priority | Rule | Detection Logic | Recommendation | Avg Savings |
|----------|------|----------------|----------------|-------------|
| 🔴 Critical | Failed Cache | `provisioningState == 'Failed'` | Delete immediately | $50-300/mo |
| 🔴 Critical | Stuck Creating | `provisioningState == 'Creating'` AND age >4 hours | Delete/support ticket | $50-300/mo |
| 🟠 High | Premium in Dev | `sku.name == 'Premium'` AND `tags.environment in ['dev','test','staging']` | Downgrade to Standard | $175/mo |
| 🟠 High | Enterprise Unused | `sku.name startsWith 'Enterprise'` AND no modules/clustering | Downgrade to Premium/Standard | $300-1000/mo |
| 🟠 High | Old Test Cache | `tags.purpose == 'test'` AND age >60 days | Delete or downgrade | $50-150/mo |
| 🟡 Medium | Large Dev Cache | `sku.capacity >3` AND `tags.environment == 'dev'` | Reduce size | $100-300/mo |
| 🟡 Medium | No Expiration Tag | Missing `expirationDate` or `ttl` tag | Add cleanup policy | N/A |
| 🟢 Low | Untagged Resource | Missing required tags (`environment`, `owner`) | Apply tags | N/A |
| 🟢 Low | Old Cache | Age >365 days | Review if still needed | Variable |

## Report Templates

### Subscription-Level Summary
Quick overview of costs and issues per subscription (use for multi-subscription scans). Include: subscription name/ID, total monthly cost, number of caches, cache count by SKU tier, and top issues found.

### Detailed Cache Analysis
Individual cache breakdown with specific recommendations. Include: cache name, resource group, SKU tier, current cost, memory usage %, CPU usage %, connection count, and specific rightsizing recommendations.

## Tools & Commands

**MCP Tool:** `azure__redis` with command `redis_list` (parameter: `subscription`)

**Azure CLI Equivalents:**
- `az account list` - List subscriptions
- `az redis list --subscription <id>` - List Redis caches
- `az redis show` - Get cache details
- `az redis delete` - Remove cache
