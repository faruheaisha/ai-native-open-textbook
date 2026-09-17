---
title: "Cloudflare Queues"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/queues/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/queues/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/queues/README.md"
sourceSha256: "faa1106897e0f1b89a0b87040e14955f7594a48ef966d3ee88ece436cbef9359"
pageSha256: "faa1106897e0f1b89a0b87040e14955f7594a48ef966d3ee88ece436cbef9359"
contentMode: "local-full"
zh: ""
---

# Cloudflare Queues

Flexible message queuing for async task processing with guaranteed at-least-once delivery and configurable batching.

## Overview

Queues provide:
- At-least-once delivery guarantee
- Push-based (Worker) and pull-based (HTTP) consumers
- Configurable batching and retries
- Dead Letter Queues (DLQ)
- Delays up to 12 hours

**Use cases:** Async processing, API buffering, rate limiting, event workflows, deferred jobs

## Quick Start

```bash
wrangler queues create my-queue
wrangler queues consumer add my-queue my-worker
```

```typescript
// Producer
await env.MY_QUEUE.send({ userId: 123, action: 'notify' });

// Consumer (with proper error handling)
export default {
  async queue(batch: MessageBatch, env: Env): Promise<void> {
    for (const msg of batch.messages) {
      try {
        await process(msg.body);
        msg.ack();
      } catch (error) {
        msg.retry({ delaySeconds: 60 });
      }
    }
  }
};
```

## Critical Warnings

**Before using Queues, understand these production mistakes:**

1. **Uncaught errors retry ENTIRE batch** (not just failed message). Always use per-message try/catch.
2. **Messages not ack'd/retry'd will auto-retry forever** until max_retries. Always explicitly handle each message.

See [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues-gotchas) for detailed solutions.

## Core Operations

| Operation | Purpose | Limit |
|-----------|---------|-------|
| `send(body, options?)` | Publish message | 128 KB |
| `sendBatch(messages)` | Bulk publish | 100 msgs/256 KB |
| `message.ack()` | Acknowledge success | - |
| `message.retry(options?)` | Retry with delay | - |
| `batch.ackAll()` | Ack entire batch | - |

## Architecture

```
[Producer Worker] → [Queue] → [Consumer Worker/HTTP] → [Processing]
```

- Max 10,000 queues per account
- 5,000 msgs/second per queue
- 4-14 day retention (configurable)

## Reading Order

**New to Queues?** Start here:
1. [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues-configuration) - Set up queues, bindings, consumers
2. [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues-api) - Send messages, handle batches, ack/retry patterns
3. [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues-patterns) - Real-world examples and integrations
4. [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues-gotchas) - Critical warnings and troubleshooting

**Task-based routing:**
- Setup queue → [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues-configuration)
- Send/receive messages → [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues-api)
- Implement specific pattern → [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues-patterns)
- Debug/troubleshoot → [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues-gotchas)

## In This Reference

- [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues-configuration) - wrangler.jsonc setup, producer/consumer config, DLQ, content types
- [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues-api) - Send/batch methods, queue handler, ack/retry rules, type-safe patterns
- [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues-patterns) - Async tasks, buffering, rate limiting, D1/Workflows/DO integrations
- [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues-gotchas) - Critical batch error handling, idempotency, error classification

## See Also

- [workers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers) - Worker runtime for producers/consumers
- [r2](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-r2) - Process R2 event notifications via queues
- [d1](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-d1) - Batch write to D1 from queue consumers
