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
sourceRel: "en/settings-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/settings-reference.md"
sourceSha256: "811cfad7d21b8ebbbd64aeb288e903c6720594286d2a21d2b787639b7ab0ac1b"
pageSha256: "548a9f5f0f7ec9eac2aa397fa2b089003e6ee183f0cb8582b358454ddc672b05"
contentMode: "local-full"
zh: ""
---

## Privacy and telemetry

Control how long Claude Code keeps session data and what it sends. The switches that turn off usage metrics and error reports are environment variables, not settings keys: set `DISABLE_TELEMETRY`, `DISABLE_ERROR_REPORTING`, or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` in the [`env`](#env) key or in the shell. [Telemetry services](https://code.claude.com/docs/en/data-usage#telemetry-services) says what each one stops. Two exceptions turn off from a settings file: [`feedbackDrafts`](#feedbackdrafts) below for Claude-drafted feedback, and [`feedbackSurveyRate`](#feedbacksurveyrate) below for the session survey.

### `cleanupPeriodDays`

Set how many days Claude Code keeps [session transcripts and other application data](https://code.claude.com/docs/en/claude-directory#cleaned-up-automatically) before deleting them. Claude Code runs the deletion as a background sweep after a session starts, as long as it can safely determine the retention period.

* **Scope**: [`Any file`](#scopes)
* **Type**: number of days, a whole number, minimum `1`
* **Default**: `30`

```json settings.json theme={null}
{
  "cleanupPeriodDays": 20
}
```

Setting `0` fails validation, so pick a large value such as `3650` for long retention. To stop Claude Code from writing transcripts at all, see [Plaintext storage](https://code.claude.com/docs/en/claude-directory#plaintext-storage).

### `desktopSessionCleanupPeriodDays`

Set an age limit in days for the transcripts of sessions you started or most recently continued in Claude Desktop or Cowork. Without this key, Claude Code [keeps those transcripts at any age](https://code.claude.com/docs/en/claude-directory#cleaned-up-automatically). Claude Code deletes each one once it's older than both this limit and [`cleanupPeriodDays`](#cleanupperioddays), so with `cleanupPeriodDays` at its default of 30, a value of `7` still keeps them 30 days. When managed settings set `cleanupPeriodDays`, that period applies instead and this key is ignored. Requires Claude Code v2.1.248 or later.

* **Scope**: [`User or managed`](#scopes). Claude Code also reads the key from a file you pass with `--settings`, and ignores it in project and local settings.
* **Type**: number of days, a whole number, minimum `0`
* **Default**: `0`, which sets no age limit

```json settings.json theme={null}
{
  "desktopSessionCleanupPeriodDays": 90
}
```

### `feedbackDrafts`

Control [Claude-drafted feedback](https://code.claude.com/docs/en/tools-reference#sendfeedback-tool-behavior): whether Claude can queue feedback drafts for you to review, and whether Claude Code shows a card when Claude queues one.

* **Scope**: [`User or managed`](#scopes)
* **Type**: string, one of `"notify"`, `"quiet"`, or `"off"`
  * `"notify"`: Claude Code shows a card above the prompt when Claude queues a draft, up to [three cards in a session](https://code.claude.com/docs/en/tools-reference#what-you-see-when-claude-drafts) by default
  * `"quiet"`: Claude drafts without a card. You see the count of queued drafts in the prompt footer and review them in `/feedback`
  * `"off"`: Claude Code removes the SendFeedback tool, so Claude can't queue drafts
* **Default**: `"notify"`
* **Per-session overrides**: [`CLAUDE_CODE_SEND_FEEDBACK`](https://code.claude.com/docs/en/env-vars) set to `0` turns the feature off for one session

```json settings.json theme={null}
{
  "feedbackDrafts": "quiet"
}
```

Appears in `/config` as **Claude-drafted feedback**, which writes this key to your user settings. You see the `/config` row only in sessions [where Claude can draft feedback](https://code.claude.com/docs/en/tools-reference#sessions-without-claude-drafted-feedback); setting `"off"` doesn't hide it, so you can turn the feature back on from the same row. A value in managed settings takes precedence over your user setting, so when an administrator sets this key, the row shows the managed value and changing it has no effect. Claude Code ignores this key in project and local settings.

### `feedbackSurveyRate`

Set the probability that the [session quality survey](https://code.claude.com/docs/en/data-usage#session-quality-surveys) appears when a session is eligible for it. Set `0` to keep the survey from appearing.

* **Scope**: [`Any file`](#scopes)
* **Type**: number between `0` and `1`
* **Default**: unset, so Claude Code uses the rate Anthropic sets remotely, or its built-in rate of `0.005` on Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry, which don't receive remote configuration
* **Per-session overrides**: [`CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY`](https://code.claude.com/docs/en/env-vars) set to `1` turns the survey off for one session whatever rate this key sets

```json settings.json theme={null}
{
  "feedbackSurveyRate": 0.05
}
```

The same rate applies to the survey in the VS Code extension.

### `skipWebFetchPreflight`

Skip the [WebFetch domain safety check](https://code.claude.com/docs/en/data-usage#webfetch-domain-safety-check), which sends each requested hostname to `api.anthropic.com` before fetching. Set `true` in environments that block traffic to Anthropic, such as Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry deployments with restrictive egress.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code skips the WebFetch domain safety check
  * `false`: the check runs before the first fetch to each hostname in a session, and again for a hostname whose earlier check was blocked or failed
* **Default**: unset, so the check runs before the first fetch to each hostname in a session

```json settings.json theme={null}
{
  "skipWebFetchPreflight": true
}
```

With the check skipped, WebFetch attempts any URL without consulting the blocklist, so pair it with [`WebFetch` permission rules](https://code.claude.com/docs/en/permissions#webfetch) if you need to restrict which domains Claude can reach.

&lt;span id="managed-policy" />
