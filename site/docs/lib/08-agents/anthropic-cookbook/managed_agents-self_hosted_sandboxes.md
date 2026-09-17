---
title: "Self-Hosted Sandboxes"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/self_hosted_sandboxes/README.md"
sourceRel: "managed_agents/self_hosted_sandboxes/README.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/managed_agents/self_hosted_sandboxes/README.md"
sourceSha256: "6e071e15b2c5a788aeab8c78b0b78a38fcd4f12efa012efbc6c02fe012febbb0"
pageSha256: "6e071e15b2c5a788aeab8c78b0b78a38fcd4f12efa012efbc6c02fe012febbb0"
contentMode: "local-full"
zh: ""
---

# Self-Hosted Sandboxes

Reference implementations for running Claude Managed Agents sessions against
**self-hosted execution sandboxes**. Each variant implements the same contract
on a different compute provider:

1. Receive the `session.status_run_started` webhook (verified with
   `client.beta.webhooks.unwrap()`).
2. Drain the environment work queue so a single delivery recovers any earlier
   missed items.
3. Per work item, launch a per-session sandbox that runs the SDK/CLI tool
   runner (`bash`/`read`/`write`/`edit`/`glob`/`grep`), heartbeats the lease,
   and posts `tool_result`s back to the session.

No org API key reaches the runner — the sandbox authenticates with the
**environment key**, the single credential for both the control plane and the
per-session calls.

| Variant | Compute | Runner |
|---|---|---|
| [`docker/`](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-docker) | Plain Docker on a host you control | `ant beta:worker run` in a per-session container |
| [`cf/`](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-cf) | Cloudflare Containers | `ant beta:worker run` in a per-session Cloudflare Container |
| [`cf-worker/`](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-cf-worker) | Cloudflare Workers (no container) | TS `SessionToolRunner` in a Durable Object with an in-isolate fake filesystem |
| [`modal/`](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-modal) | [Modal](https://modal.com) | Python `sandbox_runner.py` in a Modal Sandbox with a per-session Volume |
| [`daytona/`](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-daytona) | [Daytona](https://www.daytona.io/) | Same `sandbox_runner.py` uploaded to a Daytona sandbox |
| [`vercel/`](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-vercel) | Vercel Functions + Sandbox | Node `runner.mjs` in a Vercel Sandbox |

## Getting started

See [`docs/usage-guide.md`](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-docs-usage-guide) for the full flow: creating a
self-hosted environment, registering the webhook, and wiring up the
environment key. Each variant's `README.md` covers its provider-specific
deploy steps.

See [`docs/upgrade-guide.md`](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-docs-upgrade-guide) for migrating between SDK
versions.
