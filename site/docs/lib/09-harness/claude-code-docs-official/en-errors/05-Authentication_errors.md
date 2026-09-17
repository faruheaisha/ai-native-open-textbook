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
pageSha256: "07103ab77e31ea0e0a10ac70d0f2b6e8df600354bee2f7018a3a73987f60060d"
contentMode: "local-full"
zh: ""
---

## Authentication errors

These errors mean Claude Code cannot prove who you are to the API. Run `/status` at any time to see which credential is currently active.

### Not logged in

No valid credential is available for this session.

```text theme={null}
Not logged in · Please run /login
```

**What to do:**

* Run `/login` to authenticate with your Claude subscription or Console account
* If you expected an environment variable to authenticate you, confirm `ANTHROPIC_API_KEY` is set and exported in the shell where you launched `claude`
* For CI or automation where interactive login is not possible, configure an [`apiKeyHelper`](https://code.claude.com/docs/en/settings-reference#apikeyhelper) script that fetches a key at startup
* See [Authentication precedence](https://code.claude.com/docs/en/authentication#authentication-precedence) to understand which credential Claude Code uses when several are present

If you are prompted to log in repeatedly, see [Not logged in or token expired](https://code.claude.com/docs/en/troubleshoot-install#not-logged-in-or-token-expired) for system clock checks and macOS credential-storage recovery steps.

### Could not resolve authentication method

The session reached the API client without any credential. [Background sessions](https://code.claude.com/docs/en/agent-view) and cloud sessions show this message when the worker starts without a credential. Interactive, `-p`, and Agent SDK runs report the same condition as [Not logged in](#not-logged-in) and write this string only to their debug log, so if you found it there, follow that entry instead.

```text theme={null}
Could not resolve authentication method. Expected one of apiKey, authToken, credentials, config, or profile to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
```

On current versions the error means no credential was available to the worker process. Before v2.1.174, a background session assigned to an idle pre-initialized worker could fail this way even when valid credentials were configured. Before v2.1.176, a cloud session that sat idle before being claimed could too. Upgrade to recover.

**What to do:**

* Upgrade to v2.1.176 or later if this appears in a background or cloud session and your credentials are already configured
* Confirm `ANTHROPIC_API_KEY`, `CLAUDE_CODE_OAUTH_TOKEN`, or your cloud provider credentials are set in the environment that launches the worker, not only in your interactive shell
* For the Agent SDK, see [authentication setup in the quickstart](https://code.claude.com/docs/en/agent-sdk/quickstart#setup)
* Run `/status` in an interactive session in the same environment to confirm which credential source resolves

### Invalid API key

The `ANTHROPIC_API_KEY` environment variable or `apiKeyHelper` script returned a key the API rejected, or Claude Code blocked a key from `ANTHROPIC_API_KEY` before sending it.

```text theme={null}
Invalid API key · Fix external API key
```

When the message continues past `Fix external API key` with a description such as `Invalid X-Api-Key header value from ANTHROPIC_API_KEY: it contains a line break at character 41 (120 characters on 2 lines).`, the API never saw the key. Claude Code found a character that HTTP headers can't carry and stopped the request before sending it. See [Invalid request header value](#invalid-request-header-value) for how to read the description and fix the value.

**What to do:**

* Check for typos and confirm the key has not been revoked in the [Console](https://platform.claude.com/settings/keys)
* In the same shell, run `env | grep ANTHROPIC`, or in PowerShell `Get-ChildItem Env:ANTHROPIC*`. Tools like direnv, dotenv shell plugins, and IDE terminals can load a stale key from a `.env` file in your project without you setting it explicitly.
* Unset `ANTHROPIC_API_KEY` and run `/login` to use subscription auth instead
* If the key comes from an [`apiKeyHelper`](https://code.claude.com/docs/en/settings-reference#apikeyhelper) script, run the script directly to confirm it prints a valid key on stdout
* Run `/status` to confirm which credential source Claude Code is actually using

### Your apiKeyHelper script is failing

Claude Code ran the command in your [`apiKeyHelper`](https://code.claude.com/docs/en/settings-reference#apikeyhelper) setting and didn't get a key back. Without one, the request reaches the API with a placeholder credential, and the API rejects it with `401`. The `Authentication` panel in the terminal shows which of these happened:

* The command exited with an error or timed out
* The command printed nothing to stdout
* The command printed something besides the key, such as a login banner or a log line. The panel shows `returned output that cannot be used as an API key` and says what's wrong, without repeating the output. Before v2.1.227, Claude Code sent whatever the command printed, after trimming surrounding whitespace.

```text theme={null}
Your apiKeyHelper script is failing · This usually means you need to re-authenticate with your provider · Run /status to see the script's error output
```

In [non-interactive mode](https://code.claude.com/docs/en/headless), stderr also carries the specific reason, prefixed with `apiKeyHelper failed:`.

Claude Code re-runs the script and retries the request up to two more times before showing this message, so the failure surfaces within three attempts. Before v2.1.208, Claude Code spent the full [retry budget](#automatic-retries) resending the request with the placeholder credential and then reported a generic `401` authentication error instead of the script failure.

Running `/login` doesn't help here: the helper's output [takes precedence](https://code.claude.com/docs/en/authentication#authentication-precedence) over a saved login for as long as the setting is present.

**What to do:**

* Run the command configured in `apiKeyHelper` directly in your shell to reproduce the failure
* If the command reports an expired session, re-authenticate with your credential provider, for example by signing in to your SSO or secrets vault again
* Fix the command so it prints only the key to stdout, as a single token of printable ASCII up to 16,384 characters, and exits with code 0. See [rotate credentials with apiKeyHelper](https://code.claude.com/docs/en/llm-gateway-connect#rotate-credentials-with-apikeyhelper) for a working setup.
* Run `/status` to confirm `apiKeyHelper` is the active credential source. Each time the command fails, its exit code and error output appear in an `Authentication` panel in the terminal. Before v2.1.212, the panel was titled `Cloud authentication`.

### Invalid request header value

A value Claude Code was about to send as a request header contains a character that HTTP headers can't carry: a line break, a NUL byte, or a character above `U+00FF`, such as a curly quote or a zero-width space. Claude Code stops the request before anything is sent and names the variable or setting to fix. The usual cause is a credential pasted from a document or chat that carried an invisible character or a stray line break.

Claude Code runs this check when it sends requests to the Claude API directly or through an [LLM gateway](https://code.claude.com/docs/en/llm-gateway). On a third-party cloud provider such as [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock), Claude Code doesn't run it before sending.

```text theme={null}
Invalid auth token · Fix external auth token
Invalid ANTHROPIC_CUSTOM_HEADERS · Fix the environment variable
Invalid request header from the environment · Fix the environment variable
```

The first part of the message depends on where the bad value came from:

* `Invalid auth token`: a bearer token from [`ANTHROPIC_AUTH_TOKEN`](https://code.claude.com/docs/en/env-vars) or [`CLAUDE_CODE_OAUTH_TOKEN`](https://code.claude.com/docs/en/env-vars)
* `Invalid ANTHROPIC_CUSTOM_HEADERS`: a header name or value you set in [`ANTHROPIC_CUSTOM_HEADERS`](https://code.claude.com/docs/en/env-vars). The description counts which `Name: Value` pair is at fault, such as `distinct header 2 of 3 parsed from ANTHROPIC_CUSTOM_HEADERS`, without repeating the name or value, since you chose both.
* `Invalid request header from the environment`: a value Claude Code copies into a request header from another environment variable, such as `CLAUDE_AGENT_SDK_CLIENT_APP`. The description names the variable to fix.

Claude Code reports a bad `ANTHROPIC_API_KEY` caught by this check as [Invalid API key](#invalid-api-key), with the same trailing description. It reports a bad saved `/login` credential as [Not logged in](#not-logged-in) instead; run `/login` to save a fresh one. An [`apiKeyHelper`](https://code.claude.com/docs/en/settings-reference#apikeyhelper) script's output never reaches this check: Claude Code validates it when the script runs, and output an HTTP header can't carry fails with [Your apiKeyHelper script is failing](#your-apikeyhelper-script-is-failing).

After the second `·`, the message describes the problem, as in this full example:

```text theme={null}
Invalid auth token · Fix external auth token · Invalid Authorization header value from ANTHROPIC_AUTH_TOKEN: it contains a line break at character 41 (120 characters on 2 lines).
```

Positions count characters starting at one. The description is built from fixed phrases and character counts, so it never includes the value itself. It names the offending character only when it is a well-known invisible or typographic character, such as a byte-order mark, a zero-width space, or a curly quote, and reports anything else as `a non-ASCII character`.

**What to do:**

* Re-set the variable or setting the message names, retyping the characters around the reported position rather than pasting from the same source again
* For `ANTHROPIC_CUSTOM_HEADERS`, keep one `Name: Value` pair per line and rewrite the pair the message counts
* Run `/status` to confirm which credential source is active

### This organization has been disabled

Claude Code is using a stale `ANTHROPIC_API_KEY` from a disabled Console organization. When you have a saved subscription login, the key overrides it.

```text theme={null}
Your ANTHROPIC_API_KEY belongs to a disabled organization · Unset the environment variable to use your subscription instead
Your ANTHROPIC_API_KEY belongs to a disabled organization · Update or unset the environment variable
API Error: 400 ... This organization has been disabled.
```

The hint after the `·` depends on your saved credentials: the first form appears when a stored `/login` can take over after you unset the key, and the second when the key is your only credential.

Environment variables take precedence over `/login`, so a key exported in your shell profile or loaded from a `.env` file is used even when you have a working Pro or Max subscription. In non-interactive mode (`-p`), the key is always used when present.

**What to do:**

* Unset `ANTHROPIC_API_KEY` in the current shell and remove it from your shell profile, then relaunch `claude`
* If the message says `Update or unset`, you have no saved login to fall back to. Unset the key and run `/login`, or replace the key with one from an active Console organization.
* Run `/status` afterward to confirm the active credential is your subscription
* If no environment variable is set and the error persists, the disabled organization is the one tied to your `/login`. Contact support or sign in with a different account.

### Your organization has disabled API key authentication

This message requires Claude Code v2.1.169 or later. Your Console organization's admin has turned off API key authentication, so the API rejects the key Claude Code is sending. The recovery hint after the `·` varies by where the key came from:

```text theme={null}
Your organization has disabled API key authentication · Run /login to sign in with your claude.ai account
Your organization has disabled API key authentication · Unset ANTHROPIC_API_KEY to use your claude.ai account instead
Your organization has disabled API key authentication · Unset ANTHROPIC_API_KEY and run /login to sign in with your claude.ai account
Your organization has disabled API key authentication · Unset the apiKeyHelper setting and run /login to sign in with your claude.ai account
```

Environment variables and `apiKeyHelper` take precedence over `/login`, so running `/login` alone doesn't help while either is still supplying a key. See [Authentication precedence](https://code.claude.com/docs/en/authentication#authentication-precedence).

**What to do:**

* If the message names `ANTHROPIC_API_KEY`, unset it in the current shell and remove it from your shell profile or `.env` file, then relaunch `claude`
* If the message names `apiKeyHelper`, remove the [`apiKeyHelper`](https://code.claude.com/docs/en/settings-reference#apikeyhelper) setting from your `settings.json`
* Run `/login` to sign in with your claude.ai account
* Run `/status` afterward to confirm the active credential is your subscription rather than an API key
* If you need API key authentication for automation, ask your organization admin to re-enable it in the Console

### Your organization has disabled Claude subscription access

Your Claude organization doesn't allow signing in to Claude Code with a subscription login. Running `/login` again with the same account returns the same error.

```text theme={null}
Your organization has disabled Claude subscription access for Claude Code · Use an Anthropic API key instead, or ask your admin to enable access
```

This is a server-side organization setting, so it can't be overridden from local settings, environment variables, or CLI flags.

The Agent SDK and `-p` non-interactive mode surface this as the `oauth_org_not_allowed` error code.

**What to do:**

* Ask your admin to enable Claude Code access for your organization
* Authenticate with a Console API key instead of your subscription. See [Claude Console authentication](https://code.claude.com/docs/en/authentication#claude-console-authentication) for setup.
* If you are the admin and do not see an option to enable access, contact [Anthropic support](https://support.claude.com)

<h3 id="routines-are-disabled-by-your-organizations-policy">
  Routines are disabled by your organization's policy
</h3>

An Owner in your Team or Enterprise organization has turned off routines at the organization level. The error appears when you try to create or run a routine, for example from the [Routines](https://code.claude.com/docs/en/routines) UI on claude.ai/code. On Claude Code v2.1.227 or later, the same setting also [hides `/schedule`](https://code.claude.com/docs/en/routines#troubleshooting) in the CLI.

```text theme={null}
Routines are disabled by your organization's policy.
```

This is a server-side setting, so it can't be overridden from local settings, environment variables, or CLI flags.

**What to do:**

* Ask an Owner in your organization to enable the **Routines** toggle at [claude.ai/admin-settings/claude-code](https://claude.ai/admin-settings/claude-code)
* For one-off scheduled work that does not require organization-level routines, see [scheduled tasks](https://code.claude.com/docs/en/scheduled-tasks)

### Remote Control requires the Anthropic API

The session isn't talking to the Anthropic API directly, so there is no claude.ai backend for [Remote Control](https://code.claude.com/docs/en/remote-control) to pair with.

```text theme={null}
Remote Control is only available when using Claude via api.anthropic.com. CLAUDE_CODE_USE_BEDROCK is set, so this session is using Amazon Bedrock — unset it (or run in a shell without it) to use Remote Control.
```

A second sentence explains what routed the session away from the Anthropic API; before v2.1.219, the message was the first sentence alone. Depending on the cause, the message names:

* A `CLAUDE_CODE_USE_*` provider variable, such as `CLAUDE_CODE_USE_BEDROCK` for [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock) or `CLAUDE_CODE_USE_VERTEX` for [Google Cloud's Agent Platform](https://code.claude.com/docs/en/google-vertex-ai)
* [`ANTHROPIC_BASE_URL`](https://code.claude.com/docs/en/env-vars) pointing at a host other than `api.anthropic.com`, such as an [LLM gateway](https://code.claude.com/docs/en/llm-gateway) or proxy, even when you sign in with claude.ai; before v2.1.196, a custom base URL didn't block Remote Control
* An enterprise [cloud gateway](https://code.claude.com/docs/en/claude-apps-gateway) sign-in made through `/login`, which doesn't support Remote Control and has no variable to unset

**What to do:**

* Unset the variable the message names, such as `CLAUDE_CODE_USE_BEDROCK` or `ANTHROPIC_BASE_URL`, and restart the session, or start Remote Control from a session that talks to the Anthropic API directly
* If the variable isn't set in your shell, check the `env` key in your [settings files](https://code.claude.com/docs/en/settings#where-settings-live), which applies environment variables to every session
* For this and the other Remote Control startup messages, see [Troubleshoot Remote Control](https://code.claude.com/docs/en/remote-control#troubleshooting)

<h3 id="remote-control-couldnt-refresh-your-login">
  Remote Control couldn't refresh your login
</h3>

Claude Code runs a live [Remote Control](https://code.claude.com/docs/en/remote-control) connection on short-lived credentials that it obtains and renews using your saved claude.ai login. When claude.ai stops accepting that login, or Claude Code has no saved login left, Claude Code stops Remote Control and needs you to sign in again. Either failure can happen while Claude Code is still connecting or later, when it renews the credentials.

When Claude Code asks the login service to refresh your saved login and gets no answer, it keeps Remote Control running and tries the refresh again while the connection's current credential is still valid. A refresh gets no answer when Claude Code can't reach the login service, the request times out, or the service fails without rejecting your login. If the login service still isn't answering when that credential expires, Claude Code stops Remote Control and reports `OAuth token refresh failed`.

When Claude Code stops Remote Control, it shows the reason in a warning and in a transcript line that starts with `Remote Control disconnected`. Your local session keeps running without Remote Control. This section covers these lines:

```text theme={null}
Remote Control disconnected — Claude.ai login expired — run /login to restore Remote Control
Remote Control disconnected — Claude.ai login expired — run /login, then /remote-control
Remote Control disconnected — Claude.ai login was rejected — run /login, then /remote-control
Remote Control disconnected — OAuth token unavailable — run /login to restore Remote Control
Remote Control disconnected — OAuth token refresh failed — run /login to re-authenticate
Remote Control disconnected — JWT refresh failed: no OAuth token — run /login
Remote Control disconnected — Signed out of Claude — run /login, then /remote-control
```

Claude Code names the cause in the middle of the message:

* `Claude.ai login expired` and `Claude.ai login was rejected`: claude.ai no longer accepts your saved login token, because it expired or was revoked
* `OAuth token unavailable`: Claude Code had no saved login token when the connection's credential came due for renewal
* `OAuth token refresh failed`: claude.ai rejected your saved login token while Claude Code was reconnecting, and refreshing the token produced no new one
* `JWT refresh failed: no OAuth token`: Claude Code found no saved login token to renew with
* `Signed out of Claude`: you signed out on this machine, for example by running `/logout` in another terminal, so Claude Code has no saved login left to renew the connection with

**What to do:**

* Run `/login` to sign in again
* Run `/remote-control` to reconnect the session. Messages ending `run /login to restore Remote Control` don't need this step: Claude Code reconnects on its own once you sign in.

Before v2.1.224, `OAuth token refresh failed — run /login to re-authenticate` read `OAuth token refresh failed — re-authenticate, then re-enable Remote Control`, and `JWT refresh failed: no OAuth token — run /login` read `no OAuth token available for recovery (code <N>)`. The `Claude.ai login expired`, `Claude.ai login was rejected`, and `OAuth token unavailable` messages were added in v2.1.225.

Before v2.1.238, Claude Code reported the cases that now say `Signed out of Claude` as `JWT refresh failed: no OAuth token — run /login`, and stopped Remote Control with `Claude.ai login expired — run /login to restore Remote Control` as soon as one login refresh got no answer.

<h3 id="remote-control-stopped-because-the-signed-in-account-changed">
  Remote Control stopped because the signed-in account changed
</h3>

Claude Code shows this line during a [Remote Control](https://code.claude.com/docs/en/remote-control) session when you sign in to a different claude.ai account or organization on this machine. You made the switch outside the Claude Code session, for example by running `/login` in another terminal.

A Remote Control session that you started while signed in through `/login` belongs to the claude.ai account and organization that were signed in at the time.

```text theme={null}
Remote Control disconnected — signed-in claude.ai account or organization changed on this machine — run /remote-control to start a session for the current account, or /login to switch back, then /remote-control
```

Claude Code stops the Remote Control session as soon as claude.ai confirms that the account or organization changed. Your local session keeps running without Remote Control.

**What to do:**

* Run `/remote-control` to start a new Remote Control session under the current account or organization
* To switch back, run `/login` and sign in to the previous account or organization again. Then run `/remote-control`.

Before v2.1.234, Claude Code didn't notice when you switched to a different account or organization outside the Claude Code session. Claude Code kept the Remote Control session connected until a later request to the Remote Control server failed with `Remote Control server rejected the request (HTTP 404)`. That failure could come hours after the switch.

<h3 id="remote-control-stopped-because-the-app-running-the-session-signed-out-or-switched-accounts">
  Remote Control stopped because the app running the session signed out or switched accounts
</h3>

When the Claude desktop app or an IDE hosts your session, Claude Code gets its login token from that app rather than from `/login`. When claude.ai rejects that token, Claude Code asks the app for a new one. If the app answers that it's signed out, or that it's now signed in to a different Claude account, Claude Code ends the [Remote Control](https://code.claude.com/docs/en/remote-control) session and sends the app one of these lines:

```text theme={null}
Remote Control stopped — the app running this session is now signed in to a different Claude account
Remote Control stopped — the app running this session is signed out of Claude. Sign in there, then turn Remote Control back on
```

Your local session keeps running without Remote Control.

**What to do:**

* If the app is signed out, sign in to it again, then turn Remote Control back on in the app
* If the app switched accounts, Claude Code can't continue the ended session under the new account. Start a new Remote Control session under that account.

Before v2.1.238, Claude Code sent the app the `run /login` messages listed under [Remote Control couldn't refresh your login](#remote-control-couldnt-refresh-your-login) in both cases.

### OAuth token revoked or expired

Your saved login is no longer valid. A revoked token means you signed out everywhere or an admin removed access; an expired token means the automatic refresh failed mid-session.

Both messages report a rejection the API returned for a request Claude Code sent. When the saved login has already been cleared after a failed refresh, you see [Login expired](#login-expired) instead. If you authenticate with a long-lived token in [`CLAUDE_CODE_OAUTH_TOKEN`](https://code.claude.com/docs/en/env-vars), you see the same messages when that token expires or is revoked.

```text theme={null}
OAuth token revoked · Please run /login
OAuth token has expired · Please run /login
API Error: 401 ... authentication_error
```

**What to do:**

* Run `/login` to sign in again
* If the error returns within the same session after re-authenticating, run `/logout` first to fully clear the stored token, then `/login`
* If you authenticate with the `CLAUDE_CODE_OAUTH_TOKEN` environment variable, Claude Code keeps sending the value you set after a request fails with a 401, rather than switching to a stored login's token. [`/status`](https://code.claude.com/docs/en/commands) shows this credential as an `Auth token` row reading `CLAUDE_CODE_OAUTH_TOKEN`. Generate a fresh token with [`claude setup-token`](https://code.claude.com/docs/en/authentication#generate-a-long-lived-token) and restart with it, or unset the variable and run `/login`. Before v2.1.225, Claude Code could replace the variable's value mid-session with the short-lived access token from a stored login, and the session failed with 401 errors again once that token expired.
* For repeated prompts to log in across launches, see the system clock checks and macOS credential-storage recovery steps in [Troubleshooting](https://code.claude.com/docs/en/troubleshoot-install#not-logged-in-or-token-expired)
* For other failures including `403 Forbidden` and OAuth browser issues, see [Login and authentication](https://code.claude.com/docs/en/troubleshoot-install#login-and-authentication)

### API Error: 401 Invalid authentication credentials

The API recognized the format of your credential but rejected the account or organization behind it. Anthropic returns this message when a credential was recently revoked, when an organization was disabled or removed your access, or when the account itself was deactivated, so an expired token isn't the cause. The credential can be your saved login or an approved `ANTHROPIC_API_KEY`, and the fix differs, so start by running `/status` to see which one is active.

```text theme={null}
Please run /login · API Error: 401 Invalid authentication credentials
```

**What to do:**

* If `/status` shows an `API key` row that isn't marked as not in use, an approved [`ANTHROPIC_API_KEY`](https://code.claude.com/docs/en/authentication#authentication-precedence) is the active credential and takes precedence over your login, so `/login` doesn't replace it. Rotate the key in the Claude Console, or fall back to your subscription by running `unset ANTHROPIC_API_KEY`, or in PowerShell `Remove-Item Env:ANTHROPIC_API_KEY`.
* If `/status` shows only your login, run `/login` once. If the credential was revoked, a fresh login replaces it.
* If the same message returns for the same login account, the account or organization is no longer active. Check the account and organization that `/status` reports, and ask your organization admin to restore access.
* If [`ANTHROPIC_BASE_URL`](https://code.claude.com/docs/en/env-vars) points at an [LLM gateway](https://code.claude.com/docs/en/llm-gateway), the text after `401` is your gateway's message rather than Anthropic's, and `/login` doesn't change it. Fix the credential your gateway expects instead.

### Login expired

Claude Code tried to renew your saved claude.ai or Claude Console login and the OAuth service rejected the stored refresh token, so Claude Code cleared the saved credentials. After that, each model request stops locally with this message before it reaches the API, because only `/login` can create new credentials.

Before v2.1.206, Claude Code sent the model request anyway with whatever credential remained in the environment, and every model then failed with [There's an issue with the selected model](#theres-an-issue-with-the-selected-model) or a 401 instead of a prompt to sign in.

```text theme={null}
Login expired · Please run /login
```

In [non-interactive mode](https://code.claude.com/docs/en/headless) (`-p`) and the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview), the message reads as follows, and the structured error code is `authentication_failed`:

```text theme={null}
Failed to authenticate: OAuth session expired and could not be refreshed
```

This is not the same state as [OAuth token revoked or expired](#oauth-token-revoked-or-expired). Those messages report a 401 the API returned. Claude Code itself produces `Login expired` for a login it already failed to renew, so it sends no request. When the renewal fails because the account itself is suspended rather than the login being stale, Claude Code shows [Your account is on hold](#your-account-is-on-hold) instead.

Sessions authenticated with an API key, [`CLAUDE_CODE_OAUTH_TOKEN`](https://code.claude.com/docs/en/env-vars), or a third-party provider don't use the saved login and never see this message.

You can check for this state before a request fails: [`/status`](https://code.claude.com/docs/en/commands) shows a `Login` row reading `Expired — log in again`, plus the organization and email it has saved for the expired login. The row appears only when the saved login is your active credential and can no longer be refreshed. Sessions authenticated another way don't show the row, even if an expired login remains saved. Before v2.1.210, `/status` gave no indication in this state that a login had ever existed, because the cleared credential left it nothing to report.

**What to do:**

* Run `/login` to sign in again. Retrying without signing in shows the same message on every request.
* In non-interactive mode, run `claude` in the same environment, complete `/login`, then rerun your command. For automation that can't sign in interactively, authenticate with `ANTHROPIC_API_KEY` or [generate a long-lived token with `claude setup-token`](https://code.claude.com/docs/en/authentication#generate-a-long-lived-token).
* If signing in keeps failing, see [Login and authentication](https://code.claude.com/docs/en/troubleshoot-install#login-and-authentication)

<h3 id="administrator-policy-requires-a-cloud-gateway-sign-in">
  Administrator policy requires a Cloud gateway sign-in
</h3>

An administrator's [managed settings](https://code.claude.com/docs/en/managed-settings) on this machine set [`forceLoginMethod`](https://code.claude.com/docs/en/settings-reference#forceloginmethod) to `"gateway"` or set [`forceLoginGatewayUrl`](https://code.claude.com/docs/en/settings-reference#forcelogingatewayurl). Unless you select a cloud provider through a variable such as `CLAUDE_CODE_USE_BEDROCK`, Claude Code then accepts only the [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway) sign-in. You see one of two messages:

```text theme={null}
Not signed in to the Cloud gateway — run /login.
```

Model requests fail with this message when the session has no gateway sign-in, for example because you haven't run `/login` since the policy reached the machine.

If you also have an `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, or `apiKeyHelper` credential configured and the managed settings set `forceLoginMethod`, Claude Code exits at startup instead with a message that begins:

```text theme={null}
Administrator policy requires a Cloud gateway sign-in on this machine; the
Anthropic-issued credential configured here (ANTHROPIC_API_KEY,
ANTHROPIC_AUTH_TOKEN, or apiKeyHelper) is not used.
```

**What to do:**

* Run `/login` and complete the sign-in on the **Cloud gateway** screen
* For the startup message, remove the `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, or `apiKeyHelper` setting you configured, then start `claude` and run `/login`
* If you believe the machine shouldn't require the gateway, ask the administrator who manages it to remove `forceLoginMethod` and `forceLoginGatewayUrl` from its managed settings

On v2.1.265, a regression also showed the first message in some LLM-gateway and proxy configurations that authenticate with an API key, `apiKeyHelper`, or custom headers, even with no administrator requirement on the machine. Update to v2.1.266 or later. You don't need to change your configuration.

Before v2.1.261, on machines that set `forceLoginMethod` to `"gateway"`, Claude Code used a leftover saved login instead of failing model requests, and reported a configured environment credential with `This machine's managed settings require a first-party login` instead of the startup message. Before v2.1.265, a machine whose managed settings set only `forceLoginGatewayUrl` didn't require the gateway sign-in, and Claude Code used a leftover credential there.

### Your account is on hold

The Claude account behind your login has been suspended. Claude Code shows the first message when it tries to renew your saved login and learns of the hold, and the second when a sign-in you complete in the browser reports it:

```text theme={null}
Your account is on hold and can't use Claude Code. View details or appeal: https://claude.ai/restricted
Your account is on hold and can't sign in to Claude Code. View details or appeal: https://claude.ai/restricted
```

Signing in again with the same account doesn't clear the message, because the hold is on the account rather than the login. In [non-interactive mode](https://code.claude.com/docs/en/headless) (`-p`) and the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview), the structured error code is `account_on_hold`. Before v2.1.235, Claude Code reported a held account as [Login expired · Please run /login](#login-expired), whose recovery steps can't clear a hold.

**What to do:**

* Open the link in the message to view the hold's details or appeal it
* If you have another Claude account or an API key that isn't affected by the hold, you can keep working while the hold is resolved: run `/login` with that account, or set the key with `ANTHROPIC_API_KEY`

### Anthropic profile login expired

Claude Code is authenticating through an Anthropic credential profile whose saved login credential has expired, and the profile holds no refresh credential Claude Code can use to renew it. Claude Code stops each request locally without retrying, because a retry would read the same expired credential.

```text theme={null}
Anthropic profile login expired · Re-authenticate your Anthropic profile
Anthropic profile login expired · Run /login to use your claude.ai account instead, or re-authenticate the profile
```

This appears only when the active credential comes from an Anthropic credential profile, one you select with the `ANTHROPIC_PROFILE` environment variable, that Claude Code discovers as the active profile in your Anthropic configuration directory, or that Claude Code wrote when you [signed in without an API key](https://code.claude.com/docs/en/authentication#sign-in-without-an-api-key). Sessions that authenticate with `/login`'s claude.ai option, an API key, a bearer token such as `ANTHROPIC_AUTH_TOKEN`, or a third-party provider never see this message.

On a machine that [offers the keyless sign-in](https://code.claude.com/docs/en/authentication#sign-in-without-an-api-key), run `/login`, choose the Anthropic Console account, and sign in again to renew a profile that the keyless Console sign-in or the Claude Platform CLI's `ant auth login` wrote. Claude Code replaces the expired credential in that profile. For a federation profile or one another tool created, `/login` doesn't renew the credential. Which form you see depends on whether you selected the profile or Claude Code discovered it:

* When you set `ANTHROPIC_PROFILE` explicitly, the message ends with `Re-authenticate your Anthropic profile`.
* When Claude Code discovered the profile from your configuration directory, the message offers `/login`, because Claude Code gives a working `/login` precedence over the discovered profile and then authenticates with your claude.ai or Console account instead. Before v2.1.234, Claude Code showed the `Re-authenticate your Anthropic profile` form in this case too.

**What to do:**

* Sign in to the profile again, then retry: on a machine that [offers the keyless sign-in](https://code.claude.com/docs/en/authentication#sign-in-without-an-api-key), run `/login` and choose the Anthropic Console account for a profile the keyless Console sign-in or the Claude Platform CLI's `ant auth login` wrote; for other profiles, use the tool that created them
* If an administrator provisioned the profile's credential, ask them to issue a new one
* Run `/status` to confirm the active credential source and profile name
* To stop using the profile, unset `ANTHROPIC_PROFILE` if you set it, then authenticate another way, such as `/login` or `ANTHROPIC_API_KEY`

### OAuth scope requirement

The stored token predates a permission scope that a newer feature needs. You see this most often from `/usage` and the status line usage indicator:

```text theme={null}
OAuth token does not meet scope requirement: user:profile
```

**What to do:**

* Run `/login` to get a new token with the current scopes. You don't need to log out first.

### claude.ai rejected the session token

A [claude.ai connector](https://code.claude.com/docs/en/mcp#use-mcp-servers-from-claude-ai) request failed because claude.ai rejected the token from your Claude Code login, usually a login that expired and couldn't be refreshed. The rejected token is your login, not the connector's own authorization in claude.ai, so authorizing the connector again doesn't resolve it. In `/mcp`, the connector shows as `connected · session token rejected` and its detail view reads:

```text theme={null}
claude.ai rejected the session token. Run /login, then reconnect.
```

**What to do:**

* Run `/login` to sign in again
* Reconnect the connector from `/mcp`, or run `/mcp reconnect <server>`. Reconnecting before you sign in again leaves the connector in the same state. The `/mcp` panel's **Reconnect** option reports `your claude.ai session token was rejected`; the typed `/mcp reconnect <server>` form reports a successful reconnect even though the token is still rejected.

Before v2.1.222, Claude Code marked the connector as needing authentication instead, which pointed you at the connector's authorization flow even though completing it didn't resolve the state.

### Issuer mismatch in authorization response

During an [MCP OAuth sign-in](https://code.claude.com/docs/en/mcp#authenticate-with-remote-mcp-servers), the authorization server redirected back to Claude Code with an `iss` parameter that doesn't name the issuer that Claude Code expected from the server's OAuth metadata. A wrong issuer at this step is how an authorization server mix-up attack looks, so Claude Code fails the sign-in instead of exchanging the authorization code. Claude Code shows the error in the `/mcp` server menu after the browser sign-in:

```text theme={null}
Issuer mismatch in authorization response (RFC 9207): expected "https://auth.example.com", received "https://other.example.com"
```

`expected` is the issuer from the server's OAuth metadata, and `received` is the `iss` value the redirect carried. A sign-in whose redirect carries no `iss` parameter passes the check, unless the server's metadata sets `authorization_response_iss_parameter_supported`, in which case Claude Code fails the sign-in.

**What to do:**

* Try the sign-in again from `/mcp`
* If the error repeats, report it to the server operator. The fix is server-side: the authorization server must return the same issuer in the `iss` parameter that it advertises in its metadata
* To connect while the server is being fixed, start Claude Code with [`MCP_SDK_GENERATION=v1`](https://code.claude.com/docs/en/env-vars), whose [runtime](https://code.claude.com/docs/en/mcp#mcp-client-runtimes) doesn't run this check. This removes a protection against mix-up attacks, so prefer the server-side fix

Before v2.1.232, Claude Code used the v2 runtime only in a gradual rollout or when you set `MCP_SDK_GENERATION=v2`.

### AWS credentials expired or invalid

This message requires Claude Code v2.1.198 or later and only appears when [`awsAuthRefresh`](https://code.claude.com/docs/en/amazon-bedrock#advanced-credential-configuration) is set in your settings file. Your AWS session token expired or was rejected, and the automatic refresh Claude Code already ran didn't produce a credential the API accepts. It appears on a 401 from [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws) or the [Mantle endpoint](https://code.claude.com/docs/en/amazon-bedrock#use-the-mantle-endpoint), which is how those providers report an expired security token.

The action hint in the middle names the `awsAuthRefresh` command from your settings, so it varies. The stable part is the leading `AWS credentials expired or invalid`:

```text theme={null}
AWS credentials expired or invalid · run /login and select "Claude Platform on AWS · refresh credentials", or run `aws sso login --profile myprofile` in another terminal · API Error: 401 ...
```

Without `awsAuthRefresh` configured, the same 401 shows the generic `Please run /login` message instead, which can't refresh AWS credentials.

**What to do:**

* Run the `awsAuthRefresh` command named in the message, such as `aws sso login --profile myprofile`, in another terminal and complete the browser sign-in, then retry
* In an interactive session, run `/login`, choose **3rd-party platform**, then select **Claude Platform on AWS · refresh credentials** under **Using 3rd-party platforms** to run the same command without restarting Claude Code. See [Configure AWS credentials](https://code.claude.com/docs/en/claude-platform-on-aws#1-configure-aws-credentials)
* If the error repeats after the refresh command succeeds, confirm the identity is valid outside Claude Code with `aws sts get-caller-identity` in the same shell and profile

### AWS authentication failed

This message requires Claude Code v2.1.198 or later and only appears when [`awsAuthRefresh`](https://code.claude.com/docs/en/amazon-bedrock#advanced-credential-configuration) is set in your settings file. Your AWS provider returned a 403, or [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock) returned a 401.

Claude Code can't tell which cause you hit. Amazon Bedrock reports an expired security token as a 403, but a 403 is also how it reports an authorization denial, such as an `AccessDeniedException` from a missing IAM permission or a model that isn't enabled for your account.

A 401 from Amazon Bedrock also lands here rather than under [AWS credentials expired or invalid](#aws-credentials-expired-or-invalid), because Amazon Bedrock doesn't report an expired token as a 401. A 401 from that endpoint typically comes from something else in the request path, such as a corporate proxy.

A credential refresh fixes an expired token and can't fix the other causes, so the message offers both:

```text theme={null}
AWS authentication failed · run /login and select "Claude Platform on AWS · refresh credentials", or run `aws sso login --profile myprofile` in another terminal · if credentials are current, check AWS permissions and model access · API Error: 403 ...
```

The action hint in the middle names the `awsAuthRefresh` command from your settings, so it varies. The stable part is the leading `AWS authentication failed`.

**What to do:**

* Run the `awsAuthRefresh` command named in the message, or `aws sso login`, in case an expired credential is the cause
* If your credentials are current, confirm the IAM permissions in [IAM configuration](https://code.claude.com/docs/en/amazon-bedrock#iam-configuration) are attached to the identity you're using and that the selected model is enabled for your account and region
* Run `aws sts get-caller-identity` to confirm which identity your requests use; a stale `AWS_PROFILE` or default profile is a common cause of a permission mismatch

### Could not load AWS or Google Cloud credentials

Claude Code couldn't obtain usable credentials from the AWS credential provider chain or from your Google application default credentials on the machine it runs on, so no request reached your cloud provider. Claude Code clears its cached credentials and retries twice before showing this message. The detail after the `·` names the specific cause, such as an expired SSO session, missing application default credentials reported as `Could not load the default credentials`, or a revoked sign-in reported as `invalid_grant`:

```text theme={null}
API Error: Could not load AWS credentials · Could not load credentials from any providers. Check or refresh your AWS credentials and try again.
API Error: Could not load Google Cloud credentials · invalid_grant. Check or refresh your Google Cloud credentials and try again.
```

In [non-interactive mode](https://code.claude.com/docs/en/headless) with `-p` and in the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview), the structured error code is `cloud_credential_error`. Before v2.1.267, the message showed only the detail text after `API Error:`, and the structured code was `server_error` or `unknown`.

**What to do:**

* Run your provider's sign-in command, such as `aws sso login --profile myprofile` or `gcloud auth application-default login`, then retry. [Bedrock, Agent Platform, or Foundry credentials not loading](https://code.claude.com/docs/en/troubleshoot-install#bedrock-agent-platform-or-foundry-credentials-not-loading) shows how to confirm the credentials outside Claude Code
* If the detail reads `AWS default-chain credential resolve timed out`, the chain hung rather than failed, so follow [AWS default-chain credential resolve timed out](#aws-default-chain-credential-resolve-timed-out) instead

### AWS default-chain credential resolve timed out

The AWS default credential provider chain didn't produce credentials within 60 seconds, so Claude Code stopped the resolve and failed the request. This timeout is one cause of [Could not load AWS or Google Cloud credentials](#could-not-load-aws-or-google-cloud-credentials). The failure is local credential resolution: the request never reached [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock), [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws), or the [Mantle endpoint](https://code.claude.com/docs/en/amazon-bedrock#use-the-mantle-endpoint). Claude Code clears its [credential cache](https://code.claude.com/docs/en/amazon-bedrock#credential-caching-and-resolution-timeout) and retries before this error surfaces, so by the time you see it the chain has stalled on repeated attempts.

```text theme={null}
API Error: Could not load AWS credentials · AWS default-chain credential resolve timed out. Check or refresh your AWS credentials and try again.
```

Common causes are a `credential_process` command in your AWS profile that waits for input it can't receive, and a container or VM whose instance metadata service (IMDS) never answers the chain's probe.

Before v2.1.267, the message read `API Error: AWS default-chain credential resolve timed out`.
Before v2.1.207, a stalled chain left the request waiting indefinitely instead of failing.

**What to do:**

* Run `aws sts get-caller-identity` in the same shell with the same `AWS_PROFILE`. If it also hangs, fix the profile; a `credential_process` command that prompts interactively is a common cause.
* Complete the sign-in step before starting Claude Code, for example `aws sso login --profile myprofile`, so the chain resolves from the local SSO cache instead of waiting on a browser flow
* If your chain runs an interactive sign-in that legitimately needs more than 60 seconds, such as SSO with MFA through a wrapper like `aws-vault`, raise the limit in milliseconds with [`CLAUDE_CODE_AWS_CHAIN_RESOLVE_TIMEOUT_MS`](https://code.claude.com/docs/en/env-vars)

### Bedrock setup verification timed out waiting for AWS

A call to AWS during the [Bedrock setup wizard](https://code.claude.com/docs/en/amazon-bedrock#sign-in-with-bedrock)'s credential verification, such as the credential lookup or the identity check, didn't finish within the 60-second limit. The wizard stops waiting and fails the verification step:

```text theme={null}
Timed out after 60s waiting for AWS. Check your network and proxy settings; if a credential helper needs longer to prompt you, raise CLAUDE_CODE_AWS_CHAIN_RESOLVE_TIMEOUT_MS.
```

The number reflects your limit: 60 seconds by default, or the value you set in [`CLAUDE_CODE_AWS_CHAIN_RESOLVE_TIMEOUT_MS`](https://code.claude.com/docs/en/env-vars).

Common causes are a network or proxy that stalls requests to AWS, including the SSO token refresh, and a credential helper still waiting for input you can't see. Raise the limit only when the helper legitimately needs more time.

A single stalled request to AWS can also fail on its own per-request timeout, which shows a shorter message on the same step:

```text theme={null}
A request to AWS timed out. Check your network and proxy settings, then try again.
```

When the same timeouts occur on the model pin step, the wizard marks a model as `unreachable` instead of showing either message.

**What to do:**

* Run `aws sts get-caller-identity` in the same shell. If it also hangs, the stall is outside Claude Code, in your network, your proxy, or the credential helper in your AWS profile; fix that first.
* Complete any interactive sign-in before opening the wizard, for example `aws sso login --profile myprofile`
* If a credential helper in your AWS profile legitimately needs longer than 60 seconds to prompt you, raise the limit in milliseconds with [`CLAUDE_CODE_AWS_CHAIN_RESOLVE_TIMEOUT_MS`](https://code.claude.com/docs/en/env-vars)

### Cloud gateway session expired

You signed in through a [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway), and the gateway session saved on this machine has expired and couldn't be renewed, or the gateway no longer accepts it, for example after the gateway's [JWT secret is replaced](https://code.claude.com/docs/en/claude-apps-gateway-deploy#jwt-secret-rotation). If you see this line when you start `claude` interactively, the session has opened signed out of the gateway:

```text theme={null}
Cloud gateway session expired — run /login to reconnect.
```

The same line can appear mid-session when the gateway credential expires and Claude Code can't renew it.

In a [non-interactive](https://code.claude.com/docs/en/headless) run, a background or other unattended session, or a `claude` subcommand other than `claude auth`, Claude Code exits with this message instead when the gateway no longer accepts the session:

```text theme={null}
Cloud gateway <url> no longer accepts this session. Start `claude` and sign in again with /login.
```

**What to do:**

* Run `/login` in the session and complete the browser sign-in
* For a non-interactive launch, start `claude` in the same environment, run `/login`, then rerun your command
