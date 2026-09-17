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
sourceRel: "en/errors.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/errors.md"
sourceSha256: "b8944f28bfea74456c2960ba67f375c1d39afd34fb474e956bea3d64744e6604"
pageSha256: "eacdb1f0095e52c169fe7bc38611b6f288de14b5a5acf55d2216fa6eaa83a227"
contentMode: "local-full"
zh: ""
---

## Server errors

Most of these errors come from the inference provider: Anthropic's service on the Anthropic API, and the service behind that provider's endpoint on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or a custom gateway. [Auto mode cannot determine the safety of an action](#auto-mode-cannot-determine-the-safety-of-an-action) and [Agent terminated early due to an API error](#agent-terminated-early-due-to-an-api-error) also cover causes on your side, such as an Amazon Bedrock account that can't invoke the classifier model or a subagent that hit a usage limit.

### API Error: 500 Internal server error

Claude Code shows the status code and the API's error message for any 5xx response. The example below shows a 500 response on the Anthropic API:

```text theme={null}
API Error: 500 Internal server error. This is a server-side issue, usually temporary — try again in a moment. If it persists, check https://status.claude.com.
```

The trailing sentence names where to check service health and varies by provider. Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry configurations name that provider's service status. A custom `ANTHROPIC_BASE_URL` names the gateway host.

This indicates an unexpected failure inside the API. It is not caused by your prompt, settings, or account.

**What to do:**

* Check [status.claude.com](https://status.claude.com), or the provider status page named in the message, for active incidents
* Wait a minute, then send your message again. Your original message is still in the conversation, so for a long prompt you can type `try again` instead of pasting the whole thing.
* If the error persists with no posted incident, run `/feedback` so Anthropic can investigate with your request details. See [Report an error](#report-an-error) if `/feedback` is unavailable in your environment.

### API Error: Repeated 529 Overloaded errors

The API is temporarily at capacity across all users. Claude Code has already retried several times before showing this message:

```text theme={null}
API Error: Repeated 529 Overloaded errors. The API is at capacity — this is usually temporary. Try again in a moment. If it persists, check https://status.claude.com.
```

The trailing sentence varies by provider in the same way as the 500 error above.

A 529 is not your usage limit and doesn't count against your quota.

**What to do:**

* Check [status.claude.com](https://status.claude.com), or the provider status page named in the message, for capacity notices
* Try again in a few minutes
* Run `/model` and switch to a different model to keep working, since capacity is tracked per model. Claude Code prompts you to do this when one model is under particularly high load, for example `Opus is experiencing high load, please use /model to switch to Sonnet`.

### Request timed out

The API didn't respond before the connection deadline.

```text theme={null}
Request timed out
```

This can happen during periods of high load or when the model is generating a very large response. The default request timeout is 10 minutes.

**What to do:**

* Retry the request
* For long-running tasks, break the work into smaller prompts
* If a slow network or proxy is the cause, raise `API_TIMEOUT_MS` as described in [Automatic retries](#automatic-retries)
* If timeouts are frequent and your network is otherwise healthy, see [Network and connection errors](#network-and-connection-errors) below

### No response from API

Claude Code sent a streaming request and the API returned no response headers within the deadline for the first byte, so Claude Code aborted the request instead of waiting for the full `API_TIMEOUT_MS` request timeout, 10 minutes by default. Claude Code sends the request again at most once, if the [retry budget](#tune-retry-behavior) allows. When the retry goes unanswered too, the turn ends with this message, which shows how long each attempt waited. When you set [`CLAUDE_CODE_RETRY_WATCHDOG`](https://code.claude.com/docs/en/env-vars), the one-retry cap doesn't apply and Claude Code retries under the budget described in [Tune retry behavior](#tune-retry-behavior).

```text theme={null}
API Error: No response from API (waited 3m, then 10m on the retry). If a proxy or gateway on your network holds responses until they complete, raise API_TIMEOUT_MS or CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS to wait longer.
```

Claude Code sets the first attempt's wait for response headers and the retry's wait separately:

* **First attempt**: [`CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS`](https://code.claude.com/docs/en/env-vars) when you set it to 1 or more, clamped to between 10 seconds and 30 minutes. Otherwise Claude Code uses the byte-level watchdog timeout listed in [Streaming idle watchdogs](https://code.claude.com/docs/en/network-config#streaming-idle-watchdogs), so the variables that change that timeout change this wait too. Either way, Claude Code adds one second for every 32KB of request body.
* **Retry**: one second less than `API_TIMEOUT_MS`, just under 10 minutes by default, so that the retry can outlast a proxy or gateway that holds the response until generation completes. On Amazon Bedrock, the retry uses the same deadline as the first attempt, and the message shows one duration instead of two.

Neither wait exceeds one second less than a positive `API_TIMEOUT_MS`, and a positive `API_TIMEOUT_MS` under 11 seconds turns the deadline off. The byte-level watchdog starts only once the response headers arrive, so a response that stops sending bytes after that follows the [stalled-stream rules](#automatic-retries) instead of this deadline.

**What to do:**

* Send your message again. Your original message is still in the conversation, so for a long prompt you can type `try again` instead of pasting the whole thing.
* If it repeats, treat it as a [network or proxy problem](#unable-to-connect-to-api). A proxy that accepts the connection and never forwards the request produces this error on every attempt.
* If a proxy or gateway on your network holds responses until they complete, raise `API_TIMEOUT_MS` so the retry waits longer. On Amazon Bedrock, raise `CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS` as well.
* If the first attempt keeps timing out and the retry then succeeds, raise `CLAUDE_STREAM_FIRST_BYTE_TIMEOUT_MS` so the first attempt waits long enough too.

Before v2.1.242, Claude Code waited for the full `API_TIMEOUT_MS` request timeout, 10 minutes by default, before failing an unanswered streaming request. Before v2.1.261, the retry waited the same deadline as the first attempt and the message showed no durations.

### The response above may be incomplete

A streaming request failed while the response was still in progress, after Claude had completed a block of text or a tool call, or had started one after finishing its thinking. Re-sending the request could run the same tool calls twice, so Claude Code keeps the output Claude completed and appends this notice instead of discarding the turn. Which variant you see names the cause:

```text theme={null}
API Error: Server error mid-response. The response above may be incomplete.
API Error: Connection lost mid-response. The response above may be incomplete.
API Error: Your computer went to sleep mid-response. The response above may be incomplete.
API Error: The response stopped arriving. The response above may be incomplete.
```

* `Server error mid-response`: a mid-stream overloaded or 5xx server error. This variant requires Claude Code v2.1.199 or later; before then that case discarded the partial output and reported the whole turn as an error.
* `Connection lost mid-response`: the connection dropped.
* `Your computer went to sleep mid-response`: Claude Code detected that your computer went to sleep while the response was streaming. Once your computer wakes, Claude Code treats the connection as broken and stops reading from it.
* `The response stopped arriving`: the connection stayed open but stopped delivering data, so the streaming idle watchdog aborted it. Before v2.1.222, Claude Code could also report this failure on [gateway](https://code.claude.com/docs/en/gateways) connections reached through `ANTHROPIC_BASE_URL` or `ANTHROPIC_AWS_BASE_URL` while the server's keep-alive pings were still arriving, because it counted only parsed response events there; upgrading stops those spurious timeouts on those routes. Gateways reached through a provider base URL such as `ANTHROPIC_BEDROCK_BASE_URL` aren't wrapped by the byte watchdog; see [Streaming idle watchdogs](https://code.claude.com/docs/en/network-config#streaming-idle-watchdogs).

Before v2.1.227, `Connection lost mid-response` read `Connection closed mid-response` and `The response stopped arriving` read `Response stalled mid-stream`.

In four cases, Claude Code handles the failure without showing this notice right away:

* Earlier in the response, Claude Code either retries the failure or ends the turn with a different error. See [Automatic retries](#automatic-retries).
* When one of these failures arrives after Claude has finished the response, Claude Code keeps the complete response and ends the turn normally, without this notice. Before v2.1.222, Claude Code showed this notice when the connection dropped or stalled after the response finished, and reported the turn as an error even though the response was complete.
* In a [non-interactive session](https://code.claude.com/docs/en/headless), such as a `-p` run, an [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) run, or a [cloud session](https://code.claude.com/docs/en/claude-code-on-the-web), you don't have to send `continue` yourself when the cut-off response is in the main conversation and contains text but no tool calls: Claude Code keeps the partial output and prompts Claude to continue from where it stopped, up to three times in a row. You see this notice for such a response only once Claude Code has used up those continuations. Before v2.1.246, Claude Code ended a non-interactive turn with this notice on the first cut-off.
* In a [subagent](https://code.claude.com/docs/en/sub-agents#api-errors-in-subagents), whether the session is interactive or not: when its cut-off response contains text but no tool calls, Claude Code prompts the subagent to continue. The notice becomes the subagent's last message only once those continuations are used up. Before v2.1.257, a subagent showed this notice on the first cut-off.

**What to do:**

* In an interactive session, read the response that remains on screen: Claude Code keeps every block Claude completed before the error, but discards an interrupted final block when the turn ends, so the final sentences or tool calls may be missing. Reply with `continue` to have Claude pick up from its last completed block.
* In [non-interactive mode](https://code.claude.com/docs/en/headless) (`-p`):
  * With the default text output, Claude Code prints the last completed block of text it still holds from earlier in the turn, followed by this message. When it holds none, Claude Code prints this message alone, for example because Claude Code compacted the conversation mid-turn and cleared that text. Before v2.1.219, Claude Code printed only this message in `-p` text output and dropped the response it had already produced.
  * With `--output-format json` or `stream-json`, Claude Code reports this message in the `result` field.
  * To continue the turn once the connection is stable, resume the session and send `continue` as described in [Continue conversations](https://code.claude.com/docs/en/headless#continue-conversations).

### Auto mode cannot determine the safety of an action

The model that [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) uses to classify actions couldn't produce a decision, so auto mode didn't approve the action automatically. The message you see depends on how the classifier failed.

Reads, searches, and edits inside your working directory skip the classifier, so they keep working in all of these cases.

When the classifier model is unavailable:

```text theme={null}
<model> is temporarily unavailable, so auto mode cannot determine the safety of <tool> right now. Wait a moment and then try this action again.
```

When Claude Code can determine the failure category, it names the category in parentheses after `temporarily unavailable`, for example `<model> is temporarily unavailable (rate-limited), so auto mode cannot determine the safety of <tool> right now`. The categories are `(rate-limited)`, `(overloaded)`, `(server error)`, `(timed out)`, and `(connection failed)`. Rate-limited, overloaded, and server errors are transient, and retrying works. If `(timed out)` or `(connection failed)` repeats, check your connection; see [Unable to connect to API](#unable-to-connect-to-api). Before v2.1.229, the message never named a category and read `Wait briefly and then try this action again`.

When no category fits, the message appears with no category in parentheses; more than one failure produces that form. On [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock), including the [Mantle endpoint](https://code.claude.com/docs/en/amazon-bedrock#use-the-mantle-endpoint), it also appears when your AWS account can't invoke the model named in the message, and that failure repeats on every retry until your account is granted access to the model.

**What to do:**

* Retry after a few seconds; Claude sees the same message and usually retries on its own. A transient failure is unrelated to [auto mode eligibility](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode); you don't need to change settings
* If retries keep failing, continue with read-only tasks and come back to the blocked action later
* On Amazon Bedrock, if the message returns on every retry, check that your account can invoke the model it names: for standard Amazon Bedrock models, confirm your [IAM policy](https://code.claude.com/docs/en/amazon-bedrock#iam-configuration) allows invoking it; for Mantle model IDs, [contact your AWS account team](https://code.claude.com/docs/en/amazon-bedrock#mantle-endpoint-errors)

When a classifier request fails because your OAuth token expired or was rotated by another session, Claude Code refreshes the token and retries the request once, so a routine token expiry doesn't surface as this message. Before v2.1.216, an expired or rotated token failed each classifier request, and auto mode denied every checked action with this message until the token was refreshed.

When the classifier returned an unparseable response:

```text theme={null}
Auto mode could not evaluate this action and is blocking it for safety — run with --debug for details
```

**What to do:**

* Retry the action; this usually succeeds on the next attempt
* Run `claude --debug` and repeat the action to see the underlying classifier response in the debug log

When a separate API safety check blocked the classifier request because of earlier conversation content:

```text theme={null}
Auto mode could not evaluate this action and is blocking it for safety — a safety check separate from auto mode blocked this request because of earlier conversation content — it isn't about the action itself — run with --debug for details
```

Claude Code denies the action but tells Claude this isn't a judgment that the action is unsafe, and to continue with other tasks rather than retry. These denials don't count toward [auto mode's pause thresholds](https://code.claude.com/docs/en/permission-modes#when-auto-mode-falls-back). In a [non-interactive](https://code.claude.com/docs/en/headless) `-p` run, Claude Code doesn't stop the run. What Claude receives depends on where it requested the action:

* To a [background subagent](https://code.claude.com/docs/en/sub-agents#run-subagents-in-foreground-or-background) in a `-p` run without `--input-format stream-json`, Claude Code returns an error result containing `Agent aborted: auto mode classifier request refused by the safety safeguard in headless mode`
* Everywhere else, including interactive sessions and the main conversation of a `-p` run, Claude Code returns that denial to Claude

Before v2.1.225, Claude Code counted these refusals toward the pause thresholds and returned the same rejection message as a genuine classifier block.

**What to do:**

* This is not a decision about your action. Content already in your conversation triggered a safety filter on the API when auto mode sent the conversation to the classifier
* Retrying will not help; the same conversation content will trigger the filter again
* In an interactive session, switch to a different [permission mode](https://code.claude.com/docs/en/permission-modes) so you can approve the action when prompted
* Start a fresh conversation without the triggering content

When the conversation has grown larger than the classifier's context window:

```text theme={null}
Auto mode classifier transcript exceeded context window — falling back to manual approval (try /compact to reduce conversation size)
```

What happens to the action depends on where Claude requested it:

* In an interactive session, auto mode falls back to a normal permission prompt for that action so you can approve or deny it manually
* To a [background subagent](https://code.claude.com/docs/en/sub-agents#run-subagents-in-foreground-or-background) in a [non-interactive](https://code.claude.com/docs/en/headless) `-p` run without `--input-format stream-json`, Claude Code returns an error result containing `Agent aborted: auto mode classifier transcript exceeded context window in headless mode`, and the run continues
* Elsewhere in a `-p` run without a [`--permission-prompt-tool`](https://code.claude.com/docs/en/cli-reference#cli-flags), there is no prompt to fall back to, so the action doesn't run and the run continues

**What to do:**

* In an interactive session, approve or deny the action in the prompt that appears
* In an interactive session, run `/compact` to reduce the conversation size so subsequent actions fit within the classifier window again

### Agent terminated early due to an API error

A [subagent](https://code.claude.com/docs/en/sub-agents)'s API request failed terminally, for example because a usage limit was reached or retries for a server error ran out, so the subagent stopped before finishing its task. This message requires Claude Code v2.1.199 or later; before then the API error text was returned to Claude as if it were the subagent's result.

```text theme={null}
Agent terminated early due to an API error: <error detail>
```

**What to do:**

* Match the error detail after the colon to its own section on this page, such as [Usage limits](#usage-limits) or [Server errors](#server-errors), and follow that section's steps
* Once the underlying error clears, ask Claude to retry the task or [resume the subagent](https://code.claude.com/docs/en/sub-agents#resume-subagents)

When a rate limit, overload, or server error interrupts a foreground subagent that already produced text output, Claude receives that partial output marked as incomplete instead of this error. A subagent whose only output was tool calls gets this error too; in v2.1.199 that shape returned an empty partial result instead. See [API errors in subagents](https://code.claude.com/docs/en/sub-agents#api-errors-in-subagents).
