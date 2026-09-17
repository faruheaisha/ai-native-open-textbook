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
sourceRel: "en/desktop.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/desktop.md"
sourceSha256: "3c585962a30144144f6f07cddbab26d1e8ab8f6272e881441abe0a1401514a09"
pageSha256: "4d69ee1f59d108e6aadf83f2c0c44fbd14a07cd4066e578f507b9270413c2ce6"
contentMode: "local-full"
zh: ""
---

## Environment configuration

The environment you pick when [starting a session](#start-a-session) determines where Claude executes and how you connect:

* **Local**: runs on your machine with direct access to your files
* **Cloud**: runs on Anthropic-managed infrastructure by default. Sessions continue even if you close the app.
* **SSH**: runs on a remote machine you connect to over SSH, such as your own servers, cloud VMs, or dev containers
* **WSL** (Windows): runs inside a [WSL 2 distribution](https://code.claude.com/docs/en/desktop-wsl) on your machine, using its Linux toolchain and native paths

### Local sessions

The desktop app does not always inherit your full shell environment. On macOS, when you launch the app from the Dock or Finder, it reads your shell profile, such as `~/.zshrc` or `~/.bashrc`, to extract `PATH` and a fixed set of Claude Code variables, but other variables you export there are not picked up. On Windows, the app inherits user and system environment variables but does not read PowerShell profiles.

To set environment variables for local sessions and dev servers on any platform, open the environment dropdown in the prompt box, hover over **Local**, and click the gear icon to open the local environment editor. Variables you save here are stored encrypted on your machine and apply to every local session and preview server you start. You can also add variables to the `env` key in your `~/.claude/settings.json` file, though these reach Claude sessions only and not dev servers. See [environment variables](https://code.claude.com/docs/en/env-vars) for the full list of supported variables.

[Extended thinking](https://code.claude.com/docs/en/model-config#extended-thinking) is enabled by default, which improves performance on complex reasoning tasks but uses additional tokens. On the Anthropic API, set `MAX_THINKING_TOKENS` to `0` in the local environment editor to turn thinking off; this has no effect on Fable models, which always use extended thinking. With thinking turned off on the Anthropic API, Claude Code sends effort `high` instead of a higher level to models it knows [don't accept that combination](https://code.claude.com/docs/en/errors#effort-isnt-available-with-thinking-turned-off), such as Opus 5.

On models with [adaptive reasoning](https://code.claude.com/docs/en/model-config#adjust-effort-level), `MAX_THINKING_TOKENS` values other than `0` are ignored because adaptive reasoning controls thinking depth instead. On Opus 4.6 and Sonnet 4.6, set `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` to `1` to use a fixed thinking budget; Fable models, Sonnet 5, and Opus 4.7 and later always use adaptive reasoning and have no fixed-budget mode.

#### Local sessions on managed devices

Your administrator can turn off local sessions with the [`disableDesktopLocalSessions` managed setting](#managed-settings). When they have, **Local** stays in the environment dropdown but is grayed out and can't be selected, with a tooltip saying your organization turned it off, and on Windows the [WSL](https://code.claude.com/docs/en/desktop-wsl) entry, whose availability on managed devices is [governed separately](https://code.claude.com/docs/en/admin-setup#wsl-sessions-in-claude-code-desktop), is grayed out the same way. New sessions default to the first SSH connection if one is configured, and Desktop shows a message that local sessions aren't available on this device if you try to continue an existing one. Choose an [SSH](#ssh-sessions) or [cloud](#cloud-sessions) environment instead, or contact your IT team.

### Cloud sessions

Cloud sessions continue in the background even if you close the app. Usage counts toward your [subscription plan limits](https://code.claude.com/docs/en/costs) with no separate compute charges.

You can create custom cloud environments with different network access levels and environment variables. When you start a cloud session, open the environment dropdown in the prompt box to manage them:

* **Add an environment**: select **Add cloud environment**
* **Edit or archive one of your own environments**: hover over it and click the gear icon

See [Configure cloud environments](https://code.claude.com/docs/en/cloud-environments) for details on configuring network access and environment variables.

### SSH sessions

SSH sessions let you run Claude Code on a remote machine while using the desktop app as your interface. This is useful for working with codebases that live on cloud VMs, dev containers, or servers with specific hardware or dependencies.

To add an SSH connection, click the environment dropdown before starting a session and select **+ Add SSH connection**. The dialog asks for:

* **Name**: a friendly label for this connection
* **SSH Host**: `user@hostname` or a host defined in `~/.ssh/config`
* **SSH Port**: defaults to 22 if left empty, or uses the port from your SSH config
* **Identity File**: path to your private key, such as `~/.ssh/id_rsa`. Leave empty to use the default key or your SSH config.

Once added, the connection appears in the environment dropdown. Select it to start a session on that machine. Claude runs on the remote machine with access to its files and tools.

The remote machine must run Linux or macOS. Desktop installs Claude Code on the remote machine automatically the first time you connect. Once connected, SSH sessions support permission modes, connectors, plugins, and MCP servers.

#### Pre-configure SSH connections for your team

Administrators can distribute SSH connections to team members by adding `sshConfigs` to a [managed settings](https://code.claude.com/docs/en/managed-settings) file. Connections defined this way appear in each user's environment dropdown automatically and are shown as managed, so users can select them but cannot edit or delete them in the app.

The following example pre-configures a single connection:

```json theme={null}
{
  "sshConfigs": [
    {
      "id": "shared-dev-vm",
      "name": "Shared Dev VM",
      "sshHost": "user@dev.example.com",
      "sshPort": 22,
      "sshIdentityFile": "~/.ssh/id_ed25519"
    }
  ]
}
```

Each entry requires `id`, `name`, and `sshHost`. The `sshPort` and `sshIdentityFile` fields are optional. Users can also add `sshConfigs` to their own `~/.claude/settings.json`, which is where connections added through the dialog are stored.

#### Restrict which SSH hosts users can connect to

Administrators can limit Desktop's SSH sessions to an approved set of hosts by adding `sshHostAllowlist` to a [managed settings](https://code.claude.com/docs/en/managed-settings) file. When set, users can only connect to hosts whose resolved hostname matches one of the patterns. Set it to an empty array to disable SSH sessions entirely.

The following example allows connections to any host under `devboxes.example.com` and to a single named bastion host:

```json theme={null}
{
  "sshHostAllowlist": ["*.devboxes.example.com", "bastion.example.com"]
}
```

Patterns are case-insensitive. `*` matches any host, and `*.example.com` matches `example.com` and any subdomain. Anything else is an exact match. The check runs against the hostname after `~/.ssh/config` resolution via `ssh -G`, so `Host` aliases and `ProxyCommand`/`ProxyJump` entries are permitted as long as the resolved `HostName` matches.

`sshHostAllowlist` is read from managed settings only; values in user or project settings are ignored. Only the Claude Desktop app honors this setting; the Claude Code CLI and IDE extensions do not read it, and it does not restrict `ssh` commands run through the Bash tool. It governs which hosts the Desktop app connects to, not network egress, so pair it with your organization's network or zero-trust controls if you need a hard boundary.
