---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "d6e8e80c92e6fd28ba133925da8d4d5b134b9069d0214e4e36b02750f2f5f844"
contentMode: "local-full"
zh: ""
---

## Dynamic Workflows

> **New in v2.1.154**

Dynamic workflows let Claude orchestrate tens to hundreds of background [subagents](/lib/09-harness/claude-howto/04-subagents) **deterministically** — fan-out, pipelines, and parallel stages encoded in a script rather than left to the model's improvisation. Where a single agent holds one context window, a workflow decomposes a task across many agents and recombines their results.

As of v2.1.219, dynamic workflows default to a **medium size guideline (aim for fewer than 15 agents)**. Pick another size — or unrestricted — via **Dynamic workflow size** in `/config`, or set the `workflowSizeGuideline` key in your settings file. The running-workflow status line shows the active size and points to `/config` for changing it.

### When to Use Them

- **Comprehensive coverage** — audit or review across many files/dimensions in parallel.
- **Confidence** — generate independent perspectives, then adversarially verify findings before committing.
- **Scale beyond one context** — large migrations, broad sweeps, or research that no single context can hold.

For a one-off task you already understand, a single agent (or a direct edit) is still the right tool — workflows pay off when the work fans out.

### Launching and Viewing

- **Launch**: ask Claude to create a workflow for the task (e.g. "run a workflow to review every file in `src/`"). Claude authors the orchestration script and runs it in the background.
- **View**: the `/workflows` command shows running and completed workflow runs with live progress.
- **`ultracode`**: selecting `ultracode` in the `/effort` menu turns this on for the session — it sends `xhigh` to the model *and* has Claude orchestrate dynamic workflows by default. It is session-only and not accepted in the settings file. (As of v2.1.160 the trigger keyword is `ultracode`; the bare word "workflow" no longer triggers a run.)

Workflows build on the subagent model — see [Subagents](/lib/09-harness/claude-howto/04-subagents) for how individual agents are defined and scoped.
