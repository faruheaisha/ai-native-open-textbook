---
title: "Cloudflare Workflows"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/workflows/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/workflows/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/workflows/README.md"
sourceSha256: "c0a6be8e49bc081474ad24ec4c1f6ec190c2e431c2d30869e0b5a047b4a25c3f"
pageSha256: "c0a6be8e49bc081474ad24ec4c1f6ec190c2e431c2d30869e0b5a047b4a25c3f"
contentMode: "local-full"
zh: ""
---

# Cloudflare Workflows

Durable multi-step applications with automatic retries, state persistence, and long-running execution.

## What It Does

- Chain steps with automatic retry logic
- Persist state between steps (minutes → weeks)
- Handle failures without losing progress
- Wait for external events/approvals
- Sleep without consuming resources

**Available:** Free & Paid Workers plans

## Core Concepts

**Workflow**: Class extending `WorkflowEntrypoint` with `run` method
**Instance**: Single execution with unique ID & independent state
**Steps**: Independently retriable units via `step.do()` - API calls, DB queries, AI invocations
**State**: Persisted from step returns; step name = cache key

## Quick Start

```typescript
import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent } from 'cloudflare:workers';

type Env = { MY_WORKFLOW: Workflow; DB: D1Database };
type Params = { userId: string };

export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {
  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
    const user = await step.do('fetch user', async () => {
      return await this.env.DB.prepare('SELECT * FROM users WHERE id = ?')
        .bind(event.params.userId).first();
    });
    
    await step.sleep('wait 7 days', '7 days');
    
    await step.do('send reminder', async () => {
      await sendEmail(user.email, 'Reminder!');
    });
  }
}
```

## Key Features

- **Durability**: Failed steps don't re-run successful ones
- **Retries**: Configurable backoff (constant/linear/exponential)
- **Events**: `waitForEvent()` for webhooks/approvals (timeout: 1h → 365d)
- **Sleep**: `sleep()` / `sleepUntil()` for scheduling (max 365d)
- **Parallel**: `Promise.all()` for concurrent steps
- **Idempotency**: Check-then-execute patterns

## Reading Order

**Getting Started:** configuration.md → api.md → patterns.md  
**Troubleshooting:** gotchas.md

## In This Reference
- [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workflows-configuration) - wrangler.jsonc setup, step config, bindings
- [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workflows-api) - Step APIs, instance management, sleep/parameters
- [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workflows-patterns) - Common workflows, testing, orchestration
- [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workflows-gotchas) - Timeouts, limits, debugging strategies

## See Also
- [durable-objects](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-durable-objects) - Alternative stateful approach
- [queues](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-queues) - Message-driven workflows
- [workers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers) - Entry point for workflow instances
