---
title: "Cloudflare Cron Triggers"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/cron-triggers/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/cron-triggers/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/cron-triggers/README.md"
sourceSha256: "97cd7899f085cb1f28b10c7508062a3a614bccfe2e78ea8457d654ff0cc1be4f"
pageSha256: "97cd7899f085cb1f28b10c7508062a3a614bccfe2e78ea8457d654ff0cc1be4f"
contentMode: "local-full"
zh: ""
---

# Cloudflare Cron Triggers

Schedule Workers execution using cron expressions. Runs on Cloudflare's global network during underutilized periods.

## Key Features

- **UTC-only execution** - All schedules run on UTC time
- **5-field cron syntax** - Quartz scheduler extensions (L, W, #)
- **Global propagation** - 15min deployment delay
- **At-least-once delivery** - Rare duplicate executions possible
- **Workflow integration** - Trigger long-running multi-step tasks
- **Green Compute** - Optional carbon-aware scheduling during low-carbon periods

## Cron Syntax

```
 ┌─────────── minute (0-59)
 │ ┌───────── hour (0-23)
 │ │ ┌─────── day of month (1-31)
 │ │ │ ┌───── month (1-12, JAN-DEC)
 │ │ │ │ ┌─── day of week (1-7, SUN-SAT, 1=Sunday)
 * * * * *
```

**Special chars:** `*` (any), `,` (list), `-` (range), `/` (step), `L` (last), `W` (weekday), `#` (nth)

## Common Schedules

```bash
*/5 * * * *        # Every 5 minutes
0 * * * *          # Hourly
0 2 * * *          # Daily 2am UTC (off-peak)
0 9 * * MON-FRI    # Weekdays 9am UTC
0 0 1 * *          # Monthly 1st midnight UTC
0 9 L * *          # Last day of month 9am UTC
0 10 * * MON#2     # 2nd Monday 10am UTC
*/10 9-17 * * MON-FRI  # Every 10min, 9am-5pm weekdays
```

## Quick Start

**wrangler.jsonc:**
```jsonc
{
  "name": "my-cron-worker",
  "triggers": {
    "crons": ["*/5 * * * *", "0 2 * * *"]
  }
}
```

**Handler:**
```typescript
export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    console.log("Cron:", controller.cron);
    console.log("Time:", new Date(controller.scheduledTime));
    
    ctx.waitUntil(asyncTask(env)); // Non-blocking
  },
};
```

**Test locally:**
```bash
npx wrangler dev
curl "http://localhost:8787/__scheduled?cron=*/5+*+*+*+*"
```

## Limits

- **Free:** 3 triggers/worker, 10ms CPU
- **Paid:** Unlimited triggers, 50ms CPU
- **Propagation:** 15min global deployment
- **Timezone:** UTC only

## Reading Order

**New to cron triggers?** Start here:
1. This README - Overview and quick start
2. [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-cron-triggers-configuration) - Set up your first cron trigger
3. [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-cron-triggers-api) - Understand the handler API
4. [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-cron-triggers-patterns) - Common use cases and examples

**Troubleshooting?** Jump to [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-cron-triggers-gotchas)

## In This Reference
- [configuration.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-cron-triggers-configuration) - wrangler config, env-specific schedules, Green Compute
- [api.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-cron-triggers-api) - ScheduledController, noRetry(), waitUntil, testing patterns
- [patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-cron-triggers-patterns) - Use cases, monitoring, queue integration, Durable Objects
- [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-cron-triggers-gotchas) - Timezone issues, idempotency, security, testing

## See Also
- [workflows](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workflows) - Alternative for long-running scheduled tasks
- [workers](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-workers) - Worker runtime documentation
