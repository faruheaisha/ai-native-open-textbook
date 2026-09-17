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
pageSha256: "d7ae7ce52b8c2df1eb17ecfdb99fc520807fe6b6d53f818e668d02a1ac6b75db"
contentMode: "local-full"
zh: ""
---

## Sandbox settings

Isolate the commands Claude runs from your filesystem, your network, and your credentials. For how sandboxing works and platform requirements, see [Sandboxing](https://code.claude.com/docs/en/sandboxing).

### `sandbox`

Isolate the Bash commands Claude runs from your filesystem and network with [sandboxing](https://code.claude.com/docs/en/sandboxing). Turn the sandbox on with `enabled`, then narrow or widen what sandboxed commands can touch with the `filesystem`, `network`, and `credentials` sub-objects. The sandbox runs on macOS, Linux, and WSL2.

* **Scope**: [`Any file`](#scopes)
* **Type**: object with `enabled`, `failIfUnavailable`, `autoAllowBashIfSandboxed`, `excludedCommands`, `allowUnsandboxedCommands`, `enableWeakerNestedSandbox`, `enableWeakerNetworkIsolation`, `allowAppleEvents`, `bwrapPath`, `socatPath`, `ignoreViolations`, and `ripgrep`, plus the `filesystem`, `network`, and `credentials` objects
* **Default**: unset, so Claude Code runs commands without a sandbox

This turns the sandbox on, skips permission prompts for sandboxed commands, runs `docker` outside the sandbox, opens two extra write paths, hides your AWS credentials file, and pre-allows GitHub and npm:

```json settings.json theme={null}
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "excludedCommands": ["docker *"],
    "filesystem": {
      "allowWrite": ["/tmp/build", "~/.kube"],
      "denyRead": ["~/.aws/credentials"]
    },
    "network": {
      "allowedDomains": ["github.com", "*.npmjs.org"]
    }
  }
}
```

Claude Code takes a Boolean key's value from the highest-precedence settings scope that sets it, so a managed `enabled` or `failIfUnavailable` overrides anything a developer sets. It merges array keys across every settings scope the session loads, so a developer can append entries; see [Keep developers from widening the policy](https://code.claude.com/docs/en/sandboxing#keep-developers-from-widening-the-policy) for the managed-only locks. To require the sandbox for an organization, see [Enforce sandboxing with managed settings](https://code.claude.com/docs/en/sandboxing#enforce-sandboxing-with-managed-settings).

### `sandbox.enabled`

Turn on [sandboxing](https://code.claude.com/docs/en/sandboxing) for Bash commands. When you pick a mode in the `/sandbox` panel, Claude Code writes this key to `.claude/settings.local.json` for the current project; set it in `~/.claude/settings.json` to sandbox every project.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code sandboxes Bash commands
  * `false`: Bash commands run unsandboxed
* **Default**: `false`

```json settings.json theme={null}
{
  "sandbox": {
    "enabled": true
  }
}
```

On Linux and WSL2 the sandbox needs `bubblewrap` and `socat`; see [Set up Linux and WSL2](https://code.claude.com/docs/en/sandboxing#set-up-linux-and-wsl2). When the sandbox can't start, Claude Code shows a warning and runs commands unsandboxed unless you also set [`failIfUnavailable`](#sandbox-failifunavailable).

### `sandbox.failIfUnavailable`

Make Claude Code exit with an error at startup when `sandbox.enabled` is `true` but the sandbox can't start, because a dependency is missing or the platform is unsupported. Without it, Claude Code shows a warning and runs commands unsandboxed. Use it in managed settings when your organization requires sandboxing as a hard gate.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code exits with an error at startup when `sandbox.enabled` is `true` but the sandbox can't start
  * `false`: Claude Code shows a warning and runs commands unsandboxed
* **Default**: `false`

This makes every managed machine sandbox commands or refuse to start:

```json managed-settings.json theme={null}
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true
  }
}
```

See [Enforce sandboxing with managed settings](https://code.claude.com/docs/en/sandboxing#enforce-sandboxing-with-managed-settings).

### `sandbox.autoAllowBashIfSandboxed`

Let Claude Code run sandboxed Bash commands without a permission prompt. Commands that can't run in the sandbox still go through the regular permission flow, and `deny` rules and content-scoped `ask` rules such as `Bash(git push *)` still apply; a bare `Bash` ask rule is skipped for sandboxed commands. Set it to `false` to send sandboxed commands through the regular permission flow too, which the `/sandbox` **Mode** tab calls regular permissions mode.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code runs sandboxed Bash commands without a permission prompt, subject to `deny` rules and content-scoped `ask` rules; `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` turns auto-allow off
  * `false`: sandboxed commands go through the regular permission flow, so your allow rules and permission mode decide. The `/sandbox` **Mode** tab calls this regular permissions mode
* **Default**: `true`

This keeps the sandbox on and sends sandboxed commands through the regular permission flow:

```json settings.json theme={null}
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": false
  }
}
```

See [Sandbox modes](https://code.claude.com/docs/en/sandboxing#sandbox-modes) for what auto-allow mode still prompts on and how it behaves in plan mode.

### `sandbox.excludedCommands`

Name commands that Claude Code always runs outside the sandbox, such as tools that don't work under it. Each entry uses the same syntax as the content of a `Bash(...)` [permission rule](https://code.claude.com/docs/en/permissions#permission-rule-syntax): an exact command, a prefix such as `docker *`, or a wildcard pattern. When any part of a compound command matches an entry, Claude Code runs the whole command unsandboxed.

* **Scope**: [`Any file`](#scopes)
* **Type**: array of command patterns
* **Default**: unset, so no command is excluded

```json settings.json theme={null}
{
  "sandbox": {
    "excludedCommands": ["docker *"]
  }
}
```

Excluded commands still go through the regular permission flow. Exclusion is a convenience, not a security boundary: prefer [`filesystem.allowWrite`](#sandbox-filesystem-allowwrite) when a tool only needs to write somewhere specific. Claude Code merges entries across every settings scope the session loads, and there is no managed-only lock for this list, so keep a managed list narrow.

### `sandbox.allowUnsandboxedCommands`

Let Claude retry a command outside the sandbox with the `dangerouslyDisableSandbox` parameter after the sandbox blocks it. Set it to `false` so Claude Code ignores that parameter completely and every command Claude runs must be sandboxed or appear in [`excludedCommands`](#sandbox-excludedcommands). The `/sandbox` **Overrides** tab shows that state as **Strict sandbox mode**. Use `false` in managed settings for policies that require strict sandboxing.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude can retry a command outside the sandbox with the `dangerouslyDisableSandbox` parameter after the sandbox blocks it
  * `false`: Claude Code ignores that parameter, so every command Claude runs is sandboxed or appears in `excludedCommands`
* **Default**: `true`

This enforces strict sandbox mode for everyone the managed settings cover:

```json managed-settings.json theme={null}
{
  "sandbox": {
    "enabled": true,
    "allowUnsandboxedCommands": false
  }
}
```

An unsandboxed retry goes through the regular permission flow, with a prompt in Manual mode. See [The unsandboxed retry escape hatch](https://code.claude.com/docs/en/sandboxing#the-unsandboxed-retry-escape-hatch).

To see when commands you type yourself at the [`!` shell-mode prompt](https://code.claude.com/docs/en/interactive-mode#shell-mode-with-prefix) run sandboxed, see [strict sandbox mode](https://code.claude.com/docs/en/sandboxing#the-unsandboxed-retry-escape-hatch).

### `sandbox.filesystem`

Control which paths sandboxed commands can read and write. By default they can write to the working directory, the session temp directory, and directories you add with `--add-dir`, `/add-dir`, or `permissions.additionalDirectories`, and can read the rest of the filesystem, including credential files. Widen or narrow that with the four path lists, or switch the filesystem layer off with `disabled`. See [Filesystem isolation](https://code.claude.com/docs/en/sandboxing#filesystem-isolation) for the default boundaries.

* **Scope**: [`Any file`](#scopes)
* **Type**: object with `allowWrite`, `denyWrite`, `denyRead`, and `allowRead` arrays, plus the `allowManagedReadPathsOnly` and `disabled` Booleans
* **Default**: unset, so the default read and write boundaries apply

This lets sandboxed commands write to a build directory and your kubeconfig, and hides your AWS credentials file:

```json settings.json theme={null}
{
  "sandbox": {
    "filesystem": {
      "allowWrite": ["/tmp/build", "~/.kube"],
      "denyRead": ["~/.aws/credentials"]
    }
  }
}
```

Claude Code enforces these lists at the OS sandbox boundary, so they apply to every subprocess a sandboxed command starts, such as `kubectl`, `terraform`, or `npm`, not only to Claude's file tools. Claude Code adds your [permission rules](https://code.claude.com/docs/en/sandboxing#permission-rules) to the same lists: `Edit` allow and deny rules to `allowWrite` and `denyWrite`, `Read` deny rules to `denyRead`, and `WebFetch(domain:...)` allow and deny rules to the [`network`](#sandbox-network) domain lists.

Unless a managed-only lock is set, Claude Code merges every list across the settings files the session loads. [`allowManagedReadPathsOnly`](#sandbox-filesystem-allowmanagedreadpathsonly) limits `allowRead` to entries from managed settings, and [`allowManagedDomainsOnly`](#sandbox-network-allowmanageddomainsonly) does the same for allowed domains.

[Configure sandboxing](https://code.claude.com/docs/en/sandboxing#configure-sandboxing) covers sources you exclude with `--setting-sources`. When you edit a list during a session, Claude Code [applies the change to the running session](https://code.claude.com/docs/en/settings#when-edits-take-effect).

#### Sandbox path prefixes

Paths in `allowWrite`, `denyWrite`, `denyRead`, `allowRead`, and [`credentials.files`](#sandbox-credentials-files) resolve by their prefix:

| Prefix            | Meaning                                                                                | Example                                                                   |
| :---------------- | :------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| `/`               | Absolute path from filesystem root                                                     | `/tmp/build` stays `/tmp/build`                                           |
| `~/`              | Relative to home directory                                                             | `~/.kube` becomes `$HOME/.kube`                                           |
