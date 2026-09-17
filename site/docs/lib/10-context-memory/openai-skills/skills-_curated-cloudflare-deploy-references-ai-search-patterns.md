---
title: "AI Search Patterns"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/ai-search/patterns.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/ai-search/patterns.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/ai-search/patterns.md"
sourceSha256: "1215875bf8a9e6317d31019a84a124aa7ba7e85bac10b92bc445d0ef7383d619"
pageSha256: "1215875bf8a9e6317d31019a84a124aa7ba7e85bac10b92bc445d0ef7383d619"
contentMode: "local-full"
zh: ""
---

# AI Search Patterns

## search() vs aiSearch()

| Use | Method | Returns |
|-----|--------|---------|
| Custom UI, analytics | `search()` | Raw chunks only (~100-300ms) |
| Chatbots, Q&A | `aiSearch()` | AI response + chunks (~500-2000ms) |

## rewrite_query

| Setting | Use When |
|---------|----------|
| `true` | User input (typos, vague queries) |
| `false` | LLM-generated queries (already optimized) |

## Multitenancy (Folder-Based)

```typescript
const answer = await env.AI.autorag("saas-docs").aiSearch({
  query: "refund policy",
  model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  filters: {
    column: "folder",
    operator: "gte",  // "starts with" pattern
    value: `tenants/${tenantId}/`
  }
});
```

## Streaming

```typescript
const stream = await env.AI.autorag("docs").aiSearch({
  query, model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast", stream: true
});
return new Response(stream, { headers: { "Content-Type": "text/event-stream" } });
```

## Score Threshold

| Threshold | Use |
|-----------|-----|
| 0.3 (default) | Broad recall, exploratory |
| 0.5 | Balanced, production default |
| 0.7 | High precision, critical accuracy |

## System Prompt Template

```typescript
const systemPrompt = `You are a documentation assistant.
- Answer ONLY based on provided context
- If context doesn't contain answer, say "I don't have information"
- Include code examples from context`;
```

## Compound Filters

```typescript
// OR: Multiple folders
filters: {
  operator: "or",
  filters: [
    { column: "folder", operator: "gte", value: "docs/api/" },
    { column: "folder", operator: "gte", value: "docs/auth/" }
  ]
}

// AND: Folder + date
filters: {
  operator: "and",
  filters: [
    { column: "folder", operator: "gte", value: "docs/" },
    { column: "timestamp", operator: "gte", value: oneWeekAgoSeconds }
  ]
}
```

## Reranking

Enable for high-stakes use cases (adds ~300ms latency):

```typescript
reranking: { enabled: true, model: "@cf/baai/bge-reranker-base" }
```
