---
title: "🔒 RATE LIMITING"
sourceId: "07-coding/cloudflare-vibesdk"
sourceTitle: "Cloudflare VibeSDK"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/cloudflare/vibesdk"
entryUrl: "https://github.com/cloudflare/vibesdk/blob/9da158d82c597a0e8f4bf033cdccd1053fb6fb15/docs/llm.md"
sourceRel: "docs/llm.md"
rawUrl: "/raw/07-coding/cloudflare-vibesdk/docs/llm.md"
sourceSha256: "5cade1cd8dea6404f985f3f367e0c0233441fc841f741f71f3da1e6c1e0c9cf7"
pageSha256: "f189172b2628c7bfcd69675d2e1ed15f3e6aad65e4dc115a492c362a90b2f1ef"
contentMode: "local-full"
zh: ""
---

# 🔒 RATE LIMITING

## Overview

**Location:** `/worker/middleware/rate-limiter.ts`

Rate limiting protects API endpoints from abuse using token bucket algorithm with Durable Object storage.

---

## Implementation

**Middleware:** Applied to all API routes except health checks

**Strategy:**
- **Token bucket algorithm** - Tokens refill over time
- **Per-user basis** - Keyed by userId (authenticated) or IP (anonymous)
- **Durable Object storage** - Distributed rate limit state
- **Graceful degradation** - Falls back on DO errors

---

## Rate Limits

| User Type | Requests | Window | Burst |
|-----------|----------|--------|-------|
| **Authenticated** | 100 | 1 minute | 150 |
| **Anonymous** | 20 | 1 minute | 30 |
| **API Keys** | 300 | 1 minute | 400 |

**Burst:** Maximum requests in short burst before throttling

---

## Response Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1698765432
```

**On rate limit exceeded:**
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 42
Content-Type: application/json

{
  "error": "Rate limit exceeded",
  "retryAfter": 42
}
```

---

## Frontend Handling

**Location:** `/src/routes/chat/utils/message-helpers.ts`

```typescript
export function handleRateLimitError(
  error: RateLimitExceededError,
  setMessages: (fn: (prev: ChatMessage[]) => ChatMessage[]) => void
) {
  const retryAfter = error.retryAfter || 60;
  const message = `Rate limit exceeded. Please wait ${retryAfter} seconds.`;
  
  setMessages(prev => [
    ...prev,
    createAIMessage('rate-limit', message)
  ]);
}
```

**Usage:**
```typescript
catch (error) {
  if (error instanceof RateLimitExceededError) {
    handleRateLimitError(error, setMessages);
    return;
  }
  // ... other error handling
}
```

---

## Bypassing for Internal Tools

Some endpoints bypass rate limiting:
- Health checks (`/health`, `/api/health`)
- WebSocket connections (rate limited separately)
- Internal service-to-service calls (authenticated with service tokens)

**Configuration:**
```typescript
// In rate-limiter.ts
const EXEMPT_PATHS = ['/health', '/api/health'];
```

---

## Monitoring

**Cloudflare Analytics:**
- 429 response rate
- Peak request times
- Top rate-limited IPs

**Custom Logs:**
```typescript
logger.warn('Rate limit exceeded', {
  userId: ctx.userId,
  ip: ctx.ip,
  path: ctx.path,
  remaining: 0
});
```

---

**Last Updated:** 2024-10-31  
**Maintainers:** All AI assistants working on this project
