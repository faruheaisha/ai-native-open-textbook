---
title: "Cloudflare Workers Analytics Engine Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/analytics-engine/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/analytics-engine/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/analytics-engine/README.md"
sourceSha256: "123cb825f034688e3603b5a5fb6b372bbd9d82cabaa047bf787631ecb2026702"
pageSha256: "123cb825f034688e3603b5a5fb6b372bbd9d82cabaa047bf787631ecb2026702"
contentMode: "local-full"
zh: ""
---

# Cloudflare Workers Analytics Engine Reference

Expert guidance for implementing unlimited-cardinality analytics at scale using Cloudflare Workers Analytics Engine.

## What is Analytics Engine?

Time-series analytics database designed for high-cardinality data (millions of unique dimensions). Write data points from Workers, query via SQL API. Use for:
- Custom user-facing analytics dashboards
- Usage-based billing & metering
- Per-customer/per-feature monitoring
- High-frequency instrumentation without performance impact

**Key Capability:** Track metrics with unlimited unique values (e.g., millions of user IDs, API keys) without performance degradation.

## Core Concepts

| Concept | Description | Example |
|---------|-------------|---------|
| **Dataset** | Logical table for related metrics | `api_requests`, `user_events` |
| **Data Point** | Single measurement with timestamp | One API request's metrics |
| **Blobs** | String dimensions (max 20) | endpoint, method, status, user_id |
| **Doubles** | Numeric values (max 20) | latency_ms, request_count, bytes |
| **Indexes** | Filtered blobs for efficient queries | customer_id, api_key |

## Reading Order

| Task | Start Here | Then Read |
|------|------------|-----------|
| **First-time setup** | [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-configuration) → [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-api) → [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-patterns) | |
| **Writing data** | [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-api) → [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-gotchas) (sampling) | |
| **Querying data** | [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-api) (SQL API) → [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-patterns) (examples) | |
| **Debugging** | [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-gotchas) → [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-api) (limits) | |
| **Optimization** | [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-patterns) (anti-patterns) → [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-gotchas) | |

## When to Use Analytics Engine

```
Need to track metrics? → Yes
  ↓
Millions of unique dimension values? → Yes
    ↓
  Need real-time queries? → Yes
      ↓
    Use Analytics Engine ✓

Alternative scenarios:
- Low cardinality (<10k unique values) → Workers Analytics (free tier)
- Complex joins/relations → D1 Database
- Logs/debugging → Tail Workers (logpush)
- External tools → Send to external analytics (Datadog, etc.)
```

## Quick Start

1. Add binding to `wrangler.jsonc`:
```jsonc
{
  "analytics_engine_datasets": [
    { "binding": "ANALYTICS", "dataset": "my_events" }
  ]
}
```

2. Write data points (fire-and-forget, no await):
```typescript
env.ANALYTICS.writeDataPoint({
  blobs: ["/api/users", "GET", "200"],
  doubles: [145.2, 1],  // latency_ms, count
  indexes: [customerId]
});
```

3. Query via SQL API (HTTP):
```sql
SELECT blob1, SUM(double2) AS total_requests
FROM my_events
WHERE index1 = 'customer_123'
  AND timestamp >= NOW() - INTERVAL '7' DAY
GROUP BY blob1
ORDER BY total_requests DESC
```

## In This Reference

- **[configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-configuration)** - Setup, bindings, TypeScript types, limits
- **[api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-api)** - `writeDataPoint()`, SQL API, query syntax
- **[patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-patterns)** - Use cases, examples, anti-patterns
- **[gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-analytics-engine-gotchas)** - Sampling, index selection, troubleshooting

## See Also

- [Cloudflare Analytics Engine Docs](https://developers.cloudflare.com/analytics/analytics-engine/)
