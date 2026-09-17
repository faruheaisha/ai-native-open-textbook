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
pageSha256: "c63107ecccb90a41489d3a6ffadc1dd7f76d329b74ffaaabcbea8da143f69cd8"
contentMode: "local-full"
zh: ""
---

## Choose a delivery mechanism

The file in the steps above is one of four ways to get managed settings onto a machine. Every mechanism carries the same policy keys as a `settings.json` file, so the [settings reference](https://code.claude.com/docs/en/settings-reference) applies to all of them. A few keys are tied to particular sources, and each entry's Scope line says which:

* **Delivery controls**: [`policyHelper`](https://code.claude.com/docs/en/settings-reference#policyhelper), [`wslInheritsWindowsSettings`](https://code.claude.com/docs/en/settings-reference#wslinheritswindowssettings), and [`managedSourcesBehavior`](https://code.claude.com/docs/en/settings-reference#managedsourcesbehavior)
* **Gateway login keys**: [`forceLoginGatewayUrl`](https://code.claude.com/docs/en/settings-reference#forcelogingatewayurl) and the `"gateway"` value of [`forceLoginMethod`](https://code.claude.com/docs/en/settings-reference#forceloginmethod)

A managed settings file, an MDM profile, or the claude.ai console applies one policy to everyone it reaches. To give one group of developers a different policy, deploy a different file or profile to that group; the claude.ai console [can't target a group yet](https://code.claude.com/docs/en/server-managed-settings#current-limitations), while a self-hosted [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway) delivers managed settings per IdP group.

When more than one mechanism delivers a policy to the same machine, Claude Code by default uses one and ignores the others. [How Claude Code combines managed sources](#how-claude-code-combines-managed-sources) gives the order and the opt-in that applies every source.

The MDM and file rows are together called endpoint-managed settings, because the policy is stored on the developer's device, as opposed to the server-managed row, where Claude Code fetches it.

Pick a mechanism by how you already manage devices, using the table below.

| Mechanism                                              | How you deliver it                                                                                                                                                                                                | When Claude Code reads it                                                                                                                                                                                                                | Use it when                                                                                    |
| :----------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| [Server-managed settings](https://code.claude.com/docs/en/server-managed-settings) | In the claude.ai admin console, or on a self-hosted [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway)                                                                                                                | Fetched at startup and polled hourly; see [changes that need approval](#where-and-when-a-policy-applies)                                                                                                                                 | You want one place to change policy for a claude.ai organization without touching each machine |
| MDM or OS-level policy                                 | As a macOS configuration profile or a Windows `HKLM` registry value, through Jamf, Intune, Group Policy, or a similar tool; see [where each mechanism stores the policy](#where-each-mechanism-stores-the-policy) | Read at startup and checked for changes every 30 minutes                                                                                                                                                                                 | You already manage devices with MDM or Group Policy                                            |
| File-based                                             | As `managed-settings.json` in a system directory on each machine; see [where each mechanism stores the policy](#where-each-mechanism-stores-the-policy)                                                           | Read at startup and reloaded when a file changes                                                                                                                                                                                         | Machines without MDM, Linux hosts, or images you build yourself                                |
| HKCU registry, Windows and WSL                         | As a Windows `HKCU` registry value; see [where each mechanism stores the policy](#where-each-mechanism-stores-the-policy)                                                                                         | Read at startup and checked for changes every 30 minutes; Claude Code uses it only when no other managed source delivers a policy key and no [host-supplied parent settings](#let-an-embedding-host-add-policy) supply a restrictive key | You can't write the machine-level `HKLM` key                                                   |

Starter templates for Jamf, Iru, Intune, and Group Policy are in the [MDM examples repository](https://github.com/anthropics/claude-code/tree/main/examples/mdm).

For managed MCP servers, which you deploy alongside any of these through `managed-mcp.json` or provide through the [`managedMcpServers`](https://code.claude.com/docs/en/settings-reference#managedmcpservers) key, see [Managed MCP configuration](https://code.claude.com/docs/en/managed-mcp).

### Where and when a policy applies

A deployed policy reaches the developer's sessions as follows:

* **Surfaces**: on the developer's machine, the terminal, the VS Code and JetBrains extensions, the desktop app's Code tab, and [Agent SDK](https://code.claude.com/docs/en/agent-sdk/typescript) sessions read all of these sources. Agent SDK sessions load managed settings even when `settingSources` excludes the user, project, and local files.
* **Cloud sessions**: a session in an Anthropic-hosted environment doesn't read a device's MDM profile or file, so policy for it has to come from server-managed settings. A session in a [self-hosted environment](https://code.claude.com/docs/en/self-hosted-environments) also reads the managed settings file in its runner image, by default only when server-managed settings deliver no policy key, apart from the [keys Claude Code reads from every admin source](#keys-read-from-every-admin-source). [How Claude Code combines managed sources](#how-claude-code-combines-managed-sources) covers the opt-in that applies both.
* **Cowork sessions**: [Cowork](https://claude.com/docs/cowork/overview) in the Claude Desktop app runs its sessions on Claude Code. In a Cowork session, Claude Code never fetches server-managed settings from the claude.ai admin console, even when the user signs in with a Team or Enterprise account, so which policy applies depends on where the session runs:

  * **On the user's machine**: by default, Claude Code in a Cowork session reads the MDM or OS-level policy and the managed settings file on that device, so deploy policy there.
  * **In a full VM sandbox**: when your Claude Desktop managed configuration sets [`requireCoworkFullVmSandbox`](https://claude.com/docs/third-party/claude-desktop/configuration#requirecoworkfullvmsandbox), Claude Code runs inside a virtual machine where the device's MDM policy and managed settings file aren't present.
  * **Remote Cowork sessions**: these run on Anthropic-managed VMs, where Claude Code has no device policy to read.

  The [surface coverage](https://code.claude.com/docs/en/model-config#surface-coverage) table compares Cowork with the other surfaces.
* **Running sessions**: most changes reach a running session on the schedule in the [delivery mechanism table](#choose-a-delivery-mechanism), without a restart.
  * Changes to [`forceRemoteSettingsRefresh`](https://code.claude.com/docs/en/settings-reference#forceremotesettingsrefresh), [`requiredMinimumVersion`](https://code.claude.com/docs/en/settings-reference#requiredminimumversion), and [some user-editable keys](https://code.claude.com/docs/en/settings#when-edits-take-effect) take effect at the next session start.
  * A new or changed [`policyHelper`](https://code.claude.com/docs/en/settings-reference#policyhelper) entry takes effect at the next launch. If server-managed settings shadow the helper at that launch, the helper runs as soon as a fetch reports those settings removed.
* **Changes that need approval**: apart from the [updates that wait for the next launch](https://code.claude.com/docs/en/server-managed-settings#fetch-and-caching-behavior), a server-managed change to a setting that [needs approval](https://code.claude.com/docs/en/server-managed-settings#security-approval-dialogs), such as a hook or an `env` variable, waits for the developer to accept the dialog in an interactive session, and applies for the current run in a session an IDE extension or the Agent SDK hosts. Other server-managed changes apply on the next poll.
* **Long-lived sessions**: a session left open for weeks can still lag a rollout. [`requiredMinimumVersion`](https://code.claude.com/docs/en/settings-reference#requiredminimumversion) blocks an outdated binary from starting and doesn't end a session that's already running.

&lt;span id="format-the-policy-for-each-platform" />

### Where each mechanism stores the policy

The keys are the same everywhere, but each mechanism stores them in a different place and shape:

* **Server-managed**: Anthropic's servers, or your gateway, hold the policy. Claude Code keeps a local cache that it applies at startup and [replaces on each successful fetch](https://code.claude.com/docs/en/server-managed-settings#security-considerations).
* **macOS configuration profile**: the `com.anthropic.claudecode` managed preferences domain. Use the same top-level keys as `managed-settings.json`, with nested settings as dictionaries and lists as plist arrays.
* **Windows HKLM registry**: the JSON as a `REG_SZ` or `REG_EXPAND_SZ` value named `Settings` under `HKLM\SOFTWARE\Policies\ClaudeCode`.
* **File-based**: `managed-settings.json`, an optional `managed-settings.d/` directory, and `managed-mcp.json` in the system directory: `/Library/Application Support/ClaudeCode/` on macOS, `/etc/claude-code/` on Linux and WSL, and `C:\Program Files\ClaudeCode\` on Windows. Claude Code doesn't read the legacy Windows path `C:\ProgramData\ClaudeCode\managed-settings.json`.
* **Windows HKCU registry**: the same `Settings` value under `HKCU\SOFTWARE\Policies\ClaudeCode`.

### Split a file-based policy across teams

If several teams own parts of one policy, put each part in its own file in `managed-settings.d/`, next to `managed-settings.json` in the same system directory, instead of editing one shared file.

Claude Code merges `managed-settings.json` first, then every `*.json` file in the directory in alphabetical order. Name the files with numeric prefixes to control the order, such as `10-telemetry.json` and `20-security.json`. Claude Code ignores hidden files and files that don't end in `.json`.

When two files set the same key, Claude Code combines them by these rules:

* **Single values**, such as `"model": "opus"` or `"cleanupPeriodDays": 7`: the later file's value replaces the earlier one
* **Lists**, such as `permissions.deny` or `sandbox.network.allowedDomains`: the two lists combine, with duplicates removed
* **Nested blocks**, such as `env` or `sandbox`: the two blocks merge key by key, and each key inside follows these same rules
* **`fallbackModel`**: the later chain replaces the earlier one whole
* **[`extraKnownMarketplaces`](https://code.claude.com/docs/en/settings-reference#extraknownmarketplaces) and [`managedMcpServers`](https://code.claude.com/docs/en/settings-reference#managedmcpservers)**: a later entry with the same name replaces the earlier one whole
* **[`modelPicker`](https://code.claude.com/docs/en/settings-reference#modelpicker)**: the later lineup replaces the earlier one whole

&lt;span id="precedence-within-the-managed-tier" />

&lt;span id="which-managed-source-claude-code-uses" />
