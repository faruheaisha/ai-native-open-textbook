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
sourceRel: "en/plugin-marketplaces.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/plugin-marketplaces.md"
sourceSha256: "7912af9270337aa00dd39e74120a5aad65065f90b4a15c54eed99cec6ff6d960"
pageSha256: "84e2286419cc87e3f744664d2e1b8e2655ab548dfa7cd69ecdca9b63ffe4c2b4"
contentMode: "local-full"
zh: ""
---

## Plugin entries

Each plugin entry in the `plugins` array describes a plugin and where to find it. You can include any field from the [plugin manifest schema](https://code.claude.com/docs/en/plugins-reference#plugin-manifest-schema), such as `description`, `version`, `author`, `commands`, and `hooks`, plus these marketplace-specific fields: `source`, `category`, `tags`, `strict`, `relevance`, `headers`, and `headersHelper`.

### Required fields

| Field    | Type           | Description                                                                                                                                                                                                              |
| :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`   | string         | Plugin identifier in kebab-case, with no spaces, control characters, or bidirectional-formatting characters. This is public-facing: users see it when installing (for example, `/plugin install my-plugin@marketplace`). |
| `source` | string\|object | Where to fetch the plugin from (see [Plugin sources](#plugin-sources) below)                                                                                                                                             |

### Optional plugin fields

**Standard metadata fields:**

| Field            | Type    | Description                                                                                                                                                                                                                                                                                                                                                  |
| :--------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `displayName`    | string  | Human-readable name shown in UI surfaces. When neither the entry nor the plugin's `plugin.json` sets one, users see the plugin's `name`. May contain spaces and any casing. Not used for namespacing or lookup.                                                                                                                                              |
| `description`    | string  | Brief plugin description                                                                                                                                                                                                                                                                                                                                     |
| `version`        | string  | Plugin version. If set (here or in `plugin.json`), the plugin is pinned to this string and users only receive updates when it changes. A plugin with a [`command` source](#command-sources) isn't pinned by either field. If set in neither place, the version comes from the next source in [version management](https://code.claude.com/docs/en/plugins-reference#version-management). |
| `author`         | object  | Plugin author information (`name` required; `email` and `url` optional)                                                                                                                                                                                                                                                                                      |
| `homepage`       | string  | Plugin homepage or documentation URL                                                                                                                                                                                                                                                                                                                         |
| `repository`     | string  | Source code repository URL                                                                                                                                                                                                                                                                                                                                   |
| `license`        | string  | SPDX license identifier (for example, MIT, Apache-2.0)                                                                                                                                                                                                                                                                                                       |
| `keywords`       | array   | Tags for plugin discovery and categorization                                                                                                                                                                                                                                                                                                                 |
| `metadata`       | object  | Free-form object for your own fields, such as entitlement or catalog data. Claude Code doesn't read it. Before v2.1.222, `claude plugin validate` reported the key as an unrecognized field.                                                                                                                                                                 |
| `category`       | string  | Plugin category for organization                                                                                                                                                                                                                                                                                                                             |
| `tags`           | array   | Tags for searchability                                                                                                                                                                                                                                                                                                                                       |
| `strict`         | boolean | Controls whether `plugin.json` is the authority for component definitions (default: true). See [Strict mode](#strict-mode) below.                                                                                                                                                                                                                            |
| `relevance`      | object  | Signals that tell Claude Code when to suggest this plugin to users. Takes effect only for marketplaces an administrator allowlists in managed settings. See [Recommend plugins for your org](https://code.claude.com/docs/en/plugin-relevance).                                                                                                                                          |
| `defaultEnabled` | boolean | Whether the plugin is enabled after install (default: true). Set to `false` to install the plugin disabled until the user opts in. Takes precedence over the same field in the plugin's `plugin.json`. See [Default enablement](https://code.claude.com/docs/en/plugins-reference#default-enablement).                                                                                   |

Both the entry and the plugin's own `plugin.json` can set the display fields `displayName`, `description`, `author`, `homepage`, `repository`, `license`, and `keywords`. In plugin listings and details, before and after install:

* For a field you set on the entry, users see the entry's value, even when `plugin.json` sets a different one.
* For a field the entry leaves unset, users see the `plugin.json` value.

Before install, Claude Code can read `plugin.json` only for entries with a [relative-path source](#relative-paths), whose plugin files live inside the marketplace itself. For an entry with any other source type, users see only the entry's own fields until they install the plugin.

**Component configuration fields:**

| Field        | Type           | Description                                                    |
| :----------- | :------------- | :------------------------------------------------------------- |
| `skills`     | string\|array  | Custom paths to skill directories containing `<name>/SKILL.md` |
| `commands`   | string\|array  | Custom paths to flat `.md` skill files or directories          |
| `agents`     | string\|array  | Custom paths to agent files                                    |
| `hooks`      | string\|object | Custom hooks configuration or path to hooks file               |
| `mcpServers` | string\|object | MCP server configurations or path to MCP config                |
| `lspServers` | string\|object | LSP server configurations or path to LSP config                |

**Archive authentication fields:**

Set these when the entry has an [`archive` source](#zip-archives) on a server that requires credentials.

| Field           | Type   | Description                                                                                                                                                                                                                                                                                         |
| :-------------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `headers`       | object | HTTP headers Claude Code sends when it downloads this entry's archive. Overrides the marketplace's headers of the same name. Requires Claude Code v2.1.238 or later.                                                                                                                                |
| `headersHelper` | string | Command that prints the HTTP headers for this entry's archive download as one JSON object, for a credential that expires. See [Authenticate archive downloads](#authenticate-archive-downloads). The entry must also set [`"strict": false`](#strict-mode). Requires Claude Code v2.1.238 or later. |
