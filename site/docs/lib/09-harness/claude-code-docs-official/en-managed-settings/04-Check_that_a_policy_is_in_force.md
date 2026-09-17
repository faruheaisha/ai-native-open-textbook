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
pageSha256: "dc95976c8f37f0c616e85d588a624d4a6a6271e61818f30b99da9a47f333ccb4"
contentMode: "local-full"
zh: ""
---

## Check that a policy is in force

A developer reports that a policy isn't applying, or you want to confirm a rollout landed before pushing it to the fleet. Two commands on that machine answer it: `/status` shows which managed source Claude Code selected, and `claude doctor` lists what it dropped.

### Read the source in /status

On the developer's machine, run `/status` inside Claude Code and read the `Setting sources` line. When a managed source is in effect, the line lists `Enterprise managed settings` with the source Claude Code selected in parentheses:

* `(remote)`: server-managed settings from claude.ai or a gateway
* `(plist)` or `(HKLM)`: an MDM or OS policy
* `(file)`, `(drop-ins)`, or `(file + drop-ins)`: `managed-settings.json`, the drop-in directory, or both
* `(remote + file, merged)`, or another list ending in `, merged`: your organization [composes every managed source](#compose-every-managed-source), and Claude Code merged the listed sources into the policy. A lower source can still supply `env` variables without appearing in the list. Requires Claude Code v2.1.242 or later
* `(HKCU)`: the user-writable registry fallback
* `(parent process)`: an [embedding host](#let-an-embedding-host-add-policy) supplied restrictive settings
* `(helper)`: a [`policyHelper`](https://code.claude.com/docs/en/settings-reference#policyhelper) configured by the selected MDM or file source

When Claude Code found a managed source on the machine and didn't select it, a second line, `Skipped sources`, names each such source. Read it to distinguish a policy that never reached the machine from one that reached it and that a higher-priority source overrode. Requires Claude Code v2.1.242 or later.

When the policy isn't applying, the `Setting sources` line tells you which of two problems you have:

* **The line is missing**: Claude Code found no managed source that delivers a policy key.

  If you deployed a managed settings file, check that it sits at the path for the OS and that it contains a [policy key](#how-claude-code-combines-managed-sources) rather than only the control keys. A file that isn't valid JSON doesn't produce this state; Claude Code [refuses to start](#find-entries-claude-code-dropped) instead.

  When you deployed through server-managed settings instead, run `claude doctor`, which reports the [fetch outcome](https://code.claude.com/docs/en/server-managed-settings#verify-settings-delivery).
* **The line names a source other than the one you deployed**: a higher-priority source is present and Claude Code ignored yours, and `Skipped sources` lists it. [How Claude Code combines managed sources](#how-claude-code-combines-managed-sources) gives the order.

&lt;span id="invalid-entries-in-managed-settings" />

### Find entries Claude Code dropped

When a managed settings file, MDM profile, registry value, or server-managed payload fails schema validation, Claude Code first skips the individual entries it can repair, such as one invalid permission rule, with a warning for each, then drops any top-level key whose value still fails and keeps enforcing every remaining valid key.

Claude Code is stricter with the `managedSettings` a [`policyHelper`](https://code.claude.com/docs/en/settings-reference#policyhelper) emits: it makes the same entry repairs, but any schema violation that survives fails the whole helper run, and at startup Claude Code refuses to start, the same as for a helper that exits non-zero.

When a managed settings file, drop-in file, MDM plist, or HKLM registry value is present but can't be parsed as a JSON object, Claude Code refuses to start and prints [an error naming the source](https://code.claude.com/docs/en/errors#managed-settings-document-could-not-be-parsed), even when another admin source delivers a valid policy. Each source fails this way when:

* **Managed settings file or drop-in file**: the file isn't valid JSON, or its top level isn't an object
* **MDM plist**: macOS's `plutil` reports the plist malformed, or its converted content isn't a JSON object
* **HKLM registry value**: the `Settings` value isn't a string, is empty, or doesn't hold a JSON object

Three source states don't cause this refusal:

* An absent file, profile, or registry value isn't a failure; Claude Code runs without that source.
* An empty managed settings file counts as `\{\}`.
* A malformed value in the user-writable HKCU registry key never blocks launch. Claude Code reports it as a notice in `/status` and `claude doctor` instead.

If a managed settings file, drop-in file, or `managed-settings.d/` directory can't be read and no admin source supplies a policy, sessions signed in with claude.ai or Claude Console credentials exit at startup with a message to contact an administrator.

To find a dropped entry, look in one of three places:

* Interactive sessions show a dialog at startup listing the invalid entries.
* Non-interactive runs with `-p` print a summary to stderr.
* [`claude doctor`](https://code.claude.com/docs/en/debug-your-config) lists each invalid entry with its source and field.

#### Keys that fail closed

A few enforcement keys aren't dropped when invalid. Claude Code enforces a stricter fallback until the value is fixed; the table shows what it enforces for each key:

| Field                         | Behavior when present but invalid                                                                                                                                                                                                                                                                                                                                                                                        |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowedMcpServers`           | Enforced as an empty allowlist until the value is fixed, so no MCP servers that users add are admitted. Servers your organization delivers through [`managedMcpServers`](https://code.claude.com/docs/en/settings-reference#managedmcpservers) still load, and `managed-mcp.json` servers load per [How a server is evaluated](https://code.claude.com/docs/en/managed-mcp#how-a-server-is-evaluated). An individual invalid entry is stripped and the valid subset is enforced. |
| `allowedHttpHookUrls`         | Claude Code enforces an empty managed [allowlist](https://code.claude.com/docs/en/settings-reference#allowedhttphookurls) until you fix the value, so an HTTP hook runs only if another settings file lists its URL. If only an individual entry is invalid, Claude Code strips that entry and enforces the rest.                                                                                                                                    |
| `httpHookAllowedEnvVars`      | Claude Code enforces an empty managed [allowlist](https://code.claude.com/docs/en/settings-reference#httphookallowedenvvars) until you fix the value, so a header variable is interpolated only if another settings file names it. If only an individual entry is invalid, Claude Code strips that entry and enforces the rest.                                                                                                                      |
| `allowedChannelPlugins`       | Claude Code enforces an empty allowlist until you fix the value, so no channel plugin passed to `--channels` is admitted. If only an individual entry is invalid, it strips that entry and enforces the rest.                                                                                                                                                                                                            |
| `allowManagedHooksOnly`       | Treated as `true` until fixed: the [hook restrictions](https://code.claude.com/docs/en/settings-reference#allowmanagedhooksonly) apply and, unless `disableCommandPluginSources` is explicitly `false`, command-sourced plugins are disabled.                                                                                                                                                                                                        |
| `allowManagedMcpServersOnly`  | Treated as `true`.                                                                                                                                                                                                                                                                                                                                                                                                       |
| `disableCommandPluginSources` | Treated as `true`, so command-sourced plugins stay disabled until the value is fixed.                                                                                                                                                                                                                                                                                                                                    |
| `availableModels`             | Enforced as an empty allowlist until fixed, so only the Default model is available; a non-string entry is stripped and the valid subset enforced.                                                                                                                                                                                                                                                                        |
| `enforceAvailableModels`      | Treated as `true`.                                                                                                                                                                                                                                                                                                                                                                                                       |
| `forceLoginOrgUUID`           | No organization is permitted to log in until the value is fixed.                                                                                                                                                                                                                                                                                                                                                         |
| `crossSessionInbound`         | Treated as `refuse`, the most restrictive value, so inbound [cross-session messages](https://code.claude.com/docs/en/cross-session-messaging#control-inbound-messages) are refused until the value is fixed. The developer sees [a warning](https://code.claude.com/docs/en/errors#crosssessioninbound-must-be-one-of-accept-hold-refuse).                                                                                                                                       |
| `deniedMcpServers`            | An individual invalid entry is stripped and the valid subset is enforced. A wholly invalid value is dropped with a warning, since denying every server would block servers the policy never named.                                                                                                                                                                                                                       |
| `sandbox.credentials`         | A recoverable invalid entry is degraded to `mode: "deny"` with a warning; an unrecoverable one is stripped; valid entries stay enforced. See [invalid credential entries](https://code.claude.com/docs/en/settings-reference#invalid-credential-entries-in-managed-settings)                                                                                                                                                                         |

`allowedHttpHookUrls` and `httpHookAllowedEnvVars` merge across settings files, so entries in your user, project, or local settings still apply while the managed list is empty. The fallbacks for those two keys and for `allowedChannelPlugins` require Claude Code v2.1.267 or later; earlier versions drop the whole key when its value or any entry is invalid.

`requiredMinimumVersion` and `requiredMaximumVersion` fail open by design: an invalid value is dropped rather than enforced.

This tolerance applies only to managed settings. User, project, and local settings files remain strict: a file whose JSON or top-level shape fails validation is rejected as a whole and reported, and an individual entry that fails, such as a malformed permission rule, is skipped with a warning while the rest of the file applies.

&lt;span id="managed-only-settings" />
