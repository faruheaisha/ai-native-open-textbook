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
sourceRel: "en/managed-settings.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/managed-settings.md"
sourceSha256: "d004e5b69cafe5d2bb7b626e4b76989e9712594969ab0ca8ce430cadf56dcb6b"
pageSha256: "3c6b8ebd1f19f4a2a49ee493a5ed20d1884a18125b6b520a73ca885340c40663"
contentMode: "local-full"
zh: ""
---

## How Claude Code combines managed sources

When your organization delivers more than one managed source to the same machine, the [`managedSourcesBehavior`](https://code.claude.com/docs/en/settings-reference#managedsourcesbehavior) key decides what Claude Code does with the others:

* **`"first-wins"`, the default**: Claude Code uses the highest-ranked source that delivers at least one policy key and ignores the rest rather than merging them, apart from the few keys in [Keys read from every admin source](#keys-read-from-every-admin-source). Claude Code shows no warning for the sources it skips; `/status` [names the source it used and the ones it skipped](#read-the-source-in-/status).
* **`"merge"`**: Claude Code applies every admin source that delivers a policy key and combines them by kind of key: on most keys the higher-ranked source's value applies, lists union, and locks take the strictest value. [Compose every managed source](#compose-every-managed-source) says where to set the key and how each kind of key combines. Requires Claude Code v2.1.242 or later.

Both settings rank the sources the same way. Two terms recur in this section:

* **Policy key**: any settings key other than the two control keys, [`wslInheritsWindowsSettings`](https://code.claude.com/docs/en/settings-reference#wslinheritswindowssettings) and [`managedSourcesBehavior`](https://code.claude.com/docs/en/settings-reference#managedsourcesbehavior). A managed settings file or MDM policy that contains only those doesn't count, and Claude Code moves on to the next source.
* **Admin source**: one of the first three sources below. The HKCU registry is user-writable and isn't one.

Claude Code checks the sources in this order, highest priority first:

1. Remote settings, delivered from claude.ai as [server-managed settings](https://code.claude.com/docs/en/server-managed-settings) or by a [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway). Claude Code fetches this source only when the session authenticates to Anthropic's API directly with an [eligible login or key](https://code.claude.com/docs/en/server-managed-settings#platform-availability), or signs in to a gateway with `/login`. On other providers, or when `ANTHROPIC_BASE_URL` points somewhere other than Anthropic's API, it starts at the next source
2. MDM or OS-level policies: the macOS plist or the HKLM registry key
3. Managed settings files, `managed-settings.d/*.json` and `managed-settings.json` merged together
4. The HKCU registry, on Windows, and on WSL once the HKLM registry or the Windows managed settings file turns [`wslInheritsWindowsSettings`](https://code.claude.com/docs/en/settings-reference#wslinheritswindowssettings) on and the HKCU value also sets it. Claude Code reads it only when no source above it delivers a policy key and no [host-supplied parent settings](#let-an-embedding-host-add-policy) supply a restrictive key

This diagram shows the ranking, with examples of the cross-source keys Claude Code reads from the first three sources under either setting:

<img src="https://mintcdn.com/claude-code/zuWID2B-Rxm8DEC8/images/managed-source-precedence.svg?fit=max&auto=format&n=zuWID2B-Rxm8DEC8&q=85&s=53f6be49f06eff48e01422c8ae1bc2e6" className="dark:hidden" alt="Diagram showing the four managed settings sources ranked from remote settings at the top through MDM, managed settings files, and the HKCU registry at the bottom. By default the first source with a policy key supplies the policy and the rest are skipped; with managedSourcesBehavior set to merge, every admin source with a policy key contributes, combined by kind of key, and the HKCU registry stays out. A side panel shows that cross-source keys such as the sandbox locks, forceRemoteSettingsRefresh, and the per-variable env merge are read from every admin source, which excludes the HKCU registry." width="680" height="330" data-path="images/managed-source-precedence.svg" />

<img src="https://mintcdn.com/claude-code/zuWID2B-Rxm8DEC8/images/managed-source-precedence-dark.svg?fit=max&auto=format&n=zuWID2B-Rxm8DEC8&q=85&s=ae407a9a08a3d680e80cf1a2af845d71" className="hidden dark:block" alt="Diagram showing the four managed settings sources ranked from remote settings at the top through MDM, managed settings files, and the HKCU registry at the bottom. By default the first source with a policy key supplies the policy and the rest are skipped; with managedSourcesBehavior set to merge, every admin source with a policy key contributes, combined by kind of key, and the HKCU registry stays out. A side panel shows that cross-source keys such as the sandbox locks, forceRemoteSettingsRefresh, and the per-variable env merge are read from every admin source, which excludes the HKCU registry." width="680" height="330" data-path="images/managed-source-precedence-dark.svg" />

### Keys read from every admin source

Under the default `"first-wins"` setting, Claude Code reads most keys only from the [source it selected](#how-claude-code-combines-managed-sources), and ignores a value in a lower-ranked source even when the selected source leaves that key unset.

A few keys work differently. Claude Code reads them from every admin source, so a lower-ranked MDM policy or managed settings file can still set them when the selected source doesn't. Claude Code leaves the user-writable HKCU registry out of that scan; when HKCU is the only source and no host supplies parent settings, HKCU applies like any selected source.

The cross-source keys include:

* `sandbox.network.allowManagedDomainsOnly` and `sandbox.filesystem.allowManagedReadPathsOnly`: a `true` in any admin source turns the lock on. While a lock is on, Claude Code unions the allowlist it locks, `sandbox.network.allowedDomains` together with `WebFetch(domain:...)` allow rules, or `sandbox.filesystem.allowRead`, across every admin source. Without the lock, Claude Code treats the allowlist like any other key, so under `"first-wins"` an unselected admin source's allowlist is ignored
* `allowAllClaudeAiMcps`
* The sandbox binary paths `sandbox.bwrapPath` and `sandbox.socatPath`
* The sandbox `ripgrep` binary, [`sandbox.ripgrep`](https://code.claude.com/docs/en/settings-reference#sandbox-ripgrep)
* `sandbox.filesystem.disabled` and `sandbox.network.strictAllowlist`
* [`useAutoModeDuringPlan`](https://code.claude.com/docs/en/settings-reference#useautomodeduringplan) and [`syncClaudeAiSkills`](https://code.claude.com/docs/en/settings-reference#syncclaudeaiskills), where a `false` from any admin source turns the behavior off. A `false` in the developer's user or local settings turns it off too; each key can only deny
* [`enableArtifact`](https://code.claude.com/docs/en/settings-reference#enableartifact), where a `false` from any admin source turns the [Artifact tool](https://code.claude.com/docs/en/artifacts) off. A `false` in the developer's user, project, or local settings turns it off too, and no source turns it back on; see [which lower-level values still count](https://code.claude.com/docs/en/settings#exceptions-to-managed-settings-precedence). Requires Claude Code v2.1.242 or later
* [`maxEffortLevel`](https://code.claude.com/docs/en/settings-reference#maxeffortlevel), where the lowest cap in any admin source applies. If a developer sets a lower cap in their own settings or with `--settings`, Claude Code applies that one; no source can raise the cap. Requires Claude Code v2.1.267 or later
* A commit-trailer opt-out in `attribution`, or in the deprecated `includeCoAuthoredBy`, from any tier
* [`forceRemoteSettingsRefresh`](https://code.claude.com/docs/en/server-managed-settings)
* `env`, merged per variable across the admin sources: each variable comes from the highest-priority source that defines it, so lower sources fill in variables the higher ones leave unset. A few variables follow their own rules; [Per-key exceptions across managed sources](https://code.claude.com/docs/en/server-managed-settings#per-key-exceptions-across-managed-sources) names each one. Requires Claude Code v2.1.223 or later. Before v2.1.223, Claude Code applied the selected source's whole `env` block only

### Compose every managed source

To have Claude Code apply every admin source your organization delivers, set [`managedSourcesBehavior`](https://code.claude.com/docs/en/settings-reference#managedsourcesbehavior) to `"merge"` in the highest-ranked source you deploy. Claude Code reads the key only from the highest-ranked source that carries either the key or a policy key, so a lower source can't opt itself into merging with the source above it, and a machine that never receives server-managed settings needs the key in its MDM profile too. The user-writable HKCU registry never merges with another source. Requires Claude Code v2.1.242 or later.

Under `"merge"`, Claude Code adds a lower source's list entries, such as `permissions.allow` rules and hooks, to the policy, so turn it on only when every source ranked below your highest one is under an administrator's control.

This table shows how Claude Code combines each kind of key under `"merge"`. The [`managedSourcesBehavior` entry](https://code.claude.com/docs/en/settings-reference#managedsourcesbehavior) names every key in three of the rows: restriction allowlists, values taken whole, and keys read from the highest-ranked source only.

| Kind of key                                   | How Claude Code combines it                                                                                                                         | Examples                                                                                                                    |
| :-------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| Lists                                         | Combines the entries from every source                                                                                                              | `permissions.allow`, `hooks`, `sandbox.network.allowedDomains`, `deniedMcpServers`                                          |
| Locks                                         | Applies the strictest value any source sets; a looser value applies only from the highest-ranked source                                             | `allowManagedHooksOnly`, `permissions.disableBypassPermissionsMode`, `crossSessionInbound`                                  |
| Restriction allowlists                        | Takes the list whole from the highest-ranked source that sets it, without adding entries from lower sources                                         | `availableModels`, `allowedMcpServers`, `strictKnownMarketplaces`, `allowedChannelPlugins`, and the `fallbackModel` chain   |
| Values taken whole                            | Takes the value whole from the highest-ranked source that sets it, without combining entries or fields from lower sources                           | `sandbox.credentials.awsPairs`, `sandbox.ripgrep`                                                                           |
| Provided MCP servers                          | Combines the server names from every source; when two sources set the same name, applies the higher-ranked source's whole entry                     | `managedMcpServers`                                                                                                         |
| Keys read from the highest-ranked source only | Ignores the key in every lower source, even when the highest-ranked source leaves it unset                                                          | Credential helpers such as `apiKeyHelper`, login pins such as `forceLoginOrgUUID`, `modelPicker`, `permissions.defaultMode` |
| `env`                                         | Merges per variable across admin sources under either setting, as [Keys read from every admin source](#keys-read-from-every-admin-source) describes |                                                                                                                             |
| Every other key                               | Takes the value from the highest-ranked source that sets it                                                                                         | `model`, `cleanupPeriodDays`                                                                                                |

To confirm which sources combined on a machine, [read the `Setting sources` line in `/status`](#read-the-source-in-/status); that section says what each label means.

### Compute the policy with a helper program

A [`policyHelper`](https://code.claude.com/docs/en/settings-reference#policyhelper) is an executable your MDM policy or managed settings file names, and Claude Code runs it to compute managed settings at startup. When the selected source configures one and the helper emits a `managedSettings` object, that output changes what Claude Code reads:

* **The emitted `managedSettings` object is the only managed settings for the session**, including for the [keys it otherwise reads from every admin source](#keys-read-from-every-admin-source), apart from [`forceRemoteSettingsRefresh`, which has its own startup rule](https://code.claude.com/docs/en/settings-reference#forceremotesettingsrefresh)

For which helper runs fail, and what Claude Code does when one does, see [Helper failures](https://code.claude.com/docs/en/settings-reference#helper-failures).

&lt;span id="parent-settings-from-embedding-hosts" />

&lt;span id="control-policy-from-an-embedding-host" />

&lt;span id="merge-policy-from-an-embedding-host" />

### Let an embedding host add policy

When another application launches Claude Code, such as Claude Desktop, an IDE extension, or an Agent SDK app, that host can pass its own managed settings through the SDK `managedSettings` option. Claude Code calls these parent settings.

By default, Claude Code ignores parent settings whenever an admin source is present: server-managed settings, an MDM or OS-level policy, or a managed settings file.

To have Claude Code merge parent settings alongside an admin source, set [`parentSettingsBehavior`](https://code.claude.com/docs/en/settings-reference#parentsettingsbehavior) to `"merge"` in the highest-priority managed source; Claude Code reads the key from that source only.

Claude Code then keeps only the host's values that restrict what Claude can do, with one gap to know about: unless you also set the `allowManaged*Only` locks, the host's permission allow rules and sandbox allowlists still apply. See [Restrict parent settings](https://code.claude.com/docs/en/claude-apps-gateway#restrict-parent-settings) for the locks.

A [`policyHelper`](https://code.claude.com/docs/en/settings-reference#policyhelper) can turn parent merging off regardless of this key; its entry says when.

Claude Code also applies these checks to parent-supplied values on their own:

* When any admin source sets `allowManagedPermissionRulesOnly`, Claude Code drops [parent-supplied](https://code.claude.com/docs/en/claude-apps-gateway#restrict-parent-settings) permission allow rules and `additionalDirectories` as it reads them, even when a higher-priority source leaves the key unset. The key's effect on your own permission rules comes from the managed settings Claude Code applies, or from parent settings you've chosen to merge
* Claude Code enforces the `forceLoginOrgUUID` or `allowedMcpServers` value in the managed settings it applies and blocks a parent-supplied one. A value in a lower admin source that Claude Code doesn't apply neither applies nor blocks the parent's. The [`managedSourcesBehavior`](https://code.claude.com/docs/en/settings-reference#managedsourcesbehavior) entry says which source supplies each key under `"merge"`. Before v2.1.223, a value in any admin source blocked the parent's
* An `availableModels` value follows the same rule as `allowedMcpServers`

#### Keep Cowork folder access when only managed rules apply

[Cowork](https://claude.com/docs/cowork/overview) in the Claude Desktop app runs its sessions on Claude Code and grants each session access to its working folders, such as the folder the user connects, through allow rules it supplies when it launches the session. When your managed policy sets [`allowManagedPermissionRulesOnly`](https://code.claude.com/docs/en/settings-reference#allowmanagedpermissionrulesonly), Claude Code keeps only the allow rules in the managed policy: it drops allow rules a host supplies as parent settings, as `--allowedTools`, or in a settings file, so writes to those folders lose their pre-approval. In a Cowork session that asks before edits, Cowork can't show the prompt, and Claude reports each write as blocked because the path resolves to a protected location or a path outside the connected folder.

To restore the writes, add allow rules for those folders to the managed source Claude Code [selects](#precedence-within-the-managed-tier) on those machines: on an MDM-managed fleet, that's the MDM policy rather than a separate managed settings file. This example uses the file form, and an MDM policy takes the same keys. It keeps `allowManagedPermissionRulesOnly` set and allows edits under a `CoworkProjects` folder in each user's home directory; replace the path with the folders your users connect:

```json managed-settings.json theme={null}
{
  "allowManagedPermissionRulesOnly": true,
  "permissions": {
    "allow": [
      "Edit(~/CoworkProjects/**)"
    ]
  }
}
```

After you deploy the policy, Claude can save files under that folder in a new Cowork session. [Read and Edit rules](https://code.claude.com/docs/en/permissions#read-and-edit) cover the path syntax, including the `//` form for absolute paths.

### What a developer can change

A developer's own settings files, `--settings` values, and project files never override a managed value; the [exceptions](https://code.claude.com/docs/en/settings#exceptions-to-managed-settings-precedence) only let a stricter lower-level value count. Four things sit outside that rule:

* **The model for a session**: a managed `model` is a default, not a lock. `--model` and `ANTHROPIC_MODEL` still pick the model for that session, so deploy [`availableModels`](https://code.claude.com/docs/en/settings-reference#availablemodels) to restrict the choice.
* **Local admin rights**: a developer who is an administrator on the machine can edit the managed source itself, which is why MDM tooling can redeploy the profile or file on a schedule and why the HKLM registry and the macOS managed preferences domain exist.
* **The server-managed cache**: server-managed settings come from Anthropic's servers, and an edit to the local cache [lasts only until the next successful fetch](https://code.claude.com/docs/en/server-managed-settings#security-considerations).
* **Other tools**: managed settings bind Claude Code only. A developer who calls the API from another tool isn't under them.

&lt;span id="verify-enforcement" />

&lt;span id="verify-that-a-policy-is-in-force" />
