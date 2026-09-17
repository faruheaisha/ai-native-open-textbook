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
pageSha256: "02ca49f2eb2e3c77c4acfa6ac8c3ab950e04c9140ae0c6ddf7f45c0b5bb4e7aa"
contentMode: "local-full"
zh: ""
---

## Plugin manifest schema

The `.claude-plugin/plugin.json` file defines your plugin's metadata and configuration.

The manifest is optional. If omitted, Claude Code auto-discovers components in [default locations](#file-locations-reference) and derives the plugin name from the directory name. Use a manifest when you need to provide metadata or custom component paths.

### Complete schema

```json theme={null}
{
  "name": "plugin-name",
  "displayName": "Plugin Name",
  "version": "1.2.0",
  "description": "Brief plugin description",
  "author": {
    "name": "Author Name",
    "email": "author@example.com",
    "url": "https://github.com/author"
  },
  "homepage": "https://docs.example.com/plugin",
  "repository": "https://github.com/author/plugin",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"],
  "metadata": { "catalogId": "cat-123", "tier": "pro" },
  "skills": "./custom/skills/",
  "commands": ["./custom/commands/special.md"],
  "agents": ["./custom/agents/reviewer.md"],
  "hooks": "./config/hooks.json",
  "mcpServers": "./mcp-config.json",
  "outputStyles": "./styles/",
  "lspServers": "./.lsp.json",
  "experimental": {
    "themes": "./themes/",
    "monitors": "./monitors.json"
  },
  "dependencies": [
    "helper-lib",
    { "name": "secrets-vault", "version": "~2.1.0" }
  ]
}
```

### Required fields

If you include a manifest, `name` is the only required field.

| Field  | Type   | Description                                                                                                                                                                                                                                                                                         | Example              |
| :----- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- |
| `name` | string | Unique identifier in kebab-case, with no spaces, control characters, or bidirectional-formatting characters. When a [marketplace entry](https://code.claude.com/docs/en/plugin-marketplaces#plugin-entries) lists the plugin under a different name, the marketplace entry name is what `enabledPlugins` keys and `/plugin` use | `"deployment-tools"` |

This name is used for namespacing components. For example, in the UI, the
agent `agent-creator` for the plugin with name `plugin-dev` will appear as
`plugin-dev:agent-creator`.

### Unrecognized fields

Claude Code ignores top-level fields it does not recognize. You can keep
metadata from another ecosystem in `plugin.json` and the plugin still loads.
This makes it practical to maintain one manifest that doubles as a VS Code or
Cursor extension manifest, an npm `package.json`, or an MCPB/DXT bundle
manifest.

`claude plugin validate` reports unrecognized fields as warnings, not errors.
If a field is one or two characters off from a recognized one, the warning
suggests the likely intended name. A plugin with only unrecognized-field
warnings still passes validation and loads at runtime.

How Claude Code handles a recognized field whose value has the wrong type depends on the field:

* **Most fields**: the plugin fails to load. For example, a `keywords` value that is a string instead of an array is a load error, and `claude plugin validate` reports it as one.
* **`experimental` and `metadata`**: Claude Code ignores a non-object value, and `claude plugin validate` reports a warning.

Pass `--strict` to treat warnings as errors. Use it in CI to catch a misspelled
field name or a field left over from another tool's manifest before publishing,
even though the plugin would load at runtime.

```bash theme={null}
claude plugin validate ./my-plugin --strict
```

### Metadata fields

| Field            | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                          | Example                                                           |
| :--------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| `$schema`        | string  | JSON Schema URL for editor autocomplete and validation. Claude Code ignores this field at load time.                                                                                                                                                                                                                                                                                                                 | `"https://json.schemastore.org/claude-code-plugin-manifest.json"` |
| `displayName`    | string  | Human-readable name shown in the `/plugin` picker and other UI surfaces. For a marketplace-installed plugin, a `displayName` on the [marketplace entry](https://code.claude.com/docs/en/plugin-marketplaces#optional-plugin-fields) takes precedence over this value. When no display name is set in either place, users see `name`. Unlike `name`, may contain spaces and any casing. Not used for namespacing or lookup.                       | `"Deployment Tools"`                                              |
| `version`        | string  | Optional. Semantic version. Setting this pins the plugin to that version string, so users only receive updates when you bump it, except for a [`command` source](https://code.claude.com/docs/en/plugin-marketplaces#command-sources); see [Version management](#version-management). If also set in the marketplace entry, `plugin.json` wins. If omitted, the version comes from the next source in [Version management](#version-management). | `"2.1.0"`                                                         |
| `description`    | string  | Brief explanation of plugin purpose                                                                                                                                                                                                                                                                                                                                                                                  | `"Deployment automation tools"`                                   |
| `author`         | object  | Author information                                                                                                                                                                                                                                                                                                                                                                                                   | `\{"name": "Dev Team", "email": "dev@company.com"\}`                |
| `homepage`       | string  | Documentation URL                                                                                                                                                                                                                                                                                                                                                                                                    | `"https://docs.example.com"`                                      |
| `repository`     | string  | Source code URL                                                                                                                                                                                                                                                                                                                                                                                                      | `"https://github.com/user/plugin"`                                |
| `license`        | string  | License identifier                                                                                                                                                                                                                                                                                                                                                                                                   | `"MIT"`, `"Apache-2.0"`                                           |
| `keywords`       | array   | Discovery tags                                                                                                                                                                                                                                                                                                                                                                                                       | `["deployment", "ci-cd"]`                                         |
| `metadata`       | object  | Free-form object for your own data, such as entitlement or catalog fields. Claude Code doesn't read it, so the values never affect plugin behavior. Claude Code ignores a non-object value, and `claude plugin validate` reports it as a warning. Before v2.1.222, Claude Code treated the key as an [unrecognized field](#unrecognized-fields).                                                                     | `\{"catalogId": "cat-123"\}`                                        |
| `defaultEnabled` | boolean | Whether the plugin starts in an enabled state when the user has not set one. Defaults to `true`. See [Default enablement](#default-enablement).                                                                                                                                                                                                                                                                      | `false`                                                           |

### Default enablement

Set `defaultEnabled: false` in `plugin.json` to ship a plugin that installs disabled. The user turns it on with `claude plugin enable <plugin>` or the `/plugin` interface. Use this for plugins that add cost or scope a user should opt into, such as one that connects to an external service.

`defaultEnabled` is the fallback when nothing else has decided the plugin's state. Two things take precedence over it:

* **The user's setting**: an entry for the plugin in `enabledPlugins` at any settings scope. Once written, it persists across plugin updates and reinstalls, so changing `defaultEnabled` in a later release does not flip an existing user.
* **A dependency requirement**: when a plugin is required by another one that is active, Claude Code writes `true` for it at install or enable time. That gives it an explicit setting, so its own default no longer applies. See [Enable or disable a plugin with dependencies](https://code.claude.com/docs/en/plugin-dependencies#enable-or-disable-a-plugin-with-dependencies).

The same field can appear in a plugin's marketplace entry, where it takes precedence over the value in `plugin.json`. See [Optional plugin fields](https://code.claude.com/docs/en/plugin-marketplaces#optional-plugin-fields).

### Component path fields

| Field                   | Type                  | Description                                                                                                                                                                   | Example                                              |
| :---------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| `skills`                | string\|array         | Custom skill directories containing `<name>/SKILL.md`. Adds to the default `skills/` scan. See [Path behavior rules](#path-behavior-rules) for the marketplace-root exception | `"./custom/skills/"`                                 |
| `commands`              | string\|array         | Custom flat `.md` skill files or directories (replaces default `commands/`)                                                                                                   | `"./custom/cmd.md"` or `["./cmd1.md"]`               |
| `agents`                | string\|array         | Custom agent files (replaces default `agents/`)                                                                                                                               | `"./custom/agents/reviewer.md"`                      |
| `workflows`             | string\|array         | Custom [workflow](https://code.claude.com/docs/en/workflows) script files or directories (replaces default `workflows/`)                                                                                  | `"./custom/workflows/"`                              |
| `hooks`                 | string\|array\|object | Hook config paths or inline config                                                                                                                                            | `"./my-extra-hooks.json"`                            |
| `mcpServers`            | string\|array\|object | MCP config paths or inline config                                                                                                                                             | `"./my-extra-mcp-config.json"`                       |
| `outputStyles`          | string\|array         | Custom output style files/directories (replaces default `output-styles/`)                                                                                                     | `"./styles/"`                                        |
| `lspServers`            | string\|array\|object | [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) configs for code intelligence (go to definition, find references, etc.)                     | `"./.lsp.json"`                                      |
| `experimental.themes`   | string\|array         | Color theme files/directories (replaces default `themes/`). See [Themes](#themes)                                                                                             | `"./themes/"`                                        |
| `experimental.monitors` | string\|array         | Background [Monitor](https://code.claude.com/docs/en/tools-reference#monitor-tool) configurations that start automatically when the plugin is active. See [Monitors](#monitors)                           | `"./monitors.json"`                                  |
| `userConfig`            | object                | User-configurable values prompted at enable time. See [User configuration](#user-configuration)                                                                               | See below                                            |
| `channels`              | array                 | Channel declarations for message injection (Telegram, Slack, Discord style). See [Channels](#channels)                                                                        | See below                                            |
| `dependencies`          | array                 | Other plugins this plugin requires, optionally with semver version constraints. See [Constrain plugin dependency versions](https://code.claude.com/docs/en/plugin-dependencies)                           | `[\{ "name": "secrets-vault", "version": "~2.1.0" \}]` |

### Experimental components

Components under the `experimental` key, `themes` and `monitors`, have a manifest schema that may change between releases while they stabilize. Where you declare them is a separate migration: the top level still works, `claude plugin validate` warns, and a future release will require `experimental.*`.

### User configuration

The `userConfig` field declares values that Claude Code prompts the user for when the plugin is enabled. Use this instead of requiring users to hand-edit `settings.json`.

```json theme={null}
{
  "userConfig": {
    "api_endpoint": {
      "type": "string",
      "title": "API endpoint",
      "description": "Your team's API endpoint"
    },
    "api_token": {
      "type": "string",
      "title": "API token",
      "description": "API authentication token",
      "sensitive": true
    }
  }
}
```

Keys must be valid identifiers. Each option supports these fields:

| Field         | Required | Description                                                                              |
| :------------ | :------- | :--------------------------------------------------------------------------------------- |
| `type`        | Yes      | One of `string`, `number`, `boolean`, `directory`, or `file`                             |
| `title`       | Yes      | Label shown in the configuration dialog                                                  |
| `description` | Yes      | Help text shown beneath the field                                                        |
| `sensitive`   | No       | If `true`, masks input and stores the value in secure storage instead of `settings.json` |
| `required`    | No       | If `true`, validation fails when the field is empty                                      |
| `default`     | No       | Value used when the user provides nothing                                                |
| `multiple`    | No       | For `string` type, allow an array of strings                                             |
| `min` / `max` | No       | Bounds for `number` type                                                                 |

Each value is available for substitution as `${user_config.KEY}` in MCP and LSP server configs and hook commands. Non-sensitive values can also be substituted in skill and agent content. All values are exported to hook processes as `CLAUDE_PLUGIN_OPTION_<KEY>` environment variables, where `<KEY>` is the option key uppercased.

Fields that run in a shell reject `${user_config.*\}`: substituting a configured value into a shell command would let the shell run whatever that value contains, so the component fails with an [error](https://code.claude.com/docs/en/errors#plugin-command-references-user-config) instead. Each rejected field has an alternative way to pass the value:

| Rejected field                                                               | How to pass the value                                                                                                             |
| :--------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| Shell-form hook commands                                                     | Use [exec form](https://code.claude.com/docs/en/hooks#exec-form-and-shell-form) with `args`, or read `CLAUDE_PLUGIN_OPTION_<KEY>` from the hook's environment |
| [Monitor](#monitors) commands                                                | Read the value from a config file in the script                                                                                   |
| MCP [`headersHelper`](https://code.claude.com/docs/en/mcp#use-dynamic-headers-for-custom-authentication) | Read the value from a config file in the script                                                                                   |

Before v2.1.207, these fields substituted `$\{user_config.KEY\}` values; update plugins that relied on this.
