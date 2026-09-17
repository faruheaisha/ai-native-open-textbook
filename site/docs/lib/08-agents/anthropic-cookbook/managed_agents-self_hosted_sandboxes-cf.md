---
title: "Cloudflare demo — Self-Hosted Sandboxes (Container variant)"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/self_hosted_sandboxes/cf/README.md"
sourceRel: "managed_agents/self_hosted_sandboxes/cf/README.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/managed_agents/self_hosted_sandboxes/cf/README.md"
sourceSha256: "75843b9323a7dc3c4a83520d83bb44e1402e849cecc6f0843b45579e44d021b4"
pageSha256: "75843b9323a7dc3c4a83520d83bb44e1402e849cecc6f0843b45579e44d021b4"
contentMode: "local-full"
zh: ""
---

# Cloudflare demo — Self-Hosted Sandboxes (Container variant)

The Worker (`src/index.ts`) verifies the `session.status_run_started` webhook with `client.beta.webhooks.unwrap()`, then **drains the environment work queue** (poll → ack until empty) so any single delivery recovers earlier missed ones. Per work item it starts a per-session **Cloudflare Container** (`src/container.ts`) whose entrypoint is `ant beta:worker run` — the CLI handles heartbeat, backlog reconcile, SSE, the default tool set (`bash`/`read`/`write`/`edit`/`glob`/`grep`), and the work-item force-stop on exit.

The CLI owns the idle policy (`--max-idle 60s` after `session.status_idle` with `stop_reason: end_turn`; any other event resets the clock). The DO owns the *Cloudflare* container lifetime: it streams session status to renew `sleepAfter` so CF doesn't reclaim the VM out from under a live `ant beta:worker run`.

No org API key reaches the runner: the container authenticates with the environment key — the single credential `ant beta:worker run` uses for the event stream, the lease heartbeat, and the work-item force-stop.

See `../cf-worker/` for the pure-Worker variant that runs the TS `SessionToolRunner` with an in-isolate fake filesystem instead of a real container.

```sh
npm i
wrangler secret put ANTHROPIC_WEBHOOK_SECRET
wrangler secret put ANTHROPIC_ENVIRONMENT_KEY
# edit ANTHROPIC_ENVIRONMENT_ID in wrangler.toml, then:
wrangler deploy
```
