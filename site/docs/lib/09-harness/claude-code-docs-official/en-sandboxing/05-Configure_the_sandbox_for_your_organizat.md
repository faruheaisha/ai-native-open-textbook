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
sourceRel: "en/sandboxing.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/sandboxing.md"
sourceSha256: "9173fa7bfc40900080b167be86897899912ce55ff61ad1072f71a5eab69e80ce"
pageSha256: "92a503e919f81a836a0eaf6de623cf5a6359a51bc5bdf1df61672cbab88d4fc8"
contentMode: "local-full"
zh: ""
---

## Configure the sandbox for your organization

Administrators can require sandboxing for every user, keep developers from widening the policy, and route sandbox traffic through a corporate proxy.

### Enforce sandboxing with managed settings

To require the sandbox for every developer, deliver the `sandbox` keys through [managed settings](https://code.claude.com/docs/en/managed-settings#delivery-mechanisms), either as a file managed by your MDM or through [server-managed settings](https://code.claude.com/docs/en/server-managed-settings) on Claude.ai.

The following managed settings configuration enables the sandbox, refuses to start Claude Code if the sandbox cannot initialize, and prevents the model from retrying commands outside the sandbox:

```json theme={null}
{
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false
  }
}
```

The two keys beyond `enabled` control what happens when the sandbox cannot run a command:

* **`failIfUnavailable`**: a missing dependency such as bubblewrap on Linux blocks Claude Code from starting rather than showing a warning and falling back to unsandboxed execution
* **`allowUnsandboxedCommands: false`**: Claude Code ignores the `dangerouslyDisableSandbox` escape hatch, so when a command fails under the sandbox, Claude can't retry it unsandboxed

Two additions are worth considering alongside them. Add `excludedCommands` for any organization-approved tools that must run without isolation. Add [`sandbox.credentials`](#protect-credentials) entries for credential directories such as `~/.aws` and `~/.ssh` and for secret environment variables, since the default read policy still allows them.

This configuration sandboxes the commands Claude runs. A developer can still type a command at the [`!` shell-mode prompt](https://code.claude.com/docs/en/interactive-mode#shell-mode-with-prefix) and run it outside the sandbox, with the same access they already have in any terminal outside Claude Code. See [The unsandboxed retry escape hatch](#the-unsandboxed-retry-escape-hatch) for the sessions where typed commands run sandboxed.

The sandbox does not run on native Windows, so if your fleet includes Windows hosts, scope this configuration to macOS and Linux or have those users run Claude Code inside WSL2 or a container.

### Keep developers from widening the policy

For boolean keys such as `enabled` and `failIfUnavailable`, Claude Code uses the managed value and ignores anything a developer sets locally. For array keys such as `excludedCommands` and `allowRead`, Claude Code merges entries from every scope the session loads, so a developer can append entries that widen the policy.

Set `allowManagedReadPathsOnly` to `true` in managed settings so that only `allowRead` entries from managed settings are honored. This prevents developers from widening read access beyond the organization-approved paths. To lock network domains to the managed values the same way, set [`allowManagedDomainsOnly`](https://code.claude.com/docs/en/settings-reference#sandbox-network-allowmanageddomainsonly).

When managed settings configure `sandbox.filesystem` or list any `sandbox.credentials.files` entry with `"mode": "deny"`, only managed settings can set [`filesystem.disabled`](#disable-filesystem-isolation), so developers can't switch off administrator-deployed filesystem restrictions. Whether a `mask` entry pins the key depends on how it resolves; the table under [Which settings can disable it](#which-settings-can-disable-it) covers the four cases.

`excludedCommands` has no equivalent managed-only lockdown, so a developer can always append entries that run additional commands outside the sandbox. Keep the managed list narrow.

### Custom proxy configuration

For organizations requiring advanced network security, you can implement a custom proxy to:

* Decrypt and inspect HTTPS traffic
* Apply custom filtering rules
* Log all network requests
* Integrate with existing security infrastructure

To point Claude Code at your proxy, set the proxy ports in [sandbox settings](https://code.claude.com/docs/en/settings-reference#sandbox-settings):

```json theme={null}
{
  "sandbox": {
    "network": {
      "httpProxyPort": 8080,
      "socksProxyPort": 8081
    }
  }
}
```
