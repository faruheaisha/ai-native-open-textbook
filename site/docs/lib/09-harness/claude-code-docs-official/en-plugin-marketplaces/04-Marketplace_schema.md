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
pageSha256: "299615616e35f90469626d5df39905653d7ee57da813f290722a3395b3e1bdd5"
contentMode: "local-full"
zh: ""
---

## Marketplace schema

### Required fields

| Field     | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Example        |
| :-------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- |
| `name`    | string | Marketplace identifier in kebab-case, with no spaces, control characters, or bidirectional-formatting characters. This is public-facing: users see it when installing plugins (for example, `/plugin install my-tool@your-marketplace`). Each user can register only one marketplace per name: when they add a second marketplace with the same name, Claude Code replaces the first. To publish multiple plugins under one marketplace name, list them all in a [single `marketplace.json`](#create-the-marketplace-file). | `"acme-tools"` |
| `owner`   | object | Marketplace maintainer information ([see fields below](#owner-fields))                                                                                                                                                                                                                                                                                                                                                                                                                                                      |                |
| `plugins` | array  | List of available plugins                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | See below      |

  **Reserved names**: the following marketplace names are reserved for official Anthropic use and can't be used by third-party marketplaces: `claude-code-marketplace`, `claude-code-plugins`, `claude-plugins-official`, `claude-plugins-community`, `claude-community`, `anthropic-marketplace`, `anthropic-plugins`, `agent-skills`, `anthropic-agent-skills`, `knowledge-work-plugins`, `life-sciences`, `claude-for-legal`, `claude-for-financial-services`, `financial-services-plugins`, `first-party-plugins`, `claude-tag-plugins`, `healthcare`. Names that impersonate official marketplaces, such as `official-claude-plugins` or `anthropic-plugins-v2`, are also blocked. Reserving these names prevents a third-party marketplace from presenting itself as an Anthropic-published source.

  Claude Code re-checks reserved names every time it loads a marketplace, not only when you add one. A marketplace that was registered under one of these names before the name became reserved stops loading and reports that it is [registered from an untrusted source](https://code.claude.com/docs/en/errors#marketplace-is-registered-from-an-untrusted-source). Remove that marketplace and re-add it from the official Anthropic source. A third-party marketplace affected by a newly reserved name loads again as soon as you re-add it under a different name. Before v2.1.205, `first-party-plugins` and `healthcare` weren't reserved, and a marketplace already registered under a reserved name kept loading. Before v2.1.265, `claude-tag-plugins` wasn't reserved.

### Owner fields

| Field   | Type   | Required | Description                                  |
| :------ | :----- | :------- | :------------------------------------------- |
| `name`  | string | Yes      | Name of the maintainer or team               |
| `email` | string | No       | Contact email for the maintainer             |
| `url`   | string | No       | Website, GitHub profile, or organization URL |

### Optional fields

| Field                                 | Type   | Description                                                                                                                                                                                                                                                                                  |
| :------------------------------------ | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$schema`                             | string | JSON Schema URL for editor autocomplete and validation. Claude Code ignores this field at load time.                                                                                                                                                                                         |
| `description`                         | string | Brief marketplace description                                                                                                                                                                                                                                                                |
| `version`                             | string | Marketplace manifest version                                                                                                                                                                                                                                                                 |
| `metadata.pluginRoot`                 | string | Directory that Claude Code resolves bare plugin source names under. See [Relative paths](#relative-paths). Requires Claude Code v2.1.239 or later.                                                                                                                                           |
| `allowCrossMarketplaceDependenciesOn` | array  | Other marketplaces that plugins in this marketplace may depend on. Dependencies from a marketplace not listed here are blocked at install. See [Depend on a plugin from another marketplace](https://code.claude.com/docs/en/plugin-dependencies#depend-on-a-plugin-from-another-marketplace).                           |
| `renames`                             | object | Map from a former plugin `name` to its current name, or to `null` if the plugin was removed. Lets existing users migrate automatically when you rename or remove an entry in `plugins`. See [Rename or remove a plugin](#rename-or-remove-a-plugin). Requires Claude Code v2.1.193 or later. |

`description` and `version` are also accepted under `metadata` for backward compatibility.
