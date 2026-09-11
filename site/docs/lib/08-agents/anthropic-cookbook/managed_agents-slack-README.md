---
title: "Slack × Claude Managed Agents"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/README.md"
zh: ""
---

# Slack × Claude Managed Agents

`@mention` a Claude [Managed Agent](https://platform.claude.com/docs/en/managed-agents/overview) in Slack and get the reply in-thread.

```
Slack @mention ──▶ /slack/events ──▶ sessions.create (+ metadata) ──▶ 200
                                              │
                            Claude runs to idle on Anthropic infra
                                              │
/cma-webhook ◀── session.status_idled ◀───────┘
      │
      └──▶ sessions.retrieve → read metadata → chat.postMessage
```

The CMA session's `metadata` (`slack_channel`, `slack_thread_ts`) is the entire routing state.

## Quickstart

```bash
cd managed_agents/slack
bun install
claude
```

Then ask: **"walk me through setting this up."** Claude reads [`skill.md`](/lib/08-agents/anthropic-cookbook/managed_agents-slack-skill) and drives the config — Slack app, Anthropic agent + webhook, env vars, `bun run dev` — in the order that actually works.

## Files

| | |
|---|---|
| `setup/create-agent.ts` | One-time: `agents.create` + `environments.create` |
| `src/main.ts` | Bun server, routes |
| `src/slack-events.ts` | Verify Slack sig, `url_verification`, fire-and-forget kickoff |
| `src/agent.ts` | `sessions.create` + `user.message` with routing metadata |
| `src/cma-webhook.ts` | `beta.webhooks.unwrap` → filter by metadata → `chat.postMessage` |
| `skill.md` | Setup walkthrough, gotchas, debugging |

Requires `@anthropic-ai/sdk` ≥ 0.95.1.
