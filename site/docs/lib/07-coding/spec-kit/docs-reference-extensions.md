---
title: "Extensions"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/docs/reference/extensions.md"
sourceRel: "docs/reference/extensions.md"
rawUrl: "/raw/07-coding/spec-kit/docs/reference/extensions.md"
sourceSha256: "176014092f6dfed9d026236f6c62edb4324de933829b2a0b1cbed57065811655"
pageSha256: "176014092f6dfed9d026236f6c62edb4324de933829b2a0b1cbed57065811655"
contentMode: "local-full"
zh: ""
---

# Extensions

Extensions add new capabilities to Spec Kit — domain-specific commands, external tool integrations, quality gates, and more. They introduce new commands and templates that go beyond the built-in Spec-Driven Development workflow.

## Search Available Extensions

```bash
specify extension search [query]
```

| Option       | Description                          |
| ------------ | ------------------------------------ |
| `--tag`      | Filter by tag                        |
| `--author`   | Filter by author                     |
| `--verified` | Show only verified extensions        |

Searches all active catalogs for extensions matching the query. Without a query, lists all available extensions.

## Install an Extension

```bash
specify extension add <name>
```

| Option          | Description                                              |
| --------------- | -------------------------------------------------------- |
| `--dev`         | Install from a local directory (for development)         |
| `--from <url>`  | Install from a custom URL instead of the catalog         |
| `--force`       | Overwrite if the extension is already installed          |
| `--priority <N>`| Resolution priority (default: 10; lower = higher precedence) |

Installs an extension from the catalog, a URL, or a local directory. Extension commands are automatically registered with the currently installed AI coding agent integration.

> **Note:** All extension commands require a project already initialized with `specify init`.

## Remove an Extension

```bash
specify extension remove <name>
```

| Option          | Description                                    |
| --------------- | ---------------------------------------------- |
| `--keep-config` | Preserve configuration files during removal    |
| `--force`       | Skip confirmation prompt                       |

Removes an installed extension. Configuration files are backed up by default; use `--keep-config` to leave them in place or `--force` to skip the confirmation.

## List Installed Extensions

```bash
specify extension list
specify extension list --json
```

| Option        | Description                                        |
| ------------- | -------------------------------------------------- |
| `--available` | Show available (uninstalled) extensions            |
| `--all`       | Show both installed and available extensions       |
| `--json`      | Write installed extensions as JSON                 |

Lists installed extensions with their status, version, and command counts.

`--json` writes a JSON array to stdout. Every item has the keys `id`, `name`,
`description`, `version`, `author`, `priority`, `enabled`, `source`, and
`provides`. `author` is `null` when absent; `source` is `\{"kind":"local"\}`
for local, legacy, or malformed provenance, or
