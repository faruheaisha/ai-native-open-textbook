---
title: "Setup tips & tricks — Linear × CMA webhook bridge"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/linear/skill.md"
sourceRel: "managed_agents/linear/skill.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/managed_agents/linear/skill.md"
sourceSha256: "3d8bcd6c4d3e7ad9574c11fcbac4c679daf6b71de16f71bf7a84637e6ab84720"
pageSha256: "3d8bcd6c4d3e7ad9574c11fcbac4c679daf6b71de16f71bf7a84637e6ab84720"
contentMode: "local-full"
zh: ""
---

# Setup tips & tricks — Linear × CMA webhook bridge

Things that aren't obvious from the docs and tend to cost debugging time.

---

## Mental model

### A webhook is "call me when something happens"

It's just an HTTP POST a service sends to a URL you gave it, with a small JSON body describing an event. You register the URL once; the service calls it whenever the event fires. No polling, no held-open connections.

### The bridge is mandatory (today)

Linear's Agent Platform and CMA don't share a wire format or credentials. Something has to translate "Linear @mention" → "CMA user.message" on the way in, and "CMA idle" → "Linear comment" on the way out, while holding both sets of keys. That's the bridge.

### Two webhooks, one bridge

- **Linear → bridge** fires on @mention. Payload carries `agentSession.id`, `organizationId`, and issue context.
- **Anthropic → bridge** fires on session idle. Payload carries **only** the CMA session ID.

Neither carries a "callback URL." Neither carries the agent's output. Both are just *signals* with IDs.

### The webhook is a doorbell, not a delivery

Anthropic's `session.status_idled` payload is deliberately thin — `\{type, id\}`. You always follow up with `sessions.retrieve(id)` (to get metadata) and `sessions.events.list(id)` (to get the output). Push the signal, pull the data. Retries stay cheap; data is never stale.

### `metadata` is the entire routing state

When the bridge creates the CMA session it sets `metadata: \{linear_session_id, linear_org_id\}`. When the idle webhook arrives later with only a session ID, the bridge retrieves the session, reads those keys back, and knows exactly where to reply — with nothing stored in the bridge itself. This is what makes it stateless.

---

## Gotchas

### Anthropic webhooks are workspace-scoped

The endpoint you register in Console only receives events for sessions **in that same workspace**. If your `ANTHROPIC_API_KEY` belongs to workspace A but you registered the endpoint in workspace B, you get **zero deliveries, silently**. Check the Workspace column on your API key and make sure it matches the workspace picker in the Console's Webhooks page.

### A workspace webhook fires for *every* session in the workspace

Not just yours. If the Anthropic workspace is shared with other agents, scripts, or teammates, every `session.status_idled` in that workspace hits your endpoint. Your handler **must** filter: `sessions.retrieve(id)` → check for your `metadata` keys → return 204 for anything that isn't yours. Also catch 404/403 on `sessions.retrieve` — sessions created under other API keys in the same workspace aren't readable by yours.

Corollaries: subscribe only to the event types you need (`session.status_idled`, `session.status_terminated`), not "All events"; and for production, consider a dedicated Anthropic workspace so there are no unrelated sessions to discard.

### Linear OAuth apps are workspace-admin-only
