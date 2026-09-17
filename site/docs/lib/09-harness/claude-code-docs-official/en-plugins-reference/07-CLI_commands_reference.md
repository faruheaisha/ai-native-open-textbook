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
sourceRel: "en/plugins-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/plugins-reference.md"
sourceSha256: "c75119ccd8973aad659373d726d412bbe3f5184e6d0ca0d2064512cad255f0a3"
pageSha256: "5e81fa0c325453256d40421dab4700f2a849774f130f4287f852c626309c8cd4"
contentMode: "local-full"
zh: ""
---

## CLI commands reference

Claude Code provides CLI commands for non-interactive plugin management, useful for scripting and automation.

### plugin init

Scaffold a new plugin at `~/.claude/skills/<name>/`. On the next Claude Code session it loads automatically as `<name>@skills-dir` and appears in `/plugin` and `claude plugin list` with no install step.

See [Skills-directory plugins](#skills-directory-plugins) for scope and trust requirements.

```bash theme={null}
claude plugin init <name> [options]
```

**Arguments:**

* `<name>`: Plugin name. Becomes the skill namespace and the directory name under `~/.claude/skills/`, so it cannot contain spaces or path separators.

**Options:**

| Option                   | Description                                                                                                         | Default                 |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------ | :---------------------- |
| `--description <text>`   | Manifest description                                                                                                |                         |
| `--author <name>`        | Author name                                                                                                         | `git config user.name`  |
| `--author-email <email>` | Author email                                                                                                        | `git config user.email` |
| `--with <components...>` | Also scaffold component folders. Valid values: `skills`, `agents`, `hooks`, `mcp`, `lsp`, `output-style`, `channel` |                         |
| `-f, --force`            | Overwrite an existing `.claude-plugin/` at the target                                                               |                         |
| `-h, --help`             | Display help for command                                                                                            |                         |

**Aliases:** `new`

Each `--with` value adds a starter file for that component, ready to edit:

| Component      | What it scaffolds                                                                                         |
| :------------- | :-------------------------------------------------------------------------------------------------------- |
| `skills`       | An extra namespaced `<name>:example` skill alongside the default one                                      |
| `agents`       | An `agents/` subagent definition                                                                          |
| `hooks`        | A `hooks/hooks.json` with a sample event handler                                                          |
| `mcp`          | A `.mcp.json` with HTTP and stdio server examples                                                         |
| `lsp`          | A `.lsp.json` language-server example                                                                     |
| `output-style` | An `output-styles/<name>.md` that applies automatically while the plugin is enabled                       |
| `channel`      | An MCP-based [channel](https://code.claude.com/docs/en/channels): a stdio server (`server.ts`), its `.mcp.json`, and a `package.json` |

The scaffolded plugin uses the `@skills-dir` source rather than a marketplace. Admins can block this source with `strictKnownMarketplaces` or by adding `\{"source": "skills-dir"\}` to `blockedMarketplaces` in [managed settings](https://code.claude.com/docs/en/plugin-marketplaces#managed-marketplace-restrictions). When blocked, `plugin init` fails before writing.

**Examples:**

```bash theme={null}
# Scaffold a minimal plugin
claude plugin init my-helper

# Scaffold with skill and hook folders
claude plugin init my-helper --with skills hooks

# Overwrite an existing scaffold
claude plugin init my-helper --force
```

### plugin install

Install a plugin from available marketplaces.

```bash theme={null}
claude plugin install <plugin> [options]
```

**Arguments:**

* `<plugin>`: Plugin name or `plugin-name@marketplace-name` for a specific marketplace

**Options:**

| Option                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Default |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `-s, --scope <scope>`  | Installation scope: `user`, `project`, or `local`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `user`  |
| `--config <key=value>` | Set a [`userConfig`](#user-configuration) option declared in the plugin's manifest. Repeat the flag to set multiple options                                                                                                                                                                                                                                                                                                                                                                                                                                           |         |
| `-y, --yes`            | Accept a command the plugin's marketplace declares, without the confirmation prompt: the command that produces a plugin with a [`command` source](https://code.claude.com/docs/en/plugin-marketplaces#command-sources), or the [`headersHelper`](https://code.claude.com/docs/en/plugin-marketplaces#authenticate-archive-downloads) that authenticates an archive download. Accepting a `headersHelper` requires Claude Code v2.1.238 or later. Claude Code still prints the command first. Required when stdin or stdout isn't a TTY. Has no effect inside a Claude Code session, so run the command from your own terminal |         |
| `--json`               | Print the result as one JSON object on the last line of stdout instead of the human-readable message, for use in scripts. See [JSON result format](#plugin-json-result). Requires Claude Code v2.1.268 or later                                                                                                                                                                                                                                                                                                                                                       |         |
| `-h, --help`           | Display help for command                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |         |

Scope determines which settings file the installed plugin is added to. For example, `--scope project` writes to `enabledPlugins` in .claude/settings.json, making the plugin available to everyone who clones the project repository.

&lt;span id="plugin-json-result" />With `--json`, the last line of stdout is one JSON object. Parse only that line, because Claude Code prints any command the marketplace declares ahead of it. Three fields are always present:

* `command`: the subcommand that ran, such as `install`
* `outcome`: `ok` or `failed`
* `message`: a human-readable description of the result

Other fields, such as `pluginId`, `scope`, and `failureCode`, appear only when they apply. The `--json` option on `plugin uninstall`, `plugin update`, `plugin enable`, and `plugin disable` prints the same object with that subcommand's own fields. A usage error, such as an invalid `--scope`, prints no result line and exits 1 with the reason on stderr.

**Examples:**

```bash theme={null}
# Install to user scope (default)
claude plugin install formatter@my-marketplace

# Install to project scope (shared with team)
claude plugin install formatter@my-marketplace --scope project

# Install to local scope (not shared with team)
claude plugin install formatter@my-marketplace --scope local
```

### plugin uninstall

Remove an installed plugin.

```bash theme={null}
claude plugin uninstall <plugin> [options]
```

**Arguments:**

* `<plugin>`: Plugin name or `plugin-name@marketplace-name`

**Options:**

| Option                | Description                                                                                                                                                                                                    | Default |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `-s, --scope <scope>` | Uninstall from scope: `user`, `project`, or `local`                                                                                                                                                            | `user`  |
| `--keep-data`         | Preserve the plugin's [persistent data directory](#persistent-data-directory)                                                                                                                                  |         |
| `--prune`             | Also remove auto-installed dependencies that no other plugin requires. See [plugin prune](#plugin-prune)                                                                                                       |         |
| `-y, --yes`           | Skip the `--prune` confirmation prompt. Required when stdin or stdout is not a TTY                                                                                                                             |         |
| `--json`              | Print the result as one JSON object on the last line of stdout, in the [same format as `plugin install --json`](#plugin-json-result). Can't be combined with `--prune`. Requires Claude Code v2.1.268 or later |         |
| `-h, --help`          | Display help for command                                                                                                                                                                                       |         |

**Aliases:** `remove`, `rm`

By default, uninstalling from the last remaining scope also deletes the plugin's `$\{CLAUDE_PLUGIN_DATA\}` directory. Use `--keep-data` to preserve it, for example when reinstalling after testing a new version.

  When installed plugins from different marketplaces share a name, the `plugin-name@marketplace-name` form uninstalls only the plugin from the named marketplace. Before v2.1.212, the qualified form could match and uninstall the same-named plugin from a different marketplace.

### plugin prune

Remove auto-installed plugin dependencies that are no longer required by any installed plugin. Dependencies that Claude Code pulled in to satisfy another plugin's [`dependencies`](https://code.claude.com/docs/en/plugin-dependencies) field are removed; plugins you installed directly are never touched.

```bash theme={null}
claude plugin prune [options]
```

**Options:**

| Option                | Description                                                              | Default |
| :-------------------- | :----------------------------------------------------------------------- | :------ |
| `-s, --scope <scope>` | Prune at scope: `user`, `project`, or `local`                            | `user`  |
| `--dry-run`           | List what would be removed without removing anything                     |         |
| `-y, --yes`           | Skip the confirmation prompt. Required when stdin or stdout is not a TTY |         |
| `-h, --help`          | Display help for command                                                 |         |

**Aliases:** `autoremove`

The command lists orphaned dependencies and asks for confirmation before removing them. To remove a plugin and clean up its dependencies in one step, run `claude plugin uninstall <plugin> --prune`.

### plugin enable

Enable a disabled plugin. When the target is installed from a marketplace and declares [dependencies](https://code.claude.com/docs/en/plugin-dependencies), Claude Code enables them transitively at the same scope. The command fails under the conditions that [Enable or disable a plugin with dependencies](https://code.claude.com/docs/en/plugin-dependencies#enable-or-disable-a-plugin-with-dependencies) lists.

```bash theme={null}
claude plugin enable <plugin> [options]
```

**Arguments:**

* `<plugin>`: Plugin name or `plugin-name@marketplace-name`

**Options:**

| Option                | Description                                                                                                                                                                  | Default     |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `-s, --scope <scope>` | Scope to enable: `user`, `project`, or `local`. When omitted, Claude Code detects the scope where the plugin is installed                                                    | Auto-detect |
| `--json`              | Print the result as one JSON object on the last line of stdout, in the [same format as `plugin install --json`](#plugin-json-result). Requires Claude Code v2.1.268 or later |             |
| `-h, --help`          | Display help for command                                                                                                                                                     |             |

### plugin disable

Disable a plugin without uninstalling it. When the target is installed from a marketplace, the command fails if another enabled plugin [depends on](https://code.claude.com/docs/en/plugin-dependencies#enable-or-disable-a-plugin-with-dependencies) it. The error message includes a chained command that disables every dependent first.

```bash theme={null}
claude plugin disable [plugin] [options]
```

**Arguments:**

* `[plugin]`: Plugin name or `plugin-name@marketplace-name`. Optional when using `--all`

**Options:**

| Option                | Description                                                                                                                                                                  | Default     |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `-a, --all`           | Disable all enabled plugins. Can't be combined with `--scope`                                                                                                                |             |
| `-s, --scope <scope>` | Scope to disable: `user`, `project`, or `local`. When omitted, Claude Code detects the scope where the plugin is installed                                                   | Auto-detect |
| `--json`              | Print the result as one JSON object on the last line of stdout, in the [same format as `plugin install --json`](#plugin-json-result). Requires Claude Code v2.1.268 or later |             |
| `-h, --help`          | Display help for command                                                                                                                                                     |             |

### plugin update

Update a plugin to the latest version.

```bash theme={null}
claude plugin update <plugin> [options]
```

**Arguments:**

* `<plugin>`: Plugin name or `plugin-name@marketplace-name`

**Options:**

| Option                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Default |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `-s, --scope <scope>` | Scope to update: `user`, `project`, `local`, or `managed`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `user`  |
| `-y, --yes`           | Accept a command the plugin's marketplace declares, without the confirmation prompt: the command that produces a plugin with a [`command` source](https://code.claude.com/docs/en/plugin-marketplaces#command-sources), or the [`headersHelper`](https://code.claude.com/docs/en/plugin-marketplaces#authenticate-archive-downloads) that authenticates an archive download. Accepting a `headersHelper` requires Claude Code v2.1.238 or later. Claude Code still prints the command first. Required when stdin or stdout isn't a TTY. Has no effect inside a Claude Code session, so run the command from your own terminal |         |
| `--json`              | Print the result as one JSON object on the last line of stdout, in the [same format as `plugin install --json`](#plugin-json-result). Requires Claude Code v2.1.268 or later                                                                                                                                                                                                                                                                                                                                                                                          |         |
| `-h, --help`          | Display help for command                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |         |

  Claude Code resolves a bare plugin name against your installed plugins. When installed plugins from different marketplaces share the name, Claude Code refuses the update and lists the qualified `plugin-name@marketplace-name` commands to run instead. Before v2.1.246, Claude Code accepted only the qualified form and rejected a bare name as not found.

***

### plugin list

List installed plugins with their version, source marketplace, and enable status.

```bash theme={null}
claude plugin list [options]
```

**Options:**

| Option        | Description                                                                                                                                                                                                                                                                                                          | Default |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `--json`      | Output as JSON. A plugin row with load problems or authoring warnings carries `errors` or `notes` string arrays. On Claude Code v2.1.268 or later, parallel `errorDetails` and `noteDetails` arrays give each entry's diagnostic `type` and the names it refers to, such as the plugin, marketplace, server, or file |         |
| `--available` | Include available plugins from marketplaces. Requires `--json`                                                                                                                                                                                                                                                       |         |
| `-h, --help`  | Display help for command                                                                                                                                                                                                                                                                                             |         |

Within an interactive session, `/plugin list` prints a similar listing inline, but it covers marketplace-installed plugins only:

* Plugins loaded from skills directories appear in the `/plugin` interface and in `claude plugin list`, but not in the inline `/plugin list` output.
* On Claude Code v2.1.239 or later, [plugins synced from claude.ai](#synced-plugins) appear in `claude plugin list` when you run it in the environment where a synced session downloaded them. They don't appear in the inline `/plugin list` output.
* Plugins loaded for the session with `--plugin-dir` or `--plugin-url` appear in the `/plugin` interface, and in `claude plugin list` only when the same flag precedes the subcommand, as in `claude --plugin-dir <dir> plugin list`. Only the flag names their location, so a bare `claude plugin list` can't find them, unlike synced plugins and skills-directory plugins, whose fixed directories Claude Code scans.

The interactive form accepts `--enabled` or `--disabled` to show only plugins in that state, and `ls` as a shorthand for `list`.

### plugin details

Show a plugin's component inventory and projected token cost. The output lists all components the plugin contributes, grouped as Skills, Agents, Hooks, MCP servers, and LSP servers, along with an estimate of how many tokens it adds to each session. The Skills group includes both `skills/` and `commands/` entries.

```bash theme={null}
claude plugin details <name>
```

**Arguments:**

* `<name>`: Plugin name or `plugin-name@marketplace-name`

**Options:**

| Option       | Description              | Default |
| :----------- | :----------------------- | :------ |
| `-h, --help` | Display help for command |         |

The output shows two cost figures for each component:

* **Always-on:** tokens added to every session by the plugin's listing text, such as skill descriptions, agent descriptions, and command names, regardless of whether any component fires.
* **On-invoke:** tokens a component costs when it fires. Shown per component, not as a plugin total, because a typical session invokes only a subset of components.

This example shows what the output looks like for a plugin with two skills:

```
dependency-guard 1.2.0
  Dependency analysis for Claude Code sessions
  Source: dependency-guard@example-marketplace

Component inventory
  Skills (2)  scan-dependencies, review-changes
  Agents (0)
  Hooks (1)  SessionStart  (harness-only — no model context cost)
  MCP servers (0)
  LSP servers (0)

Projected token cost
  Always-on:   ~180 tok   added to every session

Per-component (rounded)
  component            always-on  on-invoke
  scan-dependencies        ~100      ~2400
  review-changes            ~80      ~1800

  On-invoke cost is paid each time a skill or agent fires.
  Token counts are estimates and may differ from actual usage.
```

The always-on total is computed via the `count_tokens` API for your active model. Per-component numbers are proportionally scaled from that total. If the API is unreachable, the command falls back to a character-based estimate.

### plugin validate

Check a plugin or a marketplace for syntax and schema errors before publishing.

The command exits 0 when validation passes, 1 when it fails, and 2 when the validation run itself fails, such as when the path you pass is unreadable.

```bash theme={null}
claude plugin validate <path> [options]
```

**Arguments:**

* `<path>`: Path to a plugin directory or a marketplace directory. See [Validate a plugin or a directory without a manifest](https://code.claude.com/docs/en/plugin-marketplaces#validate-a-plugin-or-a-directory-without-a-manifest) for which files a plugin run covers.

**Options:**

| Option       | Description                                                                                                                                       | Default |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | :------ |
| `--strict`   | Treat warnings as errors and exit 1 on them. Use in CI to catch issues the runtime tolerates, such as [unrecognized fields](#unrecognized-fields) |         |
| `--json`     | Output the validation report as one JSON object with the same exit codes. Requires Claude Code v2.1.259 or later                                  |         |
| `-h, --help` | Display help for command                                                                                                                          |         |

With `--json`, Claude Code writes the report to stdout as one JSON object with these top-level fields:

* `success`: the same verdict the exit code gives
* `strict`: whether the run treated warnings as errors
* `target`: the resolved path Claude Code validated
* `manifest`: the manifest's own result, or `null` for a [run without a manifest](https://code.claude.com/docs/en/plugin-marketplaces#validate-a-plugin-or-a-directory-without-a-manifest)
* `contents`: per-file results, each naming its `file` and carrying `errors`, `warnings`, and `notes` arrays

On exit 2, the command writes nothing to stdout; the error message goes to stderr.

Within an interactive session, `/plugin validate <path>` runs the same checks inline.

### plugin tag

Create a release git tag for a plugin. By default the command tags the plugin in the current directory; pass a path to tag a plugin elsewhere. See [Tag plugin releases](https://code.claude.com/docs/en/plugin-dependencies#tag-plugin-releases-for-version-resolution).

```bash theme={null}
claude plugin tag [path] [options]
```

**Arguments:**

* `[path]`: Path to the plugin directory. Defaults to the current directory.

**Options:**

| Option                | Description                                                                | Default  |
| :-------------------- | :------------------------------------------------------------------------- | :------- |
| `--push`              | Push the tag to the remote after creating it                               |          |
| `--dry-run`           | Print what would be tagged without creating the tag                        |          |
| `-f, --force`         | Create the tag even if the working tree is dirty or the tag already exists |          |
| `-m, --message <msg>` | Tag annotation message. Use `%s` as a placeholder for the version          |          |
| `--remote <name>`     | Remote to push to with `--push`                                            | `origin` |
| `-h, --help`          | Display help for command                                                   |          |

***
