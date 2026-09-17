---
title: "Cloudflare Observability Skill Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/observability/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/observability/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/observability/README.md"
sourceSha256: "5b6085ff9ff70483e47af484f554ed6a0214886bfbb74add0a146d9454514635"
pageSha256: "5b6085ff9ff70483e47af484f554ed6a0214886bfbb74add0a146d9454514635"
contentMode: "local-full"
zh: ""
---

# Cloudflare Observability Skill Reference

**Purpose**: Comprehensive guidance for implementing observability in Cloudflare Workers, covering traces, logs, metrics, and analytics.

**Scope**: Cloudflare Observability features ONLY - Workers Logs, Traces, Analytics Engine, Logpush, Metrics & Analytics, and OpenTelemetry exports.

---

## Decision Tree: Which File to Load?

Use this to route to the correct file without loading all content:

```
├─ "How do I enable/configure X?"           → configuration.md
├─ "What's the API/method/binding for X?"   → api.md
├─ "How do I implement X pattern?"          → patterns.md
│   ├─ Usage tracking/billing               → patterns.md
│   ├─ Error tracking                       → patterns.md
│   ├─ Performance monitoring               → patterns.md
│   ├─ Multi-tenant tracking                → patterns.md
│   ├─ Tail Worker filtering                → patterns.md
│   └─ OpenTelemetry export                 → patterns.md
└─ "Why isn't X working?" / "Limits?"       → gotchas.md
```

## Reading Order

Load files in this order based on task:

| Task Type | Load Order | Reason |
|-----------|------------|--------|
| **Initial setup** | configuration.md → gotchas.md | Setup first, avoid pitfalls |
| **Implement feature** | patterns.md → api.md → gotchas.md | Pattern → API details → edge cases |
| **Debug issue** | gotchas.md → configuration.md | Common issues first |
| **Query data** | api.md → patterns.md | API syntax → query examples |

## Product Overview

### Workers Logs
- **What:** Console output from Workers (console.log/warn/error)
- **Access:** Dashboard (Real-time Logs), Logpush, Tail Workers
- **Cost:** Free (included with all Workers)
- **Retention:** Real-time only (no historical storage in dashboard)

### Workers Traces
- **What:** Execution traces with timing, CPU usage, outcome
- **Access:** Dashboard (Workers Analytics → Traces), Logpush
- **Cost:** $0.10/1M spans (GA pricing starts March 1, 2026), 10M free/month
- **Retention:** 14 days included

### Analytics Engine
- **What:** High-cardinality event storage and SQL queries
- **Access:** SQL API, Dashboard (Analytics → Analytics Engine)
- **Cost:** $0.25/1M writes beyond 10M free/month
- **Retention:** 90 days (configurable up to 1 year)

### Tail Workers
- **What:** Workers that receive logs/traces from other Workers
- **Use Cases:** Log filtering, transformation, external export
- **Cost:** Standard Workers pricing

### Logpush
- **What:** Stream logs to external storage (S3, R2, Datadog, etc.)
- **Access:** Dashboard, API
- **Cost:** Requires Business/Enterprise plan

## Pricing Summary (2026)

| Feature | Free Tier | Cost Beyond Free Tier | Plan Requirement |
|---------|-----------|----------------------|------------------|
| Workers Logs | Unlimited | Free | Any |
| Workers Traces | 10M spans/month | $0.10/1M spans | Paid Workers (GA: March 1, 2026) |
| Analytics Engine | 10M writes/month | $0.25/1M writes | Paid Workers |
| Logpush | N/A | Included in plan | Business/Enterprise |

## In This Reference

- **[configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-observability-configuration)** - Setup, deployment, configuration (Logs, Traces, Analytics Engine, Tail Workers, Logpush)
- **[api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-observability-api)** - API endpoints, methods, interfaces (GraphQL, SQL, bindings, types)
- **[patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-observability-patterns)** - Common patterns, use cases, examples (billing, monitoring, error tracking, exports)
- **[gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-observability-gotchas)** - Troubleshooting, best practices, limitations (common errors, performance gotchas, pricing)

## See Also

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Analytics Engine Docs](https://developers.cloudflare.com/analytics/analytics-engine/)
- [Workers Traces Docs](https://developers.cloudflare.com/workers/observability/traces/)
