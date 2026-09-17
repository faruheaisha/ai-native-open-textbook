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
pageSha256: "e012efdac2009b7841ac02e46cee7a3f30636e5d41bb44e5d2872c29addbb03c"
contentMode: "local-full"
zh: ""
---

## Usage limits

Most errors in this section mean a quota tied to your account or plan has been reached. Three work differently: [`Server is temporarily limiting requests`](#server-is-temporarily-limiting-requests) is a server-side throttle unrelated to your plan quota, [`Usage credits required for 1M context`](#usage-credits-required-for-1m-context) is an entitlement check rather than an exhausted quota, and [`The prompt to confirm went unanswered`](#the-prompt-to-confirm-went-unanswered) means a usage-credits consent prompt closed unanswered, whether or not a quota was reached.

<h3 id="youve-hit-your-session-limit">
  You've hit your session limit
</h3>

Subscription plans include a rolling usage allowance. When it runs out you see one of these messages:

```text theme={null}
You've hit your session limit · resets 3:45pm
You've hit your weekly limit · resets Mon 12:00am
You've hit your Opus limit · resets 3:45pm
You've hit your Sonnet limit · resets 3:45pm
```

Claude Code blocks further requests until the reset time shown in the message. The session and weekly limits are shared across all models, so switching models doesn't restore access. The Opus and Sonnet limits each apply only to requests to that model family, so switching to a model outside the family with `/model` keeps you working.

In an interactive session signed in with a claude.ai subscription, Claude Code can also wait in the open session and continue the interrupted task shortly after the reset. While it waits, a line at the bottom of the session reads `Usage limit reached · continuing automatically at 3:45pm · esc to cancel`. Press `Esc` at an empty prompt to cancel the wait. See [Wait for a usage limit to reset](https://code.claude.com/docs/en/interactive-mode#wait-for-a-usage-limit-to-reset) for what you see, how to start or cancel a wait, and how to turn automatic continue off. Before v2.1.234, Claude Code didn't offer this wait.

Usage counts against the session and weekly allowances at the same time. A single burst of heavy activity, such as a large workflow fanout, can exhaust the weekly allowance before the session window resets.

**What to do:**

* Wait for the reset time shown in the error
* In the Code tab of the [Desktop app](https://code.claude.com/docs/en/desktop), the session-limit card offers an **Auto-continue when limits reset** checkbox. The weekly-limit card doesn't. When it's checked, the Desktop app retries the interrupted turn after the reset and shows the retry time on the card. The Desktop checkbox and the CLI's **Continue automatically at usage limit** setting in `/config` are separate, so turn each off on its own.
* For the Opus or Sonnet limit, run `/model` and switch to a model outside that family to keep working. Each model has its own prompt cache, so the next request re-reads the whole conversation with no cache hits; see [Switching models](https://code.claude.com/docs/en/prompt-caching#switching-models)
* Run `/usage` to see your plan limits and when they reset
* Run `/usage-credits` to buy additional usage on Pro and Max, or to request it from your admin on Team and Enterprise. See [usage credits for paid plans](https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans) for how this is billed.
* To upgrade your plan for higher base limits, see [claude.com/pricing](https://claude.com/pricing)

To watch your remaining allowance before you hit the limit, add the `rate_limits` fields to a [custom status line](https://code.claude.com/docs/en/statusline#rate-limit-usage), or in the Desktop app click the [usage ring](https://code.claude.com/docs/en/desktop#check-usage) next to the model picker.

### Usage credits required for 1M context

The selected model uses the 1M-token extended context window, and your plan only includes it through usage credits.

```text theme={null}
API Error: Usage credits required for 1M context · run /usage-credits to turn them on, or /model to switch to standard context
```

This is an entitlement check, not a quota exhaustion. It fires even when your session and weekly allowances have capacity remaining. See [Extended context](https://code.claude.com/docs/en/model-config#extended-context) for which plans include 1M context directly and which require usage credits. Claude Code runs this check when you pick the model with `/model`, and only on a direct connection to the Anthropic API; if you point `ANTHROPIC_BASE_URL` at an [LLM gateway](https://code.claude.com/docs/en/llm-gateway), `/model` allows the `[1m]` selection and the gateway decides whether the request succeeds.

When this error appears mid-conversation because the context grew past 200K tokens, Claude Code automatically compacts the conversation back under the standard context limit and keeps the session at that limit afterward, so no action is needed. On versions before v2.1.172, the error repeated on every subsequent request including `/compact`; run `/clear` on those versions to recover. The steps below apply when you explicitly selected a `[1m]` model.

**What to do:**

* Run `/model` and select the variant without the `[1m]` suffix to fall back to the standard context window
* Where the message names `/usage-credits`, run it to turn on metered billing for the 1M variant on Pro and Max, or to request usage credits from your admin on Team and Enterprise
* If the error persists after `/model`, a 1M model ID may be set elsewhere. See [Setting your model](https://code.claude.com/docs/en/model-config#setting-your-model) for the configuration locations to check in priority order.
* To remove 1M variants from the model picker entirely, set [`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`](https://code.claude.com/docs/en/env-vars)

### The prompt to confirm went unanswered

If your account requires the [Fable usage-credits consent](https://code.claude.com/docs/en/model-config#fable-and-usage-credits), Claude Code asks you to confirm before a Fable request bills usage credits. When nobody answers that consent prompt in a session that may have no one at its terminal, Claude Code closes the prompt and ends the turn with one of these messages:

```text theme={null}
Fable limit reached · continuing on Fable 5.1 uses usage credits, and the prompt to confirm went unanswered — nothing was sent · answer it where this session is running, or /model to change
Fable 5.1 now uses usage credits · the prompt to confirm went unanswered — nothing was sent · answer it where this session is running, or /model to change
```

The messages name the session's Fable model, so on Fable 5 they read `continuing on Fable 5` and `Fable 5 now uses usage credits`. Before v2.1.257, the first message began `Fable 5 limit reached`.

This happens in [Remote Control](https://code.claude.com/docs/en/remote-control) sessions, [background sessions](https://code.claude.com/docs/en/agent-view), and [agent team](https://code.claude.com/docs/en/agent-teams) teammate sessions. Claude Code shows the consent prompt only in the session's own interactive view: the terminal where it runs, or, for a background session, the [agents view](https://code.claude.com/docs/en/agent-view) once you attach. A Remote Control client can't display it. Claude Code closes the prompt at the [`dialogExpiry`](https://code.claude.com/docs/en/settings-reference#dialogexpiry) deadline, five minutes by default, or as soon as a new prompt arrives while nobody has typed at that terminal, such as a prompt sent from a Remote Control client. Typing at the terminal where the session runs cancels the deadline, and Claude Code waits for your answer. In a background session's attached view, typing doesn't cancel the deadline, and a new prompt still closes the consent prompt, so answer before either happens. Claude Code sends nothing and keeps your model, so when you send your next prompt, Claude Code shows the consent prompt again.

**What to do:**

* At the terminal where the session runs, send another prompt and answer the consent prompt when it reappears. For a background session, attach to it from the [agents view](https://code.claude.com/docs/en/agent-view) first. Resending from a Remote Control client shows this message again, because the client can't display the prompt.
* Run `/model` to switch to a model that doesn't bill usage credits
* To give yourself more time to reach that terminal, set [`dialogExpiry`](https://code.claude.com/docs/en/settings-reference#dialogexpiry) to a longer value or `"never"`

Before v2.1.236, this message didn't appear: while a Remote Control client was connected, Claude Code waited 60 seconds for an answer and then continued the turn on your default model.

### Server is temporarily limiting requests

The API applied a short-lived throttle that is unrelated to your plan quota.

```text theme={null}
API Error: Server is temporarily limiting requests (not your usage limit)
```

Claude Code tells these apart from your plan limit by the absence of the unified quota headers a real limit response carries. As of v2.1.199 this is [retried automatically](#automatic-retries) with backoff before being shown, whichever way you authenticate. On earlier versions, a session signed in with a claude.ai subscription failed the turn on the first occurrence; only API key and Enterprise sign-ins retried it.

**What to do:**

* Wait briefly and try again
* Check [status.claude.com](https://status.claude.com) if it persists

### Request rejected (429)

You have hit the rate limit configured for your API key, Amazon Bedrock project, or Google Cloud project.

```text theme={null}
API Error: Request rejected (429) · this may be a temporary capacity issue. If it persists, check https://status.claude.com.
```

The trailing sentence names where to check service health and varies by provider. Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry configurations name that provider's service status instead of the Anthropic status page. A custom `ANTHROPIC_BASE_URL` names the gateway host.

**What to do:**

* Run `/status` and confirm the active credential is the one you expect. A stray `ANTHROPIC_API_KEY` in your environment can route requests through a low-tier key instead of your subscription.
* Check your provider console for the active limits and request a higher tier if needed
* For Anthropic API keys, see the [rate limits reference](https://platform.claude.com/docs/en/api/rate-limits) for how tiers work and how to set per-workspace caps
* Reduce concurrency: lower [`CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY`](https://code.claude.com/docs/en/env-vars), avoid running many parallel subagents, or switch to a smaller model with `/model` for high-volume scripted runs

<h3 id="spend-limit-reached">
  Spend limit reached
</h3>

You connect through a [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway) and have passed a [spend cap](https://code.claude.com/docs/en/claude-apps-gateway-spend-limits) your gateway operator set. The gateway blocks your requests until the named period resets or the operator raises the cap. It marks each blocked `429` response `x-should-retry: false`, so Claude Code shows this message without retrying.

```text theme={null}
spend limit reached (daily; resets 2026-08-09 00:00 UTC)
```

The message names the cap's period and reset time, and when the operator configured a `blocked_message`, their instructions follow it. Before v2.1.225, the message read only `spend limit reached`; a gateway on an older version still sends that shorter form.

**What to do:**

* Wait for the reset time the message names, or follow the operator's instructions if the message carries them
* Ask your gateway operator to raise the cap if you hit it routinely

A related message, `spend limit unavailable`, means the gateway could not read its spend records and blocked the request as a precaution rather than over your cap. It usually clears on its own; if it persists, tell your gateway operator.

### Credit balance is too low

Your Console organization has run out of prepaid credits, or Claude Code is sending your requests with a Console API key when you meant to use your subscription.

```text theme={null}
Credit balance is too low
```

**What to do:**

* If you have a Pro, Max, Team, or Enterprise plan and see this, run `/status` and check the `API key` row. An approved `ANTHROPIC_API_KEY` in your environment routes requests through that key instead of your subscription. Unset it in the current shell and remove it from your shell profile, then relaunch `claude`. Run `/login` if you haven't signed in with your subscription yet.
* Add credits at [platform.claude.com/settings/billing](https://platform.claude.com/settings/billing), and consider enabling auto-reload there so the balance refills before it hits zero
* Set per-workspace spend caps in the Console to prevent a single project from draining the org balance. See [Manage costs effectively](https://code.claude.com/docs/en/costs).

### Could not update your spend limit

The server rejected a spend limit change you made from the prompt that appears when you reach your spend limit.

```text theme={null}
Could not update your spend limit: <reason from the server>
```

When the server explains the rejection, the message ends with that reason, and retrying the same value fails again. When the failure has no server-provided reason, such as a dropped connection, the message reads `Could not update your spend limit. Press Enter to retry.` and retrying can succeed. Before v2.1.216, Claude Code showed the generic form for every failure.

**What to do:**

* If the message includes a reason, choose a limit that satisfies it, such as a lower amount
* If the message shows only the generic form, retry; the failure may be transient
* If the change keeps failing, make it from your [claude.ai billing settings](https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans) in the browser instead
