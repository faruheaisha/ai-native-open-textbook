---
title: "Observability Patterns"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/observability/patterns.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/observability/patterns.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/observability/patterns.md"
sourceSha256: "df66dce8d14a5887e183dbc1831c3914cdfc731a854f1a12f6833da4b6fc05c7"
pageSha256: "df66dce8d14a5887e183dbc1831c3914cdfc731a854f1a12f6833da4b6fc05c7"
contentMode: "local-full"
zh: ""
---

# Observability Patterns

## Usage-Based Billing

```typescript
env.ANALYTICS.writeDataPoint({
  blobs: [customerId, request.url, request.method],
  doubles: [1], // request_count
  indexes: [customerId]
});
```

```sql
SELECT blob1 AS customer_id, SUM(_sample_interval * double1) AS total_calls
FROM api_usage WHERE timestamp >= DATE_TRUNC('month', NOW())
GROUP BY customer_id
```

## Performance Monitoring

```typescript
const start = Date.now();
const response = await fetch(url);
env.ANALYTICS.writeDataPoint({
  blobs: [url, response.status.toString()],
  doubles: [Date.now() - start, response.status]
});
```

```sql
SELECT blob1 AS url, AVG(double1) AS avg_ms, percentile(double1, 0.95) AS p95_ms
FROM fetch_metrics WHERE timestamp >= NOW() - INTERVAL '1' HOUR
GROUP BY url
```

## Error Tracking

```typescript
env.ANALYTICS.writeDataPoint({
  blobs: [error.name, request.url, request.method],
  doubles: [1],
  indexes: [error.name]
});
```

## Multi-Tenant Tracking

```typescript
env.ANALYTICS.writeDataPoint({
  indexes: [tenantId], // efficient filtering
  blobs: [tenantId, url.pathname, method, status],
  doubles: [1, duration, bytesSize]
});
```

## Tail Worker Log Filtering

```typescript
export default {
  async tail(events, env, ctx) {
    const critical = events.filter(e => 
      e.exceptions.length > 0 || e.event.wallTime > 1000000
    );
    if (critical.length === 0) return;
    
    ctx.waitUntil(
      fetch('https://logging.example.com/ingest', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.API_KEY}` },
        body: JSON.stringify(critical.map(e => ({
          outcome: e.event.outcome,
          cpu_ms: e.event.cpuTime / 1000,
          errors: e.exceptions
        })))
      })
    );
  }
};
```

## OpenTelemetry Export

```typescript
export default {
  async tail(events, env, ctx) {
    const otelSpans = events.map(e => ({
      traceId: generateId(32),
      spanId: generateId(16),
      name: e.scriptName || 'worker.request',
      attributes: [
        { key: 'worker.outcome', value: { stringValue: e.event.outcome } },
        { key: 'worker.cpu_time_us', value: { intValue: String(e.event.cpuTime) } }
      ]
    }));
    
    ctx.waitUntil(
      fetch('https://api.honeycomb.io/v1/traces', {
        method: 'POST',
        headers: { 'X-Honeycomb-Team': env.HONEYCOMB_KEY },
        body: JSON.stringify({ resourceSpans: [{ scopeSpans: [{ spans: otelSpans }] }] })
      })
    );
  }
};
```
