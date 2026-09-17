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
pageSha256: "7c690209b893ff52abed7ed37b84a3beb1e0b422f9fcbe3a49d75d63d48e61b6"
contentMode: "local-full"
zh: ""
---

## Plugin errors

These errors come from [plugin](https://code.claude.com/docs/en/plugins) and [marketplace](https://code.claude.com/docs/en/plugin-marketplaces) configuration. For plugin problems that don't produce one of the messages on this page, such as a marketplace URL that doesn't load or a plugin that installs but doesn't appear, see [Plugin troubleshooting](https://code.claude.com/docs/en/discover-plugins#troubleshooting).

### Marketplace is registered from an untrusted source

The marketplace is registered under a name that is [reserved for official Anthropic marketplaces](https://code.claude.com/docs/en/plugin-marketplaces#marketplace-schema), but its registered source isn't an `anthropics` GitHub repository. Claude Code re-checks reserved names every time it loads or refreshes a marketplace, so the marketplace and the plugins installed from it stop loading. Before v2.1.205, the name was checked only when the marketplace was added, so an entry registered before its name became reserved kept loading.

```text theme={null}
Marketplace "claude-community" is registered from an untrusted source: The name 'claude-community' is reserved for official Anthropic marketplaces. Only repositories from 'github.com/anthropics/' can use this name. To fix it, remove the marketplace and re-add it from the official source.
```

For a marketplace whose source isn't a GitHub repository or a Git URL, such as a local directory, the middle sentence reads `can only be used with GitHub sources from the 'anthropics' organization` instead. `claude plugin marketplace add` runs the same check, and refuses a reserved name with `Failed to add marketplace:` followed by the same reserved-name sentence.

**What to do:**

* If the marketplace is already registered, run `claude plugin marketplace remove <name>`, then add it again from the official `github.com/anthropics` repository
* If you publish a third-party marketplace that used the name before it became reserved, rename it and ask users to re-add it from your source
* See the reserved name list under [Marketplace schema](https://code.claude.com/docs/en/plugin-marketplaces#marketplace-schema)

<h3 id="plugin-command-references-user-config">
  Plugin command references user\_config in a shell command
</h3>

A plugin hook, [monitor](https://code.claude.com/docs/en/plugins-reference#monitors), or MCP [`headersHelper`](https://code.claude.com/docs/en/mcp#use-dynamic-headers-for-custom-authentication) command references a `${user_config.KEY}` [plugin option](https://code.claude.com/docs/en/plugins-reference#user-configuration), and the substituted string would be passed to a shell. A configured value containing `$(...)`, backticks, or `;` would run as code there, so Claude Code refuses to start the component instead of substituting the value. The check runs on the command template, so the error appears even when no value is configured yet. Before v2.1.207, the value was substituted into the shell command.

The wording depends on which surface referenced the option. A shell-form hook reports:

```text theme={null}
Hook from plugin formatter@acme-tools references ${user_config.*} in a shell-form command. The substituted value would be re-parsed by the shell. Use exec form instead — {"command": "<executable>", "args": ["${user_config.KEY}", ...]} — or read $CLAUDE_PLUGIN_OPTION_<KEY> from the hook's environment. Command: ./scripts/notify.sh ${user_config.webhook_url}
```

A monitor reports:

```text theme={null}
Monitor "deploy-status" from plugin deploy-tools references ${user_config.*} in its command. The substituted value would be passed to a shell. Monitor commands cannot safely reference ${user_config.*}; have the monitor script read the value from a config file or prompt instead.
```

An MCP `headersHelper` reports:

```text theme={null}
headersHelper for MCP server 'internal-api' references ${user_config.*}. The substituted value would be passed to a shell; read the value inside the helper script instead (e.g. from an env var set in the server's "env" block).
```

**What to do:**

* For a hook, add an `args` array so it runs in [exec form](https://code.claude.com/docs/en/hooks#exec-form-and-shell-form), where each `${user_config.KEY}` becomes one argument with no shell in between. Or drop the reference and read the `$CLAUDE_PLUGIN_OPTION_<KEY>` environment variable inside the script
* For a monitor, drop the reference and have the monitor script read the value from a config file
* For a `headersHelper`, move `$\{user_config.KEY\}` into the server's `headers` field, which isn't shell-parsed, or read the value inside the helper script

### Plugin archive integrity check failed

The plugin's marketplace entry uses an [`archive` source](https://code.claude.com/docs/en/plugin-marketplaces#zip-archives) with a `sha256` pin, and the digest of the downloaded file doesn't match the pin. Claude Code refuses the install, so nothing changes in the plugin cache. The mismatch has three possible causes:

* The file at the URL changed after the author computed the pin
* The author entered the wrong digest in the marketplace entry
* The URL serves a different file than the author pinned

```text theme={null}
Plugin archive integrity check failed for https://artifacts.example.com/claude-plugins/my-plugin.zip: expected sha256 6bfa50e3d2e00c052b46abe51fff89346ac803e45771f76dcf6df1ab74cca5e1, got ac52220c0914ef8ca6a602e4a7362f88d30fb021110f72a6d15b68c3fe7df2b7. The archive was not installed. Verify the sha256 in the marketplace entry, or that the URL serves the intended file.
```

**What to do:**

* If you publish the plugin, recompute the digest of the exact file the URL serves, for example with `shasum -a 256 my-plugin.zip`, or `Get-FileHash -Algorithm SHA256 my-plugin.zip` in PowerShell, and update the `sha256` in the marketplace entry
* If you install the plugin, run `/plugin marketplace update <name>` to refresh the catalog in case the entry was corrected, then retry the install
* If the digests still disagree after a refresh, ask the marketplace owner which file they pinned before installing

### Path escapes plugin directory

A plugin component path, declared in the plugin's `plugin.json` or in its [marketplace entry](https://code.claude.com/docs/en/plugin-marketplaces#plugin-entries), resolves outside the plugin's own directory. Claude Code drops that path and loads the rest of the plugin. The component name in the message, such as `commands` or `hooks`, names the field that declared the path.

```text theme={null}
commands path escapes plugin directory: ./../shared.md
```

In `claude plugin` command output, the same error reads `Path escapes plugin directory: ./../shared.md (commands)`.

Claude Code rejects both a path that points outside the plugin as written, such as `../shared-utils`, and a symlink that leads outside the plugin and isn't one the [marketplace symlink rules](https://code.claude.com/docs/en/plugins-reference#share-files-within-a-marketplace-with-symlinks) allow. For a symlink, the message also says where the path resolves:

```text theme={null}
commands path escapes plugin directory: ./commands/deploy.md — it resolves to /home/user/shared/deploy.md, outside the plugin directory
```

On macOS and Linux, Claude Code also rejects a component path that contains a backslash anywhere in it, even when the path stays inside the plugin. A plugin whose component paths use Windows-style separators loads on Windows and triggers this rejection on the other platforms:

```text theme={null}
commands path escapes plugin directory: ./commands\deploy.md — its path contains a backslash, which is not resolved reliably on this platform
```

Before v2.1.251, Claude Code loaded a `commands` path declared in a marketplace entry even when it pointed outside the plugin directory. Claude Code already rejected paths declared in `plugin.json` and the other component paths in a marketplace entry.

Before v2.1.257, the check looked only at the path's spelling, not at where a symlink leads.

**What to do:**

* Move the referenced file inside the plugin directory and point the path at it with a `./` relative path
* If the path is a symlink to a file outside the plugin, replace the symlink with a copy of the file
* If the message says the path contains a backslash, write the path with forward slashes, for example `./commands/deploy.md`
* To share files with other plugins in the same marketplace, link them with a symlink inside the plugin directory, following the [symlink rules](https://code.claude.com/docs/en/plugins-reference#share-files-within-a-marketplace-with-symlinks)

### Path could not be checked

Claude Code asked the operating system whether a plugin path exists and got an error other than "not found", so it doesn't load what the path names. How much of the plugin loads depends on which path failed:

* One of a plugin's [default component folders](https://code.claude.com/docs/en/plugins-reference#file-locations-reference), such as `skills/` or `commands/`: the plugin's other components still load
* The plugin's own directory: nothing from that plugin loads

You don't see this error for a path that doesn't exist at all. In `/plugin`, the error appears under the plugin and names the path and the code the operating system returned:

```text theme={null}
skills path could not be checked: /home/user/my-plugin/skills (ELOOP)
```

In `claude plugin list`, the same error reads `Path not found: /home/user/my-plugin/skills (skills, ELOOP)`.

Causes that produce this error include:

* `ELOOP`: a symlink in the path points at itself or forms a loop
* `EIO` or `ESTALE`: the path is on a network mount that is broken or stale
* `EACCES`: one of the directories above the path denies you permission to traverse it

**What to do:**

* Replace a symlink that points at itself with a real folder, or delete it
* If the path is on a network mount, remount the share
* If the code is `EACCES`, restore your execute permission on the directories above the path
* Run `/reload-plugins` after fixing the path, or restart Claude Code, to load the plugin or component

Before v2.1.265, Claude Code treated a default component folder it couldn't check as absent and loaded the plugin without that component, with no error.

### Marketplace entry path does not stay inside the marketplace directory

The plugin's [marketplace entry](https://code.claude.com/docs/en/plugin-marketplaces#plugin-entries) declares a source path that Claude Code can't resolve to a location inside the marketplace's own directory, so the plugin doesn't install or load. The refusal covers:

* An entry path that is absolute, climbs out of the marketplace with `..`, or is spelled like a network path
* An entry in a marketplace fetched from a remote source, such as git or a URL, that reaches its target through a symlink resolving outside the marketplace directory
* A relative entry in a marketplace added from a direct URL to its `marketplace.json`: Claude Code downloads only that file, so no local plugin files exist for the path to name. See [Plugins with relative paths fail in URL-based marketplaces](https://code.claude.com/docs/en/plugin-marketplaces#plugins-with-relative-paths-fail-in-url-based-marketplaces)

`claude plugin install` reports the refusal like this:

```text theme={null}
Cannot install my-plugin@my-marketplace: its marketplace entry path does not stay inside the marketplace directory (an absolute, climbing, network-shaped or link-traversing entry, an entry of a fetched marketplace that resolves outside its tree — or a relative entry in a url-catalog marketplace, which has no local directory)
```

When an already-installed plugin's entry fails the same check, `claude plugin list` shows the plugin as `failed to load` with:

```text theme={null}
Plugin source path refused: ./my-plugin does not stay inside its marketplace directory. Check that the marketplace entry has a plain relative path.
```

**What to do:**

* If you maintain the marketplace, write the entry's `source` as a plain relative path such as `./plugins/my-plugin`, and keep any symlink it crosses pointed inside the marketplace directory
* If you added the marketplace from a direct URL, relative entries can't resolve. Ask the marketplace author to use [another plugin source](https://code.claude.com/docs/en/plugin-marketplaces#plugin-sources), or add the marketplace from its git repository instead

### Failed to load marketplace configuration

Claude Code keeps the plugin marketplaces you've added in a registry file at `~/.claude/plugins/known_marketplaces.json`. A plugin command that needs the registry, such as `claude plugin install`, fails with one of two messages when Claude Code can't use the file:

* `Failed to load marketplace configuration`: the file isn't valid JSON, or can't be read. An empty file fails this way too.
* `Marketplace configuration file is corrupted`: the file is valid JSON but its contents don't match the registry schema.

A missing file isn't a failure: Claude Code treats it as a registry with no marketplaces.

With an empty file, `claude plugin install` reports:

```text theme={null}
✘ Failed to install plugin "my-plugin": Failed to load marketplace configuration: JSON Parse error: Unexpected EOF
```

Before v2.1.246, `claude plugin install` didn't report this failure.

**What to do:**

* Open `~/.claude/plugins/known_marketplaces.json` and repair the JSON, or fix the entries the message names as not matching the registry schema
* If you can't repair it, delete the file or replace its contents with `\{\}`, then re-add each marketplace with `claude plugin marketplace add <source>`. Claude Code re-registers the marketplaces your user or managed settings declare in [`extraKnownMarketplaces`](https://code.claude.com/docs/en/settings-reference#extraknownmarketplaces) the next time you start it in a folder you've trusted.
