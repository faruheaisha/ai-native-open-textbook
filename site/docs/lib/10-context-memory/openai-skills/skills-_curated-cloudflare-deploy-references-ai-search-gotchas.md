---
title: "AI Search Gotchas"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/ai-search/gotchas.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/ai-search/gotchas.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/ai-search/gotchas.md"
sourceSha256: "e548c0f2cba170e81dd3e9e15b7cf430eabd7e73770ed29589b90dc20c3bf452"
pageSha256: "e548c0f2cba170e81dd3e9e15b7cf430eabd7e73770ed29589b90dc20c3bf452"
contentMode: "local-full"
zh: ""
---

# AI Search Gotchas

## Type Safety

**Timestamp precision:** Use seconds (10-digit), not milliseconds.
```typescript
const nowInSeconds = Math.floor(Date.now() / 1000); // Correct
```

**Folder prefix matching:** Use `gte` for "starts with" on paths.
```typescript
filters: { column: "folder", operator: "gte", value: "docs/api/" } // Matches nested
```

## Filter Limitations

| Limit | Value |
|-------|-------|
| Max nesting depth | 2 levels |
| Filters per compound | 10 |
| `or` operator | Same column, `eq` only |

**OR restriction example:**
```typescript
// ✅ Valid: same column, eq only
{ operator: "or", filters: [
  { column: "folder", operator: "eq", value: "docs/" },
  { column: "folder", operator: "eq", value: "guides/" }
]}
```

## Indexing Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| File not indexed | Unsupported format or >4MB | Check format (.md/.txt/.html/.pdf/.doc/.csv/.json) |
| Index out of sync | 6-hour index cycle | Wait or use "Force Sync" (30s rate limit) |
| Empty results | Index incomplete | Check dashboard for indexing status |

## Auth Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `AutoRAGUnauthorizedError` | Invalid/missing token | Create Service API token with AI Search permissions |
| `AutoRAGNotFoundError` | Wrong instance name | Verify exact name from dashboard |

## Performance

**Slow responses (>3s):**
```typescript
// Add score threshold + limit results
ranking_options: { score_threshold: 0.5 },
max_num_results: 10
```

**Empty results debug:**
1. Remove filters, test basic query
2. Lower `score_threshold` to 0.1
3. Check index is populated

## Limits

| Resource | Limit |
|----------|-------|
| Instances per account | 10 |
| Files per instance | 100,000 |
| Max file size | 4 MB |
| Index frequency | 6 hours |

## Anti-Patterns

**Use env vars for instance names:**
```typescript
const answer = await env.AI.autorag(env.AI_SEARCH_INSTANCE).aiSearch({...});
```

**Handle specific error types:**
```typescript
if (error instanceof AutoRAGNotFoundError) { /* 404 */ }
if (error instanceof AutoRAGUnauthorizedError) { /* 401 */ }
```
