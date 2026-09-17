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
sourceRel: "en/remote-control.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/remote-control.md"
sourceSha256: "24ef9e60eeae3360065480ea2b2ba103f3bef9e6e470ada18c41fcd2be67bbbe"
pageSha256: "f8ad652dc5bdb916458a4ef972286ac0f7e1a42929f9c969be1b1aad183f071a"
contentMode: "local-full"
zh: ""
---

## Troubleshooting

### "Remote Control requires a claude.ai subscription"

You're not signed in with a claude.ai account, or another credential is taking precedence over your login. The message takes one of these forms:

* Signed out, from `/remote-control` or `--remote-control`: `Remote Control requires a claude.ai subscription.`
* Signed out, from `claude remote-control`: `You must be logged in to use Remote Control. Remote Control is only available with claude.ai subscriptions.`
* Signed in, but an API key or token is in use: `Remote Control requires claude.ai subscription auth.` followed by the credential in use, such as `ANTHROPIC_API_KEY is set, so this session is using API-key auth`. An `apiKeyHelper` setting and `ANTHROPIC_AUTH_TOKEN` are named the same way.

Run `claude auth login` and choose the claude.ai option. If the message names `ANTHROPIC_API_KEY` or `ANTHROPIC_AUTH_TOKEN`, remove it wherever it's set: your shell environment or the `env` block of a [settings file](https://code.claude.com/docs/en/settings-reference#env). If it names `apiKeyHelper`, remove that setting.

Before v2.1.206, running `/remote-control` while signed out reported `Unknown command: /remote-control` instead of this message.

### "Remote Control requires a full-scope login token"

You're authenticated with a long-lived token from `claude setup-token` or the `CLAUDE_CODE_OAUTH_TOKEN` environment variable. These tokens can only make model requests, so they can't establish Remote Control sessions. Run `claude auth login` to authenticate with a full-scope session token instead.

### "Unable to determine your organization for Remote Control eligibility"

Your cached account information is stale or incomplete. Run `claude auth login` to refresh it.

### "Remote Control isn't enabled for this account"

Claude Code checked Remote Control availability for the account you're signed in with and the check came back off. The usual cause is cached entitlements that are out of date after a plan change. Run `claude auth logout` then `claude auth login` to refresh them, and update Claude Code if you're on an old version.

Run `claude doctor` to see which individual eligibility check failed. Environment-variable conflicts, unreachable checks, and your organization's Remote Control setting each produce their own message, so this error means the account-level check itself.

Before v2.1.239, this message read "Remote Control is not yet enabled for your account". Before v2.1.154, a variable that disables feature-flag evaluation, such as `DISABLE_TELEMETRY` or `DO_NOT_TRACK`, also produced this message; the "Remote Control requires feature-flag evaluation" entry below covers that configuration.

### "Couldn't verify Remote Control eligibility"

Claude Code could not reach the feature-flag service to check whether Remote Control is enabled for your account, typically because you are offline or a proxy is blocking the request. Retry once you have network access, or run `claude doctor` for details. The related message "Couldn't verify your organization's Remote Control policy" has the same cause and the same fix. Both messages were added in v2.1.178.

### "Remote Control requires feature-flag evaluation"

One of these variables is set: [`DISABLE_TELEMETRY`, `DO_NOT_TRACK`, `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, or `DISABLE_GROWTHBOOK`](https://code.claude.com/docs/en/env-vars). Each of them disables the feature-flag evaluation that Remote Control availability depends on, and the full message names the variable Claude Code found. Unset that variable wherever it's set, in your shell environment or in the `env` block of a [`settings.json` file](https://code.claude.com/docs/en/settings-reference#all-settings). On versions before 2.1.154, the same configuration produces "Remote Control is not yet enabled for your account" instead.

### "Remote Control is only available when using Claude via api.anthropic.com"

The session isn't talking to the Anthropic API directly, so there is no claude.ai backend to pair with. This happens on Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry. It also happens when [`ANTHROPIC_BASE_URL`](https://code.claude.com/docs/en/env-vars) points at a host other than `api.anthropic.com`, such as an [LLM gateway](https://code.claude.com/docs/en/llm-gateway) or proxy, even if you sign in with claude.ai. Before v2.1.196, Claude Code didn't show this message for a custom `ANTHROPIC_BASE_URL`. See the [error reference](https://code.claude.com/docs/en/errors#remote-control-requires-the-anthropic-api) for the full cause list.

The message names what routed the session away from the Anthropic API, such as `CLAUDE_CODE_USE_BEDROCK` or a custom `ANTHROPIC_BASE_URL`. If you have an eligible claude.ai login, unset the named variable, remove it from the `env` key in [settings](https://code.claude.com/docs/en/settings) if you set it there, and restart the session. Before v2.1.219, the message was only the sentence in this section's header, so on older versions check your environment yourself for provider variables such as `CLAUDE_CODE_USE_BEDROCK` and `CLAUDE_CODE_USE_VERTEX`, and for `ANTHROPIC_BASE_URL`.

### "Remote Control is disabled by your organization's policy"

A policy blocks Remote Control, or Claude Code couldn't load your organization's policy on this machine and keeps Remote Control off in the meantime. Check these causes in order:

* **The error mentions `disableRemoteControl`**: your IT administrator has disabled Remote Control on this device through [managed settings](https://code.claude.com/docs/en/managed-settings), independent of the organization-wide toggle and of how you're signed in.
* **Your claude.ai plan is Pro or Max**: Claude Code is still signed in under a Team or Enterprise organization from an earlier login, so it checks that organization's Remote Control policy. Run `/status` to see which plan and organization your sign-in uses. Run `claude auth logout` then `claude auth login` to sign in again under your current plan.
* **The organization policy didn't load on this machine**: run `claude doctor` and read the `Organization policy` line. If the line shows the policy isn't loaded, that is what's keeping Remote Control off. Before v2.1.261, `claude doctor` didn't print this line.
* **The message doesn't say to contact your organization admin**: your organization has a HIPAA configuration that is incompatible with Remote Control, and `/status` lists `HIPAA` in its `Compliance` row. In this state the admin panel's Remote Control toggle is grayed out, so an Owner can't change it there. Contact Anthropic support to discuss options. Before v2.1.267, this case showed "Remote Control isn't available for your organization due to its compliance policy" instead.
* **Otherwise, an Owner hasn't enabled it for your organization**: Remote Control is off by default on Team and Enterprise plans. An Owner can enable it at [claude.ai/admin-settings/claude-code](https://claude.ai/admin-settings/claude-code) by turning on the **Remote Control** toggle. This toggle is a server-side organization setting.

### "Remote credentials fetch failed"

Claude Code could not obtain a short-lived credential from the Anthropic API to establish the connection. Re-run with `--verbose` to see the full error:

```bash theme={null}
claude remote-control --verbose
```

Common causes:

* Not signed in: run `claude` and use `/login` to authenticate with your claude.ai account. API key authentication is not supported for Remote Control.
* Network or proxy issue: a firewall or proxy may be blocking the outbound HTTPS request. Remote Control requires access to the Anthropic API on port 443.
* Session creation failed: if you also see `Session creation failed — see debug log`, the failure happened earlier in setup. Check that your subscription is active.

A stale login token doesn't cause this error. When the Anthropic API rejects the saved token, for example because another Claude Code process already refreshed it, Claude Code refreshes the token and retries on its own. Before v2.1.224, a stale token failed Remote Control startup with this message, so sessions set to [connect automatically](#enable-remote-control-for-all-sessions) could fail intermittently at launch.

### "Couldn't reconnect to your Remote Control session"

When you resume a conversation with `claude --resume` or `claude --continue`, Claude Code reconnects to the Remote Control session recorded in that conversation. This message means the reconnection failed for a reason that may be temporary, such as a network interruption or a server error, so Claude Code can't confirm whether the remote session still exists.

Run `/remote-control` to retry the connection, or start a new session with `claude --remote-control` to create a new Remote Control session. Your local session keeps running without Remote Control in the meantime.

&lt;span id="resume-outcomes" />When you resume, you can also get one of these outcomes instead of this message:

* **The server reports the recorded session gone, or the reconnection record names a different account**: Claude Code goes by what the conversation's reconnection record says:
  * **The record names your signed-in account**: Claude Code starts a replacement session with an auto-generated name and leaves the conversation's earlier messages out of it. You get this after you delete the session from claude.ai or the Claude app, for example.
  * **The record names a different account**: Claude Code starts a new session without the conversation's earlier messages and without showing a message, whether or not the recorded session still exists.
  * **The record doesn't say which account owned the session, or Claude Code can't read your saved sign-in**: Claude Code shows [`Previous session is unavailable — run /remote-control to start a new one`](#previous-session-is-unavailable) instead of this message, starts nothing, and removes the record from the conversation.
* **You turned Remote Control off before resuming**: unless the app hosting Claude Code had told it that the app owns the claude.ai session, Claude Code removed the reconnection record when you turned Remote Control off from the CLI's [status panel](#check-connection-status), the VS Code extension, or a host built on the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview), so it doesn't reconnect. When an owning app turned it off, Claude Code kept the record and reconnects.
* **Another Claude Code on this machine still has the session**: you see a notice that starts with `Remote Control not started here`, and Claude Code [leaves Remote Control off in the resumed session](#resume-sessions-after-stopping-the-server). Run `/remote-control` there to move it.

&lt;span id="reconnect-history" />Before v2.1.232, Claude Code responded differently when the server reported the recorded session gone. From v2.1.227 through v2.1.231, Claude Code refused to start a replacement even when the record matched your account. Through v2.1.226, Claude Code started a replacement whether or not the record matched your account, and in v2.1.224 through v2.1.226 created it under the account signed in on that machine, never another account's, without uploading the conversation's earlier messages to it. Before v2.1.200, Claude Code created a new session after any reconnection failure.

<h3 id="previous-session-is-unavailable">
  "Previous session is unavailable — run /remote-control to start a new one"
</h3>

Claude Code couldn't bring back the previous Remote Control session and stopped instead of starting a new one on its own. You can see this message after you resume a conversation with `claude --resume` or `claude --continue`, or after Claude Code [reconnects on its own following a disconnect](https://code.claude.com/docs/en/errors#remote-control-couldnt-refresh-your-login).

Run `/remote-control` to start a new Remote Control session under the current login; your local session keeps running without Remote Control in the meantime. The related message `Remote Control could not verify the signed-in account — run /remote-control to reconnect` has the same fix; Claude Code shows it when the signed-in account changed or couldn't be read between validating it and reconnecting. If you run `/remote-control` after `Previous session is unavailable` without restarting Claude Code first, Claude Code leaves the conversation's earlier messages out of the new session.

On resume, Claude Code [starts a new session in its place](#resume-outcomes) only if the conversation's reconnection record names the account that owned the session, because the server reports a session you deleted and a session owned by another account the same way. Claude Code before v2.1.227 didn't record that account, and Claude Code can't check the record when it can't read your saved sign-in. Claude Code before v2.1.232 showed `Remote Control could not resume the previous session under the current login — run /remote-control to start fresh` instead, in [a different set of cases](#reconnect-history).

### "Remote Control got an unexpected server response"

The Remote Control server accepted a request but replied in a form this version of Claude Code couldn't read, while creating the remote session or fetching its credentials. Retrying on the same version fails the same way. Run `claude update`, then run `/remote-control` to reconnect. This message was added in v2.1.225.

### "Your organization requires Trusted Devices for Remote Control, but this device is not enrolled"

Your organization has [Trusted Devices](#trusted-devices) enabled and this machine has not enrolled yet. Run `/login` in Claude Code. Enrollment happens as part of sign-in, and there is no separate enrollment command.

### "session expired for trusted-device check"

Your sign-in is more than 18 hours old. Run `/login` in Claude Code, or confirm with Face ID, Touch ID, Windows Hello, or a passkey when claude.ai or the mobile app prompts you. See [Trusted Devices](#trusted-devices).
