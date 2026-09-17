---
title: "AI Search API Reference"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/ai-search/api.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/ai-search/api.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/ai-search/api.md"
sourceSha256: "cff4ce1bee49988265f176fe5a0bdd69714a1b6e215a65662ddbf305f981d05f"
pageSha256: "cff4ce1bee49988265f176fe5a0bdd69714a1b6e215a65662ddbf305f981d05f"
contentMode: "local-full"
zh: ""
---

# AI Search API Reference

## Workers Binding

```typescript
const answer = await env.AI.autorag("instance-name").aiSearch(options);
const results = await env.AI.autorag("instance-name").search(options);
const instances = await env.AI.autorag("_").listInstances();
```

## aiSearch() Options

```typescript
interface AiSearchOptions {
  query: string;                          // User query
  model: string;                          // Workers AI model ID
  system_prompt?: string;                 // LLM instructions
  rewrite_query?: boolean;                // Fix typos (default: false)
  max_num_results?: number;               // Max chunks (default: 10)
  ranking_options?: { score_threshold?: number }; // 0.0-1.0 (default: 0.3)
  reranking?: { enabled: boolean; model: string };
  stream?: boolean;                       // Stream response (default: false)
  filters?: Filter;                       // Metadata filters
  page?: string;                          // Pagination token
}
```

## Response

```typescript
interface AiSearchResponse {
  search_query: string;      // Query used (rewritten if enabled)
  response: string;          // AI-generated answer
  data: SearchResult[];      // Retrieved chunks
  has_more: boolean;
  next_page?: string;
}

interface SearchResult {
  id: string;
  score: number;
  content: string;
  metadata: { filename: string; folder: string; timestamp: number };
}
```

## Filters

```typescript
// Comparison
{ column: "folder", operator: "gte", value: "docs/" }

// Compound
{ operator: "and", filters: [
  { column: "folder", operator: "gte", value: "docs/" },
  { column: "timestamp", operator: "gte", value: 1704067200 }
]}
```

**Operators:** `eq`, `ne`, `gt`, `gte`, `lt`, `lte`

**Built-in metadata:** `filename`, `folder`, `timestamp` (Unix seconds)

## Streaming

```typescript
const stream = await env.AI.autorag("docs").aiSearch({ query, model, stream: true });
return new Response(stream, { headers: { "Content-Type": "text/event-stream" } });
```

## Error Types

| Error | Cause |
|-------|-------|
| `AutoRAGNotFoundError` | Instance doesn't exist |
| `AutoRAGUnauthorizedError` | Invalid/missing token |
| `AutoRAGValidationError` | Invalid parameters |

## REST API

```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/autorag/rags/{NAME}/ai-search \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{"query": "...", "model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast"}'
```

Requires Service API token with "AI Search - Read" permission.
