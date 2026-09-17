---
title: "Daytona demo — Self-Hosted Sandboxes"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/self_hosted_sandboxes/daytona/README.md"
sourceRel: "managed_agents/self_hosted_sandboxes/daytona/README.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/managed_agents/self_hosted_sandboxes/daytona/README.md"
sourceSha256: "686c41f8da226df4704d370bfaaaad929700d6f898cd9dc6351699fbf4771c13"
pageSha256: "686c41f8da226df4704d370bfaaaad929700d6f898cd9dc6351699fbf4771c13"
contentMode: "local-full"
zh: ""
---

# Daytona demo — Self-Hosted Sandboxes

Reference implementation of the [usage guide](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-docs-usage-guide) on [Daytona](https://www.daytona.io/). `daytona_webhook.py` is a FastAPI app that handles the `session.status_run_started` webhook (verified with `client.beta.webhooks.unwrap()`), **drains the environment work queue** with `client.beta.environments.work.poller(drain=True, auto_stop=False)` so any single delivery recovers earlier missed ones, and per item creates a Daytona sandbox, uploads the **same provider-agnostic `sandbox_runner.py`** the Modal demo uses, and starts it. Daytona sandboxes are full Linux containers, so `beta_agent_toolset_20260401` (bash/read/write/edit/glob/grep) works as-is.

No org API key reaches the runner: the webhook polls with the environment key, and each sandbox authenticates with that same environment key — the single credential for both the control plane and the per-session calls.

```sh
# standardwebhooks backs `client.beta.webhooks.unwrap()` — only the orchestrator
# host needs it; the inner Daytona sandbox never sees raw webhook deliveries.
pip install fastapi uvicorn daytona-sdk standardwebhooks anthropic

export DAYTONA_API_KEY=... DAYTONA_API_URL=...
export ANTHROPIC_WEBHOOK_SECRET=... \
       ANTHROPIC_ENVIRONMENT_ID=env_... ANTHROPIC_ENVIRONMENT_KEY=sk-ant-oat...

uvicorn daytona_webhook:app --host 0.0.0.0 --port 8080
```

Deploy the FastAPI app anywhere that can serve HTTP and reach the Daytona API (Fly, Render, a VM behind a tunnel, etc.), then register its URL as the webhook endpoint.

> **Cold-start note:** `_spawn()` runs `pip install anthropic` inside each fresh Daytona sandbox, which adds ~10–15s before the runner starts. For production, pre-bake the SDK into a custom Daytona image and drop the `pip install` line.
