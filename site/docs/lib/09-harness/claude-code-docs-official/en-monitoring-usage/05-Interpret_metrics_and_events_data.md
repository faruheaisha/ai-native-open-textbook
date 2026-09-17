---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/monitoring-usage.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/monitoring-usage.md"
sourceSha256: "85703528e4de5432950951e0ff1d44d191bee607096ec4370353aa6b15a70b70"
pageSha256: "eb4127c5e98b3811a7da765b2c753b5fcb52e4ee58357654a58ae6202207d32e"
contentMode: "local-full"
zh: ""
---

## Interpret metrics and events data

The exported metrics and events support a range of analyses:

### Usage monitoring

| Metric                                                        | Analysis Opportunity                                                                                 |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `claude_code.token.usage`                                     | Break down by `type` (input/output), user, team, model, `skill.name`, `plugin.name`, or `agent.name` |
| `claude_code.session.count`                                   | Track adoption and engagement over time                                                              |
| `claude_code.lines_of_code.count`                             | Measure productivity by tracking code additions and removals, broken down by model                   |
| `claude_code.commit.count` & `claude_code.pull_request.count` | Understand impact on development workflows                                                           |

### Cost monitoring

The `claude_code.cost.usage` metric helps with:

* Tracking usage trends across teams or individuals
* Identifying high-usage sessions for optimization
* Attributing spend to specific skills, plugins, or subagent types via the `skill.name`, `plugin.name`, and `agent.name` attributes

  Cost metrics are approximations. For official billing data, refer to your API provider (Claude Console, Amazon Bedrock, or Google Cloud's Agent Platform).

Claude Code counts each streaming response toward the cost and token metrics exactly once, including when a gateway or proxy behind `ANTHROPIC_BASE_URL` streams usage progressively across multiple frames. Before v2.1.214, streams that carried usage in more than one frame inflated `claude_code.cost.usage` and `claude_code.token.usage` by roughly one extra full request per extra frame.

### Alerting and segmentation

Common alerts to consider:

* Cost spikes
* Unusual token consumption
* High session volume from specific users

All metrics can be segmented by the [standard attributes](#standard-attributes). The `model` attribute is available on `claude_code.token.usage`, `claude_code.cost.usage`, and from v2.1.172, `claude_code.lines_of_code.count`.

Per-model breakdowns of commits can only be approximated by joining against the token or cost metrics on `session.id`, since one session can span multiple models. Filter the token or cost side to rows where `query_source` is `"main"` so auxiliary and subagent requests don't attribute the session's commits to a model that didn't make them.

### Detect retry exhaustion

Claude Code retries failed API requests internally and emits a single `claude_code.api_error` event only after it gives up, so the event itself is the terminal signal for that request. Intermediate retry attempts are not logged as separate events.

The `attempt` attribute on the event records the total number of attempts. `CLAUDE_CODE_MAX_RETRIES` defaults to 10 and is capped at 15. On v2.1.199 or later, you can set `CLAUDE_CODE_RETRY_WATCHDOG` to raise the default and remove the cap.

When the request exhausts all retries on a transient error, `attempt` equals one more than that effective limit: 11 by default, and never more than 16 unless the watchdog is set. A lower value indicates a non-retryable error such as a `400` response, or a cause with its own smaller retry budget. For example, Claude Code retries a failure to load AWS or Google Cloud credentials at most twice.

To distinguish a session that recovered from one that stalled, group events by `session.id` and check whether a later `api_request` event exists after the error.

### Event analysis

The event data describes each Claude Code interaction in detail:

**Tool usage patterns**: analyze tool result events to identify:

* Most frequently used tools
* Tool success rates
* Average tool execution times
* Error patterns by tool type

**Performance monitoring**: track API request durations and tool execution times to identify performance bottlenecks.
