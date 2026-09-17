---
title: "Self-hosted environments"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/self-hosted-environments.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/self-hosted-environments.md"
sourceSha256: "5898f4265c7f77f2a4c0212d1eb2f8d9c7db8182879be2b100839f307555e9ce"
pageSha256: "5898f4265c7f77f2a4c0212d1eb2f8d9c7db8182879be2b100839f307555e9ce"
contentMode: "local-full"
zh: ""
---

# Self-hosted environments

> Run Claude Code cloud sessions on infrastructure you control: set up a self-hosted environment, deploy runners, and route sessions to your own compute.

  Self-hosted environments are in public beta on Team and Enterprise plans and are off by default. See [Availability and limitations](#availability-and-limitations) for the enablement path and what's excluded.

A self-hosted environment executes Claude Code cloud sessions on infrastructure your organization operates. A [cloud session](https://code.claude.com/docs/en/claude-code-on-the-web) is any session that runs somewhere other than the developer's machine: developers start them from claude.ai, the mobile and desktop apps, the terminal with [`claude --cloud`](https://code.claude.com/docs/en/claude-code-on-the-web#from-terminal-to-web), and [scheduled routines](https://code.claude.com/docs/en/routines), and by default they execute on Anthropic's infrastructure. In a self-hosted environment, those same sessions execute inside your network, and the developer experience is otherwise the same apart from the differences in [Availability and limitations](#availability-and-limitations) and the deploy page's [known issues](https://code.claude.com/docs/en/self-hosted-environments-deploy#known-issues-and-limitations).

If your team doesn't use cloud sessions, there's nothing here to configure: sessions in a terminal or IDE always run on the developer's own machine. If you want to run Claude Code on your own always-on machine and drive it from other devices, use [Remote Control](https://code.claude.com/docs/en/remote-control), which is also available on Pro and Max plans. When you're ready to set up, go straight to the [quickstart](https://code.claude.com/docs/en/self-hosted-environments-quickstart); to review the security posture first, start with [Deploy to production](https://code.claude.com/docs/en/self-hosted-environments-deploy). The rest of this page explains how self-hosting works and when to choose it.

## How self-hosted environments work

Self-hosting has three parts:

* **Environment**: a named destination that cloud sessions can be sent to. Your organization creates environments in claude.ai admin settings, and each one groups a set of runners.
* **Runner**: a program running on hosts inside your network. Runners execute the sessions; the idea is the same as a self-hosted CI runner.
* **Session**: one Claude Code task a developer started.

When a developer starts a cloud session, the session-start UI shows an environment picker listing Anthropic-hosted environments alongside any your organization has created. If they choose yours, Anthropic's control plane places the session on your environment's queue, where a runner claims it, clones the repository the developer chose, and starts a Claude Code process on your host to run it. The runner authenticates to your git host with credentials you configure; [Configure git](https://code.claude.com/docs/en/self-hosted-environments-deploy#configure-git) covers the options. Sessions reach your internal services from inside your network, and your git host the same way when it's internal; the traffic to Anthropic, queue polling, the session's event stream, and model inference, is outbound HTTPS to `api.anthropic.com`, with the short list of further hosts sessions can reach in [Network requirements](https://code.claude.com/docs/en/self-hosted-environments-deploy#network-requirements). Anthropic never connects into your network.

&lt;div style=&#123;&#123;maxWidth: "640px", margin: "0 auto"&#125;&#125;>
    <img src="https://mintcdn.com/claude-code/Y0sJ2uDoOVbOVZrQ/images/self-hosted-network-paths.svg?fit=max&auto=format&n=Y0sJ2uDoOVbOVZrQ&q=85&s=8056103fc1c5564c7f0ef219d260b99d" className="dark:hidden" alt="Architecture diagram of a self-hosted environment: your network boundary contains a runner, two Claude Code session processes inside it, and your git host, with api.anthropic.com outside holding queue, session stream, and inference. The runner polls the queue and reaches the git host, each session process opens its own stream, inference, and git connections, and every connection is outbound from your network, with none inbound." width="680" height="320" data-path="images/self-hosted-network-paths.svg" />

    <img src="https://mintcdn.com/claude-code/Y0sJ2uDoOVbOVZrQ/images/self-hosted-network-paths-dark.svg?fit=max&auto=format&n=Y0sJ2uDoOVbOVZrQ&q=85&s=fec6aef3b0740d80eaf6d6a7000a2233" className="hidden dark:block" alt="Architecture diagram of a self-hosted environment: your network boundary contains a runner, two Claude Code session processes inside it, and your git host, with api.anthropic.com outside holding queue, session stream, and inference. The runner polls the queue and reaches the git host, each session process opens its own stream, inference, and git connections, and every connection is outbound from your network, with none inbound." width="680" height="320" data-path="images/self-hosted-network-paths-dark.svg" />


The two Claude Code boxes in the diagram are session processes: one runner executing two sessions at once, up to its configured capacity. A runner serves one [owner](#key-concepts) at a time and locks to that owner when it claims its first session, so checked-out code never mixes between owners; [Runner lifecycle](#runner-lifecycle) covers the rule.

You can start runners yourself and keep them running, or run the [autoscaling orchestrator](https://code.claude.com/docs/en/self-hosted-environments-configuration#on-demand-runners), a second process you host, which starts runners as sessions queue; each runner exits on its own when its work finishes. Either way, you set the environment up once, and it appears in the picker on every supported surface.

## Availability and limitations

Check these before planning a rollout:

* **Plans**: public beta for Team and Enterprise organizations. Self-hosted environments are off by default; an [Owner](https://code.claude.com/docs/en/cloud-environments#organization-shared-environments) turns on **Allow self-hosted environments** on the [**Cloud environments** admin page](https://claude.ai/admin-settings/cloud-environments), which requires [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) to be enabled for the organization.
* **Zero Data Retention**: unavailable for organizations with [Zero Data Retention](https://code.claude.com/docs/en/zero-data-retention) enabled.
* **Model inference**: sessions use the Anthropic API, and inference can't be routed through [Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry](https://code.claude.com/docs/en/third-party-integrations), or an [LLM gateway](https://code.claude.com/docs/en/llm-gateway).
* **Surfaces**: sessions started from [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web), the mobile and desktop apps, [scheduled routines](https://code.claude.com/docs/en/routines), and the terminal, with [`claude --cloud`](https://code.claude.com/docs/en/claude-code-on-the-web#from-terminal-to-web) or an [`--environment` dispatch](https://code.claude.com/docs/en/self-hosted-environments-testing#run-the-test-loop), can run in self-hosted environments. [Claude Tag](https://claude.com/docs/claude-tag/overview) sessions can run in them too, but Claude can't use [Access bundles](https://claude.com/docs/claude-tag/concepts/glossary#access-bundle) in those sessions yet. [Claude Security](https://code.claude.com/docs/en/claude-security) and [Code Review](https://code.claude.com/docs/en/code-review) sessions don't route to them yet. Support for those two surfaces follows separately.
* **Repositories**: sessions check out repositories from GitHub; see [GitHub authentication options](https://code.claude.com/docs/en/claude-code-on-the-web#github-authentication-options).
* **Billing**: sessions in a self-hosted environment consume your organization's Claude Code usage the same way sessions in Anthropic-hosted environments do.

## Why self-host

Most teams are better served by Anthropic-hosted environments, which need no infrastructure to run or maintain. Self-hosting is for teams whose network, tooling, or compliance requirements call for keeping session execution on infrastructure they control. If that's you, plan for the operational ownership it carries: you build and maintain the runner image, operate the fleet, and control its network.

In exchange, self-hosting gives you network access, custom tooling, and compliance control:

* **Network access**: sessions run inside your network and can reach internal services, databases, and registries without exposing them to the public internet
* **Custom tooling**: pre-install compilers, SDKs, and internal CLIs in your runner image so every session starts ready to build
* **Compliance**: repository checkouts and build artifacts stay on infrastructure you control. Session content still goes to `api.anthropic.com` for model inference.

## Environments, runners, and sessions

Environments are managed on the **Cloud environments** page in claude.ai admin settings; runners are processes you start and manage on your own infrastructure.

### Key concepts

These terms appear throughout the self-hosted pages:

| Term               | What it is                                                                                                                                                                                              |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Environment        | A named group of your runners, created in claude.ai settings. Sessions are routed to an environment, not to an individual runner.                                                                       |
| Environment secret | The single shared credential runners use to authenticate and register with the environment. Shown once at environment creation, labeled **environment key** in the admin UI.                            |
| Runner             | The long-lived process you deploy. A runner registers with the environment, receives a runner token, and polls for sessions.                                                                            |
| Session            | One Claude Code task, started from claude.ai, the mobile app, or another Anthropic surface such as a scheduled routine or an agent. Each session runs as a child Claude Code process the runner spawns. |

In API fields, token claims, and metric names, the environment appears as `pool`, and the environment ID is the `pool_id`. The [reference](https://code.claude.com/docs/en/self-hosted-environments-reference) maps the two spellings, including the deprecated `pool` flag names.

A runner serves one owner at a time. The first session a runner picks up locks the runner to that session's owner, and the runner then runs sessions only for that owner, up to a configured capacity. Who the owner is depends on how the session started:

* **Sessions a user starts**: the owner is that user's account.
* **Claude Tag channel sessions**: Claude runs them with no user account attached, so the owner is the [Claude Tag agent](https://claude.com/docs/claude-tag/concepts/glossary#agent-identity) that started the session. Every channel session that agent starts has the same owner, whoever sent the Slack message, so a runner locked to it serves sessions that different people started when you run it at a `--capacity` above one or with a positive `--drain-grace-sec`. A runner locked to a user never picks these up, and a runner locked to a Claude Tag agent never picks up a user's sessions.

The minimum fleet size is therefore the number of owners you expect to be active at once, counting users and Claude Tag agents.

### Session lifecycle

When a developer starts a session and selects your environment, Anthropic's control plane places the session on the environment's queue. From there:

1. A runner with free capacity claims the session and holds a lease on it.
2. The runner clones the repository into its working directory and spawns a child Claude Code process.
3. The child streams events back over HTTPS while the runner keeps polling; each poll refreshes the lease and doubles as the heartbeat.
4. If the runner stops polling for about 60 seconds, the server requeues the session for another runner.

The runner gives each poll request 10 seconds. When a request times out, is lost, or gets a response the runner can't parse, the runner keeps serving its live sessions and retries after a second or two instead of waiting for the next scheduled poll. For example, an intercepting proxy that answers the poll with its own page produces a response the runner can't parse. Each time another request fails in one of those ways, the runner doubles the gap before the next retry, up to 20 seconds, and shortens the gap whenever the lease is close to expiring.

### Runner lifecycle

The first session a runner picks up locks the runner to that session's owner, and the runner runs up to `--capacity` concurrent sessions for that owner. While the runner has active sessions and hasn't received a shutdown signal or reached its retire time, the runner keeps claiming the locked owner's queued work. What happens once they finish depends on [`--drain-grace-sec`](https://code.claude.com/docs/en/self-hosted-environments-reference#runner-cli-flags):

* **At the default of `0`**: the runner exits as soon as its active sessions finish, without polling for more, so the orchestrator you deploy it under, such as Kubernetes, can restart it with a fresh disk, ready to serve any owner.
* **At a positive value**: the runner keeps polling the locked owner's queue for that many seconds before exiting.

This lifecycle isolates each owner's checked-out code without requiring the runner to delete disk state between owners.
