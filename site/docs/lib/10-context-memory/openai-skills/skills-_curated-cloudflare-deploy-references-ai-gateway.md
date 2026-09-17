---
title: "Cloudflare AI Gateway"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/ai-gateway/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/ai-gateway/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/ai-gateway/README.md"
sourceSha256: "3d1edf888ad79bf599c6b21b66e0ba68c0473c5a2c60be1bf2e5a21b68623089"
pageSha256: "3d1edf888ad79bf599c6b21b66e0ba68c0473c5a2c60be1bf2e5a21b68623089"
contentMode: "local-full"
zh: ""
---

# Cloudflare AI Gateway

Expert guidance for implementing Cloudflare AI Gateway - a universal gateway for AI model providers with analytics, caching, rate limiting, and routing capabilities.

## When to Use This Reference

- Setting up AI Gateway for any AI provider (OpenAI, Anthropic, Workers AI, etc.)
- Implementing caching, rate limiting, or request retry/fallback
- Configuring dynamic routing with A/B testing or model fallbacks
- Managing provider API keys securely with BYOK
- Adding security features (guardrails, DLP)
- Setting up observability with logging and custom metadata
- Debugging AI Gateway requests or optimizing configurations

## Quick Start

**What's your setup?**

- **Using Vercel AI SDK** → Pattern 1 (recommended) - see [sdk-integration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-sdk-integration)
- **Using OpenAI SDK** → Pattern 2 - see [sdk-integration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-sdk-integration)
- **Cloudflare Worker + Workers AI** → Pattern 3 - see [sdk-integration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-sdk-integration)
- **Direct HTTP (any language)** → Pattern 4 - see [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-configuration)
- **Framework (LangChain, etc.)** → See [sdk-integration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-sdk-integration)

## Pattern 1: Vercel AI SDK (Recommended)

Most modern pattern using official `ai-gateway-provider` package with automatic fallbacks.

```typescript
import { createAiGateway } from 'ai-gateway-provider';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const gateway = createAiGateway({
  accountId: process.env.CF_ACCOUNT_ID,
  gateway: process.env.CF_GATEWAY_ID,
});

const openai = createOpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

// Single model
const { text } = await generateText({
  model: gateway(openai('gpt-4o')),
  prompt: 'Hello'
});

// Automatic fallback array
const { text } = await generateText({
  model: gateway([
    openai('gpt-4o'),              // Try first
    anthropic('claude-sonnet-4-5'), // Fallback
  ]),
  prompt: 'Hello'
});
```

**Install:** `npm install ai-gateway-provider ai @ai-sdk/openai @ai-sdk/anthropic`

## Pattern 2: OpenAI SDK

Drop-in replacement for OpenAI API with multi-provider support.

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/compat`,
  defaultHeaders: {
    'cf-aig-authorization': `Bearer ${cfToken}` // For authenticated gateways
  }
});

// Switch providers by changing model format: {provider}/{model}
const response = await client.chat.completions.create({
  model: 'openai/gpt-4o', // or 'anthropic/claude-sonnet-4-5'
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

## Pattern 3: Workers AI Binding

For Cloudflare Workers using Workers AI.

```typescript
export default {
  async fetch(request, env, ctx) {
    const response = await env.AI.run(
      '@cf/meta/llama-3-8b-instruct',
      { messages: [{ role: 'user', content: 'Hello!' }] },
      { 
        gateway: { 
          id: 'my-gateway',
          metadata: { userId: '123', team: 'engineering' }
        } 
      }
    );
    
    return Response.json(response);
  }
};
```

## Headers Quick Reference

| Header | Purpose | Example | Notes |
|--------|---------|---------|-------|
| `cf-aig-authorization` | Gateway auth | `Bearer \{token\}` | Required for authenticated gateways |
| `cf-aig-metadata` | Tracking | `\{"userId":"x"\}` | Max 5 entries, flat structure |
| `cf-aig-cache-ttl` | Cache duration | `3600` | Seconds, min 60, max 2592000 (30 days) |
| `cf-aig-skip-cache` | Bypass cache | `true` | - |
| `cf-aig-cache-key` | Custom cache key | `my-key` | Must be unique per response |
| `cf-aig-collect-log` | Skip logging | `false` | Default: true |
| `cf-aig-cache-status` | Cache hit/miss | Response only | `HIT` or `MISS` |

## In This Reference

| File | Purpose |
|------|---------|
| [sdk-integration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-sdk-integration) | Vercel AI SDK, OpenAI SDK, Workers binding patterns |
| [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-configuration) | Dashboard setup, wrangler, API tokens |
| [features.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-features) | Caching, rate limits, guardrails, DLP, BYOK, unified billing |
| [dynamic-routing.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-dynamic-routing) | Fallbacks, A/B testing, conditional routing |
| [troubleshooting.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-troubleshooting) | Debugging, errors, observability, gotchas |

## Reading Order

| Task | Files |
|------|-------|
| First-time setup | README + [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-configuration) |
| SDK integration | README + [sdk-integration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-sdk-integration) |
| Enable caching | README + [features.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-features) |
| Setup fallbacks | README + [dynamic-routing.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-dynamic-routing) |
| Debug errors | README + [troubleshooting.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-ai-gateway-troubleshooting) |

## Architecture

AI Gateway acts as a proxy between your application and AI providers:

```
Your App → AI Gateway → AI Provider (OpenAI, Anthropic, etc.)
         ↓
    Analytics, Caching, Rate Limiting, Logging
```

**Key URL patterns:**
- Unified API (OpenAI-compatible): `https://gateway.ai.cloudflare.com/v1/\{account_id\}/\{gateway_id\}/compat/chat/completions`
- Provider-specific: `https://gateway.ai.cloudflare.com/v1/\{account_id\}/\{gateway_id\}/\{provider\}/\{endpoint\}`
- Dynamic routes: Use route name instead of model: `dynamic/\{route-name\}`

## Gateway Types

1. **Unauthenticated Gateway**: Open access (not recommended for production)
2. **Authenticated Gateway**: Requires `cf-aig-authorization` header with Cloudflare API token (recommended)

## Provider Authentication Options

1. **Unified Billing**: Use AI Gateway billing to pay for inference (keyless mode - no provider API key needed)
2. **BYOK (Store Keys)**: Store provider API keys in Cloudflare dashboard
3. **Request Headers**: Include provider API key in each request

## Related Skills

- [Workers AI](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers-ai) - For `env.AI.run()` details
- [Agents SDK](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-agents-sdk) - For stateful AI patterns
- [Vectorize](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-vectorize) - For RAG patterns with embeddings

## Resources

- [Official Docs](https://developers.cloudflare.com/ai-gateway/)
- [API Reference](https://developers.cloudflare.com/api/resources/ai_gateway/)
- [Provider Guides](https://developers.cloudflare.com/ai-gateway/usage/providers/)
- [Discord Community](https://discord.cloudflare.com)
