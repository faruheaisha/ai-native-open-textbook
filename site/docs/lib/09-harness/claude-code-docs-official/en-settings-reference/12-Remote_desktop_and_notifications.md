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
pageSha256: "283643ad43bc6891a5223c32cb4b534c262c3c33d7f4d433a9ac8594b2ed9623"
contentMode: "local-full"
zh: ""
---

## Remote, desktop, and notifications

Configure Remote Control, cloud environments, the desktop app, and the notifications Claude Code sends when it needs you. See [Remote Control](https://code.claude.com/docs/en/remote-control).

### `agentPushNotifEnabled`

Allow Claude to send a push notification to your phone when it decides one is worth sending, for example when a long task finishes. Claude Code syncs this choice to your account, and pushes arrive while [Remote Control](https://code.claude.com/docs/en/remote-control) is connected. Appears in `/config` as **Push when Claude decides**.

* **Scope**: [`Any file`](#scopes). Claude Code also reads a value left in `~/.claude.json` by older versions.
* **Type**: Boolean
  * `true`: Claude can send a push notification to your phone when it decides one is worth sending
  * `false`: Claude doesn't send those notifications
* **Default**: `false`

```json settings.json theme={null}
{
  "agentPushNotifEnabled": true
}
```

See [Mobile push notifications](https://code.claude.com/docs/en/remote-control#mobile-push-notifications).

### `awaySummaryEnabled`

Show a one-line session recap when you return to the terminal after a few minutes away. Set it to `false`, or turn off **Session recap** in `/config`, to stop the recap.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: you see a one-line session recap when you return after a few minutes away
  * `false`: Claude Code shows no recap
* **Default**: unset, so the recap is on
* **Per-session overrides**: [`CLAUDE_CODE_ENABLE_AWAY_SUMMARY`](https://code.claude.com/docs/en/env-vars) takes precedence over this key for one session, in either direction

```json settings.json theme={null}
{
  "awaySummaryEnabled": false
}
```

Claude Code never shows the recap in non-interactive mode.

### `disableArtifact`

  Deprecated, and replaced by [`enableArtifact`](#enableartifact). Claude Code still honors `disableArtifact: true` as equivalent to `enableArtifact: false`, and ignores `disableArtifact: false`.

Use [`enableArtifact`](#enableartifact) instead to turn off the [Artifact](https://code.claude.com/docs/en/artifacts) tool, which publishes session output as a private web page on claude.ai. When you turn the **Artifacts** row off in `/config`, Claude Code writes `enableArtifact` to your user settings and clears this key.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code turns the Artifact tool off for every session the file applies to, and no other file turns it back on. Before v2.1.242, a higher-precedence file could override a lower file's `true` rather than the key acting as a lock
  * `false`: ignored; to leave the tool on, remove the key
* **Default**: unset, so the tool follows your account's [availability](https://code.claude.com/docs/en/artifacts#availability)
* **Per-session overrides**: [`CLAUDE_CODE_DISABLE_ARTIFACT`](https://code.claude.com/docs/en/env-vars) set to `1` turns the tool off for one session

```json settings.json theme={null}
{
  "disableArtifact": true
}
```

[Disable artifacts](https://code.claude.com/docs/en/artifacts#disable-artifacts) lists every way to turn the tool off.

### `disableDeepLinkRegistration`

Stop Claude Code from registering the `claude-cli://` protocol handler with the operating system, which it otherwise does after you send the first prompt of an interactive session. [Deep links](https://code.claude.com/docs/en/deep-links) let external tools open a Claude Code session with a pre-filled prompt. Set this in environments where protocol handler registration is restricted or managed separately.

* **Scope**: [`Any file`](#scopes)
* **Type**: the string `"disable"`
* **Default**: unset, so Claude Code registers the handler

```json settings.json theme={null}
{
  "disableDeepLinkRegistration": "disable"
}
```

### `disableDesktopLocalSessions`

Turn off Code sessions that run on the device in the [desktop app](https://code.claude.com/docs/en/desktop#local-sessions-on-managed-devices), for deployments where developers should work on remote machines over SSH. In the Code tab, the **Local** environment stays in the environment dropdown but is grayed out and can't be selected, with a tooltip saying your organization turned it off; on Windows the WSL entry is grayed out the same way, though whether WSL sessions run on a managed device at all is [governed separately](https://code.claude.com/docs/en/admin-setup#wsl-sessions-in-claude-code-desktop). New sessions default to the first [SSH connection](https://code.claude.com/docs/en/desktop#ssh-sessions) if one is configured, and the app refuses to start or resume a session on the device, including an SSH connection back to the same machine. SSH sessions to other hosts and cloud sessions are unaffected. The desktop app reads this key; the terminal CLI ignores it. Requires Claude Desktop v1.37937.0 or later.

* **Scope**: [`Managed`](#scopes)
* **Type**: Boolean; only the JSON Boolean `true` takes effect
  * `true`: the desktop app offers no on-device Code sessions; existing local sessions stay listed but can't continue
  * `false`: local sessions stay available
* **Default**: unset, so local sessions are available

```json managed-settings.json theme={null}
{
  "disableDesktopLocalSessions": true
}
```

The desktop app ignores any other value, and a value that isn't a Boolean, such as the string `"true"` or `1`, also logs a warning. Pair it with [`sshConfigs`](#sshconfigs) so users land on a working connection, and with [`sshHostAllowlist`](#sshhostallowlist) to limit which hosts they can reach. See [Local sessions on managed devices](https://code.claude.com/docs/en/desktop#local-sessions-on-managed-devices).

Claude Desktop supplies Code sessions with policy derived from your desktop configuration, for example the egress allowlist, filesystem sandbox, and MCP restrictions in third-party deployments. Claude Code ignores those parent settings whenever an [admin source](https://code.claude.com/docs/en/managed-settings#how-claude-code-combines-managed-sources) is present: server-managed settings, an MDM or OS-level policy, or a managed settings file. Deploying this key through one of those on a device that had none before, as in third-party deployments, therefore stops the desktop-derived policies from applying. [Let an embedding host add policy](https://code.claude.com/docs/en/managed-settings#let-an-embedding-host-add-policy) covers when parent settings can still merge; this holds for any key you deploy that way, not only this one.

### `disableRemoteControl`

Turn off [Remote Control](https://code.claude.com/docs/en/remote-control): Claude Code then refuses `claude remote-control`, the `--remote-control` flag, auto-start, and the in-session toggle, and reports that your organization's policy disabled it. Place it in [managed settings](https://code.claude.com/docs/en/managed-settings) for per-device MDM enforcement.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code refuses `claude remote-control`, the `--remote-control` flag, auto-start, and the in-session toggle
  * `false`: Remote Control stays available
* **Default**: `false`

```json settings.json theme={null}
{
  "disableRemoteControl": true
}
```

### `enableArtifact`

Turn off the [Artifact](https://code.claude.com/docs/en/artifacts) tool, which publishes session output as a private web page on claude.ai. When you turn the **Artifacts** row off in `/config`, Claude Code writes this key to your user settings, so you don't usually edit it by hand. Requires Claude Code v2.1.196 or later.

* **Scope**: [`Any file`](#scopes). Every file can turn the tool off, and none can turn it back on.
* **Type**: Boolean
  * `false`: Claude Code turns the Artifact tool off for every session the file applies to
  * `true`: the same as leaving the key unset, because it never overrides a `false` from another file, from [`CLAUDE_CODE_DISABLE_ARTIFACT`](https://code.claude.com/docs/en/env-vars), or from your organization's [admin setting](https://code.claude.com/docs/en/artifacts#manage-artifacts-for-your-organization)
* **Default**: unset, so the tool follows your account's [availability](https://code.claude.com/docs/en/artifacts#availability)

```json settings.json theme={null}
{
  "enableArtifact": false
}
```

While a source other than your own user settings keeps the tool turned off, Claude Code hides the **Artifacts** row in `/config`, because turning it on there wouldn't change anything. [Disable artifacts](https://code.claude.com/docs/en/artifacts#disable-artifacts) lists every way to turn the tool off. Before v2.1.242, Claude Code ignored this key in project and local settings, and a file higher in the [precedence stack](https://code.claude.com/docs/en/settings#settings-precedence) could turn the tool back on over a lower file's off.

### `inputNeededNotifEnabled`

Get a push notification on your phone when a permission prompt or question is waiting for your input. Claude Code sends these only while [Remote Control](https://code.claude.com/docs/en/remote-control) is connected. Appears in `/config` as **Push when actions required**.

* **Scope**: [`Any file`](#scopes). Claude Code also reads a value left in `~/.claude.json` by older versions.
* **Type**: Boolean
  * `true`: you get a push notification on your phone when a permission prompt or question is waiting, while Remote Control is connected
  * `false`: Claude Code sends no such notifications
* **Default**: `false`

```json settings.json theme={null}
{
  "inputNeededNotifEnabled": true
}
```

See [Mobile push notifications](https://code.claude.com/docs/en/remote-control#mobile-push-notifications).

### `preferredNotifChannel`

Choose how Claude Code notifies you when a task completes or a permission prompt is waiting. Appears in `/config` as **Local notifications**.

* **Scope**: [`Any file`](#scopes). Claude Code also reads a value left in `~/.claude.json` by older versions.
* **Type**: string, one of:
  * `"auto"`: Claude Code sends a desktop notification in iTerm2, Ghostty, and Kitty, rings the bell in Terminal.app only when its audible bell is off, and does nothing elsewhere
  * `"terminal_bell"`: Claude Code rings the bell character in any terminal
  * `"iterm2"`: Claude Code sends an iTerm2 desktop notification
  * `"iterm2_with_bell"`: Claude Code sends an iTerm2 desktop notification and rings the bell
  * `"kitty"`: Claude Code sends a Kitty desktop notification
  * `"ghostty"`: Claude Code sends a Ghostty desktop notification
  * `"notifications_disabled"`: Claude Code sends no notification
* **Default**: `"auto"`

```json settings.json theme={null}
{
  "preferredNotifChannel": "terminal_bell"
}
```

With `"auto"`, Claude Code sends a desktop notification in iTerm2, Ghostty, and Kitty. In Terminal.app it rings the bell character only when you have turned Terminal's audible bell off, and in other terminals it does nothing. Set `"terminal_bell"` to ring the bell character in any terminal. See [Get a terminal bell or notification](https://code.claude.com/docs/en/terminal-config#get-a-terminal-bell-or-notification).

### `remote.defaultEnvironmentId`

Pick the default [cloud environment](https://code.claude.com/docs/en/cloud-environments) for cloud sessions you create from the CLI, such as with `claude --cloud`. Claude Code writes this key to your user settings when you pick an environment with [`/remote-env`](https://code.claude.com/docs/en/cloud-environments#select-an-environment-from-the-cli).

* **Scope**: [`Any file`](#scopes). For a self-hosted environment ID, user or managed settings, or the `--settings` flag only.
* **Type**: string, an environment ID such as `env_...` or `ccpool_...`
* **Default**: unset, so Claude Code uses the Anthropic-hosted environment when your list has one, and otherwise the first environment in your list that isn't a [Remote Control bridge environment](https://code.claude.com/docs/en/cloud-environments#the-default-environment), or the first environment when every one is a bridge environment
* **Per-session overrides**: `--environment` takes precedence over this key for the one cloud session it creates

```json settings.json theme={null}
{
  "remote": {
    "defaultEnvironmentId": "env_0123abcd"
  }
}
```

An Anthropic-hosted environment ID, which starts with `env_`, follows the standard settings precedence, so a value in a repository's project settings overrides your user-level pick. A [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments) ID, which starts with `ccpool_`, is honored only from user settings, managed settings, and the `--settings` flag; Claude Code ignores one in a repository's project or local settings, and `/remote-env` shows which value it ignored, so a checked-in file can't steer sessions onto a self-hosted environment you didn't choose.

### `remoteControlAtStartup`

Connect [Remote Control](https://code.claude.com/docs/en/remote-control) automatically when each interactive session starts, instead of waiting for `/remote-control`. Set it to `true` to turn auto-connect on, `false` to turn it off. Appears in `/config` as **Enable Remote Control for all sessions**.

* **Scope**: [`Any file`](#scopes). Claude Code also reads a value left in `~/.claude.json` by older versions.
* **Type**: Boolean
  * `true`: Claude Code connects Remote Control automatically when each interactive session starts
  * `false`: Claude Code waits for `/remote-control`
* **Default**: unset, so auto-connect follows your organization's admin default when one is set, and otherwise Claude Code's current default
* **Per-session overrides**: `--remote-control` turns Remote Control on for one session even when this key is `false`, and no flag turns it off for one session

```json settings.json theme={null}
{
  "remoteControlAtStartup": true
}
```

Claude Code ignores a `true` from project or local settings, so a repository can turn auto-connect off for its checkout but can't turn it on. For the full per-scope behavior, see [Enable Remote Control for all sessions](https://code.claude.com/docs/en/remote-control#enable-remote-control-for-all-sessions) and the [security keys where the stricter value applies](https://code.claude.com/docs/en/settings#security-keys-where-the-stricter-value-applies).

### `sshConfigs`

Add SSH connections to the [Desktop](https://code.claude.com/docs/en/desktop#pre-configure-ssh-connections-for-your-team) environment dropdown. Administrators use it to distribute shared connections to a team. Connections you define in managed settings show as managed, so users can select them but can't edit or delete them in the app.

* **Scope**: [`User or managed`](#scopes). The desktop app reads this key.
* **Type**: array of objects, each with required `id`, `name`, and `sshHost` and optional `sshPort` and `sshIdentityFile`
* **Default**: unset

This example adds one connection named `Dev VM` that connects to `user@dev.example.com`:

```json settings.json theme={null}
{
  "sshConfigs": [
    {
      "id": "dev-vm",
      "name": "Dev VM",
      "sshHost": "user@dev.example.com"
    }
  ]
}
```

### `sshHostAllowlist`

Limit the hosts a [Desktop SSH session](https://code.claude.com/docs/en/desktop#restrict-which-ssh-hosts-users-can-connect-to) can connect to. Only the Desktop app reads this key; the CLI doesn't. Patterns are case-insensitive: `*` matches any host, `*.example.com` matches `example.com` and every subdomain, and anything else is an exact match against the hostname after `~/.ssh/config` resolution. An empty array turns SSH sessions off.

* **Scope**: [`Managed`](#scopes)
* **Type**: array of hostname patterns
* **Default**: unset, so any host is allowed

This example allows `devboxes.example.com` and its subdomains, plus the exact host `bastion.example.com`:

```json managed-settings.json theme={null}
{
  "sshHostAllowlist": ["*.devboxes.example.com", "bastion.example.com"]
}
```

&lt;span id="authentication-and-login" />
