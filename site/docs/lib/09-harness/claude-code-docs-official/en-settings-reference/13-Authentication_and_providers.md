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
pageSha256: "b71bd7eee7239128ed43820dc904e61050f928f4c6ec6ffc8694dc2244a61379"
contentMode: "local-full"
zh: ""
---

## Authentication and providers

Supply credentials through helper scripts and, for organizations, force a login method or organization. See [Authentication](https://code.claude.com/docs/en/authentication).

### `apiKeyHelper`

Run your own command to produce the credential Claude Code sends with model requests. Claude Code runs the command through the system shell, `/bin/sh` on macOS and Linux and `cmd` on Windows, and sends its output as both the `X-Api-Key` and `Authorization: Bearer` headers. Use it for dynamic or rotating credentials, such as short-lived tokens fetched from a vault.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, a shell command line
* **Default**: unset, so Claude Code doesn't run a helper

```json settings.json theme={null}
{
  "apiKeyHelper": "/bin/generate_temp_api_key.sh"
}
```

Claude Code caches the value and reruns the command in these cases:

* After the cache lifetime, five minutes by default or the interval you set with [`CLAUDE_CODE_API_KEY_HELPER_TTL_MS`](https://code.claude.com/docs/en/env-vars).
* When a request to the Anthropic API, directly or through an [LLM gateway](https://code.claude.com/docs/en/llm-gateway), fails with `401` or `403`.
* Before sending a request to the Anthropic API, directly or through an LLM gateway, when the cached output is a JWT that expired after the helper produced it. Requires Claude Code v2.1.246 or later.

The last two cases apply only when the helper's output is the credential Claude Code sends and `ANTHROPIC_AUTH_TOKEN` isn't set.

In interactive sessions, when the command comes from project or local settings, Claude Code doesn't run it until you accept the workspace trust prompt. See [Credential management](https://code.claude.com/docs/en/authentication#credential-management).

### `awsAuthRefresh`

Run your own command, such as `aws sso login`, to refresh the credentials in your `.aws` directory when the ones Claude Code has for [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock) stop working. Claude Code checks the current credentials against STS first and runs the command only when that check fails, then reads the refreshed `.aws` directory.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, a shell command line
* **Default**: unset, so Claude Code doesn't refresh AWS credentials for you

```json settings.json theme={null}
{
  "awsAuthRefresh": "aws sso login --profile myprofile"
}
```

Use this key when your refresh flow writes to `.aws`; use [`awsCredentialExport`](#awscredentialexport) when it prints credentials instead. See [advanced credential configuration](https://code.claude.com/docs/en/amazon-bedrock#advanced-credential-configuration).

### `awsCredentialExport`

Run your own command that prints AWS credentials as JSON, so Claude Code can call [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock) with credentials that don't live in your `.aws` directory. Claude Code accepts the `aws sts` output shape and the flat `aws configure export-credentials` shape, and scopes the credentials to its own Bedrock client, so the shell commands Claude runs still see your ambient credentials.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, a shell command line
* **Default**: unset, so Claude Code uses the ambient AWS credential chain

```json settings.json theme={null}
{
  "awsCredentialExport": "/bin/generate_aws_grant.sh"
}
```

Unlike [`awsAuthRefresh`](#awsauthrefresh), Claude Code always runs this command when it's set, without checking the ambient credentials first. See [advanced credential configuration](https://code.claude.com/docs/en/amazon-bedrock#advanced-credential-configuration).

### `forceLoginMethod`

Restrict which kind of account people can log in with. Set `"claudeai"` to allow only claude.ai accounts, `"console"` to allow only Claude Console accounts, or `"gateway"` to send people to a [cloud gateway](https://code.claude.com/docs/en/claude-apps-gateway) instead of a first-party login. Administrators set it in managed settings and pair it with [`forceLoginOrgUUID`](#forceloginorguuid) to keep developers' claude.ai logins inside one organization. If you set it to `"claudeai"` or `"console"` in any settings file, Claude Code also stops offering the [keyless Console sign-in](https://code.claude.com/docs/en/authentication#sign-in-without-an-api-key) in the sessions that file applies to.

* **Scope**: [`Any file`](#scopes). Claude Code honors `"gateway"` only from a managed source on the machine: `managed-settings.json`, the macOS plist or Windows HKLM registry, or a policy helper. It treats `"gateway"` as unset in user, project, local, HKCU, and server-managed settings, the same rule as [`forceLoginGatewayUrl`](#forcelogingatewayurl).
* **Type**: string, one of:
  * `"claudeai"`: only claude.ai accounts can log in
  * `"console"`: only Claude Console accounts can log in
  * `"gateway"`: Claude Code sends people to a cloud gateway instead of a first-party login
* **Default**: unset, so people pick a login method

```json settings.json theme={null}
{
  "forceLoginMethod": "claudeai"
}
```

Every first-party login path applies the restriction, including the [VS Code extension](https://code.claude.com/docs/en/vs-code), the Agent SDK, `claude setup-token`, and `/install-github-app`, except the terminal's interactive login screen, reached by `/login` or first-run onboarding, which pre-selects the method without enforcing it. Before v2.1.212, only terminal logins applied it. See [Restrict login to your organization](https://code.claude.com/docs/en/authentication#restrict-login-to-your-organization) for how each login path, environment credentials, and third-party providers are handled.

When a managed source on the machine sets `"gateway"`, Claude Code doesn't use a leftover login, API key, or `apiKeyHelper` credential. See [Administrator policy requires a Cloud gateway sign-in](https://code.claude.com/docs/en/errors#administrator-policy-requires-a-cloud-gateway-sign-in) for the message each one produces. If you select a cloud provider through `CLAUDE_CODE_USE_BEDROCK` or a similar environment variable, the session doesn't need the gateway sign-in. Before v2.1.261, Claude Code used a leftover login on these machines.

### `forceLoginGatewayUrl`

Set the gateway URL the `/login` Cloud gateway screen connects to, so people reach your [cloud gateway](https://code.claude.com/docs/en/claude-apps-gateway) without typing its address. The screen has no URL field: with this key set, it shows your gateway URL and connects when the person presses Enter; without it, it tells them to contact their IT administrator.

Either this key or `forceLoginMethod: "gateway"` makes the machine gateway-only, so `/login` opens on the Cloud gateway screen with no login-method picker. See [Administrator policy requires a Cloud gateway sign-in](https://code.claude.com/docs/en/errors#administrator-policy-requires-a-cloud-gateway-sign-in) for what happens to a leftover first-party login or API key. Set both keys so the screen connects instead of showing an error.

* **Scope**: [`Managed`](#scopes). Read only from a source on the machine: `managed-settings.json`, the macOS plist or Windows HKLM registry, or a policy helper. Claude Code ignores it in HKCU and server-managed settings.
* **Type**: string, a full URL including the scheme
* **Default**: unset, so the Cloud gateway screen shows an error telling people to contact their IT administrator

```json managed-settings.json theme={null}
{
  "forceLoginGatewayUrl": "https://claude-gateway.example.com"
}
```

If the value isn't a valid URL, the sign-in screen reports it, and the rest of the managed settings file still applies. See [Set the gateway URL](https://code.claude.com/docs/en/claude-apps-gateway#set-the-gateway-url).

### `forceLoginOrgUUID`

From a managed source, require claude.ai account logins to belong to one Anthropic organization, given as a single UUID, or to any of several organizations, given as an array. From any settings file, Claude Code also uses a single UUID to pre-select that organization during a claude.ai or Claude Console login, and pre-selects nothing for an array. If you set the key in any settings file, Claude Code also stops offering the [keyless Console sign-in](https://code.claude.com/docs/en/authentication#sign-in-without-an-api-key) in the sessions that file applies to and creates an API key instead.

* **Scope**: [`Any file`](#scopes). Only a managed source enforces the restriction; a single UUID in any other settings file pre-selects the organization during login without restricting it.
* **Type**: string, one UUID, or array of strings, several UUIDs
* **Default**: unset, so any organization can log in

This example accepts logins from either of two organizations without pre-selecting one:

```json managed-settings.json theme={null}
{
  "forceLoginOrgUUID": ["xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy"]
}
```

If a managed source sets an empty array, or a value Claude Code can't parse, Claude Code blocks every login with a misconfiguration message.

See [Restrict login to your organization](https://code.claude.com/docs/en/authentication#restrict-login-to-your-organization) for how Claude Code treats Claude Console logins, the other login paths, and environment credentials.

### `gcpAuthRefresh`

Run your own command to refresh Google Cloud Application Default Credentials when Claude Code finds they've expired or can't be loaded, so [Google Cloud's Agent Platform](https://code.claude.com/docs/en/google-vertex-ai) requests keep working without you re-authenticating by hand.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, a shell command line
* **Default**: unset, so Claude Code's credential error tells you to run `gcloud auth application-default login` yourself

```json settings.json theme={null}
{
  "gcpAuthRefresh": "gcloud auth application-default login"
}
```

See [advanced credential configuration](https://code.claude.com/docs/en/google-vertex-ai#advanced-credential-configuration).

### `otelHeadersHelper`

Run your own command to generate the headers Claude Code sends with OpenTelemetry exports, for backends whose tokens rotate. Claude Code runs it at startup and periodically after that, and expects a JSON object of string header values on stdout.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, an executable path or a shell command line
* **Default**: unset, so Claude Code adds no helper-generated headers

```json settings.json theme={null}
{
  "otelHeadersHelper": "/bin/generate_otel_headers.sh"
}
```

Set the refresh interval with [`CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS`](https://code.claude.com/docs/en/env-vars). See [Dynamic headers](https://code.claude.com/docs/en/monitoring-usage#dynamic-headers) for the script requirements and where Claude Code reports a failing helper.
